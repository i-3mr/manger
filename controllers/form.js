// questions form controllers

const Form = require("../models/Form");
const Program = require("../models/Program");
const Question = require("../models/Question");

const createForm = async (req, res) => {
  const ownerId = req.user._id;
  const { programId, title } = req.body;

  const program = await Program.findOne({
    _id: programId,
    ownerId,
  });

  if (!program) throw new Error("Program not found");

  const form = await Form.create({
    ownerId,
    title,
    programId,
  });

  res.status(201).json({
    message: "Form created successfully",
    form,
  });
};

const updateForm = async (req, res) => {
  const formId = req.params.id;
  const questions = req.body.questions;

  if (!questions?.length)
    throw new Error("Questions are required as an array of size 1 or more");

  const form = await Form.findOne({
    _id: formId,
    ownerId: req.user._id,
  });

  if (!form) throw new Error("Form not found");

  const questionIds = await Promise.all(
    questions.map(async (question) =>
      questionBuilder({ question, formId }).then(({ _id }) => _id)
    )
  );

  await Form.findByIdAndUpdate(
    formId,
    {
      $addToSet: { questions: { $each: questionIds } },
    },
    { runValidators: true }
  );

  res.status(200).json({
    message: "Form updated successfully",
    ids: questionIds,
  });
};

const questionBuilder = async ({ question, formId }) => {
  if (question._id) {
    return await Question.findByIdAndUpdate(question._id, question, {
      runValidators: true,
    });
  }

  // delete _id from question object
  delete question._id;

  return await Question.create({
    ...question,
    formId,
  });
};

const getForm = async (req, res) => {
  const formId = req.params.id;

  const form = await Form.findOne({
    _id: formId,
    ownerId: req.user._id,
  })
    .sort({
      createdAt: -1,
    })
    .populate("questions");



  if (!form) throw new Error("Form not found");

  res.status(200).json({
    message: "Form retrieved successfully",
    form,
  });
};

const getForms = async (req, res) => {
  const programId = req.query.programId;
  if (!programId)
    throw new Error("Program id is required as a query parameter");

  const forms = await Form.find(
    {
      ownerId: req.user._id,
      programId,
    },
    { runValidators: true }
  ).select("title");

  res.status(200).json({
    message: "Forms retrieved successfully",
    forms,
  });
};

const deleteForm = async (req, res) => {
  const formId = req.params.id;

  const form = await Form.findOneAndDelete({
    _id: formId,
    ownerId: req.user._id,
  });

  if (!form) throw new Error("Form not found");

  res.status(200).json({
    message: "Form deleted successfully",
  });
};

const deleteQuestion = async (req, res) => {
  const { questionId, formId } = req.params;

  // to ensure that the question belongs to the person who is deleting it
  const form = await Form.findOne({
    _id: formId,
    ownerId: req.user._id,
  });

  if (!form) throw new Error("Form not found");

  const question = await Question.findOneAndDelete({
    _id: questionId,
    formId,
  });

  if (!question) throw new Error("Question not found");

  res.status(200).json({
    message: "Question deleted successfully",
  });
};

module.exports = {
  createForm,
  updateForm,
  getForm,
  getForms,
  deleteForm,
  deleteQuestion,
};
