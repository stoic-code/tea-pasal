import ORDER_STATUSES from '@/constants/orderStatuses'
import { useCurrenciesQuery } from '@/lib/features/api/currency/currencyApi'
import { useCancealOrderMutation } from '@/lib/features/api/order/orderApi'
import handleServerError from '@/utils/handleServerError'
import notify from '@/utils/notify'
import Link from 'next/link'
import React from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { TiEdit } from 'react-icons/ti'

export default function Order({
    order,
    singleOrder,
    children
}: {
    order: Order
    singleOrder?: boolean
    children: any
}) {
    let { city, country_code, postal_code, residential, state_or_province_code } = order.shipping_address
    const [cancelAllOrder] = useCancealOrderMutation()

    console.log(order)
    console.log(singleOrder)
    const cancelAllOrders = async () => {
        try {
            await cancelAllOrder(order.id).unwrap()
            notify('orders cancelled')
        } catch (err) {
            handleServerError(err)
        }
    }

    const { data: currenciesData } = useCurrenciesQuery()
    let currencies: any = []
    if (currenciesData) {
        currencies = currenciesData
        // debugger
    }

    function prependCurrency(amount: number | string) {
        // let orderedCurrency = currencies.find((el: any) => el.id == order.currency)
        // debugger
        return `${order.currency} ${amount} `
    }

    /*  
    STATUS_CHOICES = [
        (PENDING_CHOICE, "PENDING"),
        (CONFIRM_CHOICE, "CONFIRM"),
        (INDELIVERY_CHOICE, "INDELIVERY"),
        (CANCEL_CHOICE, "CANCELLED"),
        (RECEIVE_CHOICE, "RECEIVED"),
        (COMPLETED_CHOICE, "COMPLETE"),
      ]
    */

    const SUCCESS_ORDER_STATUS_STEPS = {
        '1': 'PENDING',
        '2': 'CONFIRM', // checked-reviewed by the buyer
        '3': 'RECEIVED', // order received by seller
        '4': 'INDELIVERY',
        '5': 'COMPLETE'
    }

    return (
        <section className='  mb-20  box-border  w-full  max-w-[100%]'>
            <div className=' flex w-full flex-col items-start gap-2 md:flex-row  md:items-center md:justify-between '>
                <p className='text-lg font-bold'>
                    Order Number{' '}
                    <Link className=' hover:underline' href={`/orders/${order.id}`}>
                        #{order.id}
                    </Link>
                </p>
                {!singleOrder && (
                    <Link
                        className='inline cursor-pointer items-center gap-1 bg-primary px-[12px]  py-[8px] text-white'
                        href={`/orders/${order.id}`}
                    >
                        <span className=' text-base font-bold'>
                            <TiEdit className='-mt-1 inline' />
                        </span>
                        Manage order
                    </Link>
                )}
            </div>
            {/* scrollbar implemented */}
            <div className='overflow-x-scroll] mb-8 mt-2 w-full max-w-[100%]  rounded  bg-[rgba(77,140,64,0.08)]  p-4 md:mt-4  md:p-8  lg:mt-5'>
                <div className=' order-wrapper overflow-x-auto   '>{children}</div>

                <div className='  mt-6 flex flex-col md:flex-row md:justify-between'>
                    <div>
                        {/* <p className='text-lg font-bold'>
                            Order{' '}
                            <Link className='text-primary hover:underline' href={`/orders/${order.id}`}>
                                #{order.id}
                            </Link>
                        </p> */}
                        <table>
                            <thead>
                                <tr className='text-left'>
                                    <th className='invisible p-1 '></th>
                                    <th className='invisible p-1 '></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='whitespace-pre-line p-1 font-bold capitalize'>shipping address</td>
                                    <td className='ml-4 whitespace-pre-line p-1 '>
                                        :{' '}
                                        {`${city}-${state_or_province_code}-${country_code}, ${postal_code} (${residential ? 'residential' : 'non-residential'})`}
                                    </td>
                                </tr>

                                <tr>
                                    <td className='whitespace-pre-line p-1 font-bold capitalize '>Placed on</td>
                                    <td className='whitespace-pre-line p-1 '>: {order.place_at}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr className='text-left'>
                                    <th className='invisible  p-1 '></th>
                                    <th className='invisible  p-1 '></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='   p-1  font-bold  capitalize'>Sub Total</td>
                                    <td className=' p-1 '>: {prependCurrency(order.sub_total)}</td>
                                </tr>
                                <tr>
                                    <td className='p-1  font-bold  capitalize'>shipping Price</td>
                                    <td className='  p-1 '>: {prependCurrency(order.shipping_cost)}</td>
                                </tr>
                                <tr>
                                    <td className=' p1  font-bold capitalize'>Total Price</td>
                                    <td className=' p-1 '>: {prependCurrency(order.total_price)}</td>
                                </tr>
                            </tbody>
                        </table>

                        {singleOrder ? (
                            <>
                                <button
                                    disabled={order.status != ORDER_STATUSES.PENDING}
                                    data-tooltip-id='cancel-order-tooltip'
                                    onClick={cancelAllOrders}
                                    type='button'
                                    className='text-danger hover:text-danger-light hover:underline'
                                >
                                    cancel all orders
                                </button>

                                {order.status != ORDER_STATUSES.PENDING && (
                                    <Tooltip id='cancel-order-tooltip'>
                                        <div>
                                            <p>Sorry order cant be cancelled anymore.</p>
                                            <p>It is confirmed and in delivery</p>
                                        </div>
                                    </Tooltip>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {/* {children} */}
            </div>
        </section>
    )
}
