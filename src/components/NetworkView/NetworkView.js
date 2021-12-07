import Sigma from "react-sigma";
import RelativeSize from "react-sigma/lib/RelativeSize";
import RandomizeNodePositions from "react-sigma/lib/RandomizeNodePositions";
import {useSelector} from "react-redux";

const NetworkView = () => {

    const blueprint = useSelector((state) => state.blueprint.value)
    const graph = {nodes: [], edges: []}

    let nodeIds = 0
    let edgeIds = 0

    const createNode = (label) => {
        const id = nodeIds
        graph.nodes.push({id: `n${nodeIds}`, label: label})
        nodeIds++
        return id
    }

    const createEdge = (sourceId, targetId) => {
        graph.edges.push({id: `e${edgeIds}`, source: `n${sourceId}`, target: `n${targetId}`})
        edgeIds++
    }

    for (const [, domain] of Object.entries(blueprint)) {
        for (const [dataProductName, dataProduct] of Object.entries(domain)) {
            const dataProductNodeId = createNode(dataProductName)
            for (const [databaseName,] of Object.entries(dataProduct.inputPorts)) {
                const inputPortNodeId = createNode(databaseName)
                createEdge(inputPortNodeId, dataProductNodeId)
            }
            for (const [databaseName,] of Object.entries(dataProduct.outputPorts)) {
                const outputPortNodeId = createNode(databaseName)
                createEdge(dataProductNodeId, outputPortNodeId)
            }
        }
    }

    const drawNetwork = () => {
        if (graph.nodes.length !== 0 && graph.edges.length !== 0) {
            return (
                <Sigma graph={graph} settings={{drawEdges: true, clone: false}}>
                    <RelativeSize initialSize={15}/>
                    <RandomizeNodePositions/>
                </Sigma>
            )
        }
    }


    return (
        <div>
            {drawNetwork()}
        </div>
    )
}

export default NetworkView