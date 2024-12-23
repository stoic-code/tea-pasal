'use client'

import React, { useEffect, useState } from 'react'
import Categories from '@/components/collections/Categories'
import Products from '@/components/collections/Products'
import { fetchApiData } from '@/utils/fetchApiData'
import { useRouter } from 'next/navigation'
import { appendSearchParams, createSearchParms } from '@/utils/modifySearchParams'
import { pagination } from '@/constants/pagination'
import PaginationComponent from '@/components/common/Pagination'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'

/* to avoid, ref-fetching of data, if there is not any search params, cause SSR have already fetched.  */

let changedFilterOnce = false

export default function ClientCollection({
    products: productsData,
    searchParams,
    categories,
    productsCount,
    productFilter: initialProductFilter
}: {
    searchParams: SearchParams
    productFilter: {
        [key: string]: string
    }
    productsCount: number
    products: Product[]
    categories: Category[]
}) {
    const router = useRouter()
    const currency = useSelector((store: ReduxStore) => store.setting.value.currency)

    const [productFilter, setProductFilter] = useState(initialProductFilter)
    const [products, setProducts] = useState(productsData)

    useEffect(() => {
        setProducts(productsData)
    }, [productsData])

    useEffect(() => {
        setProductFilter(initialProductFilter)
    }, [initialProductFilter])

    useEffect(() => {
        handleFilterChange(undefined, {
            key: 'currency_id',
            value: currency?.id ? `${currency?.id}` : ''
        })
    }, [currency?.id])

    useEffect(() => {
        if (changedFilterOnce) {
            router.push('?' + createSearchParms(productFilter))
            // reFetchProducts() // SSR will fetch products when change in url
        }
    }, [JSON.stringify(productFilter)])

    function resetFilter(
        e?: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>,
        config?: {
            key?: string
            value?: string | null
        }
    ) {
        changedFilterOnce = true

        if (!config) {
            /* reset all */
            const defaultProductfilter: { [key: string]: string } = {
                search: '',
                category_slug: '',
                page: '1',
                page_size: `${pagination.PAGE_SIZE}`,
                min_rating: ''
            }
            setProductFilter(defaultProductfilter)
        } else {
            setProductFilter(prev => ({
                ...prev,
                [config?.key || (e?.target as HTMLSelectElement)?.name]:
                    config?.value || (e?.target as HTMLSelectElement)?.value
            }))
        }
    }

    const handleFilterChange = (
        e?: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>,
        config?: {
            key?: string
            value?: string
        }
    ) => {
        changedFilterOnce = true

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

    return (
        <div>
            <div className='grid-flow-co container my-[40px] gap-4 md:my-[48px] md:grid md:grid-cols-3 lg:my-[56px] xl:my-[64px] 2xl:my-[80px]'>
                <Categories categories={categories} handleFilterChange={handleFilterChange} />

                <div className='col-span-2 mt-12 md:mt-0  '>
                    <div className='grid justify-between md:grid-flow-col'>
                        <div className='grid grid-cols-2 gap-3 md:flex'>
                            <div className='grid items-center gap-2 md:grid-flow-col'>
                                <label className=''>Paginated By</label>
                                <select
                                    onChange={handleFilterChange}
                                    name='page_size'
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
                                    <option value='featured'>Featured</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* <hr className='my-1 mb-4 h-px border-0 bg-gray-200'></hr> */}
                    {products.length === 0 ? (
                        <>
                            <div className=' my-[64px]  flex w-full flex-col items-center justify-center sm:my-[72px] md:my-[88px] lg:my-[104px] xl:my-[128px] 2xl:my-[150px] '>
                                <div className=''>
                                    <p className=' text-center  text-xl'>0 Products Matched</p>
                                    <p className=' text-center  text-base'>Try removing applied filters</p>
                                </div>
                                <p className=' mb-4 mt-12  text-xl'>Applied Filters:</p>
                                <div className='mb-12 flex flex-wrap gap-2 '>
                                    <button
                                        className='badge'
                                        type='button'
                                        onClick={() => {
                                            resetFilter()
                                        }}
                                    >
                                        Reset All Filters
                                    </button>
                                    {searchParams?.search && (
                                        <button type='button' className=' relative'>
                                            <span
                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                    let config = { key: 'search', value: '' }
                                                    resetFilter(e, config)
                                                }}
                                                className=' absolute -right-1 -top-[0.8rem] flex h-5 w-5 cursor-pointer items-center  justify-center  rounded-full bg-red-500 text-white  '
                                            >
                                                <RxCross2 />
                                            </span>
                                            <span className='badge'>Search Term: {searchParams.search}</span>
                                        </button>
                                    )}
                                    {searchParams?.page && searchParams?.page != '1' && (
                                        <button type='button' className=' relative'>
                                            <span
                                                onClick={e => {
                                                    let config = { key: 'page', value: '1' }
                                                    resetFilter(undefined, config)
                                                }}
                                                className=' absolute -right-1 -top-[0.8rem] flex h-5 w-5 cursor-pointer items-center  justify-center  rounded-full bg-red-500 text-white  '
                                            >
                                                <RxCross2 />
                                            </span>
                                            <span className='badge'>Page: {searchParams.page}</span>
                                        </button>
                                    )}
                                    {searchParams?.category_slug && (
                                        <button type='button' className=' relative'>
                                            <span
                                                onClick={e => {
                                                    let config = { key: 'category_slug', value: '' }
                                                    resetFilter(undefined, config)
                                                }}
                                                className=' absolute -right-1 -top-[0.8rem] flex h-5 w-5 cursor-pointer items-center  justify-center  rounded-full bg-red-500 text-white   drop-shadow-lg '
                                            >
                                                <RxCross2 />
                                            </span>
                                            <span className='badge'>Category: {searchParams.category_slug}</span>
                                        </button>
                                    )}
                                    {searchParams?.min_rating && (
                                        <button type='button' className=' relative'>
                                            <span
                                                onClick={e => {
                                                    let config = { key: 'min_rating', value: '' }
                                                    resetFilter(undefined, config)
                                                }}
                                                className=' absolute -right-1 -top-[0.8rem] flex h-5 w-5 cursor-pointer items-center  justify-center  rounded-full bg-red-500 text-white   drop-shadow-lg '
                                            >
                                                <RxCross2 />
                                            </span>
                                            <span className='badge'>Min Rating: {searchParams.min_rating}</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Products products={products} />
                            <PaginationComponent
                                handleFilterChange={handleFilterChange}
                                perPage={productFilter.page_size}
                                current_page={productFilter.page}
                                productsCount={productsCount}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
