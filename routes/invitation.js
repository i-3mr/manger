// invitations router

const router = require("express").Router();

const {
  inviteToProgram,
  getInvites,
  acceptInvite,
  rejectInvite,
  getSentInvites,
} = require("../controllers/invitations");

router.use((req, res) => {
  res.status(400).json({
    message: "هذه الميزة غير متوفرة حاليا",
  });
});
router.route("/").post(inviteToProgram).get(getInvites);
router
  .route("/:id")
  .get(getSentInvites)
  .patch(acceptInvite)
  .delete(rejectInvite);

module.exports = router;
