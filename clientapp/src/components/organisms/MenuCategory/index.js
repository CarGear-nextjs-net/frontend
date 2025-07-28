"use client";
import NavigationMenuComponent from "@/components/molecules/NavigationMenuComponent";
import { fetchCategories } from "@/lib/api";
import { useEffect, useState } from "react";

export const MenuCategory = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchCategoryAPI() {
      const data = await fetchCategories();
      setCategory(data);
    }
    fetchCategoryAPI();
  }, []);

  return (
    <NavigationMenuComponent
      menu={category}
      className="max-w-full h-[500px] border items-start bg-white shadow-md rounded-md"
    />
  );
};
