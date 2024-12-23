'use client'
import {
    useGetSingleShippingAddressQuery,
    useStoreShippingaddressMutation,
    useUpdateGymattendanceMutation
} from '@/lib/features/api/shippingAddress/shippingAddressApi'
import handleServerError from '@/utils/handleServerError'
import notify from '@/utils/notify'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function AddressForm({
    setAddressFormOpen,
    addressFormOpen
}: {
    setAddressFormOpen: (el: any) => void
    addressFormOpen: { [key: string]: any }
}) {
    //rtk query for posting the address
    const [postShippingAddress] = useStoreShippingaddressMutation()

    const [updateShippingAddress] = useUpdateGymattendanceMutation()

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            residential: true,
            country_code: '',
            postal_code: '',
            state_or_province_code: '',
            city: ''
        }
    })

    //if user clicked edit now this form will become edit form
    // if (addressFormOpen.isEditing) {
    //fetch address data
    //rtk query for getting single address detail and show them

    const { data: shippingAddress, error: shippingErrorr } = useGetSingleShippingAddressQuery({
        id: addressFormOpen?.editId
    })

    console.log(shippingErrorr)
    // }
    useEffect(() => {
        if (shippingAddress) {
            reset(shippingAddress)
        }
    }, [shippingAddress])

    async function onSubmit(formData: object) {
        // e.preventDefault();

        if (addressFormOpen.isEditing) {
            try {
                await updateShippingAddress({
                    id: addressFormOpen.editId,
                    formData
                })
                notify('Address Updated')
                setAddressFormOpen(!addressFormOpen)
            } catch (err) {
                handleServerError(err)
            }
        } else {
            try {
                await postShippingAddress(formData)
                notify('Address Added')
                setAddressFormOpen(!addressFormOpen)
            } catch (err) {
                handleServerError(err)
            }
        }

        console.log('form clicked')
        console.log(formData)
    }
    return (
        <div className=' relative z-50'>
            <div
                onClick={() =>
                    setAddressFormOpen({
                        ...addressFormOpen,
                        open: false
                    })
                }
                className={`  ${addressFormOpen ? 'fixed inset-0 block bg-gray-600 bg-opacity-60 transition-opacity' : 'hidden cursor-pointer '}  cursor-pointer `}
            ></div>
            <div className=' fixed left-1/2 top-1/2 z-40 max-h-[90vh]  -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-md  bg-white p-4 drop-shadow-xl'>
                <div className=' flex justify-between pr-4'>
                    <p className='ml-4 text-xl font-semibold text-primary-dark-40'>Add New Delivery Address</p>
                    <span
                        onClick={() =>
                            setAddressFormOpen({
                                ...addressFormOpen,
                                open: false
                            })
                        }
                        className=' flex h-6  w-6 cursor-pointer items-center  justify-center  rounded-full  bg-slate-50 text-center font-bold'
                    >
                        X
                    </span>
                </div>
                <section>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='  grid w-[250px]  grid-cols-1 gap-4 p-4  md:w-[780px]  md:grid-cols-2 '
                    >
                        <div className='  flex flex-col'>
                            <label className=' text-sm  text-gray-400 ' htmlFor='country_code'>
                                Country Code
                            </label>
                            <select
                                className='form-control'
                                {...register('country_code', {
                                    required: '*country is required'
                                })}
                            >
                                <option value=''>Select</option>
                                <option value='np'>Nepal</option>
                                <option value='au'>Australia</option>
                                <option value='in'>India</option>
                                <option value='ch'>China</option>
                            </select>
                            {errors.country_code?.message && (
                                <small className=' text-red-500'>{`${errors?.country_code?.message}`}</small>
                            )}
                        </div>
                        <div className='  flex flex-col justify-start self-start'>
                            <label className=' text-sm  text-gray-400  ' htmlFor='postal_code'>
                                Postal Code
                            </label>
                            <input
                                {...register('postal_code', {
                                    required: '*Postal Code is required',
                                    minLength: 1,
                                    maxLength: 20
                                })}
                                className=' form-control'
                                name='postal_code'
                                // onChange={e => handleChange(e)}
                                type='text'
                                // value={editProfile?.fullname}
                            />
                            {errors.postal_code?.message && (
                                <small className=' text-red-500'>{`${errors?.postal_code?.message}`}</small>
                            )}
                        </div>
                        <div className='  flex flex-col'>
                            <label className='text-sm  text-gray-400  ' htmlFor='state_or_province_code'>
                                Province Code
                            </label>
                            <input
                                {...register('state_or_province_code', {
                                    required: '*Province/State Code is required',
                                    minLength: {
                                        value: 1,
                                        message: 'min 1 character'
                                    },
                                    maxLength: {
                                        value: 3,
                                        message: 'max 3 char'
                                    }
                                })}
                                className=' form-control'
                                // onChange={e => handleChange(e)}
                                type='text'
                                // value={editProfile?.fullname}
                            />
                            {errors.state_or_province_code?.message && (
                                <small className=' text-red-500'>{`${errors?.state_or_province_code.message}`}</small>
                            )}
                        </div>
                        <div className='  flex flex-col'>
                            <label className=' text-sm  text-gray-400  ' htmlFor='city'>
                                City
                            </label>
                            <input
                                {...register('city', {
                                    required: '*city name  is required',
                                    minLength: {
                                        value: 3,
                                        message: 'min 3 character'
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: 'max 100 char'
                                    }
                                })}
                                className=' form-control'
                                name='city'
                                // onChange={e => handleChange(e)}
                                type='text'
                                // value={editProfile?.fullname}
                            />
                            {errors?.city?.message && (
                                <small className=' text-red-500'>{`${errors?.city.message}`}</small>
                            )}
                        </div>
                        <div className=' flex   flex-col text-gray-400'>
                            <label className=' text-sm  ' htmlFor='residential'>
                                Residential
                            </label>
                            <span className=' relative  flex h-10 w-20  items-center  rounded-full bg-gray-300 '>
                                <input
                                    {...register('residential')}
                                    className=' peer  h-12  w-36  cursor-pointer p-1  opacity-0 outline-none'
                                    name='city'
                                    onChange={() => setValue('residential', !watch('residential'))}
                                    type='checkbox'
                                />
                                <span className=' absolute left-1 top-1 h-4/5 w-2/5 rounded-full bg-gray-600  transition-all duration-500  ease-in-out peer-checked:left-11 peer-checked:bg-primary-light-10'></span>
                            </span>

                            {errors.residential?.message && (
                                <small className=' text-red-500'>{errors?.residential.message}</small>
                            )}
                        </div>
                        <div>
                            <button type='submit' className='btn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default AddressForm
