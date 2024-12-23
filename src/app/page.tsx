import Banner from '@/components/common/Banner/Banner'
import Testimonials from '@/components/home/Testimonials'
// import Partners from '@/components/home/Partners'
import Features from '@/components/home/Features'
import Info from '@/components/home/Info'
import Products from '@/components/home/Products'
import Scheme from '@/components/home/Scheme'
import Blogs from '@/components/home/Blogs'

import { fetchApiData } from '@/utils/fetchApiData'
import { REVALIDATION_VALUE } from '@/constants/nextConfig'

export const revalidate = REVALIDATION_VALUE
import type { Metadata } from 'next'
import getMetaTags from '@/utils/getMetaTags'
import metaTags from '@/data/metaTags'
import ValidateGoogle from './ValidateGoogle'

export const metadata: Metadata = getMetaTags(metaTags.home)

export default async function Home() {
    const banners = await fetchApiData({
        url: '/sliders/'
        // configObject: {
        //     next: { revalidate: 86400 } // 1 day in seconds
        // }
    })

    const testimonials = await fetchApiData({
        url: '/testimonial/'
        // configObject: {
        //     next: { revalidate: 86400 }
        // }
    })

    const featuredCategories = await fetchApiData({
        url: '/feature-products/',
        defaultValue: [],
        configObject: {
            // cache: 'no-store' // // all other apis are being called too
            // next: { revalidate: 1 } // all other apis are being called too
            /* TODO: refresh this but call others once a day only */
            // next: { revalidate: 86400 }
        }
    })

    const features = await fetchApiData({
        url: '/features/',
        defaultValue: []
        // configObject: {
        //     next: { revalidate: 86400 }
        // }
    })

    const schemas = await fetchApiData({
        url: '/schema/',
        defaultValue: []
        // configObject: {
        //     next: { revalidate: 86400 }
        // }
    })

    const homeNews = await fetchApiData({
        url: '/news/?page_size=3',
        nestedPath: 'results',
        defaultValue: []
    })

    return (
        <>
            <ValidateGoogle />
            <h1 className='hidden'>Himalayan Tea</h1>
            <Banner banners={banners} />
            <Features features={features} />
            <Info />
            {/* just for initial/fast load for seo purpose, but using client , the currency related price is shown  */}
            <Products featuredCategories={featuredCategories} />
            <Scheme schemas={schemas} />
            {/* <Partners /> */}
            <Testimonials testimonials={testimonials} />
            <Blogs blogs={homeNews} />
        </>
    )
}
