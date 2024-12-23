import Step from './Step'

export const orderStatuses = [
    { step: 'PENDING', description: 'order creation in process' }, // default
    { step: 'CONFIRM', description: 'user has confirmed order' }, // user has confirmed order
    { step: 'RECEIVED', description: 'seller has recieved the order' }, // seller has received the order
    { step: 'INDELIVERY', description: 'product has been handed over to logistics' }, // in delivery
    { step: 'COMPLETE', description: 'product delivered' }
]

export default function OrderStatusSteps({ orderStatus }: { orderStatus: string }) {
    return (
        <ol className='border-s] relative z-10 mb-12 mt-8 flex  justify-center border-primary text-gray-500  '>
            {orderStatuses.find(el => el.step == orderStatus) &&
                orderStatuses.map((el, index) => {
                    return (
                        <Step
                            currentStep={el}
                            key={index}
                            index={index}
                            receivedOrderStatus={orderStatus}
                            title={el.step}
                            description={el.description}
                        />
                    )
                })}
        </ol>
    )
}
