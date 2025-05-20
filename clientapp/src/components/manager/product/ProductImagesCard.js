"use client"
import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Check } from "lucide-react"


export function ProductImagesCard({
                                      images = [],
                                      onAddImage,
                                      onRemoveImage,
                                      onSetMainImage,
                                      mainImageIndex = -1,
                                  }) {
    const [previewImage, setPreviewImage] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreviewImage(imageUrl)
            onAddImage(file)
            // Reset the input value so the same file can be selected again
            e.target.value = ""
        }
    }

    return (
        <Card className="p-4">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">DANH SÁCH ẢNH SẢN PHẨM</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Image upload box */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-40 relative">
                    <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center text-gray-500">
                        <Plus className="h-8 w-8 mb-2" />
                        <span className="text-sm text-center">Thêm ảnh</span>
                    </div>
                </div>

                {/* Display existing images */}
                {images.map((image, index) => (
                    <div key={index} className="border rounded-lg p-2 h-40 relative group">
                        <div className="relative w-full h-full">
                            <Image
                                src={image.url || "/placeholder.svg"}
                                alt={`Product image ${index + 1}`}
                                fill
                                className="object-contain"
                            />

                            {/* Overlay with actions on hover */}
                            <div className="absolute inset-0 bg-black/40 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                                <div className="flex space-x-2">
                                    {!image.isMain &&(
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="rounded-full p-1 h-8 w-8"
                                            onClick={() => onRemoveImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Main image indicator */}
                            {mainImageIndex === index && (
                                <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-br">
                                    Ảnh chính
                                </div>
                            )}

                            {/* New image indicator */}
                            {image.isNew && (
                                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">Mới</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {images.length === 0 && <p className="text-center text-gray-500 mt-4">Chưa có ảnh nào được thêm vào</p>}
        </Card>
    )
}
