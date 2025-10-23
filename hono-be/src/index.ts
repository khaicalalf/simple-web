import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { userRoute } from "./routes/users.js";
import { cors } from "hono/cors";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = new Hono();

app.use("*", cors());
app.use("/protected/*", authMiddleware);
app.get("/", (c) => c.text("Hono Public Auth API Ready 🚀"));
app.route("/protected/users", userRoute);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});

console.log(`Server running on http://localhost:${process.env.PORT}`);
