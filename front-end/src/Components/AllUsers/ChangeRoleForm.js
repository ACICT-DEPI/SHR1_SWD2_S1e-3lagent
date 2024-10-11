import React, { useState } from "react";
import { getAllUsers, updateUserRole } from "../../Utilities/user.utilities";

//icons
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";

const ChangeRoleCard = (props) =>{

    const {user, updateShowUserRole, updateAllUsers} = props
    const [newRole ,setNewRole] =useState("")

   
    return(
        <div className="z-50 relative  flex flex-col gap-3 bg-slate-900  w-full md:w-[40%] text-white p-7 rounded-xl">
            <div className="absolute right-2 top-3 text-xl cursor-pointer">
              <IoMdCloseCircle onClick={() =>updateShowUserRole()} />
            </div>
            <h2>Email : {user.Email}</h2> 
            <h2>Role : {user.Role}</h2>
            <div className="flex flex-row gap-5 ">
                <label  id ="select-role-class">Choose Role</label>
                <select className="text-black focus:outline-none rounded-md pb-1 pl-1"
                 value={newRole} onChange={(event) => setNewRole(event.target.value)} id ="select-role-class" >
                <option value="" >Change Role</option>
                <option value="admin" >admin</option>
                <option value="user" >user</option>
                  </select>
            </div>
            <button  className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            onClick={() =>{
                updateShowUserRole()
                updateUserRole({id:user._id, Role :newRole})
                .then((res) => {
                    toast("user role has been updated")
                   getAllUsers()
                   .then(res =>  updateAllUsers(res))
                   .catch((err) => console.log(err))
                })
                .catch((error) =>{
                  console.log(error)
                })
            }}>Update</button>
        </div>
        
    );

}

export default React.memo(ChangeRoleCard)