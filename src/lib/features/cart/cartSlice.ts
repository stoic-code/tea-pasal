import { createSlice } from '@reduxjs/toolkit'

const initialState: CartStore = {
    value: {
        isOpen: false
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: state => {
            state.value.isOpen = !state.value.isOpen

            let body = document?.getElementById('body')
            if (state.value.isOpen) {
                if (body) {
                    body.style.overflow = 'hidden'
                }
            } else {
                if (body) {
                    body.style.overflow = 'auto'
                }
            }
        }
    }
})

export const { toggleCart } = cartSlice.actions

export default cartSlice.reducer
