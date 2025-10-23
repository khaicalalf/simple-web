"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface post {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<post | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await apiFetch(`/protected/posts/${params.id}`);
        setPost(data);
      } catch {
        setError("post not found or unauthorized");
      }
    };
    if (params.id) fetchPost();
  }, [params.id]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="alert alert-error w-full max-w-md shadow-lg">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="flex justify-between items-center mb-2">
            <h2 className="card-title text-2xl font-bold">👤 Post Detail</h2>
            <span className="badge badge-neutral">ID: {post.id}</span>
          </div>
          <div className="min-w-full flex items-end justify-end justify-items-end">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(post.created_at).toLocaleString()}
          </div>
          <div className="divider my-2"></div>
          <p className="text-lg">
            <span className="font-semibold">Title:</span> {post.title}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Content:</span>
            <br /> {post.description}
          </p>

          <div className="card-actions justify-end mt-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="btn btn-outline btn-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
