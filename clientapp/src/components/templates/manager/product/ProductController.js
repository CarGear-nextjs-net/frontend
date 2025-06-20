"use client";
import { useProductManagerContext } from "@/components/templates/User/contexts/ProductManagerContext";
import ProductHeader from "@/components/templates/manager/product/product-header";
import ProductList from "@/components/templates/manager/product/product-list";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Đường dẫn bạn đã dùng
import { fetchProductManager } from "@/lib/api";
import { useEffect, useState } from "react";

export default function ProductController(data) {
  const [products, setProducts] = useState(data.products || []);
  const categories = data.categories || [];
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { refreshList } = useProductManagerContext();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.totalPages || 1);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetchProductManager(page, 10, 0);
      setProducts(res.products);
      setTotalPages(res.totalPages);
    };
    loadData();
  }, [refreshList, page, categoryFilter]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <ProductHeader
        categories={categories}
        setSearch={setSearch}
        search={search}
        setCategoryFilter={setCategoryFilter}
        categoryFilter={categoryFilter}
      />
      <ProductList products={products} categories={categories} />
      <div className="p-4">
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink onClick={() => handlePageChange(p)} isActive={p === page}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
