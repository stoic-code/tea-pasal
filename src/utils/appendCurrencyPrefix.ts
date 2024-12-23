import usePrependCurrency from '@/hooks/usePrependCurrency'
import React from 'react'

function Wrapper(amount: number | string) {
    const appendCurrency = usePrependCurrency()
    return appendCurrency((amount as number).toFixed(2))
}

const appendCurrencyPrefix = Wrapper
export default appendCurrencyPrefix
