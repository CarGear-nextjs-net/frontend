"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect, usePathname } from "next/navigation";
import { useBackPathStore } from "@/stores/useBackPathStore";
export default function AuthDialog() {
  const { open, setOpen } = useAuth();
  const { setBackPath } = useBackPathStore();
  const pathname = usePathname();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" p-0 border-none bg-transparent z-[1000]">
        <DialogTitle className="hidden">Auth Modal</DialogTitle>
        <Card className="w-full mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Đăng nhập để tiếp tục trải nghiệm mua sắm tiện lợi và nhanh chóng!
            </CardTitle>
            <CardDescription className="text-center">
              Bạn cần đăng nhập để thực hiện chức năng này
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              type="button"
              onClick={() => {
                setOpen(false);
                setBackPath(pathname);
                redirect("/login");
              }}
            >
              Đăng nhập ngay
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
