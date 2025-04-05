import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Product = sequelize.define("Product", {
  type: { type: DataTypes.STRING },
  nom: { type: DataTypes.STRING },
  prenom: { type: DataTypes.STRING },
  adresse: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  telephone: { type: DataTypes.STRING },
  produit: { type: DataTypes.STRING },
  montant: { type: DataTypes.FLOAT },
  simNumber: { type: DataTypes.STRING },
  mois: { type: DataTypes.STRING },
  etat: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  informations: { type: DataTypes.TEXT },
});

export default Product;
