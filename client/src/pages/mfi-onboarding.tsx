import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { 
  Building2, 
  Globe, 
  Mail, 
  Phone, 
  User, 
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Send,
  FileCheck,
  Building,
  CreditCard,
  Shield,
  Wallet,
  Settings,
  ArrowLeft,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { QuestionnaireModule, QuestionnaireQuestion } from "@shared/schema";

const iconMap: Record<string, any> = {
  Building: Building,
  CreditCard: CreditCard,
  Shield: Shield,
  Wallet: Wallet,
  Settings: Settings,
  Building2: Building2,
};

const africanCountries = [
  "Democratic Republic of the Congo",
  "Republic of the Congo",
  "Rwanda",
  "Burundi",
  "Uganda",
  "Kenya",
  "Tanzania",
  "Cameroon",
  "Central African Republic",
  "South Sudan",
  "Angola",
  "Zambia",
  "Other African Country",
];

const translations = {
  en: {
    title: "MFI Onboarding Portal",
    subtitle: "Welcome to Paycode's Microfinance Institution onboarding platform",
    step1: "Institution Details",
    step2: "Select Services",
    step3: "Requirements",
    step4: "Review & Submit",
    institutionName: "Institution Name",
    institutionNamePlaceholder: "Enter your institution's official name",
    country: "Country of Operation",
    countryPlaceholder: "Select your country",
    institutionalEmail: "Institutional Email",
    institutionalEmailPlaceholder: "official@institution.org",
    institutionalEmailHelp: "Please use your official institutional email (not personal email)",
    phoneNumber: "Phone Number",
    phoneNumberPlaceholder: "+243 XXX XXX XXX",
    contactPerson: "Contact Person Name",
    contactPersonPlaceholder: "Full name of primary contact",
    contactTitle: "Contact Person Title",
    contactTitlePlaceholder: "e.g., IT Director, Operations Manager",
    next: "Continue",
    back: "Back",
    submit: "Submit Application",
    selectModules: "Select the services relevant to your institution",
    selectModulesDesc: "Choose the areas where you need Paycode's support",
    questionsFor: "Questions for",
    reviewTitle: "Review Your Application",
    reviewDesc: "Please review your information before submitting",
    institutionDetails: "Institution Details",
    selectedServices: "Selected Services",
    responses: "Your Responses",
    submitting: "Submitting...",
    successTitle: "Application Submitted!",
    successMessage: "Thank you for your interest in Paycode. Our team will review your application and contact you within 2-3 business days.",
    backToHome: "Return to Home",
    required: "Required",
    noModulesSelected: "Please select at least one service module",
    loading: "Loading...",
  },
  fr: {
    title: "Portail d'Intégration IMF",
    subtitle: "Bienvenue sur la plateforme d'intégration des Institutions de Microfinance de Paycode",
    step1: "Détails de l'Institution",
    step2: "Sélection des Services",
    step3: "Exigences",
    step4: "Révision et Soumission",
    institutionName: "Nom de l'Institution",
    institutionNamePlaceholder: "Entrez le nom officiel de votre institution",
    country: "Pays d'Opération",
    countryPlaceholder: "Sélectionnez votre pays",
    institutionalEmail: "Email Institutionnel",
    institutionalEmailPlaceholder: "officiel@institution.org",
    institutionalEmailHelp: "Veuillez utiliser votre email institutionnel officiel (pas un email personnel)",
    phoneNumber: "Numéro de Téléphone",
    phoneNumberPlaceholder: "+243 XXX XXX XXX",
    contactPerson: "Nom du Contact",
    contactPersonPlaceholder: "Nom complet du contact principal",
    contactTitle: "Titre du Contact",
    contactTitlePlaceholder: "ex: Directeur IT, Responsable des Opérations",
    next: "Continuer",
    back: "Retour",
    submit: "Soumettre la Demande",
    selectModules: "Sélectionnez les services pertinents pour votre institution",
    selectModulesDesc: "Choisissez les domaines où vous avez besoin du support de Paycode",
    questionsFor: "Questions pour",
    reviewTitle: "Révisez Votre Demande",
    reviewDesc: "Veuillez vérifier vos informations avant de soumettre",
    institutionDetails: "Détails de l'Institution",
    selectedServices: "Services Sélectionnés",
    responses: "Vos Réponses",
    submitting: "Soumission en cours...",
    successTitle: "Demande Soumise!",
    successMessage: "Merci pour votre intérêt pour Paycode. Notre équipe examinera votre demande et vous contactera dans les 2-3 jours ouvrables.",
    backToHome: "Retour à l'Accueil",
    required: "Obligatoire",
    noModulesSelected: "Veuillez sélectionner au moins un module de service",
    loading: "Chargement...",
  },
};

const institutionSchema = z.object({
  institutionName: z.string().min(2, "Institution name must be at least 2 characters"),
  country: z.string().min(2, "Country is required"),
  institutionalEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(6, "Phone number is required"),
  contactPersonName: z.string().optional(),
  contactPersonTitle: z.string().optional(),
});

type InstitutionFormData = z.infer<typeof institutionSchema>;

export default function MfiOnboardingPage() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModules, setSelectedModules] = useState<number[]>([]);
  const [questionResponses, setQuestionResponses] = useState<Record<number, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [institutionData, setInstitutionData] = useState<InstitutionFormData | null>(null);

  const form = useForm<InstitutionFormData>({
    resolver: zodResolver(institutionSchema),
    defaultValues: {
      institutionName: "",
      country: "",
      institutionalEmail: "",
      phoneNumber: "",
      contactPersonName: "",
      contactPersonTitle: "",
    },
  });

  const { data: modulesData, isLoading: modulesLoading } = useQuery<{ success: boolean; data: QuestionnaireModule[] }>({
    queryKey: ["/api/mfi/modules"],
  });

  const { data: questionsData, isLoading: questionsLoading } = useQuery<{ success: boolean; data: QuestionnaireQuestion[] }>({
    queryKey: ["/api/mfi/questions", selectedModules.join(",")],
    enabled: selectedModules.length > 0,
  });

  const modules = modulesData?.data || [];
  const questions = questionsData?.data?.filter(q => selectedModules.includes(q.moduleId)) || [];

  const submitMutation = useMutation({
    mutationFn: async (data: { registration: any; responses: any[] }) => {
      const response = await apiRequest("POST", "/api/mfi/register", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: language === "fr" ? "Succès!" : "Success!",
        description: language === "fr" ? "Votre demande a été soumise." : "Your application has been submitted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: language === "fr" ? "Erreur" : "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    },
  });

  const handleStep1Submit = (data: InstitutionFormData) => {
    setInstitutionData(data);
    setCurrentStep(2);
  };

  const handleModuleToggle = (moduleId: number) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleStep2Next = () => {
    if (selectedModules.length === 0) {
      toast({
        title: language === "fr" ? "Attention" : "Warning",
        description: t.noModulesSelected,
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(3);
  };

  const handleQuestionResponse = (questionId: number, value: any) => {
    setQuestionResponses(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    if (!institutionData) return;

    const registration = {
      ...institutionData,
      selectedModules,
      questionnaireVersion: 1,
    };

    const responses = Object.entries(questionResponses).map(([questionId, responseValue]) => ({
      questionId: parseInt(questionId),
      responseValue,
    }));

    submitMutation.mutate({ registration, responses });
  };

  const steps = [
    { number: 1, label: t.step1 },
    { number: 2, label: t.step2 },
    { number: 3, label: t.step3 },
    { number: 4, label: t.step4 },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-lg w-full bg-white/10 backdrop-blur-xl border-white/20 text-white">
            <CardContent className="pt-8 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{t.successTitle}</h2>
              <p className="text-blue-100 mb-8">{t.successMessage}</p>
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToHome}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToHome}
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            className="border-white/30 text-white hover:bg-white/10 bg-white/5"
          >
            <Languages className="w-4 h-4 mr-2" />
            {language === "fr" ? "English" : "Français"}
          </Button>
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-blue-200">{t.subtitle}</p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 md:space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all ${
                    currentStep >= step.number 
                      ? "bg-orange-500 text-white" 
                      : "bg-white/20 text-white/60"
                  }`}
                >
                  {currentStep > step.number ? <CheckCircle2 className="w-5 h-5" /> : step.number}
                </div>
                <span className="hidden md:inline ml-2 text-white/80 text-sm">{step.label}</span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 mx-2 text-white/40" />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Building2 className="w-6 h-6" />
                    {t.step1}
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    {language === "fr" 
                      ? "Fournissez les informations officielles de votre institution"
                      : "Provide your institution's official information"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(handleStep1Submit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-white">{t.institutionName} *</Label>
                      <Input 
                        {...form.register("institutionName")}
                        placeholder={t.institutionNamePlaceholder}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                      {form.formState.errors.institutionName && (
                        <p className="text-red-400 text-sm">{form.formState.errors.institutionName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">{t.country} *</Label>
                      <Select onValueChange={(value) => form.setValue("country", value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder={t.countryPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {africanCountries.map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.country && (
                        <p className="text-red-400 text-sm">{form.formState.errors.country.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">{t.institutionalEmail} *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <Input 
                          {...form.register("institutionalEmail")}
                          type="email"
                          placeholder={t.institutionalEmailPlaceholder}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                        />
                      </div>
                      <p className="text-blue-200 text-xs">{t.institutionalEmailHelp}</p>
                      {form.formState.errors.institutionalEmail && (
                        <p className="text-red-400 text-sm">{form.formState.errors.institutionalEmail.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">{t.phoneNumber} *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                        <Input 
                          {...form.register("phoneNumber")}
                          placeholder={t.phoneNumberPlaceholder}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                        />
                      </div>
                      {form.formState.errors.phoneNumber && (
                        <p className="text-red-400 text-sm">{form.formState.errors.phoneNumber.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">{t.contactPerson}</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                          <Input 
                            {...form.register("contactPersonName")}
                            placeholder={t.contactPersonPlaceholder}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">{t.contactTitle}</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                          <Input 
                            {...form.register("contactPersonTitle")}
                            placeholder={t.contactTitlePlaceholder}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      {t.next}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    {t.step2}
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    {t.selectModulesDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {modulesLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-white" />
                      <span className="ml-2 text-white">{t.loading}</span>
                    </div>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {modules.map((module) => {
                          const IconComponent = iconMap[module.icon || "Building"] || Building;
                          const isSelected = selectedModules.includes(module.id);
                          const name = language === "fr" ? module.nameFr : module.name;
                          const description = language === "fr" ? module.descriptionFr : module.description;
                          
                          return (
                            <motion.div
                              key={module.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleModuleToggle(module.id)}
                              className={`p-6 rounded-xl cursor-pointer transition-all border-2 ${
                                isSelected 
                                  ? "bg-orange-500/20 border-orange-500" 
                                  : "bg-white/5 border-white/20 hover:border-white/40"
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${isSelected ? "bg-orange-500" : "bg-white/20"}`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-white font-semibold">{name}</h3>
                                    <Checkbox 
                                      checked={isSelected}
                                      className="border-white/50 data-[state=checked]:bg-orange-500"
                                    />
                                  </div>
                                  {description && (
                                    <p className="text-blue-200 text-sm mt-2">{description}</p>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentStep(1)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          {t.back}
                        </Button>
                        <Button 
                          onClick={handleStep2Next}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          {t.next}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileCheck className="w-6 h-6" />
                    {t.step3}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {questionsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-white" />
                      <span className="ml-2 text-white">{t.loading}</span>
                    </div>
                  ) : questions.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-blue-200">
                        {language === "fr" 
                          ? "Aucune question supplémentaire pour les services sélectionnés."
                          : "No additional questions for the selected services."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {modules
                        .filter(m => selectedModules.includes(m.id))
                        .map((module) => {
                          const moduleQuestions = questions.filter(q => q.moduleId === module.id);
                          if (moduleQuestions.length === 0) return null;
                          
                          return (
                            <div key={module.id} className="space-y-4">
                              <h3 className="text-lg font-semibold text-orange-400">
                                {t.questionsFor} {language === "fr" ? module.nameFr : module.name}
                              </h3>
                              {moduleQuestions.map((question) => (
                                <div key={question.id} className="space-y-2">
                                  <Label className="text-white">
                                    {language === "fr" ? question.questionTextFr : question.questionText}
                                    {question.isRequired && <span className="text-red-400 ml-1">*</span>}
                                  </Label>
                                  {(question.helpText || question.helpTextFr) && (
                                    <p className="text-blue-200 text-xs">
                                      {language === "fr" ? question.helpTextFr : question.helpText}
                                    </p>
                                  )}
                                  
                                  {question.questionType === "text" && (
                                    <Textarea
                                      value={questionResponses[question.id] || ""}
                                      onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
                                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                      rows={3}
                                    />
                                  )}
                                  
                                  {question.questionType === "number" && (
                                    <Input
                                      type="number"
                                      value={questionResponses[question.id] || ""}
                                      onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
                                      className="bg-white/10 border-white/20 text-white"
                                    />
                                  )}
                                  
                                  {question.questionType === "select" && (
                                    <Select
                                      value={questionResponses[question.id] || ""}
                                      onValueChange={(value) => handleQuestionResponse(question.id, value)}
                                    >
                                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                        <SelectValue placeholder={language === "fr" ? "Sélectionner..." : "Select..."} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {(language === "fr" ? question.optionsFr : question.options)?.map((option, idx) => (
                                          <SelectItem key={idx} value={option}>{option}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  )}
                                  
                                  {question.questionType === "multiselect" && (
                                    <div className="space-y-2">
                                      {(language === "fr" ? question.optionsFr : question.options)?.map((option, idx) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                          <Checkbox
                                            checked={(questionResponses[question.id] || []).includes(option)}
                                            onCheckedChange={(checked) => {
                                              const current = questionResponses[question.id] || [];
                                              const updated = checked 
                                                ? [...current, option]
                                                : current.filter((o: string) => o !== option);
                                              handleQuestionResponse(question.id, updated);
                                            }}
                                            className="border-white/50 data-[state=checked]:bg-orange-500"
                                          />
                                          <Label className="text-white text-sm">{option}</Label>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {question.questionType === "boolean" && (
                                    <RadioGroup
                                      value={questionResponses[question.id]?.toString() || ""}
                                      onValueChange={(value) => handleQuestionResponse(question.id, value === "true")}
                                      className="flex space-x-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="true" className="border-white/50" />
                                        <Label className="text-white">{language === "fr" ? "Oui" : "Yes"}</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="false" className="border-white/50" />
                                        <Label className="text-white">{language === "fr" ? "Non" : "No"}</Label>
                                      </div>
                                    </RadioGroup>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      {t.back}
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(4)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      {t.next}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Send className="w-6 h-6" />
                    {t.reviewTitle}
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    {t.reviewDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      {t.institutionDetails}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-blue-200">{t.institutionName}:</span>
                        <p className="text-white">{institutionData?.institutionName}</p>
                      </div>
                      <div>
                        <span className="text-blue-200">{t.country}:</span>
                        <p className="text-white">{institutionData?.country}</p>
                      </div>
                      <div>
                        <span className="text-blue-200">{t.institutionalEmail}:</span>
                        <p className="text-white">{institutionData?.institutionalEmail}</p>
                      </div>
                      <div>
                        <span className="text-blue-200">{t.phoneNumber}:</span>
                        <p className="text-white">{institutionData?.phoneNumber}</p>
                      </div>
                      {institutionData?.contactPersonName && (
                        <div>
                          <span className="text-blue-200">{t.contactPerson}:</span>
                          <p className="text-white">{institutionData.contactPersonName}</p>
                        </div>
                      )}
                      {institutionData?.contactPersonTitle && (
                        <div>
                          <span className="text-blue-200">{t.contactTitle}:</span>
                          <p className="text-white">{institutionData.contactPersonTitle}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {t.selectedServices}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {modules
                        .filter(m => selectedModules.includes(m.id))
                        .map(m => (
                          <span key={m.id} className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                            {language === "fr" ? m.nameFr : m.name}
                          </span>
                        ))}
                    </div>
                  </div>

                  {Object.keys(questionResponses).length > 0 && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-orange-400 font-semibold mb-3">{t.responses}</h4>
                      <div className="space-y-2 text-sm">
                        {questions.map((q) => {
                          const response = questionResponses[q.id];
                          if (response === undefined) return null;
                          return (
                            <div key={q.id}>
                              <span className="text-blue-200">
                                {language === "fr" ? q.questionTextFr : q.questionText}:
                              </span>
                              <p className="text-white">
                                {Array.isArray(response) ? response.join(", ") : String(response)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(3)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      {t.back}
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={submitMutation.isPending}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t.submitting}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t.submit}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
