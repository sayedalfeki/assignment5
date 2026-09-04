import express from 'express';
import globalResponse from './utils/response.js'
import { errorHandler } from './middleware/error.handler.js';
import { secrets } from './config/config.js';
import { dbConnect } from './db/connect.js';
import * as md from './module/index.js'
try {
    await dbConnect()

    const app = express();
    app.use(express.json());
    app.use('/users', md.userRouter)
    app.use('/posts', md.postRouter)
    app.use('/comments', md.commentRouter)



    app.all('{/*dummy}', (req, res) => {
        // @ts-ignore
        res.globalResponse(
            {
                message: 'invalid routing ',
                status: 404
            }
        )
    })
    app.use(errorHandler)
    app.listen(secrets.port, () => {
        console.log(`Server is running on port ${secrets.port}`);
    });
} catch (error) {
    console.log(error);

}
