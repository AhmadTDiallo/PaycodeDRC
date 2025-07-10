import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Awards() {
  const { t } = useLanguage();
  const partners = [
    "Citi",
    "IBM",
    "Mastercard",
    "Microsoft",
    "PWC",
    "IMF",
    "Gemalto",
    "Thales",
    "KPMG",
    "SARB",
    "Mondato",
    "Ecobank",
  ];

  return (
    <section className="py-20 bg-paycode-blue">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            {t("awards.fintechTitle")}
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
            {t("awards.fintechDesc")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              variants={fadeInUp}
              className="glass rounded-lg p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-white font-bold text-lg">{partner}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
