'use client'
import { useForm } from 'react-hook-form'

import React, { useEffect } from 'react'

import { useUpdateFullnameMutation } from '@/lib/features/api/auth/userApi'
import notify from '@/utils/notify'
import handleServerError, { SetErrorFunction } from '@/utils/handleServerError'
import { IoMdInformationCircle } from 'react-icons/io'

export default function EditFullName({ userInfo }: { userInfo: User }) {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,

        formState: { errors }
    } = useForm()

    console.log(userInfo)

    useEffect(() => {
        if (userInfo) {
            reset(userInfo)
        }
    }, [userInfo])

    console.log(errors)

    const [updateFullname, { isLoading: updatingFullname }] = useUpdateFullnameMutation()

    async function onSubmit(data: any) {
        const formData = {
            first_name: data.first_name,
            last_name: data.last_name,
            contact: data.contact
        }
        try {
            await updateFullname(formData).unwrap()
            notify('Updated Successfully')
        } catch (err) {
            handleServerError(err, setError as SetErrorFunction)
        }
    }

    //this function is to disable other key press other than the phone number and backspace
    // function handleKeyPressForPhone(e: any) {
    //     const charCode = e.keyCode
    //     // if()

    //     //here 1's keyCode is 97 and 9's keycode is 105
    //     console.log(e.keyCode)
    //     if (!((charCode >= 96 && charCode <= 105) || charCode === 8)) {
    //         console.log('you entered a number')
    //         e.preventDefault()
    //     }
    // }

    return (
        <>
            <form
                // action='#'
                // className=' inli'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className=' mt-4 flex flex-col'>
                    <label className=' required-field required-field  text-sm ' htmlFor='firstname'>
                        First name
                    </label>
                    <input
                        {...register('first_name', {
                            required: '*first name is required'
                        })}
                        className=' form-control-simple'
                    />
                    {errors?.first_name?.message && (
                        <small className=' form-error'>{`${errors?.first_name.message}`}</small>
                    )}
                </div>
                <div className=' mt-4 flex flex-col'>
                    <label className=' required-field required-field text-sm ' htmlFor='last name'>
                        Last name
                    </label>
                    <input
                        {...register('last_name', {
                            required: '*last name is required'
                        })}
                        className=' form-control-simple'
                    />
                    {errors.last_name?.message && (
                        <small className=' form-error'>{`${errors?.last_name.message}`}</small>
                    )}
                </div>

                <div className='  mt-4 flex flex-col'>
                    <label className='  mb-1  flex items-center text-sm ' htmlFor='contact'>
                        Contact *
                        <span className='group relative  ml-2 inline-block cursor-pointer'>
                            <span className='  text-xl text-primary'>
                                <IoMdInformationCircle />
                            </span>
                            <div
                                className={`absolute -top-16 hidden  w-[250px] rounded-md bg-slate-800  p-2 text-start text-gray-200 group-hover:block`}
                            >
                                <ul>
                                    <li>For Nepal +97798XXXXXXXX</li>
                                    <li>For Australia +61XXXXXXXX</li>
                                </ul>
                            </div>
                        </span>
                    </label>
                    <input
                        {...register('contact', {
                            required: '*contact phone is required'
                        })}
                        className=' form-control-simple'
                        type='tel'
                        title='enter your phone number'
                    />
                    {errors.contact?.message && <small className=' form-error'>{`${errors?.contact.message}`}</small>}
                </div>
                <div>
                    <button type='submit' className=' mt-4 rounded-sm bg-primary-dark-10 px-8 py-2 text-xs text-white'>
                        SAVE CHANGES
                    </button>
                </div>
            </form>
        </>
    )
}
