"use client";
import { fetchContentsManager } from "@/lib/api";
import { PAGES, PAGESIZE } from "@/utils/constants";
import { useEffect, useState } from "react";
import ContentList from "./component/ContentList";
import ContentHeader from "./component/Header";
import { getCategoryApi } from "@/lib/apis/categories-api";

export default function ContentController() {
  const [contents, setContents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(PAGES);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const params = {
        page,
        pageSize: 10,
        title:search,
        categoryId: categoryFilter,
      };
      const res = await fetchContentsManager(params);
      if (res.data) {
        setContents(res.data);
        setTotalPages(res.totalPages);
      }
    };
    loadData();
  }, [page, categoryFilter, search]);

  useEffect(() => {
    async function getCategory() {
      try {
        const res = await getCategoryApi();
        setCategories(res);
      } catch (error) {
        console.log(error);
      }
    }
    getCategory();
  }, []);

  return (
    <div className="p-4">
      <ContentHeader
        categories={categories || []}
        setSearch={setSearch}
        search={search}
        setCategoryFilter={setCategoryFilter}
        categoryFilter={categoryFilter}
      />
      <ContentList contents={contents} page={page} setPage={setPage} totalPages={totalPages} categories={categories || []} />
    </div>
  );
}
