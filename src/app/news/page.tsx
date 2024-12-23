import Breadcrumb from '@/components/common/Breadcrumb'
import { fetchApiData } from '@/utils/fetchApiData'
import NewsListing from './NewsListing'
import { pagination } from '@/constants/pagination'
import { appendSearchParams } from '@/utils/modifySearchParams'
import type { Metadata } from 'next'
import getMetaTags from '@/utils/getMetaTags'
import metaTags from '@/data/metaTags'
import { REVALIDATION_VALUE } from '@/constants/nextConfig'
export const metadata: Metadata = getMetaTags(metaTags.collections)

export const revalidate = REVALIDATION_VALUE

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
    const newsFilter: { [key: string]: string } = {
        page: searchParams.page || '1',
        page_size: searchParams.page_size || `${pagination.PAGE_SIZE}`
    }

    const url = appendSearchParams('/news/', newsFilter)
    const news = await fetchApiData({ url })
    const links = [
        {
            title: 'NEWS',
            link: '#'
        }
    ]
    return (
        <>
            <Breadcrumb links={links} />
            <NewsListing news={news.results} newsFilter={newsFilter} newsCount={news?.count} />
        </>
    )
}
