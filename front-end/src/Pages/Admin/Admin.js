import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser, userAuthCalls } from "../../Utilities/user.utilities";


import { Update_User_Stored, updateUserStored } from "../../Actions/user.Actions";
//icons
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

import { AiFillProduct } from "react-icons/ai";


const Admin = () =>{
  const sections = [
    {
        Text: "All Users",
        Icon: <FaUser />,
        link : "/admin"
    },
   
    {
        Text: "All Prodcuts",
        Icon: <AiFillProduct />,
        link : "/admin/all-products"
    },
     
    {
        Text: "Orders",
        Icon: <IoCart />,
        link : "/admin/orders"
    },
    
    {
        Text: "Change Password",
        Icon: <FaUserEdit />,
        link : "/admin/changePassword"
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

  
    
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() =>{
    dispatch( getUser()).catch((err) => {
     
      if(err.response.data.err.statusCode){
        navigate("/login")
      }

    }
   )
   
      setInterval( function(){
        dispatch(  userAuthCalls(null, "logout", "logged out") )
        navigate("/home")
      }
,  2*60*60*1000);
   


  },[])

    return(
        <div className=" flex flex-row w-full  gap-2">
        <Sidebar  sections = {sections}/>
        <div className=" w-[74%] self-start p-4"  >
            <Outlet  />
        </div>
    </div>
    );
}


export default React.memo(Admin)