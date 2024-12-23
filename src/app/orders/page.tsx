'use client'
import Breadcrumb from '@/components/common/Breadcrumb'
import withProtectedRoute from '@/components/withProtectedRoute'
import { pagination } from '@/constants/pagination'
import { useOrdersQuery } from '@/lib/features/api/order/orderApi'
import Link from 'next/link'
import React, { useState } from 'react'
import Order from './Order'
import { makeFullUrl } from '@/utils/makeFullUrl'
import PaginationComponent from '@/components/common/Pagination'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'

const OrderStatus: {
    [key: string]: string
} = {
    PENDING: 'bg-gray-500',
    COMPLETE: 'bg-primary',
    CANCELLED: 'bg-red-100',
    CONFIRM: 'bg-blue-400',
    RECEIVED: 'bg-primary',
    INDELIVERY: 'bg-orange-400'
}

function Page() {
    const searchParams = useSearchParams()

    let initialProductFilter = {
        page_size: searchParams.get('page_size') || `${pagination.PAGE_SIZE}`,
        page: searchParams.get('page') || '1',
        sort: searchParams.get('sort') || '1'
    }
    const [productFilter, setProductFilter] = useState(initialProductFilter)

    const { data, isFetching, isSuccess } = useOrdersQuery(productFilter)

    const handleFilterChange = (
        e?: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>,
        config?: {
            key?: string
            value?: string
        }
    ) => {
        /* after change in search parameters, restart from page 1 */
        let page = '1'

        if ((config?.key || (e?.target as HTMLSelectElement)?.name) == 'page') {
            page = config?.value || (e?.target as HTMLSelectElement)?.value
        }

        setProductFilter(prev => ({
            ...prev,
            page,
            [config?.key || (e?.target as HTMLSelectElement)?.name]:
                config?.value || (e?.target as HTMLSelectElement)?.value
        }))
    }

    let orders: [] = (data as any)?.results
    let totalOrders = (data as any)?.count

    console.log(orders)

    return (
        <>
            <div className=''>
                <Breadcrumb title={'My Orders'} />
            </div>
            <div className=''>
                <div className='grid-flow-co container my-[40px] gap-4 px-[15px] md:my-[48px] md:px-[30px]  lg:my-[56px] xl:my-[64px] 2xl:my-[80px]'>
                    <div className='mt-12 md:mt-0  '>
                        <div className='grid justify-between md:grid-flow-col'>
                            <div className='grid grid-cols-2 gap-3 md:flex'>
                                <div className='grid items-center gap-2 md:grid-flow-col'>
                                    <label className=''>Paginated By</label>
                                    <select
                                        onChange={handleFilterChange}
                                        name='page_size'
                                        id=''
                                        className='h-8 w-full border bg-primary px-2 text-white'
                                        value={parseInt(productFilter.page_size)}
                                    >
                                        {[pagination.PAGE_SIZE, 9, 12, 15, 20].map((el, index) => {
                                            return (
                                                <option key={index} value={el}>
                                                    {el}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='grid items-center gap-2 md:grid-flow-col'>
                                    <label className='w-full'>Sort by</label>
                                    <select
                                        value={productFilter.sort}
                                        onChange={handleFilterChange}
                                        name='sort'
                                        className='h-8 border bg-primary   px-10 text-white'
                                    >
                                        <option value='latest'>Latest</option>
                                        {/* <option value='featured'>Featured</option> */}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {isFetching ? (
                            <>
                                <p className='my-10 text-center'>loading..</p>
                            </>
                        ) : isSuccess ? (
                            <>
                                <div className='my-[40px]    box-border max-w-[100%]   '>
                                    {orders?.map((order: Order) => (
                                        <>
                                            <Order order={order}>
                                                <table className=' box-border w-full max-w-[100%] border-collapse    border-b-2  border-gray-300 '>
                                                    <thead className='  mb-8 border-b-[30px] border-transparent '>
                                                        <tr className=' mb-8   box-border text-center'>
                                                            <th className='  min-w-[50px]   p-3   capitalize '></th>
                                                            <th className='  p-3 text-left   capitalize '>items</th>
                                                            <th className=' p-3  capitalize'>dimension</th>
                                                            <th className=' p-3  capitalize'>quantity</th>
                                                            <th className=' p-3 capitalize '>total</th>
                                                            <th className=' p-3  capitalize'>status</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className='   text-center'>
                                                        {order?.items?.map((orderItem: OrderItem, index: number) => {
                                                            return (
                                                                <tr key={index} className=' h-28  '>
                                                                    <td
                                                                        style={{ width: '100px' }}
                                                                        p-3
                                                                        className='w-[50px] '
                                                                    >
                                                                        <Image
                                                                            width={45}
                                                                            height={45}
                                                                            src={
                                                                                makeFullUrl(
                                                                                    orderItem.images[0]?.image
                                                                                ) || ''
                                                                            }
                                                                            className=' block h-[55px] w-[45px]  object-cover align-middle'
                                                                            alt='product-image'
                                                                        />
                                                                    </td>
                                                                    <td className=' p-3 text-left    '>
                                                                        <span className='   w-fit max-w-[100%]  overflow-x-scroll whitespace-nowrap text-left font-semibold'>
                                                                            {orderItem.product_size.product.name} &nbsp;{' '}
                                                                            {`( ${orderItem.product_size.product_type.name} )`}
                                                                        </span>
                                                                    </td>
                                                                    <td className=' whitespace-nowrap p-3  font-semibold'>
                                                                        <br />
                                                                        {orderItem.product_size.size.length}x
                                                                        {orderItem.product_size.size.width}x
                                                                        {orderItem.product_size.size.height}
                                                                        <br />
                                                                        <p className=' font-normal '>
                                                                            {orderItem.product_size.size.weight}
                                                                            &nbsp;
                                                                            {orderItem.product_size.size.unit}
                                                                        </p>
                                                                    </td>
                                                                    <td className='whitespace-nowrap p-3  font-semibold'>
                                                                        {orderItem.quantity} Pcs
                                                                    </td>
                                                                    <td className='whitespace-nowrap p-3  font-semibold'>
                                                                        Rs. {orderItem?.price}{' '}
                                                                        {/* FIXME : not alwyas Rs. */}
                                                                    </td>
                                                                    <td className='whitespace-nowrap p-3  font-semibold'>
                                                                        <span
                                                                            className={` ${OrderStatus[orderItem?.status]} p-1 text-white`}
                                                                        >
                                                                            {orderItem.status}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </Order>
                                        </>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <p className='my-10 text-center'>please try agin later </p>
                            </>
                        )}

                        {isSuccess && (
                            <PaginationComponent
                                handleFilterChange={handleFilterChange}
                                perPage={productFilter.page_size}
                                current_page={productFilter.page}
                                productsCount={totalOrders}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default withProtectedRoute(Page)
