import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '@/lib/features/cart/cartSlice'
import { toggleToast } from '@/lib/features/cart/toastSlice'
import { RxCross1 } from 'react-icons/rx'

function CustomToast() {
    const product = useSelector((store: ReduxStore) => store.toast.value.data)
    const customNotify = useSelector((store: ReduxStore) => store.toast.value.isOpen)

    const dispatch = useDispatch()

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleClose()
        }, 5000)

        return () => clearTimeout(timeout)
    }, [product?.id])

    const handleClose = () => {
        let payload = {
            isOpen: false,
            data: null
        }
        dispatch(toggleToast(payload))
    }

    const handleToastClick = () => {
        dispatch(toggleCart())
        handleClose()
    }

    const handleCrossClick = (e: any) => {
        e.stopPropagation()
        handleClose()
    }

    if (!customNotify) {
        return null
    }

    return (
        <div
            className=' fixed bottom-7 right-7 z-[99991]  
                    animate-toastify rounded-lg bg-white p-3 
                    text-body
                    shadow-[0px_0px_3px_1px_#C2C3C5]
                '
            onClick={handleToastClick}
        >
            <div className='absolute right-2 top-2 ' onClick={handleCrossClick}>
                <RxCross1 className='cursor-pointer hover:text-primary lg:text-[18px] xl:text-[20px]' />
            </div>
            <div className='flex  items-center gap-5 pr-12'>
                <img alt='product image' src={product?.images[0].image} className='max-w-20 max-h-20' />
                <div className='flex flex-grow flex-col items-start gap-3'>
                    <p className='font-bold'>Added to Cart</p>
                    <p>{product?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default CustomToast
