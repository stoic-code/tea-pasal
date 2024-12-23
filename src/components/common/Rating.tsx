import { MdOutlineStarPurple500, MdOutlineStarHalf, MdOutlineStarOutline } from 'react-icons/md'

/**
 *
 * @param {number} rating  min:0,max:5
 * @returns star icons
 */

export default function Rating({ rating = 0 }: { rating: number }) {
    // let arr = new Array(Math.floor(rating)).fill(null)
    return (
        <>
            <span>
                {[1, 2, 3, 4, 5].map((el, index) => {
                    return (
                        <span key={index}>
                            {el <= rating && <MdOutlineStarPurple500 className='inline text-2xl text-yellow-500' />}
                            {rating % 1 !== 0 && Math.ceil(rating) === el ? (
                                <MdOutlineStarHalf className='inline text-2xl text-yellow-500' />
                            ) : (
                                el > rating && <MdOutlineStarOutline className='inline text-2xl text-yellow-500' />
                            )}
                        </span>
                    )
                })}
            </span>
        </>
    )
}
