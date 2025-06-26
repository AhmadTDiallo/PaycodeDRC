import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, Signal, DollarSign } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Solutions() {
  const solutions = [
    {
      icon: Fingerprint,
      number: "01",
      title: "Identity",
      description:
        "We create biometric digital identity using field teams that go to deep rural areas. We utilise tablet-based proprietary technology to capture individuals' identities and issue cards within minutes in the field.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
      iconBg: "bg-paycode-blue",
    },
    {
      icon: Signal,
      number: "02",
      title: "Connectivity",
      description:
        "Our biometric digital identity and payments technology works seamlessly everywhere in the world. We simplify payments in deep rural areas giving people the ability to transact offline in real time.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      iconBg: "bg-paycode-green",
    },
    {
      icon: DollarSign,
      number: "03",
      title: "Cost",
      description:
        "As specialists in last mile delivery and proof of life we believe we can significantly impact financial inclusion in Africa by giving biometric digital identity and low cost access to basic financial services.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      iconBg: "bg-gradient-to-r from-paycode-blue to-paycode-green",
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold paycode-blue mb-4">
            We solve the 3 key barriers to financial inclusion
          </h2>
          <p className="text-xl paycode-gray max-w-3xl mx-auto">
            True financial inclusion should enable everybody in society to have
            access to financial services regardless of their income, savings or
            location.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden h-full">
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${solution.image})` }}
                />
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 ${solution.iconBg} rounded-full flex items-center justify-center mr-4`}
                    >
                      <solution.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-paycode-green">
                        {solution.number}
                      </div>
                      <h3 className="text-2xl font-bold paycode-blue">
                        {solution.title}
                      </h3>
                    </div>
                  </div>
                  <p className="paycode-gray leading-relaxed">
                    {solution.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
