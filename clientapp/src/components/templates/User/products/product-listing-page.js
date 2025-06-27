"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, ChevronDown, X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import ProductGrid from "./product-grid";
import { formatPrice } from "@/utils/format";
import { PaginationComponent } from "../../Common/Pagination";
import { getProducts } from "@/lib/api";

export default function ProductListingPage() {
  // Router và URL params
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  // State cho các bộ lọc
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || undefined);
  const [selectedBrands, setSelectedBrands] = useState(searchParams.get("brands") || []);
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "default");
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [priceRange, setPriceRange] = useState([searchParams.get("minPrice") || 0, searchParams.get("maxPrice") || 10000000]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState([]);

  // Giá trị mặc định cho slider
  const minPriceValue = 0;
  const maxPriceValue = 10000000;
  const productsPerPage = 12;

  // Cập nhật URL khi các bộ lọc thay đổi
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory) params.set("category", selectedCategory.toString());
    if (selectedBrands.length > 0) {
      selectedBrands.forEach((brandId) => {
        params.append("brands", brandId.toString());
      });
    }
    if (sortOption !== "default") params.set("sort", sortOption);
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (priceRange[0] > minPriceValue) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < maxPriceValue) params.set("maxPrice", priceRange[1].toString());
    if (searchQuery) params.set("search", searchQuery);

    router.push(`${pathname}?${params.toString()}`);
  }, [
    selectedCategory,
    selectedBrands,
    sortOption,
    currentPage,
    priceRange,
    searchQuery,
    pathname,
    router,
  ]);

  useEffect(() => {
    
    const fetchProducts = async () => {
        const body = {  
            minPrice: parseInt(priceRange[0]),
            maxPrice: parseInt(priceRange[1]),
            ...(searchParams.get('category') && { categoryId: parseInt(searchParams.get('category')) }),
            ...(searchParams.get('search') && { keyword: searchParams.get('search') }),
        }
      const res = await getProducts(body);
      setProducts(res);
      setTotalProducts(res.length);
    };
    fetchProducts();
  }, [searchParams]);

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  // Xử lý thay đổi thương hiệu
  const handleBrandChange = (brandId) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandId)) {
        return prev.filter((id) => id !== brandId);
      } else {
        return [...prev, brandId];
      }
    });
    setCurrentPage(1);
  };

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  // Xử lý thay đổi giá
  const handlePriceChange = (values) => {
    setPriceRange([values[0], values[1]]);
    setCurrentPage(1);
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };

  // Xử lý xóa bộ lọc
  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedBrands([]);
    setSortOption("default");
    setPriceRange([minPriceValue, maxPriceValue]);
    setSearchQuery("");
    setTempSearchQuery("");
    setCurrentPage(1);
  };

  // Xử lý xóa một bộ lọc cụ thể
  const handleRemoveFilter = (type, value) => {
    switch (type) {
      case "category":
        setSelectedCategory(undefined);
        break;
      case "brand":
        if (value) {
          setSelectedBrands((prev) => prev.filter((id) => id !== value));
        }
        break;
      case "price":
        setPriceRange([minPriceValue, maxPriceValue]);
        break;
      case "search":
        setSearchQuery("");
        setTempSearchQuery("");
        break;
    }
    setCurrentPage(1);
  };

  // Tìm tên danh mục từ ID
  const getCategoryName = (id) => {
    // Tìm trong danh mục cha
    const parentCategory = categories.find((cat) => cat.id === id);
    if (parentCategory) return parentCategory.name;

    // Tìm trong danh mục con
    for (const category of categories) {
      if (category.children) {
        const childCategory = category.children.find((child) => child.id === id);
        if (childCategory) return childCategory.name;
      }
    }
    return "Danh mục không xác định";
  };

  // Tìm tên thương hiệu từ ID
  const getBrandName = (id) => {
    const brand = brands.find((brand) => brand.id === id);
    return brand ? brand.name : "Thương hiệu không xác định";
  };

  // Tính toán tổng số trang
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sản phẩm</h1>

      {/* Thanh tìm kiếm và sắp xếp - Desktop */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={tempSearchQuery}
              onChange={(e) => setTempSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm text-gray-500 whitespace-nowrap">Sắp xếp theo:</span>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Mặc định" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">Mặc định</SelectItem>
                <SelectItem value="price_asc">Giá: Thấp đến cao</SelectItem>
                <SelectItem value="price_desc">Giá: Cao đến thấp</SelectItem>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="popular">Phổ biến nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Nút hiển thị bộ lọc trên mobile */}
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Bộ lọc
                  </h3>
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                    Xóa tất cả
                  </Button>
                </div>

                {/* Tìm kiếm trong mobile filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Tìm kiếm</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tìm kiếm sản phẩm..."
                      value={tempSearchQuery}
                      onChange={(e) => setTempSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSearch}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Bộ lọc danh mục trong mobile */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Danh mục sản phẩm</h4>
                  <div className="pl-2">
                    {/* <CategoryFilter
                                            categories={categories}
                                            selectedCategory={selectedCategory}
                                            onChange={handleCategoryChange}
                                        /> */}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Bộ lọc thương hiệu trong mobile */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Thương hiệu</h4>
                  <div className="pl-2">
                    {/* <BrandFilter brands={brands} selectedBrands={selectedBrands} onChange={handleBrandChange} /> */}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Bộ lọc giá trong mobile */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Khoảng giá</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[priceRange[0], priceRange[1]]}
                      min={minPriceValue}
                      max={maxPriceValue}
                      step={100000}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full" onClick={() => setIsMobileFilterOpen(false)}>
                    Áp dụng bộ lọc
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Hiển thị các bộ lọc đã chọn */}
      {(selectedCategory ||
        selectedBrands.length > 0 ||
        searchQuery ||
        priceRange[0] > minPriceValue ||
        priceRange[1] < maxPriceValue) && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-gray-500 self-center">Bộ lọc đã chọn:</span>

          {selectedCategory && (
            <Badge variant="outline" className="flex items-center gap-1 bg-red-50">
              Danh mục: {getCategoryName(selectedCategory)}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveFilter("category")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {selectedBrands.map((brandId) => (
            <Badge key={brandId} variant="outline" className="flex items-center gap-1 bg-red-50">
              {getBrandName(brandId)}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveFilter("brand", brandId)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1 bg-red-50">
              Tìm kiếm: {searchQuery}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveFilter("search")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {(priceRange[0] > minPriceValue || priceRange[1] < maxPriceValue) && (
            <Badge variant="outline" className="flex items-center gap-1 bg-red-50">
              Giá: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveFilter("price")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          <Button variant="ghost" size="sm" className="h-7" onClick={handleClearFilters}>
            Xóa tất cả
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar bộ lọc - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Bộ lọc
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-xs h-7"
                >
                  Xóa tất cả
                </Button>
              </div>

              {/* Bộ lọc danh mục */}
              <div className="mb-6">
                <h4 className="font-medium mb-2 flex items-center justify-between">
                  Danh mục sản phẩm
                  <ChevronDown className="h-4 w-4" />
                </h4>
                <div className="pl-2">
                  {/* <CategoryFilter
                                        categories={categories}
                                        selectedCategory={selectedCategory}
                                        onChange={handleCategoryChange}
                                    /> */}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Bộ lọc thương hiệu */}
              <div className="mb-6">
                <h4 className="font-medium mb-2 flex items-center justify-between">
                  Thương hiệu
                  <ChevronDown className="h-4 w-4" />
                </h4>
                <div className="pl-2">
                  {/* <BrandFilter brands={brands} selectedBrands={selectedBrands} onChange={handleBrandChange} /> */}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Bộ lọc giá */}
              <div className="mb-6">
                <h4 className="font-medium mb-2 flex items-center justify-between">
                  Khoảng giá
                  <ChevronDown className="h-4 w-4" />
                </h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    min={minPriceValue}
                    max={maxPriceValue}
                    step={100000}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={handlePriceChange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{formatPrice(priceRange[0])}</span>
                    <span className="text-sm">{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Hiển thị {products.length} trên {totalProducts} sản phẩm
            </p>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn.</p>
              <Button variant="link" onClick={handleClearFilters} className="mt-2">
                Xóa tất cả bộ lọc
              </Button>
            </div>
          )}

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="mt-8">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
