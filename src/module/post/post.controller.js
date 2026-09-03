import { Router } from "express";
import * as postServ from "./post.service.js";

const postRouter = Router()
postRouter.post('/', async (req, res) => {
    const result = await postServ.createPost(req.body)
    // @ts-ignore
    res.globalResponse({

        data: result
    })
})
postRouter.get('/', async (req, res) => {
    const result = await postServ.retrievePosts()
    // @ts-ignore
    res.globalResponse({

        data: result
    })
})
export default postRouter