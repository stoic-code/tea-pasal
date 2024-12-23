import Breadcrumb from '@/components/common/Breadcrumb'
import { fetchApiData } from '@/utils/fetchApiData'
import ClientCollection from './ClientCollection'
import { appendSearchParams } from '@/utils/modifySearchParams'
import { pagination } from '@/constants/pagination'
import type { Metadata } from 'next'
import getMetaTags from '@/utils/getMetaTags'
import metaTags from '@/data/metaTags'

export const metadata: Metadata = getMetaTags(metaTags.collections)

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    const productFilter: { [key: string]: string } = {
        currency_id: searchParams.currency_id || '',
        search: searchParams.search || '',
        category_slug: searchParams.category_slug || '',
        page: searchParams.page || '1',
        page_size: searchParams.page_size || `${pagination.PAGE_SIZE}`,
        min_rating: searchParams.min_rating || '',
        sort: searchParams.sort || ''
    }

    const url = appendSearchParams('/products/', productFilter) + '&ssr=true'

    const productsResponse = await fetchApiData({
        url,
        configObject: {
            cache: 'no-store' // this will make server-side and will be slow but
        }
    })

    const products: Product[] = productsResponse?.results || []

    const categories: Category[] = await fetchApiData({
        url: '/categories/',
        configObject: {
            cache: 'no-store'
        }
    })

    const links = [
        {
            title: 'Collections',
            link: '/collections'
        }
    ]
    return (
        <>
            <h1 className='hidden'>Product Collections</h1>
            <Breadcrumb links={links} />
            <ClientCollection
                searchParams={searchParams}
                productFilter={productFilter}
                products={products}
                categories={categories}
                productsCount={productsResponse?.count}
            />
        </>
    )
}
