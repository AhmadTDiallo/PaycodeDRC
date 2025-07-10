import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
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

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 bg-paycode-blue overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t("awards.fintechTitle")}
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {t("awards.fintechDesc")}
          </p>
        </motion.div>

        {/* Horizontal Sliding Carousel */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: [0, -50 * partners.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{
              width: `${100 * partners.length}px`,
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner}-${index}`}
                className="flex-shrink-0 w-32 h-16 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-white font-bold text-sm md:text-base">
                  {partner}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Gradient overlays for seamless effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-paycode-blue to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-paycode-blue to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
