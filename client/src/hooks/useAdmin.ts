import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { AdminLogin } from "@shared/schema";

export function useAdminAuth() {
  const queryClient = useQueryClient();

  const { data: admin, isLoading } = useQuery({
    queryKey: ["/api/admin/me"],
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: AdminLogin) => {
      return await apiRequest('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/me"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/admin/logout', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/admin/me"], null);
    },
  });

  return {
    admin: admin?.user,
    isLoading,
    isAuthenticated: !!admin?.user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  };
}