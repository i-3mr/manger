// questions form route

const router = require("express").Router();

const {
  createForm,
  getForm,
  updateForm,
  deleteForm,
  getForms,
  deleteQuestion,
} = require("../controllers/form");

router.route("/").post(createForm).get(getForms);
router.route("/:id").get(getForm).patch(updateForm).delete(deleteForm);
router.route("/:formId/questions/:questionId").delete(deleteQuestion);

module.exports = router;
