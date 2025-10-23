import { verifyToken } from "../auth.js";
import type { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "Unauthorized - no token" }, 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return c.json({ error: "Unauthorized - bad token format" }, 401);
  }

  try {
    const payload = verifyToken(token);
    c.set("user", payload);
    await next();
  } catch (e) {
    console.error("Token verification failed:", e);
    return c.json({ error: "Invalid token" }, 401);
  }
};
