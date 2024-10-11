import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import backgroundImage from "../../Assets/shop-background.png"; 
import AllProducts from "../../Components/AllProducts/AllProducts";
import Footer from "../../Components/Footer/Footer";

const Shop = () => {
  return (
    <div>
      <Navbar />
     
      <div
        className="bg-cover bg-center h-96  mt-24 w-[80%] m-auto flex flex-col justify-center items-center gap-5"
        style={{ backgroundImage: `url(${backgroundImage})` }} >
            <h2 className="text-4xl">Shop Page</h2>
            <h5>Let's design the place you always imagined</h5>
      </div>
       <div className="flex flex-col justify-center px-16 my-10">
        <h2 className="text-5xl self-center mb-10">Our Products</h2>
        <AllProducts  limit="8"/>
       </div>
       <Footer />
    </div>
  );
};

export default React.memo(Shop);
