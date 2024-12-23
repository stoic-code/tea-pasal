import NewsDetailSocials from '@/components/News/NewsDetailSocials'
import Breadcrumb from '@/components/common/Breadcrumb'
import { REVALIDATION_VALUE } from '@/constants/nextConfig'
import { fetchApiData } from '@/utils/fetchApiData'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = REVALIDATION_VALUE

export default async function Page({ params, searchParams }: { params: any; searchParams: SearchParams }) {
    const slug = params.slug

    const singleNews = await fetchApiData({
        url: `/news/${slug}/`,
        defaultValue: null
    })

    const url = '/news/'
    const news = await fetchApiData({ url })
    const latestNews = news?.results.filter((newsItem: any) => {
        return newsItem.slug !== slug
    })

    if (!singleNews) {
        notFound()
        return
    }
    const links = [
        {
            title: 'NEWS',
            link: '/news'
        },
        {
            title: `${singleNews.title}`,
            link: `/news/${singleNews.title}`
        }
    ]

    return (
        // HOME / NEWS / SINGLE-TILE

        <>
            <Breadcrumb links={links} />
            <div className='container my-[75px]'>
                <div className='flex flex-col items-center justify-center  '>
                    <img
                        alt={singleNews.title}
                        src={`${singleNews.image}`}
                        className='max-h-[240px] md:max-h-[288px] lg:max-h-[344px] xl:max-h-[416px] 2xl:max-h-[500px]'
                    />

                    {/* Description */}
                    <div className='max-[700px] float-none] pr-[60px]] mx-auto flex w-full flex-col gap-x-7 gap-y-2  pt-[30px] text-left md:gap-y-6  xl:grid xl:grid-cols-12  '>
                        {/*Grid Cols I: socials */}
                        <div className='  col-span-1 mt-1 '>
                            <NewsDetailSocials />
                        </div>
                        {/*Grid Cols II: Post Description */}
                        <div className=' col-span-8  px-[10px]'>
                            <div className=' mb-[-12px]] flex w-full cursor-pointer  flex-col items-center justify-between md:flex-row '>
                                <div>
                                    <span className=' '>{singleNews.author}</span>
                                    <span className=' font-semibold text-[#666]'>&nbsp;-&nbsp;Author</span>
                                </div>
                                <p className='text-[#666]'>{singleNews.date}</p>
                            </div>

                            <p
                                className='my-5 cursor-pointer text-center text-3xl
                        font-bold capitalize transition-all duration-500 hover:text-primary  md:text-left'
                            >
                                {singleNews.title}
                            </p>
                            {singleNews.news_details.map((el: any) => (
                                <div className='mt-5' key={el.id} dangerouslySetInnerHTML={{ __html: el.body }}></div>
                            ))}
                        </div>

                        {/* Grid Cols III: Recent posts */}
                        <div className=' col-span-3 mt-[40px] md:mt-0'>
                            <h1 className='mb-[8px] flex items-center  rounded pl-[6px] text-[23px] font-semibold '>
                                Recent
                            </h1>
                            {latestNews?.slice(0, 4).map((el: any, index: number) => (
                                <ul key={el.id}>
                                    <li className={`group py-[10px] pl-[7px] text-[20px]  `}>
                                        <span className='rounded bg-gray-100 p-[4px] font-bold group-hover:text-primary'>
                                            {'0'}
                                            {index + 1}
                                            {''}
                                        </span>
                                        <Link
                                            className=' font-medium text-[#555] hover:text-primary'
                                            href={`/news/${el.slug}`}
                                        >
                                            {'   '}
                                            {el.title}
                                        </Link>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <Link href={`/news`}>
                    <p className='underline'>Go Back</p>
                </Link> */}
            </div>
        </>
    )
}
