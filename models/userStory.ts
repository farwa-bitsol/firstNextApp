import mongoose from "mongoose";
import "./userModel"; // register userdashboard schema

const storySchema = new mongoose.Schema({
  text: { type: String },
  image: { type: String },
});

const userStorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userDashboard",
    },
    coverImage: {
      type: String,
    },
    story: {
      type: storySchema,
    },
  },
  {
    collection: "userStories",
  }
);

const UserStory =
  mongoose.models.userStories || mongoose.model("userStories", userStorySchema);

export default UserStory;
