import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdmin";
import { adminLoginSchema, type AdminLogin } from "@shared/schema";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, isLoggingIn, loginError, isAuthenticated } = useAdminAuth();

  const form = useForm<AdminLogin>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/admin/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  useEffect(() => {
    if (loginError) {
      toast({
        title: "Erreur de connexion",
        description: "Nom d'utilisateur ou mot de passe invalide",
        variant: "destructive",
      });
    }
  }, [loginError, toast]);

  const onSubmit = (data: AdminLogin) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md mx-4 bg-white shadow-lg border-0">
        <CardHeader className="text-center px-4 sm:px-6 bg-white">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            Administration PAYCODE DRC
          </CardTitle>
          <p className="text-sm sm:text-base text-gray-700 font-medium mt-2">
            Connectez-vous pour accéder au panneau d'administration
          </p>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium text-sm sm:text-base">Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entrez votre nom d'utilisateur"
                        className="border-gray-300 focus:border-blue-500 text-sm sm:text-base h-10 sm:h-11"
                        {...field}
                        disabled={isLoggingIn}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-medium text-sm sm:text-base">Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        className="border-gray-300 focus:border-blue-500 text-sm sm:text-base h-10 sm:h-11"
                        {...field}
                        disabled={isLoggingIn}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 h-10 sm:h-11 text-sm sm:text-base"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}