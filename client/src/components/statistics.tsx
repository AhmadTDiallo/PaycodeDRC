import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { fadeInScale, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Statistics() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [counts, setCounts] = useState({
    identity: 0,
    connectivity: 0,
    unbanked: 0,
  });

  useEffect(() => {
    if (isInView) {
      // Animate counters
      const duration = 2000;
      const targets = {
        identity: 1000000000,
        connectivity: 3700000000,
        unbanked: 1700000000,
      };

      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setCounts({
          identity: Math.floor(targets.identity * progress),
          connectivity: Math.floor(targets.connectivity * progress),
          unbanked: Math.floor(targets.unbanked * progress),
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView]);

  const formatNumber = (num: number, target: number) => {
    if (target >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B+";
    }
    return num.toLocaleString();
  };

  const stats = [
    {
      value: formatNumber(counts.identity, 1000000000),
      label: t("stats.unidentifiedLabel"),
      gradient: "from-paycode-blue to-paycode-blue-light",
      textColor: "text-blue-100",
    },
    {
      value: formatNumber(counts.connectivity, 3700000000),
      label: t("stats.noConnectivityLabel"),
      gradient: "from-paycode-blue-light to-paycode-blue-accent",
      textColor: "text-blue-100",
    },
    {
      value: formatNumber(counts.unbanked, 1700000000),
      label: t("stats.unbankedLabel"),
      gradient: "from-gray-700 to-gray-900",
      textColor: "text-gray-100",
    },
  ];

  return (
    <section className="py-20 bg-card" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInScale}
        >
          <h2 className="text-4xl font-bold paycode-blue mb-4">{t("stats.globalTitle")}</h2>
          <p className="text-xl paycode-gray">
            Faire tomber les obstacles à l’inclusion financière dans le monde entier
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInScale}>
              <Card
                className={`p-8 bg-gradient-to-br ${stat.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center group cursor-pointer`}
              >
                <div className="text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className={`${stat.textColor} text-lg font-semibold`}>
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
