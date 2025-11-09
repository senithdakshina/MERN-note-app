import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
       await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };


  const handleSave = async() =>{
    if (!note) return;
    const title = (note.title || "").trim();
    const content = (note.content || "").trim();
    if (!title || !content) {
      toast.error("Please add title and content before submitting!");
      return;
    }

  //  const res = await api.get(`/notes/${id}`);
    setSaving(true)

    try {
       await api.put(`/notes/${id}`, note);
      toast.success("Note edit successfully!!!")
      navigate("/");
    } catch (error) {
      toast.error("Eror editing data!!!")
    }finally{
      setSaving(false)
    }


  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header section */}
        <div className="max-w-2xl mx-auto flex justify-between items-center mb-6">
          <Link to="/" className="btn btn-primary flex items-center gap-2">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="btn flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white border-none px-5"
          >
            <Trash2Icon className="h-5 w-5" />
            Delete Note
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100 shadow-md p-6 space-y-6">
            {/* Title Field */}
            <div className="form-control w-full">
              <label className="label mb-1">
                <span className="label-text text-base font-semibold">
                  Title
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter note title"
                className="input input-bordered w-full"
                value={note.title || ""}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            {/* Content Field */}
            <div className="form-control w-full">
              <label className="label mb-1">
                <span className="label-text text-base font-semibold">
                  Content
                </span>
              </label>
              <textarea
                placeholder="Write your note content..."
                className="textarea textarea-bordered w-full min-h-[180px]"
                value={note.content || ""}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="card-actions justify-end">
              <button
                className={`btn flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white border-none px-5 ${
                  saving ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
