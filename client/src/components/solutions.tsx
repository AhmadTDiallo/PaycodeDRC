import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Monitor, Database, CheckCircle, Shield, Zap } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Solutions() {
  const { t } = useLanguage();
  
  const solutions = [
    {
      icon: Network,
      number: "01",
      title: t("solutions.switchTitle"),
      description: t("solutions.switchDesc"),
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      iconBg: "bg-gradient-to-br from-paycode-blue to-paycode-blue-light",
      features: ["PCI-DSS Compliant", "EMV/Edapt Integration", "Multi-Channel Support", "Real-time Authorization"],
      accent: "from-blue-500 to-cyan-500"
    },
    {
      icon: Monitor,
      number: "02", 
      title: t("solutions.tmsTitle"),
      description: t("solutions.tmsDesc"),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      iconBg: "bg-gradient-to-br from-paycode-blue-accent to-purple-500",
      features: ["Remote Management", "Software Updates", "Device Monitoring", "Biometric Enrollment"],
      accent: "from-purple-500 to-pink-500"
    },
    {
      icon: Database,
      number: "03",
      title: t("solutions.cbsTitle"), 
      description: t("solutions.cbsDesc"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      features: ["Temenos Integration", "Full Banking Operations", "Cloud Ready", "Scalable Architecture"],
      accent: "from-green-500 to-teal-500"
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-secondary to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("solutions.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("solutions.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="space-y-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {solutions.map((solution, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp} 
              className="group"
            >
              <Card className="bg-card border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden">
                <div className={`relative ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex`}>
                  {/* Image Section */}
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <div
                      className="h-80 lg:h-96 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${solution.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <div className={`w-16 h-16 ${solution.iconBg} rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20`}>
                          <solution.icon className="text-white w-8 h-8" />
                        </div>
                      </div>
                      <div className="absolute top-6 right-6">
                        <span className="text-white/90 text-6xl font-bold">{solution.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                        {solution.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                        {solution.description}
                      </p>

                      {/* Features List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {solution.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + featureIndex * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${solution.accent}`} />
                            <span className="text-sm font-medium text-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
