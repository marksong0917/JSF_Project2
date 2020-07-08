// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

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
  }
);

// Query Helpers
//TODO
DataSchema.virtual("short").get(function () {
  const temp = this.content;
  return temp.substring(0, 125);
});

module.exports = mongoose.model("data", DataSchema);
