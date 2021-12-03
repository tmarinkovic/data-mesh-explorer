const AWS = require('aws-sdk')
const glue = new AWS.Glue({apiVersion: '2017-03-31', region: 'eu-west-1'});

const getTables = database => {
    return glue.getTables({DatabaseName: database}).promise().then(result => result.TableList)
}

const getTable = (database, table) => {
    return glue.getTable({DatabaseName: database, Name: table}).promise().then(result => result.Table)
}

const getGlueInfo = database => {
    return getTables(database).then(tables => tables)
}

const fetch = async blueprint => {
    for (const [domainName, domain] of Object.entries(blueprint)) {
        for (const [dataProductName, dataProduct] of Object.entries(domain)) {
            console.log("Reading input port:")
            for (const [databaseName, tables] of Object.entries(dataProduct.inputPorts)) {
                console.log(databaseName)
                blueprint[domainName][dataProductName].inputPorts[databaseName] = []
                if (tables[0] === 'all') {
                    await getGlueInfo(databaseName).then(tables => tables.map(table => {
                        return blueprint[domainName][dataProductName].inputPorts[databaseName].push({
                            table: table.Name,
                            columns: table.StorageDescriptor.Columns
                        })
                    }))
                } else {
                    tables.map(async (table) => await getTable(databaseName, table)
                        .then(tableInfo => blueprint[domainName][dataProductName].inputPorts[databaseName].push({
                            table: tableInfo.Name,
                            columns: tableInfo.StorageDescriptor.Columns
                        }))
                    )
                }
            }

            console.log("Reading output port:")
            for (const [databaseName, tables] of Object.entries(dataProduct.outputPorts)) {
                console.log(databaseName)
                blueprint[domainName][dataProductName].outputPorts[databaseName] = []
                if (tables[0] === 'all') {
                    await getGlueInfo(databaseName).then(tables => tables.map(table => {
                        return blueprint[domainName][dataProductName].outputPorts[databaseName].push({
                            table: table.Name,
                            columns: table.StorageDescriptor.Columns
                        })
                    }))
                } else {
                    tables.map(table => getTable(databaseName, table)
                        .then(tableInfo => blueprint[domainName][dataProductName].outputPorts[databaseName].push({
                            table: tableInfo.Name,
                            columns: tableInfo.StorageDescriptor.Columns
                        }))
                    )
                }
            }
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify(blueprint)
    };
}

module.exports = fetch;