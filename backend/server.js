import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
if(process.env.NODE_ENV === "production" ) {
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", index.html));
    });
}

// listen on port 3000
app.listen(3000, () => { 
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
}); 