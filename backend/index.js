import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();
const app = express();

const _dirname = path.resolve(); // Root of your project

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Make sure this matches your frontend's URL
    credentials: true
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve static files from the frontend/dist folder
app.use(express.static(path.join(_dirname, "frontend", "dist")));

// Catch-all route to serve index.html for frontend
app.get("*", (_, res) => {
    const indexPath = path.join(_dirname, "frontend", "dist", "index.html");
    console.log("Serving index.html from:", indexPath); // Debugging log
    res.sendFile(indexPath);
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
