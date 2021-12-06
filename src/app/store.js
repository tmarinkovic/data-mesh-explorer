import {configureStore} from '@reduxjs/toolkit'
import searchResultReducer from './reducers/searchResult'
import blueprintReducer from './reducers/blueprint'
import selectedReducer from './reducers/selected'

export default configureStore({
    reducer: {
        searchResult: searchResultReducer,
        blueprint: blueprintReducer,
        selected: selectedReducer
    },
})