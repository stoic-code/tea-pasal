'use client'

import SpinnerIcon from '@/components/common/SpinnerIcon'
import PAYMENT_TYPES from '@/constants/paymentTypes'
import { useConfirmOrderMutation } from '@/lib/features/api/order/orderApi'
import handleServerError from '@/utils/handleServerError'
import notify from '@/utils/notify'
import Link from 'next/link'
import { useSearchParams, useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BiSolidError } from 'react-icons/bi'

export default function Page() {
    const searchParams = useSearchParams()
    const params = useParams()
    const router = useRouter()
    let provider = `${params.provider}`.toLowerCase()
    let orderId = params.slug

    const [confirmOrder, { isError, isLoading }] = useConfirmOrderMutation()

    useEffect(() => {
        let token: string | null = ``

        if (provider == PAYMENT_TYPES.ESEWA.toLowerCase()) {
            token = searchParams.get('data')
        } else if (provider == PAYMENT_TYPES.KHALTI.toLowerCase()) {
            /* 
            `http://localhost:3000/?pidx=tRSWiMnnQAyB9NkMXWBxmX&transaction_id=fFPtqnzQ8KWxYayPBnRouY&tidx=fFPtqnzQ8KWxYayPBnRouY&amount=82100&total_amount=82100&mobile=98XXXXX005&status=Completed&purchase_order_id=ORDER_NO89&purchase_order_name=ORDER_NO89`
             */
            token = searchParams.get('pidx')
        } else if (provider == PAYMENT_TYPES.STRIPE.toLowerCase()) {
            token = searchParams.get('checkout_session_id')
        }

        async function verfiyOrder() {
            try {
                await confirmOrder({
                    orderId,
                    token,
                    payment_mode: provider.toUpperCase()
                }).unwrap()
                notify('order confirmed')
                router.push(`/orders/${orderId}`)
            } catch (err) {
                handleServerError(err)
            }
        }
        verfiyOrder()
    }, [])

    return (
        <div>
            {isLoading && (
                <div className='flex h-screen flex-col items-center justify-center '>
                    <SpinnerIcon />
                    <p className='text-bold text-center text-xl'>Confirming Order..</p>
                </div>
            )}
            {isError && (
                <div className='flex h-screen flex-col items-center justify-center '>
                    <div className='flex flex-col items-center gap-3 p-10'>
                        <BiSolidError className='mb-3 text-[100px] text-red-600' />
                        <p className='mb-3 font-bold text-red-600  '>Your Order Confirmation Failed !!</p>
                        <p className='mb-3 font-bold'>Please contact Us !!</p>
                        <Link href={`/orders/${orderId}`} className='btn '>
                            View Order
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
