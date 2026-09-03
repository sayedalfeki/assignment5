import { User } from "../../db/model/index.js"

export const signUp = async (inputs) => {
    const { name, email, password } = inputs
    const isUser = await User.findOne({ where: { email: email } })
    if (isUser) {
        throw new Error("Email already exist ", { cause: 400 });
    }
    const user = User.build({ name, email, password })
    const result = await user.save()
    return result
}
export const updateUser = async (id, inputs) => {
    const { name, email, password } = inputs

    const user = await User.upsert({ id, name, email, password })
    return user
}
export const getUserByEmail = async (email) => {
    const result = await User.findOne({ where: { email: email } })
    return result
}
export const getUserByPK = async (id) => {
    // @ts-ignore
    const result = await User.findByPk(id, { attributes: { exclude: 'role' } })
    return result
}