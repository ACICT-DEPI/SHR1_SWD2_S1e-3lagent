import React from "react";
import PasswordInput from "./passwordInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../../Utilities/user.utilities";


const ChangePassword = () =>{
 
 
    const [formInput, setFormInput] = useState({
            CurrentPassword:"",
            NewPassword:"",
            ConfigPassword:"",
      });
    
      const updateFormInput = (event) => {
        const { name, value } = event.target;
        setFormInput((old) => ({ ...old, [name]: value }));
      };
     

      //API 
      const handleChangePassword = (event) =>{
        event.preventDefault()
        changePasswordAPI(formInput)
        .then(()=>{
            setFormInput(
                {
                    CurrentPassword:"",
                    NewPassword:"",
                    ConfigPassword:"",
                }
            )
        })
       


      }
        
    return(
        <div className="flex flex-col justify-center mt-8 md:mt-36 gap-6 justify-self-center w-full md:w-1/3">
           <PasswordInput
                title="Current_Password"
                name="CurrentPassword"
                value={formInput.CurrentPassword}
                onChange={updateFormInput}
             />
            <PasswordInput
               title="New_Password"
                name="NewPassword"
                value={formInput.NewPassword}
                onChange={updateFormInput}
            />
            <PasswordInput
               title="New_Password_Config"
                name="ConfigPassword"
                value={formInput.ConfigPassword}
                onChange={updateFormInput}
            />
            <button className="bg-slate-800 w-1/3 text-white px-5 py-2 rounded-md hover:bg-slate-500"
            onClick={(event)=>handleChangePassword(event)}>Change</button>
          
        </div>
       
    );
}


export default React.memo(ChangePassword)