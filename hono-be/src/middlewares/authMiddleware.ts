import { verifyToken } from "../auth.js";
import type { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const auth = c.req.header("Authorization");
  if (!auth) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const token = auth.split(" ")[1];
    if (!token) {
      return c.json({ error: "Invalid token format" }, 401);
    }
    const payload = verifyToken(token);
    c.set("user", payload); // simpan user ke context
    await next(); // lanjut ke handler berikutnya
  } catch (err) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
