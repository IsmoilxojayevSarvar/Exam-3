export async function checkFood(req, res, next) {
  try {
    let { food_name, food_price, type_id } = req.body;
    /*=====================================================> Malumotlar toliq ekanligini tekshirish  <================================================== */

    if (!food_name || !food_price || !type_id) {
      return res
        .status(400)
        .json({ data: "ma'lumotlar toliq kiritilmagan", status: 400 });
    }

    /*=====================================================> Valueni tekshirish  <================================================== */

    if (food_name.length > 20 || food_name.length < 4) {
      return res.status(400).json({ data: "invalide value", status: 400 });
    }

    return next();
  } catch (error) {
    res.status(400).json({ data: "serverda xatolik" });
  }
}
