"use client";

import DialogConfirmDelete from "@/components/templates/Common/DialogConfirmDelete";
import { PaginationComponent } from "@/components/templates/Common/Pagination";
import { deleteContentApi } from "@/lib/apis/contents-api";
import { getDataGroupNews } from "@/lib/apis/group-news";
import { Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ListGroupNews() {
  const [idSelected, setIdSelected] = useState(null);
  const [dataGroup, setDataGroup] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const router = useRouter();
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

  useEffect(() => {
    async function fetchGroupNews() {
      const params = {
        page,
        pageSize,
        groupId,
        title,
        isPublic: true,
      };

      const data = await getDataGroupNews({ data: params });
      if (data.status == 200) {
        setDataGroup(data.data?.data || []);
        setPage(data.data?.page || 1);
        setTotalPages(data.data?.totalPages || 0);
      }
    }
    fetchGroupNews();
  }, []);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="p-3">STT</th>
              <th className="p-3">Tiêu đề</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {dataGroup.map((content, index) => (
              <tr key={content.articleId} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{content.title}</td>

                <td className="p-3 flex items-center gap-2">
                  <Settings
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => {
                      router.push(`/manager/content/${content.articleId}/edit`);
                    }}
                  />
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
        {dataGroup.length === 0 && (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500 items-center">Không có dữ liệu</p>
          </div>
        )}
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
