"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function DialogConfirmDelete({
  open,
  setOpen,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open={open} onOpenChange={onCancel} >
      <DialogContent className=" p-0 border-none bg-transparent z-[1000]">
        <DialogTitle className="hidden">Delete Modal</DialogTitle>
        <Card className="w-full mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Xác nhận xóa
            </CardTitle>
            <CardDescription className="text-center">
              Bạn có chắc chắn muốn xóa mục này không? Hành động này không thể
              hoàn tác.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between w-full gap-2">
            <Button
              type="button"
              className='w-[200px]'
              variant="outline"
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button
              type="button"
              variant="destructive"
              className='w-[200px]'
              onClick={onConfirm}
            >
             Xóa
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
