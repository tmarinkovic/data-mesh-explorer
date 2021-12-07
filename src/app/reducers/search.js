import {createSlice} from '@reduxjs/toolkit'

export const search = createSlice({
    name: 'search',
    initialState: {
        result: "",
        query: "",
        triggerCount: 0
    },
    reducers: {
        setSearchResult: (state, action) => {
            state.result = action.payload
        },
        setSearchQuery: (state, action) => {
            state.query = action.payload
        },
        triggerSearch: (state, action) => {
            state.triggerCount = state.triggerCount + 1
        },
    },
})

export const {setSearchResult, setSearchQuery, triggerSearch} = search.actions
export default search.reducer