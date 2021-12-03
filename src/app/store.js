import {configureStore} from '@reduxjs/toolkit'
import searchResultReducer from './reducers/searchResult'

export default configureStore({
    reducer: {
        searchResult: searchResultReducer,
    },
})