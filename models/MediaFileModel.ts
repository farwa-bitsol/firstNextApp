import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
    data: {
        type: String,
    },
    name: {
        type: String,
    },
    contentType: {
        type: String,

    }
})

const MediaFile = mongoose.models.MediaFiles || mongoose.model("MediaFiles", MediaSchema);

export default MediaFile;