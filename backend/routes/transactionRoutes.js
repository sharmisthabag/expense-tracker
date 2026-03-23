const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET all transactions
router.get("/", async (req, res) => {
    const data = await Transaction.find();
    res.json(data);
});

// ADD transaction
router.post("/", async (req, res) => {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.json(newTransaction);
});

// DELETE transaction
router.delete("/:id", async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;