import { Post, User } from "../../db/model/index.js"

export const createPost = async (inputs) => {
    const post = Post.build(inputs)
    const result = await post.save()
    return result

}
export const retrievePosts = async () => {
    const posts = await Post.findAll({ include: User })

    return posts

}