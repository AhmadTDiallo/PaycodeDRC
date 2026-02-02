import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Loader2,
  GripVertical,
  CheckCircle2,
  XCircle,
  FileQuestion,
  Layers,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { QuestionnaireModule, QuestionnaireQuestion } from "@shared/schema";

export default function MfiQuestionnaireConfig() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("modules");
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<QuestionnaireModule | null>(null);
  const [moduleName, setModuleName] = useState("");
  const [moduleNameFr, setModuleNameFr] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [moduleDescFr, setModuleDescFr] = useState("");
  const [moduleIcon, setModuleIcon] = useState("Building");
  const [moduleActive, setModuleActive] = useState(true);

  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionnaireQuestion | null>(null);
  const [questionModuleId, setQuestionModuleId] = useState<number>(0);
  const [questionText, setQuestionText] = useState("");
  const [questionTextFr, setQuestionTextFr] = useState("");
  const [questionType, setQuestionType] = useState<string>("text");
  const [questionOptions, setQuestionOptions] = useState("");
  const [questionOptionsFr, setQuestionOptionsFr] = useState("");
  const [questionRequired, setQuestionRequired] = useState(false);
  const [questionActive, setQuestionActive] = useState(true);
  const [questionHelpText, setQuestionHelpText] = useState("");
  const [questionHelpTextFr, setQuestionHelpTextFr] = useState("");

  const { data: modulesData, isLoading: modulesLoading } = useQuery<{ success: boolean; data: QuestionnaireModule[] }>({
    queryKey: ["/api/admin/mfi/modules"],
  });

  const { data: questionsData, isLoading: questionsLoading } = useQuery<{ success: boolean; data: QuestionnaireQuestion[] }>({
    queryKey: ["/api/admin/mfi/questions"],
  });

  const modules = modulesData?.data || [];
  const questions = questionsData?.data || [];

  const createModuleMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/mfi/modules", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/modules"] });
      toast({ title: "Succès", description: "Module créé avec succès." });
      resetModuleForm();
    },
    onError: () => {
      toast({ title: "Erreur", description: "Échec de la création.", variant: "destructive" });
    },
  });

  const updateModuleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `/api/admin/mfi/modules/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/modules"] });
      toast({ title: "Succès", description: "Module mis à jour." });
      resetModuleForm();
    },
    onError: () => {
      toast({ title: "Erreur", description: "Échec de la mise à jour.", variant: "destructive" });
    },
  });

  const deleteModuleMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/mfi/modules/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/modules"] });
      toast({ title: "Supprimé", description: "Module supprimé." });
    },
    onError: () => {
      toast({ title: "Erreur", description: "Échec de la suppression.", variant: "destructive" });
    },
  });

  const createQuestionMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/mfi/questions", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/questions"] });
      toast({ title: "Succès", description: "Question créée avec succès." });
      resetQuestionForm();
    },
    onError: () => {
      toast({ title: "Erreur", description: "Échec de la création.", variant: "destructive" });
    },
  });

  const updateQuestionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `/api/admin/mfi/questions/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/questions"] });
      toast({ title: "Succès", description: "Question mise à jour." });
      resetQuestionForm();
    },
    onError: () => {
      toast({ title: "Erreur", description: "Échec de la mise à jour.", variant: "destructive" });
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/mfi/questions/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/mfi/questions"] });
      toast({ title: "Supprimé", description: "Question supprimée." });
    },
    onError: () => {
      toast({ title: "Erreur", description: "Échec de la suppression.", variant: "destructive" });
    },
  });

  const resetModuleForm = () => {
    setModuleDialogOpen(false);
    setEditingModule(null);
    setModuleName("");
    setModuleNameFr("");
    setModuleDesc("");
    setModuleDescFr("");
    setModuleIcon("Building");
    setModuleActive(true);
  };

  const resetQuestionForm = () => {
    setQuestionDialogOpen(false);
    setEditingQuestion(null);
    setQuestionModuleId(0);
    setQuestionText("");
    setQuestionTextFr("");
    setQuestionType("text");
    setQuestionOptions("");
    setQuestionOptionsFr("");
    setQuestionRequired(false);
    setQuestionActive(true);
    setQuestionHelpText("");
    setQuestionHelpTextFr("");
  };

  const handleEditModule = (module: QuestionnaireModule) => {
    setEditingModule(module);
    setModuleName(module.name);
    setModuleNameFr(module.nameFr);
    setModuleDesc(module.description || "");
    setModuleDescFr(module.descriptionFr || "");
    setModuleIcon(module.icon || "Building");
    setModuleActive(module.isActive);
    setModuleDialogOpen(true);
  };

  const handleEditQuestion = (question: QuestionnaireQuestion) => {
    setEditingQuestion(question);
    setQuestionModuleId(question.moduleId);
    setQuestionText(question.questionText);
    setQuestionTextFr(question.questionTextFr);
    setQuestionType(question.questionType);
    setQuestionOptions(question.options?.join("\n") || "");
    setQuestionOptionsFr(question.optionsFr?.join("\n") || "");
    setQuestionRequired(question.isRequired);
    setQuestionActive(question.isActive);
    setQuestionHelpText(question.helpText || "");
    setQuestionHelpTextFr(question.helpTextFr || "");
    setQuestionDialogOpen(true);
  };

  const handleSaveModule = () => {
    const data = {
      name: moduleName,
      nameFr: moduleNameFr,
      description: moduleDesc || null,
      descriptionFr: moduleDescFr || null,
      icon: moduleIcon,
      isActive: moduleActive,
    };
    if (editingModule) {
      updateModuleMutation.mutate({ id: editingModule.id, data });
    } else {
      createModuleMutation.mutate(data);
    }
  };

  const handleSaveQuestion = () => {
    const optionsArray = questionOptions.split("\n").filter(o => o.trim());
    const optionsFrArray = questionOptionsFr.split("\n").filter(o => o.trim());
    
    const data = {
      moduleId: questionModuleId,
      questionText,
      questionTextFr,
      questionType,
      options: optionsArray.length > 0 ? optionsArray : null,
      optionsFr: optionsFrArray.length > 0 ? optionsFrArray : null,
      isRequired: questionRequired,
      isActive: questionActive,
      helpText: questionHelpText || null,
      helpTextFr: questionHelpTextFr || null,
    };
    if (editingQuestion) {
      updateQuestionMutation.mutate({ id: editingQuestion.id, data });
    } else {
      createQuestionMutation.mutate(data);
    }
  };

  const toggleModuleExpand = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getQuestionsForModule = (moduleId: number) => {
    return questions.filter(q => q.moduleId === moduleId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au Dashboard
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-purple-400" />
            Configuration Questionnaire IMF
          </h1>
          <p className="text-blue-200 mt-2">
            Gérez les modules et questions du questionnaire d'intégration
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/10 border-white/20 mb-6">
            <TabsTrigger value="modules" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70">
              <Layers className="w-4 h-4 mr-2" />
              Modules ({modules.length})
            </TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70">
              <FileQuestion className="w-4 h-4 mr-2" />
              Questions ({questions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules">
            <div className="flex justify-end mb-4">
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => {
                  resetModuleForm();
                  setModuleDialogOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Module
              </Button>
            </div>

            {modulesLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            ) : (
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div 
                            className="flex items-center gap-4 flex-1 cursor-pointer"
                            onClick={() => toggleModuleExpand(module.id)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                              <Layers className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-white font-semibold">{module.nameFr}</h3>
                                {module.isActive ? (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Actif</Badge>
                                ) : (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Inactif</Badge>
                                )}
                              </div>
                              <p className="text-blue-200 text-sm">{module.descriptionFr || module.description}</p>
                            </div>
                            <div className="text-blue-200 text-sm">
                              {getQuestionsForModule(module.id).length} questions
                            </div>
                            {expandedModules.includes(module.id) ? (
                              <ChevronDown className="w-5 h-5 text-white/50" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-white/50" />
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditModule(module);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm("Supprimer ce module et toutes ses questions ?")) {
                                  deleteModuleMutation.mutate(module.id);
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {expandedModules.includes(module.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 pl-14 space-y-2"
                          >
                            {getQuestionsForModule(module.id).length === 0 ? (
                              <p className="text-white/50 text-sm py-2">Aucune question pour ce module</p>
                            ) : (
                              getQuestionsForModule(module.id).map((q) => (
                                <div 
                                  key={q.id} 
                                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                                >
                                  <div className="flex-1">
                                    <p className="text-white text-sm">{q.questionTextFr}</p>
                                    <div className="flex gap-2 mt-1">
                                      <Badge variant="secondary" className="text-xs">
                                        {q.questionType}
                                      </Badge>
                                      {q.isRequired && (
                                        <Badge className="bg-orange-500/20 text-orange-300 text-xs">
                                          Requis
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                                      onClick={() => handleEditQuestion(q)}
                                    >
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                                      onClick={() => {
                                        if (confirm("Supprimer cette question ?")) {
                                          deleteQuestionMutation.mutate(q.id);
                                        }
                                      }}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
                              onClick={() => {
                                resetQuestionForm();
                                setQuestionModuleId(module.id);
                                setQuestionDialogOpen(true);
                              }}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Ajouter une question
                            </Button>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="questions">
            <div className="flex justify-end mb-4">
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => {
                  resetQuestionForm();
                  setQuestionDialogOpen(true);
                }}
                disabled={modules.length === 0}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Question
              </Button>
            </div>

            {questionsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((question, index) => {
                  const module = modules.find(m => m.id === question.moduleId);
                  return (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-purple-500/20 text-purple-300">
                                  {module?.nameFr || "Module inconnu"}
                                </Badge>
                                <Badge variant="secondary">{question.questionType}</Badge>
                                {question.isRequired && (
                                  <Badge className="bg-orange-500/20 text-orange-300">Requis</Badge>
                                )}
                                {!question.isActive && (
                                  <Badge className="bg-red-500/20 text-red-400">Inactif</Badge>
                                )}
                              </div>
                              <p className="text-white">{question.questionTextFr}</p>
                              <p className="text-blue-200 text-sm mt-1">{question.questionText}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10"
                                onClick={() => handleEditQuestion(question)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                                onClick={() => {
                                  if (confirm("Supprimer cette question ?")) {
                                    deleteQuestionMutation.mutate(question.id);
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={moduleDialogOpen} onOpenChange={setModuleDialogOpen}>
          <DialogContent className="max-w-lg bg-slate-900 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>{editingModule ? "Modifier le Module" : "Nouveau Module"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-300">Nom (EN)</Label>
                  <Input
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    placeholder="Core Banking"
                  />
                </div>
                <div>
                  <Label className="text-blue-300">Nom (FR)</Label>
                  <Input
                    value={moduleNameFr}
                    onChange={(e) => setModuleNameFr(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    placeholder="Banque Centrale"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-300">Description (EN)</Label>
                  <Textarea
                    value={moduleDesc}
                    onChange={(e) => setModuleDesc(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-blue-300">Description (FR)</Label>
                  <Textarea
                    value={moduleDescFr}
                    onChange={(e) => setModuleDescFr(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-blue-300">Icône</Label>
                  <Select value={moduleIcon} onValueChange={setModuleIcon}>
                    <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Building">Building</SelectItem>
                      <SelectItem value="CreditCard">CreditCard</SelectItem>
                      <SelectItem value="Shield">Shield</SelectItem>
                      <SelectItem value="Wallet">Wallet</SelectItem>
                      <SelectItem value="Settings">Settings</SelectItem>
                      <SelectItem value="Building2">Building2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch checked={moduleActive} onCheckedChange={setModuleActive} />
                  <Label className="text-blue-300">Actif</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-white/20 text-white" onClick={resetModuleForm}>
                Annuler
              </Button>
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={handleSaveModule}
                disabled={!moduleName || !moduleNameFr || createModuleMutation.isPending || updateModuleMutation.isPending}
              >
                {(createModuleMutation.isPending || updateModuleMutation.isPending) && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                {editingModule ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={questionDialogOpen} onOpenChange={setQuestionDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle>{editingQuestion ? "Modifier la Question" : "Nouvelle Question"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-blue-300">Module</Label>
                <Select value={questionModuleId.toString()} onValueChange={(v) => setQuestionModuleId(parseInt(v))}>
                  <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Sélectionner un module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map(m => (
                      <SelectItem key={m.id} value={m.id.toString()}>{m.nameFr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-300">Question (EN)</Label>
                  <Textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-blue-300">Question (FR)</Label>
                  <Textarea
                    value={questionTextFr}
                    onChange={(e) => setQuestionTextFr(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    rows={2}
                  />
                </div>
              </div>
              <div>
                <Label className="text-blue-300">Type de question</Label>
                <Select value={questionType} onValueChange={setQuestionType}>
                  <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texte libre</SelectItem>
                    <SelectItem value="number">Nombre</SelectItem>
                    <SelectItem value="select">Choix unique</SelectItem>
                    <SelectItem value="multiselect">Choix multiples</SelectItem>
                    <SelectItem value="boolean">Oui/Non</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(questionType === "select" || questionType === "multiselect") && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-blue-300">Options (EN) - une par ligne</Label>
                    <Textarea
                      value={questionOptions}
                      onChange={(e) => setQuestionOptions(e.target.value)}
                      className="mt-1 bg-white/10 border-white/20 text-white"
                      rows={4}
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                    />
                  </div>
                  <div>
                    <Label className="text-blue-300">Options (FR) - une par ligne</Label>
                    <Textarea
                      value={questionOptionsFr}
                      onChange={(e) => setQuestionOptionsFr(e.target.value)}
                      className="mt-1 bg-white/10 border-white/20 text-white"
                      rows={4}
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-300">Texte d'aide (EN)</Label>
                  <Input
                    value={questionHelpText}
                    onChange={(e) => setQuestionHelpText(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-blue-300">Texte d'aide (FR)</Label>
                  <Input
                    value={questionHelpTextFr}
                    onChange={(e) => setQuestionHelpTextFr(e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={questionRequired} onCheckedChange={setQuestionRequired} />
                  <Label className="text-blue-300">Obligatoire</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={questionActive} onCheckedChange={setQuestionActive} />
                  <Label className="text-blue-300">Active</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-white/20 text-white" onClick={resetQuestionForm}>
                Annuler
              </Button>
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={handleSaveQuestion}
                disabled={!questionModuleId || !questionText || !questionTextFr || createQuestionMutation.isPending || updateQuestionMutation.isPending}
              >
                {(createQuestionMutation.isPending || updateQuestionMutation.isPending) && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                {editingQuestion ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
