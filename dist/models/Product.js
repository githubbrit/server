"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const Product = db_1.sequelize.define("Product", {
    type: { type: sequelize_1.DataTypes.STRING },
    nom: { type: sequelize_1.DataTypes.STRING },
    prenom: { type: sequelize_1.DataTypes.STRING },
    adresse: { type: sequelize_1.DataTypes.STRING },
    email: { type: sequelize_1.DataTypes.STRING },
    telephone: { type: sequelize_1.DataTypes.STRING },
    produit: { type: sequelize_1.DataTypes.STRING },
    montant: { type: sequelize_1.DataTypes.FLOAT },
    simNumber: { type: sequelize_1.DataTypes.STRING },
    mois: { type: sequelize_1.DataTypes.STRING },
    etat: { type: sequelize_1.DataTypes.STRING },
    location: { type: sequelize_1.DataTypes.STRING },
    informations: { type: sequelize_1.DataTypes.TEXT },
});
exports.default = Product;
