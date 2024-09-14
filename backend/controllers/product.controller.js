import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
   }
   catch(error) {
        console.error("Error in finding products:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
   }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    // Ensure that required fields are present (customize this check based on your schema)
    if (!product.name || !product.price) { // Example checks
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedProd = await Product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({ success: true, data: updatedProd });
   }
   catch(error) {
        res.status(500).json({ success: false, message: "Server error" });
   }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) { // check if user entered all data
        return res.status(400).json({ success: false, message:"Please provide all fields"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    }
    catch (error) { 
        console.log("error in deleting product");
        res.status(500).json({ success: false, message: "Server error" });
    }
};