import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Building2, Users, Shield, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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

      {/* Very Compact Financial Inclusion Section */}
      <section className="py-8 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-6"
          >
            <motion.h2 
              className="text-xl md:text-2xl font-bold text-foreground mb-3"
              variants={fadeInUp}
            >
              {t("value.inclusionTitle")}
            </motion.h2>
            <motion.p 
              className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {t("value.inclusionDescription")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            <motion.div 
              className="text-center p-3 rounded-lg bg-secondary/30"
              variants={fadeInUp}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">{t("value.feature1Title")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{t("value.feature1Desc")}</p>
            </motion.div>

            <motion.div 
              className="text-center p-3 rounded-lg bg-secondary/30"
              variants={fadeInUp}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-lg flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">{t("value.feature2Title")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{t("value.feature2Desc")}</p>
            </motion.div>

            <motion.div 
              className="text-center p-3 rounded-lg bg-secondary/30"
              variants={fadeInUp}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">{t("value.feature3Title")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{t("value.feature3Desc")}</p>
            </motion.div>

            <motion.div 
              className="text-center p-3 rounded-lg bg-secondary/30"
              variants={fadeInUp}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-paycode-blue to-paycode-blue-light rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">{t("value.feature4Title")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{t("value.feature4Desc")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}