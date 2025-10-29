import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ ok: true, data: "Expense Tracker API Running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
