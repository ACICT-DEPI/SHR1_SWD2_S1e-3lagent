import { Link } from "react-router-dom"
import { useState } from "react";
import { userAuthCalls } from "../../Utilities/user.utilities";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //form 

    const [formInput, setFromInput] = useState({
       
        Email: "",
        Password: "",
       
    });
    const updateFormInput = (event) => {
        const { name, value } = event.target;
        setFromInput((old) => {
            return { ...old, [name]: value }
        });
    };
   
    //handle api call to login

    const handleFormSubmit = (event) =>{
        event.preventDefault();

        dispatch(  userAuthCalls(formInput, "login", "logged in successfully") )
        .then(res =>{ 
            if(res.Role =="admin"){
                navigate("/admin")

            }
            else{
                navigate("/shop")
            }
            
          
        })
        .catch((err) =>{
            console.log(err)
        })
        

    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="">Don't have an account? <Link to = "/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
                    </div>
                </div>
                <form
                    onSubmit={(e) =>handleFormSubmit(e)}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name = "Email"
                            value={formInput.Email}
                            onChange={(event) => updateFormInput(event)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            name = "Password"
                            value={formInput.Password}
                            onChange={(event) => updateFormInput(event)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Login
                    </button>
                    <div className="text-center">
                        <a href="javascript:void(0)" className="hover:text-indigo-600">Forgot password?</a>
                    </div>
                </form>
            </div>
        </main>
    )
}