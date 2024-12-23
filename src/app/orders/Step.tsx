import classNames from 'classnames'
import { orderStatuses } from './OrderStatusSteps'

export default function Step({
    index,
    title,
    description,
    receivedOrderStatus,
    currentStep
}: {
    index: number
    title?: string
    description?: string
    receivedOrderStatus: string
    currentStep: { step: string; description: string }
}) {
    /* currentstep before receivedOrderStatus */

    let currentStepMatched = currentStep.step == receivedOrderStatus

    let showCompletedStatus =
        currentStepMatched ||
        orderStatuses.findIndex(el => el.step == currentStep.step) <
            orderStatuses.findIndex(el => el.step == receivedOrderStatus)

    const PendingIcon = () => {
        return (
            // <span className=' flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white '>
            <span className='absolute] ring-4] ring-white] -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 '>
                <svg
                    className='h-3.5 w-3.5 text-gray-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 16'
                >
                    <path d='M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z' />
                </svg>
            </span>
        )
    }

    const CompletedIcon = () => {
        return (
            <>
                <span className='relative inline-block'>
                    <span className='ring-4] ring-white] -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary '>
                        <svg
                            className='h-3.5 w-3.5 text-white'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 16 12'
                        >
                            <path
                                stroke='currentColor'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M1 5.917 5.724 10.5 15 1.5'
                            />
                        </svg>
                    </span>
                </span>
            </>
        )
    }

    return (
        <li
            className={classNames(
                ` mb-10] ms-6]  relative  flex flex-col items-center  gap-4  px-3 `,
                {
                    ' before:absolute before:left-0 before:top-4 before:z-[-1] before:block before:h-[5px] before:w-[50%] before:-translate-y-1/2 before:bg-primary after:content-["_"] ':
                        index != 0
                },
                {
                    ' after:absolute after:right-0 after:top-4 after:z-[-1] after:block after:h-[5px] after:w-[50%] after:-translate-y-1/2 after:bg-primary after:content-["_"] ':
                        index != orderStatuses.length - 1
                },
                {
                    '  apply-custom before:!bg-gray-500 after:!bg-gray-500 ': !showCompletedStatus
                },
                {
                    '   after:!bg-gray-500 ': currentStepMatched
                }
            )}
        >
            {showCompletedStatus ? <CompletedIcon /> : <PendingIcon />}

            <div className='text-center'>
                <h3 className='font-medium capitalize leading-tight'>{title?.toLowerCase()}</h3>
                <p className='max-w-[150px] text-sm'>{description}</p>
            </div>
        </li>
    )
}
