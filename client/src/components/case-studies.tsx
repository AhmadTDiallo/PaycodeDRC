import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import BankOfGhanaImage from "@assets/Bank-of-Ghana2-e1668714204967_1752066799539.webp";
import AfghanistanBankImage from "@assets/afganistanbank_1752066803194.jpg";
import DrcMotoImage from "@assets/drcmoto_1752066807922.webp";

export default function CaseStudies() {
  const { t } = useLanguage();
  
  const caseStudies = [
    {
      country: "Ghana",
      flag: "🇬🇭",
      title: t("caseStudies.ghana.title"),
      description: t("caseStudies.ghana.desc"),
      image: BankOfGhanaImage,
      gradient: "from-yellow-400 to-red-400",
    },
    {
      country: "Afghanistan",
      flag: "🇦🇫",
      title: t("caseStudies.afghanistan.title"),
      description: t("caseStudies.afghanistan.desc"),
      image: AfghanistanBankImage,
      gradient: "from-green-400 to-blue-400",
    },
    {
      country: "DRC",
      flag: "🇨🇩",
      title: t("caseStudies.drc.title"),
      description: t("caseStudies.drc.desc"),
      image: DrcMotoImage,
      gradient: "from-blue-400 to-purple-400",
    },
  ];

  return (
    <section id="case-studies" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">{t("caseStudies.title")}</h2>
          <p className="text-xl text-muted-foreground">{t("caseStudies.subtitle")}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.slice(0, 3).map((study, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100 h-full">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${study.image})` }}
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${study.gradient} rounded-full mr-3 flex items-center justify-center text-sm`}
                    >
                      {study.flag}
                    </div>
                    <h3 className="text-xl font-bold text-black">{study.country}</h3>
                  </div>
                  <h4 className="text-lg font-semibold text-black mb-3">
                    {study.title}
                  </h4>
                  <p className="text-black mb-4 leading-relaxed">
                    {study.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-paycode-blue-accent hover:text-paycode-blue font-semibold p-0"
                  >
{t("caseStudies.readMore")} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional case studies in a smaller grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.slice(3).map((study, index) => (
            <motion.div key={index + 3} variants={fadeInUp} className="group">
              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100">
                <div className="flex">
                  <div
                    className="w-1/3 bg-cover bg-center"
                    style={{ backgroundImage: `url(${study.image})` }}
                  />
                  <CardContent className="p-6 w-2/3">
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-6 h-6 bg-gradient-to-r ${study.gradient} rounded-full mr-2 flex items-center justify-center text-xs`}
                      >
                        {study.flag}
                      </div>
                      <h3 className="text-lg font-bold text-black">{study.country}</h3>
                    </div>
                    <h4 className="text-base font-semibold text-black mb-2">
                      {study.title}
                    </h4>
                    <p className="text-black text-sm mb-3 leading-relaxed">
                      {study.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="text-paycode-blue-accent hover:text-paycode-blue font-semibold p-0 text-sm"
                    >
                      Voir l'étude de cas <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
