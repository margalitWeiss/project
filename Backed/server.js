import express from "express"
import weatherRouter from "./Routers/wether.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/wether",weatherRouter)
let port = process.env.PORT;
app.listen(port,()=>{console.log("app is running on port "+port)})