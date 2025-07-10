import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import LwangoPhoto from "@assets/Prince_1752061564517.jpg";

export default function Team() {
  const { t } = useLanguage();
  
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
    <section id="team" className="py-12 md:py-16 bg-secondary overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {t("team.title")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("team.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-6 md:gap-8 md:overflow-x-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={fadeInUp} className="group w-full md:min-w-[280px] md:flex-1">
              <Card className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden h-full">
                <div
                  className="h-64 md:h-80 bg-cover bg-center bg-no-repeat"
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
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-paycode-blue-accent font-semibold mb-3 text-center text-sm md:text-base">
                    {member.position}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 line-clamp-4 md:line-clamp-none">
                    {member.description}
                  </p>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-paycode-blue hover:text-paycode-blue-accent hover:bg-paycode-blue/10 p-2"
                      onClick={() => window.open(member.linkedin, "_blank")}
                    >
                      <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
