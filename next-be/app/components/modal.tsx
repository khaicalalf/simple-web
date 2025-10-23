"use client";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  form: {
    title: string;
    description: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{ title: string; description: string }>
  >;
  editPost?: { title: string; description: string } | null;
}

export default function PostModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  editPost,
}: PostModalProps) {
  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {editPost ? "Edit Post" : "Add New Post"}
        </h3>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="modal-action">
          <button onClick={onSubmit} className="btn btn-success">
            {editPost ? "Update" : "Add"}
          </button>
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
