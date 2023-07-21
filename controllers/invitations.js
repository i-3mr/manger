// invitations controller

const Invitation = require("../classes/Invitation");
const translation = require("../lang/translation");
const Invite = require("../models/Invite");
const Program = require("../models/Program");
const User = require("../models/User");

const inviteToProgram = async (req, res) => {
  // invite a user to a program
  const { programId, inviteeEmail } = req.body;

  const program = await Program.findOne({
    _id: programId,
    ownerId: req.user._id,
  });

  if (!program) throw new Error(translation.programNotFound.ar);

  const invitee = await User.findOne({ email: inviteeEmail });
  if (!invitee) throw new Error(translation.userNotFound.ar);

  // check if the user is already a contributor
  if (invitee._id.toString() === req.user._id.toString())
    throw new Error(translation.cantInviteYourself.ar);

  // check if there is an invitation already
  const oldInvitation = await Invite.findOne({
    programId,
    inviteeId: invitee._id,
    status: "pending",
  });

  if (oldInvitation) throw new Error(translation.inviteAlreadySent.ar);

  const invite = await Invite.create({
    programId,
    inviterName: req.user.name,
    inviteeId: invitee._id,
    inviterId: req.user._id,
    programName: program.name,
    inviteeEmail,
  });

  res.status(201).json({
    message: translation.inviteSent.ar,
  });
};

const getInvites = async (req, res) => {
  // get all invites for a user
  const invites = await Invite.find({
    inviteeId: req.user._id,
    status: "pending",
  }).select("programName inviterName");
  res.status(200).json(invites);
};

const rejectInvite = async (req, res) => {
  // reject an invite
  const { id: inviteId } = req.params;
  const invite = await Invite.findOneAndUpdate(
    {
      _id: inviteId,
      inviteeId: req.user._id,
    },
    {
      status: "rejected",
    }
  );
  console.log(invite);
  if (!invite) throw new Error(translation.inviteNotFound.ar);

  res.status(200).json({
    message: translation.rejectInvite.ar,
  });
};

const acceptInvite = async (req, res) => {
  // accept an invite

  const { id: inviteId } = req.params;
  const invite = await Invite.findOneAndUpdate(
    {
      _id: inviteId,
      inviteeId: req.user._id,
    },
    {
      status: "accepted",
    }
  );

  if (!invite) throw new Error(translation.inviteNotFound.ar);

  await Program.findByIdAndUpdate(invite.programId, {
    $addToSet: { contributors: req.user._id },
  });

  res.status(200).json({
    message: translation.acceptInvite.ar,
  });
};

const getSentInvites = async (req, res) => {
  // get all invites sent from a user
  const invites = await Invite.find({
    inviterId: req.user._id,
    programId: req.params.id,
  });

  res.status(200).json(invites);
};

module.exports = {
  inviteToProgram,
  getInvites,
  rejectInvite,
  acceptInvite,
  getSentInvites,
};
