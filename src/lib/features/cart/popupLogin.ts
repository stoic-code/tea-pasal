import { createSlice } from '@reduxjs/toolkit'

const initialState: PopLogin = {
    value: {
        isOpen: false
    }
}

export const PopLoginSlice = createSlice({
    name: 'loginModal',
    initialState,
    reducers: {
        toggleLogin: state => {
            state.value.isOpen = !state.value.isOpen
        },
        showLoginPopup: state => {
            state.value.isOpen = true
        }
    }
})

export const { toggleLogin, showLoginPopup } = PopLoginSlice.actions

export default PopLoginSlice.reducer
