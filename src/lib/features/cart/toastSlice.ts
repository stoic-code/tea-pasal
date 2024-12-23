import { createSlice } from '@reduxjs/toolkit'

const initialState: ToastStore = {
    value: {
        isOpen: false,
        data: null
    }
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        toggleToast: (state, action) => {
            state.value.isOpen = action.payload.isOpen
            state.value.data = action.payload.data
        },
        openToast: state => {
            state.value.isOpen = true
        }
    }
})

export const { toggleToast } = toastSlice.actions

export default toastSlice.reducer
