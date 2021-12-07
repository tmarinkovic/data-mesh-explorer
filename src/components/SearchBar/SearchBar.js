import "./SearchBar.css"
import {Button, ButtonGroup, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setSearchQuery, setSearchResult} from "../../app/reducers/search";
import _ from "lodash";
import {useEffect} from "react";

const SearchBar = () => {

    const dispatch = useDispatch()
    const blueprint = useSelector((state) => state.blueprint.value)
    const searchQuery = useSelector((state) => state.search.query)
    const searchTrigger = useSelector((state) => state.search.triggerCount)

    useEffect(() => {
        search()
    }, [searchTrigger]);

    const search = () => {
        if (searchQuery === "") {
            dispatch(setSearchResult(blueprint))
            return
        }
        let searchResult = {}
        for (const [domainName, domain] of Object.entries(blueprint)) {
            for (const [dataProductName, dataProduct] of Object.entries(domain)) {
                ["inputPorts", "outputPorts"].forEach(portType => {
                    for (const [databaseName, tables] of Object.entries(dataProduct[portType])) {
                        if (searchQuery === databaseName) {
                            searchResult = searchByName(domainName, dataProductName, databaseName, portType, searchResult, tables);
                            return
                        }
                        tables.forEach(table => {
                            if (searchQuery === table.table) {
                                searchResult = searchByName(domainName, dataProductName, databaseName, portType, searchResult, [table]);
                            }
                            table.columns.forEach(row => {
                                if (searchQuery === row.Name) {
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
        dispatch(setSearchQuery(""))
        dispatch(setSearchResult(blueprint))
    }

    return (
        <div>
            <TextField
                value={searchQuery}
                className="search-bar"
                label="Search"
                onChange={e => dispatch(setSearchQuery(e.target.value))}
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