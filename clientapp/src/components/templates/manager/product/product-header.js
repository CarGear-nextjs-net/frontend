import {Button} from "@/components/ui/button";
import {router} from "next/client";
import Link from "next/link";

export default function ProductHeader({search,categoryFilter,setSearch,setCategoryFilter,categories}) {

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
            <div className="flex gap-2 w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="border px-3 py-2 rounded-md w-full md:w-64"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="border px-3 py-2 rounded-md"
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                >
                    <option value="">Tất cả danh mục</option>
                    {categories.map(({id,name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
            </div>
            <Link href="/manager/products/create">
                <Button
                    className="bg-green-600 text-white hover:bg-green-700">
                    + Tạo sản phẩm
                </Button>
                </Link>
        </div>
    )
}