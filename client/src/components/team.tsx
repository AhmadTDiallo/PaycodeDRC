import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import LwangoPhoto from "@assets/Prince_1752061564517.jpg";

export default function Team() {
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
      linkedin: "https://www.linkedin.com/",
    },
  ];

  return (
    <section id="team" className="py-20 bg-secondary overflow-y-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Notre équipe de direction
          </h2>
          <p className="text-xl text-muted-foreground">
            Des dirigeants expérimentés qui favorisent l’inclusion financière dans le monde entier
          </p>
        </motion.div>

        <motion.div
          className="flex flex-row gap-8 overflow-x-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={fadeInUp} className="group min-w-[250px] flex-1">
              <Card className="bg-blue shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">
                <div
                  className="h-96 bg-cover bg-center bg-no-repeat"
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
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-paycode-blue-accent font-semibold mb-3">
                    {member.position}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {member.description}
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-paycode-blue hover:text-paycode-blue-accent p-0"
                      onClick={() => window.open(member.linkedin, "_blank")}
                    >
                      <Linkedin className="h-5 w-5" />
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
