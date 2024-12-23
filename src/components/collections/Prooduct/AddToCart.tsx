'use client'
import handleServerError from '@/utils/handleServerError'
import { makeFullApiUrl } from '@/utils/makeFullUrl'
import notify from '@/utils/notify'
import { useState } from 'react'
// import CartSidebar from '@/components/common/CartSidebar'
import { useAddCartItemMutation, useAllCartItemsQuery } from '@/lib/features/api/cart/cartApi'
import { toggleCart } from '@/lib/features/cart/cartSlice'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import QuantityCounter from './QuantityCounter'
import useProtectedFunction from '@/hooks/useProtectedFunction'
import { useAddToWishListMutation } from '@/lib/features/api/product/wishListApi'
import { useWishListQuery } from '../../../lib/features/api/product/wishListApi'
import { FaHeart } from 'react-icons/fa6'
import { FaMinusCircle, FaShoppingCart } from 'react-icons/fa'
import ProductShare from '@/components/common/ShareFeature'
import { toggleToast } from '@/lib/features/cart/toastSlice'

function AddToCart({
    product,
    selectedSize,
    setSelectedSize,
    commonInfoLabelClass
}: {
    product: Product
    selectedSize: number | null
    setSelectedSize: (el: any) => void
    commonInfoLabelClass: string
}) {
    const [addToWishList] = useAddToWishListMutation()

    const [addToCartItem] = useAddCartItemMutation()

    const authenticate = useProtectedFunction()

    let { data: wishLists, isLoading: isLoadingWishLists, refetch, error: wishListFetchError } = useWishListQuery()

    if (wishListFetchError) {
        wishLists = undefined
    }

    // useEffect(() => {
    //     console.log({ token })
    //     if (token) {
    //         console.log('inside here')
    //         refetch()
    //     }
    // }, [token])

    // console.log({ wishLists })

    const handleAddToCart = async (product: Product) => {
        if (!selectedSize) {
            notify('Please select a Variant', 'error')
            return
        }

        authenticate(async () => {
            let body = {
                product_id: product?.id,
                product_size_id: selectedSize,
                quantity: quantity
            }

            try {
                await addToCartItem(body).unwrap()
                let payload = {
                    isOpen: true,
                    data: product
                }
                // dispatch(toggleCart())
                // notify('Added to Cart')
                dispatch(toggleToast(payload))
                setSelectedSize(null)
            } catch (error) {
                handleServerError(error)
                // Handle network errors or API errors
            }
        })
    }

    const handleAddtoWishList = (id: number) => {
        authenticate(async () => {
            let payload = {
                product_id: id
            }
            try {
                await addToWishList(payload).unwrap()
                notify()
            } catch (err) {
                handleServerError(err)
            }
        })
    }

    const [quantity, setQuantity] = useState(1)

    // const cartToggle = useSelector((store: ReduxStore) => store.cart.value.isOpen)

    const [PostItem, { error, isLoading, isSuccess }] = useAddCartItemMutation()

    const dispatch = useDispatch()

    const handleToggle = () => {
        dispatch(toggleCart())
    }
    const sidepageRef = useRef<HTMLDivElement | null>(null)

    if (isSuccess) {
        notify('Item added to Cart')
    }

    if (error) {
        console.log(error)
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <>
            <QuantityCounter
                commonInfoLabelClass={commonInfoLabelClass}
                quantity={quantity}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
            />

            {/* <div
                className={`transition-all duration-300 ease-in-out  ${cartToggle ? 'translate-x-[0px]' : 'translate-x-[100%]'} `}
            >
                </div> */}

            <div className='grid w-fit  gap-4'>
                <button
                    onClick={() => {
                        handleAddToCart(product)
                    }}
                    className='btn '
                >
                    <FaShoppingCart className=' inline-block  ' />
                    &nbsp; Add to Cart
                </button>
                <div onClick={() => handleAddtoWishList(product.id)}>
                    <button className={`btn`}>
                        {(wishLists as WishListItem[])?.find(el => el.product_id == product.id) ? (
                            <span>
                                <FaMinusCircle className='inline' />
                                &nbsp; Remove from wishlist
                            </span>
                        ) : (
                            <span>
                                <FaHeart className='inline' /> &nbsp;Add to wishlist
                            </span>
                        )}
                    </button>{' '}
                </div>
                <ProductShare />
            </div>
        </>
    )
}

export default AddToCart
