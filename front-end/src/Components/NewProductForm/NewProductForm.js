import React, { useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "../../Utilities/product.utilities";
const NewProductForm = (props) => {
 

  const{ updateAllProducts, toggleShowAddForm, selectedProduct , setSelectedProduct} = props
  const Categories = ["All Products", "Tablet","Laptop","PC","Headban","Earbud"];

  const [formInput, setFormInput] = useState({
    Name: "",
    Description: "",
    Price: "",
    Discount: "",
    Category: "",
  });

  const updateFormInput = (event) => {
    const { name, value } = event.target;
    setFormInput((old) => ({ ...old, [name]: value }));
  };
console.log(formInput)
  const [Image, setImage] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  console.log(Image)

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
//update 

useEffect(() => {
    if (selectedProduct) {
        setFormInput({
            Name: selectedProduct.Name,
            Description: selectedProduct.Description,
            Price: selectedProduct.Price,
            Discount: selectedProduct.Discount,
            Category: selectedProduct.Category,
            
        });
        {
           setImage(selectedProduct.Image)
            
        }

       
       
    }
}, [selectedProduct]);



  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Name", formInput.Name);
    formData.append("Price", formInput.Price);
    formData.append("Description", formInput.Description);
    if(formInput.Discount){
       
        formData.append("Discount", formInput.Discount);
    }
    formData.append("Category", formInput.Category);
    formData.append("Image", Image);
    console.log(formData,Image)

    //API Call
    const url = selectedProduct 
            ? `http://127.0.0.1:3000/api/product/${selectedProduct._id}` 
            : "http://127.0.0.1:3000/api/product";
        const method = selectedProduct ? 'patch' : 'post';

        axios[method](url, formData, { withCredentials: true })
            .then(() => {
              
                toggleShowAddForm();
                getAllProducts(1,"","","","6")
                .then((res) =>
                { 
                  updateAllProducts(res.allProducts,res.totalNumOfProducts)
                 

                })
                .catch((err) => console.log(err))
               

                toast.success(selectedProduct ?"product has been updated":"New product is added"
                 );
            })
            .catch(err => {
              toast.error(err.response.data.message);
              console.log(err )
              
            });


  };
  return (
    <div>
         
      <form  onSubmit={(e) => handleSubmit(e)}
      className="bg-slate-600 z-30 w-full md:w-1/2 p-5 absolute left-0 md:left-1/4 top-3 flex flex-col justify-center gap-10 rounded-md">
        <IoClose
                    className="block absolute -top-2 -left-3 cursor-pointer text-3xl text-white m-2 md:top-0 md:right-0"
                    onClick={() => toggleShowAddForm()}
                />
        {/* Image input */}
        <div className=" text-white max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center self-center">
          <label htmlFor="file" className=" cursor-pointer text-center p-4 md:p-8 max-w-md h-full flex flex-col items-center justify-center">
            {
                 ImagePreview ? (
                    <img
                      src={ImagePreview}
                      alt="Preview"
                      className="h-full w-full object-contain"
                    />
                  ) :
            
            
            Image??null? 
              <img
              src={`http://localhost:3000/${Image}`}
              alt="Preview"
              className="h-full w-full object-contain"
            /> :
            
          (
              <>
                <svg
                  className="w-10 h-10 mx-auto"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-3 text-white max-w-xs mx-auto">
                  Click to <span className="font-medium text-indigo-600">Upload your file</span> or drag and drop your file here
                </p>
              </>
            )}
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            accept="image/*"
           
           
            onChange={handleFileChange}
          />
        </div>

        {/* Form fields */}
        <div className="relative w-full flex flex-row gap-5 flex-wrap text-white">
          <input
            type="text"
            placeholder="Product Name"
            required
            name = "Name"
            value={formInput.Name}
            onChange={(e) => updateFormInput(e)}
            className="w-full pl-3 pr-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
          <input
            type="number"
            placeholder="Product Price"
            required
            name = "Price"
            value={formInput.Price}
            onChange={(e) => updateFormInput(e)}
            min={0}
            className="w-full pl-2 pr-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg md:w-1/2"
          />
          <input
            type="number"
            placeholder=" Discount if found(%)"
            min={0}
            name = "Discount"
            value={formInput.Discount}
            onChange={(e) => updateFormInput(e)}
            className="w-full md:w-[40%] pl-2 pr-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />

          {/* Category select */}
          <div className="relative w-72 max-w-full">
            <select
              required
              name = "Category"
              value={formInput.Category}
              onChange={(e) => updateFormInput(e)}
              className="w-full px-3 py-2 text-sm text-black bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
            >
              {Categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-5 h-5 my-auto text-black right-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <textarea
            required
            placeholder="Product Description"
            value={formInput.Description}
            name = "Description"
            onChange={(e) => updateFormInput(e)}
            className="rounded-md p-3 border bg-transparent w-full"
          ></textarea>
        </div>
        <button  type= "submit" className="w-1/3 bg-black text-white py-2 px-4 rounded-md self-center">
          {selectedProduct? "Update":"Addd"}
        </button>
      </form>
    </div>
  );
};

export default React.memo(NewProductForm);
