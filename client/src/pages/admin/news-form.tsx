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

  // Create a simplified form schema for client-side validation
  const clientFormSchema = z.object({
    title: z.string().min(1, "Titre requis"),
    summary: z.string().min(1, "Résumé requis"),
    content: z.string().min(1, "Contenu requis"),
    category: z.string().min(1, "Catégorie requise"),
    author: z.string().min(1, "Auteur requis"),
    imageUrl: z.string().optional(),
    isPublished: z.boolean().default(false),
    publishedDate: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(clientFormSchema),
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
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/admin/news', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({
        title: "Article Créé",
        description: "L'article a été créé avec succès",
      });
      setLocation("/admin/news");
    },
    onError: (error: any) => {
      console.error("Create article error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création de l'article",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('PUT', `/api/admin/news/${params.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: [`/api/admin/news/${params.id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({
        title: "Article Mis à Jour",
        description: "L'article a été mis à jour avec succès",
      });
      setLocation("/admin/news");
    },
    onError: (error: any) => {
      console.error("Update article error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Échec de la mise à jour de l'article",
        variant: "destructive",
      });
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const onSubmit = (data: InsertNewsArticle & { publishedDate?: string }) => {
    // Send the date as a string, let server handle conversion
    const finalData = {
      title: data.title || "",
      summary: data.summary || "",
      content: data.content || "",
      category: data.category || "",
      author: data.author || "",
      imageUrl: data.imageUrl || "",
      isPublished: data.isPublished || false,
      publishedDate: data.publishedDate || new Date().toISOString().split('T')[0],
    };
    
    console.log("Submitting article data:", finalData); // Debug log
    
    if (isEdit) {
      updateMutation.mutate(finalData);
    } else {
      createMutation.mutate(finalData);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile-Friendly Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-0 sm:h-16 gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <Button
                variant="ghost"
                onClick={() => setLocation("/admin/news")}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 w-full sm:w-auto justify-start"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour aux Articles</span>
              </Button>
              <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                {isEdit ? "Modifier l'Article" : "Créer un Nouvel Article"}
              </h1>
            </div>
            <Button
              type="submit"
              form="news-form"
              disabled={isPending}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white shadow-sm w-full sm:w-auto"
              size="sm"
            >
              <Save className="h-4 w-4" />
              <span>{isPending ? "Sauvegarde..." : "Sauvegarder l'Article"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile-Friendly Admin Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Card className="shadow-md border-gray-200 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-4 sm:p-6">
            <CardTitle className="text-gray-900 font-semibold text-base sm:text-lg">
              Informations de l'Article
            </CardTitle>
            <p className="text-gray-700 text-xs sm:text-sm mt-1">
              {isEdit ? "Mettez à jour les détails de l'article ci-dessous" : "Remplissez le formulaire pour créer un nouvel article"}
            </p>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8 bg-white">
            <Form {...form}>
              <form id="news-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                
                {/* Basic Information Section */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-300 rounded-xl p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 border-b border-gray-300 pb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Informations de Base
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-gray-800 font-semibold text-sm">Titre de l'Article *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez le titre de l'article"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white text-gray-900 h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm">Catégorie *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white text-gray-900 h-11">
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-gray-300">
                              {categories.map((category) => (
                                <SelectItem key={category} value={category} className="text-gray-900">
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-600 font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm">Auteur *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez le nom de l'auteur"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white text-gray-900 h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-gray-300 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Contenu de l'Article
                  </h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm">Résumé *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Entrez un bref résumé de l'article"
                              className="border-gray-300 focus:border-green-500 focus:ring-green-200 bg-white text-gray-900 min-h-[90px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm">Contenu Complet *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Entrez le contenu complet de l'article"
                              className="border-gray-300 focus:border-green-500 focus:ring-green-200 bg-white text-gray-900 min-h-[220px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Media Section */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-gray-300 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Image Principale
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Télécharger une Image depuis l'Ordinateur
                        </label>
                        <div className="flex items-center space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            className="border-gray-300 text-gray-800 hover:bg-purple-50 bg-white h-11 px-6"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choisir un Fichier
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
                          <span className="text-sm text-gray-700 font-medium">
                            {selectedImage ? selectedImage.name : 'Aucun fichier sélectionné'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {imagePreview && (
                      <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Aperçu de l'Image
                        </label>
                        <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-40 w-auto object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm">Ou Entrez l'URL de l'Image</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/image.jpg"
                              className="border-gray-300 focus:border-purple-500 focus:ring-purple-200 bg-white text-gray-900 h-11"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (e.target.value) {
                                  setImagePreview(e.target.value);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Publishing Section */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-gray-300 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-3 flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Options de Publication
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="publishedDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm">Date de Publication</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                              <Input
                                type="date"
                                className="border-gray-300 focus:border-orange-500 focus:ring-orange-200 bg-white text-gray-900 pl-10 h-11"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isPublished"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-4 space-y-0 pt-6">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-green-600"
                            />
                          </FormControl>
                          <FormLabel className="text-gray-800 font-semibold text-sm">
                            Publier immédiatement
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