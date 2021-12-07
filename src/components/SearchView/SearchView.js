import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import "./SearchView.css"
import {useState} from "react";
import SearchAutocomplete from "../SearchAutocomplete/SearchAutocomplete";
import {setSearchQuery} from "../../app/reducers/search";
import {useDispatch} from "react-redux";

const SearchView = () => {

    const dispatch = useDispatch()
    const [tables, setTables] = useState([]);

    const setSearchTerm = e => {
        dispatch(setSearchQuery(e.target.textContent))
    }

    return (
        <Grid className="search-view-container" container spacing={2}>
            <Grid item xs={6}>
                <SearchAutocomplete setTables={setTables}/>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={4}>
                    <TableContainer className="table-container" component={Paper}>
                        <Table sx={{minWidth: 650}} size="small"
                               aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Table name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tables.map((row) => (
                                    <TableRow key={`${row}`}>
                                        <TableCell align="left">
                                            <span onClick={e => setSearchTerm(e)}
                                                  className="intractable-primary">{row}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default SearchView