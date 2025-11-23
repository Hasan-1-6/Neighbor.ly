import express from "express";
import checkToken from "../middleware/checkToken";
import createApart from "../controller/admin/createApart.controller";
import deleteApart from "../controller/admin/deleteApart.controller";
import viewApart from "../controller/admin/viewApart.controller";

const router = express.Router();

router.post("/admin/createApart", checkToken, createApart);
router.post("/admin/deleteApart", checkToken, deleteApart);
router.get("/admin/viewAparts", checkToken, viewApart);
