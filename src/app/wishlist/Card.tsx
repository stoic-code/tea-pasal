'use client'

import { useAddToWishListMutation } from '@/lib/features/api/product/wishListApi'
import appendCurrencyPrefix from '@/utils/appendCurrencyPrefix'
import handleServerError from '@/utils/handleServerError'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa6'
import { MdDelete } from 'react-icons/md'

export const WishListCard = ({ product }: { product: any }) => {
    const [addtoWish] = useAddToWishListMutation()

    const handleRemove = async (id: number) => {
        const wishlist = {
            product_id: id
        }
        try {
            await addtoWish(wishlist).unwrap()
        } catch (err) {
            handleServerError(err)
        }
    }

    return (
        <>
            <tr>
                <td className='h-[130px] w-[130px]'>
                    <img src={product?.product.images[0]?.image} className='object-cover' alt={product.product.name} />
                </td>
                <td className='h-[152px] w-[360px] text-center font-bold '>{product.product.name}</td>

                {/* <td className='h-[152px] w-[243px] text-center'>
                    {appendCurrencyPrefix(product.product.sizes[0].price)}
                </td> */}
                <td className='h-[152px] w-[243px] text-center'>
                    <Link href={`/collections/${product.product.category?.slug}/products/${product.product.slug}`}>
                        <button className='btn flex items-center gap-2 font-normal  text-white transition-all duration-500 hover:bg-primary-light'>
                            <FaEye className='inline-block text-xl text-white' />
                            <span className='hidden md:inline'>View Product</span>
                        </button>
                    </Link>
                </td>
                <td className='h-[152px] w-[243px] text-center'>
                    <button
                        className='btn flex items-center gap-2 !bg-danger-light hover:!bg-danger'
                        onClick={() => {
                            handleRemove(product.product_id)
                        }}
                    >
                        <MdDelete className='inline-block text-xl text-white' />
                        <span className='hidden md:inline'>Remove</span>
                    </button>
                </td>
            </tr>
        </>
    )
}
