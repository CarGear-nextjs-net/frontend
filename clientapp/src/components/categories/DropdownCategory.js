'use client'
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // icon

export default function DropdownCategory({ category }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center cursor-pointer pb-2"
            >
                <span className="">{category.name}</span>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400 text-sm">({category.children.length})</span>
                    <span>{isOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}</span>
                </div>

            </div>

            {isOpen && (
                <ul className="border-l">
                    {category.children.map((child) => (
                        <li key={child.id} className="text-sm text-black pl-2 mb-1 hover:text-red-500 cursor-pointer">
                            {child.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
