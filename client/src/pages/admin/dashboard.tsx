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

        {/* Mobile-Friendly Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow bg-white border-gray-200 shadow-sm"
            onClick={() => setLocation("/admin/news/new")}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <PlusCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Créer un article</h3>
                  <p className="text-xs sm:text-sm text-gray-700">Rédiger un nouvel article</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow bg-white border-gray-200 shadow-sm"
            onClick={() => setLocation("/admin/news")}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Gérer les articles</h3>
                  <p className="text-xs sm:text-sm text-gray-700">Voir et modifier les articles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow bg-white border-gray-200 shadow-sm sm:col-span-2 lg:col-span-1"
            onClick={() => setLocation("/admin/users")}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Gérer les utilisateurs</h3>
                  <p className="text-xs sm:text-sm text-gray-700">Comptes d'administration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}