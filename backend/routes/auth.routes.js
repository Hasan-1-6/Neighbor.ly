import express from "express"

import loginUser from "../controller/auth/loginUser.controller.js"
import registerAdmin from "../controller/auth/registerAdmin.controller.js";
import registerUser from "../controller/auth/registerUser.controller.js"
import loginAdmin from "../controller/auth/loginAdmin.controller.js";
import checkToken from "../middleware/checkToken.js";
import Logout from "../controller/auth/logout.controller.js";


const router = express.Router();

router.post("/loginAdmin", loginAdmin)
router.post("/loginUser", loginUser)
router.post("/registerAdmin", registerAdmin)
router.post("/registerUser", registerUser)
router.get("/verifyToken", checkToken, (req, res) => res.status(200).json({role : req.role}))
router.post("/logout", Logout)
export default router
