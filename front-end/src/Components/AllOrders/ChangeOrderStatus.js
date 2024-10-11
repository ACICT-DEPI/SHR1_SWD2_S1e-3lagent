import React, { useState } from "react";
import { changeOrderStatus } from "../../Utilities/order.utilities";

import { getAllOrders } from "../../Utilities/order.utilities";

//icons
import { IoMdCloseCircle } from "react-icons/io";


const ChangeOrderStatus = (props) =>{

    const {order, updateShowOrderRole, updateAllOrders} = props
    const [newStatus ,setNewStatus] =useState("")

    
    //API Calls

 
   
    return(
        <div className="z-50 relative  flex flex-col gap-3 bg-slate-900  w-full md:w-[40%] text-white p-7 rounded-xl">
            <div className="absolute right-2 top-3 text-xl cursor-pointer">
              <IoMdCloseCircle onClick={() =>updateShowOrderRole()} />
            </div>
            <h2>User_Name : {order.ShippingInfo.Name}</h2> 
            <h2>User_Email: {order.ShippingInfo.Email}</h2> 
            <div className="flex flex-row gap-5 ">
                <label  id ="select-role-class">Choose Status</label>
                <select className="text-black focus:outline-none rounded-md pb-1 pl-1"
                 value={newStatus} onChange={(event) => setNewStatus(event.target.value)} id ="select-role-class" >
                <option value="" >Change Status</option>
                <option value="Pending" >Pending</option>
                <option value="Accepted" >Accepted</option>
                <option value="Completed" >Completed</option>
               
                  </select>
            </div>
            <button  className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            onClick={() =>{
                updateShowOrderRole()
                changeOrderStatus(order._id, newStatus)
                .then((res) => {
                
                    getAllOrders()
                   .then(res =>  updateAllOrders(res))
                   .catch((err) => console.log(err))
                })
                .catch((error) =>{
                  console.log(error)
                })
            }}>Update</button>
        </div>
        
    );

}

export default React.memo(ChangeOrderStatus)