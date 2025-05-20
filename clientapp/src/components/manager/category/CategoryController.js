'use client'
import CategoryList from "@/components/manager/category/CategoryListParent";
import {useEffect, useRef, useState} from "react";
import {fetchCategories} from "@/lib/api";
import CategoriesChildren from "@/components/manager/category/CategoryListChildren";
import Modal from "@/components/modal/Modal";
import CreateCategory from "@/components/manager/category/CreateCategory";
import {Button} from "@/components/ui/button";
import {Plus, PlusSquare} from "lucide-react";

export default function CategoryController() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({
        id:0,
        name: "",
        description: "",
        children: []
    })
    const refLoaded = useRef(false);
    const [openCreate, setOpenCreate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchCategories();
            setCategories(res);
        }
        if(!refLoaded.current) {
            fetchData()
            refLoaded.current = true;
        }
    })
    const selectChildren=(id)=>{
        const category = categories.find(c => c.id === id);
        setSelectedCategory(category);
    }

    return (
        <div className="w-full bg-white p-2 rounded shadow">
            <div className="flex items-center justify-between border-b border-gray-200 p-2">
                <span>Quản lý danh muc sản phẩm</span>
                <div>
                    <Button
                        onClick={() => setOpenCreate(true)}
                        variant="outline" className="">
                        <Plus size={20} variant="outline" />
                         Thêm danh mục
                    </Button>
                    <CreateCategory
                        open={openCreate}
                        setOpen={setOpenCreate}
                        categoryParent={null}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Danh mục cha</h2>
                    <CategoryList categories={categories} handleSelectChildren={selectChildren}/>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Danh mục con</h2>
                    <CategoryList categories={selectedCategory.children||[]} />
                </div>
            </div>
        </div>
    );
}
