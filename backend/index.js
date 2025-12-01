import express from "express";
import authRoutes from "./routes/auth.routes.js";
import commonRoutes from "./routes/common.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from 'dotenv'

export const app = express();
dotenv.config();
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/common", commonRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  console.log("backend is up bois");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
