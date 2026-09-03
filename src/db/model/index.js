import Comment from "./comment.model.js";
import Post from "./post.model.js";
import User from "./user.model.js";
User.hasMany(Post);
Post.belongsTo(User);

// علاقة User مع Comment
User.hasMany(Comment);
Comment.belongsTo(User);

// علاقة Post مع Comment (بدل belongsToMany)
Post.hasMany(Comment);
Comment.belongsTo(Post);
export {
    User, Post, Comment
}