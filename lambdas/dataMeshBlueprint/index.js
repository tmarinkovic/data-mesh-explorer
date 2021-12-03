const blueprint = require('./blueprint.js');

const getDataMeshBlueprint = provider => {
    const providerImpl = require(`./providers/${provider}/fetch`);
    return providerImpl(blueprint)
}

module.exports = getDataMeshBlueprint;

