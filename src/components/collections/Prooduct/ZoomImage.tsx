'use client'

import { MouseEvent, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
export default function ZoomImage({ product }: { product: Product }) {
    const [transformOrigin, setTransformOrigin] = useState<string | null>(null)

    const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
        const x = e.clientX - e.currentTarget.offsetLeft
        const y = e.clientY - e.currentTarget.offsetTop

        setTransformOrigin(`${x}px ${y}px`)
    }

    const handleMouseLeave = () => {
        setTransformOrigin(null)
    }
    return (
        <div
            id='zoom_img'
            // onMouseMove={handleMouseMove}
            // onMouseLeave={handleMouseLeave}
            className='w-500] h-400] relative overflow-hidden'
        >
            {product?.images?.length > 0 && (
                <Zoom>
                    <img
                        className={` h-full w-full object-contain `}
                        style={{
                            transform: transformOrigin ? 'scale(2)' : 'none'
                        }}
                        src={product?.images[0]?.image}
                        alt={`${product.name} product`}
                        width='500'
                    />
                </Zoom>
            )}
        </div>
    )
}
