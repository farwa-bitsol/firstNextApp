import MediaFile from "./MediaFileModel";

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        profilePhoto: {
            type: String,
        },
        postMedia: MediaFile.schema,
        userName: {
            type: String,
        },
        postTime: {
            type: Date,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: {
            type: Number,
            default: 0,
        },
        shares: {
            type: Number,
            default: 0,
        },
    },
    {
        collection: "posts",
    }
);

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
