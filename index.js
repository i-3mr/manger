require("dotenv").config({ path: "./.env" });

require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// routes
const authRoutes = require("./routes/auth");
const programRoutes = require("./routes/program");
const invitationRoutes = require("./routes/invitation");
const formRoutes = require("./routes/form");
const publicFormRoutes = require("./routes/public-form");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const checkAuth = require("./middleware/check-auth");
const notFound = require("./middleware/not-found");

// auth routes
app.use("/api/v1/auth", authRoutes);

//* public routes
app.use("/api/v1/public-forms", publicFormRoutes);

//!- check authentication
app.use(checkAuth);

//* private routes
app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/invitations", invitationRoutes);
app.use("/api/v1/forms", formRoutes);

// notFound
app.use(notFound);
// error handler
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
