const { User, Bank, Subscription } = require('../models');
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
     await client.connect();
     console.log('internal error?');
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

const BELVO_API_URL = process.env.BELVO_API_URL || "https://developers.belvo.com/_mock/apis/belvoopenapispec/api";
const BELVO_SECRET_ID = process.env.BELVO_PUBLIC_KEY;
const BELVO_SECRET_PASSWORD = process.env.BELVO_SECRET_KEY;

const authHeader = Buffer.from(`${BELVO_SECRET_ID}:${BELVO_SECRET_PASSWORD}`).toString("base64");
const headers = {
  Authorization: `Basic ${authHeader}`,
  "Content-Type": "application/json"
};

exports.getSubscriptionInformation = async (req, res) => {
  const linkId = req.query.link;
  const institutionName = req.query.institutionName;
  const user = req.user;

  if (!linkId || !institutionName) {
    return res.status(400).json({ error: "Missing 'link' or 'institutionName' parameter" });
  }

  try {
    const [bank, created] = await Bank.findOrCreate({
      where: {
        userId: user.id,
        institutionName: institutionName,
      },
      defaults: {
        link: linkId,
        userId: user.id,
        institutionName: institutionName,
      },
    });

    if (!created) {
      await bank.update({ link: linkId });
    }

    // const existingSubscriptions = await Subscription.findAll({
    //   where: { bankId: bank.id },
    // });

    // const existingMap = new Map();
    // for (const sub of existingSubscriptions) {
    //   const key = `${sub.subscription_name}__${sub.frequency}`;
    //   existingMap.set(key, sub);
    // }

    // const incomingKeys = new Set();
    // const newSubscriptions = [];
    // let nextUrl = `${BELVO_API_URL}/recurring-expenses/?link=${linkId}`;

    // // while (nextUrl) {
    //   const response = await axios.get(nextUrl, { headers });
    //   const results = response.data?.results || [];

    //   for (const item of results) {
    //     const key = `${item.name}__${item.frequency}`;
    //     incomingKeys.add(key);

    //     if (existingMap.has(key)) continue;

    //     const account = item.account || {};

    //     newSubscriptions.push({
    //       subscription_name: item.name,
    //       amount: item.amount || item.average_transaction_amount || 0,
    //       frequency: item.frequency,
    //       days_since_last_transaction: item.days_since_last_transaction,
    //       category: item.category || "Uncategorized",
    //       payment_type: item.payment_type || "UNKNOWN",
    //       balance_available: account.balance?.current || 0,
    //       bankId: bank.id,
    //     });
    //   }
    // // will consider subscription is updated.. so will update the subscription
    // //   nextUrl = response.data.next || null;
    // // }

    // const idsToDelete = [];
    // for (const [key, sub] of existingMap.entries()) {
    //   if (!incomingKeys.has(key)) {
    //     idsToDelete.push(sub.id);
    //   }
    // }

    // if (idsToDelete.length > 0) {
    //   await Subscription.destroy({ where: { id: idsToDelete } });
    // }

    // if (newSubscriptions.length > 0) {
    //   await Subscription.bulkCreate(newSubscriptions);
    // }

    const monthlySubscriptions = await getSubscriptionTransactionsEachMonth(req, res);
    const lastSubscriptions = await getRecentSubscriptionTransactions (req, res);
    console.log('monthlySubscriptions:', monthlySubscriptions);
    console.log('lastSubscriptions:', lastSubscriptions);
    return res.status(200).json({ subscriptionsEachMonth: monthlySubscriptions, lastSubscriptions: lastSubscriptions });
  } catch (error) {
    console.error("Failed to fetch subscriptions:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to fetch subscription information" });
  }
};

