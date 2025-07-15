import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Linkedin, User, X } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import LwangoPhoto from "@assets/Prince_1752061564517.jpg";

export default function Team() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const teamMembers = [
    {
      name: "Lwango Wavo",
      position: "Président-Directeur Général",
      description:
        "Fort de plus de dix ans d’expérience dans les affaires et le leadership, il possède une solide expertise en stratégie, en opérations et en croissance. En tant que Président Directeur Général de Paycode Fintech Congo, il dirige les efforts visant à étendre les solutions de paiement numérique et à promouvoir l’inclusion financière dans la région. Reconnu pour sa capacité à faire évoluer les entreprises et à établir des partenariats solides, il allie innovation et exécution pour générer un impact durable. Son leadership continue de positionner Paycode comme un acteur clé du paysage fintech en Afrique.",
      image: LwangoPhoto,
      linkedin: "https://www.linkedin.com/in/prince-lwango-62505921/",
    },
    {
      name: "Sadio Diallo",
      position: "Directeur Général",
      description:
        "Directeur Général de Paycode Fintech Congo, spécialisée dans les technologies financières pour l'inclusion en RDC. Avec plus de 10 ans d'expérience en digitalisation des services financiers, il dirige le déploiement de solutions de core banking, de paiements et de dispositifs biométriques pour les IMF et COOPEC. À travers Paycode, il œuvre à élargir l'accès aux services financiers pour les populations mal desservies.",
      image: "/SadioDiallo1.jpg",
      linkedin: "https://www.linkedin.com/in/mamadou-sadio-diallo-5912131a6/",
    },
    {
      name: "Dominique Kaba",
      position: "Directeur des Opérations",
      description:
        "Expert en intégration technologique, il dirige actuellement le projet Transforme, consacré à la digitalisation des IMF et des COOPEC en République Démocratique du Congo. Ancien cadre du secteur bancaire, il possède plus de 10 ans d’expérience dans la gestion des institutions financières et plus de 7 ans dans le domaine des systèmes de paiement et des plateformes de switch. Grâce à cette double expertise, il œuvre à moderniser l’écosystème financier et à promouvoir l’inclusion numérique et financière.",
      image: "/DominiqueKaba.jpg",
      linkedin: "https://www.linkedin.com/in/dominique-kaba-946610144/",
    },
  ];

  return (
    <section id="team" className="py-8 md:py-12 bg-secondary overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-6 md:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 md:mb-3">
            {t("team.title")}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            {t("team.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-6 md:overflow-x-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={fadeInUp} className="group w-full md:min-w-[260px] md:flex-1">
              {isMobile ? (
                // Mobile: Use Dialog for click interaction
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="bg-card shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] overflow-hidden h-full cursor-pointer">
                      <div
                        className="h-48 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${member.image})`,
                          backgroundPosition:
                            member.name === "Lwango Wavo"
                              ? "center 30%"
                              : member.name === "Sadio Diallo"
                              ? "center 25%"
                              : "center"
                        }}
                      />
                      <CardContent className="p-3">
                        <h3 className="text-base font-bold text-foreground mb-1 text-center">
                          {member.name}
                        </h3>
                        <p className="text-paycode-blue-accent font-semibold mb-2 text-center text-xs">
                          {member.position}
                        </p>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                          {member.description}
                        </p>
                        <div className="flex justify-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-paycode-blue hover:text-paycode-blue-accent hover:bg-paycode-blue/10 p-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(member.linkedin, "_blank");
                            }}
                          >
                            <Linkedin className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[90vw] max-w-[95vw] w-full mx-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-16 h-16 bg-cover bg-center bg-no-repeat rounded-full border-2 border-paycode-blue/20 flex-shrink-0"
                          style={{
                            backgroundImage: `url(${member.image})`,
                            backgroundPosition:
                              member.name === "Lwango Wavo"
                                ? "center 30%"
                                : member.name === "Sadio Diallo"
                                ? "center 25%"
                                : "center"
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <User className="h-4 w-4 text-paycode-blue" />
                            <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                          </div>
                          <p className="text-sm font-semibold text-paycode-blue-accent">
                            {member.position}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {member.description}
                      </p>
                      <div className="flex justify-start">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-paycode-blue border-paycode-blue hover:bg-paycode-blue hover:text-white"
                          onClick={() => window.open(member.linkedin, "_blank")}
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          Voir LinkedIn
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                // Desktop: Use HoverCard for hover interaction
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Card className="bg-card shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] overflow-hidden h-full cursor-pointer">
                      <div
                        className="h-56 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${member.image})`,
                          backgroundPosition:
                            member.name === "Lwango Wavo"
                              ? "center 30%"
                              : member.name === "Sadio Diallo"
                              ? "center 25%"
                              : "center"
                        }}
                      />
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-foreground mb-1 text-center">
                          {member.name}
                        </h3>
                        <p className="text-paycode-blue-accent font-semibold mb-2 text-center text-sm">
                          {member.position}
                        </p>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-3">
                          {member.description}
                        </p>
                        <div className="flex justify-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-paycode-blue hover:text-paycode-blue-accent hover:bg-paycode-blue/10 p-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(member.linkedin, "_blank");
                            }}
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4 bg-white border border-gray-200 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className="w-16 h-16 bg-cover bg-center bg-no-repeat rounded-full border-2 border-paycode-blue/20"
                          style={{
                            backgroundImage: `url(${member.image})`,
                            backgroundPosition:
                              member.name === "Lwango Wavo"
                                ? "center 30%"
                                : member.name === "Sadio Diallo"
                                ? "center 25%"
                                : "center"
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4 text-paycode-blue" />
                          <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                        </div>
                        <p className="text-sm font-semibold text-paycode-blue-accent mb-3">
                          {member.position}
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {member.description}
                        </p>
                        <div className="flex justify-start mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-paycode-blue border-paycode-blue hover:bg-paycode-blue hover:text-white"
                            onClick={() => window.open(member.linkedin, "_blank")}
                          >
                            <Linkedin className="h-4 w-4 mr-2" />
                            Voir LinkedIn
                          </Button>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
