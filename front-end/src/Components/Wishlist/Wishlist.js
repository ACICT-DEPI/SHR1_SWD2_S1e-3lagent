import React, { useEffect, useState } from "react";
import { getWishList } from "../../Utilities/Wishlist/Wishlist.utilities";
import ProductCard from "../ProductCard/ProductCard";
const Wishlist =() =>{
    const [wishList , setWishList] = useState([]) 



    //API Calls 

    const getWishListProducts = () =>{
        getWishList()
        .then((res) => {
            setWishList(res.wishList.Products)
        })
        .catch((err) =>{
            console.log(err)
        })

    }

    useEffect(()=>{
        getWishListProducts()

    },[])


    return(
        <div className="flex flex-col  justify-start gap-10">
            <h1 className="self-center text-4xl">Wishlist</h1>
            <div className="flex flex-row justify-center  md:justify-start items-center gap-20 flex-wrap ">
                {
                    wishList.map((product) => <ProductCard product ={product} getWishListProducts ={getWishListProducts} /> )

                }
            </div>


          
          
        </div>
    );
} 

export default React.memo(Wishlist)