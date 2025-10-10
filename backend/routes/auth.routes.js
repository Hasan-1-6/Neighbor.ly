import express from "express"

import loginUser from "../controller/auth/loginUser.controller.js"
import registerAdmin from "../controller/auth/registerAdmin.controller.js";


const router = express.Router();

router.post("/login", loginUser);
router.post("/adminRegister", registerAdmin )

export default router
