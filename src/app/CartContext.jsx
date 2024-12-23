

const addToCart = async (product) => {

    try {
        const response = await fetch('/cart/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id, quantity: 1 })
        })

        if (response.ok) {
            const data = await response.json()
            // Handle successful response, e.g., update cart state with server data
            // setCartItem(data.cart)
        } else {
            // Handle error response
        }
    } catch (error) {
        console.error(error)
        // Handle network errors or API errors
    }
}
