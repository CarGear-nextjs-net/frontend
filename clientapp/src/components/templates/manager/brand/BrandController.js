"use client";
import BrandList from "@/components/templates/manager/brand/BrandList";
import CreateBrand from "@/components/templates/manager/brand/CreateBrand";
import { Button } from "@/components/ui/button";
import { fetchBrands } from "@/lib/apis/brand-api";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function BrandController() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchBrands({ page: 1, pageSize: 10, name: "" });
      setBrands(res.data);
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="w-full bg-white p-2 rounded shadow">
      <div className="flex items-center justify-between border-b border-gray-200 p-2">
        <span>Quản lý thương hiệu</span>
        <div>
          <Button onClick={() => setOpenCreate(true)} variant="outline" className="">
            <Plus size={20} variant="outline" />
            Thêm thương hiệu
          </Button>
          <CreateBrand
            open={openCreate}
            setOpen={setOpenCreate}
            onCreated={() => setRefresh(!refresh)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Danh sách thương hiệu</h2>
          <BrandList
            brands={brands.articles}
            handleSelectChildren={(brand) => setSelectedBrand(brand)}
            onRefresh={() => setRefresh(!refresh)}
          />
        </div>
      </div>
    </div>
  );
}
