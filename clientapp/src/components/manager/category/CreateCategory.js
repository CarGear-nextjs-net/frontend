'use client'
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {useState} from "react";

export default function CreateCategory({ categoryParent = null, open, setOpen, onCreated  }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [parentId, setParentId] = useState(categoryParent?.id || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoryData = {
            name,
            description,
            parentId: categoryParent ? parentId : null,
        };

        console.log("Category Submitted:", categoryData);

        if (onCreated) onCreated(categoryData);

        setName("");
        setDescription("");
        setParentId(categoryParent?.id || "");
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Không cần DialogTrigger nữa */}
            <DialogContent className="w-full max-w-[1000px] min-w-[600px] p-0 border-none bg-white z-[1000]">
            <DialogTitle className="text-xl font-bold mb-4">Tạo danh mục mới</DialogTitle>
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

                        {categoryParent && (
                            <div>
                                <label className="block mb-1 font-medium">Danh mục cha</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={parentId}
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
