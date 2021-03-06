const getDataMeshBlueprint = require('./lambdas/dataMeshBlueprint/index');
const providers = require('./lambdas/dataMeshBlueprint/providers/providers');

exports.getDataMeshBlueprint = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(getDataMeshBlueprint(providers.LOCAL)),
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
    };
};
