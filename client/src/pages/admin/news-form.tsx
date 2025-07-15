import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminAuth } from "@/hooks/useAdmin";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload, Calendar } from "lucide-react";
import { insertNewsArticleSchema, type InsertNewsArticle } from "@shared/schema";
import { z } from "zod";

const categories = [
  "Actualités",
  "Technologie", 
  "Finance",
  "Partenariats",
  "Produits",
  "Événements"
];

export default function AdminNewsForm() {
  const params = useParams();
  const isEdit = !!params.id;
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: articleResponse } = useQuery({
    queryKey: [`/api/admin/news/${params.id}`],
    enabled: isEdit && isAuthenticated,
  });

  const form = useForm<InsertNewsArticle & { publishedDate?: string }>({
    resolver: zodResolver(insertNewsArticleSchema.extend({
      publishedDate: z.string().optional()
    })),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: "",
      author: "",
      imageUrl: "",
      isPublished: false,
      publishedDate: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, authLoading, setLocation]);

  useEffect(() => {
    if (articleResponse?.data) {
      const article = articleResponse.data;
      const publishedDate = article.publishedDate ? new Date(article.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      form.reset({
        title: article.title,
        summary: article.summary,
        content: article.content,
        category: article.category,
        author: article.author,
        imageUrl: article.imageUrl || "",
        isPublished: article.isPublished,
        publishedDate: publishedDate,
      });
      if (article.imageUrl) {
        setImagePreview(article.imageUrl);
      }
    }
  }, [articleResponse, form]);

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      form.setValue('imageUrl', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const createMutation = useMutation({
    mutationFn: async (data: InsertNewsArticle) => {
      return await apiRequest('POST', '/api/admin/news', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({
        title: "Article Created",
        description: "The article has been created successfully",
      });
      setLocation("/admin/news");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertNewsArticle) => {
      return await apiRequest('PUT', `/api/admin/news/${params.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: [`/api/admin/news/${params.id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({
        title: "Article Updated",
        description: "The article has been updated successfully",
      });
      setLocation("/admin/news");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update article",
        variant: "destructive",
      });
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const onSubmit = (data: InsertNewsArticle & { publishedDate?: string }) => {
    const { publishedDate, ...articleData } = data;
    const finalData = {
      ...articleData,
      publishedDate: publishedDate ? new Date(publishedDate) : new Date(),
    };
    
    if (isEdit) {
      updateMutation.mutate(finalData);
    } else {
      createMutation.mutate(finalData);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional CRM Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setLocation("/admin/news")}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Articles</span>
              </Button>
              <div className="h-6 w-px bg-slate-300"></div>
              <h1 className="text-xl font-semibold text-slate-900">
                {isEdit ? "Edit Article" : "Create New Article"}
              </h1>
            </div>
            <Button
              type="submit"
              form="news-form"
              disabled={isPending}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <Save className="h-4 w-4" />
              <span>{isPending ? "Saving..." : "Save Article"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Professional CRM Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-200">
            <CardTitle className="text-slate-900 font-medium">
              Article Information
            </CardTitle>
            <p className="text-slate-600 text-sm mt-1">
              {isEdit ? "Update the article details below" : "Fill out the form to create a new article"}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form id="news-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Basic Information Section */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4 border-b border-slate-200 pb-2">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-slate-700 font-medium">Article Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the article title"
                              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Category *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Author *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter author name"
                              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4 border-b border-slate-200 pb-2">
                    Article Content
                  </h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Summary *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter a brief summary of the article"
                              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Full Content *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter the full article content"
                              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Media Section */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4 border-b border-slate-200 pb-2">
                    Featured Image
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Upload Image
                        </label>
                        <div className="flex items-center space-x-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            className="border-slate-300 text-slate-700 hover:bg-slate-50"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file);
                            }}
                          />
                          <span className="text-sm text-slate-500">
                            {selectedImage ? selectedImage.name : 'No file selected'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {imagePreview && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Preview
                        </label>
                        <div className="border border-slate-300 rounded-lg p-2 bg-slate-50">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-32 w-auto object-cover rounded"
                          />
                        </div>
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Or Enter Image URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/image.jpg"
                              className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (e.target.value) {
                                  setImagePreview(e.target.value);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Publishing Section */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4 border-b border-slate-200 pb-2">
                    Publishing Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="publishedDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Publication Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <Input
                                type="date"
                                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isPublished"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0 pt-6">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </FormControl>
                          <FormLabel className="text-slate-700 font-medium">
                            Publish immediately
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}