import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect.js";

class Comment extends Model { }
Comment.init({
    content: DataTypes.TEXT
}, {
    sequelize,
    timestamps: true
})

export default Comment