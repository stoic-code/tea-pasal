import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Params }) {
    redirect(`/collections/all/products/${params['product-slug']}/`)
    return
}
