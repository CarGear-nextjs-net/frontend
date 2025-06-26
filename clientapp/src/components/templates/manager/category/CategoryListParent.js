"use client";
import CreateCategory from "@/components/templates/manager/category/CreateCategory";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCategoryApi } from "@/lib/apis/categories-api";
import { Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CategoryList({ categories = [], handleSelectChildren, onRefresh }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-md  overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="p-3">Id</th>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3 text-center">
              <span className="sr-only">Thao tác</span>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {categories.map((cate, index) => (
            <tr key={cate.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 ">{cate.name}</td>
              <td className="p-3 ">{cate.description}</td>
              <td className="p-3 text-center">
                <MenuActions
                  key={cate.id}
                  category={cate}
                  handleSelectChildren={handleSelectChildren}
                  onRefresh={onRefresh}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const MenuActions = ({ category, handleSelectChildren, onRefresh }) => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const handleDelete = async () => {
    const res = await deleteCategoryApi(category.id);
    if (res.status === 200) {
      toast.success("Xóa danh mục thành công");
      onRefresh();
      if (category.isParent) {
        handleSelectChildren(null);
      }
    } else {
      toast.error("Xóa danh mục thất bại");
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full">
            <Settings size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cập nhật</DropdownMenuItem>
          {category.isParent === true && (
            <>
              <DropdownMenuItem onClick={() => handleSelectChildren(category)}>
                Hiển thị danh mục con
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenCreateDialog(true)}>
                Tạo danh mục con
              </DropdownMenuItem>
            </>
          )}
          {((category.isParent && category.children.length === 0) || !category.isParent) && (
            <DropdownMenuItem onClick={handleDelete}>Xóa</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hiển thị dialog bên ngoài dropdown */}
      <CreateCategory
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        categoryParent={category}
        onCreated={onRefresh}
      />
    </>
  );
};
