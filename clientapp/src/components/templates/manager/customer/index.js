"use client";
import { PAGES, PAGESIZE } from "@/utils/constants";
import { useEffect, useState } from "react";
import CustomerHeader from "./component/CustomerHeader";
import CustomerList from "./component/CustomerList";
import { fetchUsersManager } from "@/lib/apis/customers-api";

export default function CustomerController() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [page, setPage] = useState(PAGES);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      
      const res = await fetchUsersManager({
        roleId:1
      });
      if (res.data) {
        setCustomers(res.data);
        setTotalPages(res.totalPages);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-4">
      <CustomerHeader
        setName={setName}
        setEmail={setEmail}
        setPhone={setPhone}
        setAddress={setAddress}
        name={name}
        email={email}
        phone={phone}
        address={address}
      />
      <CustomerList customers={customers} page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
