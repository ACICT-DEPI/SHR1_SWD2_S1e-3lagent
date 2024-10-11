 import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";

import { Update_User_Stored, updateUserStored } from "../../Actions/user.Actions";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {userAuthCalls } from "../../Utilities/user.utilities";
import { getUser } from "../../Utilities/user.utilities";
import { Outlet } from "react-router-dom";

//icons
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

import Sidebar from "../../Components/Sidebar/Sidebar";

 const Profile = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

   useEffect(() =>{
    dispatch( getUser())
    .then((res) =>{
        console.log(res ,"res in profile")
        dispatch(updateUserStored(res))
   
    })
    .catch((err) => {

      if(err.response.data.err.statusCode ==401){
        navigate("/login")
      }

    }
   )

   },[])

    // const user = useSelector((state) => state?.userReducer?.user??null)
  

    const sections2 = [
        {
            Text: "Profile info",
            Icon: <FaUser />,
            link : "/profile"
        },
       
      
         
        {
            Text: "Orders",
            Icon: <IoCart />,
            link : "/profile/orders"
        },
        {
            Text: "wishList",
            Icon: <FaHeart/>,
            link : "/profile/wishList"
        },
        
        {
            Text: "Change Password",
            Icon: <FaUserEdit />,
            link : "/profile/changePassword"
        },
        {
            Text: "Back to shop",
            Icon: <IoMdArrowBack />,
            link : "/shop"
        },
        {
            Text: "Log Out",
            Icon: <CiLogout />,
            link : "/",
            logout: function(){
               
                dispatch( userAuthCalls(null, "logout", "logged out successfully") )
                    .then(res =>{
                        navigate("/")
                       dispatch( updateUserStored(
                       { 
                            Role:"user",
                            image:"null"
                        },

                       
                    ))
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
                  
               }
                
               
    
            }
        
    ];
    


    return(
        <div className="flex flex-row gap-3 w-full">
            {/* <Navbar /> */}
           
                <Sidebar sections = {sections2} />

           
            <div className=" w-[74%] self-start p-4"  >
                
             <Outlet  />
          </div>

        </div>
    );
 }

 export default React.memo(Profile)