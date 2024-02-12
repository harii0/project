const express = require("express");
const router = express.Router();

const {
  handleGetDoctor,
  handleApproveDoctor,
  handleRejectDoctor,
  handleGetAllDoctors,
} = require("../controllers/doctorController");

router.route("/applications/user/:userId").get(handleGetDoctor);

router.route("/applications/user/:userId/approve").put(handleApproveDoctor);

router.route("/applications/user/:userId/reject").put(handleRejectDoctor);

router.route("/get-doctor").get(handleGetAllDoctors);

module.exports = router;
