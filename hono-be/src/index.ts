import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { userRoute } from "./routes/users.js";
import { cors } from "hono/cors";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { postRoute } from "./routes/posts.js";

dotenv.config();

const app = new Hono();

app.use("*", cors());
app.get("/", (c) => c.text("Hono Public Auth API Ready 🚀"));
app.use("/protected/*", authMiddleware);
app.route("/users", userRoute);
app.route("/protected/posts", postRoute);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});

console.log(`Server running on http://localhost:${process.env.PORT}`);
