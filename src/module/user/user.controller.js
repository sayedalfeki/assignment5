import { Router } from "express";
import * as userServ from "./user.service.js";

const userRouter = Router()
userRouter.post('/signup', async (req, res) => {
    const result = await userServ.signUp(req.body)
    // @ts-ignore
    res.globalResponse({
        message: "user added successfully",
        data: result
    })
})
userRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const result = await userServ.updateUser(id, req.body)
    // @ts-ignore
    res.globalResponse({
        message: "user created or updated successfully",
        data: result
    })
})
userRouter.get('/by-email', async (req, res) => {
    const email = req.query.email


    const result = await userServ.getUserByEmail(email)
    // @ts-ignore
    res.globalResponse({
        message: result ? undefined : "no user found",

        data: result ? result : undefined
    })
})
userRouter.get('/:id', async (req, res) => {
    const id = req.params.id


    const result = await userServ.getUserByPK(id)
    // @ts-ignore
    res.globalResponse({
        message: result ? undefined : "no user found",

        data: result ? result : undefined
    })
})
export default userRouter