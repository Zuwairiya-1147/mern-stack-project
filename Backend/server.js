import express from 'express';
import dotenv from "dotenv";
import path from "path";
import { connectDB } from './config/db.js';
import authRoutes from "./routes/auth.route.js";
import cors from "cors";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows to  accept json data in req.body

app.use(cors({
  origin: "https://mern-stack-project-tawny.vercel.app",
  credentials: true
}));

app.use("/api/auth", authRoutes);

app.use("/api/products",productRoutes);

// if(process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname,"/Frontend/dist")));

//     app.get(/.*/, (req, res) => {
//         res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
//     });
// }


app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT} `);
});
//TgN0Hsv4zoBOwC5o