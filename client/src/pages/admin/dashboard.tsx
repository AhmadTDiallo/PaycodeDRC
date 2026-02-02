import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircle, FileText, Users, Settings, BarChart3, MessageSquare, Building2, ClipboardList } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          <div className="absolute inset-0 animate-pulse">
            <div className="h-12 w-12 bg-blue-100 rounded-full opacity-20"></div>
          </div>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Modern Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-blue-100">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-2xl shadow-lg">
                  <Settings className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Admin PAYCODE DRC
                  </h1>
                  <p className="text-sm text-gray-600 hidden sm:block">
                    Panneau de contrôle administrateur
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 rounded-full">
                  <span className="text-sm text-blue-800 font-medium">
                    <span className="hidden sm:inline">Connecté: </span>
                    <strong>{admin?.username}</strong>
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  size="sm"
                  className="text-sm px-4 py-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 transition-all duration-200 rounded-full"
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-2xl shadow-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Tableau de bord
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Gérez le contenu et les paramètres de votre plateforme
              </p>
            </div>
          </div>
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  Bienvenue, {admin?.username}!
                </h3>
                <p className="text-blue-100 text-sm sm:text-base">
                  Utilisez les outils ci-dessous pour gérer votre contenu et surveiller les activités.
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">4</div>
                  <div className="text-blue-200 text-sm">Modules actifs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          <Card 
            className="cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group"
            onClick={() => setLocation("/admin/news-form")}
          >
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <PlusCircle className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Créer Article</h3>
                  <p className="text-blue-100 text-sm sm:text-base">
                    Rédiger un nouveau contenu pour le site
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group"
            onClick={() => setLocation("/admin/news-list")}
          >
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Gérer Articles</h3>
                  <p className="text-green-100 text-sm sm:text-base">
                    Modifier et organiser le contenu existant
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group"
            onClick={() => setLocation("/admin/user-management")}
          >
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Utilisateurs Admin</h3>
                  <p className="text-purple-100 text-sm sm:text-base">
                    Gérer les comptes administrateurs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group"
            onClick={() => setLocation("/admin/demo-requests")}
          >
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Demandes Client</h3>
                  <p className="text-orange-100 text-sm sm:text-base">
                    Consulter les demandes de démonstration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group"
            onClick={() => setLocation("/admin/mfi-submissions")}
          >
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Soumissions IMF</h3>
                  <p className="text-teal-100 text-sm sm:text-base">
                    Gérer les demandes d'intégration IMF
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden group"
            onClick={() => setLocation("/admin/mfi-config")}
          >
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <ClipboardList className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Config Questionnaire</h3>
                  <p className="text-indigo-100 text-sm sm:text-base">
                    Configurer les modules et questions IMF
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 sm:mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Aperçu rapide</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">Articles</div>
                <div className="text-gray-600 text-sm sm:text-base">Contenu publié</div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">Actif</div>
                <div className="text-gray-600 text-sm sm:text-base">Statut système</div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">Admins</div>
                <div className="text-gray-600 text-sm sm:text-base">Utilisateurs actifs</div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">Demandes</div>
                <div className="text-gray-600 text-sm sm:text-base">Nouvelles requêtes</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}