"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Settings} from "lucide-react";
import {useMemo, useState} from "react";
import axios from "axios";
import API_BASE_URL from "@/utils/config";
import {useProductManagerContext} from "@/components/contexts/ProductManagerContext";
import { useRouter } from 'next/navigation'
import {toast} from "sonner";

export default function ProductList({ products = [] ,categories=[]}) {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const { triggerRefreshList } = useProductManagerContext();

    // Lọc sản phẩm theo tên và danh mục
    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            (categoryFilter ? p.categoryName === categoryFilter : true)
        );
    }, [products, search, categoryFilter]);


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 shadow-md  overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Ảnh</th>
                    <th className="p-3">Tên sản phẩm</th>
                    <th className="p-3">Giá</th>
                    <th className="p-3">Danh mục</th>
                    <th className="p-3">Thương hiệu</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Tồn kho</th>
                    <th className="p-3">Mở bán</th>
                    <th className="p-3">Đánh giá</th>
                    <th className="p-3 text-center">
                        <span className="sr-only">Thao tác</span>
                    </th>
                </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                {filteredProducts.map((product, index) => (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                        </td>
                        <td className="p-3 font-medium">{product.name}</td>
                        <td className="p-3 text-red-600">{product.price.toLocaleString()}₫</td>
                        <td className="p-3">{product.categoryName}</td>
                        <td className="p-3">{product.brandName}</td>
                        <td className="p-3">{product.sku}</td>
                        <td className="p-3">{product.outOfStock ? 'Hết hàng' : 'Còn hàng'}</td>
                        <td className="p-3">{!product.stopSelling ? '✔️' : '❌'}</td>
                        <td className="p-3">{product.rate}/5</td>
                        <td className="p-3 text-center">
                            <MenuActions product={product} triggerRefresh={triggerRefreshList} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const MenuActions = ({product,triggerRefresh}) => {
    const UpdateSale =async (status) => {
        try{
            const res= await axios.put(`${API_BASE_URL}/api/productmanager/update-selling/${product.id}`,null,{
                params: {
                    status
                }
            })
           if(res.status === 200){
               toast.success('Update Selling Successfully');
               triggerRefresh()
           }
        }catch(e){
            toast.error(e.message)
        }
    }
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full">
                    <Settings size={20} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() =>  router.push(`/manager/products/${product.id}`) }>
                    Chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => UpdateSale(!product.stopSelling)}>{!product.stopSelling?'Ngừng bán':'Mở bán'}</DropdownMenuItem>
                <DropdownMenuItem>Cập nhật kho hàng</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};
