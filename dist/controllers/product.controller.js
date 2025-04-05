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
exports.updateProduct = exports.addProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const sim_controller_1 = require("./sim.controller");
// Get All Products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProducts = getProducts;
// Get Single Product
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield Product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductById = getProductById;
// Add Product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addProduct = addProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield Product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const previousEtat = product.etat; // Store existing etat
        const newData = req.body;
        yield product.update(newData); // Update product
        // ✅ Check if etat changed
        if (newData.etat && newData.etat !== previousEtat) {
            const command = newData.etat === "OFF" ? "BLOCK" : "UNBLOCK";
            // ✅ Call sendSMSCommand manually
            yield (0, sim_controller_1.sendSMSCommand)({
                body: {
                    simNumber: product.simNumber,
                    command,
                },
            }, {
                status: () => ({
                    json: () => { },
                }),
            });
            console.log(`✔️ Sent "${command}" SMS to ${product.simNumber} due to etat change`);
        }
        res.json({ message: "Product updated", product });
    }
    catch (error) {
        console.error("❌ Error updating product:", error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.updateProduct = updateProduct;
