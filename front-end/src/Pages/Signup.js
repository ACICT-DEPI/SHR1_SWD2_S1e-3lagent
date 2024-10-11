import React from "react";
import { useState } from "react";

//icons
import { FaRegUserCircle } from "react-icons/fa";
//components
import PasswordInput from "../Components/PasswordInput";
import { userAuthCalls } from "../Utilities/user.utilities";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // handel form process
    const [formInput, setFromInput] = useState({
        Name: "",
        Email: "",
        Password: "",
        ConfigPassword: "",
        Phone: "",
    });

    const updateFormInput = (event) => {
        const { name, value } = event.target;
        setFromInput((old) => {
            return { ...old, [name]: value }
        });
    };

    //handle Image

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    //
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    //handle api call
    const handleFormSubmit = (event) =>{
        event.preventDefault()
        const formData = new FormData();
        formData.append('Name', formInput.Name);
        formData.append('Email', formInput.Email);
        formData.append('Phone', formInput.Phone);
        formData.append('Password', formInput.Password);
        formData.append('ConfigPassword', formInput.ConfigPassword);
        formData.append('image', image);
        dispatch(  userAuthCalls(formData, "signup", "sign up successfully") )
        .then(res =>{
            navigate("/login");
        })
    }
    return (
        <form onSubmit={(event) => handleFormSubmit(event)}
        className="flex flex-row items-center justify-center w-full h-full gap-3  mt-6 md:mt-3 p-4">
            

            
            <div className="flex flex-col justify-center items-start gap-10 w-[95%] md:w-[40%]  h-full  shadow-lg p-3">
                <div className=" w-[15%] self-center flex justify-center items-center">
                        <label id="input-picture" >
                            <input type="file"  accept="image/*" className="hidden" 
                            id="input-picture"
                            onChange={(e) => handleFileChange(e)}/>
                        
                        {imagePreview&& <img src={imagePreview} alt="Preview 2" className="w-[70px] h-[70px] rounded-full" />  || <FaRegUserCircle size={70} className="text-black self-center" />}
                        
                            
                        </label>
                </div>
               

                {/* Name */}
                <div className="w-full">
                    
                        <input
                            type="text"
                            placeholder="Name"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none  rounded-md"
                            name="Name"
                            value={formInput.Name}
                            onChange={updateFormInput}
                        />
                    
                </div>

                {/* Email */}
                <div className="w-full  relative">
                   
                <input
                            type="email"
                            placeholder="Email"
                            id="username"
                            className="w-full p-2.5 ml-2 bg-transparent outline-none  rounded-md"
                            name="Email"
                            value={formInput.Email}
                            onChange={updateFormInput}
                        />
                </div>

                {/* Phone Number */}
                <div className="w-full rounded-md">
                   
                        <input
                            type="text"
                            placeholder="Phone Number"
                            id="Phone"
                            name="Phone"
                            value={formInput.Phone}
                            onChange={updateFormInput}
                            className="w-full p-2.5 ml-2 bg-transparent outline-none  rounded-md"
                        />
                   
                </div>

                {/* Password */}
                <div className="w-full ">
                    <PasswordInput
                        placeholder="Enter your password"
                        name="Password"
                        value={formInput.Password}
                        update={updateFormInput}
                        className="w-full"
                    />
                </div>
                
                {/* Confirm Password */}
                <div className="w-full">
                    <PasswordInput
                        placeholder="Confirm password"
                        name="ConfigPassword"
                        value={formInput.ConfigPassword}
                        update={updateFormInput}
                        className="w-full"
                    />
                </div>
                <button type="submit" className="py-2 px-8 bg-slate-950 text-white rounded-lg self-end hover:bg-slate-800" >Sign Up</button>
            </div>
        </form>
    );
};

export default React.memo(Signup);
