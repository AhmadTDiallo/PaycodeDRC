import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Team() {
  const teamMembers = [
    {
      name: "Sadio Diallo",
      position: "Director General",
      description:
        "Director General of Paycode Fintech Congo.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/gabrielruhan/",
    },
    {
      name: "Dominique Kaba",
      position: "Director of Operations",
      description:
        "Head of operations at Paycode Fintech Congo, with over 10 years of experience in the financial sector.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/sandy-begg-b322236/",
    },
    {
      name: "Prosper Tshang",
      position: "Head of Finance & Administration",
      description:
        "Head of Finance and Administration at Paycode Fintech Congo, with a strong background in financial management and administration.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/grant-haarhoff-1677217/",
    },
    {
      name: "Hassan Bin",
      position: "Head of Technology & Project Assistant",
      description:
        "Head of Technology and Project Assistant at Paycode Fintech Congo, with expertise in technology solutions and project management.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/rpecker/",
    },
    {
      name: "Ayanda Luthuli",
      position: "Chief Product Officer",
      description:
        "Experienced IT Professional with a passion for technology, innovation and people development. Brings experience from various delivery, LEAN, and systems design roles.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/ayandaluthuli/",
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
            Our Leadership Team
          </h2>
          <p className="text-xl text-muted-foreground">
            Experienced leaders driving financial inclusion worldwide
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
                  className="h-64 bg-cover bg-center"
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
