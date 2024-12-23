type User = null | {
    contact?: string | number
    first_name?: string
    last_name?: string
    email?: string
    [key: string]: unknown
}

type Currency = {
    icon: string
    id: number
    country: string
    code: string
    symbol: string
}

type Setting = {
    value: {
        currency: null | Currency
        theme: string
        language: stirng
    }
}

type ReduxStore = {
    user: {
        value: {
            data: User
            token?: string | null
            isPopulating: boolean
        }
    }
    loginModal: {
        value: {
            isOpen: boolean
        }
    }
    cart: CartStore
    setting: Setting
    toast: ToastStore
}
