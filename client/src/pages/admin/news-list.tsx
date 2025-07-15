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
  User
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
        title: "Article Deleted",
        description: "The article has been deleted successfully",
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
        title: "Status Updated", 
        description: "The publication status has been changed",
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
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
    <div className="min-h-screen bg-gray-100">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setLocation("/admin/dashboard")}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Articles Management
              </h1>
            </div>
            <Button
              onClick={() => setLocation("/admin/news/new")}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white shadow-sm"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create New Article</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Articles Found
              </h3>
              <p className="text-gray-700 mb-4">
                Get started by creating your first article
              </p>
              <Button
                onClick={() => setLocation("/admin/news/new")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Article
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {article.title}
                        </h3>
                        <Badge 
                          variant={article.isPublished ? "default" : "secondary"}
                          className={article.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {article.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {article.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-3 line-clamp-2">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(new Date(article.createdAt), "dd MMM yyyy", { locale: fr })}
                          </span>
                        </div>
                        {article.publishedDate && (
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>
                              Publié le {format(new Date(article.publishedDate), "dd MMM yyyy", { locale: fr })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePublish(article.id)}
                        disabled={togglePublishMutation.isPending}
                        className="flex items-center space-x-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        {article.isPublished ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            <span>Unpublish</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            <span>Publish</span>
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLocation(`/admin/news/${article.id}/edit`)}
                        className="flex items-center space-x-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                        disabled={deleteMutation.isPending}
                        className="flex items-center space-x-1 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
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