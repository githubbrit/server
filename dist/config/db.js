"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;

const { Sequelize } = require("sequelize");

exports.sequelize = new Sequelize("railway", "root", "bCoEkZcYTHKmieLkbVKcelklJQuKIHlg", {
  host: "mysql.railway.internal",
  port: 3306,
  dialect: "mysql",
});
