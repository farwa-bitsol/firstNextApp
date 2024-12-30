import mongoose from "mongoose";

const onlinePresenceSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    url: {
        type: String,
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
    },
    lastName: {
        type: String,
    },
    location: {
        type: String,
    },
    profession: {
        type: String,
    },
    bio: {
        type: String,
    },
    onlinePresence: {
        type: [onlinePresenceSchema],
        default: [],
    },
}, { collection: 'generalForms' });

const GeneralForm = mongoose.models.generalForms || mongoose.model("generalForms", generalFormSchema);

export default GeneralForm;
