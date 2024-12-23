import SingleProduct from './SingleProduct'

export default function Products({ products }: { products: Product[] }) {
    return (
        <>
            <h2 className='hidden'>Products List</h2>
            <div className='my-[40px] mt-10 grid gap-4 gap-y-10 md:grid-cols-2 md:gap-y-8 xl:grid-cols-3 '>
                {products.map((product: Product) => (
                    <SingleProduct key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
