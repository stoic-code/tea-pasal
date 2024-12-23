'use client'
import AddToCart from '@/components/collections/Prooduct/AddToCart'
import { useGetSingleProductQuery } from '@/lib/features/api/product/productApi'
import appendCurrencyPrefix from '@/utils/appendCurrencyPrefix'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ProductInfo({ product: serverProduct }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<number | null>(null)

    const [product, setProduct] = useState(serverProduct)
    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)

    const { data, isSuccess, isFetching } = useGetSingleProductQuery({
        currency_id: currency?.id,
        slug: serverProduct.slug
    })

    useEffect(() => {
        if (isSuccess) {
            setProduct(data)
            const id = data.sizes[0]?.id

            setSelectedSize(id)
        }
    }, [isFetching, isSuccess])

    const commonInfoLabelClass =
        'grid  min-w-[100px] max-w-[100px] gap-6 font-serif   font-bold text-black md:min-w-[110px] md:max-w-[999px] text-[15px] md:text-base'

    return (
        <>
            <h2 className='hidden'>Product Infos</h2>

            <div className='flex text-lg'>
                <ul className={commonInfoLabelClass}>
                    <li>
                        <h3>Aroma:</h3>{' '}
                    </li>
                    <li>
                        <h3>Appearance:</h3>{' '}
                    </li>
                </ul>
                <ul className='ml-5 grid flex-grow gap-6 font-sans md:ml-8'>
                    <li className='flex gap-2'>
                        <span className='text text-md rounded-md border border-primary p-1 text-primary'>
                            {product?.aroma?.name}
                        </span>
                    </li>
                    <li className='flex gap-2'>
                        <span className='text text-md rounded-md border border-primary p-1 text-primary'>
                            {product?.apperance}
                        </span>
                    </li>
                </ul>
            </div>
            <div className='flex text-lg'>
                <ul className={commonInfoLabelClass}>
                    <li>
                        <h3>Variants:</h3>
                    </li>
                </ul>
                <ul className='ml-5 grid flex-grow gap-6 font-sans md:ml-8'>
                    <li>
                        <ul>
                            {product.sizes?.map(el => {
                                return (
                                    <li
                                        key={el.id}
                                        onClick={() => {
                                            if (selectedSize == el.id) {
                                                setSelectedSize(null)
                                            } else {
                                                setSelectedSize(el.id)
                                            }
                                        }}
                                        className={classNames(
                                            'relative mb-2 flex flex-grow cursor-pointer items-center justify-between rounded-md border border-primary px-3 py-1  text-primary',
                                            {
                                                'shadow-lgg shadow-primaryy bg-primaryy text-whitee before:absolute before:left-0 before:-translate-x-[210%] before:content-[_"✔"] ':
                                                    selectedSize == el.id
                                            },
                                            {
                                                'hover:shadow-lg': selectedSize != el.id
                                            }
                                        )}
                                    >
                                        <span className='text-xl font-semibold'>{appendCurrencyPrefix(el.price)}</span>
                                        <div className='flex flex-col items-end justify-end text-right'>
                                            <span>
                                                {el.size.weight}
                                                {el.size.unit}
                                            </span>
                                            <span>{el.product_type.name}</span>
                                            <span className='text-sm text-gray-400'>{el.inventory} items in stock</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                </ul>
            </div>
            <AddToCart
                commonInfoLabelClass={commonInfoLabelClass}
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
            />
        </>
    )
}
