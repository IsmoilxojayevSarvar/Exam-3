import { Model, DataTypes } from "sequelize";
import newSequlize from "../../Config/index.js";

export class Food extends Model {}

Food.init(
  {
    food_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    food_avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    food_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    food_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    // type_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  },
  {
    sequelize: newSequlize,
    tableName: "foods_table",
  }
);
