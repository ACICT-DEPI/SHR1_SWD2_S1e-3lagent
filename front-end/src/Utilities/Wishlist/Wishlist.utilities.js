import axios from "axios";
import { toast } from "react-toastify";

export const WISHLIST_BASE_URL = "https://shopify-iota-snowy.vercel.app/api/wishList"

export const addToWishList = (product ) =>{
    console.log(product)

   return  axios.post(WISHLIST_BASE_URL , {...product}, {withCredentials :true })
    .then((res) =>
    toast.success("product has been added to wishlist")
    )
    .catch((err) =>{
        toast.error(err.response.data.message)
        throw err
       
    })
}

export const deleteFromWishList = (productId ) =>{

    return  axios.delete(`${WISHLIST_BASE_URL}/${productId}` , {withCredentials :true })
     .then((res) =>
     toast.success("product has been deleted from wishlist")
     )
     .catch((err) =>{
         toast.error(err.response.data.message)
         throw err
     })
 }
 
 
 export const checkIfItemIsWished = (productId ) =>{

    return  axios.post(`${WISHLIST_BASE_URL}/isWished`, {productId}, {withCredentials :true })
     .then((res) =>
     {
        return res.data.data
     } )
     .catch((err) =>{
        //  toast.error(err.response.data.message)
        //  throw err
     })
 }

 export const getWishList = ( ) =>{

    return  axios.get(`${WISHLIST_BASE_URL}`, {withCredentials :true })
     .then((res) =>
     {
        return res.data.data
     } )
     .catch((err) =>{
         toast.error(err.response.data.message)
         throw err
     })
 }