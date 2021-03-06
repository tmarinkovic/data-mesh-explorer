import Sigma from "react-sigma";
import {useDispatch, useSelector} from "react-redux";
import getNetworkSpecification from "./networkSpecification";
import {setDataProduct, setDomain, setInputPort, setOutputPort} from "../../app/reducers/selected";
import './NetworkView.css'

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
                <div style={{position: "relative"}}>
                    <div className="network-legend">
                        <div className="circle input-port"/>
                        Input Port
                        <br/>
                        <div style={{clear: "both"}}/>
                        <div className="circle data-product"/>
                        Data Product
                        <br/>
                        <div style={{clear: "both"}}/>
                        <div className="circle output-port"/>
                        Output port
                        <br/>
                    </div>
                    <Sigma
                        style={{height: "380px"}}
                        onClickNode={e => onNodeClick(e)}
                        graph={graph}
                        settings={
                            {
                                drawEdges: true,
                                clone: false,
                                labelThreshold: 0
                            }
                        }>
                    </Sigma>
                </div>
            )
        }
    }


    return (
        <div style={{height: "385px"}}>
            {drawNetwork()}
        </div>
    )
}

export default NetworkView