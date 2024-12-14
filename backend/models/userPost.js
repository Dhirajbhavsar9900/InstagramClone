const mongoose = require("mongoose");
const { Schema } = mongoose;

const userPostSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER", // Reference to the 'USER' model
    },
    // likes: {
    //   type: [mongoose.Schema.Types.ObjectId], // Array of user IDs who liked the post
    //   default: [],
    // },
  },
  { timestamps: true }
);

mongoose.model("POST", userPostSchema);
