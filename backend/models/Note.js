const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => {
      // Set the default value to the current date in IST
      const currentDate = new Date();
      return (
        currentDate.toLocaleDateString() +
        " , " +
        currentDate.toLocaleTimeString()
      );
    },
  },
});
module.exports = mongoose.model("notes", NotesSchema);
