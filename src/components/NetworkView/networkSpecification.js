let nodeIds = 0
let edgeIds = 0
let x = 0
let y = 0
const graph = {nodes: [], edges: []}
const xOffsetPerLevel = 1500
const yOffsetPerLevel = 1500
const sizeOfRenderPerDataProduct = 1000

const calculatePosition = (level, type, size = 1) => {
    const xOffset = (level - 1) * xOffsetPerLevel
    let nodeX = x + xOffset
    let nodeY = y
    if (type === 'dataProduct') {
        nodeX = x + xOffset + sizeOfRenderPerDataProduct / 2
        nodeY = y + sizeOfRenderPerDataProduct / 2
    }
    return {nodeX, nodeY}
}

const createNode = (level, label, type, domainName, dataProductName) => {
    const {nodeX, nodeY} = calculatePosition(level, type)
    return createNodeWithPosition(label, type, nodeX, nodeY, domainName, dataProductName, null, null)
}

const createNodeWithPosition = (label, type, nodeX, nodeY, domainName, dataProductName, inputPort, outputPort) => {
    let color = "#000"
    if (inputPort === null && outputPort === null) {
        color = "#388e3c"
    } else if (inputPort === null) {
        color = "#eb8034"
    } else if (outputPort === null) {
        color = "#f0139b"
    }
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
        color: color,
        size: 10
    })
    nodeIds++
    return id
}

const createNodes = (level, type, ports, domainName, dataProductName) => {
    const xOffset = (level - 1) * xOffsetPerLevel
    let nodesX = x
    if (type === 'inputPort') {
        nodesX = x + xOffset
    }
    if (type === 'outputPort') {
        nodesX = x + xOffset + sizeOfRenderPerDataProduct
    }

    let nodesY = []
    const size = ports.length
    if (size === 1) {
        nodesY = [y + 500]
    } else if (size === 2) {
        nodesY = [y + 0, y + sizeOfRenderPerDataProduct]
    } else {
        nodesY.push(y + 0)
        const part = sizeOfRenderPerDataProduct / (size - 1)
        for (let i = 1; i < size - 1; i++) {
            nodesY.push(y + part * i)
        }
        nodesY.push(y + sizeOfRenderPerDataProduct)
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
            graph.edges.push({
                id: `e${edgeIds}`,
                source: `n${inputPortId}`,
                target: `n${dataProductNodeId}`,
                color: "#000"
            })
        } else {
            graph.edges.push({
                id: `e${edgeIds}`,
                target: `n${inputPortId}`,
                source: `n${dataProductNodeId}`,
                color: "#000"
            })
        }
        edgeIds++
    })

}

const calculateStartingPositionForNewLevel = (numberOfDataProductPreviousLayer, numberOfDataProductCurrentLayer) => {
    let yStartingPosition = 0
    const previousLayerHeight = numberOfDataProductPreviousLayer * sizeOfRenderPerDataProduct
    if (numberOfDataProductCurrentLayer === 1) {
        yStartingPosition = previousLayerHeight / 2
    } else {
        //TODO
    }
    return yStartingPosition
}

const connectNodes = (nodes, connections) => {
    const foundNodeIds = []
    const pathToOutputPorts = connections.map(connection => connection.split("."))
    nodes.forEach(node => {
        pathToOutputPorts.forEach(pathToOutputPort => {
            if (
                pathToOutputPort[0] === node.domain &&
                pathToOutputPort[1] === node.dataProduct &&
                pathToOutputPort[3] === node.outputPort) {
                foundNodeIds.push(node.id.replace("n", ""))
            }
        })
    })
    return foundNodeIds
}

const getNetworkSpecification = blueprint => {
    const numberOfDataProductPerLevel = []
    let currentLevel = 1
    for (const [, domain] of Object.entries(blueprint)) {
        for (const [, dataProduct] of Object.entries(domain)) {
            const level = dataProduct.level

            if (level > currentLevel) {
                currentLevel++
            }

            if (numberOfDataProductPerLevel[level]) {
                numberOfDataProductPerLevel[level]++
            } else {
                numberOfDataProductPerLevel[level] = 1
            }
        }
    }

    currentLevel = 1
    for (const [domainName, domain] of Object.entries(blueprint)) {
        for (const [dataProductName, dataProduct] of Object.entries(domain)) {
            const level = dataProduct.level

            if (level > currentLevel) {
                y = calculateStartingPositionForNewLevel(numberOfDataProductPerLevel[currentLevel], numberOfDataProductPerLevel[level])
                currentLevel++
            }

            const dataProductNodeId = createNode(level, dataProductName, "dataProduct", domainName, dataProductName)

            const inputPortsArray = Object.entries(dataProduct.inputPorts)

            let inputPortNodeIds = null
            if (inputPortsArray[0][0] === '0') {
                const connectionNodeIds = connectNodes(graph.nodes, inputPortsArray.map(databaseName => databaseName[1]))
                createEdges({portIds: connectionNodeIds, dataProductNodeId, type: "outputPort"})
            } else {
                inputPortNodeIds = createNodes(level, "inputPort", inputPortsArray.map(databaseName => databaseName[0]), domainName, dataProductName)
                createEdges({portIds: inputPortNodeIds, dataProductNodeId, type: "inputPort"})
            }

            const outputPortsArray = Object.entries(dataProduct.outputPorts)
            const outputPortNodeIds = createNodes(level, "outputPort", outputPortsArray.map(databaseName => databaseName[0]), domainName, dataProductName)
            createEdges({portIds: outputPortNodeIds, dataProductNodeId, type: "outputPort"})

            y += yOffsetPerLevel
        }
    }
    return graph
}

export default getNetworkSpecification