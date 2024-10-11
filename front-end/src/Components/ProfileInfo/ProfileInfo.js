 import React, {useEffect, useState} from "react";
 import { useDispatch ,useSelector} from "react-redux";
 import { FaRegUserCircle } from "react-icons/fa";
import { updateUserData } from "../../Utilities/user.utilities";
import { updateUserStored } from "../../Actions/user.Actions";
import { getUser } from "../../Utilities/user.utilities";
import { useNavigate } from "react-router-dom";
 const ProfileInfo = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
   
    useEffect(() =>{
        dispatch( getUser())
        .then((res) =>{
           
            dispatch(updateUserStored(res))
     
    
        })
        .catch((err) => {
         
          if(err.response.data.err.statusCode){
            navigate("/login")
          }
    
        })
        
      
    },[])
    const user = useSelector((state) => state?.userReducer?.user??null)
    // handel form process
    const [formInput, setFromInput] = useState({
        Name:user?.Name,
        Email: user?.Email,
        Phone: user?.Phone,
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

  


//API Calls
  const handleFormSubmit = (event) =>{
    event.preventDefault();

    const formData = new FormData();
    formData.append('Name', formInput.Name);
    formData.append('Email', formInput.Email);
    formData.append('Phone', formInput.Phone);
    formData.append('image', image);

    updateUserData(formData)
    .then((res ) =>{
        dispatch(updateUserStored(res.user))
    })
    .catch((err) => {
        console.log(err)
    })
  }


    return(
        <div>
            <form onSubmit={(event) => handleFormSubmit(event)} 
            className="flex flex-col gap-9 w-full md:w-1/2">
                <div className=" w-[15%] self-center flex justify-center items-center">
                            <label id="input-picture" >
                                <input type="file"  accept="image/*" className="hidden" 
                                id="input-picture"
                                onChange={(e) => handleFileChange(e)}/>
                            
                            {(imagePreview&& <img src={imagePreview} alt="Preview 2" className="w-[70px] h-[70px] rounded-full" />) 
                             || user?.image!="null" && <img src = {`http://localhost:3000/${user?.image??null}`} className="w[70px] h-[70px] rounded-full" /> 
                             || <FaRegUserCircle size={70} className="text-black self-center" />} 
                            
                                
                            </label>
                    </div>
                   <div className="flex flex-row gap-5 items-center ">
                    <label id ="email-id">Email:</label>
                        <input
                            type="text"
                            value={formInput.Email || user?.Email }
                            placeholder="Enter your Email"
                            id ="email-id"
                            onChange={(event) => updateFormInput(event)}
                            name= "Email"
                            className="w-[90%] md:w-[80%] pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                   </div>
                   <div className="flex flex-row gap-5 items-center ">
                    <label id ="email-id">Name:</label>
                        <input
                            type="text"
                            value={formInput.Name|| user?.Name  }
                            placeholder="Enter your Name"
                            id ="email-id"
                            onChange={(event) => updateFormInput(event)}
                            name= "Name"
                            className="w-[90%] md:w-[80%] pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                   </div>
                   <div className="flex flex-row gap-5 items-center ">
                    <label id ="email-id">Phone:</label>
                        <input
                            type="text"
                            value={formInput.Phone || user?.Phone }
                            placeholder="Enter your Phone"
                            id ="email-id"
                            onChange={(event) => updateFormInput(event)}
                            name= "Phone"
                            className="w-[90%] md:w-[80%] pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                   </div>

                <button className=" bg-slate-700 text-white px-4 py-2 rounded-md w-[100%] md:w-[30%]">Update</button>




            </form>
        </div>
    );
 }

 export default React.memo(ProfileInfo)