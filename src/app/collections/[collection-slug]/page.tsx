import { redirect } from 'next/navigation'

export default function Page({ params }: { params: Params }) {
    redirect('/collections?category_slug=' + params['collection-slug'])
    return (
        <>
            <div className='border '>redirect to collections ?{JSON.stringify(params['collection-slug'])}</div>
        </>
    )
}

/* 
    collections
      -[id] 
        - [title]


    if i vist the page collecitons/1/black,
    i want the url to be same but the conents should be of colelctions/1

*/
