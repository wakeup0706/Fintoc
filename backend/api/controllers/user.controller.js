const { User, Role } = require('../models');
const { hashPassword, verifyPassword } = require('../utils/hash');
const axios = require('axios');
const jwt = require('jsonwebtoken');
var belvo = require("belvo").default;

const client = new belvo(
  process.env.BELVO_PUBLIC_KEY,
  process.env.BELVO_SECRET_KEY,
  'sandbox' // Ensure the environment is correct (sandbox or production)
);

exports.getProfile = async (req, res) => {
    try {
      const user = req.user;
      res.json({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role?.name,
        allowed: user.allowed,
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
  const { first_name, last_name, current_password, new_password } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (new_password) {
      if (!current_password) {
        return res.status(400).json({ message: 'Current password is required to change password' });
      }

      const valid = await verifyPassword(current_password, user.password);
      if (!valid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      user.password = await hashPassword(new_password);
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;

    await user.save();

    const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '1d',
    });

    res.json({ message: 'Profile updated successfully', token: token});
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

exports.registerLinkAndRetrieveAccounts = async (req, res) => {
   try {
     console.log(process.env.BELVO_SECRET_KEY);
    await client.connect();
    const widgetOptions = {
      widget: {
        branding: {
          company_name: "ACME Loans",
          company_logo: "https://yourdomain.com/logo.svg", // Must be HTTPS
          company_color: "#007BFF",
          company_benefit_header: "Faster approvals",
          company_benefit_content: "Connecting your bank account speeds up approval.",
          opportunity_loss: "Without connection, approval may take 10+ days."
        }
      }
    };

    const token = await client.widgetToken.create(widgetOptions);
    res.json(token);
  } catch (error) {
    console.error("Token error:", error);
    res.status(500).json({ error: "Failed to create widget token" });
  }
};

exports.getSubscriptionInformation = async (req, res) => {
  const BELVO_API_URL = process.env.BELVO_API_URL || "https://developers.belvo.com/_mock/apis/belvoopenapispec/api";
  const BELVO_SECRET_ID = process.env.BELVO_PUBLIC_KEY;
  const BELVO_SECRET_PASSWORD = process.env.BELVO_SECRET_KEY;
  const linkId = req.query.link;

  if (!linkId) {
    return res.status(400).json({ error: "Missing 'link' parameter" });
  }

  const authHeader = Buffer.from(`${BELVO_SECRET_ID}:${BELVO_SECRET_PASSWORD}`).toString("base64");
  const headers = {
    Authorization: `Basic ${authHeader}`,
    "Content-Type": "application/json"
  };

  let allResults = [];
  let nextUrl = `${BELVO_API_URL}/recurring-expenses/?link=${linkId}`;

  try {
    while (nextUrl) {
      const response = await axios.get(nextUrl, { headers });

      if (response.data?.results?.length) {
        for (const item of response.data.results) {
          const lastTransaction = item.transactions?.[0] || null;
          const totalSpent = item.transactions?.reduce((sum, tx) => sum + tx.amount, 0) || 0;

          allResults.push({
            id: item.id,
            subscription_name: item.name,
            last_amount_spent: lastTransaction?.amount || null,
            last_payment_date: lastTransaction?.value_date || null,
            frequency: item.frequency,
            average_amount: item.average_transaction_amount,
            median_amount: item.median_transaction_amount,
            total_spent_amount: Number(totalSpent.toFixed(2)),
            days_since_last_payment: item.days_since_last_transaction,
            category: item.category,
            payment_type: item.payment_type,
            account_name: item.account?.name || null,
            account_number: item.account?.number || null,
            account_balance_current: item.account?.balance?.current || null,
            currency: item.account?.currency || null
          });
        }
      }

      nextUrl = response.data.next || null;
    }

    return res.status(200).json(allResults);
  } catch (error) {
    console.error("Error fetching recurring expenses:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to fetch subscription information" });
  }
};




