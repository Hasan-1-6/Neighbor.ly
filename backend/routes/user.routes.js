import express from "express";
const router = express.Router();

import getActiveUserGrievances from "../controller/user/getActiveUserGrievances.controller.js";
import getResolvedUserGrievances from "../controller/user/getResolvedUserGrievances.controller.js";
import getAllUserGrievances from "../controller/user/getAllUserGrievances.controller.js";
import createPayment from "../controller/user/createPayment.controller.js";
import getPaymentHistory from "../controller/user/getPaymentHistory.controller.js";
import checkToken from "../middleware/checkToken.js";

// Grievances
router.get("/grievances/active", checkToken, getActiveUserGrievances);
router.get("/grievances/resolved", checkToken, getResolvedUserGrievances);
router.get("/grievances/all", checkToken, getAllUserGrievances);

// Payment
router.post("/payment", checkToken, createPayment);
router.get("/payment-history", checkToken, getPaymentHistory);

export default router;
