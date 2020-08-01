const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true, // This must exist
    },
    content: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Finish"],
      default: "Ongoing",
    },
  },
  {
    timestamps: true,
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

// Query Helpers
//TODO
DataSchema.virtual("short").get(function () {
  const temp = this.content;
  return temp.substring(0, 125);
});

module.exports = mongoose.model("data", DataSchema);
