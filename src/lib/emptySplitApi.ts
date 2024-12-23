import { createApi } from '@reduxjs/toolkit/query/react'
import { rtkBaseQuery } from './rtkBaseQuery'

// debugger
// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
    baseQuery: rtkBaseQuery,
    endpoints: () => ({})
})

/* 

*/

export const RTK_TAGS = {
    ALL_LOGIN: 'allLogin',
    USER_INFO: 'userInfo',
    ALL_ORDERS: 'allOrders',
    SINGLE_ORDER: 'singleOrder',
    ALL_PRODUCT_ENQUIRY: 'allProductenquiry',
    ALL_PRODUCT_REVIEW: 'allProductreview',
    POST_PRODUCT_REVIEW: 'postProductReview',
    ALL_SHIPPING: 'allShipping',
    GET_ALL_PRODUCT: 'getAllProduct',
    GET_ALL_CATEGORY: 'getAllCategory',
    USER_SIGNUP: 'userSignup',
    GET_ALLCART: 'getAllCart',
    GET_ALL_FEATUREDPRODUCTS: 'getAllFeaturedProducts',
    All_WIHSLIST: 'allWishlist',
    ADD_TOWISHLIST: 'addToWishList',
    REMOVE_FROMWISHLIST: 'removeFromWishList',
    ALL_CART_ITEMS: 'allCartItems',
    GET_CARTITEMS: 'getCartItems',
    GET_USER_DETAIL: 'getUserDetail',
    UPDATE_FULLNAME: 'updateFullname',
    UPDATE_EMAIL: 'updateEmail',
    UPDATE_CONTACT: 'updateContact',
    GET_RESETTOKEN: 'passRestToken',
    FORGETPASSWORD: 'resetPassword',
    RESETEMAIL: 'resetEmail',
    GET_RELATED_PRODUCTS: 'getRelatedProducts',
    GET_SEARCH_PRODUCT: 'getSearchProduct',
    GET_SINGLE_PRODUCT: 'getSingleProduct',
    POST_CONTACT: 'postContact',
    ACTIVATE_USER: 'activateUser',
    REACTIVATE_USER: 'reActivateUser',
    PAYMENT_METHODS: 'paymentMethods'
}

/* TODO: make tags export dynamic. */

export const emptySplitApi = emptyApi.enhanceEndpoints({
    addTagTypes: Object.values(RTK_TAGS)
})
