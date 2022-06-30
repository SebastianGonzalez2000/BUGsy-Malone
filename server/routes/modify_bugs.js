const express = require("express");
const router = express.Router();

const bugsController = require("../controllers/bugs");

router
  .route("/modify_bugs")
  .post(bugsController.createBug)
  .get(bugsController.getAllBugs)
  .put(bugsController.updateBug);

router.route("/modify_bugs/:bugId").delete(bugsController.deleteBug);

module.exports = router;
