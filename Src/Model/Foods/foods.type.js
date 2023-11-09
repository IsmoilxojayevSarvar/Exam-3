import { Model, DataTypes } from "sequelize";
import newSequlize from "../../Config/index.js";

export class Food_type extends Model {}

Food_type.init(
  {
    food_type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    food_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "food_type"
  }
);
