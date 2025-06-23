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
import { Settings } from "lucide-react";
import { useState } from "react";

export default function CategoryList({
  categories = [],
  handleSelectChildren,
  showCreateCategory,
}) {
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
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const MenuActions = ({ category, handleSelectChildren }) => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
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
              <DropdownMenuItem onClick={() => handleSelectChildren(category.id)}>
                Hiển thị danh mục con
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenCreateDialog(true)}>
                Tạo danh mục con
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hiển thị dialog bên ngoài dropdown */}
      <CreateCategory
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        categoryParent={category}
      />
    </>
  );
};
