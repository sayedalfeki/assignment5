import { Op } from "sequelize"
import { Comment, Post, User } from "../../db/model/index.js"
import { sequelize } from "../../db/connect.js"

export const createBulkComments = async (inputs) => {
    const result = await Comment.bulkCreate(inputs)
    return result

}
export const findorCreateComment = async (inputs) => {
    const { content, userId, PostId } = inputs
    const comment = await Comment.findOrCreate({
        where: {
            content, userId, PostId
            // @ts-ignore
        }
    })


    return comment
}
export const updateComment = async (id, inputs) => {
    const { userId, content } = inputs
    const comment = await Comment.findByPk(id)
    if (!comment) {
        return {
            message: 'no comment found'
        }
    }
    // @ts-ignore
    if (comment?.userId != userId) {
        return {
            message: 'you are not authorized to update this comment'
        }
    }
    const result = await Comment.update(
        { content: content },
        {
            where: {
                id

            }
        })


    return {
        message: 'comment updated',
        data: result
    }
}
export const findandCountComment = async (inputs) => {
    console.log(inputs);

    const comment = await Comment.findAndCountAll({
        where: {

            content: { [Op.like]: `%${inputs}%` }
        }
    })


    return comment
}
export const getMostRecentComments = async (inputs) => {
    const comment = await Comment.findAll({
        where: {
            PostId: inputs
        }, order: [
            ['createdAt', 'DESC']],
        limit: 3
    })


    return comment
}
export const getCommentDetails = async (inputs) => {
    const comment = await Comment.findByPk(inputs, {
        include: [{
            model: User,
            attributes: ['id', 'name', 'email']
        },
        {
            model: Post,
            attributes: ['id', 'title', 'content'],

        }

        ],

    })


    return comment
}