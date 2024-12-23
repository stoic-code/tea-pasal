import { WEBSITE_URL } from '@/constants/domains'
import type { Metadata } from 'next'

const getMetaTags = ({
    meta_title,
    meta_keywords,
    meta_image,
    meta_description
}: {
    meta_title: string
    meta_keywords: string
    meta_image?: string
    meta_description: string
}): Metadata => {
    return {
        title: meta_title,
        description: meta_description,
        keywords: meta_keywords,
        metadataBase: new URL(`${WEBSITE_URL}`),
        openGraph: {
            type: 'website',
            title: meta_title,
            description: meta_description,
            images: meta_image
        },
        twitter: {
            card: 'summary',
            site: 'Mindrisers',
            creator: '@mindrisers',
            title: meta_title,
            description: meta_description,
            images: meta_image
        }
    }
}

export default getMetaTags
