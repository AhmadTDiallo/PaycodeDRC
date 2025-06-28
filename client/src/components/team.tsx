import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Team() {
  const teamMembers = [
    {
      name: "Prince Lwango",
      position: "Président-Directeur Général",
      description:
        "Président-directeur général de Paycode Fintech Congo.",
      image: "",
      linkedin: "https://www.linkedin.com/",
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
        "Head of operations at Paycode Fintech Congo, with over 10 years of experience in the financial sector.",
      image: "/DominiqueKaba.jpg",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Prosper Tshang",
      position: "Responsable Financier & Administratif",
      description:
        "Responsable administratif et financier avec plus de 7 ans d’expérience en gestion financière, conformité et management des risques. Il supervise la stratégie budgétaire, la conformité réglementaire et l’optimisation des processus internes. Titulaire d’un Executive MBA de l’Institut MTF de Lisbonne, il allie vision stratégique et rigueur opérationnelle. Ses compétences couvrent la gestion budgétaire, le leadership, la conformité et la transformation digitale.",
      image: "/ProsperPic.jpeg",
      linkedin: "https://www.linkedin.com/in/prosper-tshang/",
    },
    {
      name: "Hassan Bin",
      position: "Responsable Technologique & Assistant de Projet",
      description:
        "Responsable Technologique et Assistant de Projet avec une expertise spécialisée dans les systèmes de Core Banking, la technologie EDAPT et les paiements électroniques. Il possède une solide expérience dans la mise en œuvre de solutions technologiques financières intégrées et la gestion de projets systèmes complexes.",
      image: "/Hassan.jpg",
      linkedin: "https://www.linkedin.com/in/hassan-bin-baba94180/",
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
            <motion.div key={index} variants={fadeInUp} className="group min-w-[320px] flex-1">
              <Card className="bg-blue shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">
                <div
                  className="h-72 bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.image})` }}
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
