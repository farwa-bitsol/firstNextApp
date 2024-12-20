const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    profilePhoto: { type: String, },
    userName: { type: String, },
    postTime: { type: String, },
    title: { type: String, },
    description: { type: String, },
    postPhoto: { type: String, },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
}, { collection: 'posts' });


const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
