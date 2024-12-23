'use client'

import React, { useEffect, useState } from 'react'
import { Controller, Form, useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import { FaCheck, FaPlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import withProtectedRoute from '@/components/withProtectedRoute'
import {
    useGetShippingPriceMutation,
    useShippingaddressQuery
} from '@/lib/features/api/shippingAddress/shippingAddressApi'
import { useStoreOrdersMutation } from '@/lib/features/api/order/orderApi'
import 'react-toastify/dist/ReactToastify.css'
import { makeFullUrl } from '@/utils/makeFullUrl'
import Link from 'next/link'
import notify from '@/utils/notify'
import { ImCross } from 'react-icons/im'
import { GrFormEdit } from 'react-icons/gr'
import handleServerError from '@/utils/handleServerError'
import { useGetAllCartQuery } from '@/lib/features/api/order/getCart'
import usePrependCurrency from '@/hooks/usePrependCurrency'

import { useRouter } from 'next/navigation'

function Page() {
    const [selectedAddress, setSelectedAddress] = useState<{ [key: string]: any } | null | undefined>(null)
    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)
    const prependCurrency = usePrependCurrency()
    const router = useRouter()

    let {
        data,
        error,
        refetch: refetchCartList
    } = useGetAllCartQuery({
        currency_id: currency?.id
    })

    const [getShippingPrice, { data: shippingDetail, isLoading: shippingPriceLoading, reset: resetShippingPrice }] =
        useGetShippingPriceMutation()

    const [storeOrders, { isLoading: isStoringorder, isSuccess, data: orderData, error: orderError }] =
        useStoreOrdersMutation()

    useEffect(() => {
        // if there is change in currency unit.. reetch new price.
        resetShippingPrice()
        if (selectedAddress) {
            handleSelectedAddress(selectedAddress?.id)
        }
    }, [currency?.id])

    const { data: cartItems } = useGetAllCartQuery({
        currency_id: currency?.id
    })

    useEffect(() => {
        setSelectedAddress(null)
        resetShippingPrice()
        reset()
    }, [JSON.stringify(cartItems), currency?.id])

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
        reset,
        setError
    } = useForm()

    let cartList: CartItem[] = []

    if (data) {
        cartList = data as CartItem[]
    }

    async function onSubmit(formData: any) {
        if (cartList.length == 0) {
            notify('cart items required', 'error')
            return
        }

        try {
            const body = {
                // payment_mode: formData.payment_mode,
                token: formData.token || 'www',
                shipping_address_id: selectedAddress?.id,
                currency_id: currency?.id
            }

            let orderResponse = await storeOrders({
                currencyId: currency?.id,
                formData: body
            }).unwrap()

            notify('Order Created')
            refetchCartList()
            reset()
            router.push('/orders/' + orderResponse.id)
        } catch (err) {
            if ((err as any).status === 400) {
                let msg = Object.values((err as any).data).join(', ')
                notify(msg, 'error')
            } else {
                handleServerError(err)
            }
        }
    }

    // shipping form address
    const { data: shippingAddresses, isLoading } = useShippingaddressQuery()

    // console.log(shippingAdd)
    const [showShippingFormAddress, setShowShippingFormAddress] = useState(false)

    // useEffect(() => {
    //     const handleOutsideClick = (event: MouseEvent) => {
    //         if (
    //             showShippingFormAddress &&
    //             !event.target.closest('.shipping-form')
    //         ) {
    //             setShowShippingFormAddress(false)
    //         }
    //     }

    //     document.addEventListener('mousedown', handleOutsideClick)

    //     return () => {
    //         document.removeEventListener('mousedown', handleOutsideClick)
    //     }
    // }, [showShippingFormAddress])

    //for slecting one address
    async function handleSelectedAddress(id: number) {
        // console.log('select id', id)
        const selectedAdd = (shippingAddresses as [])?.find((add: any) => id === add.id)

        setSelectedAddress(selectedAdd)

        try {
            await getShippingPrice({
                currency_id: currency?.id,
                shipping_address_id: id
            }).unwrap()
        } catch (err) {
            handleServerError(err)
        }

        // console.log('shippping price hahii', res)
        // console.log(selectedAdd)
        // console.log(selectedAdd[0])
    }

    return (
        <>
            {/* <div className='flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32'>
                <a href='#' className='text-2xl font-bold text-gray-800'>
                    Checkout Page
                </a>
            </div> */}
            <div className='grid sm:px-10 lg:grid-cols-2  lg:px-20 xl:px-32'>
                <div className='px-4 pt-8 lg:mt-0'>
                    {/* <p className='text-xl font-medium'>Payment Details</p>
                    <p className='text-gray-400'>Complete your order by providing your payment details.</p> */}

                    {/* {showShippingFormAddress && ( */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className='shipping-form  mb-4   bg-white'>
                                <div className=''>
                                    <h2 className='mb-4 text-lg font-semibold'>Select Shipping Address</h2>
                                    {/* <p className='h-[2000px] w-[10px]'>
                                        
                                    </p> */}

                                    <Controller
                                        name='shippingAddress'
                                        control={control}
                                        defaultValue={null}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <div className='mt-4 box-border grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-1  xl:grid-cols-1 2xl:grid-cols-2'>
                                                    {(shippingAddresses as [])?.map((address: any) => (
                                                        <div
                                                            onClick={() => {
                                                                handleSelectedAddress(address.id)
                                                                onChange(address.id)
                                                            }}
                                                            key={address.id}
                                                            className={` relative box-border   ${address.id === selectedAddress?.id && 'border-primary-light drop-shadow-xl'}    w-full cursor-pointer rounded-md border border-gray-300  bg-gray-100 p-6 transition-all hover:bg-gray-200 hover:shadow-md`}
                                                        >
                                                            <div className=' flex items-center justify-start gap-1'>
                                                                <p className=' font-thin'>City :</p>
                                                                <p className='text-lg font-semibold'>{address.city}</p>
                                                            </div>
                                                            <div className=' flex items-center justify-start gap-1 text-xs '>
                                                                <p>State/Province Code :</p>
                                                                <p className=' font-semibold'>
                                                                    {address.state_or_province_code}
                                                                </p>
                                                            </div>
                                                            <div className=' flex items-center justify-start gap-1 text-xs '>
                                                                <p>Country Code :</p>
                                                                <p className='text-xs font-semibold'>
                                                                    {address.country_code}
                                                                </p>
                                                            </div>
                                                            <div className=' flex items-center justify-start gap-1 text-xs '>
                                                                <p>Postal Code :</p>
                                                                <p className='text-xs font-semibold'>
                                                                    {address.postal_code}
                                                                </p>
                                                            </div>
                                                            <div className=' flex items-center justify-start gap-1 text-xs '>
                                                                <p>Residential :</p>
                                                                <p className='text-xs font-semibold'>
                                                                    {address.residential ? <FaCheck /> : <ImCross />}
                                                                </p>
                                                            </div>

                                                            <Link
                                                                href={'/profile'}
                                                                className='absolute right-2 top-2 flex items-center text-xs font-bold text-primary'
                                                            >
                                                                <span className=' text-lg text-primary-dark-20'>
                                                                    <GrFormEdit />
                                                                </span>
                                                                Edit
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    />
                                    {errors.shippingAddress && (
                                        <span className=' form-error'>*please select one shipping address</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                        {/* <h1 className='mb-2 text-xl font-bold'>Payment Method</h1>
                        <div className='mb-4 grid grid-cols-4 gap-2'>
                            <div className='flex items-center'>
                                <label
                                    id='esewa'
                                    className='flex cursor-pointer justify-between pr-4 text-sm font-medium text-gray-700'
                                >
                                    Esewa
                                    <input
                                        type='radio'
                                        id='esewa'
                                        value={'E'}
                                        className='ml-2 w-full rounded-md border p-2'
                                        {...register('payment_mode', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                </label>
                            </div>
                            <div className='flex items-center'>
                                <label
                                    id='khalti'
                                    className='flex cursor-pointer pr-4 text-sm font-medium text-gray-700'
                                >
                                    Khalti
                                    <input
                                        type='radio'
                                        id='khalti'
                                        value={'K'}
                                        className='ml-2 w-full rounded-md border p-2'
                                        {...register('payment_mode', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                </label>
                            </div>
                            <div className='flex items-center'>
                                <label id='cash' className='flex cursor-pointer pr-4 text-sm font-medium text-gray-700'>
                                    Cash
                                    <input
                                        type='radio'
                                        id='cash'
                                        value={'C'}
                                        className='ml-2 w-full rounded-md border p-2'
                                        {...register('payment_mode', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                </label>
                            </div>
                            <div className='flex items-center'>
                                <label
                                    id='stripe'
                                    className='flex cursor-pointer pr-4 text-sm font-medium text-gray-700'
                                >
                                    Stripe
                                    <input
                                        type='radio'
                                        id='stripe'
                                        value={'S'}
                                        className='ml-2 w-full rounded-md border p-2'
                                        {...register('payment_mode', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                </label>
                            </div>
                        </div>
                        {errors.payment_mode && <span className=' form-error'>*please choose a payment method</span>} */}
                        <button
                            disabled={isStoringorder}
                            type='submit'
                            className='btn mb-8 mt-4 w-full rounded-md px-6 py-3 font-medium text-white'
                        >
                            {isStoringorder ? 'Loading' : 'Place Order'}
                        </button>
                    </form>
                </div>

                <div className='lg:stickyy lg:top-[5vh]] lg:max-h-[90vh]] mb-10  overflow-y-auto bg-[#f5f5f5] px-4 pb-4 '>
                    {/* <div className='mb-10 overflow-y-auto bg-[#f5f5f5] px-4  pb-4 lg:sticky lg:top-[5vh] lg:max-h-[90vh] '> */}
                    <div className=''>
                        <div className='lg:stickyy lg:top-00 z-20 bg-[#f5f5f5] pb-4 pt-8'>
                            <p className='text-xl font-medium'>Order Summary</p>
                            {!selectedAddress && (
                                <p className='text-sm text-body'>
                                    Please select an shipping address to get estimated price
                                </p>
                            )}

                            <div className=' mt-4 grid w-full grid-cols-2 gap-2 text-base'>
                                <section>
                                    <p>Sub-Total</p>
                                    <p>Shipping Cost</p>
                                    <p className='text-lg  font-semibold'>Total Cost</p>
                                </section>
                                <section className=' justify-self-end'>
                                    {shippingPriceLoading && (
                                        <div className='flex flex-col items-center gap-2'>
                                            <div role='status'>
                                                <svg
                                                    aria-hidden='true'
                                                    className='h-10 w-10 animate-spin fill-primary text-gray-200 dark:text-gray-600'
                                                    viewBox='0 0 100 101'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                                        fill='currentColor'
                                                    />
                                                    <path
                                                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                                        fill='currentFill'
                                                    />
                                                </svg>
                                                <span className='sr-only'>Loading...</span>
                                            </div>
                                            <div>
                                                <p className='text-sm'>Estimating Shipping Price</p>
                                            </div>
                                        </div>
                                    )}
                                    {shippingDetail && (
                                        <>
                                            <p>{prependCurrency(shippingDetail?.sub_total)}</p>
                                            <p>{prependCurrency(shippingDetail?.shipping_cost)}</p>
                                            <p className='text-lg  font-semibold'>
                                                <span className=''>{prependCurrency(shippingDetail?.total_cost)}</span>
                                            </p>
                                        </>
                                    )}
                                </section>
                            </div>
                        </div>

                        <div className='  h-[65vh]] mt-6 grid grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2'>
                            {cartList &&
                                cartList?.map((item: any, index) => {
                                    return (
                                        <div
                                            key={item?.id}
                                            className='space-y-3  rounded-lg border bg-white px-2 py-2 sm:px-2'
                                        >
                                            <div className='  flex flex-col bg-white sm:flex-row sm:items-center sm:rounded-lg'>
                                                <div className=' relative  '>
                                                    <div className=' absolute left-0 top-0 flex h-8 w-8 items-center justify-center  rounded-full bg-[#676767] text-center text-white'>
                                                        {item.quantity}
                                                    </div>

                                                    <img
                                                        className='obh-24  m-2 h-full  w-36 rounded-md border   object-cover object-center'
                                                        src={`${makeFullUrl(item.product.images[0]?.image) || ''}`}
                                                        alt={item?.product?.name}
                                                    />
                                                    <p className='text-center text-sm text-gray-500 '>
                                                        {item.product.inventory} items in stock
                                                    </p>
                                                </div>
                                                <div className='flex w-full flex-col px-4 py-4'>
                                                    <span className='text-lg font-semibold'>{item?.product?.name}</span>
                                                    <span className=' text-gray-400 '>
                                                        {item?.product.product_type.name}
                                                    </span>
                                                    <p className='text-lg font-bold'>
                                                        {prependCurrency(item?.product.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        {cartList && cartList.length == 0 && (
                            <>
                                <div className='flex flex-col items-center'>
                                    <p className=' mb-4 text-center text-secondary'>Your Cart is Empty</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='flex-center my-10 flex justify-center'>
                        <Link className='btn' href={'/collections'}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withProtectedRoute(Page)
