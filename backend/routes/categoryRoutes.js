import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ ok: false, error: "Category name is required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res
        .status(400)
        .json({ ok: false, error: "Category already exists" });
    }

    const newCategory = await Category.create({
      name,
      createdAt: new Date(),
    });

    return res.status(201).json({ ok: true, data: newCategory });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ ok: true, data: categories });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
