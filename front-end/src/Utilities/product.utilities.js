import { toast } from "react-toastify";
import axios from "axios";
const PRODUCT_BASE_URL = `${process.env.BASE_URL}/api/product`

export const getAllProducts = async (page , Search ,Category ,sort,limit) => {
    console.log(sort)
     
    let filterQuery = (Search?`&search=${Search}` :"")
    if(Category !="All Products"){
      filterQuery += (Category?`&Category=${Category}` :"")
    }
    try {
        const response = await  axios.get(`https://shopify-jade-six.vercel.app/api/product?page=${page}&limit=${limit}${filterQuery}&sort[${sort}]=-1`, { withCredentials: true })
        
          return response.data.data
     
      } catch (error) {
         
          toast.error(error.response.data.message)
          throw error
      }
  
  
    
     
  };



  export const deleteProduct = async (product_id) => {
    
    try {
        const response = await  axios.delete(`${PRODUCT_BASE_URL}/${product_id}`, { withCredentials: true })
        
          return response.data.data
     
      } catch (error) {
         
          toast.error(error.response.data.message)
          throw error
      }
  
  
    
     
  };
