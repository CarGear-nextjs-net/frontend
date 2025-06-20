"use client";

import DialogConfirmDelete from "@/components/templates/Common/DialogConfirmDelete";
import { PaginationComponent } from "@/components/templates/Common/Pagination";
import { deleteContentApi } from "@/lib/apis/contents-api";
import { Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContentList({ contents = [], page, setPage, totalPages }) {
  console.log("🚀 ~ totalPages:", totalPages);
  const [idSelected, setIdSelected] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleDelete = async () => {
    if (!idSelected) {
      toast.error("Vui lòng chọn bài viết để xóa");
      return;
    }
    try {
      const res = await deleteContentApi({ id: idSelected });
      if (res.status === 200) {
        toast.success("Xóa bài viết thành công");
        setIdSelected(null);
        setOpenModalDelete(false);
        setPage(1);
      }
    } catch (e) {
      toast.error("Xóa bài viết thất bại");
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Tên bài viết</th>
              <th className="p-3">Mô tả</th>
              <th className="p-3">Lượt xem</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {contents.map((content, index) => (
              <tr key={content.articleId} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{content.title}</td>
                <td className="p-3 text-red-600">{content.summary}₫</td>
                <td className="p-3">{content.views}</td>
                <td className="p-3">{content.isPublic ? "Công khai" : "Riêng tư"}</td>
                <td className="p-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 cursor-pointer" />
                  <Trash2
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      setIdSelected(content.articleId);
                      setOpenModalDelete(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
      <DialogConfirmDelete
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        onConfirm={handleDelete}
        onCancel={() => {
          setIdSelected(null);
          setOpenModalDelete(false);
        }}
      />
    </>
  );
}
