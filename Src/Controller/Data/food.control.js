import { Food, Food_type } from "../../Model/relation.js";

/*=====================================================> CREATE FOODS FUNCTION  <================================================== */

const food_create = async (req, res) => {
  try {
    let { food_name, food_price, type_id } = req.body;

    const food_data = await Food.create({
      food_avatar: `"../../../uploads/${req.file.filename}`,
      food_name: food_name,
      food_price: food_price,
      type_id: type_id,
    });

    res.status(201).json({ data: food_data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};

/*==========================================================> CREATE FOODS TYPE  <======================================================= */

const type_data = async (req, res) => {
  try {
    let { food_type } = req.body;
    const food_data = await Food_type.create({
      food_type: food_type,
    });

    res.status(201).json(food_data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};

/*==========================================================> FIND ALL FOODS <======================================================= */

const find_date = async (req, res) => {
  try {
    let all_date = await Food.findAll({ include: Food_type });
    res.status(200).json(all_date);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};

/*==========================================================> FIND FOODS WITH ID<======================================================= */

const find_id = async (req, res) => {
  try {
    let { id } = req.params;

    const food_info = await Food.findAll({ where: { food_id: +id } });
    if (food_info) {
      return res.status(200).json({ data: food_info });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};

/*==========================================================> FIND FOODS WITH QUERY<======================================================= */

const find_query = async (req, res) => {
  try {
    const query = req.query;

    if (!Object.keys(query).length) {
      query.page = 1;
      query.limit = 10;
    }

    const data = await Food.findAndCountAll({
      offset: (query.page - 1) * query.limit,
      limit: query.limit
    });   

    res.status(200).json({data});
  } catch (error) {
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};

export default { food_create, type_data, find_date, find_id, find_query};
