import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
import Link from "next/link";

export default function CustomerHeader({
  setName,
  setEmail,
  setPhone,
  setAddress,
  name,
  email,
  phone,
  address,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          defaultValue={name}
          className="border px-3 py-2 rounded-md w-full md:w-64"
          onChange={debounce((e) => {setName(e.target.value)},500)}
        />
        <input
          type="text"
          placeholder="Tìm kiếm email..."
          defaultValue={email}
          className="border px-3 py-2 rounded-md w-full md:w-64"
          onChange={debounce((e) => {setEmail(e.target.value)},500)}
        />
        <input
          type="text"
          placeholder="Tìm kiếm số điện thoại..."
          defaultValue={phone}
          className="border px-3 py-2 rounded-md w-full md:w-64"
          onChange={debounce((e) => {setPhone(e.target.value)},500)}
        />
        <input
          type="text"
          placeholder="Tìm kiếm địa chỉ..."
          defaultValue={address}
          className="border px-3 py-2 rounded-md w-full md:w-64"
          onChange={debounce((e) => {setAddress(e.target.value)},500)}
        />
      </div>
        {/* <Link href="/manager/content/create">
            <Button className="bg-green-600 text-white hover:bg-green-700">
            + Tạo bài viết
            </Button>
        </Link> */}
    </div>
  );
}
