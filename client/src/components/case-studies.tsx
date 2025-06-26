import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function CaseStudies() {
  const caseStudies = [
    {
      country: "Ghana",
      flag: "🇬🇭",
      title: "National Payment System",
      description:
        "The Bank of Ghana selected Paycode's EDAPT technology to provide a turnkey solution for a National Payment Switching & Settlement System.",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-yellow-400 to-red-400",
    },
    {
      country: "Afghanistan",
      flag: "🇦🇫",
      title: "Digital Financial Transactions",
      description:
        "Afghanistan International Bank implemented Paycode's biometric digital identity and payments technology to digitise financial transactions for donors, NGOs and Corporates.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      gradient: "from-green-400 to-blue-400",
    },
    {
      country: "Zambia",
      flag: "🇿🇲",
      title: "Farmer Support Program",
      description:
        "Supported the roll-out of $22 million in farmer subsidies for the Farmer Input Support Program, onboarding 198,000 farmers in deep rural areas in under 8 weeks.",
      image:
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
      gradient: "from-orange-400 to-red-400",
    },
    {
      country: "Mozambique",
      flag: "🇲🇿",
      title: "Social Grant Distribution",
      description:
        "Created biometric digital identities and distributed cash payments to 18,000 social grant recipients as part of a World Bank funded program with INAS.",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      gradient: "from-green-400 to-yellow-400",
    },
    {
      country: "DRC",
      flag: "🇨🇩",
      title: "Motorcycle Tax Collection",
      description:
        "Issued biometric ID cards and collected taxes for 20,000 taxi motorcyclists from ANMC in 8 cities across the DRC for the Ministry of Transport.",
      image:
        "https://images.unsplash.com/photo-1541840031508-326b77c9a17e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
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
          <h2 className="text-4xl font-bold text-foreground mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground">Real impact across Africa and beyond</p>
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
                    <h3 className="text-xl font-bold text-foreground">{study.country}</h3>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    {study.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {study.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-paycode-blue-accent hover:text-paycode-blue font-semibold p-0"
                  >
                    View Case Study <ArrowRight className="ml-1 h-4 w-4" />
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
                      <h3 className="text-lg font-bold text-foreground">{study.country}</h3>
                    </div>
                    <h4 className="text-base font-semibold text-foreground mb-2">
                      {study.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {study.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="text-paycode-blue-accent hover:text-paycode-blue font-semibold p-0 text-sm"
                    >
                      View Case Study <ArrowRight className="ml-1 h-3 w-3" />
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
