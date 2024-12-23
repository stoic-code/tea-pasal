'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { SlCalender } from 'react-icons/sl'
import PaginationComponent from '@/components/common/Pagination'

import { createSearchParms } from '@/utils/modifySearchParams'
import { useRouter } from 'next/navigation'
import SingleBlog from '@/components/home/SingleBlog'
import { pagination } from '@/constants/pagination'

export default function NewsListing({
    news,
    newsFilter,
    newsCount
}: {
    news: News[]
    newsFilter: { [key: string]: string }
    newsCount: number
}) {
    const router = useRouter()
    const [allNews, setNews] = useState(news)
    const [newsFilters, setNewsFilter] = useState(newsFilter)

    const handleFilterChange = (
        e?: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLButtonElement>,
        config?: {
            key?: string
            value?: string
        }
    ) => {
        let page = '1'
        if ((config?.key || (e?.target as HTMLSelectElement)?.name) == 'page') {
            page = config?.value || (e?.target as HTMLSelectElement)?.value
        }
        setNewsFilter(prev => ({
            ...prev,
            page,
            [config?.key || (e?.target as HTMLSelectElement)?.name]:
                config?.value || (e?.target as HTMLSelectElement)?.value
        }))
    }

    useEffect(() => {
        router.push('?' + createSearchParms(newsFilters))
    }, [newsFilters])

    useEffect(() => {
        setNews(news)
    }, [news])

    return (
        <>
            <div className='container py-[40px]'>
                <div className='mb-7 gap-4 lg:flex  '>
                    <div className='flex items-center gap-1'>
                        <label>Paginated By</label>
                        <select
                            onChange={handleFilterChange}
                            name='page_size'
                            className=' h-8 border bg-primary px-2 text-white'
                            value={parseInt(newsFilters.page_size)}
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

                    <div>
                        <div className='flex items-center gap-1'>
                            <label>Sort By</label>
                            <select
                                onChange={handleFilterChange}
                                name='sort'
                                className=' h-8 border bg-primary px-2 text-white'
                            >
                                {['Featured', 'Latest'].map((el, index) => {
                                    return (
                                        <option key={index} value={el}>
                                            {el}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>

                <ul className='grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3'>
                    {allNews.map((el, index) => {
                        return <SingleBlog key={el.id} blog={el} />
                    })}
                </ul>
                <br />
                <br />
                <PaginationComponent
                    handleFilterChange={handleFilterChange}
                    perPage={newsFilter.page_size}
                    current_page={newsFilter.page}
                    productsCount={newsCount}
                />
            </div>
        </>
    )
}
