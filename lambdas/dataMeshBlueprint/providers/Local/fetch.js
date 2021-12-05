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
                        },
                        {
                            "table": "evolution",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                                {"Name": "Path", "Type": "String", "Comment": "Path of evolution"},
                                {"Name": "Year", "Type": "Integer", "Comment": "Year of evolution"}
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
                                {"Name": "Facts", "Type": "Array", "Comment": "List of facts about certain mammals"}
                            ]
                        },
                        {
                            "table": "mammals",
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