import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("sim800c", "root", "Password@123", {
  host: "localhost",
  dialect: "mysql",
});
