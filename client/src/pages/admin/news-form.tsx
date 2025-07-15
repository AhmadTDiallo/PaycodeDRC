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
import { ArrowLeft, Save } from "lucide-react";
import { insertNewsArticleSchema, type InsertNewsArticle } from "@shared/schema";

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

  const { data: articleResponse } = useQuery({
    queryKey: [`/api/admin/news/${params.id}`],
    enabled: isEdit && isAuthenticated,
  });

  const form = useForm<InsertNewsArticle>({
    resolver: zodResolver(insertNewsArticleSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: "",
      author: "",
      imageUrl: "",
      isPublished: false,
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
      form.reset({
        title: article.title,
        summary: article.summary,
        content: article.content,
        category: article.category,
        author: article.author,
        imageUrl: article.imageUrl || "",
        isPublished: article.isPublished,
      });
    }
  }, [articleResponse, form]);

  const createMutation = useMutation({
    mutationFn: async (data: InsertNewsArticle) => {
      return await apiRequest('/api/admin/news', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      toast({
        title: "Article créé",
        description: "L'article a été créé avec succès",
      });
      setLocation("/admin/news");
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'article",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertNewsArticle) => {
      return await apiRequest(`/api/admin/news/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: [`/api/admin/news/${params.id}`] });
      toast({
        title: "Article mis à jour",
        description: "L'article a été modifié avec succès",
      });
      setLocation("/admin/news");
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'article",
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

  const onSubmit = (data: InsertNewsArticle) => {
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setLocation("/admin/news")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour</span>
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                {isEdit ? "Modifier l'article" : "Nouvel article"}
              </h1>
            </div>
            <Button
              type="submit"
              form="news-form"
              disabled={isPending}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              <span>{isPending ? "Enregistrement..." : "Enregistrer"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEdit ? "Modifier l'article" : "Créer un nouvel article"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form id="news-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Titre *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Entrez le titre de l'article"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une catégorie" />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auteur *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nom de l'auteur"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>URL de l'image</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://exemple.com/image.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Résumé *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Entrez un résumé de l'article"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Contenu *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Entrez le contenu complet de l'article"
                            className="min-h-[300px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Publier l'article
                          </FormLabel>
                          <div className="text-sm text-gray-600">
                            L'article sera visible sur le site web
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}