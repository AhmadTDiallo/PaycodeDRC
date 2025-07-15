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
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Portail d'Administration PAYCODE DRC
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Connecté en tant que: <strong className="text-gray-900">{admin?.username}</strong>
              </span>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h2>
          <p className="text-gray-700">
            Gérez le contenu et les paramètres de votre site web
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow bg-white border-gray-200 shadow-sm"
            onClick={() => setLocation("/admin/news/new")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <PlusCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Créer un article</h3>
                  <p className="text-sm text-gray-700">Rédiger un nouvel article</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow bg-white border-gray-200 shadow-sm"
            onClick={() => setLocation("/admin/news")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Gérer les articles</h3>
                  <p className="text-sm text-gray-700">Voir et modifier les articles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow bg-white border-gray-200 shadow-sm"
            onClick={() => setLocation("/admin/users")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Gérer les utilisateurs</h3>
                  <p className="text-sm text-gray-700">Comptes d'administration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}