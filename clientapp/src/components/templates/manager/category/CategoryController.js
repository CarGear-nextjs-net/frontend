"use client";
import CategoryList from "@/components/templates/manager/category/CategoryListParent";
import CreateCategory from "@/components/templates/manager/category/CreateCategory";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/lib/api";
import { createCategoryApi } from "@/lib/apis/categories-api";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function CategoryController() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchCategories();
      setCategories(res);
    };
    fetchData();
  }, [refresh]);

  const childrenCategories = useMemo(() => {
    const category = categories.find((c) => c.id === selectedCategory?.id);
    return category?.children || [];
  }, [selectedCategory, categories]);


  return (
    <div className="w-full bg-white p-2 rounded shadow">
      <div className="flex items-center justify-between border-b border-gray-200 p-2">
        <span>Quản lý danh muc sản phẩm</span>
        <div>
          <Button onClick={() => setOpenCreate(true)} variant="outline" className="">
            <Plus size={20} variant="outline" />
            Thêm danh mục
          </Button>
          <CreateCategory open={openCreate} setOpen={setOpenCreate} categoryParent={null} onCreated={() => setRefresh(!refresh)}/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Danh mục cha</h2>
          <CategoryList categories={categories} handleSelectChildren={(category) => setSelectedCategory(category)} onRefresh={() => setRefresh(!refresh)}/>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Danh mục con {!!selectedCategory?.id ? `của ${selectedCategory?.name}` : ""}</h2>
          <CategoryList categories={childrenCategories || []} onRefresh={() => setRefresh(!refresh)} />
        </div>
      </div>
    </div>
  );
}
