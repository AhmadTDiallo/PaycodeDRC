import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertAdminUserSchema, type AdminUser, type InsertAdminUser } from "@shared/schema";
import { UserPlus, Edit, Trash2, Users, Shield, User, ArrowLeft, Settings } from "lucide-react";
import { useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/useAdmin";

export default function UserManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();

  const form = useForm<InsertAdminUser>({
    resolver: zodResolver(insertAdminUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "admin",
      isActive: true,
    },
  });

  // Fetch all admin users
  const { data: usersResponse, isLoading, error } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  const users = usersResponse?.data || [];

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (data: InsertAdminUser) => {
      return await apiRequest('POST', '/api/admin/users', data);
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Utilisateur administrateur créé avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setIsCreateDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création de l'utilisateur administrateur",
        variant: "destructive",
      });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest('DELETE', `/api/admin/users/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Utilisateur administrateur supprimé avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la suppression de l'utilisateur administrateur",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertAdminUser) => {
    createUserMutation.mutate(data);
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (user.role === "superadmin") {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur superadmin",
        variant: "destructive",
      });
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.username}" ?`)) {
      deleteUserMutation.mutate(user.id);
    }
  };

  // Authentication check
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, authLoading, setLocation]);

  const getRoleBadge = (role: string) => {
    if (role === "superadmin") {
      return <Badge variant="destructive" className="gap-1"><Shield size={12} />Super Administrateur</Badge>;
    }
    return <Badge variant="secondary" className="gap-1"><User size={12} />Administrateur</Badge>;
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
          <div className="absolute inset-0 animate-pulse">
            <div className="h-12 w-12 bg-purple-100 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Modern Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-purple-100">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setLocation("/admin/dashboard")}
                  className="p-2 sm:p-3 hover:bg-purple-100 text-purple-900 rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl shadow-md">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Utilisateurs Admin
                    </h1>
                    <p className="text-sm text-gray-600 hidden sm:block">
                      Gérer les comptes administrateurs
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-3 py-2 rounded-full">
                  <span className="text-sm text-purple-800 font-medium">
                    {users.length} {users.length === 1 ? 'admin' : 'admins'}
                  </span>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Nouvel Admin</span>
                      <span className="sm:hidden">Créer</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="mx-3 sm:mx-0 max-w-sm sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">Nouvel Administrateur</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">Nom d'utilisateur</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="nom_utilisateur"
                                className="h-9 sm:h-10 text-xs sm:text-sm"
                                {...field}
                                disabled={createUserMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="email@exemple.com"
                                className="h-9 sm:h-10 text-xs sm:text-sm"
                                {...field}
                                disabled={createUserMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">Mot de passe</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Minimum 8 caractères"
                                className="h-9 sm:h-10 text-xs sm:text-sm"
                                {...field}
                                disabled={createUserMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs sm:text-sm">Rôle</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="admin">Administrateur</SelectItem>
                                <SelectItem value="superadmin">Super Administrateur</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2 pt-2">
                        <Button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm h-8 sm:h-9"
                          disabled={createUserMutation.isPending}
                        >
                          {createUserMutation.isPending ? "..." : "Créer"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsCreateDialogOpen(false)}
                          className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
                          disabled={createUserMutation.isPending}
                        >
                          Annuler
                        </Button>
                      </div>
                    </form>
                  </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {users.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 sm:p-12 shadow-xl max-w-md mx-auto">
              <div className="mb-6">
                <div className="bg-purple-300 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-3">
                Aucun administrateur
              </h3>
              <p className="text-purple-700 text-sm sm:text-base mb-6">
                Créez le premier compte administrateur pour commencer à gérer votre système.
              </p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Créer le premier admin
              </Button>
            </div>
          </div>
        ) : (
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 sm:p-8">
              <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                <Users className="h-6 w-6" />
                Liste des Administrateurs
              </CardTitle>
              <p className="text-purple-100 text-sm sm:text-base mt-2">
                Gérez les accès et permissions de vos administrateurs
              </p>
            </CardHeader>
            
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
                    <div className="absolute inset-0 animate-pulse">
                      <div className="h-12 w-12 bg-purple-100 rounded-full opacity-20 mx-auto"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-4 text-sm sm:text-base">Chargement des utilisateurs...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                        <th className="text-left font-bold text-purple-900 text-sm px-4 sm:px-6 py-4">Administrateur</th>
                        <th className="text-left font-bold text-purple-900 text-sm px-4 sm:px-6 py-4 hidden sm:table-cell">Email</th>
                        <th className="text-left font-bold text-purple-900 text-sm px-4 sm:px-6 py-4">Rôle</th>
                        <th className="text-left font-bold text-purple-900 text-sm px-4 sm:px-6 py-4 hidden md:table-cell">Statut</th>
                        <th className="text-left font-bold text-purple-900 text-sm px-4 sm:px-6 py-4 hidden lg:table-cell">Créé le</th>
                        <th className="text-center font-bold text-purple-900 text-sm px-4 sm:px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: AdminUser, index) => (
                        <tr key={user.id} className={`transition-all duration-200 hover:bg-purple-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } border-b border-gray-100`}>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                user.role === 'superadmin' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'
                              }`}>
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm sm:text-base">{user.username}</div>
                                <div className="text-xs text-gray-500 sm:hidden">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-gray-700 text-sm hidden sm:table-cell">{user.email}</td>
                          <td className="px-4 sm:px-6 py-4">
                            {user.role === "superadmin" ? (
                              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 gap-1">
                                <Shield size={12} />Super Admin
                              </Badge>
                            ) : (
                              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 gap-1">
                                <User size={12} />Admin
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                            <Badge variant={user.isActive ? "default" : "secondary"} className={
                              user.isActive 
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-0" 
                                : "bg-gray-200 text-gray-700"
                            }>
                              {user.isActive ? "Actif" : "Inactif"}
                            </Badge>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">
                            {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex justify-center">
                              {user.role !== "superadmin" ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteUser(user)}
                                  className="border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 transition-all duration-200 rounded-full px-3 py-1"
                                  disabled={deleteUserMutation.isPending}
                                >
                                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                  <span className="hidden sm:inline">Supprimer</span>
                                </Button>
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  Protégé
                                </Badge>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-gray-500 text-sm">
                            <div className="flex flex-col items-center gap-2">
                              <Users className="h-8 w-8 text-gray-400" />
                              <span>Aucun utilisateur administrateur trouvé</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}