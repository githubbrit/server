import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from "./routes/product.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import simRoutes from "./routes/sim.route";
import { sequelize } from "./config/db";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ This should be correct:
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", simRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

// make a route to generate a password hashed password of the word i right there in this code please i want the hashed format in the console please
import bcrypt from "bcrypt";
const generateHashedPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hashed Password:", hashedPassword);
};
generateHashedPassword("password123");
