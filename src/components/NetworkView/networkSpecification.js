let nodeIds = 0
let edgeIds = 0
let x = 0
let y = 0
const graph = {nodes: [], edges: []}

const calculatePosition = (type, size = 1) => {
    let nodeX = x
    let nodeY = y
    if (type === 'dataProduct') {
        nodeX = x + 500
        nodeY = y + 500
    }
    if (type === 'inputPort') {
    }
    if (type === 'outputPort') {
        nodeX++
        nodeX++
    }
    return {nodeX, nodeY}
}

const createNode = (label, type, domainName, dataProductName) => {
    const {nodeX, nodeY} = calculatePosition(type)
    return createNodeWithPosition(label, type, nodeX, nodeY, domainName, dataProductName, null, null)
}

const createNodeWithPosition = (label, type, nodeX, nodeY, domainName, dataProductName, inputPort, outputPort) => {
    const id = nodeIds
    graph.nodes.push({
        id: `n${nodeIds}`,
        label: label,
        x: nodeX,
        y: nodeY,
        domain: domainName,
        dataProduct: dataProductName,
        inputPort: inputPort,
        outputPort: outputPort,
    })
    nodeIds++
    return id
}

const createNodes = (type, ports, domainName, dataProductName) => {
    let nodesX = x
    if (type === 'outputPort') {
        nodesX = x + 1000
    }

    let nodesY = []
    const size = ports.length
    if (size === 1) {
        nodesY = [500]
    } else if (size === 2) {
        nodesY = [0, 1000]
    } else {
        // TODO
    }
    const nodes = []
    let inputPortValue = null
    let outputPortValue = null
    for (let i = 0; i < nodesY.length; i++) {
        if (type === 'inputPort') {
            inputPortValue = ports[i]
        }
        if (type === 'outputPort') {
            outputPortValue = ports[i]
        }
        nodes.push(createNodeWithPosition(ports[i], type, nodesX, nodesY[i], domainName, dataProductName, inputPortValue, outputPortValue))
    }
    return nodes
}

const createEdges = ({portIds, dataProductNodeId, type}) => {
    portIds.forEach(inputPortId => {
        if (type === 'inputPort') {
            graph.edges.push({id: `e${edgeIds}`, source: `n${inputPortId}`, target: `n${dataProductNodeId}`})
        } else {
            graph.edges.push({id: `e${edgeIds}`, target: `n${inputPortId}`, source: `n${dataProductNodeId}`})
        }
        edgeIds++
    })

}

const getNetworkSpecification = blueprint => {
    for (const [domainName, domain] of Object.entries(blueprint)) {
        for (const [dataProductName, dataProduct] of Object.entries(domain)) {
            const dataProductNodeId = createNode(dataProductName, "dataProduct", domainName, dataProductName)

            const inputPortsArray = Object.entries(dataProduct.inputPorts)
            const inputPortNodeIds = createNodes("inputPort", inputPortsArray.map(databaseName => databaseName[0]), domainName, dataProductName)
            createEdges({portIds: inputPortNodeIds, dataProductNodeId, type: "inputPort"})

            const outputPortsArray = Object.entries(dataProduct.outputPorts)
            const outputPortNodeIds = createNodes("outputPort", outputPortsArray.map(databaseName => databaseName[0]), domainName, dataProductName)
            createEdges({portIds: outputPortNodeIds, dataProductNodeId, type: "outputPort"})
        }
    }
    return graph
}

export default getNetworkSpecification