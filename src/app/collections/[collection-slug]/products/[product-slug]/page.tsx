import Breadcrumb from '@/components/common/Breadcrumb'
import Rating from '@/components/common/Rating'
import { fetchApiData } from '@/utils/fetchApiData'
import Description_Review from '@/components/collections/Prooduct/Description_Review'
import ZoomImage from '@/components/collections/Prooduct/ZoomImage'
import { REVALIDATION_VALUE } from '@/constants/nextConfig'
import ProductInfo from './ProductInfo'
import RelatedProduct from '@/components/collections/Prooduct/RelatedProduct'
import { notFound } from 'next/navigation'

export const revalidate = REVALIDATION_VALUE

export default async function Page({ params }: { params: Params }) {
    let product: Product = await fetchApiData({
        url: `/products/${params['product-slug']}/`,
        defaultValue: null
    })

    if (!product) {
        notFound()
        return
    }

    let productName = product.name

    const links = [
        {
            title: 'Collections',
            link: '/collections'
        },
        {
            title: `${params['collection-slug']}`,
            link: `/collections/${params['collection-slug']}`
        },
        {
            title: `${productName}`,
            link: `#`
        }
    ]
    return (
        <>
            <h1 className='hidden'>{product.name}</h1>
            <Breadcrumb links={links} />
            <section className='container pb-[10px] pt-[100px] md:flex '>
                <div className='grid  gap-8  md:grid-flow-col md:grid-cols-3 md:items-center lg:grid-cols-2'>
                    <div className='md:col-span-1 '>
                        <ZoomImage product={product} />
                    </div>
                    <div className='flex flex-col gap-4 md:col-span-2 lg:col-span-1'>
                        <div className='header'>{product?.name}</div>
                        <Rating rating={product.avg_rating || 0} />
                        <ProductInfo product={product} />
                    </div>
                </div>
            </section>

            <Description_Review product={product} />
            <RelatedProduct category_slug={params['collection-slug']} />
        </>
    )
}
