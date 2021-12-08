import {useEffect, useState} from "react";
import {setDataProduct, setDomain, setInputPort, setOutputPort} from "../../app/reducers/selected";
import {useDispatch, useSelector} from "react-redux";
import {Autocomplete} from "@mui/material";
import {Paper, TextField} from "@material-ui/core";

const SearchAutocomplete = ({setTables}) => {

    const dispatch = useDispatch()
    const blueprint = useSelector((state) => state.blueprint.value)
    const selectedDomain = useSelector((state) => state.selected.domain)
    const selectedDataProduct = useSelector((state) => state.selected.dataProduct)
    const selectedInputPort = useSelector((state) => state.selected.inputPort)
    const selectedOutputPort = useSelector((state) => state.selected.outputPort)


    const [domainList, setDomainList] = useState([]);
    const [dataProductList, setDataProductList] = useState([]);
    const [inputPortList, setInputPortList] = useState([]);
    const [outputPortList, setOutputPortList] = useState([]);

    useEffect(() => {
        const domains = []
        for (const [domainName,] of Object.entries(blueprint)) {
            domains.push(domainName)
        }
        setDomainList(domains)
    }, [blueprint]);

    useEffect(() => {
        if (selectedDomain != null) {
            onDomainChanged({target: {textContent: selectedDomain}})
        }
    }, [selectedDomain]);

    useEffect(() => {
        if (selectedDataProduct != null) {
            onDataProductChanged({target: {textContent: selectedDataProduct}})
        }
    }, [selectedDataProduct]);

    useEffect(() => {
        if (selectedInputPort != null) {
            onInputPortChanged({target: {textContent: selectedInputPort}})
        }
    }, [selectedInputPort]);

    useEffect(() => {
        if (selectedOutputPort != null) {
            onOutputPortChanged({target: {textContent: selectedOutputPort}})
        }
    }, [selectedOutputPort]);

    const onDomainChanged = e => {
        const domainName = e.target.textContent
        dispatch(setDomain(domainName))

        const dataProducts = []
        for (const [dataProductName,] of Object.entries(blueprint[domainName])) {
            dataProducts.push(dataProductName)
        }
        setDataProductList(dataProducts)
    }

    const onDataProductChanged = e => {
        const dataProductName = e.target.textContent
        dispatch(setDataProduct(dataProductName))

        const inputPorts = []
        const outputPorts = []
        for (const [databaseName, database] of Object.entries(blueprint[selectedDomain][dataProductName].inputPorts)) {
            if (isNaN(parseInt(databaseName)) === false) {
                inputPorts.push(`${database.split(".")[1]}.${database.split(".")[3]}`)
            } else {
                inputPorts.push(databaseName)
            }

        }
        for (const [databaseName,] of Object.entries(blueprint[selectedDomain][dataProductName].outputPorts)) {
            outputPorts.push(databaseName)
        }
        setInputPortList(inputPorts)
        setOutputPortList(outputPorts)
    }

    const onInputPortChanged = e => {
        const inputPortName = e.target.textContent
        dispatch(setInputPort(inputPortName))
        dispatch(setOutputPort(null))
        const tableNames = blueprint[selectedDomain][selectedDataProduct].inputPorts[inputPortName].map(table => {
            return table.table
        })
        setTables(tableNames)
    }

    const onOutputPortChanged = e => {
        const outputPortName = e.target.textContent
        dispatch(setOutputPort(outputPortName))
        dispatch(setInputPort(null))
        const tableNames = blueprint[selectedDomain][selectedDataProduct].outputPorts[outputPortName].map(table => {
            return table.table
        })
        setTables(tableNames)
    }

    return (
        <Paper elevation={4}>
            <Autocomplete
                disablePortal
                value={selectedDomain}
                onChange={e => onDomainChanged(e)}
                className="autocomplete-field"
                options={domainList}
                renderInput={(params) => <TextField variant="outlined" {...params} label="Domain"/>}
            />
            <Autocomplete
                disablePortal
                value={selectedDataProduct}
                onChange={e => onDataProductChanged(e)}
                className="autocomplete-field"
                options={dataProductList}
                renderInput={(params) => <TextField variant="outlined" {...params} label="Data Product"/>}
            />
            <Autocomplete
                disablePortal
                value={selectedInputPort}
                onChange={e => onInputPortChanged(e)}
                className="autocomplete-field"
                options={inputPortList}
                renderInput={(params) => <TextField variant="outlined" {...params} label="Input Port"/>}
            />
            <Autocomplete
                disablePortal
                value={selectedOutputPort}
                onChange={e => onOutputPortChanged(e)}
                className="autocomplete-field"
                options={outputPortList}
                renderInput={(params) => <TextField variant="outlined" {...params} label="Output Port"/>}
            />
        </Paper>
    )
}

export default SearchAutocomplete