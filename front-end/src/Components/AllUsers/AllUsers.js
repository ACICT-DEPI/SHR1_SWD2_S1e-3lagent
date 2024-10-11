 import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../Utilities/user.utilities";

//icons
import { FaRegUserCircle } from "react-icons/fa";
import { FaSquarePen } from "react-icons/fa6";
import ChangeRoleForm from "./ChangeRoleForm";

 const AllUsers = () =>{

    const [allUsers, setAllUsers] = useState([])

    //update alluser
    const updateAllUsers = (users) =>{
        setAllUsers(users)

    }
     const [showUserRole, setShowUserRole] = useState(false)

    const [selectedUser, setSelectedUser] = useState({})

    //API Call
    useEffect(() =>{
        getAllUsers()
        .then(res =>{
            setAllUsers(res)

        })
        .catch((error) =>{
            console.log(error)
        })

    },[])
    console.log(allUsers)



    return(
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                   All Users
                </h3>
               
            </div>
       
            <div className={`mt-12 shadow-sm border rounded-lg overflow-x-auto ${showUserRole ? "opacity-50":"opacity-100"}`}>
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                           
                            <th className="py-3 px-6">Phone number</th>
                            <th className="py-3 px-6">Role</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                           
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            allUsers.map((user, idx) => (
                                <tr key={idx}>
                                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                      {
                                        (user?.image &&  <img src = {`http://localhost:3000/${user?.image??null}`} className="w-10 h-10 rounded-full" />) ||
                                        <FaRegUserCircle className="text-amber-400 text-4xl" />
                                      }
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{user.Name}</span>
                                            <span className="block text-gray-700 text-xs">{user.Email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.Phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.Role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap "><FaSquarePen className="text-3xl m-auto"
                                    onClick={() =>{
                                    setSelectedUser(user)
                                    setShowUserRole(true)

                                    }} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="fixed  top-28 left-[10%]w-[100%] md:top-28 md:left-[46%] md:w-[60%]">
            { showUserRole &&  <ChangeRoleForm 
             user = {selectedUser}
             updateShowUserRole = {() =>setShowUserRole(false)}
             updateAllUsers = {updateAllUsers}/>}

            </div>
        </div>
    );
 }


 export default React.memo(AllUsers)
