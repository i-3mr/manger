// User/Organization model

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, 
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide a valid email!",
      ],
    },
    password: {
      type: String,
      minlength: 8,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// hash the password before saving it to the database
schema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

// create a token for the user
schema.methods.createToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

// check if the password is valid
schema.methods.checkPassword = async function (password) {
  const passwordHash = this.password;
  try {
    const matches = await bcrypt.compare(password, passwordHash);
    if (!matches) throw new Error("Password is incorrect");
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User", schema);

module.exports = User;
