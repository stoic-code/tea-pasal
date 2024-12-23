import { redirect } from 'next/navigation'

export default function page() {
    redirect('/collections')
    return (
        <div>
            <p>/collections/slug/products</p>
            <p> redicrec to colletions ?</p>
        </div>
    )
}
