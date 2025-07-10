import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, Signal, DollarSign } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Solutions() {
  const { t } = useLanguage();
  
  const solutions = [
    {
      icon: Fingerprint,
      number: "01",
      title: t("solutions.solution3Title"),
      description: t("solutions.solution3Desc"),
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
      iconBg: "bg-paycode-blue",
    },
    {
      icon: Signal,
      number: "02",
      title: t("solutions.solution2Title"),
      description: t("solutions.solution2Desc"),
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      iconBg: "bg-paycode-blue-accent",
    },
    {
      icon: DollarSign,
      number: "03",
      title: t("solutions.solution1Title"),
      description: t("solutions.solution1Desc"),
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      iconBg: "bg-gradient-to-r from-paycode-blue to-paycode-blue-light",
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("solutions.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("solutions.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${solution.image})` }}
                />
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 ${solution.iconBg} rounded-full flex items-center justify-center mr-4`}
                    >
                      <solution.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-paycode-blue-accent">
                        {solution.number}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {solution.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
