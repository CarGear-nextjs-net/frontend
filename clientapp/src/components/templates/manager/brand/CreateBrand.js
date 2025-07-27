"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { createBrand } from "@/lib/apis/brand-api";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function CreateBrand({ open, setOpen, onCreated }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const handleClose = () => {
    setName("");
    setImage(null);
    setPreview(null);
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("brandName", name);
      formData.append("image", image);

      const res = await createBrand(formData);
      if (res.status === 200) {
        toast.success("Tạo thương hiệu thành công");
        onCreated();
        handleClose();
      } else {
        toast.error("Tạo thương hiệu thất bại");
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {/* Không cần DialogTrigger nữa */}
      <DialogContent className="w-full max-w-[1000px] min-w-[600px] p-3 border-none bg-white z-[1000]">
        <DialogTitle className="text-xl font-bold">Tạo thương hiệu mới</DialogTitle>
        <div className="p-6 bg-white shadow-md rounded w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Tên thương hiệu</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tạo thương hiệu
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
