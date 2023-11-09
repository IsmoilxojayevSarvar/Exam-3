import { User, Food } from "../relation.js";
import { Model, DataTypes, UUIDV1 } from "sequelize";
import newSequlize from "../../Config/index.js";

export class Order extends Model {}

Order.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
      allowNull: false,
    },
    meal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Food,
        key: "food_id",
      },
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    count: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "order",
  }
);
