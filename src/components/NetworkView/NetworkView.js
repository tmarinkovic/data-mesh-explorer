import Sigma from "react-sigma";
import RelativeSize from "react-sigma/lib/RelativeSize";
import {useDispatch, useSelector} from "react-redux";
import getNetworkSpecification from "./networkSpecification";
import {setDataProduct, setDomain, setInputPort, setOutputPort} from "../../app/reducers/selected";

const NetworkView = () => {

    const blueprint = useSelector((state) => state.blueprint.value)
    const graph = getNetworkSpecification(blueprint)
    const dispatch = useDispatch()


    const onNodeClick = e => {
        dispatch(setDomain(e.data.node.domain))
        dispatch(setDataProduct(e.data.node.dataProduct))
        dispatch(setInputPort(e.data.node.inputPort))
        dispatch(setOutputPort(e.data.node.outputPort))
    }

    const drawNetwork = () => {
        if (graph.nodes.length !== 0 && graph.edges.length !== 0) {
            return (
                <Sigma
                    onClickNode={e => onNodeClick(e)}
                    graph={graph}
                    settings={
                        {
                            drawEdges: true,
                            clone: false,
                            labelThreshold: 0
                        }
                    }>
                    <RelativeSize initialSize={1000}/>
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