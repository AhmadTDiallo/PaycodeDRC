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

        {/* 2x2 Grid Layout - Mobile Optimized */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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
                {/* Tech Grid Background */}
                <div className="absolute inset-0">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                  
                  {/* Circuit Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
                    <defs>
                      <linearGradient id={`circuit-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Animated circuit paths */}
                    <path
                      d="M0,50 L100,50 L100,100 L200,100 L200,150 L300,150"
                      stroke={`url(#circuit-gradient-${index})`}
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                    />
                    <path
                      d="M400,200 L300,200 L300,120 L200,120 L200,80 L100,80"
                      stroke={`url(#circuit-gradient-${index})`}
                      strokeWidth="1.5"
                      fill="none"
                      className="animate-pulse"
                      style={{ animationDelay: '0.5s' }}
                    />
                    <path
                      d="M0,250 L80,250 L80,180 L160,180 L160,130 L240,130 L240,80 L400,80"
                      stroke={`url(#circuit-gradient-${index})`}
                      strokeWidth="1"
                      fill="none"
                      className="animate-pulse"
                      style={{ animationDelay: '1s' }}
                    />
                    
                    {/* Circuit nodes */}
                    <circle cx="100" cy="50" r="3" fill="rgba(255,255,255,0.6)" className="animate-pulse" />
                    <circle cx="200" cy="100" r="2" fill="rgba(255,255,255,0.5)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <circle cx="300" cy="150" r="2.5" fill="rgba(255,255,255,0.4)" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
                    <circle cx="160" cy="180" r="2" fill="rgba(255,255,255,0.6)" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
                  </svg>
                  
                  {/* Tech Corner Elements */}
                  <div className="absolute top-0 left-0 w-16 h-16">
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/40"></div>
                    <div className="absolute top-2 left-8 w-6 h-0.5 bg-white/40"></div>
                    <div className="absolute top-8 left-2 w-0.5 h-6 bg-white/40"></div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-16 h-16">
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/40"></div>
                    <div className="absolute top-2 right-8 w-6 h-0.5 bg-white/40"></div>
                    <div className="absolute top-8 right-2 w-0.5 h-6 bg-white/40"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-16 h-16">
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/40"></div>
                    <div className="absolute bottom-2 left-8 w-6 h-0.5 bg-white/40"></div>
                    <div className="absolute bottom-8 left-2 w-0.5 h-6 bg-white/40"></div>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-16 h-16">
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/40"></div>
                    <div className="absolute bottom-2 right-8 w-6 h-0.5 bg-white/40"></div>
                    <div className="absolute bottom-8 right-2 w-0.5 h-6 bg-white/40"></div>
                  </div>
                </div>

                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${solution.image})` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-85 group-hover:opacity-90 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className={`relative w-14 h-14 ${solution.iconBg} rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Tech corners on icon */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white/60 rounded-tl"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white/60 rounded-tr"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white/60 rounded-bl"></div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white/60 rounded-br"></div>
                      
                      <solution.icon className="text-white w-7 h-7" />
                    </motion.div>
                    
                    <div className="relative">
                      <motion.span 
                        className="text-white/70 text-4xl lg:text-5xl font-bold font-mono"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: solution.delay + 0.3 }}
                      >
                        {solution.number}
                      </motion.span>
                      
                      {/* Tech lines around number */}
                      <div className="absolute -top-2 -right-2 w-8 h-0.5 bg-white/40"></div>
                      <div className="absolute -top-2 -right-2 w-0.5 h-8 bg-white/40"></div>
                    </div>
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
                        className="relative flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20"
                      >
                        {/* Tech accent line */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        
                        <div className="relative">
                          <CheckCircle className="w-3 h-3 text-white/80 flex-shrink-0" />
                          <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-white/90 text-xs font-medium truncate font-mono">{feature}</span>
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
                    <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      {/* Tech corners on arrow */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/60"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/60"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/60"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/60"></div>
                      
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Animated Tech Border */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{
                    boxShadow: "0 0 30px rgba(255,255,255,0.3)"
                  }}
                >
                  {/* Animated border lines */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulse" style={{ animationDelay: '0.25s' }}></div>
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-pulse" style={{ animationDelay: '0.75s' }}></div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
