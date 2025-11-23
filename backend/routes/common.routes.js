import express from "express";
import checkToken from "../middleware/checkToken.js";
import getAdmins from "../controller/commonView/getAdmins.controller.js";

const router = express.Router();

router.get("/getAdmins", checkToken, getAdmins);

export default router;
