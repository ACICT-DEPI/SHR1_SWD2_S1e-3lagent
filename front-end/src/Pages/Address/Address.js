import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Navbar from "../../Components/Navbar/Navbar"
import { clearCart, getUserCart } from "../../Utilities/cart.utilities"
import { makeOrder } from "../../Utilities/order.utilities"

export default function Address() {
    const navigate = useNavigate()

    const Countries = ["USA" ,"Canada" ,"Egypt" ,"KSA" ,"UAE"]
    const user = useSelector((state) => state?.userReducer?.user??null)
   
    //form 

    const [formInput, setFromInput] = useState({
        Name: user.Name,
        Email:user.Email,
        Country:"",
        StreetAddress: "",
        City:"",
        State:"",
        ZIP:"",

    });

    const updateFormInput = (event) => {
        const { name, value } = event.target;
        setFromInput((old) => {
            return { ...old, [name]: value }
        });
    };

   //API calls
   const [cartItems ,setCartItems] = useState([])
   

   //get cart
   useEffect(() =>{
    getUserCart()
    .then(res =>{
        setCartItems(res.Products)
      

    })
    .catch((err) =>console.log(err))


   },[])

   //place order
   const placeOrder = (e) =>{
    e.preventDefault()

    makeOrder(cartItems,formInput)
    .then((res) => {
        clearCart()
        navigate("/shop")

    })
   }
   
  return (
    < div className="flex flex-col">
       <Navbar />

        <div className="w-full flex justify-center mt-0 md:mt-20 ">
        <ul className="steps steps-vertical lg:steps-horizontal">
            <li className="step step-primary">Cart Details</li>
            <li className="step step-primary">Check out</li>
            <li className="step">Order Complete</li>
        </ul>
    </div>
    <form onSubmit={(e) =>placeOrder(e)}
    className="w-[100%] flex flex-col justify-center items-center mt-10 mb-10">
      <div className="space-y-1  shadow-lg p-4 ">
        

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Shipping Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                 Name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="Name"
                  value={formInput.Name }
                  onChange={(e) => updateFormInput(e)}
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

           

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="Email"
                  value={formInput.Email }
                  onChange={(e) => updateFormInput(e)}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="Country"
                  value={formInput.Country }
                  onChange={(e) => updateFormInput(e)}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                 {
                    Countries.map((item) => <option value={item}>{item}</option>)
                 }
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="StreetAddress"
                  value={formInput.StreetAddress }
                  onChange={(e) => updateFormInput(e)}
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="City"
                  value={formInput.City }
                  onChange={(e) => updateFormInput(e)}
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="State"
                  value={formInput.State }
                  onChange={(e) => updateFormInput(e)}
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="ZIP"
                  value={formInput.ZIP }
                  onChange={(e) => updateFormInput(e)}
                  type="text"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>


      </div>

      <div className="mt-6 flex items-center justify-end gap-x-20">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" 
        onClick={() => {
            navigate("/cart")
        }}>
          Back
        </button>
        <button
          
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Place Order
        </button>
      </div>
    </form>
  
    </div>
  )
}