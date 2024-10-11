import { useState, useEffect ,useRef} from "react";
import React from "react";
import NewProductForm from "../NewProductForm/NewProductForm";
import ProductCard from "../ProductCard/ProductCard";
import ReactPaginate from 'react-paginate';
import FilterForm from "../FilterForm/FilterForm";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../Utilities/product.utilities";


const AllProducts = (props) => {

   const sort = props.sort ||"createdAt"
   const limit = props.limit || "6"
  

  //  ref  
  const productsSectionRef = useRef(null)

  // filter store 
  const Search = useSelector(state => state?.filterReducer?.Search??null)
  const Category = useSelector(state => state?.filterReducer?.Category??null)
  

  //user
   const user = useSelector(state =>state?.userReducer?.user??null)
  


    const [showAddForm, setShowAddForm] = useState(false);
    const [totalNumOfProducts, setTotalNumOfProducts] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);

    const toggleShowAddForm = () => {
        setShowAddForm((prev) =>{
          if(prev){
            setSelectedProduct(null)
          }
          return !prev
        });
       
    };
   

  
       //function to update products 

       const updateAllProducts = (products, num) =>{
        setAllProducts(products)
        setTotalNumOfProducts(num)
       }

    useEffect(() => {
      
     
        getAllProducts(1, Search, Category, sort ,limit)
        .then((res) =>{
         
          setAllProducts(res.allProducts) 
          setTotalNumOfProducts(res.totalNumOfProducts)
        });
    }, []);

    useEffect(() => {
      getAllProducts(1, Search, Category, sort,limit) .then((res) =>{
        setAllProducts(res.allProducts) 
        setTotalNumOfProducts(res.totalNumOfProducts)
      });
  }, [Category,Search]);

    //handle pagination
    const handlePagination = (data) => {
        getAllProducts(data.selected + 1, Search, Category, sort,limit)
        .then((res) =>{
          setAllProducts(res.allProducts) 
          setTotalNumOfProducts(res.totalNumOfProducts)
        });

        if (productsSectionRef.current) {
          window.scrollTo({
            top: productsSectionRef.current.offsetTop,
            behavior: 'smooth', 
          });
        }
    };

    return (
        <div ref={productsSectionRef} className="flex flex-col items-center md:items-end  justify-start md:justify-start">
         
            <div className="flex flex-row items-center w-full justify-center p-4">
              
               
                <div   className="ml-auto justify-self-end ">
                    <FilterForm />
                </div>
               {
                  user?.Role =="admin"&&
                    <button
                    onClick={() => toggleShowAddForm()}
                    className="bg-slate-700 px-6 py-2 rounded-md text-white w-fit"
                   >
                    New Prodcut
                    </button>
               }

            </div>

            {/* Add form if toggled */}
            {showAddForm && (
                <NewProductForm
                updateAllProducts={updateAllProducts}
                    toggleShowAddForm={toggleShowAddForm}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                />
            )}

            {/* Product cards */}
            {
                (allProducts.length==0) &&<h3 className="m-auto text-center">No Products Founded</h3>
              }
            <div   
            className="flex flex-row justify-center md:justify-start items-center gap-12 py-10 flex-wrap">
              
                {allProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        updateAllProducts={updateAllProducts}
                        setSelectedProduct={setSelectedProduct}
                        toggleShowAddForm={toggleShowAddForm}
                    />
                ))}
            </div>

            {/* Pagination */}
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                pageCount={Math.ceil(totalNumOfProducts / 6)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                previousLabel="<<"
                onPageChange={handlePagination}
                renderOnZeroPageCount={null}
                containerClassName={"flex justify-center self-center space-x-2 mt-6"}
                pageClassName={"block text-gray-600 hover:bg-slate-700 hover:text-white border rounded-md py-1 px-3 cursor-pointer"}
                previousClassName={"block text-gray-600 hover:bg-slate-700 hover:text-white border rounded-md py-1 px-3 cursor-pointer"}
                nextClassName={"block text-gray-600 hover:bg-slate-700 hover:text-white border rounded-md py-1 px-3 cursor-pointer"}
                breakClassName={"block text-gray-600 hover:bg-slate-700 hover:text-white border rounded-md py-1 px-3 cursor-pointer"}
                activeClassName={"bg-slate-700 text-white border-slate-700"}
            />
        </div>
    );
};

export default React.memo(AllProducts);
