"use client";

import { LoginForm } from "@/components/templates/Auth/login/LoginForm";
import { RegisterForm } from "@/components/templates/Auth/login/RegisterFrom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function AuthTabs({ setOpen }) {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {activeTab === "login" ? "Đăng nhập" : "Đăng ký"}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login" ? "Đăng nhập vào tài khoản của bạn" : "Tạo tài khoản mới"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm setActiveTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
