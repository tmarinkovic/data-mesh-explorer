import "./SearchBar.css"
import {Button, ButtonGroup, TextField} from "@material-ui/core";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSearchResult} from "../../app/reducers/searchResult";
import _ from "lodash";

const SearchBar = () => {

    const dispatch = useDispatch()
    const blueprint = useSelector((state) => state.blueprint.value)
    const [searchBarValue, setSearchBarValue] = useState("");

    const search = () => {
        if (searchBarValue === "") {
            dispatch(setSearchResult(blueprint))
            return
        }
        let searchResult = {}
        for (const [domainName, domain] of Object.entries(blueprint)) {
            for (const [dataProductName, dataProduct] of Object.entries(domain)) {
                ["inputPorts", "outputPorts"].forEach(portType => {
                    for (const [databaseName, tables] of Object.entries(dataProduct[portType])) {
                        if (searchBarValue === databaseName) {
                            searchResult = searchByName(domainName, dataProductName, databaseName, portType, searchResult, tables);
                            return
                        }
                        tables.forEach(table => {
                            if (searchBarValue === table.table) {
                                searchResult = searchByName(domainName, dataProductName, databaseName, portType, searchResult, [table]);
                            }
                            table.columns.forEach(row => {
                                if (searchBarValue === row.Name) {
                                    const foundRow = {
                                        table: table.table,
                                        columns: [{
                                            Name: row.Name,
                                            Type: row.Type,
                                            Comment: row.Comment
                                        }]
                                    }
                                    searchResult = searchByName(domainName, dataProductName, databaseName, portType, searchResult, [foundRow], "row");
                                }
                            })
                        })

                    }
                })
            }
        }

        dispatch(setSearchResult(searchResult))
    }

    function searchByName(domainName, dataProductName, databaseName, portType, searchResult, query, queryType) {
        if (queryType === "row") {
            try {
                if (Array.isArray(searchResult[domainName][dataProductName][portType][databaseName])) {
                    searchResult[domainName][dataProductName][portType][databaseName].push(query[0])
                    return searchResult
                }

            } catch (error) {
            }
        }
        return _.merge(searchResult, {
            [domainName]: {
                [dataProductName]: {
                    [portType]: {
                        [databaseName]: query
                    }
                }
            }
        });
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