const fetch = () => {
    return {
        "Animals": {
            "Mammals": {
                "inputPorts": {
                    "mammalEvolution": [
                        {
                            "table": "history",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                                {"Name": "Name", "Type": "String", "Comment": "Name of history book"},
                                {"Name": "Year", "Type": "Integer", "Comment": "Year of publishing"}
                            ]
                        }
                    ],
                    "mammalsList": [
                        {
                            "table": "mammals",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                                {"Name": "Name", "Type": "String", "Comment": "Name of mammal"},
                                {"Name": "Year", "Type": "Integer", "Comment": "Year of discovery"},
                                {"Name": "Amount", "Type": "Integer", "Comment": "Amount of mammal left on earth"}
                            ]
                        }
                    ],
                },
                "outputPorts": {
                    "enriched_mammals": [
                        {
                            "table": "mammals_facts",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                                {"Name": "Name", "Type": "String", "Comment": "Name of the mammal"},
                            ]
                        }
                    ],
                }
            }
        }
    }
}

module.exports = fetch;