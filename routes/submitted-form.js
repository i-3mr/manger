// submitted form routes

const router = require("express").Router();

const {
  submitForm,
  getPublicForm,
  getSubmittedForms,
  getSubmittedForm,
  deleteSubmittedForm,
} = require("../controllers/submitted-form");

router.route("/").post(submitForm).get(getSubmittedForms);
router.route("/:id").get(getSubmittedForm).delete(deleteSubmittedForm);

module.exports = router;
