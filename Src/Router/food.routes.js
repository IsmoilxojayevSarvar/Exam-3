import { Router } from "express";
import base from "../Controller/Data/food.control.js";
import { checkFood } from "../Middleware/CheckF/food.check.js";
import { checkAdmin } from "../Middleware/CheckAdmin/admin.js";
import { upload } from "../Utils/multer.js";

export const food_router = Router();

food_router
  .get("/foods", base.find_date)
  .get("/food/:id", base.find_id)
  .get("/food", base.find_query)
  .post(
    "/food",
    upload.single("food_avatar"),
    checkAdmin,
    checkFood,
    base.food_create
  )
  .post("/type", checkAdmin, base.type_data);
