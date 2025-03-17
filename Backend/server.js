import express from "express";
import weatherRouter from "./Routers/wether.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json()); // Enables parsing JSON request bodies
app.use(cors()); // Allows cross-origin requests

app.use("/api/wether", weatherRouter); // Mounts the weather router

let port = process.env.PORT;
app.listen(port, () => { 
    console.log("App is running on port " + port);
});
