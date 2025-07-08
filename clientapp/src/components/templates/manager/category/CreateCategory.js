"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createCategoryApi } from "@/lib/apis/categories-api";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function CreateCategory({ categoryParent = null, open, setOpen, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [parentId, setParentId] = useState(categoryParent?.id || "");
  const handleClose = () => {
    setName("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setParentId(categoryParent?.id || "");
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", name);
    formData.append("description", description);
    formData.append("parentId", categoryParent ? parentId : 0);
    formData.append("icon", image);

    const res = await createCategoryApi(formData);
    if (res.categoryId) {
      toast.success("Tạo danh mục thành công");
      onCreated();
      handleClose();
    } else {
      toast.error("Tạo danh mục thất bại");
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {/* Không cần DialogTrigger nữa */}
      <DialogContent className="w-full max-w-[1000px] min-w-[600px] p-3 border-none bg-white z-[1000]">
        <DialogTitle className="text-xl font-bold">Tạo danh mục mới</DialogTitle>
        <div className="p-6 bg-white shadow-md rounded w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Tên danh mục</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Mô tả</label>
              <textarea
                className="w-full p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 font-medium">Icon</label>
              <>
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-2"
                >
                  Chọn ảnh
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageURL = URL.createObjectURL(file);
                      setPreview(imageURL);
                      setImage(file);
                    }
                  }}
                />
                {preview && (
                  <div className="relative mt-2 w-32 h-32 border rounded overflow-hidden">
                    <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                        setImage(null);
                      }}
                      className="absolute top-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </>
            </div>

            {categoryParent && (
              <div>
                <label className="block mb-1 font-medium">Danh mục cha</label>
                <select
                  className="w-full p-2 border rounded"
                  value={parentId}
                  disabled
                  onChange={(e) => setParentId(e.target.value)}
                >
                  <option value={categoryParent.id}>{categoryParent.name}</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tạo danh mục
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
