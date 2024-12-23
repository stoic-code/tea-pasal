import React from 'react'

import { useState } from 'react'
import { MdOutlineStarPurple500 } from 'react-icons/md'

export function HoverRating({
    onChange,
    selectedStarCount,
    setSelectedStarCount,
    handleFilterChange,
    searchedMinRating
}: {
    onChange?: any
    selectedStarCount: number
    setSelectedStarCount: (el: number) => void
    handleFilterChange?: (e: any, el: any) => void
    searchedMinRating?: string | null
}) {
    const [hoveredStar, sethoveredStar] = useState(0)
    console.log(selectedStarCount)
    console.log(searchedMinRating)
    let searched_min_rating_number = parseInt(searchedMinRating || '')
    console.log(searched_min_rating_number)
    return (
        <>
            <div className=' flex'>
                {Array.from({ length: 5 }, (_, index) => {
                    return (
                        <div key={index}>
                            <input
                                type='radio'
                                key={index}
                                onMouseOver={() => {
                                    sethoveredStar(index + 1)
                                }}
                                className={`  hidden cursor-pointer  text-3xl`}
                            />
                            <span
                                onMouseOver={() => {
                                    sethoveredStar(index + 1)
                                }}
                                onMouseOut={() => sethoveredStar(0)}
                                onClick={e => {
                                    setSelectedStarCount(index + 1)

                                    onChange && onChange(index + 1)

                                    handleFilterChange &&
                                        handleFilterChange(e, {
                                            key: 'min_rating',
                                            value: index + 1
                                        })
                                }}
                                className={`  ${index + 1 <= selectedStarCount && 'text-yellow-500'}
                                        ${index + 1 <= hoveredStar && 'text-yellow-500'}  cursor-pointer  text-3xl`}
                            >
                                <MdOutlineStarPurple500 />
                            </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
