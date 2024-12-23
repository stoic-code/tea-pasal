'use client'
import { useRelatedProductQuery } from '@/lib/features/api/productReview/productRelated'

import React from 'react'

import SingleProduct from '../SingleProduct'
import { useParams } from 'next/navigation'

function RelatedProduct({ category_slug }: { category_slug: string }) {
    const params = useParams()

    const { data, isLoading } = useRelatedProductQuery({ category_slug })

    return (
        <>
            <section className='container my-[48px] md:my-[56px] lg:my-[64px] xl:my-[80px] 2xl:my-[100px] '>
                <h2 className='header-xl text-center font-bold '>Related Products</h2>
                <div className=' mt-12 grid gap-4 gap-y-8 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 '>
                    {data?.results?.map((el: Product) => {
                        if (el.slug === params['product-slug']) {
                            return null
                        }
                        return <SingleProduct key={el.id} product={el} />
                    })}
                </div>
            </section>
        </>
    )
}
export default RelatedProduct
