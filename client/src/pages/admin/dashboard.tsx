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
    <div className="min-h-screen bg-gray-50">
      {/* Compact Mobile Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-3 sm:px-6">
          <div className="py-3 sm:py-4">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Admin PAYCODE DRC
              </h1>
              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-3">
                <span className="text-xs sm:text-sm text-gray-600 truncate">
                  <span className="hidden sm:inline">Connecté:</span> <strong>{admin?.username}</strong>
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  size="sm"
                  className="text-xs sm:text-sm h-8 px-3 border-red-200 text-red-600 hover:bg-red-50"
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Compact Main Content */}
      <main className="px-3 sm:px-6 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            Tableau de bord
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Gérez le contenu et les paramètres
          </p>
        </div>

        {/* Mobile-First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card 
            className="cursor-pointer active:scale-95 transition-transform bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-md"
            onClick={() => setLocation("/admin/news-form")}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-semibold truncate">Créer Article</h3>
                  <p className="text-xs text-blue-100 truncate">
                    Nouveau contenu
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer active:scale-95 transition-transform bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-md"
            onClick={() => setLocation("/admin/news-list")}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-semibold truncate">Gérer Articles</h3>
                  <p className="text-xs text-green-100 truncate">
                    Modifier & organiser
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer active:scale-95 transition-transform bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-md"
            onClick={() => setLocation("/admin/user-management")}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-semibold truncate">Utilisateurs</h3>
                  <p className="text-xs text-purple-100 truncate">
                    Gérer admins
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}