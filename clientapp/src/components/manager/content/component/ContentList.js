"use client";

import { Pagination } from "@/components/common/Pagination";

export default function ContentList({
  contents = [],
  page,
  setPage,
  totalPages,
}) {
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
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {contents.map((content, index) => (
              <tr key={content.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{content.name}</td>
                <td className="p-3 text-red-600">{content.summary}₫</td>
                <td className="p-3">{content.views}</td>
                <td className="p-3">
                  {content.isPublic ? "Công khai" : "Riêng tư"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
}
