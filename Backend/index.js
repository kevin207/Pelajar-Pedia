import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/ApiRoute.js";
import cookieParser from 'cookie-parser';
import FileUpload from "express-fileupload";

// FIRST RUN ONLY
// import Users from "./models/UserModel.js";
// import Product from "./models/ProductModel.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log("Database Connected...");
    
    // CREATE TABLE IF NOT EXIST
    // await Users.sync();
    // await Product.sync();

} catch (error) {
    console.error(error);
}

app.use(FileUpload());
app.use(cookieParser())
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(express.json());
app.use(express.static("public"));
app.use(router);

app.listen(5000, () => console.log("Server up and Running..."));

// ALTER TABLE users AUTO_INCREMENT = 1