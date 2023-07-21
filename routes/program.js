// program routes

const router = require("express").Router();
const {
  createProgram,
  getAllPrograms,
  getProgram,
} = require("../controllers/program");

router.route("/").post(createProgram).get(getAllPrograms);
router.route("/:id").get(getProgram);

module.exports = router;
