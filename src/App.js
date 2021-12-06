import './App.css';
import {useEffect} from "react";
import Header from "./components/header/header";
import {Grid, Paper} from "@material-ui/core";
import TableView from "./components/TableView/TableView";
import {setSearchResult} from "./app/reducers/searchResult";
import {useDispatch} from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";
import {setBlueprint} from "./app/reducers/blueprint";
import SearchView from "./components/SearchView/SearchView";

const lambdaUrl = "https://vm7kzvbmg5.execute-api.eu-west-2.amazonaws.com/dev/"

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        fetch(lambdaUrl)
            .then(response => response.json())
            .then(data => {
                dispatch(setBlueprint(data))
                dispatch(setSearchResult(data))
            })
            .catch(error => console.log(error))
    }, [dispatch]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header/>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={4}>xs=8</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="padded" elevation={4}>
                    <SearchView/>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className="padded" elevation={4}>
                    <SearchBar/>
                    <TableView/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default App;
