'use client'
import Breadcrumb from '@/components/common/Breadcrumb'
import withProtectedRoute from '@/components/withProtectedRoute'
import { useWishListQuery } from '@/lib/features/api/product/wishListApi'
import Link from 'next/link'
import React from 'react'
import { WishListCard as Card } from './Card'

function Page() {
    const { data } = useWishListQuery()

    let wishLists: WishListItem[] = []

    if (data) {
        wishLists = data as WishListItem[]
    }

    const links = [
        {
            title: 'Wishlist',
            link: '/wishlist'
        }
    ]

    return (
        <>
            <div className=''>
                <Breadcrumb links={links} />
            </div>

            <div className='container my-[100px] overflow-x-auto'>
                {wishLists.length > 0 ? (
                    <table className='max-w-full overflow-x-auto '>
                        <thead className='bg-slate-100'>
                            <tr className='text-center'>
                                <th className='p-[10px] text-[16px] font-[700]'>IMAGE</th>
                                <th className='p-[10px] text-[16px] font-[700]'>PRODUCT</th>
                                {/* <th className='p-[10px] text-[16px] font-[700]'>
                                    PRICE
                                </th> */}
                                <th className='p-[10px] text-[16px] font-[700]'>PURCHASE</th>
                                <th className='p-[10px] text-[16px] font-[700]'>REMOVE</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {wishLists &&
                                wishLists.map(el => {
                                    return <Card key={el.id} product={el} />
                                })}
                        </tbody>
                    </table>
                ) : (
                    <div className='m-10 text-center'>
                        <p className='text-[32px] '>No Items found in WishList</p>
                        <Link href={'/collections'}>
                            <button className='btn mt-4'>View All Products</button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default withProtectedRoute(Page)
