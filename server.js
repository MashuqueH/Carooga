const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Init middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use("/api/vehicles", require("./routes/api/vehicles"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    console.log("production");
    // Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    console.log("dev");
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
