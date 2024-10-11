import Signup from "./Pages/Signup";

//toast setting 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes,Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Admin from "./Pages/Admin/Admin";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import AllProducts from "./Components/AllProducts/AllProducts";
import AllUsers from "./Components/AllUsers/AllUsers";
import Profile from "./Pages/Profile/Profile";
import Shop from "./Pages/Shop/Shop";
import Cart from "./Pages/Cart/Cart";
import Address from "./Pages/Address/Address";
import AllOrders from "./Components/AllOrders/AllOrders";
import ProfileInfo from "./Components/ProfileInfo/ProfileInfo";
import Wishlist from "./Components/Wishlist/Wishlist";
import Home from "./Pages/Home/Home";
import { useEffect } from "react";
function App() {

  useEffect(() =>{
    console.log("app rendered")

  },[])
  return (
    
    <div className="App">
       <ToastContainer />
       <Routes>
         <Route path="/signup" element ={ <Signup />} />
         <Route path="/" element ={ <Home />} />
         <Route path="/login" element ={ <Login />} />
         <Route path="/shop" element ={ <Shop />} />
         <Route path="/cart" element ={ <Cart />} />
         <Route path="/shippingAddress" element ={ <Address />} />
         <Route path = "/admin" element = {<Admin />} >
            <Route index element = { <AllUsers />} />
            <Route path = "all-products"  element = {<AllProducts/>} />
            <Route path = "changePassword"  element = {<ChangePassword />} />
            <Route path = "orders"  element = {<AllOrders />} />

        </Route>
        <Route path = "/profile" element = {<Profile />} >
            <Route index element = {<ProfileInfo />} />
            <Route path = "changePassword"  element = {<ChangePassword />} />
            <Route path = "orders"  element = {<AllOrders />} />
            <Route path = "wishList"  element = {<Wishlist />} />


        </Route>

       </Routes>
        
     
     
    </div>
  );
}

export default App;
