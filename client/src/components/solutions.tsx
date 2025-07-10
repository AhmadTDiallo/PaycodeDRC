import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Network, Monitor, Database, Settings, CheckCircle, Shield, Zap, ArrowRight } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      iconBg: "bg-gradient-to-br from-paycode-blue to-paycode-blue-light",
      features: ["PCI-DSS Compliant", "EMV/Edapt Integration", "Multi-Channel Support", "Real-time Authorization"],
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      icon: Monitor,
      number: "02", 
      title: t("solutions.tmsTitle"),
      description: t("solutions.tmsDesc"),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      iconBg: "bg-gradient-to-br from-paycode-blue-accent to-purple-500",
      features: ["Remote Management", "Software Updates", "Device Monitoring", "Biometric Enrollment"],
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      icon: Database,
      number: "03",
      title: t("solutions.cbsTitle"), 
      description: t("solutions.cbsDesc"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      features: ["Temenos Integration", "Full Banking Operations", "Cloud Ready", "Scalable Architecture"],
      gradient: "from-green-500 via-green-600 to-teal-500",
      delay: 0.3
    },
    {
      icon: Settings,
      number: "04",
      title: t("solutions.erpTitle"), 
      description: t("solutions.erpDesc"),
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
      features: ["Priority Software", "Compliance & Audit", "HR Payroll Integration", "Resource Planning"],
      gradient: "from-orange-500 via-orange-600 to-red-500",
      delay: 0.4
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-secondary via-background to-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("solutions.title")}
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("solutions.subtitle")}
          </motion.p>
        </motion.div>

        {/* 2x2 Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((solution, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: solution.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Card className="relative h-full bg-card border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${solution.image})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-90 group-hover:opacity-95 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className={`w-14 h-14 ${solution.iconBg} rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <solution.icon className="text-white w-7 h-7" />
                    </motion.div>
                    <motion.span 
                      className="text-white/70 text-4xl lg:text-5xl font-bold"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: solution.delay + 0.3 }}
                    >
                      {solution.number}
                    </motion.span>
                  </div>

                  {/* Title and Description */}
                  <div className="flex-grow">
                    <motion.h3 
                      className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: solution.delay + 0.2 }}
                    >
                      {solution.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-white/90 text-sm lg:text-base leading-relaxed mb-6 line-clamp-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: solution.delay + 0.4 }}
                    >
                      {solution.description}
                    </motion.p>
                  </div>

                  {/* Features Grid */}
                  <motion.div 
                    className="grid grid-cols-2 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: solution.delay + 0.5 }}
                  >
                    {solution.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: solution.delay + 0.6 + featureIndex * 0.1 }}
                        className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20"
                      >
                        <CheckCircle className="w-3 h-3 text-white/80 flex-shrink-0" />
                        <span className="text-white/90 text-xs font-medium truncate">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Hover Arrow */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: solution.delay + 0.8 }}
                  >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{
                    boxShadow: "0 0 30px rgba(255,255,255,0.3)"
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
