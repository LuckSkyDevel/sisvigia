import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import gbmRoutes from "./routes/gbmRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/gbm", gbmRoutes);

app.get("/", (_, res) => res.send("API Running 🚀"));

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});