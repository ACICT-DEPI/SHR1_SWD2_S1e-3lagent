import axios from "axios";
import { toast } from "react-toastify";

export const ORDER_BASE_URL = "https://shopify-iota-snowy.vercel.app/api/order"

 export const makeOrder = (Products, ShippingInfo) =>{
   
    return axios.post(ORDER_BASE_URL, {Products:Products,ShippingInfo:ShippingInfo} ,{withCredentials :true})
    .then((res) =>{
        toast.success("order is placed succesfully")
       
    })
    .catch((error) =>{
        toast.error(error.response.data.message)
        console.log(error)
    })
}

export const getAllOrders = () =>{
   
    return axios.get(ORDER_BASE_URL,{withCredentials :true})
    .then((res) =>{
       return res.data.data.orders;
       
    })
    .catch((error) =>{
        toast.error(error.response.data.message)
        console.log(error)
    })
}
export const changeOrderStatus = (Order_Id, selectedOption) =>{
   
    return axios.patch(`${ORDER_BASE_URL}/${Order_Id}`,{selectedOption},{withCredentials :true})
    .then((res) =>{
      return res
       
    })
    .catch((error) =>{
        toast.error(error.response.data.message)
        console.log(error)
    })
}
