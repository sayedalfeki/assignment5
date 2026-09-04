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
postRouter.delete('/:postId', async (req, res) => {
    const postId = req.params.postId
    const userId = req.body.userId
    console.log(userId);

    const result = await postServ.deletPost(userId, postId)
    // @ts-ignore
    res.globalResponse({
        message: result.message,
        status: result.status
    })

})
postRouter.get('/', async (req, res) => {
    const result = await postServ.retrievePosts()
    // @ts-ignore
    res.globalResponse({

        data: result
    })
})
postRouter.get('/comment-count', async (req, res) => {
    const result = await postServ.getPostsWithCommentCount()
    // @ts-ignore
    res.globalResponse({

        data: result
    })
})
export default postRouter