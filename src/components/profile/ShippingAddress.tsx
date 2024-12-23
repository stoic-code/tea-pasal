'use client'
import {
    useRemoveGymattendanceMutation,
    useShippingaddressQuery
} from '@/lib/features/api/shippingAddress/shippingAddressApi'
import Link from 'next/link'
import withProtectedRoute from '../withProtectedRoute'
import { useEffect, useState } from 'react'
import AddressForm from './AddressForm'
import { GrFormEdit } from 'react-icons/gr'
import { MdDelete } from 'react-icons/md'
import notify from '@/utils/notify'
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import handleServerError from '@/utils/handleServerError'
function ShippingAddress() {
    const { data: shippingAddresses, isLoading } = useShippingaddressQuery()
    const [deleteAddress, { error: deleteAddressError }] = useRemoveGymattendanceMutation()
    const [addressFormOpen, setAddressFormOpen] = useState({
        open: false,
        isEditing: false,
        editId: ''
    })
    console.log(shippingAddresses)

    async function handleDeleteAddress(id: number) {
        console.log(id)

        try {
            await deleteAddress(id).unwrap()
            notify('Deleted successfully')
        } catch (err) {
            handleServerError(err)
        }
    }

    useEffect(() => {
        let body = document.getElementById('body')
        if (addressFormOpen.open) {
            if (body) {
                body.style.overflow = 'hidden'
            }
        } else {
            if (body) {
                body.style.overflow = 'auto'
            }
        }

        return () => {
            if (body) {
                body.style.overflow = 'auto'
            }
        }
    }, [addressFormOpen.open])

    return (
        <div>
            <div className=' flex items-center justify-start gap-4'>
                <p className=' text-xl  font-bold'>Address Book</p>
                <p
                    onClick={() =>
                        setAddressFormOpen({
                            ...addressFormOpen,
                            open: !addressFormOpen.open,
                            isEditing: false,
                            editId: ''
                        })
                    }
                    className=' cursor-pointer text-sm  font-semibold text-primary-light-10  hover:text-primary'
                >
                    {' '}
                    <span>+</span> Add New Address
                </p>
            </div>

            {addressFormOpen.open && (
                <AddressForm setAddressFormOpen={setAddressFormOpen} addressFormOpen={addressFormOpen} />
            )}

            <div className='mt-4 box-border grid grid-cols-1 gap-4 md:grid-cols-2   lg:grid-cols-3 xl:grid-cols-4'>
                {(shippingAddresses as [])?.map((address: any) => (
                    <div
                        key={address.id}
                        className={` relative box-border   w-full cursor-pointer rounded-md border border-gray-300  bg-gray-100 p-6 transition-all hover:bg-gray-200 hover:shadow-md`}
                    >
                        <div className=' mt-3 flex items-center justify-start gap-1'>
                            <p className=' font-thin'>City :</p>
                            <p className='text-lg font-semibold'>{address.city}</p>
                        </div>
                        <div className=' flex items-center justify-start gap-1 text-xs '>
                            <p>State/Province Code :</p>
                            <p className=' font-semibold'>{address.state_or_province_code}</p>
                        </div>
                        <div className=' flex items-center justify-start gap-1 text-xs '>
                            <p>Country Code :</p>
                            <p className='text-xs font-semibold'>{address.country_code}</p>
                        </div>
                        <div className=' flex items-center justify-start gap-1 text-xs '>
                            <p>Postal Code :</p>
                            <p className='text-xs font-semibold'>{address.postal_code}</p>
                        </div>
                        <div className=' flex items-center justify-start gap-1 text-xs '>
                            <p>Residential :</p>
                            <p className='text-xs font-semibold'>{address.residential ? <FaCheck /> : <ImCross />}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteAddress(address?.id)}
                            className='absolute right-14 top-2 flex items-center text-xs font-bold '
                        >
                            <span className=' text-lg text-red-500'>
                                <MdDelete />
                            </span>
                            Delete
                        </button>
                        <button
                            onClick={() =>
                                setAddressFormOpen({
                                    ...addressFormOpen,
                                    open: true,
                                    isEditing: true,
                                    editId: address.id
                                })
                            }
                            className='absolute right-2 top-2 flex items-center text-xs font-bold text-primary'
                        >
                            <span className=' text-lg text-primary-dark-20'>
                                <GrFormEdit />
                            </span>
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withProtectedRoute(ShippingAddress)
