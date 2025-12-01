import express from "express";
import checkToken from "../middleware/checkToken.js";
import { createTicket } from "../controller/admin/createTicket.controller.js";
import { getNotifHistory } from "../controller/admin/getNotifHistory.controller.js";
import { getAdminGrievances } from "../controller/admin/getAdminGrievances.controller.js";
import { updateTicket } from "../controller/admin/updateTicket.controller.js";

const router = express.Router();

router.post("/createTicket", checkToken, createTicket);
router.get("/getNotifHistory", checkToken, getNotifHistory);
router.get("/grievances", checkToken, getAdminGrievances);
router.put("/:id", checkToken, updateTicket);

export default router;
