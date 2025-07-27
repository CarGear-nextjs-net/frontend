"use client";
import CreateBrand from "@/components/templates/manager/brand/CreateBrand";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBrand } from "@/lib/apis/brand-api";
import { Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function BrandList({ brands = [], handleSelectChildren, onRefresh }) {
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
          {brands.map((brand, index) => (
            <tr key={brand.brandId} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 ">{brand.brandName}</td>
              <td className="p-3 text-center">
                <MenuActions
                  key={brand.brandId}
                  brand={brand}
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
const MenuActions = ({ brand, handleSelectChildren, onRefresh }) => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const handleDelete = async () => {
    const res = await deleteBrand(brand.brandId);
    if (res.status === 200) {
      toast.success("Xóa thương hiệu thành công");
      onRefresh();
    } else {
      toast.error("Xóa thương hiệu thất bại");
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
          {/* <DropdownMenuItem>Cập nhật</DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleDelete}>Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hiển thị dialog bên ngoài dropdown */}
      <CreateBrand open={openCreateDialog} setOpen={setOpenCreateDialog} onCreated={onRefresh} />
    </>
  );
};
