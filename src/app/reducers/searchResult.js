import {createSlice} from '@reduxjs/toolkit'

export const searchResult = createSlice({
    name: 'searchResult',
    initialState: {
        value: "",
    },
    reducers: {
        setSearchResult: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {setSearchResult} = searchResult.actions
export default searchResult.reducer