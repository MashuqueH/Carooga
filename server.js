const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect to MongoDB
connectDB();

// Define routes
app.use("/api/vehicles", require("./routes/api/vehicles"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    console.log("production");
    // Set static folder
    const root = path.join(__dirname, "client", "build");
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root });
    });
} else {
    console.log("dev");
}

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
