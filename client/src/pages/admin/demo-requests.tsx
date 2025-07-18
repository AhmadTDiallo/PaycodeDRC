import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useAdminAuth } from "@/hooks/useAdmin";
import { ArrowLeft, FileText, User, Building, Phone, MessageSquare, Calendar, Mail } from "lucide-react";
import { useLocation } from "wouter";
import { formatSafeDate } from "@/lib/utils";
import type { DemoRequest } from "@shared/schema";

export default function DemoRequests() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewMessage = (request: DemoRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Mobile-friendly Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="px-3 sm:px-6">
          <div className="py-4 sm:py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocation("/admin/dashboard")}
                  className="p-2 sm:p-3 hover:bg-blue-100 text-blue-900 rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-xl shadow-md">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                      Demandes Client
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                      Gérer les demandes de démonstration
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg">
                  <span className="text-sm sm:text-base font-bold">
                    {requests.length}
                  </span>
                  <span className="text-xs sm:text-sm ml-1 font-medium">
                    {requests.length !== 1 ? 'demandes' : 'demande'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-3 sm:px-6 py-6 sm:py-8">
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 border-b-0 p-4 sm:p-6">
            <CardTitle className="text-white text-base sm:text-lg font-bold flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <div>Demandes de Démonstration</div>
                <div className="text-blue-100 text-sm font-normal mt-1">
                  Consultez et gérez toutes les demandes client
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 sm:p-12 text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                  <div className="absolute inset-0 animate-pulse">
                    <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-100 rounded-full mx-auto opacity-20"></div>
                  </div>
                </div>
                <p className="text-gray-700 mt-4 text-base sm:text-lg font-medium">Chargement des demandes...</p>
                <p className="text-gray-500 mt-1 text-sm">Veuillez patienter</p>
              </div>
            ) : (
              <div className="space-y-0">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-blue-50 to-orange-50 border-b-2 border-blue-200">
                        <TableHead className="font-bold text-blue-900 text-sm px-6 py-4">Client</TableHead>
                        <TableHead className="font-bold text-blue-900 text-sm px-6 py-4">Entreprise</TableHead>
                        <TableHead className="font-bold text-blue-900 text-sm px-6 py-4">Contact</TableHead>
                        <TableHead className="font-bold text-blue-900 text-sm px-6 py-4">Message</TableHead>
                        <TableHead className="font-bold text-blue-900 text-sm px-6 py-4">Date</TableHead>
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
                            <div className="flex items-center gap-2">
                              <div className="truncate flex-1">
                                {request.message.length > 50 ? `${request.message.substring(0, 50)}...` : request.message}
                              </div>
                              {request.message.length > 50 && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleViewMessage(request)}
                                  className="text-xs px-2 py-1 h-auto bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  Voir plus
                                </Button>
                              )}
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
                <div className="lg:hidden space-y-4 p-4 sm:p-6">
                  {requests.map((request: DemoRequest, index) => (
                    <Card key={request.id} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      index % 2 === 0 
                        ? 'bg-gradient-to-br from-blue-50 to-white border-l-4 border-l-blue-500' 
                        : 'bg-gradient-to-br from-orange-50 to-white border-l-4 border-l-orange-500'
                    } rounded-2xl overflow-hidden`}>
                      <CardContent className="p-5">
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
                          <div className={`space-y-2 rounded-xl p-4 ${
                            index % 2 === 0 
                              ? 'bg-blue-100/50' 
                              : 'bg-orange-100/50'
                          }`}>
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
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 justify-between">
                              <div className="flex items-center gap-2">
                                <MessageSquare className={`h-4 w-4 flex-shrink-0 ${
                                  index % 2 === 0 ? 'text-blue-600' : 'text-orange-600'
                                }`} />
                                <span className="text-sm font-bold text-gray-900">Message:</span>
                              </div>
                              {request.message.length > 100 && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleViewMessage(request)}
                                  className={`text-xs px-3 py-2 h-auto text-white font-semibold rounded-full shadow-md ${
                                    index % 2 === 0 
                                      ? 'bg-blue-600 hover:bg-blue-700' 
                                      : 'bg-orange-600 hover:bg-orange-700'
                                  }`}
                                >
                                  Voir complet
                                </Button>
                              )}
                            </div>
                            <div className={`text-sm text-gray-800 leading-relaxed rounded-xl p-4 shadow-sm ${
                              index % 2 === 0 
                                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600' 
                                : 'bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-600'
                            }`}>
                              {request.message.length > 100 ? `${request.message.substring(0, 100)}...` : request.message}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {requests.length === 0 && (
                    <div className="p-8 sm:p-12 text-center">
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-lg">
                        <div className="mb-4">
                          <div className="bg-gray-300 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                            <FileText className="h-8 w-8 text-gray-500" />
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Aucune demande trouvée</h3>
                        <p className="text-gray-500 text-sm">
                          Les demandes de démonstration apparaîtront ici une fois soumises par les clients.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedRequest && (
              <>
                <DialogHeader className="bg-blue-50 -m-6 mb-4 p-6 border-b">
                  <DialogTitle className="text-xl font-bold text-blue-900">
                    Message de {selectedRequest.name}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Détails complets de la demande de démonstration
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Client Info */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{selectedRequest.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{selectedRequest.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{selectedRequest.email}</span>
                    </div>
                    {selectedRequest.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{selectedRequest.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">
                        {formatSafeDate(selectedRequest.createdAt, "dd MMMM yyyy 'à' HH:mm")}
                      </span>
                    </div>
                  </div>

                  {/* Full Message */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-orange-100 p-3 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-orange-600" />
                      <h3 className="text-lg font-bold text-orange-900">Message complet:</h3>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-r-lg p-4 shadow-sm">
                      <p className="text-gray-900 leading-relaxed whitespace-pre-wrap font-medium">
                        {selectedRequest.message}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}