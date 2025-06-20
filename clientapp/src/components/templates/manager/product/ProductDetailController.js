"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// UI Components
import { ProductImagesManager } from "@/components/templates/manager/product/ProductImageManager";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Utilities
import { fetchDemoData, updateInformationProduct, updateProductImage } from "@/lib/api";
import { formatPriceToRawNumber, formatPriceWithoutSymbol } from "@/utils/format";

/**
 * Product Detail Controller Component
 * Manages product information editing in admin panel
 */
export default function ProductDetailController({ product, categories, brands }) {
  // Find main product image
  const mainImage = product.images.find((i) => i.isMain);

  // State management
  const [productImage, setProductImage] = useState(mainImage.url);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [autoSeo, setAutoSeo] = useState(true);
  const [attributes, setAttributes] = useState(product.attributes || []);

  // Main product data state
  const [productUpdate, setProductUpdate] = useState({
    id: product.id,
    name: product.name || "",
    sku: product.sku || "",
    slug: product.slug || "",
    image: product.image || "",
    price: product.price || 0,
    description: product.description || "",
    category: product.categoryId || 0,
    brand: product.brandId || 0,
    attributes: product.attributes || [],
    stopSelling: product.stopSelling || false,
    seoTitle: product.seoTitle || "",
    seoDescription: product.seoDescription || "",
  });

  /**
   * Handle form field changes
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    let newValue = value;

    // Handle special field types
    if (name === "price") {
      newValue = formatPriceToRawNumber(value);
    }
    if (name === "stopSelling" && type === "checkbox") {
      newValue = value;
    }
    if (name === "category" || name === "brand") {
      newValue = Number.parseInt(value);
    }

    setProductUpdate((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  /**
   * Handle file upload for product image
   * @param {Object} e - Event object
   */
  const handleFileChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setProductImage(URL.createObjectURL(image));
      setFile(image);
    }
  };

  /**
   * Validate form fields before submission
   * @returns {Boolean} - Validation result
   */
  const validate = () => {
    const newErrors = {};

    // Required fields validation
    if (!productUpdate.name.trim()) newErrors.name = "Tên sản phẩm là bắt buộc";
    if (!productUpdate.slug.trim()) newErrors.slug = "Slug là bắt buộc";
    if (!productUpdate.brand || productUpdate.brand === 0) newErrors.brand = "Chọn thương hiệu";
    if (!productUpdate.category || productUpdate.category === 0)
      newErrors.category = "Chọn danh mục";
    if (!productUpdate.price || productUpdate.price <= 0) newErrors.price = "Giá phải lớn hơn 0";

    setErrors(newErrors);

    // Show toast for each error
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((err) => {
        toast.error(err);
      });
      return false;
    }

    return true;
  };

  /**
   * Save product information
   * @param {Object} e - Event object
   */
  const handleSave = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        id: product.id,
        name: productUpdate.name,
        slug: productUpdate.slug,
        price: productUpdate.price,
        category: productUpdate.category,
        brand: productUpdate.brand,
        description: productUpdate.description,
        seoTitle: productUpdate.seoTitle,
        seoDescription: productUpdate.seoDescription,
        stopSelling: productUpdate.stopSelling,
      };

      const res = await updateInformationProduct(data);

      if (res.status === 200) {
        toast.success("Cập nhật thành công");
        setProductUpdate((prev) => ({
          ...prev,
          category: res.product.categoryId,
          brand: res.product.brandId,
        }));
      } else {
        res.errors.forEach((error) => {
          toast.error(error);
        });
      }
    }
  };

  /**
   * Add new attribute to product specifications
   */
  const handleAddNewAttribute = () => {
    const newAttribute = {
      name: "",
      value: "",
    };
    setAttributes((prev) => [...prev, newAttribute]);
  };

  /**
   * Update attribute field value
   * @param {Number} index - Attribute index
   * @param {String} field - Field name (name or value)
   * @param {String} newValue - New field value
   */
  const handleAttributeChange = (index, field, newValue) => {
    setAttributes((prev) =>
      prev.map((attr, i) => (i === index ? { ...attr, [field]: newValue } : attr))
    );
  };

  /**
   * Reset form to original values
   */
  const handleCancel = () => {
    setProductUpdate({
      id: product.id,
      name: product.name || "",
      sku: product.sku || "",
      slug: product.slug || "",
      image: product.image || "",
      price: product.price || 0,
      description: product.description || "",
      category: product.categoryId || 0,
      brand: product.brandId || 0,
      attributes: product.attributes || [],
      seoTitle: product.seoTitle || "",
      seoDescription: product.seoDescription || "",
    });
    toast.success("Cancel successfully");
  };

  /**
   * Remove attribute from product specifications
   * @param {Number} index - Attribute index
   */
  const handleRemoveAttribute = (index) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Update main product image
   */
  const handleMainImageProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("id", mainImage.id);
      formData.append("file", file);
      formData.append("isMain", true);

      const res = await updateProductImage(formData);

      if (res.status) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  // Effect: Reset product image when file is null
  useEffect(() => {
    if (file === null) {
      setProductImage(product.image);
    }
  }, [file, product.image]);

  // Effect: Update slug when product name changes
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchDemoData(productUpdate.name);
      setProductUpdate((prev) => ({ ...prev, slug: res.slug }));
    };
    fetchData();
    setProductUpdate((prev) => ({ ...prev, seoTitle: productUpdate.name }));
  }, [productUpdate.name]);

  // Effect: Update SEO description when product description changes
  useEffect(() => {
    if (productUpdate?.description) {
      setProductUpdate((prev) => ({
        ...prev,
        seoDescription: productUpdate.description.substring(0, 100),
      }));
    }
  }, [productUpdate.description]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Product Details Column */}
        <div className="md:col-span-2">
          <Card className="p-4">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">
              THÔNG TIN CHI TIẾT : {product.name}
            </h2>
            <p className="text-sm italic mb-4">Trường có dấu (*) bắt buộc phải nhập thông tin !</p>

            {/* SKU Field */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Label className="text-right pt-2">Mã sản phẩm:</Label>
              <div className="col-span-2">
                <Input readOnly type="text" name={"sku"} value={productUpdate.sku} />
              </div>
            </div>

            {/* Product Name Field */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Label className="text-right pt-2">Tên sản phẩm:</Label>
              <div className="col-span-2">
                <span className="text-red-500">*</span>
                <Input
                  type="text"
                  name={"name"}
                  value={productUpdate.name || ""}
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            </div>

            {/* Slug Field */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Label className="text-right pt-2">Slug (URL thân thiện):</Label>
              <div className="col-span-2">
                <span className="text-red-500">*</span>
                <Input
                  type="text"
                  name="slug"
                  value={productUpdate.slug}
                  onChange={(e) => handleChange(e)}
                />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
              </div>
            </div>

            {/* Description Field */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Label className="text-right pt-2">Mô tả:</Label>
              <div className="col-span-2">
                <Textarea
                  name="description"
                  rows={10}
                  value={productUpdate.description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            {/* Brand Selection */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Label className="text-right pt-2">Thương hiệu:</Label>
              <div className="col-span-2">
                <span className="text-red-500">*</span>
                <Select
                  name="brand"
                  value={productUpdate.brand}
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
                    <SelectValue placeholder="--Chọn thương hiệu--" />
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

            {/* Category Selection */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Label className="text-right pt-2">Danh mục:</Label>
              <div className="col-span-2">
                <span className="text-red-500">*</span>
                <Select
                  value={productUpdate.category}
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
                    <SelectValue value="0" placeholder="--Chọn danh mục--" />
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

            {/* Original Price Field */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Label className="text-right pt-2">Giá gốc (VNĐ):</Label>
              <div className="col-span-2">
                <span className="text-red-500">*</span>
                <Input
                  type={"text"}
                  name="price"
                  value={formatPriceWithoutSymbol(productUpdate.price)}
                  onChange={(e) => handleChange(e)}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>

            {/* Selling Price Field */}
            <div className="grid grid-cols-3 gap-4 mb-3">
              <Label className="text-right pt-2">Giá bán (VNĐ):</Label>
              <div className="col-span-2">
                <Input defaultValue="0" />
              </div>
            </div>

            {/* Stop Selling Toggle */}
            <div className="grid grid-cols-3 gap-4 mb-3 items-center">
              <Label className="text-right pt-2">Mở bán:</Label>
              <div className="col-span-2">
                <Switch
                  checked={productUpdate.stopSelling}
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

            {/* Action Buttons */}
            <div className="mt-4 flex justify-center gap-4">
              <Button onClick={(e) => handleSave(e)}>Lưu</Button>
              <Button onClick={handleCancel} variant="outline">
                Hủy
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Main Product Image */}
          <Card className="p-4">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">ẢNH CHÍNH SẢN PHẨM</h2>
            <div className="border p-4 rounded-lg shadow-sm text-center space-y-4">
              {/* Image Preview */}
              <div className="relative mx-auto w-32 h-40 border rounded overflow-hidden bg-gray-50">
                <Image
                  src={productImage || "/placeholder.svg"}
                  alt="Product preview"
                  fill
                  className="object-contain"
                />
              </div>

              {/* File Upload */}
              <div className="col-span-2">
                <span className="text-red-500">*</span>
                <Input
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                  onChange={handleFileChange}
                />
                {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                {file && (
                  <div>
                    <Button
                      onClick={handleMainImageProduct}
                      variant="outline"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      type="button"
                    >
                      save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* SEO Settings */}
          <Card className="p-4">
            <div className="flex justify-between border-b pb-2 mb-4">
              <h2 className="text-lg font-bold">SEO</h2>
              <div className="flex items-center">
                <span>Tự động SEO</span>
                <Switch
                  className="ml-2"
                  checked={autoSeo}
                  onCheckedChange={() => setAutoSeo(!autoSeo)}
                />
              </div>
            </div>

            <div className="space-y-3">
              {/* SEO Title */}
              <div>
                <Label>Page Title:</Label>
                <Textarea
                  rows={2}
                  name="seoTitle"
                  value={productUpdate.seoTitle}
                  onChange={(e) => handleChange(e)}
                  className="mt-1"
                />
              </div>

              {/* SEO Description */}
              <div>
                <Label>Page Description:</Label>
                <Textarea
                  rows={3}
                  name="seoDescription"
                  value={productUpdate.seoDescription}
                  onChange={(e) => handleChange(e)}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="p-4">
        <div className="flex justify-between border-b pb-2">
          <h2 className="text-lg font-bold">Thông số kỹ thuật</h2>
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
      </div>

      {/* Product Images Manager */}
      <div className="p-4">
        <ProductImagesManager
          productId={product.id}
          initialImages={product.images}
          onImagesChange={null}
        />
      </div>
    </div>
  );
}
