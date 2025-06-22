"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Editor from "@/components/templates/Common/Editor";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { createProduct } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { getDetailContentApi } from "@/lib/apis/contents-api";
import InputControl from "@/components/molecules/InputControl";
import TextareaControl from "@/components/molecules/TextareaControl";

export default function AddEditContent() {
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [content, setContent] = useState(null);
  const userProfile = JSON.parse(localStorage.getItem("user-profile"));
  const fileInputRef = useRef(null);
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
    formData.append("seoTitle", data.autoSeo ? data.title : data.seoTitle);
    formData.append("seoDescription", data.autoSeo ? data.summary : data.seoDescription);
    formData.append("image", image);
    formData.append("userId", userProfile.id);

    const res = await createProduct(formData);
    if (res.status === 200) {
      toast.success("Tạo sản phẩm thành công");
      router.push("/manager/content/");
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    async function getDetailContent(id) {
      const res = await getDetailContentApi(id);
      if (res.status === 200) {
        const data = {
          title: res.data?.title || "",
          summary: res.data?.summary || "",
          slug: res.data?.slug || "",
          content: res.data?.content || "",
          // isPublic: res.data?.isPublic,
          // image: res.data?.image,
          // seoTitle: res.data?.seoTitle,
          // seoDescription: res.data?.seoDescription,
          // autoSeo: res.data?.autoSeo,
        };
        form.reset(data);
        setContent(res.data?.content || "");
      } else {
        toast.error(res.message);
      }
    }
    if (id) {
      getDetailContent(id);
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tạo bài viết </h1>
        <Button onClick={form.handleSubmit(handleSave)}>Lưu</Button>
      </div>
      <Form {...form}>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card className="p-4">
                <h2 className="text-lg font-bold border-b pb-2">THÔNG TIN CHI TIẾT</h2>
                <p className="text-sm italic">Trường có dấu (*) bắt buộc phải nhập thông tin !</p>

                <InputControl
                  control={form.control}
                  name="title"
                  label="Tên bài viết:"
                  required
                  rules={{ required: "Tên bài viết là bắt buộc" }}
                />
                <InputControl
                  control={form.control}
                  name="slug"
                  label="Slug (URL thân thiện):"
                  required
                  rules={{ required: "Slug là bắt buộc" }}
                />
                <TextareaControl
                  control={form.control}
                  name="summary"
                  label="Mô tả bài viết:"
                  required
                  rules={{ required: "Mô tả bài viết là bắt buộc" }}
                />
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <Label className="text-right pt-2 self-start  ">Ảnh bài viết:</Label>
                  <div className="col-span-2">
                    <Controller
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <>
                          <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mb-2"
                          >
                            Chọn ảnh
                          </Button>
                          <Input
                            {...field}
                            ref={fileInputRef}
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const imageURL = URL.createObjectURL(file);
                                setPreview(imageURL);
                              }
                            }}
                          />
                          {preview && (
                            <div className="relative mt-2 w-32 h-32 border rounded overflow-hidden">
                              <img
                                src={preview}
                                alt="Preview"
                                className="object-cover w-full h-full"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setPreview(null);
                                  if (fileInputRef.current) fileInputRef.current.value = "";
                                  field.onChange(null);
                                }}
                                className="absolute top-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    />
                    {form.formState.errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.image.message}
                      </p>
                    )}
                  </div>
                </div>
                <Editor
                  control={form.control}
                  name="content"
                  label="Nội dung bài viết:"
                  defaultValue={content}
                  height={500}
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
                      disabled={true}
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

                {/* <div className="space-y-3">
                  <div>
                    <Label>Tên bài viết SEO:</Label>
                    <Controller
                      control={form.control}
                      name="seoTitle"
                      render={({ field }) => (
                        <Textarea rows={2} {...field} value={field.value || ""} className="mt-1" />
                      )}
                    />
                  </div>
                  <div>
                    <Label>Mô tả SEO:</Label>
                    <Controller
                      required
                      control={form.control}
                      name="seoDescription"
                      render={({ field }) => (
                        <Textarea rows={3} {...field} value={field.value || ""} className="mt-1" />
                      )}
                    />
                  </div>
                </div> */}
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
