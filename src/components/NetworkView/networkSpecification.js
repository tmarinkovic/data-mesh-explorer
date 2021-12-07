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

const createNode = (label, type) => {
    const {nodeX, nodeY} = calculatePosition(type)
    return createNodeWithPosition(label, type, nodeX, nodeY)
}

const createNodeWithPosition = (label, type, nodeX, nodeY) => {
    const id = nodeIds
    graph.nodes.push({id: `n${nodeIds}`, label: label, x: nodeX, y: nodeY})
    nodeIds++
    return id
}

const createNodes = (type, ports) => {
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
    for (var i = 0; i < nodesY.length; i++) {
        nodes.push(createNodeWithPosition(ports[i], type, nodesX, nodesY[i]))
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
    for (const [, domain] of Object.entries(blueprint)) {
        for (const [dataProductName, dataProduct] of Object.entries(domain)) {
            const dataProductNodeId = createNode(dataProductName, "dataProduct")

            const inputPortsArray = Object.entries(dataProduct.inputPorts)
            const inputPortNodeIds = createNodes("inputPort", inputPortsArray.map(databaseName => databaseName[0]))
            createEdges({portIds: inputPortNodeIds, dataProductNodeId, type: "inputPort"})

            const outputPortsArray = Object.entries(dataProduct.outputPorts)
            const outputPortNodeIds = createNodes("outputPort", outputPortsArray.map(databaseName => databaseName[0]))
            createEdges({portIds: outputPortNodeIds, dataProductNodeId, type: "outputPort"})
        }
    }
    console.log(graph)
    return graph
}

export default getNetworkSpecification