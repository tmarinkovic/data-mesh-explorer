import "./SearchBar.css"
import {Button, ButtonGroup, TextField} from "@material-ui/core";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSearchResult} from "../../app/reducers/searchResult";

const SearchBar = () => {

    const blueprint = useSelector((state) => state.blueprint.value)
    const [searchBarValue, setSearchBarValue] = useState("");
    const dispatch = useDispatch()

    const search = () => {
        if (searchBarValue === "") {
            dispatch(setSearchResult(blueprint))
            return
        }
        let searchResult = {}
        for (const [domainName, domain] of Object.entries(blueprint)) {
            for (const [dataProductName, dataProduct] of Object.entries(domain)) {
                for (const [databaseName, tables] of Object.entries(dataProduct.inputPorts)) {
                    if (searchBarValue === databaseName) {
                        searchResult = {
                            [domainName]: {
                                [dataProductName]: {
                                    inputPorts: {
                                        [databaseName]: tables
                                    },
                                    outputPorts: {}
                                }
                            }
                        }
                    }
                }
            }
        }

        dispatch(setSearchResult(searchResult))
        console.log(searchResult)
    }


    const clearSearch = () => {
        setSearchBarValue("")
        dispatch(setSearchResult(blueprint))
    }

    return (
        <div>
            <TextField
                value={searchBarValue}
                className="search-bar"
                label="Search"
                onChange={e => setSearchBarValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' ? search() : ""}
                variant="outlined"
            />
            <ButtonGroup className="search-buttons" variant="outlined" aria-label="outlined button group">
                <Button onClick={() => search()} color="primary">Search</Button>
                <Button onClick={() => clearSearch()} color="secondary">Clear</Button>
            </ButtonGroup>
        </div>
    )
}

export default SearchBar