import "dotenv/config";
import express from "express";
import { user_router } from "./Router/user.routes.js";
import { food_router } from "./Router/food.routes.js";
import { order_router } from "./Router/order.routes.js";
import path from "path";

async function server() {
  try {
    const PORT = process.env.PORT || 1500;
    const app = express();


    app.use(express.json());
    app.use("/user", user_router);
    app.use("/data", food_router);
    app.use("/order", order_router)
    app.use(express.static(path.join(path.resolve(), 'uploads')));


    app.listen(PORT, console.log("server is running on " + PORT + " port."));
  } catch (error) {
    console.error(error.message);
  }
}

server();