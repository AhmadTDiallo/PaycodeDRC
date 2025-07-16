import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Wifi, CreditCard, Network, CheckCircle2, Shield, Zap, Users } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Edapt() {
  const { t } = useLanguage();

  const edaptFeatures = [
    {
      icon: Fingerprint,
      titleKey: "edapt.feature1Title",
      descKey: "edapt.feature1Desc",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: CreditCard,
      titleKey: "edapt.feature2Title", 
      descKey: "edapt.feature2Desc",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Wifi,
      titleKey: "edapt.feature3Title",
      descKey: "edapt.feature3Desc", 
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Network,
      titleKey: "edapt.feature4Title",
      descKey: "edapt.feature4Desc",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const useCases = [
    {
      icon: Shield,
      titleKey: "edapt.usecase1Title",
      descKey: "edapt.usecase1Desc"
    },
    {
      icon: Users,
      titleKey: "edapt.usecase2Title", 
      descKey: "edapt.usecase2Desc"
    },
    {
      icon: Zap,
      titleKey: "edapt.usecase3Title",
      descKey: "edapt.usecase3Desc"
    }
  ];

  return (
    <section id="edapt" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <Badge className="bg-gradient-to-r from-paycode-blue to-paycode-blue-light text-white px-6 py-2 text-lg font-semibold rounded-full">
              {t("nav.edapt")}
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t("edapt.title")}
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            {t("edapt.subtitle")}
          </motion.p>
        </motion.div>

        {/* EDAPT Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {edaptFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-paycode-blue transition-colors">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Use Cases Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            {t("edapt.usecasesTitle")}
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((usecase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-paycode-blue to-paycode-blue-light flex items-center justify-center mr-4">
                        <usecase.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {t(usecase.titleKey)}
                      </h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {t(usecase.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-paycode-blue to-paycode-blue-light rounded-3xl p-12 text-white"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            {t("edapt.benefitsTitle")}
          </motion.h3>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <motion.div
                key={num}
                variants={fadeInUp}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white mt-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    {t(`edapt.benefit${num}Title`)}
                  </h4>
                  <p className="text-blue-100 leading-relaxed">
                    {t(`edapt.benefit${num}Desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}