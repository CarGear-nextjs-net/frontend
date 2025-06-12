"use client";
import { useEffect, useState } from "react";
import { useProductManagerContext } from "@/components/contexts/ProductManagerContext";
import { fetchContentsManager, fetchProductManager } from "@/lib/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { PAGES, PAGESIZE } from "@/utils/constants";
import ContentList from "./component/ContentList";
import ContentHeader from "./component/Header";

export default function ContentController() {
  const [contents, setContents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(PAGES);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const params = {
        page,
        page_size: PAGESIZE,
        search,
        category: categoryFilter
      };
      const res = await fetchContentsManager(params);
      setContents(res.data);
      setTotalPages(res.totalPages);
    };
    loadData();
  }, [page, categoryFilter, search]);

  return (
    <div className="p-4">
      <ContentHeader
        categories={[]}
        setSearch={setSearch}
        search={search}
        setCategoryFilter={setCategoryFilter}
        categoryFilter={categoryFilter}
      />
      <ContentList
        contents={contents}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
