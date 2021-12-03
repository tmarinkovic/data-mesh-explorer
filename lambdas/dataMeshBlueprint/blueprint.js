const json = {
    "Customer": {
        "Customer Behaviour": {
            "inputPorts": {
                "standardized_glovo_live": [
                    "cities",
                    "orders",
                    "devices",
                    "customers",
                    "customer_subscriptions",
                    "customer_subscription_periods",
                    "stores",
                    "store_categories"
                ],
                "ca_refinery_mpcustomer_screen_view": ["all"],
                "ca_refinery_mpcustomer_custom_event": ["all"]
            },
            "outputPorts": {
                "ca_customer_behaviour": ["all"]
            }
        }
    }
}

module.exports = json;