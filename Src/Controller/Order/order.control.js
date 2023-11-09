import { Order } from "../../Model/relation.js";

/*==========================================================> CREATE ORDER  <======================================================= */

const order_create = async (req, res) => {
  try {

    let { user_id, meal_id, paid, count } = req.body;
 
    const create_data = await Order.create({user_id: user_id, meal_id: meal_id, paid: paid, count: count})

    res.status(201).json({data: create_data})

  } catch (error) {
    res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  }
};

export default {order_create}