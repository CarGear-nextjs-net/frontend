"use client";

import DialogConfirmDelete from "@/components/templates/Common/DialogConfirmDelete";
import { PaginationComponent } from "@/components/templates/Common/Pagination";
import { deleteContentApi } from "@/lib/apis/contents-api";
import { Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CustomerList({ customers = [], page, setPage, totalPages }) {
  const [idSelected, setIdSelected] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const router = useRouter()
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
              <th className="p-3">Tên khách hàng</th>
              <th className="p-3">Email</th>
              <th className="p-3">Số điện thoại</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {customers.map((customer, index) => (
              <tr key={customer.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">{customer.address}</td>
                <td className="p-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 cursor-pointer" onClick={() => {
                      router.push(`/manager/customer/${customer.id}/edit`)
                    }}/>
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
        {customers.length === 0 && (
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
