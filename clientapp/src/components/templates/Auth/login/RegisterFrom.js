"use client";

import { GoogleButton } from "@/components/organisms/GoogleButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import API_BASE_URL from "@/utils/config";
import axios from "axios";
import { AlertCircle, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function RegisterForm({ setActiveTab }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !address || !phone) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!acceptTerms) {
      setError("Vui lòng đồng ý với điều khoản dịch vụ");
      return;
    }

    try {
      setIsLoading(true);
      const body = {
        username: name,
        email,
        password,
        address,
        phone,
        roleId: 2,
      };
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, body);
      if (res.data?.userId) {
        setActiveTab("login");
        toast.success("Đăng ký thành công");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại sau.");
      }
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err);
      setError("Đăng ký thất bại. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Họ tên</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Nguyễn Văn A"
            className="pl-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Mật khẩu</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Địa chỉ</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            type="text"
            placeholder="Địa chỉ"
            className="pl-10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Số điện thoại</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="text"
            placeholder="Số điện thoại"
            className="pl-10"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Tôi đồng ý với{" "}
          <Button variant="link" className="p-0 h-auto">
            điều khoản dịch vụ
          </Button>
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Hoặc tiếp tục với</span>
        </div>
      </div>

      <GoogleButton text="Đăng ký với Google" />
    </form>
  );
}
