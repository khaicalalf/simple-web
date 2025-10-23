"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import PostModal from "../components/modal";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  description: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const router = useRouter();

  const fetchPost = async () => {
    try {
      const data = await apiFetch("/protected/posts");
      setPosts(data);
    } catch {
      setError("Unauthorized, please sign in again");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }
    // Defer fetching so setState isn't called synchronously within the effect
    const t = setTimeout(() => {
      fetchPost();
    }, 0);
    return () => clearTimeout(t);
  }, [router]);

  const handleSave = async () => {
    try {
      if (editPost) {
        await apiFetch(`/protected/posts/${editPost.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: form.title,
            description: form.description,
          }),
        });
      } else {
        await apiFetch("/protected/posts/add", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setForm({ title: "", description: "" });
      setEditPost(null);
      setOpenModal(false);
      fetchPost();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus Post ini?")) return;
    await apiFetch(`/protected/posts/${id}`, { method: "DELETE" });
    fetchPost();
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🪐 Dashboard</h1>
        <button onClick={logout} className="btn btn-error btn-sm">
          Logout
        </button>
      </div>

      {error && <p className="text-error mb-4">{error}</p>}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        <button
          onClick={() => {
            setEditPost(null);
            setForm({ title: "", description: "" });
            setOpenModal(true);
          }}
          className="btn btn-primary btn-sm"
        >
          + Add New Post
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-300">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-400">
                  No posts found
                </td>
              </tr>
            )}
            {posts.map((p) => (
              <tr key={p.id}>
                <td>
                  {" "}
                  <Link
                    href={`/posts/${p.id}`}
                    className="btn btn-ghost btn-xs no-underline normal-case hover:bg-base-200"
                  >
                    {p.title}
                  </Link>
                </td>
                <td>{p.description}</td>
                <td className="text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditPost(p);
                      setForm({ title: p.title, description: p.description });
                      setOpenModal(true);
                    }}
                    className="btn btn-warning btn-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      <PostModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSave}
        form={form}
        setForm={setForm}
        editPost={editPost}
      />
    </div>
  );
}
