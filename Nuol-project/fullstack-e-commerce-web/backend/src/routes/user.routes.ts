import { Router } from "express";

export const UserRouter = Router();


UserRouter.get("/users",(req,res)=>{
    res.send("welcome to my website");
})
