import React, { useState } from "react";
import { useDispatch ,useSelector} from "react-redux"
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { NavLink  } from "react-router-dom";


const Sidebar = (props) => {
    const {sections} = props

    const [showSideBar, setShowSideBar] = useState(false);
   

    const user = useSelector((state) => state?.userReducer?.user??null)
 

   

    return (
        <div className="flex flex-row w-[10%] md:w-1/4 z-40">
            {/* Toggle Button for Small Screens */}
            <FaList
                className="block md:hidden text-3xl m-2"
                onClick={() => setShowSideBar(true)}
            />
            {/* Sidebar */}
            <aside
                className={`bg-slate-700 flex-col items-start pl-5 gap-8 pt-10 h-screen text-white ${
                    showSideBar ? "flex fixed top-0 w-[100%]" : "hidden"
                } md:flex md:w-[80%]`}
            >
                <IoClose
                    className="block fixed top-0 right-0 md:hidden text-3xl m-2"
                    onClick={() => setShowSideBar(false)}
                />

                <div className="flex flex-col justify-between items-center self-center gap-8">
                {
                   user?.image!="null"  ? <img src = {`http://localhost:3000/${user?.image??null}`} className="w[70px] h-[70px] rounded-full" />
                    :
                     <FaRegUserCircle className="text-amber-400 text-8xl" />
                }
                    {user ? (
                            <h3>{user?.Name}</h3>
                        ) : (
                            <h3>No user logged in</h3> 
                        )}
                </div>
                <div>
                    <ul className="flex flex-col justify-between items-start gap-4">
                        {sections.map((section, index) => (
                            <li onClick={() =>{
                                if(section.Text =="Log Out"){
                                    section.logout()
                                    
                                }
                                setShowSideBar(false)
                            }}
                                key={index}
                                className="w-50 p-3 rounded-md hover:bg-slate-500"
                            >
                                <NavLink  to={section.link} end  >
                                   
                                    <div className="flex flex-row items-start gap-3 md:items-center">
                                        {section.Icon}
                                        <h3>{section.Text}</h3>
                                    </div>
                                </NavLink >
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default React.memo(Sidebar);