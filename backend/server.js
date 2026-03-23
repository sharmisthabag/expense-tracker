const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);

mongoose.connect("mongodb+srv://admin:admin284@cluster0.8wz19j0.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend + DB running 🚀");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});