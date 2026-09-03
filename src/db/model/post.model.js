import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect.js";

class Post extends Model { }
Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
}, {
    sequelize,
    timestamps: true,
    paranoid: true
})

export default Post