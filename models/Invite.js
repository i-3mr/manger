// invitation model

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },
  inviterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  programName: {
    type: String,
    required: true,
  },
  inviterName: {
    type: String,
    required: true,
  },
  inviteeEmail: {
    type: String,
    required: true,
  },
  inviteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: {
      values: ["accepted", "rejected", "pending"],
      message: "{VALUE} is not supported, [accepted, rejected, pending]",
    },
    default: "pending",
  },
});

const Invite = mongoose.model("Invitation", schema);

module.exports = Invite;
