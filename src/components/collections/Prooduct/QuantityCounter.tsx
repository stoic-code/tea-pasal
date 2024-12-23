export default function QuantityCounter({
    quantity,
    increaseQuantity,
    decreaseQuantity,
    commonInfoLabelClass
}: {
    quantity: number
    increaseQuantity: () => void
    decreaseQuantity: () => void
    commonInfoLabelClass: string
}) {
    // select quatity selector

    //need a product here

    return (
        <div className=' flex items-center gap-3 font-sans'>
            <div>
                <h3 className={commonInfoLabelClass}>Quantity:</h3>
            </div>
            <div className='ml-5 flex items-center md:ml-8 '>
                <button className='rounded-l bg-primary px-4 py-2 text-white' onClick={() => decreaseQuantity()}>
                    -
                </button>
                <input
                    className='w-16 appearance-none border border-gray-300 py-2 text-center focus:border-blue-500 focus:outline-none'
                    type='number'
                    value={quantity}
                    min='1'
                    readOnly
                />
                <button className='rounded-r bg-primary px-4 py-2 text-white' onClick={() => increaseQuantity()}>
                    +
                </button>
            </div>
        </div>
    )
}
