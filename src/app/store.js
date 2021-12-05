import {configureStore} from '@reduxjs/toolkit'
import searchResultReducer from './reducers/searchResult'
import blueprintReducer from './reducers/blueprint'

export default configureStore({
    reducer: {
        searchResult: searchResultReducer,
        blueprint: blueprintReducer
    },
})