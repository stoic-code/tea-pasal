'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useGetSearchProductQuery } from '@/lib/features/api/product/productApi'
import Link from 'next/link'

export default function HSearchForm({ setSearchOpen }: { setSearchOpen: (status: boolean) => void }) {
    const router = useRouter()

    const searchParams = useSearchParams()
    let searchTerm = searchParams.get('search')

    const [searchQuery, setSearchQuery] = useState(searchTerm || '')

    useEffect(() => {
        setSearchQuery(searchTerm || '')
    }, [searchTerm])

    function handleSearchSubmit(e: any) {
        e.preventDefault()
        router.push(`/collections?search=${searchQuery}`)
        setSearchOpen(false)
        setSearchQuery('')
    }

    const handleReset = () => {
        router.push(`/collections`)
        setSearchOpen(false)
        setSearchQuery('')
        /* FIXME: this should only remove search filters
            eg: if url is /collections?search=abc&rating=5

        */
    }

    const { data: searchProducts } = useGetSearchProductQuery({
        search: searchQuery
    })

    return (
        <div className='w-full'>
            {/*  <form className=' mr-2 flex w-full' onSubmit={e => handleSearchSubmit(e)}>
                <div className='flex w-full justify-between rounded-3xl border border-gray-300 p-2 px-5'>
                    <input
                        type='text'
                        autoFocus
                        placeholder='Search our store...'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className='mr-2 w-full  focus:border-primary focus:outline-none'
                    />

                    {searchQuery && (
                        <button
                            className='w-20 rounded-3xl bg-danger text-white hover:bg-danger-light'
                            type='button'
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    )}
                </div>
            </form> */}
            <form className=' relative relative mr-2 w-full' onSubmit={e => handleSearchSubmit(e)}>
                <input
                    type='text'
                    autoFocus
                    placeholder='Search our store...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className='mr-2 w-full rounded-3xl border border-gray-300 p-2 px-5 focus:border-primary focus:outline-none'
                />

                {/* on show reset, if user has searched previously */}
                {searchTerm && (
                    <button
                        title='reset search filter'
                        className='absolute right-3 top-[50%] -translate-y-1/2 rounded-3xl bg-danger-light px-2 py-1 text-sm text-white hover:bg-danger '
                        type='button'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                )}
            </form>

            <div
                className={` ${searchQuery ? 'flex' : 'hidden'} left-[11rem]] absolute top-[3.5rem] ml-4 mt-2 flex flex-col  gap-2 rounded-b-2xl bg-white px-8 py-4 text-start  shadow-lg   `}
            >
                {searchProducts && searchProducts?.results.length > 0 ? (
                    searchProducts?.results.map((prod: Product, index: number) => {
                        return (
                            <div className='' key={index}>
                                <Link
                                    onClick={() => {
                                        setSearchOpen(false)
                                    }}
                                    href={`/collections?search=${prod?.name}`}
                                >
                                    {prod.name}
                                </Link>
                            </div>
                        )
                    })
                ) : (
                    <span>No Such Product Found</span>
                )}
            </div>
        </div>
    )
}
