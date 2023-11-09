import { Router } from "express";
import users from "../Controller/Users/user.controller.js";
import { checkAdmin } from "../Middleware/CheckAdmin/admin.js";
import { user_check } from "../Middleware/Users/users.check.js";

export const user_router = Router();

user_router
  .get("/find", checkAdmin, users.find_users)
  .get("/find/:id", checkAdmin, users.find_id_user)
  .post("/register", user_check, users.user_register)
  .post("/login", users.user_login);
