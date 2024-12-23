'use client'

import { Card } from '@/app/cart/all/Card'
import { useGetAllCartQuery } from '@/lib/features/api/order/getCart'
import { toggleCart } from '@/lib/features/cart/cartSlice'
import appendCurrencyPrefix from '@/utils/appendCurrencyPrefix'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function CartSidebar({ handleClose, sidepageRef }: { handleClose: any; sidepageRef: any }) {
    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)

    const dispatch = useDispatch()

    let {
        data: cartItems,
        refetch,
        error: cartItemsFetchError
    } = useGetAllCartQuery({
        currency_id: currency?.id
    })

    /* after logout: invalidate all tags, then 401 occurs  */
    if (cartItemsFetchError) {
        cartItems = undefined
    }

    const user = useSelector((store: ReduxStore) => store.user.value.data)

    useEffect(() => {
        // after login-logout
        refetch()
    }, [JSON.stringify(user)])

    let subTotal = 0

    if (cartItems) {
        subTotal = (cartItems as CartItem[])?.reduce((total, item) => {
            const price = parseFloat(item.product.price)
            const quantity = item.quantity
            return total + price * quantity
        }, 0)
    }

    const cartToggle = useSelector((store: ReduxStore) => store.cart.value.isOpen)

    return (
        <div
            className='relativee z-[1000]] '
            aria-labelledby='slide-over-title'
            role='dialog'
            aria-modal='true'
            // onClick={handleClose}
        >
            <div
                onClick={handleClose}
                className={`  ${cartToggle ? 'fixed inset-0 z-50 block bg-gray-600 bg-opacity-75 transition-opacity' : 'hidden cursor-pointer '}  `}
            ></div>
            <div
                ref={sidepageRef}
                onClick={handleClose}
                className={` transform  transition-transform duration-300 ease-in-out ${cartToggle ? 'translate-x-[0px]' : 'translate-x-[100%]'} fixed  inset-0 z-[5000012] overflow-hidden  `}
            >
                <div
                    className={` transform  transition-transform duration-300 ease-in-out ${cartToggle ? 'translate-x-[0px]' : 'translate-x-[100%]'} absolute inset-0  overflow-hidden`}
                >
                    <div
                        className={`  pointer-events-none absolute inset-y-0 right-0 flex max-w-full  transform pl-10 transition-transform duration-300 ease-in-out ${cartToggle ? 'translate-x-[0px]' : 'translate-x-[100%]'} `}
                    >
                        <div className='pointer-events-auto w-screen max-w-md'>
                            <div
                                className='  fixed right-0 flex h-full flex-col overflow-y-scroll   bg-white shadow-xl '
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                            >
                                <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                                    <div className='mb-10 flex items-start justify-between'>
                                        <div className='text-header text-lg font-medium' id='slide-over-title'>
                                            Shopping Cart
                                        </div>
                                        <div className='ml-3 flex h-7 items-center'>
                                            <button
                                                type='button'
                                                className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                                                onClick={handleClose}
                                            >
                                                <span className='absolute -inset-0.5'></span>
                                                <span className='sr-only'>Close panel</span>
                                                <svg
                                                    className='h-6 w-6'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth='1.5'
                                                    stroke='currentColor'
                                                    aria-hidden='true'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M6 18L18 6M6 6l12 12'
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className='mt-8'>
                                        <div className='flow-root'>
                                            <ul className='-my-6 divide-y divide-gray-200'>
                                                {(cartItems as CartItem[])?.map(el => (
                                                    <Card key={el.id} small={'small'} cartItem={el} />
                                                ))}
                                                {!((cartItems as CartItem[])?.length > 0) && (
                                                    <li className=' flex h-full w-full flex-col items-center justify-center gap-4'>
                                                        <p className=' mt-20 text-center text-gray-500 '>
                                                            Your cart is empty
                                                        </p>
                                                        <Link
                                                            onClick={() => handleClose()}
                                                            href={'/collections'}
                                                            className=' btn'
                                                        >
                                                            Continue Shopping
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                        <p>Sub Total</p>
                                        <p>{appendCurrencyPrefix(subTotal)}</p>
                                    </div>
                                    <p className='mt-0.5 text-sm text-gray-500'>
                                        Shipping and taxes calculated at checkout.
                                    </p>
                                    <div onClick={() => dispatch(toggleCart())} className='mt-6'>
                                        <Link
                                            href='/cart/all'
                                            className='btn flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm '
                                        >
                                            View Cart
                                        </Link>
                                    </div>
                                    <div onClick={() => dispatch(toggleCart())} className='mt-3 hidden lg:block'>
                                        <Link
                                            href={'/checkout'}
                                            className='btn flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm '
                                        >
                                            Proceed to Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
