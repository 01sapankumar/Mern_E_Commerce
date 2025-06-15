import { Product } from "../Models/Product.js";

//add product 
export const addProduct = async (req, res) => {
    const{title, description, price, category, qty, imgSrc, createdAT}= req.body
    try {
        let product = await Product.create({
            title, description, price, category, qty, imgSrc,
        });
        res.json({message:'Product add successfully..!', product})
        
    } catch (error) {
        res.json(error.message)
    }
}


//get product

export const getProducts = async (req, res) =>{
    let products = await Product.find().sort({createdAt:-1})
    res.json({message:'All products', products})
}
// find product by id

export const getProductById = async (req, res) =>{
    const id = req.params.id;
    let product = await Product.findById(id)
    if(!product) return res.json({message:'Invalid Id'})
    res.json({message:"Specific Product", product})
}
//update product by id
export const updateProductById = async (req, res) =>{
    const id = req.params.id;
    let product = await Product.findByIdAndUpdate(id, req.body,{new:true})
    if(!product) return res.json({message:'Invalid Id'})
        res.json({message:"Product has been updated", product})
    }

    //delet product by id
   
export const deleteProductById = async (req, res) =>{
    const id = req.params.id;
    let product = await Product.findByIdAndDelete(id)
    if(!product) return res.json({message:'Invalid Id'})
        res.json({message:"Product has been Deleted", product})
    }