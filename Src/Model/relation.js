import { User } from "./User/user.model.js";
import { Food } from "./Foods/food.model.js";
import { Food_type } from "./Foods/foods.type.js";
import { Order } from "./Order/order.js";

Food_type.hasMany(Food, {
    foreignKey: 'type_id'
});


Food.belongsTo(Food_type);
User.belongsToMany(Food, {through: Order});
Food.belongsToMany(User, {through: Order});

User.sync({alter: true});
Food.sync({alter: true});
Food_type.sync({ alter: true });
Order.sync({alter: true})



export {User, Food, Food_type, Order}