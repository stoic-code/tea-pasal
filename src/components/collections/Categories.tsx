'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
const ImageLink = '/assets/images/banner.jpg'
// import Sidepage from '@/app/pages/sidebar/Sidepage'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import classNames from 'classnames'

import { HoverRating } from '../common/HoverRating'

export default function Categories({
    handleFilterChange,
    categories: data
}: {
    categories: Category[]
    handleFilterChange: (e: any, config: any) => void
}) {
    const [categories, setCategories] = useState(data)
    console.log(categories)
    const [selectedStarCount, setSelectedStarCount] = useState(0)

    //to get the search query from the url
    const searchParams = useSearchParams()
    let searchedCategorySlug = searchParams.get('category_slug')
    let searchedMinRating = searchParams.get('min_rating')
    console.log(searchedCategorySlug)

    const [expandedCategories, setExpandedCategories] = useState<number[]>([])

    const handleToggleExpand = (categoryId: number) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId))
        } else {
            setExpandedCategories([...expandedCategories, categoryId])
        }
    }
    console.log(expandedCategories)

    useEffect(() => {
        let matched = categories?.find(
            el => el.slug == searchedCategorySlug || el.categories.find(el => el.slug == searchedCategorySlug)
        )?.id

        if (matched) {
            setExpandedCategories([matched])
        }
    }, [])

    return (
        <>
            <div className='w-full  md:col-span-1 '>
                <div>
                    <h2 className={`header-base  font-bold`}>Categories</h2>
                    <hr className='my-3 h-px border bg-gray-200'></hr>
                    <ul className='text-md my-4 grid gap-3'>
                        {categories?.map(data => {
                            let number = data?.categories?.length

                            return (
                                <li
                                    key={data.id}
                                    className={` relative mr-4  justify-between transition-all duration-300   ease-in-out`}
                                >
                                    <div className=' flex items-center justify-between'>
                                        <div className='flex items-center'>
                                            <h3
                                                className={classNames(
                                                    '  cursor-pointer  text-lg font-semibold capitalize hover:text-primary-light ',
                                                    {
                                                        'font-bold text-primary':
                                                            data.slug == searchedCategorySlug ||
                                                            data.categories.find(el => el.slug == searchedCategorySlug)
                                                    }
                                                )}
                                                onClick={e => {
                                                    handleFilterChange(e, {
                                                        key: 'category_slug',
                                                        value: data.slug
                                                    })
                                                }}
                                            >
                                                {data.name}{' '}
                                            </h3>
                                            <span
                                                className={classNames(
                                                    ' cursor-pointer  pl-2 text-sm !font-normal !text-gray-400',
                                                    {
                                                        'font-bold text-primary':
                                                            data.slug == searchedCategorySlug ||
                                                            data.categories.find(el => el.slug == searchedCategorySlug)
                                                    }
                                                )}
                                                onClick={e => {
                                                    handleFilterChange(e, {
                                                        key: 'category_slug',
                                                        value: data.slug
                                                    })
                                                }}
                                            >
                                                {expandedCategories.includes(data.id)
                                                    ? ' '
                                                    : `(${number} sub categories)`}
                                            </span>
                                        </div>
                                        <span
                                            className=' absolute right-0 flex h-8 w-8 cursor-pointer select-none items-center justify-center  rounded-full text-2xl font-bold hover:bg-primary  hover:text-white hover:transition-all'
                                            onClick={e => {
                                                e.stopPropagation()
                                                handleToggleExpand(data.id)
                                            }}
                                        >
                                            {expandedCategories.includes(data.id) ? '-' : '+'}
                                        </span>
                                    </div>

                                    <div
                                        className={`grid overflow-hidden ${expandedCategories.includes(data.id) ? '  grid-rows-[1fr] opacity-100 ' : '  grid-rows-[0fr] overflow-hidden   opacity-0  '}   transition-all   duration-300 ease-linear`}
                                    >
                                        <ul className=' mt-2 flex flex-col gap-2 overflow-hidden pl-4'>
                                            {data.categories.map(subCategory => (
                                                <li
                                                    className={`${subCategory.slug == searchedCategorySlug && 'font-bold text-primary before:absolute before:-left-2 before:top-[50%] before:-translate-x-full before:-translate-y-1/2 before:content-["_>"]  '}  overflow-hiddenn  relative cursor-pointer text-[16px] hover:text-primary-light `}
                                                    key={subCategory.id}
                                                    onClick={e => {
                                                        e.stopPropagation()

                                                        handleFilterChange(e, {
                                                            key: 'category_slug',
                                                            value: subCategory.slug
                                                        })
                                                    }}
                                                >
                                                    <h4>{subCategory.name}</h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* // )} */}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className='mt-12'>
                    <h2 className={` header-base font-bold ${'playfair'}`}>Shop By Rating</h2>
                    <hr className='my-3 h-px border-0 bg-gray-200'></hr>
                    <div className=' my-4 flex items-center'>
                        <HoverRating
                            searchedMinRating={searchedMinRating}
                            handleFilterChange={handleFilterChange}
                            selectedStarCount={selectedStarCount}
                            setSelectedStarCount={setSelectedStarCount}
                        />
                        <span>({`${searchedMinRating ? searchedMinRating : 0}`})</span>
                    </div>
                </div>
            </div>
        </>
    )
}
