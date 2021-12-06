const json = {
    "DomainName": {
        "DataProductName": {
            "inputPorts": {
                "databaseOneName": [
                    "tableOneName",
                    "tableTwoName",
                ],
                "databaseTwoName": ["all"]
            },
            "outputPorts": {
                "databaseOneName": ["all"]
            }
        }
    }
}

module.exports = json;