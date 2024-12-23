import React from 'react'
import { useSelector } from 'react-redux'

export default function usePrependCurrency() {
    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)
    return (amount: number | string) => {
        return `${currency?.symbol || ''}${amount} `
    }
}
