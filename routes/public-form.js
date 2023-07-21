// public form routes

const router = require("express").Router();

const { getPublicForm } = require("../controllers/public-form");

router.route("/:id").get(getPublicForm);

module.exports = router;
