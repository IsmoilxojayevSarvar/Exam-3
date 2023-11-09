import jwt from "jsonwebtoken";
import { User } from "../../Model/relation.js";
import "dotenv/config";

export async function checkAdmin(req, res, next) {
  try {
    let secret_key = process.env.secret_key;

    const { token } = req.headers;
    const payload = jwt.verify(token, secret_key);

    if(payload) {
        let { user_id } = payload;
        const user_date = await User.findOne({ where: { user_id: user_id } });
        let {is_admin} = user_date;

        if(is_admin === true) {
            return next();
        } 
        if(is_admin === false) {
            return res.status(405).json({data: "you are not admin.", status: 405})
        }
    }

  } catch (error) {
    if(error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({error: 'invalide token'})
    }
    res.status(400).json({ data: "serverda xatolik." });
  }
}
