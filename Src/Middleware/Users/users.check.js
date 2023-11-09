import { User } from "../../Model/User/user.model.js";

export async function user_check(req, res, next) {
  try {
    let { full_name, email, password } = req.body;

    /*=====================================================> User oldin registratsiadan otgan yoki otmaganligini tekshirish  <================================================== */

    let existingChack = await User.findAll({ where: { email: email } });
    if (existingChack.length) {
      return res
        .status(409)
        .json({ data: "this email already exists", status: 409 });
    }

    /*=====================================================> Malumotlar toliq ekanligini tekshirish <================================================== */

    if (!full_name || !email || !password) {
      return res
        .status(400)
        .json({ data: "ma'lumotlar toliq kiritilmagan", staus: 400 });
    }

    /*=========================================================> Password malumotini tekshirish <======================================================= */

    if(password.length < 4) {
      return res.status(400).json({data: "invalide password", status: 400})
    }

    /*=====================================================> Kelayotgan ma'lumotni tipini tekshirish <================================================== */

    if (
      full_name.length < 3 ||
      !isNaN(full_name) ||
      /[@#!$%^&*:']/g.test(full_name)
    ) {
      return res.status(400).json({ data: "Invalid value", staus: 400 });
    }

    /*===============================================================> Successful request ! <=========================================================== */

    return next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ data: "serverda xatolik ☹" });
  }
}
