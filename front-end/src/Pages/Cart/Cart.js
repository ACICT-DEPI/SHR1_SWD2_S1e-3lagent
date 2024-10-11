import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Utilities/user.utilities";
import { getUserCart,deleteProdcutFromCart, updateItemQuantity } from "../../Utilities/cart.utilities";
import Navbar from "../../Components/Navbar/Navbar"

const Cart = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [cartItems ,setCartItems] = useState([])
    const [total ,setTotal] = useState(0)

    const calcTotal = () =>{
        let total = 0;
        cartItems.map((item ) =>{
            total+= ((item.Price - item.Price *(item.Discount / 100)) * item.Quantity)
        })
        setTotal(total.toFixed(2))

    }

    useEffect(() =>{
        calcTotal()

    },[cartItems])

 const getCart = () =>{
    getUserCart()
    .then(res =>{
        setCartItems(res.Products)

    })
    .catch((err) =>console.log(err))
 }
  useEffect(() =>{
    dispatch( getUser())
    .then((res) =>{
        getCart()

 

    })
    .catch((err) => {
     
      if(err.response.data.err.statusCode ==401){
        navigate("/login")
      }

    }
   )

   
   
 
  },[])
// Cart API Calls

    return(
        < div className="flex flex-col gap-10 mb-24  ">
        <Navbar />
        
        {/* Wrapper div for progress and cart */}
        <div className=" flex flex-col  gap-5 items-center justify-center mt-0 md:mt-24 w-full">
        
            {/* Progress div */}
            <div className="w-full flex justify-center">
                <ul className="steps steps-vertical lg:steps-horizontal">
                    <li className="step step-primary">Cart Details</li>
                    <li className="step">Check out</li>
                    <li className="step">Order Complete</li>
                </ul>
            </div>
    
            {/* Cart items and summary */}
            <div className="flex flex-col  md:flex-row justify-center items-center w-full gap-20">
                <div className="max-w-screen-xl px-4 md:px-8 h-[500px] overflow-auto w-[85%] md:w-[50%]">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl items-center">
                            Cart Products
                        </h3>
                    </div>
    
                    <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                        <table className="w-full table-auto text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                                <tr>
                                    <th className="py-3 px-6">Product</th>
                                    <th className="py-3 px-6">Price </th>
                                    <th className="py-3 px-6">Discount</th>
                                    <th className="py-3 px-6">Quantity</th>
                                    <th className="py-3 px-6">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 divide-y">
                                {cartItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            <img src={`http://localhost:3000/${item.Image}`} className="w-20 h-20" />
                                            <div className="flex flex-col gap-4">
                                                <span className="block text-gray-700 text-sm font-medium">{item.Name}</span>
                                                <span className="block text-[red] text-xs cursor-pointer"
                                                    onClick={() => {
                                                        deleteProdcutFromCart(idx)
                                                            .then(() => getCart())
                                                            .catch((err) => console.log(err));
                                                    }}>
                                                    remove
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.Price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.Discount} %</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-row items-center gap-3 bg-slate-400 w-24 px-3 rounded-md">
                                                <button
                                                    onClick={() => {
                                                        updateItemQuantity(idx, item.Quantity - 1)
                                                            .then(() => getCart())
                                                            .catch((err) => console.log(err));
                                                    }}
                                                    className="text-3xl active:text-blue-600"
                                                    disabled={item.Quantity === 1}>-</button>
                                                <span>{item.Quantity}</span>
                                                <button
                                                    onClick={() => {
                                                        updateItemQuantity(idx, item.Quantity + 1)
                                                            .then(() => getCart())
                                                            .catch((err) => console.log(err));
                                                    }}
                                                    className="text-3xl active:text-blue-600">+</button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{((item.Price - item.Price * (item.Discount / 100)) * item.Quantity).toFixed(2)} $</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-col gap-10 justify-center text-white bg-slate-700 p-8 rounded-2xl w-full md:w-[20%]">
                    <h1>Cart Summary</h1>
                    <h2>Total: {total} $</h2>
                    <button className="px-4 py-2 bg-yellow-500 rounded-md"
                    onClick={() =>{
                        navigate("/shippingAddress")
                    }}
                    disabled={cartItems.length ==0}
                    >Check Out</button>
                </div>
            </div>
        </div>
    </div>
    
    );
}


export default React.memo(Cart)