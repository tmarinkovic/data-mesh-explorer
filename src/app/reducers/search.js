import {createSlice} from '@reduxjs/toolkit'

export const search = createSlice({
    name: 'search',
    initialState: {
        result: "",
        query: "",
    },
    reducers: {
        setSearchResult: (state, action) => {
            state.result = action.payload
        },
        setSearchQuery: (state, action) => {
            state.query = action.payload
        },
    },
})

export const {setSearchResult, setSearchQuery} = search.actions
export default search.reducer