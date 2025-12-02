import express from "express";
import checkToken from "../middleware/checkToken.js";
import createApart from "../controller/admin/createApart.controller.js";
import deleteApart from "../controller/admin/deleteApart.controller.js";
import viewApart from "../controller/admin/viewApart.controller.js";
import viewFloors from "../controller/admin/viewFloors.controller.js";
import viewFlats from "../controller/admin/viewFlats.controller.js";
import viewResidents from "../controller/admin/viewResidents.controller.js";
import deleteResident from "../controller/admin/deleteResident.controller.js";
import getPaymentHistory from "../controller/admin/getPaymentHistory.controller.js";
import updateDueRent from "../controller/admin/updateDueRent.controller.js";

const router = express.Router();

router.post("/createApart", checkToken, createApart);
router.post("/deleteApart", checkToken, deleteApart);
router.get("/viewAparts", checkToken, viewApart);
router.post("/viewFloors", checkToken, viewFloors);
router.post("/viewFlats", checkToken, viewFlats);
router.get("/viewResidents", checkToken, viewResidents);
router.post("/deleteResident", checkToken, deleteResident);
router.get("/payment-history", checkToken, getPaymentHistory);
router.post("/update-due-rent", checkToken, updateDueRent);

export default router;