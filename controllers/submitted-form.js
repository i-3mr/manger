// submitted form controllers

const SubmittedForm = require("../models/SubmittedForm");
const Form = require("../models/Form");
const Question = require("../models/Question");

const submitForm = async (req, res) => {
  const formId = req.body.formId; 
  const answers = req.body.answers;
  const username = req.user.username;

  if(!answers?.length || !formId || !username) throw new Error("Invalid data, expected answers as an array, formId and username");

  const form = await Form.findById(formId);

  if (!form) throw new Error("Form not found");

  // questions sort questions by id
  const questions = form.questions.sort((a, b) => a._id - b._id);

  const questionIdsInAnswers = answers.sort(
    (a, b) => a.questionId - b.questionId
  );

  const isFormValid = questions.every(
    (question, index) =>
      question.type === "field" ||
      question.choices.includes(questionIdsInAnswers[index].answer)
  );

  if (!isFormValid) throw new Error("Form is not valid");

  const submittedForm = await SubmittedForm.create({
    username,
    formId,
    answers,
  });

  res.status(201).json({
    message: "Form submitted successfully",
  });
};

module.exports = {
  submitForm,
};