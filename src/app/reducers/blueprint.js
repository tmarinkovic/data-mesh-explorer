import {createSlice} from '@reduxjs/toolkit'

export const blueprint = createSlice({
    name: 'blueprint',
    initialState: {
        value: "",
    },
    reducers: {
        setBlueprint: (state, action) => {
            state.value = action.payload
        },
    },
})

export const {setBlueprint} = blueprint.actions
export default blueprint.reducer