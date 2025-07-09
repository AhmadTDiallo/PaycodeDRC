import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar, Mail, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { insertDemoRequestSchema, insertNewsletterSchema, type InsertDemoRequest, type InsertNewsletterSubscription } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { fadeInUp } from "@/lib/animations";

export default function Contact() {
  const [showDemoSuccess, setShowDemoSuccess] = useState(false);
  const [showNewsletterSuccess, setShowNewsletterSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Demo form
  const demoForm = useForm<InsertDemoRequest>({
    resolver: zodResolver(insertDemoRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  });

  // Newsletter form
  const newsletterForm = useForm<InsertNewsletterSubscription>({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  // Demo request mutation
  const demoMutation = useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      const response = await apiRequest("POST", "/api/demo-requests", data);
      return response.json();
    },
    onSuccess: () => {
      setShowDemoSuccess(true);
      demoForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/demo-requests"] });
      toast({
        title: "Demande de démo soumise",
        description: "Nous vous contacterons bientôt pour programmer votre démo.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la soumission de la demande de démo. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  // Newsletter subscription mutation
  const newsletterMutation = useMutation({
    mutationFn: async (data: InsertNewsletterSubscription) => {
      const response = await apiRequest("POST", "/api/newsletter", data);
      return response.json();
    },
    onSuccess: () => {
      setShowNewsletterSuccess(true);
      newsletterForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
      toast({
        title: "Inscription réussie",
        description: "Merci de vous être abonné à notre newsletter !",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const onDemoSubmit = (data: InsertDemoRequest) => {
    demoMutation.mutate(data);
  };

  const onNewsletterSubmit = (data: InsertNewsletterSubscription) => {
    newsletterMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-paycode-blue to-paycode-blue-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Prêt à transformer l'inclusion financière ?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Partenaire avec Paycode RDC pour accéder à notre plateforme de paiement interopérable et connecter votre institution financière à l'écosystème plus large de la RDC.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Booking */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="glass border-white/20 h-full">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Calendar className="text-paycode-blue-accent mx-auto mb-4 h-12 w-12" />
                  <h3 className="text-2xl font-bold text-white mb-2">Réserver une démo</h3>
                  <p className="text-blue-100">Voir notre technologie en action</p>
                </div>

                {showDemoSuccess ? (
                  <div className="text-center">
                    <CheckCircle2 className="text-paycode-blue-accent mx-auto mb-4 h-16 w-16" />
                    <h4 className="text-xl font-bold text-white mb-2">
                      Demande de démo reçue !
                    </h4>
                    <p className="text-blue-100">
                      Nous vous contacterons dans les 24 heures pour programmer votre démo.
                    </p>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-paycode-blue-accent mt-4"
                      onClick={() => setShowDemoSuccess(false)}
                    >
                      Soumettre une autre demande
                    </Button>
                  </div>
                ) : (
                  <Form {...demoForm}>
                    <form onSubmit={demoForm.handleSubmit(onDemoSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={demoForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-100">Nom *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                                  placeholder="Votre nom complet"
                                />
                              </FormControl>
                              <FormMessage className="text-yellow-300" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={demoForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-100">Email *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                                  placeholder="your.email@company.com"
                                />
                              </FormControl>
                              <FormMessage className="text-yellow-300" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={demoForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-100">Entreprise *</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                                  placeholder="Nom de votre entreprise"
                                />
                              </FormControl>
                              <FormMessage className="text-yellow-300" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={demoForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-100">Téléphone</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                                  placeholder="+1 (555) 123-4567"
                                />
                              </FormControl>
                              <FormMessage className="text-yellow-300" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={demoForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-100">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                                placeholder="Parlez-nous de vos besoins spécifiques..."
                                rows={4}
                              />
                            </FormControl>
                            <FormMessage className="text-yellow-300" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-paycode-blue-accent hover:bg-paycode-blue text-white font-semibold transition-all duration-300 transform hover:scale-105"
                        disabled={demoMutation.isPending}
                      >
                        {demoMutation.isPending ? "Envoi en cours..." : "Programmer une démo"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="glass border-white/20 h-full">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Mail className="text-paycode-blue-accent mx-auto mb-4 h-12 w-12" />
                  <h3 className="text-2xl font-bold text-white mb-2">Restez informé</h3>
                  <p className="text-blue-100">
                    Recevez les dernières nouvelles sur l'inclusion financière et l'identité numérique
                  </p>
                </div>

                {showNewsletterSuccess ? (
                  <div className="text-center">
                    <CheckCircle2 className="text-paycode-blue-accent mx-auto mb-4 h-16 w-16" />
                    <h4 className="text-xl font-bold text-white mb-2">
                      Bienvenue dans notre newsletter !
                    </h4>
                    <p className="text-blue-100">
                      Vous recevrez nos dernières mises à jour et informations sur la technologie d'inclusion financière.
                    </p>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-paycode-blue-accent mt-4"
                      onClick={() => setShowNewsletterSuccess(false)}
                    >
                      S'abonner avec un autre email
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Form {...newsletterForm}>
                      <form onSubmit={newsletterForm.handleSubmit(onNewsletterSubmit)} className="space-y-6">
                        <FormField
                          control={newsletterForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-100">Adresse Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                                  placeholder="Entrez votre email"
                                />
                              </FormControl>
                              <FormMessage className="text-yellow-300" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full bg-white text-paycode-blue hover:bg-gray-100 font-semibold transition-all duration-300"
                          disabled={newsletterMutation.isPending}
                        >
                          {newsletterMutation.isPending ? "Inscription..." : "S'abonner"}
                        </Button>
                      </form>
                    </Form>

                    <div className="mt-8 p-6 bg-white/5 rounded-lg">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Ce que vous recevrez :
                      </h4>
                      <ul className="space-y-2 text-blue-100 text-sm">
                        <li>• Aperçus mensuels sur les tendances de l'inclusion financière</li>
                        <li>• Mises à jour sur les nouveaux développements technologiques</li>
                        <li>• Études de cas de nos implémentations globales</li>
                        <li>• Rapports sectoriels et résultats de recherche</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
