import Product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProducts = async(req, res) => {
    try{
        const response = await Product.findAll();
        res.json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const getProductById = async(req, res) => {
    try{
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error){
        console.log(error.message);
    }
}

export const createProduct = async(req, res) => {
    
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});

    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowed = [".png", '.jpg', '.jpeg'];

    if (!allowed.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Extension"});
    if (size > 5000000) return res.status(422).json({msg: "File Size Too Big"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({
                name: name,
                price: price,
                category: category,
                image: fileName,
                url: url
            });

            res.status(201).json({msg: "Product Created"})
        } catch (error) {
            console.log(error.message)
        }
    });
    
}

export const updateProduct = async(req, res) => {
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Product Found"});

    let fileName = "";
    if(req.files === null)
    {
        fileName = Product.images;
    }
    else
    {
        const file = req.files.file;
        const size = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowed = [".png", '.jpg', '.jpeg'];

        if (!allowed.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Extension"});
        if (size > 5000000) return res.status(422).json({msg: "File Size Too Big"});

        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Product.update({
            name: name,
            price: price,
            category: category,
            image: fileName,
            url: url
        },{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Updated"})

    } catch (error) {
        console.log(error.message)
    }
}

export const deleteProduct = async(req, res) => {
  
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Product Found"});

    try {

        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Deleted"})

    } catch (error) {
        console.log(error.message);
    }
}