import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Building2, Users, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PosDevice3D from "./PosDevice3D";

export default function ValueProposition() {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Main Value Proposition */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-paycode-blue to-paycode-blue-light"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              {t("value.mainTitle")}
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              {t("value.mainDescription")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Financial Inclusion Section - Made Bigger */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-10 md:mb-12"
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6"
              variants={fadeInUp}
            >
              {t("value.inclusionTitle")}
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {t("value.inclusionDescription")}
            </motion.p>
          </motion.div>

          {/* 3D POS Device */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-10 md:mb-12"
          >
            <PosDevice3D className="mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            <motion.div 
              className="text-center p-6 md:p-8 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">{t("value.feature1Title")}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("value.feature1Desc")}</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 md:p-8 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Building2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">{t("value.feature2Title")}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("value.feature2Desc")}</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 md:p-8 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">{t("value.feature3Title")}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("value.feature3Desc")}</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 md:p-8 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors duration-300"
              variants={fadeInUp}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">{t("value.feature4Title")}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("value.feature4Desc")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}