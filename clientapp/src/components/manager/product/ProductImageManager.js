"use client"

import { useState, useEffect } from "react"
import { ProductImagesCard } from "./ProductImagesCard"
import { toast } from "sonner"
import {deleteProductImage, saveProductImage} from "@/lib/api";
export function ProductImagesManager({ productId, initialImages = [], onImagesChange }) {
    const [images, setImages] = useState(initialImages)
    const [mainImageIndex, setMainImageIndex] = useState(0)

    useEffect(() => {
        if (initialImages.length > 0 && images.length === 0) {
            setImages(initialImages)
        }
    }, [initialImages, images.length])

    useEffect(() => {
        if (onImagesChange) {
            onImagesChange(images)
        }
    }, [images, onImagesChange])

    const handleAddImage =async (file) => {
        const newImage= {
            url: URL.createObjectURL(file),
            file,
            isNew: true,
        }

        setImages((prev) => [...prev, newImage])
        if (images.length === 0) {
            setMainImageIndex(0)
        }
        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("file", file);
        formData.append("isMain", false);
        try {
            const res = await saveProductImage(formData);
            if(res.status) {
                toast.success(res.message);
            }
        } catch (error) {
            console.error("Lỗi khi lưu ảnh:", error);
            toast.error("Lỗi khi lưu ảnh");
        }
    }

    const handleRemoveImage =async (index) => {
        const image = images[index];
        if(!image.isMain){
            const res = await deleteProductImage(image.id)
            if(res.status) {
                toast.success(res.message);
                setImages((prev) => prev.filter((_, i) => i !== index))
                // Adjust main image index if needed
                if (mainImageIndex === index) {
                    setMainImageIndex(images.length > 1 ? 0 : -1)
                } else if (mainImageIndex > index) {
                    setMainImageIndex(mainImageIndex - 1)
                }
            }else{
                toast.error(res.message);
            }
        }
        else{
            toast.message("Không được xóa ảnh chính")
        }
    }

    const handleSetMainImage = (index) => {
        setMainImageIndex(index)
        toast.success("Đã đặt làm ảnh chính")
    }


    return (
        <div className="space-y-4">
            <ProductImagesCard
                images={images}
                onAddImage={handleAddImage}
                onRemoveImage={handleRemoveImage}
                onSetMainImage={handleSetMainImage}
                mainImageIndex={mainImageIndex}
            />
        </div>
    )
}
