import { Hono } from "hono";
import { pool } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const postRoute = new Hono();
postRoute.use("*", authMiddleware);
// Add Post
postRoute.post("/add", async (c) => {
  const { title, description } = await c.req.json();

  const query =
    "INSERT INTO posts (title, description) VALUES ($1,$2) RETURNING id,title, description";
  const { rows } = await pool.query(query, [title, description]);

  return c.json({ post: rows[0] });
});

// Read All
postRoute.get("/", async (c) => {
  const { rows } = await pool.query(
    "SELECT id, title, description, created_at FROM posts ORDER BY id DESC"
  );
  return c.json(rows);
});

//Read one
postRoute.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const { rows } = await pool.query(
      "SELECT id, title, description, created_at FROM posts WHERE id=$1",
      [id]
    );
    if (rows.length === 0) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(rows[0]);
  } catch (err) {
    console.error("GET /posts/:id error:", err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// Update
postRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  const { title, description } = await c.req.json();
  await pool.query("UPDATE posts SET title=$1, description=$2 WHERE id=$3", [
    title,
    description,
    id,
  ]);
  return c.json({ message: "Post updated" });
});

// Delete
postRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await pool.query("DELETE FROM posts WHERE id=$1", [id]);
  return c.json({ message: "Post deleted" });
});
