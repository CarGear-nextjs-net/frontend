"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Controller, Form, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Editor from "@/components/common/Editor";

export default function AddEditContent({}) {
  const form = useForm({
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      isPublic: false,
      image: null,
      seoTitle: "",
      seoDescription: "",
      autoSeo: true,
    },
  });

  const handleSave = async (data) => {
    
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("summary", data.summary);
      formData.append("content", data.content);
      formData.append("isPublic", data.isPublic);
      formData.append("seoTitle", data.seoTitle);
      formData.append("seoDescription", data.seoDescription);
      formData.append("autoSeo", data.autoSeo);
   
      const res = await createProduct(formData);
      if (res.status === 200) {
        toast.success("Tạo sản phẩm thành công");
        router.push("/manager/products/" + res.product.id);
      } else {
        toast.error(res.message);
        console.log(res.errors);
      }
    
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tạo bài viết </h1>
        <Button onClick={form.handleSubmit(handleSave)}>Lưu</Button>
      </div>
        <form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Card className="p-4">
              <h2 className="text-lg font-bold border-b pb-2">
                THÔNG TIN CHI TIẾT
              </h2>
              <p className="text-sm italic">
                Trường có dấu (*) bắt buộc phải nhập thông tin !
              </p>

              <div className="grid grid-cols-3 space-y-4 mb-3">
                <Label className="text-right pt-2">Tên bài viết:</Label>
                <div className="col-span-2">
                  <span className="text-red-500">*</span>
                  <Controller
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  {form.formState.errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <Label className="text-right pt-2">
                  Slug (URL thân thiện):
                </Label>
                <div className="col-span-2">
                  <span className="text-red-500">
                    * (Hệ thống tự động tạo theo tên)
                  </span>
                  <Controller
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  {form.formState.errors.slug && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.slug.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <Label className="text-right pt-2">Mô tả:</Label>
                <div className="col-span-2">
                  <Controller
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  {form.formState.errors.summary && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.summary.message}
                    </p>
                  )}
                </div>
              </div>
              <Controller
                control={form.control}
                name="content"
                render={({ field }) => (
                  <Editor {...field} />
                )}
              />
            </Card> 
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex justify-between border-b pb-2">
                <h2 className="text-lg font-bold">SEO</h2>
                <div className="flex items-center gap-2">
                  <span>Tự động SEO</span>
                  <Controller
                    control={form.control}
                    name="autoSeo"
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Tên bài viết SEO:</Label>
                  <Controller
                    control={form.control}
                    name="seoTitle"
                    render={({ field }) => (
                      <Textarea
                        rows={2}
                        {...field}
                        value={field.value}
                        className="mt-1"
                      />
                    )}
                  />
                </div>
                <div>
                  <Label>Mô tả SEO:</Label>
                  <Controller
                    control={form.control}
                    name="seoDescription"
                    render={({ field }) => (
                      <Textarea rows={3} {...field} className="mt-1" />
                    )}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        </form>
    </div>
  );
}
