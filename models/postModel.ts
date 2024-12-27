import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    posts: [
        {
            profilePhoto: { type: String, required: true },
            postMedia: {
                name: { type: String },
                data: { type: String },
                contentType: { type: String },
            },
            userName: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String },
            likes: { type: Number, default: 0 },
            comments: { type: Number, default: 0 },
            shares: { type: Number, default: 0 },
            postTime: { type: String, required: true },
        },
    ],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