exports.getMonthSubscriptionInformationByTransaction = async (req, res) => {
  try {
    const result = await getSubscriptionTransactionsEachMonth(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error in getMonthSubscriptionInformationByTransaction:", error);
    return res.status(500).json({ error: error.message || "Server Error" });
  }
};

exports.getRecentSubscriptionInformationByTransaction = async (req, res) => {
  try {
    const result = await getRecentSubscriptionTransactions(req, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error in getRecentSubscriptionTransactions:", error);
    return res.status(500).json({ error: error.message || "Server Error" });
  }
}

exports.verifyUserBankConnection = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming middleware sets req.user
    const banks = await Bank.findAll({ where: { userId } });

    if (!banks || banks.length === 0) {
      return res.status(404).json({ message: 'No connected banks found for the user' , result: false});
    }

    res.status(200).json({ message: 'User has connected banks', result: true });
  } catch (error) {
    console.error("Error verifying user bank connection:", error);
    res.status(500).json({ message: 'Failed to verify user bank connection', error: error.message });
  }
};

exports.getSubscriptionInformationByGmail = async (req, res) => {
  return res.json('okay');
}

const getRecentSubscriptionTransactions = async (req, res) => {
    try {
    const userId = req.user.id;
    const banks = await Bank.findAll({ where: { userId } });

    if (!banks || banks.length === 0) {
      return res.status(404).json({ error: 'No banks found for user' });
    }

    const getTransactionsInRange = async (dateFrom, dateTo) => {
      const transactions = [];

      for (const bank of banks) {
        let nextUrl = `${BELVO_API_URL}/transactions/?link=${bank.link}&date_from=${dateFrom}&date_to=${dateTo}`;

        // while (nextUrl) {
          const response = await axios.get(nextUrl, { headers });
          const data = response.data;

          for (const tx of data.results) {
            const category = tx.category?.toLowerCase() || '';
            const type = tx.type?.toLowerCase() || '';
            const description = tx.description?.toLowerCase() || '';

            if (
              category.includes('subscription') ||
              type.includes('subscription') ||
              description.includes('subscription')
            ) {
              transactions.push(tx);
            }
          }

          nextUrl = data.next || null; // Update nextUrl for pagination
        // }
      }

      return transactions;
    };

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);

    const dateToday = today.toISOString().split('T')[0];
    const dateFromPast = sevenDaysAgo.toISOString().split('T')[0];
    const dateToFuture = sevenDaysLater.toISOString().split('T')[0];

    const pastWeek = await getTransactionsInRange(dateFromPast, dateToday);
    const upcomingWeek = await getTransactionsInRange(dateToday, dateToFuture);

    return { pastWeek, upcomingWeek };
  } catch (error) {
    console.error("Error fetching recent subscription transactions:", error);
    return error.message;
  }
};

const getSubscriptionTransactionsEachMonth = async (req, res) => {
  const MONTH_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  try {
    const userId = req.user.id; // assuming middleware sets req.user
    const banks = await Bank.findAll({ where: { userId } });
    if (!banks || banks.length === 0) {
      return res.status(404).json({ error: 'No banks found for user' });
    }

    const subscriptionTransactions = [];

    for (const bank of banks) {
      let nextUrl = `${BELVO_API_URL}/transactions/?link=${bank.link}`;

      // while (nextUrl) {
        const response = await axios.get(nextUrl, { headers });
        const data = response.data;

        for (const tx of data.results) {
          const category = tx.category?.toLowerCase() || '';
          const type = tx.type?.toLowerCase() || '';
          const description = tx.description?.toLowerCase() || '';

          if (category.includes('subscription') || type.includes('subscription') || description.includes('subscription')) {
            subscriptionTransactions.push(tx);
          }
        }

        nextUrl = data.next;
      // }
    }

    const groupedByMonth = {};
    for (const tx of subscriptionTransactions) {
      if (!tx.transacted_at) continue;
      const date = new Date(tx.transacted_at);
      if (isNaN(date)) continue;

      const monthName = MONTH_NAMES[date.getUTCMonth()];
      if (!groupedByMonth[monthName]) groupedByMonth[monthName] = [];
      groupedByMonth[monthName].push(tx);
    }

    return groupedByMonth;
  } catch (error) {
    console.error(error);
    return error.message
  }
};
