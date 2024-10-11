import { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';
import { Update_User_Stored, updateUserStored } from "../../Actions/user.Actions";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {userAuthCalls } from "../../Utilities/user.utilities";
import { getUser } from '../../Utilities/user.utilities';

//icons
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";


export default (props) => {

    const [state, setState] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
   


    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
        dispatch( getUser())
        .then((res) => dispatch(updateUserStored(res)))
        .catch((err) =>{
            console.log(err)
        })
       
    }, [])

    // 
      const user = useSelector((state) => state?.userReducer?.user??null)


    //API Calls
    function logoutCall(){
               
        dispatch( userAuthCalls(null, "logout", "logged out successfully") )
            .then(res =>{
                navigate("/")
                dispatch( updateUserStored(
                    { 
                         Role:"user",
                         image:"null"
                     },

                    
                 ))
            console.log("user from navbar" , user)
            })
            .catch((err) =>{
                console.log(err)
            })
          
       }


       
   
  

    return (
        <nav className={ `w-full md:shadow-md  bg-white pb-5 p-3 md:fixed left-0 top-0 z-50 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                   
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
               
                <div className={`flex flex-col gap-5   justify-between w-full items-center g mt-8 md:mt-0 md:flex md:flex-row ${state ? 'block' : 'hidden'} `}>
                    <h1 className='text-3xl' >Shopify</h1>

                    <div className='flex flex-col justify-center items-center gap-6 md:flex-row'>
                       <Link to ="/" className=' py-1 px-3 rounded-md hover:bg-slate-600 hover:text-white'> <h4>Home</h4></Link>
                       <Link to ="/shop" className=' py-1 px-3 rounded-md hover:bg-slate-600 hover:text-white'> <h4>Shop</h4></Link>
                       <Link to ="/" className=' py-1 px-3 rounded-md hover:bg-slate-600 hover:text-white'> <h4>Contact Us</h4></Link>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-8 md:flex-row text-2xl'>
                       <Link to="/profile"> 
                       {
                        user?.image??null? <img src = {`http://localhost:3000/${user?.image??null}`} className="w[30px] h-[30px] rounded-full" />
                        :  <FaRegUserCircle />
                       }
                      
                       </Link>
                      <div className='relative'>
                        <h3 className='absolute bottom-4 left-5'>{props.itemsNum}</h3>
                        <Link to="/cart"> <FaCartShopping /></Link>
                      </div>
                      
                      
                       

                    </div>
                    <div className='flex flex-col justify-center items-center gap-6 md:flex-row' >
                        {
                            user?.Name??null ?   (  <Link to="/" onClick={() =>logoutCall()}
                            className='bg-slate-700 rounded-md px-4 py-1 text-white hover:bg-slate-500 '>Log Out</Link>):
                             ( <>
                                 <Link to="/login" className='bg-slate-700 rounded-md px-4 py-1 text-white hover:bg-slate-500 '>Login</Link>
                            <Link to="/signup" className='bg-slate-700 rounded-md px-4 py-1 text-white hover:bg-slate-500 '>Sign UP</Link>
                            </>)
                        }
                       
                    </div>
                  
                 

                </div>
            </div>
        </nav>
    )
}