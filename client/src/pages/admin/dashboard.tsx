import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircle, FileText, Users } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { admin, isAuthenticated, isLoading, logout } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile-Friendly Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-0 sm:h-16 gap-4 sm:gap-0">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Portail d'Administration PAYCODE DRC
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <span className="text-sm text-gray-700">
                Connecté en tant que: <strong className="text-gray-900">{admin?.username}</strong>
              </span>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
                size="sm"
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            Gérez le contenu et les paramètres de votre site web
          </p>
        </div>

        {/* Mobile-Optimized Quick Actions */}
        <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm active:scale-95"
            onClick={() => setLocation("/admin/news/new")}
          >
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <PlusCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">Créer un article</h3>
                  <p className="text-sm text-gray-600 mt-1">Rédiger un nouvel article de blog</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm active:scale-95"
            onClick={() => setLocation("/admin/news")}
          >
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">Gérer les articles</h3>
                  <p className="text-sm text-gray-600 mt-1">Voir et modifier les articles existants</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200 shadow-sm active:scale-95 md:col-span-2 lg:col-span-1"
            onClick={() => setLocation("/admin/users")}
          >
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">Gérer les utilisateurs</h3>
                  <p className="text-sm text-gray-600 mt-1">Comptes et permissions d'administration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}