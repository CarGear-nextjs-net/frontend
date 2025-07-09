"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { formatPriceWithoutSymbol, formatPriceToRawNumber } from "@/utils/format"
import {createProduct, fetchCategories, fetchDemoData} from "@/lib/api"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateProductController({ sku }) {
    const router = useRouter()
    const [productImage, setProductImage] = useState("/placeholder.svg?height=200&width=150")
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [file, setFile] = useState(null)
    const [errors, setErrors] = useState({})
    const [autoSeo, setAutoSeo] = useState(true)
    const [product, setProduct] = useState({
        name: "",
        sku: "",
        slug: "",
        category: 0,
        brand: 0,
        description: "",
        price: 0,
        attributes: [],
        stopSelling: false,
        image: null,
        seoTitle: "",
        seoDescription: "",
    })
    const [attributes, setAttributes] = useState([])
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        let newValue = type === "checkbox" ? !checked : value
        if (name === "price") {
            newValue = formatPriceToRawNumber(value)
        }
        if (name === "category") {
            newValue = Number.parseInt(value)
        }
        if (name === "brand") {
            newValue = Number.parseInt(value)
        }
        setProduct((prev) => ({
            ...prev,
            [name]: newValue,
        }))
    }
    const handleFileChange = (e) => {
        const image = e.target.files[0]
        if (image) {
            setProductImage(URL.createObjectURL(image))
            setFile(image)
        }
    }
    const validate = () => {
        const newErrors = {}
        if (!product.sku.trim()) newErrors.sku = "Mã sản phẩm là bắt buộc"
        if (!product.name.trim()) newErrors.name = "Tên sản phẩm là bắt buộc"
        if (!product.slug.trim()) newErrors.slug = "Slug là bắt buộc"
        if (!product.brand || product.brand === 0) newErrors.brand = "Chọn thương hiệu"
        if (!product.category || product.category === 0) newErrors.category = "Chọn danh mục"
        if (!product.price || product.price <= 0) newErrors.price = "Giá phải lớn hơn 0"
        if (!file) newErrors.file = "Chưa nhập file ảnh"
        if (attributes.some((attr) => !attr.name.trim() || !attr.value.trim())) {
            newErrors.attributes = "Vui lòng điền đầy đủ Name và Value cho tất cả các thuộc tính."
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0 // true nếu ko lỗi
    }
    const handleSave = async (e) => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append("sku", product.sku)
            formData.append("name", product.name)
            formData.append("slug", product.slug)
            formData.append("brand", product.brand)
            formData.append("description", product.description)
            formData.append("price", product.price)
            formData.append("category", product.category)
            formData.append("image", file)
            formData.append("stopSelling", product.stopSelling)
            attributes.length>0 && attributes.forEach((attr, index) => {
                formData.append(`Attributes[${index}].Name`, attr.name)
                formData.append(`Attributes[${index}].Value`, attr.value)
            })
            const res = await createProduct(formData);
            if(res.status === 200) {
                toast.success("Tạo sản phẩm thành công")
                router.push("/manager/products/"+res.product.id);
            }else{
                toast.error(res.message);
                console.log(res.errors)
            }
        } else {
            toast.error("Thông tin sản phẩm chưa hợp lệ")
        }
    }
    const handleAddNewAttribute = () => {
        const newAttribute = {
            name: "",
            value: "",
        }
        setAttributes((prev) => [...prev, newAttribute])
    }
    const handleAttributeChange = (index, field, newValue) => {
        setAttributes((prev) => prev.map((attr, i) => (i === index ? { ...attr, [field]: newValue } : attr)))
    }

    const handleRemoveAttribute = (index) => {
        setAttributes((prev) => prev.filter((_, i) => i !== index))
    }
    useEffect(() => {
        const fetchData = async () => {
            if (!product.name.trim()) return
            const res = await fetchDemoData(product.name)
            setProduct((prev) => ({
                ...prev,
                slug: res.slug,
            }))
        }

        fetchData()
    }, [product.name])
    // auto seo
    useEffect(() => {
        if (autoSeo) {
            setProduct((prev) => ({
                ...prev,
                seoTitle: product.name,
                seoDescription: product.description.substring(0, 100),
            }))
        }
    }, [product.name, product.description, autoSeo])

    useEffect(() => {
        const fetchCategoriesAPI = async () => {
            const res = await fetchCategories()
            setCategories(res.categories)
        }
        fetchCategoriesAPI()
    }, [])  

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Tạo sản phẩm </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Cột thông tin chi tiết */}
                <div className="md:col-span-2">
                    <Card className="p-4">
                        <h2 className="text-lg font-bold border-b pb-2 mb-4">THÔNG TIN CHI TIẾT</h2>
                        <p className="text-sm italic mb-4">Trường có dấu (*) bắt buộc phải nhập thông tin !</p>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Mã sản phẩm:</Label>
                            <div className="col-span-2">
                                <span className="text-red-500 ">* (Hệ thống tự tạo)</span>
                                <Input type="text" name={"sku"} value={product.sku} onChange={(e) => handleChange(e)} />
                                {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Tên sản phẩm:</Label>
                            <div className="col-span-2">
                                <span className="text-red-500">*</span>
                                <Input type="text" name={"name"} value={product.name || ""} onChange={(e) => handleChange(e)} />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Slug (URL thân thiện):</Label>
                            <div className="col-span-2">
                                <span className="text-red-500">* (Hệ thống tự động tạo theo tên)</span>
                                <Input type="text" name="slug" value={product.slug} onChange={(e) => handleChange(e)} />
                                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Mô tả:</Label>
                            <div className="col-span-2">
                                <Textarea
                                    name="description"
                                    className=""
                                    rows={10}
                                    value={product.description}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Thương hiệu:</Label>
                            <div className="col-span-2">
                                <span className="text-red-500">*</span>
                                <Select
                                    onValueChange={(value) =>
                                        handleChange({
                                            target: {
                                                name: "brand",
                                                type: "select",
                                                value: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue value={0} placeholder="--Chọn thương hiệu--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands.map(({ id, name }) => (
                                            <SelectItem key={id} value={id}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Danh muc:</Label>
                            <div className="col-span-2">
                                <span className="text-red-500">*</span>
                                <Select
                                    onValueChange={(value) =>
                                        handleChange({
                                            target: {
                                                name: "category",
                                                type: "select",
                                                value: value,
                                            },
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="--Chọn danh mục--" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(({ id, name }) => (
                                            <SelectItem key={id} value={id}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Giá gốc:</Label>
                            <div className="col-span-2">
                                <span className="text-red-500">*</span>
                                <span className="text-sm ml-1">(VNĐ)</span>
                                <Input
                                    type={"text"}
                                    name="price"
                                    value={formatPriceWithoutSymbol(product.price)}
                                    onChange={(e) => handleChange(e)}
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Giá bán:</Label>
                            <div className="col-span-2">
                                <Input defaultValue="0" />
                                <span className="text-sm ml-1">(VNĐ)</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <Label className="text-right pt-2">Mở bán:</Label>
                            <div className="col-span-2">
                                <Switch
                                    checked={!product.stopSelling}
                                    onCheckedChange={(value) =>
                                        handleChange({
                                            target: {
                                                type: "checkbox",
                                                name: "stopSelling",
                                                value: value,
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Cột bên phải */}
                <div className="space-y-4">
                    {/* Ảnh sản phẩm */}
                    <Card className="p-4">
                        <h2 className="text-lg font-bold border-b pb-2 mb-4">ẢNH SẢN PHẨM</h2>
                        <div className="border p-4 rounded-lg shadow-sm text-center space-y-4">
                            {/* Hình ảnh xem trước */}
                            <div className="relative mx-auto w-32 h-40 border rounded overflow-hidden bg-gray-50">
                                <Image src={productImage || "/placeholder.svg"} alt="Product preview" fill className="object-contain" />
                            </div>

                            {/* Input và nút upload */}
                            <div className="col-span-2">
                                <span className="text-red-500">*</span>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer"
                                    onChange={handleFileChange} // bạn cần khai báo handle này
                                />
                                {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                            </div>
                        </div>
                    </Card>

                    {/* Thông số kỹ thuât */}
                    <Card className="p-4">
                        <div className="flex justify-between border-b pb-2">
                            <h2 className="text-lg font-bold ">Thông số kỹ thuât</h2>
                            <Button variant="outline" onClick={handleAddNewAttribute}>
                                Thêm thông số
                            </Button>
                        </div>
                        <table className="border border-gray-400 w-full text-center">
                            <thead>
                            <tr className="bg-gray-200 border-b border-gray-400">
                                <th className="p-2 border-r border-gray-400">Name</th>
                                <th className="p-2 border-r border-gray-400">Value</th>
                                <th className="p-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {attributes.map(({ name, value }, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                    <td className="p-2 border-r border-gray-300">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => handleAttributeChange(index, "name", e.target.value)}
                                            className="w-full border px-2 py-1"
                                        />
                                    </td>
                                    <td className="p-2 border-r border-gray-300">
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
                                            className="w-full border px-2 py-1"
                                        />
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleRemoveAttribute(index)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {errors.attributes && <p className="text-red-500 text-sm mt-1">{errors.attributes}</p>}
                    </Card>
                    {/* SEO */}
                    <Card className="p-4">
                        <div className="flex justify-between border-b pb-2 mb-4">
                            <h2 className="text-lg font-bold">SEO</h2>
                            <div className="flex items-center">
                                <span>Tự động SEO</span>
                                <Switch className="ml-2"
                                        checked={autoSeo}
                                        onCheckedChange={() => setAutoSeo(!autoSeo)} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <Label>Page Title:</Label>
                                <Textarea
                                    rows={2}
                                    name="seoTitle"
                                    value={product.seoTitle}
                                    onChange={(e) => handleChange(e)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label>Page Description:</Label>
                                <Textarea
                                    rows={3}
                                    name="seoDescription"
                                    value={product.seoDescription}
                                    onChange={(e) => handleChange(e)}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
                <Button onClick={(e) => handleSave(e)}>Lưu</Button>
                <Button variant="outline">Hủy</Button>
            </div>
        </div>
    )
}
