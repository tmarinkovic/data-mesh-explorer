import {configureStore} from '@reduxjs/toolkit'
import searchReducer from './reducers/search'
import blueprintReducer from './reducers/blueprint'
import selectedReducer from './reducers/selected'

export default configureStore({
    reducer: {
        search: searchReducer,
        blueprint: blueprintReducer,
        selected: selectedReducer
    },
})