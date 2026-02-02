import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Building2, 
  Search,
  Filter,
  Eye,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin,
  FileText,
  Edit,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { MfiRegistration, QuestionnaireModule, QuestionnaireQuestion, MfiResponse } from "@shared/schema";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  in_review: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  contacted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  in_review: "En cours d'examen",
  approved: "Approuvé",
  rejected: "Rejeté",
  contacted: "Contacté",
};

export default function MfiSubmissions() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSubmission, setSelectedSubmission] = useState<MfiRegistration | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const { data: registrationsData, isLoading } = useQuery<{ success: boolean; data: MfiRegistration[] }>({
    queryKey: ["/api/admin/mfi/registrations"],
  });

  const { data: modulesData } = useQuery<{ success: boolean; data: QuestionnaireModule[] }>({
    queryKey: ["/api/admin/mfi/modules"],
  });

  const { data: detailsData, isLoading: detailsLoading } = useQuery<{
    success: boolean;
    data: { registration: MfiRegistration; responses: MfiResponse[] };
  }>({
    queryKey: ["/api/admin/mfi/registrations", selectedSubmission?.id],
    enabled: !!selectedSubmission?.id,
  });

  const { data: questionsData } = useQuery<{ success: boolean; data: QuestionnaireQuestion[] }>({
    queryKey: ["/api/admin/mfi/questions"],
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { status?: string; internalNotes?: string } }) => {
      const response = await apiRequest("PUT", `/api/admin/mfi/registrations/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/registrations"] });
      toast({
        title: "Succès",
        description: "La soumission a été mise à jour.",
      });
      setDetailsOpen(false);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Échec de la mise à jour.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/mfi/registrations/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/registrations"] });
      toast({
        title: "Supprimé",
        description: "La soumission a été supprimée.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Échec de la suppression.",
        variant: "destructive",
      });
    },
  });

  const registrations = registrationsData?.data || [];
  const modules = modulesData?.data || [];
  const questions = questionsData?.data || [];

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch = 
      reg.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.institutionalEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getModuleNames = (moduleIds: number[] | null) => {
    if (!moduleIds) return [];
    return modules
      .filter(m => moduleIds.includes(m.id))
      .map(m => m.nameFr);
  };

  const handleViewDetails = (reg: MfiRegistration) => {
    setSelectedSubmission(reg);
    setEditStatus(reg.status);
    setEditNotes(reg.internalNotes || "");
    setDetailsOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedSubmission) {
      updateMutation.mutate({
        id: selectedSubmission.id,
        data: { status: editStatus, internalNotes: editNotes },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/registrations"] })}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Building2 className="w-8 h-8 text-orange-400" />
            Soumissions IMF
          </h1>
          <p className="text-blue-200 mt-2">
            Gérez les demandes d'intégration des institutions de microfinance
          </p>
        </motion.div>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                <Input
                  placeholder="Rechercher par nom, pays ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="in_review">En examen</SelectItem>
                  <SelectItem value="contacted">Contacté</SelectItem>
                  <SelectItem value="approved">Approuvé</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
            <span className="ml-2 text-white">Chargement...</span>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="py-20 text-center">
              <Building2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60 text-lg">Aucune soumission trouvée</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map((reg, index) => (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white truncate">
                              {reg.institutionName}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-blue-200">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {reg.country}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {reg.institutionalEmail}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {reg.phoneNumber}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {getModuleNames(reg.selectedModules).map((name, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                  {name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Badge className={`${statusColors[reg.status]} border`}>
                          {statusLabels[reg.status]}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-blue-200">
                          <Clock className="w-3 h-3" />
                          {new Date(reg.submittedAt).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => handleViewDetails(reg)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Détails
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                            onClick={() => {
                              if (confirm("Supprimer cette soumission ?")) {
                                deleteMutation.mutate(reg.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-400" />
                {selectedSubmission?.institutionName}
              </DialogTitle>
              <DialogDescription className="text-blue-200">
                Détails de la soumission et réponses au questionnaire
              </DialogDescription>
            </DialogHeader>

            {detailsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
              </div>
            ) : (
              <div className="space-y-6 py-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-blue-300 text-sm">Pays</span>
                      <p className="text-white">{selectedSubmission?.country}</p>
                    </div>
                    <div>
                      <span className="text-blue-300 text-sm">Email</span>
                      <p className="text-white">{selectedSubmission?.institutionalEmail}</p>
                    </div>
                    <div>
                      <span className="text-blue-300 text-sm">Téléphone</span>
                      <p className="text-white">{selectedSubmission?.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-blue-300 text-sm">Contact</span>
                      <p className="text-white">
                        {selectedSubmission?.contactPersonName || "Non spécifié"}
                        {selectedSubmission?.contactPersonTitle && ` (${selectedSubmission.contactPersonTitle})`}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-300 text-sm">Date de soumission</span>
                      <p className="text-white">
                        {selectedSubmission && new Date(selectedSubmission.submittedAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-blue-300 text-sm block mb-2">Modules sélectionnés</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission && getModuleNames(selectedSubmission.selectedModules).map((name, idx) => (
                      <Badge key={idx} className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {detailsData?.data?.responses && detailsData.data.responses.length > 0 && (
                  <div>
                    <span className="text-blue-300 text-sm block mb-3">Réponses au questionnaire</span>
                    <div className="space-y-3 bg-white/5 rounded-lg p-4">
                      {detailsData.data.responses.map((response) => {
                        const question = questions.find(q => q.id === response.questionId);
                        return (
                          <div key={response.id} className="border-b border-white/10 pb-3 last:border-0">
                            <span className="text-blue-200 text-sm">{question?.questionTextFr || `Question ${response.questionId}`}</span>
                            <p className="text-white mt-1">
                              {Array.isArray(response.responseValue) 
                                ? response.responseValue.join(", ") 
                                : String(response.responseValue)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="border-t border-white/20 pt-4 space-y-4">
                  <div>
                    <Label className="text-blue-300">Statut</Label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="in_review">En examen</SelectItem>
                        <SelectItem value="contacted">Contacté</SelectItem>
                        <SelectItem value="approved">Approuvé</SelectItem>
                        <SelectItem value="rejected">Rejeté</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-blue-300">Notes internes</Label>
                    <Textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Ajoutez des notes internes..."
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => setDetailsOpen(false)}
              >
                Fermer
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleSaveChanges}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Edit className="w-4 h-4 mr-2" />
                )}
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
