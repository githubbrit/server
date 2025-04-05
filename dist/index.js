"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const sim_route_1 = __importDefault(require("./routes/sim.route"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// ✅ This should be correct:
app.use("/api", product_route_1.default);
app.use("/api", user_route_1.default);
app.use("/api", auth_route_1.default);
app.use("/api", sim_route_1.default);
db_1.sequelize.sync({ alter: true }).then(() => {
    console.log("DB connected");
   console.log("DB connected");
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://server-production-d4eb.up.railway.app`);
});

});
// make a route to generate a password hashed password of the word i right there in this code please i want the hashed format in the console please
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateHashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
});
generateHashedPassword("password123");
