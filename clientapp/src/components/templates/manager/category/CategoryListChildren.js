'use client'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Settings} from "lucide-react";

export default function CategoriesChildren ({categories=[]}){
    return(
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
                {categories.map(({id,name,description},index) => (
                    <tr key={id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3 ">{name}</td>
                        <td className="p-3 ">{description}</td>
                        <td className="p-3 text-center">
                            <MenuActions product={{id,name}}  />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
const MenuActions = ({category}) => {
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
                <DropdownMenuItem >Cập nhật</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};
