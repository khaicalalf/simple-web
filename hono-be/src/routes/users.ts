import { Hono } from "hono";
import { pool } from "../db.js";
import { hashPassword, comparePassword, generateToken } from "../auth.js";

export const userRoute = new Hono();

// Sign Up
userRoute.post("/signup", async (c) => {
  const { name, email, password } = await c.req.json();
  const hashed = await hashPassword(password);

  const query =
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id,email";
  const { rows } = await pool.query(query, [name, email, hashed]);

  return c.json({ user: rows[0] });
});

// Sign In
userRoute.post("/signin", async (c) => {
  const { email, password } = await c.req.json();
  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  const user = rows[0];

  if (!user) return c.json({ error: "User not found" }, 404);

  const match = await comparePassword(password, user.password);
  if (!match) return c.json({ error: "Invalid credentials" }, 401);

  const token = generateToken({ id: user.id, email: user.email });
  return c.json({ token });
});

// Read All
userRoute.get("/", async (c) => {
  const { rows } = await pool.query(
    "SELECT id, name, email, created_at FROM users"
  );
  return c.json(rows);
});

// Update
userRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  const { name } = await c.req.json();
  await pool.query("UPDATE users SET name=$1 WHERE id=$2", [name, id]);
  return c.json({ message: "User updated" });
});

// Delete
userRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  return c.json({ message: "User deleted" });
});
