interface Category {
    id: number
    name: string
    slug: string
    categories: Category[]
}

interface Aroma {
    id: number
    name: string
}

interface SizeDetails {
    id: number
    weight: string
    unit: string
    length: number
    height: number
    width: number
}

interface ProductType {
    id: number
    name: string
}

interface Size {
    id: number
    size: SizeDetails
    size_id: number
    product_type: ProductType
    product_type_id: number
    price: string
    price_in_usd: string
    inventory: number
    product: Product
}

interface Image {
    id: number
    image: string
    product: number
}

interface Review {
    date: string
    id: number
    reviews: Review[]
    rating_stars: number
    review_title: string
    review_body: string
    created_at: string
    updated_at: string
    user: number
    product: number
    review: number | null
}

interface Product {
    id: number
    name: string
    slug: string
    apperance: string
    category: Category
    category_id: number
    aroma: Aroma
    aroma_id: number
    description: string
    sizes: Size[]
    images: Image[]
    avg_rating: number
    reviews: Review[]
    wish_listed: boolean
}

interface WishListItem {
    id: number
    product_id: number
    product: Product
}

interface OrderItem {
    id: number
    product_size_id: number
    product_size: Size
    price: number
    order_id: number
    quantity: number
    status: string
    images: string[{ image: string }] // Assuming images are URLs
}

interface Order {
    id: number
    status: string
    shipping_address: any
    items: OrderItem[]
    sub_total: number
    shipping_cost: number
    total_price: number
    coupon: null | string
    currency: string
    user: object
    place_at: string
}
