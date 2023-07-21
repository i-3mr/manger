// Question model

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: {
        values: ["field", "multiple"],
        message:
          "{VALUE} is not supported , ['field','multiple'] are supported",
      },
      required: true,
    },
    choices: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", schema);

module.exports = Question;
