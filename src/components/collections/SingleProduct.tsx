'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Rating from '../common/Rating'
import { CiHeart } from 'react-icons/ci'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useAddToWishListMutation, useWishListQuery } from '@/lib/features/api/product/wishListApi'
import { useAddCartItemMutation } from '@/lib/features/api/cart/cartApi'
import useProtectedFunction from '@/hooks/useProtectedFunction'
import { useDispatch, useSelector } from 'react-redux'
import notify from '@/utils/notify'
import handleServerError from '@/utils/handleServerError'
import { toggleCart } from '@/lib/features/cart/cartSlice'
import { useRouter } from 'next/navigation'
import usePrependCurrency from '@/hooks/usePrependCurrency'
import { toggleToast } from '@/lib/features/cart/toastSlice'

function SingleProduct({ product }: { product: Product }) {
    const [addToWishList] = useAddToWishListMutation()
    const [addToCartItem] = useAddCartItemMutation()
    const dispatch = useDispatch()
    const authenticate = useProtectedFunction()

    let { data: wishLists, isLoading: isLoadingWishLists, refetch, error: wishListFetchError } = useWishListQuery()

    // const token = useSelector((store: ReduxStore) => store.user.value.token)
    if (wishListFetchError) {
        wishLists = undefined
    }
    const handleWishList = (id: number) => {
        authenticate(async () => {
            let payload = {
                product_id: id
            }
            try {
                await addToWishList(payload).unwrap()
                notify('Wishlist Updated')
            } catch (err) {
                handleServerError(err)
            }
        })
    }

    const uniquePrices = product.sizes
        .map(product => product.price)
        .filter((price, index, self) => self.findIndex(t => t === price) === index)

    const uniqueProductTypes = product.sizes
        .map(product => product.product_type)
        .filter((productType, index, self) => self.findIndex(t => t.id === productType.id) === index)

    const prependCurrency = usePrependCurrency()

    return (
        <>
            <div className='text-center'>
                <Link
                    href={`/collections/${product.category?.slug}/products/${product.slug}`}
                    className=''
                    aria-label='text-for link'
                >
                    <div className='product-container group'>
                        <Image
                            className='h-[246px] w-full object-cover'
                            src={`${product.images[0]?.image || ''}`}
                            alt={`${product.name} product`}
                            width={500}
                            height={500}
                        />
                        <div
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleWishList(product.id)
                            }}
                            className={`btn-entry `}
                        >
                            {(wishLists as WishListItem[])?.find(el => el.product.id == product.id) ? (
                                <AiFillHeart className=' text-black' />
                            ) : (
                                <CiHeart className={`h-[18px]  w-[18px] text-black `} />
                            )}
                        </div>
                    </div>
                </Link>
                <div className='pt-[30px] text-center'>
                    <p className='subtitle'>
                        {uniqueProductTypes.map((el, index) => {
                            return (
                                <span className='text-lg ' key={el.id}>
                                    {el.name} {uniqueProductTypes.length > index + 1 ? ', ' : ''}{' '}
                                </span>
                            )
                        })}
                    </p>
                    <h3 className='sub-header mb-[10px]'>{product.name}</h3>
                    <p className='mb-[10px]'>
                        <Rating rating={product.avg_rating} />
                    </p>
                    <p className='mb-[10px]'>
                        {uniquePrices.map((el, index) => {
                            return (
                                <span key={index} className='price text-primary'>
                                    {prependCurrency(el)}
                                    {uniquePrices.length > index + 1 ? ', ' : ''}{' '}
                                </span>
                            )
                        })}
                    </p>
                    <button
                        className='btn'
                        type='button'
                        onClick={() => {
                            authenticate(async () => {
                                let body = {
                                    product_id: product?.id,
                                    product_size_id: product.sizes[0].id,
                                    quantity: 1
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

                                    // router.push(
                                    //     `/collections/${el.category.slug}/products/${el.slug}`
                                    // )
                                } catch (error) {
                                    handleServerError(error)
                                }
                            })
                        }}
                    >
                        <AiOutlineShoppingCart className='-mt-[1px] inline-block ' />
                        &nbsp; Add to Cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default SingleProduct
