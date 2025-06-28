import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function News() {
  const newsArticles = [
    {
      title:
        "Algorand Foundation and Paycode Announce Partnership to Expand Financial Inclusion",
      summary:
        "The Algorand Foundation today announced a new strategic partnership with Paycode, a global leader in biometric and offline digital...",
      category: "Partnership",
      date: "2 days ago",
      author: "Paycode",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
      categoryColor: "bg-paycode-green",
      url: "https://www.paycode.com/post/algorand-foundation-and-paycode-announce-partnership-to-expand-financial-inclusion",
    },
    {
      title: "Putting People First: Paycode's Approach to Humanitarian Cash Assistance",
      summary:
        "As humanitarian needs reach record highs and the aid system faces pressure to deliver more efficient and effective assistance...",
      category: "Impact",
      date: "7 days ago",
      author: "Gabe Ruhan",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      categoryColor: "bg-paycode-blue",
    },
    {
      title: "Advancing Digital Identity in Remote Areas: A Technology Breakthrough",
      summary:
        "Paycode's latest innovations in offline biometric technology are opening new possibilities for identity verification in the world's most remote locations...",
      category: "Technology",
      date: "2 weeks ago",
      author: "Ayanda Luthuli",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2372&q=80",
      categoryColor: "bg-purple-500",
    },
    {
      title: "Financial Inclusion Milestone: 500,000 Rural Users Connected",
      summary:
        "A major milestone has been reached as Paycode's platform successfully onboards its 500,000th rural user across African markets...",
      category: "Milestone",
      date: "3 weeks ago",
      author: "Sandy Begg",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      categoryColor: "bg-orange-500",
    },
  ];

  const handleArticleClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="news" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Dernières Actualités</h2>
          <p className="text-xl text-muted-foreground">
            Restez informé des dernières actualités de Paycode et Paycode Fintech Congo.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {newsArticles.map((article, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <Card 
                className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-black-100 h-full cursor-pointer"
                onClick={() => handleArticleClick(article.url)}
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Badge
                      className={`${article.categoryColor} text-black px-3 py-1 text-xs font-semibold mr-3`}
                    >
                      {article.category}
                    </Badge>
                    <span className="text-muted-foreground text-sm">{article.date}</span>
                  </div>
                  <h3 className="text-paycode-blue font-bold mb-3 group-hover:text-paycode-blue-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-black leading-relaxed mb-3 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>By {article.author}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <button className="text-paycode-blue hover:text-paycode-blue-accent font-semibold transition-colors duration-200">
            View All News →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
