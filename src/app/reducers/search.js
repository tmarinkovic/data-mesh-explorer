import {createSlice} from '@reduxjs/toolkit'

export const search = createSlice({
    name: 'search',
    initialState: {
        result: "",
        query: "",
        count: 0
    },
    reducers: {
        setSearchResult: (state, action) => {
            state.result = action.payload
        },
        setSearchQuery: (state, action) => {
            state.query = action.payload
        },
        setSearchCount: (state, action) => {
            state.count = action.payload
        },
    },
})

export const {setSearchResult, setSearchQuery, setSearchCount} = search.actions
export default search.reducer