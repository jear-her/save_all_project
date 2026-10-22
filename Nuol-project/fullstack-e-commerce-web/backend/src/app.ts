import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { UserRouter } from "./routes/user.routes";

dotenv.config();
const app=express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

//security middleware
app.use(helmet());
//cors
app.use(cors())
//routes


app.use("/api",UserRouter)





app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})



