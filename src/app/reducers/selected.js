import {createSlice} from '@reduxjs/toolkit'

export const selected = createSlice({
    name: 'selected',
    initialState: {
        domain: null,
        dataProduct: null,
        inputPort: null,
        outputPort: null
    },
    reducers: {
        setDomain: (state, action) => {
            state.domain = action.payload
        },
        setDataProduct: (state, action) => {
            state.dataProduct = action.payload
        },
        setInputPort: (state, action) => {
            state.inputPort = action.payload
        },
        setOutputPort: (state, action) => {
            state.outputPort = action.payload
        }
    },
})

export const {setDomain, setDataProduct, setInputPort, setOutputPort} = selected.actions
export default selected.reducer