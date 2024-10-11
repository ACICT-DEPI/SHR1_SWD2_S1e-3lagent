import { requestActions ,successAction,failureAction} from "../Actions/user.Actions";
import axios from "axios";
import { toast } from "react-toastify";

export const USER_BASE_URL = "https://shopify-iota-snowy.vercel.app/api/user"

export const userAuthCalls = (requiredData, route ,toastString) => async (dispatch) => {
    dispatch(requestActions())
   
    try {
      const response = await axios.post(`${USER_BASE_URL}/${route}`,requiredData , {withCredentials:true});
        dispatch(successAction(response.data.data.currentUser));
        toast.success(toastString)
       
        return response.data.data.currentUser
   
    } catch (error) {
        dispatch(failureAction(error.response.data.message));
        toast.error(error.response.data.message)
        throw error
    }
  };



  
  export const getUser = () => async (dispatch) => {
    dispatch(requestActions())
   
    try {
      const response = await axios.get(`${USER_BASE_URL}` , {withCredentials:true});
     
        dispatch(successAction(response.data.data.currentUser));
       
        return response.data.data.currentUser
   
    } catch (error) {
        dispatch(failureAction(error.response.data.message));
        // toast.error(error.response.data.message)
       
        throw error
    }
  };


  export const changePasswordAPI = async(requiredData ) =>{
   return axios.patch(`${USER_BASE_URL}/change-password` ,requiredData , {withCredentials:true})
   .then(res =>{
    toast.success("password has been changes successfully")
       

   })
   .catch((error) => {
    toast.error(error.response.data.message)

   })

  }


  
  export const getAllUsers = () =>{

    return axios.get(`${USER_BASE_URL}/all`,{withCredentials : true})
    .then((res) => {
      return res.data.data.allUsers
    })
    .catch((error) => {
      toast.error(error.response.data.message)

      throw error
    })
  }
  export const updateUserRole = (requiredData) =>{

    return axios.patch(`${USER_BASE_URL}/changeRole`,requiredData,{withCredentials : true})
    .then((res) => {
      return res
    })
    .catch((error) => {
      toast.error(error.response.data.message)

      throw error
    })
  }

  export const updateUserData = (requiredData) =>{

    return axios.patch(`${USER_BASE_URL}`,requiredData,{withCredentials : true})
    .then((res) => {
      toast.success("Your profile data has been updated")
      return res.data.data
    })
    .catch((error) => {
      toast.error(error.response.data.message)

      throw error
    })
  }