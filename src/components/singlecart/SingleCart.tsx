import { FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa'
import { makeFullUrl } from '@/utils/makeFullUrl'

export default function Card({
    product
}: {
    product: { product: CartProduct; quantity: number; price: number | string }
}) {
    return (
        <>
            <div className='mb-[30px] flex border border-solid  border-[box-border]  '>
                <img
                    src={makeFullUrl(product.product.images[0]?.image)}
                    alt='img'
                    className='h-[240px] w-[200px] object-cover'
                />
                <div className='m-[20px] w-full'>
                    <p className='mb-[10px] text-[22px] font-bold text-[#2d2c2c] hover:text-primary'>Green Chai</p>
                    <p>
                        {product.product.size.weight}
                        {product.product.size.unit}/{product.product.product_type.name}
                    </p>
                    <p className='font-bold text-[#2d2c2c]'>
                        {/* FIXME: remove all static Rs. */}
                        RS. {product.product.price}
                    </p>
                    <div className='mb-[10px]  flex items-center '>
                        <div className='group    flex h-[30px] w-8 items-center  justify-center border border-r-0 hover:bg-primary'>
                            <FaMinus className='group-hover:text-white' />
                        </div>
                        <input
                            type='number'
                            defaultValue={product.quantity}
                            className='h-[30px] w-[40px] border border-solid text-center focus:border-primary-light  focus:outline-none '
                        />
                        <div className='group flex h-[30px] w-8 items-center  justify-center border border-r-0 hover:bg-primary-light'>
                            <FaPlus className='group-hover:text-white' />
                        </div>
                    </div>

                    <p className='font-bold text-[#2d2c2c]'>
                        {/* FIXME: remove all static RS */}
                        Total: RS. {product.quantity * parseFloat(product.product.price)}
                    </p>
                </div>
            </div>
        </>
    )
}
