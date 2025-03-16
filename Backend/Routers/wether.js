import {Router} from "express"
import {getWeather} from "../Controllers/wether.js"
const router =Router();
router.get("/:city",getWeather);
export default router;