import { Router } from "express";
import order from "../Controller/Order/order.control.js";
import { checkAdmin } from "../Middleware/CheckAdmin/admin.js";

export const order_router = Router();

order_router .post("/create", checkAdmin, order.order_create) 