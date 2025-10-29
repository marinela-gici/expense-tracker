import express from "express";
import Expense from "../models/Expense.js";
import dotenv from "dotenv";
import { sendBudgetAlert } from "../services/emailService.js";

dotenv.config();

const router = express.Router();
const BUDGET_LIMIT = process.env.BUDGET_LIMIT
  ? Number(process.env.BUDGET_LIMIT)
  : 1000;

router.post("/", async (req, res) => {
  try {
    const { categoryId, amount, description } = req.body;
    if (!categoryId || !amount) {
      return res.status(400).json({
        ok: false,
        error: "Both categoryId and amount are required",
      });
    }

    const newExpense = await Expense.create({
      categoryId,
      amount,
      description,
      createdAt: new Date(),
    });

    const populatedExpense = await newExpense.populate("categoryId", "name");

    const total = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalAmount = total[0]?.total || 0;

    if (totalAmount > BUDGET_LIMIT) {
      sendBudgetAlert({
        to: process.env.ALERT_EMAIL,
        subject: "Budget Exceeded!",
        text: `Alert! Your total expenses are $${totalAmount}, exceeding your budget.`,
      });
    }

    return res.status(201).json({ ok: true, data: populatedExpense });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().populate("categoryId", "name");
    return res.status(200).json({ ok: true, data: expenses });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ ok: false, error: "Expense not found" });
    }

    return res.status(200).json({ ok: true, data: deleted });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
