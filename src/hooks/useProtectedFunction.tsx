'use client'

import { toggleLogin, showLoginPopup } from '@/lib/features/cart/popupLogin'
import { useDispatch, useSelector } from 'react-redux'

export default function useProtectedFunction() {
    const dispatch = useDispatch()

    const user = useSelector((store: ReduxStore) => store.user.value.data)

    return (cb: () => void) => {
        if (user) {
            cb()
        } else {
            dispatch(showLoginPopup())
        }
    }
}
