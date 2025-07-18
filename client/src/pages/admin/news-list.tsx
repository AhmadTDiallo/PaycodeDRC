import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminAuth } from "@/hooks/useAdmin";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Settings
} from "lucide-react";
import { NewsArticle } from "@shared/schema";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function AdminNewsList() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: articlesResponse, isLoading } = useQuery({
    queryKey: ["/api/admin/news"],
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest('DELETE', `/api/admin/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] }); // Invalidate public news cache
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest('PATCH', `/api/admin/news/${id}/publish`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      queryClient.invalidateQueries({ queryKey: ["/api/news"] }); // Invalidate public news cache
      toast({
        title: "Statut mis à jour", 
        description: "Le statut de publication a été modifié",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, authLoading, setLocation]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600"></div>
          <div className="absolute inset-0 animate-pulse">
            <div className="h-12 w-12 bg-green-100 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const articles: NewsArticle[] = articlesResponse?.data || [];

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleTogglePublish = (id: number) => {
    togglePublishMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Modern Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-green-100">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/admin/dashboard")}
                  className="p-2 sm:p-3 hover:bg-green-100 text-green-900 rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-md">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Gérer Articles
                    </h1>
                    <p className="text-sm text-gray-600 hidden sm:block">
                      Modifier et organiser le contenu
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-green-100 to-green-200 px-3 py-2 rounded-full">
                  <span className="text-sm text-green-800 font-medium">
                    {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                <Button
                  onClick={() => setLocation("/admin/news-form")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Nouvel Article</span>
                  <span className="sm:hidden">Créer</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 sm:p-12 shadow-xl max-w-md mx-auto">
              <div className="mb-6">
                <div className="bg-green-300 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-3">
                Aucun article trouvé
              </h3>
              <p className="text-green-700 text-sm sm:text-base mb-6">
                Créez votre premier article pour commencer à publier du contenu sur votre site.
              </p>
              <Button
                onClick={() => setLocation("/admin/news-form")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Créer le premier article
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article, index) => (
              <Card key={article.id} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                index % 2 === 0 
                  ? 'bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500' 
                  : 'bg-gradient-to-br from-blue-50 to-white border-l-4 border-l-blue-500'
              } rounded-2xl overflow-hidden`}>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 break-words">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={article.isPublished ? "default" : "secondary"}
                            className={article.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {article.isPublished ? "Publié" : "Brouillon"}
                          </Badge>
                          <Badge variant="outline" className="border-gray-300 text-gray-700">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm sm:text-base text-gray-700 mb-3 line-clamp-2">
                        {article.summary}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>
                            {format(new Date(article.createdAt), "dd MMM yyyy", { locale: fr })}
                          </span>
                        </div>
                        {article.publishedDate && (
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>
                              Publié le {format(new Date(article.publishedDate), "dd MMM yyyy", { locale: fr })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePublish(article.id)}
                        disabled={togglePublishMutation.isPending}
                        className={`flex items-center justify-center space-x-1 text-xs sm:text-sm transition-all duration-200 rounded-full ${
                          article.isPublished 
                            ? 'border-red-300 text-red-700 hover:bg-red-50' 
                            : 'border-green-300 text-green-700 hover:bg-green-50'
                        }`}
                      >
                        {article.isPublished ? (
                          <>
                            <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Dépublier</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Publier</span>
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLocation(`/admin/news/${article.id}/edit`)}
                        className="flex items-center justify-center space-x-1 border-blue-300 text-blue-700 hover:bg-blue-50 text-xs sm:text-sm"
                      >
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Modifier</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                        disabled={deleteMutation.isPending}
                        className="flex items-center justify-center space-x-1 border-red-300 text-red-600 hover:bg-red-50 text-xs sm:text-sm"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Supprimer</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}