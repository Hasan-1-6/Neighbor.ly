import express from "express";
import authRoutes from "./routes/auth.routes.js";
import commonRoutes from "./routes/common.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/common", commonRoutes);

app.get("/", (req, res) => {
  console.log("backend is up bois");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
