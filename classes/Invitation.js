const Program = require("../models/Program");
const User = require("../models/User");

class Invitation {
  constructor({ programId, email, inviterName }) {
    this.programId = programId;
    this.email = email;
    this.inviterName = inviterName;
  }

  async send() {
    await Program.findById(this.programId);

    await User.findOneAndUpdate(
      { email: this.email },
      {
        $push: {
          invites: {
            inviterName: this.inviterName,
            programId: this.programId,
          },
        },
      }
    );
  }
}

module.exports = Invitation;
