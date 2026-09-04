import { Router } from "express";
import * as commentServ from "./comment.service.js";

const commentRouter = Router()
commentRouter.post('/', async (req, res) => {
    const result = await commentServ.createBulkComments(req.body)

    // @ts-ignore
    res.globalResponse({
        message: 'comments created',
        data: result

    })
})
commentRouter.post('/find-or-create', async (req, res) => {
    const result = await commentServ.findorCreateComment(req.body)

    // @ts-ignore
    res.globalResponse({

        data: { 'comment': result[0], 'created': result[1] }

    })
})
commentRouter.patch('/:commentId', async (req, res) => {
    const id = req.params.commentId

    const result = await commentServ.updateComment(id, req.body)

    // @ts-ignore
    res.globalResponse({
        message: result.message,


    })
})
commentRouter.get('/search', async (req, res) => {
    const result = await commentServ.findandCountComment(req.query.word)

    // @ts-ignore
    res.globalResponse({
        message: result.count <= 0 ? 'no comments found' : undefined,

        data: result.count > 0 ? result : undefined

    })
})
commentRouter.get('/newest/:postId', async (req, res) => {
    const result = await commentServ.getMostRecentComments(req.params.postId)

    // @ts-ignore
    res.globalResponse({

        data: result

    })
})
commentRouter.get('/details/:id', async (req, res) => {
    const result = await commentServ.getCommentDetails(req.params.id)

    // @ts-ignore
    res.globalResponse({

        data: result

    })
})
export default commentRouter