"use client";
import { useState } from "react";

export default function CategoryMenu({groups}) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="flex w-full text-black max-w-4xl border-0 shadow-md">
            {/* Danh mục chính */}
            <div className="w-1/3 bg-gray-50 overflow-y-auto">
                {groups.map(({ id, name, categories }, index) => (
                    <div
                        key={index}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-200 flex justify-between items-center ${
                            activeIndex === index ? "bg-gray-200" : ""
                        }`}
                        onMouseEnter={() => setActiveIndex(index)}
                    >
                        <span className="truncate flex-1 min-w-0">{name}</span>
                        <span className="ml-2">›</span>
                    </div>
                ))}
            </div>

            {/* Danh mục con */}
            <div className="w-fit max-w-[70%] bg-white p-4 overflow-y-auto">
                {activeIndex !== null && (
                    <div className="grid grid-cols-2 gap-2">
                        {groups[activeIndex].categories.map(({ id, name }, i) => (
                            <div key={i} className="py-1 px-2 hover:underline cursor-pointer">
                                {name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}
