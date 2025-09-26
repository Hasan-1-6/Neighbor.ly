import prisma from "./db/postgresql";
import express from express
import cookieParser from "cookie-parser";
import cors from cors

export default app = express();
app.use(cors({
    origin : "https://localhost:5173",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser());

app.get("/", (res, req)=> res.status(200).json({message : "backend is running"}) )

app.listen(prompt, ()=>{
    console.log(`server listening at port ${port}`)
})

