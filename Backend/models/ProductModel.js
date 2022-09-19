import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Product = db.define('product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default Product;