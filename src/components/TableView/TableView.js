import {Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useSelector} from 'react-redux'
import './tableView.css';


const TableView = () => {

    const blueprint = useSelector((state) => state.searchResult.value)

    const drawTable = () => {
        let tableHTML = []
        for (const [, domain] of Object.entries(blueprint)) {
            for (const [, dataProduct] of Object.entries(domain)) {
                for (const [databaseName, tables] of Object.entries(dataProduct.inputPorts)) {
                    drawTableContent(tables, tableHTML, databaseName)
                }
                for (const [databaseName, tables] of Object.entries(dataProduct.outputPorts)) {
                    drawTableContent(tables, tableHTML, databaseName)
                }
            }
        }
        return tableHTML;
    }

    const drawTableContent = (tables, tableHTML, databaseName) => {
        tables.forEach(table => {
            tableHTML.push(
                <TableContainer key={`${databaseName}${table.table}`} className="table-container" component={Paper}>
                    <Chip label={databaseName} color="primary"/>
                    <Chip label={table.table} color="secondary"/>
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