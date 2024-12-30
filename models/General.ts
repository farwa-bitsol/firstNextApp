import mongoose from "mongoose";

const onlinePresenceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "ID is required for online presence"],
    },
    url: {
        type: String,
        required: [true, "URL is required for online presence"],
        match: [/^https?:\/\/[^\s/$.?#].[^\s]*$/, "Please provide a valid URL"], // URL validation
    },
});

const generalFormSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    generalProfile: {
        name: { type: String },
        data: { type: String },
        contentType: { type: String },
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
    },
    location: {
        type: String,
        required: [true, "Please provide a location"],
    },
    profession: {
        type: String,
        required: [true, "Please provide a profession"],
    },
    bio: {
        type: String,
        required: [true, "Please provide a bio"],
    },
    onlinePresence: {
        type: [onlinePresenceSchema],
        default: [],
    },
}, { collection: 'generalForms', timestamps: true });

const GeneralForm = mongoose.models.generalForms || mongoose.model("generalForms", generalFormSchema);

export default GeneralForm;
