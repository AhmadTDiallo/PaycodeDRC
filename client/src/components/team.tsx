import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Team() {
  const teamMembers = [
    {
      name: "Gabriel Ruhan",
      position: "Chief Executive Officer",
      description:
        "Seasoned entrepreneur with a distinguished track record in technology and engineering. Co-founded Global Switch in 1998 and served as COO at Navisite Inc.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/gabrielruhan/",
    },
    {
      name: "Sandy Begg",
      position: "Chief Operating Officer",
      description:
        "Long and successful track record in executive management at large corporates in South Africa. Responsible for operations and day-to-day customer support.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/sandy-begg-b322236/",
    },
    {
      name: "Grant Haarhoff",
      position: "Chief Financial Officer",
      description:
        "Qualified Chartered Accountant who joined Paycode after 6 years at the South African Reserve Bank where he held high-profile roles including Acting Group CFO.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/grant-haarhoff-1677217/",
    },
    {
      name: "Ralph Pecker",
      position: "Founder & Sales Director",
      description:
        "Over 40 years experience in start-ups and management at companies in Africa and around the world. Co-founder of leading haircare businesses in Africa.",
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
    {
      name: "Heidi Patmore",
      position: "Head of Marketing",
      description:
        "Senior marketing expert with a proven track record of launching and growing brands across Africa. Over 15 years in mobile, fintech and blockchain industries.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      linkedin: "https://www.linkedin.com/in/heidipatmore/",
    },
  ];

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold paycode-blue mb-4">
            Our Leadership Team
          </h2>
          <p className="text-xl paycode-gray">
            Experienced leaders driving financial inclusion worldwide
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold paycode-blue mb-1">
                    {member.name}
                  </h3>
                  <p className="text-paycode-green font-semibold mb-3">
                    {member.position}
                  </p>
                  <p className="paycode-gray text-sm leading-relaxed mb-4">
                    {member.description}
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-paycode-blue hover:text-paycode-green p-0"
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
