// public form controllers

const Form = require("../models/Form");
const Question = require("../models/Question");

const getPublicForm = async (req, res) => {
  const formId = req.params.id;

  const form = await Form.findById(formId).select("questions title").populate({
    path: "questions",
    select: "title type choices",
  });

  if (!form) throw new Error("Form not found");

  res.status(200).json(form);
};

module.exports = {
  getPublicForm,
};
