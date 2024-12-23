'use client'

const STRIPE_SECRET_KEY = `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
import Stripe from 'stripe'
const stripe = new Stripe(STRIPE_SECRET_KEY)
import Breadcrumb from '@/components/common/Breadcrumb'
import withProtectedRoute from '@/components/withProtectedRoute'
import {
    useCancealSingleProductOrderMutation,
    useConfirmOrderMutation,
    useGetPaymentMethodsQuery,
    useSingleOrderQuery
} from '@/lib/features/api/order/orderApi'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Order from '../Order'
import notify from '@/utils/notify'
import handleServerError from '@/utils/handleServerError'
import { makeFullUrl } from '@/utils/makeFullUrl'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import CryptoJS from 'crypto-js'
import PAYMENT_TYPES from '@/constants/paymentTypes'
import Spinner from '@/components/common/Spinner'
import CURRENCIES from '@/constants/currencies'
import ORDER_STATUSES from '@/constants/orderStatuses'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import OrderStatusSteps from '../OrderStatusSteps'

function Page() {
    const [domain, setDomain] = useState('')
    const [currentUrl, setCurrentUrl] = useState('')
    const params = useParams()

    useEffect(() => {
        const domain =
            window.location.protocol +
            '//' +
            window.location.hostname +
            (window.location.port ? `:${window.location.port}` : ``)
        setDomain(domain)
        let baseUrl = domain + window.location.pathname
        setCurrentUrl(baseUrl)
    }, [])

    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)

    const { data, isFetching, isSuccess, isError } = useSingleOrderQuery({
        id: params.slug,
        currency_id: currency?.id
    })

    let order: Order = data

    const [cancelSingleProductOrder] = useCancealSingleProductOrderMutation()
    const { data: paymentMethods } = useGetPaymentMethodsQuery(params.slug)

    const cancelOrder = async (productOrderId: number) => {
        try {
            await cancelSingleProductOrder({
                orderId: order.id,
                productOrderId
            }).unwrap()
            notify('orders cancelled')
        } catch (err) {
            handleServerError(err)
        }
    }

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
        reset,
        setError,
        watch
    } = useForm()

    const [confirmOrder, { isLoading: isConfirmingOrder }] = useConfirmOrderMutation()

    const selectedPaymentMethod = watch('payment_mode')
    let confirmOrderText = 'Confirm Order'

    if (selectedPaymentMethod) {
        if (selectedPaymentMethod == PAYMENT_TYPES.CASH) {
            confirmOrderText = 'Confirm Order'
        } else {
            confirmOrderText = 'Pay and Confirm Order'
        }
    }

    async function makeStripePayment() {
        /* converting to cents */
        const subtotal = order.sub_total * 100
        const shippingPrice = order.shipping_cost * 100
        const currency = order.currency

        let lineItems = [
            {
                price_data: {
                    currency,
                    product_data: {
                        name: 'Sub Total'
                    },
                    unit_amount: subtotal
                },
                quantity: 1
            },
            {
                price_data: {
                    currency,
                    product_data: {
                        name: 'Shipping cost'
                    },
                    unit_amount: shippingPrice
                },
                quantity: 1
            }
        ]

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            // success_url: 'https://myweb.com/?payment_intent_id={CHECKOUT_SESSION_ID}', // i need session id here.
            success_url: `${domain}/payment-verification/s/${order?.id}?checkout_session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://failure.com?canceled=true`
        })

        const url = session.url
        if (url) {
            window.location.href = url
        }
    }

    const onSubmit = async (formData: any) => {
        try {
            if (selectedPaymentMethod == PAYMENT_TYPES.CASH) {
                await confirmOrder({
                    orderId: order.id,
                    token: formData.token,
                    payment_mode: formData.payment_mode
                }).unwrap()
                notify('order confirmed')
            } else if (selectedPaymentMethod === PAYMENT_TYPES.KHALTI) {
                let url = paymentMethods.khalti_url
                window.location.href = url
            } else if (selectedPaymentMethod === PAYMENT_TYPES.ESEWA) {
                const form = document.getElementById('esewa-form') as HTMLFormElement
                if (form) {
                    form.submit()
                }
            } else if (selectedPaymentMethod === PAYMENT_TYPES.STRIPE) {
                makeStripePayment()
            }
        } catch (err) {
            handleServerError(err)
        }
    }

    let amount = order?.total_price || 0
    let taxAmount = 0
    let totalAmount = order?.total_price || 0
    let productCode = 'EPAYTEST'
    let productServiceCharge = 0
    let productDeliveryCharge = 0
    let successUrl = `${domain}/payment-verification/e/${order?.id}`
    let failureUrl = `${currentUrl}?success=false`
    let hashInBase64 = ''
    let transactionUid: string | number = ``
    let esewaPaymentUrl = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'
    let merchantSecret = `8gBm/:&EnhH.1/q`

    if (process.env.NEXT_PUBLIC_NODE_ENV == 'production') {
        esewaPaymentUrl = 'https://epay.esewa.com.np/api/epay/main/v2/form '
        merchantSecret = `${process.env.NEXT_PUBLIC_ESEWA_MERCHAT_SECRETE}`
    }

    if (selectedPaymentMethod == PAYMENT_TYPES.ESEWA) {
        let currentTime = new Date()
        let formattedTime =
            currentTime.toISOString().slice(2, 10).replace(/-/g, '') +
            '-' +
            currentTime.getHours() +
            currentTime.getMinutes() +
            currentTime.getSeconds()

        // transactionUid = getRandomNumberInRange()
        transactionUid = formattedTime + '-' + order?.id

        let hash = CryptoJS.HmacSHA256(
            `total_amount=${totalAmount},transaction_uuid=${transactionUid},product_code=EPAYTEST`,
            `${merchantSecret}`
        )
        hashInBase64 = CryptoJS.enc.Base64.stringify(hash)
    }
    if (isFetching) {
        return <Spinner />
    }
    if (isError) {
        return (
            <>
                <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
                    <p>Something went wrong</p>
                    <Link className='btn' href={'/orders'}>
                        View Orders
                    </Link>
                </div>
            </>
        )
    }

    let allowNepaliPayments = true

    if (order.currency !== CURRENCIES.NEPAL) {
        allowNepaliPayments = false
    }

    function prependCurrency(amount: number | string) {
        // let orderedCurrency = currencies.find((el: any) => el.id == order.currency)
        // debugger
        return `${order.currency}${amount} `
    }

    return (
        <>
            <div className=''>
                <Breadcrumb
                    links={[
                        {
                            title: 'Orders',
                            link: '/orders'
                        },
                        {
                            title: `Order #${params.slug} `,
                            link: '#'
                        }
                    ]}
                />
            </div>

            {/* Make form using document.createElement(Form) : this is vulnerable */}

            <form className='hidden' action={esewaPaymentUrl} method='POST' id='esewa-form'>
                <input className='border p-2' type='text' id='amount' name='amount' value={amount} required />
                <input
                    className='border p-2'
                    type='text'
                    id='tax_amount'
                    name='tax_amount'
                    value={taxAmount}
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='total_amount'
                    name='total_amount'
                    value={totalAmount}
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='transaction_uuid'
                    name='transaction_uuid'
                    value={transactionUid}
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='product_code'
                    name='product_code'
                    value={productCode}
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='product_service_charge'
                    name='product_service_charge'
                    value={productServiceCharge}
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='product_delivery_charge'
                    name='product_delivery_charge'
                    value={productDeliveryCharge}
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='success_url'
                    name='success_url'
                    value={successUrl}
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='failure_url'
                    name='failure_url'
                    value={failureUrl}
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='signed_field_names'
                    name='signed_field_names'
                    value='total_amount,transaction_uuid,product_code'
                    required
                />
                <input
                    className='border p-2'
                    type='text'
                    id='signature'
                    name='signature'
                    value={hashInBase64}
                    required
                />
                <input className='btn border p-2' value='Submit' type='submit' />
            </form>

            <div className='container my-10'>
                <Order singleOrder order={order}>
                    <div>
                        {order.items.map((orderItem: OrderItem, index: number) => {
                            return (
                                <div key={orderItem.id}>
                                    <div className='mb-1 grid items-start gap-2 md:grid-cols-6'>
                                        <img
                                            src={makeFullUrl(orderItem.images[0]?.image)}
                                            className='h-24 w-24 object-cover'
                                            alt={`product ${orderItem.product_size.product.name}`}
                                        />
                                        <div className='md:col-span-2'>
                                            {orderItem.product_size.product.name}&nbsp;{' '}
                                            {`( ${orderItem.product_size.product_type.name} )`}
                                            <br />
                                            {orderItem.product_size.size.length}x{orderItem.product_size.size.width}x
                                            {orderItem.product_size.size.height}
                                            <br />
                                            {orderItem.product_size.size.weight}&nbsp;
                                            {orderItem.product_size.size.unit}
                                            <br />
                                            {prependCurrency(orderItem.price)}
                                        </div>
                                        <div>Qty: {orderItem.quantity}</div>
                                        <div className='badge-xsx  w-min'>{orderItem.status}</div>
                                        {/* <div>FIXME: estimated delivery date </div> */}
                                        <div>
                                            <button
                                                data-tooltip-id={`cancel-order-tooltip-${index}`}
                                                disabled={orderItem.status !== ORDER_STATUSES.PENDING}
                                                onClick={() => {
                                                    cancelOrder(orderItem.id)
                                                }}
                                                type='button'
                                                className='text-danger hover:text-danger-light hover:underline'
                                            >
                                                cancel
                                            </button>

                                            {orderItem.status !== ORDER_STATUSES.PENDING && (
                                                <Tooltip id={`cancel-order-tooltip-${index}`}>
                                                    <div>
                                                        <p>Sorry order cant be cancelled anymore</p>
                                                        <p>It is in delivery or cancelled.</p>
                                                    </div>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </div>
                                    <div className='hidden md:block'>
                                        <OrderStatusSteps orderStatus={order.status} />
                                    </div>
                                    {index + 1 <= order.items.length - 1 && (
                                        <hr className='mx-auto my-12 w-1/2 border border-gray-300' />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </Order>

                <h2 id='payment' className='mb-2 text-xl font-bold'>
                    Payment Method
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4 grid grid-cols-4 gap-2'>
                        {allowNepaliPayments && (
                            <>
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
                            </>
                        )}
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
                            <label id='stripe' className='flex cursor-pointer pr-4 text-sm font-medium text-gray-700'>
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
                    {errors.payment_mode && <span className=' form-error'>*please choose a payment method</span>}
                    <div className='mt-10 flex justify-center'>
                        <button disabled={isConfirmingOrder} className='btn'>
                            {isConfirmingOrder ? 'Loading...' : confirmOrderText}
                        </button>
                    </div>
                </form>

                <div className='my-4 text-center'>
                    <Link href={'/orders'} className='text-primary underline hover:text-primary-light'>
                        View all orders
                    </Link>
                </div>
            </div>
        </>
    )
}

export default withProtectedRoute(Page)
