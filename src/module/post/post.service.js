import { where } from "sequelize"
import { Comment, Post, User } from "../../db/model/index.js"
import { sequelize } from "../../db/connect.js"

export const createPost = async (inputs) => {
    const post = Post.build(inputs)
    const result = await post.save()
    return result

}
export const deletPost = async (userId, postId) => {
    const post = await Post.findByPk(postId)
    const result = {}
    if (!post) {
        result.message = 'no post founded'
        result.status = 404

    }
    else {
        // @ts-ignore
        if (post?.userId != userId) {
            result.message = "you are not authorized to delete this post"
            result.status = 409
        }
        else {
            const deletedPost = await Post.destroy({ where: { id: postId } })
            result.message = 'post deleted'
            result.status = 200
        }

    }
    return result
}
export const retrievePosts = async () => {
    const posts = await Post.findAll({
        attributes: ['id', 'title'],
        include: [{
            model: User,
            attributes: ['id', 'name']
        },
        {
            model: Comment,
            attributes: ['id', 'content'],
        }

        ],

    }
    )

    return posts

}
export const getPostsWithCommentCount = async () => {
    const posts = await Post.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'content', 'deletedAt', 'userId'],
            include: [
                [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentsCount']
            ]
        },
        include: [
            {
                model: Comment,
                attributes: []
            }
        ],

        group: ['Post.id']
    });

    return posts
};