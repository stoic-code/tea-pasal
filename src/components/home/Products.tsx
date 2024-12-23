'use client'
import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Rating from '@/components/common/Rating'
import { CiHeart } from 'react-icons/ci'
import { AiFillHeart } from 'react-icons/ai'
import Link from 'next/link'
import {
    useAddToWishListMutation,
    useFeaturedCategoriesQuery,
    useWishListQuery
} from '@/lib/features/api/product/wishListApi'
import useProtectedFunction from '@/hooks/useProtectedFunction'
import notify from '@/utils/notify'
import handleServerError from '@/utils/handleServerError'
import { useDispatch, useSelector } from 'react-redux'

import { useAddCartItemMutation } from '@/lib/features/api/cart/cartApi'
import { toggleCart } from '@/lib/features/cart/cartSlice'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import usePrependCurrency from '@/hooks/usePrependCurrency'
import { toggleToast } from '@/lib/features/cart/toastSlice'

interface FeatureCategory {
    id: number
    category_id: number
    category: Category
    featured_products: {
        product: Product
    }[]
    image: string
}

/* 
    dekhaune daat arkai chapaune daat arkai:
    for fast loading, server side in parent component
    for real-time data change, client component
*/
export default function Products({ featuredCategories }: { featuredCategories: FeatureCategory[] }) {
    const [addToCartItem] = useAddCartItemMutation()

    const [addtoWish, { isLoading }] = useAddToWishListMutation()

    const dispatch = useDispatch()

    const router = useRouter()
    const token = useSelector((store: ReduxStore) => store.user.value.token)

    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)

    const { data, refetch, isSuccess } = useFeaturedCategoriesQuery({ currency_id: currency?.id })

    featuredCategories = (data as FeatureCategory[]) || featuredCategories

    let {
        data: wishLists,
        isLoading: isLoadingWishLists,
        refetch: refetchWishlist,
        error: wishListFetchError
    } = useWishListQuery()

    // useEffect(() => {
    //     if (data && isSuccess) {
    //         featuredCategories = data as FeatureCategory[]
    //     }
    // }, [currency?.id])

    useEffect(() => {
        /* wishlist sent by backend in featured-products api, after login, to  update wishlist  */
        // if (token) {
        refetch()
        // }
    }, [token])

    const authenticate = useProtectedFunction()

    const handleWishList = async (product: Product) => {
        authenticate(async () => {
            const wishlist = {
                product_id: product.id
            }

            try {
                await addtoWish(wishlist).unwrap()
                notify('Wishlist Updated')
            } catch (err) {
                handleServerError(err)
            }
        })
    }

    const prependCurrency = usePrependCurrency()

    return (
        <>
            <section>
                <h2 className='hidden'>Featured Categories</h2>
                <ul className='bg-page-background-color'>
                    {featuredCategories.map((el, index) => {
                        return (
                            <li
                                className='grid grid-cols-1  items-center  bg-page-section-background-color xl:grid-cols-2'
                                key={el.category_id}
                            >
                                <div className='px-[60px] py-[40px] text-center xl:order-1  '>
                                    <ul className='grid grid-cols-1 gap-7 md:grid-cols-2 '>
                                        {el.featured_products.map(element => {
                                            let el: Product = element.product

                                            const uniquePrices = el.sizes
                                                .map(product => product.price)
                                                .filter(
                                                    (price, index, self) => self.findIndex(t => t === price) === index
                                                )

                                            const uniqueProductTypes = el.sizes
                                                .map(product => product.product_type)
                                                .filter(
                                                    (productType, index, self) =>
                                                        self.findIndex(t => t.id === productType.id) === index
                                                )

                                            return (
                                                <>
                                                    <li>
                                                        <Link
                                                            href={`/collections/${el.category?.slug}/products/${el.slug}`}
                                                            className=''
                                                            key={el.id}
                                                            aria-label='text-for link'
                                                        >
                                                            <div
                                                                className='product-container group
                                                     '
                                                            >
                                                                <Image
                                                                    className='h-[246px] w-full object-cover'
                                                                    src={el.images[0]?.image || ''}
                                                                    alt={`${el.name} product`}
                                                                    width={500}
                                                                    height={500}
                                                                />
                                                                <div
                                                                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                                                        e.preventDefault()
                                                                        e.stopPropagation()
                                                                        handleWishList(el)
                                                                    }}
                                                                    className={`btn-entry `}
                                                                >
                                                                    {(wishLists as WishListItem[])?.find(
                                                                        product => product.product.id == el.id
                                                                    ) ? (
                                                                        <AiFillHeart className=' text-black' />
                                                                    ) : (
                                                                        <CiHeart
                                                                            className={`h-[18px] w-[18px] text-black `}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className='pt-[30px]'>
                                                            <p className='subtitle'>
                                                                {uniqueProductTypes.map((el, index) => {
                                                                    return (
                                                                        <span className='text-lg ' key={el.id}>
                                                                            {el.name}{' '}
                                                                            {uniqueProductTypes.length > index + 1
                                                                                ? ', '
                                                                                : ''}{' '}
                                                                        </span>
                                                                    )
                                                                })}
                                                            </p>
                                                            <h3 className='sub-header mb-[10px]'>{el.name}</h3>
                                                            <p className='mb-[10px]'>
                                                                <Rating rating={el.avg_rating} />
                                                            </p>
                                                            <p className='mb-[10px]'>
                                                                {uniquePrices.map((el, index) => {
                                                                    return (
                                                                        <span
                                                                            key={index}
                                                                            className='price text-primary'
                                                                        >
                                                                            {prependCurrency(el)}
                                                                            {uniquePrices.length > index + 1
                                                                                ? ', '
                                                                                : ''}{' '}
                                                                        </span>
                                                                    )
                                                                })}
                                                            </p>
                                                            <button
                                                                className='btn'
                                                                type='button'
                                                                onClick={() => {
                                                                    // handleCustomToast(el)
                                                                    authenticate(async () => {
                                                                        let body = {
                                                                            product_id: el?.id,
                                                                            product_size_id: el.sizes[0].id,
                                                                            quantity: 1
                                                                        }

                                                                        try {
                                                                            await addToCartItem(body).unwrap()
                                                                            let payload = {
                                                                                isOpen: true,
                                                                                data: el
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
                                                    </li>
                                                </>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className={`${index % 2 !== 0 ? 'xl:order-0' : 'xl:order-2'}`}>
                                    <Link href={`/collections/${el.category.slug}`} aria-label='text-for link'>
                                        <img
                                            src={el.image}
                                            className='max-h-[290px] w-full object-cover object-center sm:max-h-[348px] md:max-h-[417px] lg:max-h-[500px] xl:max-h-[600px] 2xl:max-h-[720px] '
                                            alt={`${el.category.name} category`}
                                        />
                                    </Link>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}
