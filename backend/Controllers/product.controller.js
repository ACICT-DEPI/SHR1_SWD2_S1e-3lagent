const asyncHandeler = require("../utilities/asyncHandler");
const ProductModel = require("../Models/Product.model")
const ApiFeatuers = require("../utilities/ApiFeatures") 

exports.AddNewProdcut = asyncHandeler(
    async(req, res ,next ) =>{
        const image = req.files['Image'] ? req.files['Image'][0].path : null;
       
       
        const productData = {...req.body,Image:image}
     

        const newProduct = await ProductModel.create(productData) 
        
        res.status(201).send(
            {
                status:"Success",
                data:
                {
                    message :"product created succesfully",
                    newProduct

                }
            }
        )
    }
)

exports.getAllProduct = asyncHandeler(

    
    async (req, res ,next) =>{

       
        const feature = new ApiFeatuers(ProductModel.find() , req.query).filter().sort().search().limitFields();
        const totalProducts = await ProductModel.countDocuments(feature.query.getQuery());
        console.log(totalProducts)

        feature.paginate();
            

        const allProducts =  await feature.query
        console.log(allProducts)
       
        res.status(200).send(
            {
                status:"Success",
                length:allProducts.length,
                
                data:
                {
                    totalNumOfProducts :totalProducts,
                    message :"all poducts retrived  succesfully",
                    allProducts

                }
            }
        )

    }
)
exports.deleteProduct = asyncHandeler(
    async (req, res ,next) =>{

        const id = req.params.id

        await ProductModel.findByIdAndDelete(id);
        res.status(200).send(
            {
                status:"Success",
                data:
                {
                    message :" poducts deleted  succesfully",
                    

                }
            }
        )

    }
)

exports.updateProduct = asyncHandeler(
    async (req, res ,next) =>{
        const id = req.params.id
        const Image = req.files['Image'] ? req.files['Image'][0].path : null;
        let updatedBody ={
            ...req.body
         
         }
    
        if(Image ==null){
        }
        else{
            updatedBody={...updatedBody,Image:Image}
    
        }
    


       
        const updatedProduct = await ProductModel.findByIdAndUpdate(id,updatedBody,{
            new:true,
            runValidators:true
        });
        res.status(200).send(
            {
                status:"Success",
                data:
                {
                    message :" poducts updated  succesfully",
                    updatedProduct
                    

                }
            }
        )

      
      
       
       
       

    }
)