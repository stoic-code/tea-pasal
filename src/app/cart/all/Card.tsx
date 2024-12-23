'use client'

import { FaEye, FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa'
import { useDeleteCartMutation, useUpdateCartMutation } from '@/lib/features/api/order/getCart'
import { makeFullUrl } from '@/utils/makeFullUrl'
import { RxCross1 } from 'react-icons/rx'
import handleServerError from '@/utils/handleServerError'
import appendCurrencyPrefix from '@/utils/appendCurrencyPrefix'
import notify from '@/utils/notify'
import { useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

export function Card({ cartItem, small }: { cartItem: CartItem; small?: string }) {
    // debugger
    const [updateCart] = useUpdateCartMutation()
    const [deleteCart] = useDeleteCartMutation()

    const handleChnage = (payload: object, id: number) => {
        try {
            const res = updateCart({
                formdata: payload,
                id: id
            }).unwrap()

            console.log(res)
        } catch (err) {
            handleServerError(err)
        }
    }

    const increase = (current_quantity: number) => {
        let payload = {
            product_size_id: cartItem.product_size_id,
            product_id: cartItem.product_id,
            quantity: current_quantity + 1
        }
        handleChnage(payload, cartItem.id)
    }

    const decrease = (current_quantity: number) => {
        let quantity = current_quantity - 1

        if (quantity < 0) {
            // console.log("");
        } else {
            quantity = current_quantity - 1
            let payload = {
                product_size_id: cartItem.product_size_id,
                product_id: cartItem.product_id,
                quantity: current_quantity - 1
            }
            handleChnage(payload, cartItem.id)
        }
    }

    const deleteCartitem = async (id: number) => {
        try {
            await deleteCart({
                id: id
            }).unwrap()

            notify()
        } catch (err) {
            handleServerError(err)
        }
    }

    const [toBeRemovedIndex, setToBeRemovedIndex] = useState<number | null>(null)

    return (
        <>
            <div
                className={classNames(
                    'relative mb-[10px] flex items-start border border-solid  border-[box-border] p-4 ',
                    {
                        '!border-red-400': toBeRemovedIndex == cartItem.product_id
                    }
                )}
            >
                <div className='self-center'>
                    <div className={classNames(`relative  border `)}>
                        <img
                            src={makeFullUrl(cartItem.product.images[0]?.image) || ''}
                            alt='img'
                            className={` ${small && 'h-[90px] w-[90px] md:w-[150px]'} h-[100px] w-[200px] object-cover`}
                        />
                        <div
                            onMouseEnter={() => {
                                setToBeRemovedIndex(cartItem.product_id)
                            }}
                            onMouseLeave={() => {
                                setToBeRemovedIndex(null)
                            }}
                            className='group absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2  -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-r-0 bg-danger-light hover:bg-danger '
                            onClick={() => deleteCartitem(cartItem.id)}
                        >
                            <RxCross1 className='text-white' />
                        </div>
                    </div>
                    <div className='mt-3 flex justify-center text-center'>
                        <span className='text-sm text-gray-500 '>{cartItem.product.inventory} items in stock</span>
                    </div>
                </div>

                <div className={` ${small ? 'm-0 ml-4' : 'ml-4 mr-0'}  w-full`}>
                    <Link href={`/products/${cartItem.product.slug}`} className='underline hover:text-primary'>
                        <p className=' text-header text-[18px] font-semibold lg:text-[22px]'>{cartItem.product.name}</p>
                    </Link>
                    <div className=' flex flex-col  flex-wrap  gap-2'>
                        <p className={`  ${small && 'text-[14px]'} `}>{cartItem.product.product_type.name}</p>
                        <p className={` inline-block text-[#2d2c2c]   ${small && 'text-[14px]'} `}>
                            {appendCurrencyPrefix(cartItem.product.price)} {`/ `}
                            {cartItem.product.size.weight}
                            {cartItem.product.size.unit}
                        </p>
                    </div>
                    <div className='mb-[10px] mt-2  flex items-center '>
                        <button
                            type='button'
                            className='group flex h-[30px] w-8 items-center  justify-center border border-r-0 hover:bg-primary'
                            onClick={() => decrease(cartItem.quantity)}
                        >
                            <FaMinus className='group-hover:text-white' />
                        </button>
                        <input
                            type='number'
                            value={cartItem.quantity}
                            className='h-[30px] w-[40px] border border-solid text-center focus:border-primary focus:outline-none '
                        />
                        <button
                            type='button'
                            className='group flex h-[30px] w-8 items-center  justify-center border border-r-0 hover:bg-primary'
                            onClick={() => increase(cartItem.quantity)}
                        >
                            <FaPlus className='group-hover:text-white' />
                        </button>
                    </div>

                    <p className='font-bold text-[#2d2c2c]'>
                        Total: {appendCurrencyPrefix(cartItem.quantity * parseFloat(cartItem.product.price))}
                    </p>
                </div>
            </div>
        </>
    )
}
