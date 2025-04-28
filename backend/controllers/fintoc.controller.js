const axios = require('axios');

exports.generateToken = async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.fintoc.com/v1/subscription_intents',
            {
                holder_type: 'individual',     // 'individual' or 'business'
                product: 'subscriptions',      // required product type
            },
            {
                headers: {
                    Authorization: process.env.FINTOC_SECRET_KEY, // NO 'Bearer' prefix
                    'Content-Type': 'application/json',
                },
            }
        );

        const widgetToken = response.data.widget_token;
        res.status(200).json({ widgetToken });
    } catch (error) {
        console.error('Error creating widget token:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create widget token' });
    }
};
