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
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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
    imageUrls: z.array(z.string()).optional(),
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
      imageUrls: [],
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
        imageUrls: article.imageUrls || [],
        isPublished: article.isPublished,
        publishedDate: publishedDate,
      });
      if (article.imageUrl) {
        setImagePreview(article.imageUrl);
      }
      if (article.imageUrls && article.imageUrls.length > 0) {
        setImagePreviews(article.imageUrls);
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

  const handleMultipleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setSelectedImages(prev => [...prev, ...fileArray]);
    
    const newPreviews: string[] = [];
    const readers: FileReader[] = [];
    
    fileArray.forEach((file, index) => {
      const reader = new FileReader();
      readers.push(reader);
      reader.onloadend = () => {
        newPreviews[index] = reader.result as string;
        
        // Update when all readers are done
        if (newPreviews.filter(Boolean).length === fileArray.length) {
          setImagePreviews(prev => {
            const updated = [...prev, ...newPreviews];
            form.setValue('imageUrls', updated);
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => {
      const updated = prev.filter((_, i) => i !== index);
      form.setValue('imageUrls', updated);
      return updated;
    });
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
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
      imageUrls: data.imageUrls || [],
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
                onClick={() => setLocation("/admin/dashboard")}
                className="flex items-center space-x-2 text-gray-900 hover:text-gray-900 hover:bg-gray-100 w-full sm:w-auto justify-start"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 text-gray-900" />
                <span>Retour au Tableau de Bord</span>
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

      {/* Compact Mobile Content */}
      <main className="px-3 sm:px-6 py-4 sm:py-6">
        <Card className="shadow-sm border bg-white">
          <CardHeader className="bg-gray-50 border-b p-3 sm:p-4">
            <CardTitle className="text-gray-900 font-semibold text-sm sm:text-base">
              {isEdit ? "Modifier Article" : "Nouvel Article"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 bg-white">
            <Form {...form}>
              <form id="news-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                
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
                        <FormItem className="lg:col-span-2">
                          <FormLabel className="text-gray-800 font-semibold text-sm sm:text-base">Titre de l'Article *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez le titre de l'article"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white text-gray-900 h-11 sm:h-12 text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm sm:text-base">Catégorie *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white text-gray-900 h-11 sm:h-12 text-sm sm:text-base">
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-gray-300">
                              {categories.map((category) => (
                                <SelectItem key={category} value={category} className="text-gray-900 text-sm sm:text-base">
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-600 font-medium text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm sm:text-base">Auteur *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez le nom de l'auteur"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white text-gray-900 h-11 sm:h-12 text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-gray-300 rounded-xl p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 border-b border-gray-300 pb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Contenu de l'Article
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm sm:text-base">Résumé *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Entrez un bref résumé de l'article"
                              className="border-gray-300 focus:border-green-500 focus:ring-green-200 bg-white text-gray-900 min-h-[70px] sm:min-h-[90px] text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-sm sm:text-base">Contenu Complet *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Entrez le contenu complet de l'article"
                              className="border-gray-300 focus:border-green-500 focus:ring-green-200 bg-white text-gray-900 min-h-[150px] sm:min-h-[220px] text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-medium text-xs sm:text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Media Section */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-gray-300 rounded-xl p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 border-b border-gray-300 pb-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Images de l'Article
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Télécharger une Image depuis l'Ordinateur
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            className="border-gray-300 text-gray-800 hover:bg-purple-50 bg-white h-10 sm:h-11 px-4 sm:px-6 w-full sm:w-auto text-sm sm:text-base"
                          >
                            <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
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

                    {/* Multiple Images Upload Section */}
                    <div className="mt-8 pt-6 border-t border-gray-300">
                      <h4 className="text-base font-semibold text-gray-900 mb-4">Images Supplémentaires (Diaporama)</h4>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('multiple-image-upload')?.click()}
                            className="border-gray-300 text-gray-800 hover:bg-purple-50 bg-white h-10 sm:h-11 px-4 sm:px-6 w-full sm:w-auto text-sm sm:text-base"
                          >
                            <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                            Ajouter Plusieurs Images
                          </Button>
                          <input
                            id="multiple-image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleMultipleImageUpload(e.target.files)}
                          />
                          <span className="text-sm text-gray-700 font-medium">
                            {imagePreviews.length > 0 ? `${imagePreviews.length} image(s) sélectionnée(s)` : 'Aucune image supplémentaire'}
                          </span>
                        </div>

                        {/* Preview grid for multiple images */}
                        {imagePreviews.length > 0 && (
                          <div className="mt-6">
                            <label className="block text-sm font-semibold text-gray-800 mb-3">
                              Aperçu des Images du Diaporama
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative border border-gray-300 rounded-lg p-2 bg-white shadow-sm">
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="h-24 w-full object-cover rounded-md"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                                    onClick={() => removeImage(index)}
                                  >
                                    ×
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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