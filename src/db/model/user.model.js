import { DataTypes } from "sequelize";
import { sequelize } from "../connect.js";

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        field: 'user_name'
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: { msg: "invalid email" },

        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            checkPasswordLength(value) {
                if (value.length <= 6) {
                    throw new Error("password must be greater than 6 characters length ",
                        { cause: 400 }
                    );
                }
            }
        }

    },
    role: {
        type: DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user',


    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: (user) => {
            // @ts-ignore
            if (user.name.length <= 2) {
                throw new Error("name must be greater than 2 character length", { cause: 400 });
            }

        }

    }
})

export default User