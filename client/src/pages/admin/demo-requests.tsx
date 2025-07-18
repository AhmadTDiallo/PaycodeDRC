import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminAuth } from "@/hooks/useAdmin";
import { ArrowLeft, FileText, User, Building, Phone, MessageSquare, Calendar, Mail } from "lucide-react";
import { useLocation } from "wouter";
import { formatSafeDate } from "@/lib/utils";
import type { DemoRequest } from "@shared/schema";

export default function DemoRequests() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();

  // Fetch all demo requests
  const { data: requestsResponse, isLoading, error } = useQuery({
    queryKey: ["/api/demo-requests"],
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  const requests = requestsResponse?.data || [];

  // Authentication check
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, authLoading, setLocation]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-friendly Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-3 sm:px-6">
          <div className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocation("/admin/dashboard")}
                  className="p-1 sm:p-2 hover:bg-gray-100 text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4 text-gray-900" />
                </Button>
                <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                  Demande du Client
                </h1>
              </div>
              
              <Badge variant="outline" className="text-xs sm:text-sm">
                {requests.length} demande{requests.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-3 sm:px-6 py-4 sm:py-6">
        <Card className="bg-white shadow-sm border">
          <CardHeader className="bg-gray-50 border-b p-3 sm:p-4">
            <CardTitle className="text-gray-900 text-sm sm:text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Demandes de Démonstration
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 sm:p-8 text-center">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Chargement des demandes...</p>
              </div>
            ) : (
              <div className="space-y-0">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-900 text-sm px-4">Client</TableHead>
                        <TableHead className="font-semibold text-gray-900 text-sm px-4">Entreprise</TableHead>
                        <TableHead className="font-semibold text-gray-900 text-sm px-4">Contact</TableHead>
                        <TableHead className="font-semibold text-gray-900 text-sm px-4">Message</TableHead>
                        <TableHead className="font-semibold text-gray-900 text-sm px-4">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((request: DemoRequest) => (
                        <TableRow key={request.id} className="bg-white hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900 text-sm px-4">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              {request.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm px-4">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-gray-500" />
                              {request.company}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3 text-gray-500" />
                                <span className="text-xs">{request.email}</span>
                              </div>
                              {request.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-gray-500" />
                                  <span className="text-xs">{request.phone}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm px-4 max-w-xs">
                            <div className="truncate" title={request.message}>
                              {request.message}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-gray-500" />
                              <span className="text-xs">
                                {formatSafeDate(request.createdAt, "dd/MM/yyyy")}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {requests.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500 text-sm">
                            Aucune demande de démonstration trouvée
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-3 p-3">
                  {requests.map((request: DemoRequest) => (
                    <Card key={request.id} className="border border-gray-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Header with name and company */}
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="font-semibold text-gray-900 text-sm">{request.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{request.company}</span>
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-gray-500 flex-shrink-0" />
                              <span className="text-xs text-gray-600 break-all">{request.email}</span>
                            </div>
                            {request.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3 text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-600">{request.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-gray-500 flex-shrink-0" />
                              <span className="text-xs text-gray-600">
                                {formatSafeDate(request.createdAt, "dd MMMM yyyy")}
                              </span>
                            </div>
                          </div>

                          {/* Message */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-900">Message:</span>
                            </div>
                            <div className="text-sm text-gray-700 leading-relaxed bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                              {request.message}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {requests.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm">Aucune demande de démonstration trouvée</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}