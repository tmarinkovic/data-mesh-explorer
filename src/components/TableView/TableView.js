import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux'
import './tableView.css';
import {setSearchQuery, triggerSearch} from "../../app/reducers/search";
import {useEffect, useState} from "react";


const TableView = () => {
    const dispatch = useDispatch()
    const searchResult = useSelector((state) => state.search.result)
    let tableCount = 0
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(tableCount)
    }, [searchResult, tableCount]);

    const drawTable = () => {
        let tableHTML = []
        for (const [domainName, domain] of Object.entries(searchResult)) {
            for (const [dataProductName, dataProduct] of Object.entries(domain)) {
                ["inputPorts", "outputPorts"].forEach(portType => {
                    if (portType in dataProduct) {
                        for (const [databaseName, tables] of Object.entries(dataProduct[portType])) {
                            drawTableContent(tables, tableHTML, portType, databaseName, domainName, dataProductName)
                        }
                    }
                })
            }
        }
        return tableHTML;
    }

    const drawTableContent = (tables, tableHTML, portType, databaseName, domainName, dataProductName) => {
        tables.forEach(table => {
            tableCount++
            tableHTML.push(
                <TableContainer key={`${databaseName}${table.table}`} className="table-container" component={Paper}>
                    <div className="white-text div-chip">
                        {`${domainName} / ${dataProductName} / ${portType}`} / <span onClick={e => setSearchTerm(e)}
                                                                                     className="intractable-white">{databaseName}</span> / <span
                        onClick={e => setSearchTerm(e)} className="intractable-white">{table.table}</span>
                    </div>
                    <Table sx={{minWidth: 650}} size="small"
                           aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Column Name</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="left">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table.columns.map((row) => (
                                <TableRow key={`${row.Name}`} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell align="left"><span onClick={e => setSearchTerm(e)}
                                                                  className="intractable-primary">{row.Name}</span></TableCell>
                                    <TableCell align="left">{row.Type}</TableCell>
                                    <TableCell align="left">{row.Comment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        })
    }

    const setSearchTerm = e => {
        dispatch(setSearchQuery(e.target.textContent))
        dispatch(triggerSearch())
    }

    return (
        <div>
            <div className="tables-count">{count} table(s) found</div>
            {drawTable()}
        </div>
    )
}

export default TableView