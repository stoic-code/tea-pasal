'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import { useGetAllCartQuery } from '@/lib/features/api/order/getCart'
import withProtectedRoute from '@/components/withProtectedRoute'
import Link from 'next/link'
import appendCurrencyPrefix from '@/utils/appendCurrencyPrefix'
import { Card } from './Card'
import { useSelector } from 'react-redux'

function Page() {
    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)

    const { data } = useGetAllCartQuery({
        currency_id: currency?.id
    })

    let subTotal = 0
    let cartItems: CartItem[] = []

    if (data) {
        cartItems = data as CartItem[]
    }

    if (cartItems) {
        subTotal = cartItems.reduce((total, item) => {
            const price = parseFloat(item.product.price)
            const quantity = item.quantity
            return total + price * quantity
        }, 0)
    }

    return (
        <>
            <div className='mb-[80px]'>
                <Breadcrumb title=' Your Shopping Cart' />
            </div>
            <div className='container mb-[80px]  block gap-10  lg:grid lg:grid-cols-[800px_minmax(300px,_1fr)_100px] '>
                <div className=' col-span-1'>
                    <p className='mb-[15px] mt-[30px] text-[24px] font-bold text-[#2d2c2c]'>Products </p>
                    {cartItems?.map((el: CartItem) => {
                        return <Card cartItem={el} key={el.id} />
                    })}
                    <div className='md:text-center'>
                        <div className='mt-6 '>
                            <Link href={'/collections'}>
                                {' '}
                                <button className='btn text-white'>Continue Shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/*  order summary */}
                <div className='  col-span-1 mt-20 md:text-center lg:text-left'>
                    <p className='mb-[15px] mt-[30px] text-[24px] font-bold text-[#2d2c2c]'>Order Summary</p>
                    <div className=''>
                        <p className='text-[20px] font-bold text-primary'>Subtotal: {appendCurrencyPrefix(subTotal)}</p>
                        <div className='mt-6 w-full text-left md:text-center lg:text-left'>
                            <Link href={'/checkout'}>
                                {' '}
                                <button className=' btn text-white'>Proceed to Checkout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withProtectedRoute(Page)
