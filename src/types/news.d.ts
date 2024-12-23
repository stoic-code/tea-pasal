interface News {
    id: number
    slug: string
    title: string
    image: string
    author: string
    date: string
    short_description: string
    news_details: {
        id: number
        new_id: number
        body: string
    }[]
}
