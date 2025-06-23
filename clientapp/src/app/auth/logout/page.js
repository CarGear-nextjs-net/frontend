'use client'
import { redirect } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Chỉ xóa session từ server
        await axios.delete('/api/session');
      } catch (e) {
        console.error('Error deleting session:', e);
      } finally {
        // Redirect về trang login
        redirect("/");
      }
    };

    handleLogout();
  }, []);

  return (
    <></>
  );
}