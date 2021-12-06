import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useSelector} from 'react-redux'
import './tableView.css';


const TableView = () => {

    const blueprint = useSelector((state) => state.searchResult.value)

    const drawTable = () => {
        let tableHTML = []
        for (const [domainName, domain] of Object.entries(blueprint)) {
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
            tableHTML.push(
                <TableContainer key={`${databaseName}${table.table}`} className="table-container" component={Paper}>
                    <Chip label={`${domainName} / ${dataProductName} / ${portType} /  ${databaseName} / ${table.table}`}
                          color="primary"/>
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
                                    <TableCell align="left">{row.Name}</TableCell>
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

    return drawTable()

}

export default TableView