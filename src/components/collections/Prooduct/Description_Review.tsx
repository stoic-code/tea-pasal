'use client'

import React, { useEffect } from 'react'

import { HoverRating } from '@/components/common/HoverRating'
import Rating from '@/components/common/Rating'
import useProtectedFunction from '@/hooks/useProtectedFunction'
import { useProductenquiryMutation } from '@/lib/features/api/produceEnquiry/produceEnquiryApi'
import {
    useDeleteProductReviewMutation,
    useDeleteProductReviewQuery,
    useGetProductReviewQuery,
    useProductDetailQuery,
    useProductreviewMutation
} from '@/lib/features/api/productReview/productReviewApi'
import handleServerError from '@/utils/handleServerError'
import notify from '@/utils/notify'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'

export const formatDate = (date_str: any) => {
    return date_str?.substring(0, 10)
}

export default function Description_Review({ product }: { product: Product }) {
    const [selectedTab, setselectedTab] = useState('DESCRIPTION')
    const [reviews, setReviews] = useState(product.reviews)
    const userDetail = useSelector((store: ReduxStore) => store.user.value)
    console.log(userDetail)

    console.log(product)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [showProductreview, setShowProductreview] = useState(false)
    const [selectedStarCount, setSelectedStarCount] = useState(0)

    console.log(selectedStarCount)
    const [postreview, { isSuccess, error, isLoading }] = useProductreviewMutation()
    const [postEnquiry, { isLoading: enquiryLoading }] = useProductenquiryMutation()
    const [deleteReview] = useDeleteProductReviewMutation()
    const { data: newReviews } = useGetProductReviewQuery({
        product_slug: product.slug
    })

    console.log(newReviews?.results)
    useEffect(() => {
        setReviews(newReviews?.results)
    }, [newReviews?.results])

    const [toggle, setToggle] = useState(true)

    const handleDeleteReview = (id: number) => {
        console.log(id)
        deleteReview({
            id,
            product_slug: product?.slug
        })
    }

    const handleEditReview = (id: number) => {
        console.log(id)
        console.log(newReviews)
        let toBeEditedReview = newReviews?.results.filter(review => review.id === id)
        console.log(toBeEditedReview)
        let formattedData = {
            ...toBeEditedReview[0],
            name: `${userDetail?.data?.first_name} ${userDetail?.data?.last_name}`,
            email: userDetail?.data?.email
        }
        setShowReviewForm(true)
        reset(toBeEditedReview[0])
        setSelectedStarCount(toBeEditedReview[0].rating_stars)
        console.log('toBeEditedReview')
    }
    const handleWriteReviewClick = () => {
        setShowReviewForm(!showReviewForm)
    }

    const handleCancelReviewClick = () => {
        setShowReviewForm(false)
    }
    const handleCloseForm = () => {
        setShowProductreview(false)
    }

    const handleShippingEstimatesClick = () => {
        setShowProductreview(true)
    }

    //authenticate function
    const authenticate = useProtectedFunction()

    const onSubmitproductenquiry = async (formData: object) => {
        try {
            authenticate(async () => {
                try {
                    console.log(formData)
                    const res = await postEnquiry(formData)
                    console.log(res)
                } catch (error) {
                    console.log(error)
                    handleServerError(error)
                }
            })

            //  await storeProductenquiry(formData).unwrap()
            //  reset()
            // notify()
        } catch (err) {
            console.log(err)
            // handleServerError(err, setError)
        }
    }

    //FORM SUBMISSION FUNC
    const onSubmit = async (formData: any) => {
        console.log(formData)
        authenticate(async () => {
            try {
                console.log(formData)
                console.log('hit')
                let review = {
                    product_id: product.id,
                    review_id: 0,
                    review_title: formData.review_title,
                    review_body: formData.review_body,
                    rating_stars: selectedStarCount
                }
                const res = await postreview({
                    product_slug: product.slug,
                    formdata: review
                }).unwrap()
                console.log(res)
                if (res) {
                    notify('Review Submitted')
                    console.log('Success')
                    setSelectedStarCount(0)
                    reset()
                }
            } catch (err) {
                console.log(err)
                handleServerError(err)
            }
        })
    }

    //REACT HOOK FORM
    // reveiw post
    const {
        register,
        handleSubmit,
        setValue,
        control,
        getValues,
        formState: { errors },
        reset,
        setError
    } = useForm()

    return (
        <div>
            <section className='container pt-[40px] '>
                <div className=''>
                    <button
                        className={`btn inline-block rounded-none p-3 ${selectedTab == 'DESCRIPTION' ? ' border-2 border-b-0 border-body' : ''}`}
                        onClick={() => {
                            setselectedTab('DESCRIPTION')
                        }}
                    >
                        Product Description
                    </button>
                    <button
                        className={`btn ml-1 inline-block rounded-none p-3  ${selectedTab == 'REVIEWS' ? 'border-2 border-b-0 border-body' : ''}`}
                        onClick={() => {
                            setselectedTab('REVIEWS')
                        }}
                    >
                        Reviews
                    </button>
                </div>
                <div className='h-full w-full border p-8'>
                    {selectedTab == 'DESCRIPTION' ? (
                        <>
                            {/* Product Description */}
                            <p className='short-description'>{product.description}</p>
                        </>
                    ) : (
                        <>
                            {/* Reviews */}

                            <>
                                <h2 className='header-lg mx-auto mb-4'>Customer Reviews</h2>
                                {/* ... existing reviews code ... */}
                                <div className='flex flex-col items-start justify-between  gap-4 md:flex-row md:items-center'>
                                    <p className=' flex flex-col items-start md:flex-row md:items-center md:gap-2'>
                                        <Rating rating={product?.avg_rating || 0} />
                                        <span className=' text-base font-semibold text-body'>
                                            {' '}
                                            Based on {product?.reviews.length} Reviews
                                        </span>
                                    </p>
                                    <button className='btn' onClick={() => handleWriteReviewClick()}>
                                        Write a Review
                                    </button>
                                </div>
                                <hr className='my-3 h-px border-0 bg-gray-200'></hr>
                                {showReviewForm && ( // Review Form
                                    <form onSubmit={handleSubmit(onSubmit)} className='mb-8 mt-10'>
                                        <div className=' grid grid-cols-1 gap-4'>
                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='review_title'
                                                    className='required-field block text-sm font-medium text-gray-700'
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type='text'
                                                    id='name'
                                                    className='mt-1 w-full rounded-md border p-2'
                                                    {...register('name', {
                                                        required: '*Please enter your name',
                                                        maxLength: {
                                                            value: 200,
                                                            message: '*maximum length is 200'
                                                        },
                                                        minLength: {
                                                            value: 3,
                                                            message: '*minimum length is 3'
                                                        }
                                                    })}
                                                />
                                                {errors?.name?.message && (
                                                    <small className=' text-red-500'>
                                                        {`
                                                            ${errors?.name?.message}
                                                            `}
                                                    </small>
                                                )}
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='product_id'
                                                    className=' required-field block text-sm font-medium text-gray-700'
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type='text'
                                                    id='email'
                                                    className='mt-1 w-full rounded-md border p-2'
                                                    {...register('email', {
                                                        required: {
                                                            message: '*Please enter your email',
                                                            value: true
                                                        }
                                                    })}
                                                />
                                                {errors?.email?.message && (
                                                    <small className=' text-red-500'>
                                                        {`${errors?.email?.message}`}
                                                    </small>
                                                )}
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='rating_stars'
                                                    className='required-field  block text-sm font-medium text-gray-700'
                                                >
                                                    Rating Stars
                                                </label>
                                                <Controller
                                                    name='rating_stars'
                                                    control={control}
                                                    defaultValue={null}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: '*Minimum rating is 1'
                                                        }
                                                    }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <>
                                                            <div className=' mt-2 flex items-center gap-2'>
                                                                <HoverRating
                                                                    onChange={onChange}
                                                                    selectedStarCount={selectedStarCount}
                                                                    setSelectedStarCount={setSelectedStarCount}
                                                                />
                                                                <span>({selectedStarCount})</span>
                                                            </div>
                                                        </>
                                                    )}
                                                />
                                                {/* <div className=' mt-2 flex items-center gap-2'>
                                                    <HoverRating
                                                        register={register}
                                                        selectedStarCount={
                                                            selectedStarCount
                                                        }
                                                        setSelectedStarCount={
                                                            setSelectedStarCount
                                                        }
                                                    />
                                                    <span>
                                                        ({selectedStarCount})
                                                    </span>
                                                </div> */}

                                                {errors?.rating_stars?.message && (
                                                    <small className=' text-red-500'>
                                                        {`
                                                          
                                                          ${errors?.rating_stars?.message}
                                                        `}
                                                    </small>
                                                )}
                                                {/* <input
                                                    type="text"
                                                    id="rating_stars"
                                                    name="rating_stars"
                                                    className="mt-1 w-full rounded-md border p-2"
                                                    {...register(
                                                        'rating_stars',
                                                        {
                                                            required: {
                                                                message:
                                                                    'required field',
                                                                value: true
                                                            }
                                                        }
                                                    )}
                                                /> */}
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='review_id'
                                                    className='required-field block  text-sm font-medium text-gray-700'
                                                >
                                                    Review Title
                                                </label>
                                                <input
                                                    type='text'
                                                    id='review_title'
                                                    className='mt-1 w-full rounded-md border p-2'
                                                    {...register('review_title', {
                                                        required: {
                                                            message: '*Please enter a review title',
                                                            value: true
                                                        },
                                                        minLength: {
                                                            value: 3,
                                                            message: '*minimum length is 3'
                                                        }
                                                    })}
                                                />
                                                {errors?.review_title?.message && (
                                                    <small className=' text-red-500'>
                                                        {`
                                                         ${errors?.review_title?.message}  
                                                            `}
                                                    </small>
                                                )}
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <label
                                                htmlFor='review_body'
                                                className='required-field block  text-sm font-medium text-gray-700'
                                            >
                                                Body of Review
                                            </label>
                                            <textarea
                                                id='review_body'
                                                className='mt-1 h-[200px] w-full rounded-md border p-2'
                                                {...register('review_body', {
                                                    required: {
                                                        message: '*Please enter a review_body',
                                                        value: true
                                                    },
                                                    minLength: {
                                                        value: 3,
                                                        message: '*minimum length is 3'
                                                    }
                                                })}
                                            />
                                            {errors?.review_body?.message && (
                                                <small className=' text-red-500'>
                                                    {`
                                                    
                                                    ${errors?.review_body?.message}
                                                    `}
                                                </small>
                                            )}
                                        </div>
                                        <div className='mt-4 flex justify-between'>
                                            <button
                                                onClick={handleCancelReviewClick}
                                                className='btn bg-red-600 font-bold hover:bg-red-500'
                                            >
                                                Cancel
                                            </button>
                                            <button type='submit' className='btn text-white'>
                                                Submit
                                            </button>
                                        </div>

                                        {/* <button onClick={handleReviewSubmit}>
                                            Submit Review
                                        </button> */}
                                        <hr className='border-1  mt-8 h-[2px]  bg-gray-200'></hr>
                                    </form>
                                )}
                                {/* {showReviewForm && (
                                    
                                )} */}

                                {reviews && reviews.length > 0 ? (
                                    reviews.map((review: Review) => (
                                        <div key={review.id} className='relative'>
                                            <span
                                                onClick={() => {
                                                    console.log('clicked')
                                                    handleDeleteReview(review?.id)
                                                }}
                                                className=' absolute right-4 top-2 cursor-pointer text-sm font-bold text-red-400'
                                            >
                                                DEL
                                            </span>
                                            <span
                                                onClick={() => {
                                                    console.log('clicked')
                                                    handleEditReview(review?.id)
                                                }}
                                                className=' absolute right-20 top-2 cursor-pointer text-sm font-bold text-green-400'
                                            >
                                                EDIT
                                            </span>
                                            <div className='inline-block scale-90'>
                                                <Rating rating={review.rating_stars} />
                                            </div>
                                            <div className=' flex items-end gap-2'>
                                                <h2 className='header-xs'>{review.review_title}</h2>
                                                <p className='flex items-center text-sm'>
                                                    on&nbsp;
                                                    <span className='text-xs italic'>
                                                        {formatDate(review.created_at)}
                                                    </span>
                                                </p>
                                            </div>
                                            <p className='mt-4 text-sm'>{review.review_body}</p>
                                            <p className=' hidden justify-end text-sm'>Report as inappropriate</p>
                                            <hr className='my-3 h-px border-0 bg-gray-200'></hr>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews available.</p>
                                )}

                                <hr className='my-3 h-px border-0 bg-gray-200'></hr>
                            </>
                            {/* )} */}
                        </>
                    )}
                </div>

                <div className='mt-[40px] flex hidden justify-center'>
                    <button className='btn' onClick={handleShippingEstimatesClick}>
                        Enquiry about product?
                    </button>
                </div>
                {/* enquiry Form */}
                {showProductreview && (
                    <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50'>
                        <div className='shipping-form rounded-md bg-white p-8 shadow-md'>
                            <div className='flex justify-end'>
                                <button
                                    onClick={handleCloseForm}
                                    className='cursor-pointer text-gray-600 hover:text-gray-800'
                                >
                                    <RxCross2 size='32' />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit(onSubmitproductenquiry)}>
                                <div className='mb-4'>
                                    <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                                        Title
                                    </label>
                                    <input
                                        type='text'
                                        id='title'
                                        className='mt-1 w-full rounded-md border p-2'
                                        {...register('title', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='body' className='block text-sm font-medium text-gray-700'>
                                        Description
                                    </label>
                                    <textarea
                                        id='body'
                                        className='mt-1 w-full rounded-md border p-2'
                                        {...register('body', {
                                            required: {
                                                message: 'required field',
                                                value: true
                                            }
                                        })}
                                    />
                                </div>
                                <div className='mt-4 flex justify-end'>
                                    <button type='submit' className='btn text-white'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}
