type CartStore = {
    value: {
        isOpen: boolean
    }
}
type PopLogin = {
    value: {
        isOpen: boolean
    }
}

type ToastStore = {
    value: {
        isOpen: boolean
        data: Product | null
    }
}

interface CartProduct {
    id: number
    slug: string
    name: string
    price: string
    inventory: number
    size_id: number
    size: SizeDetails
    product_type_id: number
    product_type: ProductType
    images: Image[]
}

interface CartItem {
    id: number
    product_size_id: number
    product_id: number
    product: CartProduct
    quantity: number
    cart_id: number
}
