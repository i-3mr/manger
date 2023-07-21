// program controllers

const Invite = require("../models/Invite");
const Program = require("../models/Program");
const User = require("../models/User");

const createProgram = async (req, res) => {
  // create a program and assign it to the user
  const program = await Program.create({
    ...req.body,
    ownerId: req.user._id,
    ownerName: req.user.name,
  });
  res.status(201).json({ program, message: "تم الإنشاء بنجاح" });
};

const getAllPrograms = async (req, res) => {
  // get all programs related to the user
  const programs = await Program.find({ ownerId: req.user._id }).select(
    "name ownerName"
  );

  const invites = await Invite.find({
    inviteeId: req.user._id,
    status: "accepted",
  }).populate({
    path: "programId",
    select: "name ownerName",
  });

  res
    .status(200)
    .json([...programs, ...invites.map((invite) => invite.programId)]);
};

const getProgram = async (req, res) => {
  // get a single program
  const program = await Program.findOne({
    _id: req.params.id,
    ownerId: req.user._id,
  }).populate({
    path: "contributors",
    select: "name",
  });
  if (!program) throw new Error("Program not found");
  res.status(200).json(program);
};

module.exports = {
  createProgram,
  getAllPrograms,
  getProgram,
};
