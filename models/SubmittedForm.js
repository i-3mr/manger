// submitted form model

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      answer: {
        type: String,
        trim: true,
        required: true,
      },
    },
  ],
});

const SubmittedForm = mongoose.model("SubmittedForm", schema);

module.exports = SubmittedForm;
