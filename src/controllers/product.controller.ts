import { Request, Response } from "express";
import Product from "../models/Product";
import { sendSMSCommand } from "./sim.controller";

// Get All Products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Product
export const getProductById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Add Product
export const addProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const product: any = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const previousEtat = product.etat; // Store existing etat
    const newData = req.body;

    await product.update(newData); // Update product

    // ✅ Check if etat changed
    if (newData.etat && newData.etat !== previousEtat) {
      const command = newData.etat === "OFF" ? "BLOCK" : "UNBLOCK";

      // ✅ Call sendSMSCommand manually
      await sendSMSCommand(
        {
          body: {
            simNumber: product.simNumber,
            command,
          },
        } as Request,
        {
          status: () => ({
            json: () => {},
          }),
        } as unknown as Response
      );

      console.log(
        `✔️ Sent "${command}" SMS to ${product.simNumber} due to etat change`
      );
    }

    res.json({ message: "Product updated", product });
  } catch (error: any) {
    console.error("❌ Error updating product:", error.message);
    res.status(500).json({ error: error.message });
  }
};
