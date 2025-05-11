// MirrorComponent.jsx
import React from "react";

const MirrorComponent = ({colors=[],colorSelected}) => {
    const image = "/placeholder.svg"
    return (
        <div className="flex justify-center items-center h-screen bg-neutral-900">
            <div className="w-[300px] h-[600px] border-[20px] border-[#8B5E3C] rounded-sm shadow-lg bg-white relative">
                <div className="absolute inset-0 bg-white flex justify-center items-center">
                    {/* Ảnh người trong gương */}
                    <img
                        src={image} // thay thế bằng đường dẫn hình ảnh bạn muốn
                        alt="Reflection"
                        className="h-[90%] object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default MirrorComponent;
