import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";



import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { deleteProduct ,getAllProducts} from "../../Utilities/product.utilities";
import { addToCart } from "../../Utilities/cart.utilities";
import { addToWishList, checkIfItemIsWished, deleteFromWishList } from "../../Utilities/Wishlist/Wishlist.utilities";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) =>{

    const {product, updateAllProducts, setSelectedProduct, toggleShowAddForm , getWishListProducts} = props
    const [isWished , setIsWished] = useState(false)
    const user = useSelector((state) => state?.userReducer?.user??null)
    const navigate = useNavigate();
   

    const DiscountStyle = {
        textDecoration: product.Discount!=0 ? "line-through" :"none",
        color:  product.Discount!=0 ? "gray" :"blue",
        fontSize:product. Discount!=0 ? 20 :30
    }

   //APIs
   const deleteProductCall = () =>{
    deleteProduct(product._id)
    .then((res) =>{
        getAllProducts(1,"","","","6")
        .then((res) =>
        { 
            updateAllProducts(res.allProducts,res.totalNumOfProducts)
         

        })
        .catch((err) => console.log(err))
    })

     
   }
 //wish list calls
 
   const handleAddToWishlist = (product) =>{
    addToWishList(product)
    .then(() => {
        setIsWished(true)

    })
    .catch((err) => 
    {
        console.log(err)
        if(err.response.data.err.statusCode ==401){
            navigate("/login")
          }
    })


   }

   const handleDeleteFromWishlist = (product) =>{
    deleteFromWishList(product._id)
    .then(() => {
        setIsWished(false)
        getWishListProducts()

    })
    .catch((err) => console.log(err))


   }

   //check if product is already wished for a user
    useEffect(() =>{
        checkIfItemIsWished(product._id)
        .then((res) =>{
            if(res.isWished)
            {
                setIsWished(true)
            }
        })

        .catch((err) =>{console.log(err)})

    },[product])


    return(
        <div className={`card bg-base-100 w-64 shadow-xl ${user?.Role =="user"? "h-[350px]" : "h-[450px]"} rounded-lg`}>
            <figure>
                <img
                src= {`http://localhost:3000/${product.Image}`}
                className="w-full h-52 "
                alt="product" />
            </figure>
            {
                 user?.Role!="admin" &&
                 <div className="absolute  right-3 top-2 text-3xl  text-yellow-500">
            {isWished ?
            <FaHeart  onClick={() => handleDeleteFromWishlist(product)} /> 
           : <CiHeart onClick={() => handleAddToWishlist(product)}/>}</div>

            }
           
            <div className="flex flex-col px-8 py-6 gap-5">
                <h1 className="card-title">{product.Name}</h1>
                <p>{product.Description}</p>
               <div className="flex  items-center flex-row gap-5">
                    <p style={DiscountStyle}>{product.Price} $</p>
                    { product.Discount != 0 ? <p className="text-[blue] text-[30px]">{(product.Price - product.Price*(product.Discount/100))} $</p> :<></>}
                    
               </div>
              {
                user?.Role=="admin" ?  <div className="flex flex-row  items-center gap-7">
                    <FaEdit  className="text-blue-700 text-3xl cursor-pointer " onClick={()=>
                        {
                            setSelectedProduct(product)
                            toggleShowAddForm()
                    }}/>
                    <MdDelete  className="text-[red] text-3xl cursor-pointer"  onClick={() => deleteProductCall()}/>
              </div>
              :<button className="text-2xl w-fit px-3 py-1 rounded-lg self-end active:text-yellow-500 ">
                <FaCartShopping onClick={() =>{
                    addToCart(product)
                    .then((res) =>{})
                    .catch((err) =>
                    {
                        if(err.response.data.err.statusCode ==401){
                            navigate("/login")
                          }
                    })
                }} />
              </button>
              }
                
            </div>
        </div>
    )
}

export default React.memo(ProductCard)