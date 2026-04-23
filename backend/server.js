const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/grievances", grievanceRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Database Connected"))
.catch(err=>console.log(err));

app.listen(5000,()=>{
console.log("Server running on port 5000");
});