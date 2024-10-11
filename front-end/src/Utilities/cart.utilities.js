import axios from "axios";
import { toast } from "react-toastify";

export const CART_BASE_URL = "http://127.0.0.1:3000/api/cart"

export const addToCart = (Prodcut) =>{

    return axios.post(CART_BASE_URL , Prodcut , {withCredentials :true})
    .then((res) => {
        toast.success("product added to cart")
    })
    .catch((err ) =>{
        toast.error(err.response.data.message)
        throw err
    })
}

export const getUserCart = () =>{
     return axios.get(CART_BASE_URL , {withCredentials :true})
    .then((res) => {
       return res.data.data.cart
    })
    .catch((error ) =>{
        toast.error(error.response.data.message)
        console.log(error)
    })

}
export const deleteProdcutFromCart = (index) =>{
    return axios.delete(`${CART_BASE_URL}/${index}` , {withCredentials :true})
   .then((res) => {
    toast.success("product deleted from cart")
    return res
     
   })
   .catch((error ) =>{
       toast.error(error.response.data.message)
       throw error
     
   })

}
export const updateItemQuantity = (index, newQuantity) =>{
    return axios.patch(`${CART_BASE_URL}/${index}`,{newQuantity} , {withCredentials :true})
   .then((res) => {
   
    return res
     
   })
   .catch((error ) =>{
       toast.error(error.response.data.message)
       console.log(error)
       throw error
      
   })

}


export const clearCart = () =>{
    
    axios.delete(CART_BASE_URL , {withCredentials :true})
    .then((res) => {
       
    })
    .catch((err ) =>{
        toast.error(err.response.data.messgae)
        
    })

}