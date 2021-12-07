import Sigma from "react-sigma";
import RelativeSize from "react-sigma/lib/RelativeSize";
import {useSelector} from "react-redux";
import getNetworkSpecification from "./networkSpecification";

const NetworkView = () => {

    const blueprint = useSelector((state) => state.blueprint.value)
    const graph = getNetworkSpecification(blueprint)

    const drawNetwork = () => {
        if (graph.nodes.length !== 0 && graph.edges.length !== 0) {
            return (
                <Sigma graph={graph} settings={{drawEdges: true, clone: false}}>
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