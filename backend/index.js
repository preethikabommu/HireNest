import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// =================================================================
// CHANGE 1: Dynamic CORS Origin
// Your frontend will have a different URL when deployed (e.g., on Vercel).
// Hardcoding 'http://localhost:5173' will block your live frontend.
// We use an environment variable to set the allowed origin.
// =================================================================
const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Use an environment variable
    credentials:true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


// =================================================================
// CHANGE 2: Connect to DB Before Starting Server
// It's better to ensure the database is connected *before* the server
// starts listening for requests. This prevents the server from running
// if the database connection fails.
// =================================================================
connectDB().then(() => {
    app.listen(PORT,()=>{
        console.log(`Server running at port ${PORT}`);
    });
}).catch((error) => {
    console.log("MongoDB connection failed!", error);
});
