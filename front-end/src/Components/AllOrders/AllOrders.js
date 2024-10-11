import { getAllOrders } from "../../Utilities/order.utilities"
import React, { useState ,useEffect} from "react";
import { FaInfoCircle } from "react-icons/fa";  
import { FaRegPenToSquare } from "react-icons/fa6";
import ChangeOrderStatus from "./ChangeOrderStatus";
import { useSelector } from "react-redux";
import OrderDetails from "../OrderDetails/OrderDetails";
export default () => {

   const [allOrders, setAllOrders] = useState([])
   const user = useSelector((state) => state?.userReducer?.user??null)
    //update alluser
    const updateAllOrders = (Orders) =>{
        setAllOrders(Orders)

    }
     const [showOrderStatus, setShowOrderStatus] = useState(false)
     const [showOrderInfo, setShowOrderInfo] = useState(false)

    const [selectedOrder, setSelectedOrder] = useState({})
   
      //API Call
   useEffect(() =>{
    getAllOrders()
    .then((res) =>{
        setAllOrders(res)

    })
    .catch((err) =>{
        console.log(err)
    })

   },[])

   //functions 
   const getTotal =(Products) =>{
    let total = 0;
    Products.map((item ) =>{
            total+= ((item.Price - item.Price *(item.Discount / 100)) * item.Quantity)
        })
        return total.toFixed(3);

   }

   //Change Date Format 
    const ChangeDate = (orderDate) =>{
        const date = new Date(orderDate);

        const readableDate = date.toLocaleString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
          });
          return readableDate
    }


  
    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
           
            <div className="mt-12 relative h-max overflow-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 pr-6">Name</th>
                            <th className="py-3 pr-6">Date</th>
                            <th className="py-3 pr-6">status</th>
                            <th className="py-3 pr-6">Total</th>
                            <th className="py-3 pr-6">Num Of Products</th>
                            <th className="py-3 pr-6">Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            allOrders.map((order, idx) => (
                                <tr key={idx}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{order.ShippingInfo.Name}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{ChangeDate(order.createdAt)}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-2 rounded-full font-semibold text-xs ${order.Status == "Completed" ? "text-green-600 bg-green-200" :(order.Status == "Pending" ? "text-blue-600 bg-blue-100" :"text-black-900 bg-red-200") }`}>
                                            {order.Status}
                                        </span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{getTotal(order.Products) } $</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">{order.Products.length}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap flex flex-row justify-center items-center gap-5 text-left text-xl cursor-pointer">
                                    <FaInfoCircle 
                                    onClick={() =>{
                                        setSelectedOrder(order)
                                        setShowOrderInfo(true)

                                        }} />
                                   { user?.Role =="admin" &&
                                   <FaRegPenToSquare onClick={
                                       ()=>{
                                        setSelectedOrder(order)
                                        setShowOrderStatus(true)
                                       }
                                    } />}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="fixed  top-28 left-[10%]w-[100%] md:top-28 md:left-[46%] md:w-[60%]">
            { showOrderStatus && <ChangeOrderStatus
             order = {selectedOrder}
             updateShowOrderRole = {() =>setShowOrderStatus(false)}
             updateAllOrders = {updateAllOrders}/>}

            </div>
            <div className=" w-[70%] fixed top-2 left-10 md:left-[30%]  overflow-auto z-50 ">
            { showOrderInfo && <OrderDetails
             order = {selectedOrder}
             updateShowOrderInfo = {() =>setShowOrderInfo(false)}
             />}

            </div>
        </div>
    )
}