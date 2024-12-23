import { createSlice } from '@reduxjs/toolkit'

const initialState: Setting = {
    value: {
        currency: null,
        theme: 'light',
        language: 'english'
    }
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.value.currency = action.payload
        }
    }
})

export const { setCurrency } = settingSlice.actions

export default settingSlice.reducer
