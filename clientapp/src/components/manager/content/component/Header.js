import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
import Link from "next/link";

export default function ContentHeader({
  search,
  categoryFilter,
  setSearch,
  setCategoryFilter,
  categories,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          className="border px-3 py-2 rounded-md w-full md:w-64"
          onChange={debounce((e) => {setSearch(e.target.value)},500)}
        />
        <select
          className="border px-3 py-2 rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Tất cả danh mục</option>
          {categories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <Link href="/manager/contents/create">
        <Button className="bg-green-600 text-white hover:bg-green-700">
          + Tạo bài viết
        </Button>
      </Link>
    </div>
  );
}
