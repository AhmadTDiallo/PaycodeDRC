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
import { UserPlus, Edit, Trash2, Users, Shield, User, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function UserManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

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
  const { data: usersResponse, isLoading } = useQuery({
    queryKey: ["/api/admin/users"],
  });

  const users = usersResponse?.data || [];

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (data: InsertAdminUser) => {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create admin user");
      }
      
      return await response.json();
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
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete admin user");
      }
      
      return await response.json();
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

  const getRoleBadge = (role: string) => {
    if (role === "superadmin") {
      return <Badge variant="destructive" className="gap-1"><Shield size={12} />Super Administrateur</Badge>;
    }
    return <Badge variant="secondary" className="gap-1"><User size={12} />Administrateur</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Mobile Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-3 sm:px-6">
          <div className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocation("/admin/dashboard")}
                  className="p-1 sm:p-2 hover:bg-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                  Utilisateurs Admin
                </h1>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3 text-xs sm:text-sm"
                  >
                    <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Nouvel Admin</span>
                    <span className="sm:hidden">+</span>
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
      </header>

      {/* Compact Main Content */}
      <main className="px-3 sm:px-6 py-4 sm:py-6">
        <div className="mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm text-gray-600">
            Gérer les comptes administrateurs
          </p>
        </div>

        <Card className="bg-white shadow-sm border">
          <CardHeader className="bg-gray-50 border-b p-3 sm:p-4">
            <CardTitle className="text-gray-900 text-sm sm:text-base font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" />
              Administrateurs
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 sm:p-1">
            {isLoading ? (
              <div className="p-6 sm:p-8 text-center">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Chargement des utilisateurs...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-900 text-xs sm:text-sm px-2 sm:px-4">Nom</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">Email</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-xs sm:text-sm px-2 sm:px-4">Rôle</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-xs sm:text-sm px-2 sm:px-4 hidden md:table-cell">Statut</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-xs sm:text-sm px-2 sm:px-4 hidden lg:table-cell">Créé</TableHead>
                      <TableHead className="font-semibold text-gray-900 text-xs sm:text-sm px-2 sm:px-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user: AdminUser) => (
                      <TableRow key={user.id} className="bg-white hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900 text-xs sm:text-sm px-2 sm:px-4">
                          <div className="flex flex-col">
                            <span>{user.username}</span>
                            <span className="text-xs text-gray-500 sm:hidden">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700 text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">{user.email}</TableCell>
                        <TableCell className="px-2 sm:px-4">{getRoleBadge(user.role)}</TableCell>
                        <TableCell className="px-2 sm:px-4 hidden md:table-cell">
                          <Badge variant={user.isActive ? "default" : "secondary"} className="text-xs">
                            {user.isActive ? "Actif" : "Inactif"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 text-xs sm:text-sm px-2 sm:px-4 hidden lg:table-cell">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="px-2 sm:px-4">
                          <div className="flex gap-1 sm:gap-2">
                            {user.role !== "superadmin" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(user)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 sm:p-2"
                                disabled={deleteUserMutation.isPending}
                              >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {users.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 sm:py-8 text-gray-500 text-sm">
                          Aucun utilisateur administrateur trouvé
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}