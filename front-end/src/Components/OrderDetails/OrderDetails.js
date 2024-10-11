import React from "react";
const OrderDetails = (props) =>{

    const {order, updateShowOrderInfo} = props
    console.log("order", order)

    return(
        <div className="w-full md:w-[80%] bg-white h-[500px] p-4 shadow-lg left-5  overflow-auto flex flex-col items-start gap-4"> 
         <button className="abosulte top-1 right-2 text-xl cursor-pointer text-black self-start"
         onClick={() =>updateShowOrderInfo()}>X</button>
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
                                {order.Products.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            <img src={`http://localhost:3000/${item.Image}`} className="w-20 h-20" />
                                            <div className="flex flex-col gap-4">
                                                <span className="block text-gray-700 text-sm font-medium">{item.Name}</span>
                                                
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">{item.Price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.Discount} %</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.Quantity}</td>
                                       
                                        <td className="px-6 py-4 whitespace-nowrap">{((item.Price - item.Price * (item.Discount / 100)) * item.Quantity).toFixed(2)} $</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex flex-col  gap-4 w-[90%]md:w-[60%] bg-slate-300 p-3 rounded-lg self-center">
                            <h1 className="self-center">Shipping Info</h1>
                            <p>Name   : {order.ShippingInfo.Name}</p>
                            <p>Email  : { order.ShippingInfo.Email}</p>
                            <p>Phone  : {order.ShippingInfo.Phone}</p>
                            <p>Address : {order.ShippingInfo.StreetAddress +" "}
                            {order.ShippingInfo.City+" "}
                            {order.ShippingInfo.State+" "}
                            {order.ShippingInfo.Country}

                            </p>
                        </div>

        </div>
    );
}

export default React.memo(OrderDetails)