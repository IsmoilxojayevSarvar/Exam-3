import { User } from "../../Model/relation.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

/*=====================================================> FIND ALL USERS  <===================================================== */

const find_users = async (req,res) => {
  try {
     const data_user = await User.findAll()
     if(data_user) {
      return res.status(200).json({data: data_user});
     } else {
      return res.status(404).json({data: "notfound users", stauts: 404});
     }
  } catch (error) {
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
}

/*=====================================================> FIND ALL USERS WITH ID  <===================================================== */

const find_id_user = async (req, res) => {
  try {
    let { id } = req.params;

    const user_info = await User.findAll({ where: { user_id: +id } });
    if (user_info) {
      return res.status(200).json({ data: user_info });
    }
  } catch (error) {
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};


/*=====================================================> REGSITER FUNCTION  <================================================== */

const user_register = async (req, res) => {
  try {
    let { full_name, email, password } = req.body;

    const secret_key = process.env.secret_key;
    const password_hash = await bcrypt.hash(password, 5);

    const created_user = await User.create({
      full_name: full_name,
      email: email,
      is_admin: false,
      password: password_hash,
    });

    let { user_id } = created_user;
    let token = jwt.sign({ user_id }, secret_key);

    res
      .status(201)
      .json({ data: { full_name: full_name, email: email, token: token } });
  } catch (error) {
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};

/*=======================================================> LOGIN FUNCTION  <==================================================== */

const user_login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const secret_key = process.env.secret_key;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      if (password_valid) {
        let { user_id } = user;
        let token = jwt.sign({ user_id }, secret_key);
        return res
          .status(200)
          .json({
            data: {
              full_name: user.full_name,
              email: user.email,
              token: token,
            },
          });
      } else {
        return res.status(404).json({ data: "wrong password", status: 404 });
      }
    }

    if (!user) {
      return res
        .status(404)
        .json({ data: "this email not found", status: 404 });
    }
  } catch (error) {
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};

export default { user_register, user_login, find_users, find_id_user };