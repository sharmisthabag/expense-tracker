const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    desc: String,
    amount: Number,
    type: String,
    category: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);