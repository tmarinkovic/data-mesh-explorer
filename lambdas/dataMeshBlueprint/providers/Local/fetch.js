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
                        },
                        {
                            "table": "table 1",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 2",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 3",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 4",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 5",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 6",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 7",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 8",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 9",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 10",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 11",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 12",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 13",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 14",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 15",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 16",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 17",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 18",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 19",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
                            ]
                        },
                        {
                            "table": "table 20",
                            "columns": [
                                {"Name": "Id", "Type": "Integer", "Comment": "Identifier"},
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
                                {"Name": "Facts", "Type": "Array", "Comment": "List of facts about certain mammals"},
                                {
                                    "Name": "Column 1",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 2",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 3",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 4",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 5",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 6",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 7",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 8",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 9",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 10",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 11",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 12",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 13",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 14",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 15",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 16",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 17",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 18",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 19",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
                                {
                                    "Name": "Column 20",
                                    "Type": "String",
                                    "Comment": "Adding a lot of columns to this table"
                                },
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