import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { NewsArticle } from "@shared/schema";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, User, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

export default function News() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: newsResponse, isLoading } = useQuery({
    queryKey: ["/api/news"],
    staleTime: 0, // Always refetch to get latest articles
    refetchOnWindowFocus: true,
  });

  const newsArticles: NewsArticle[] = newsResponse?.data || [];

  // Fallback data while loading or if no articles exist
  const fallbackArticles = [
    {
      title:
        "La Fondation Algorand et Paycode annoncent un partenariat pour étendre l'inclusion financière",
      summary:
        "La Fondation Algorand a annoncé aujourd'hui un nouveau partenariat stratégique avec Paycode, un leader mondial de la biométrie et du numérique hors ligne...",
      category: "Partenariat",
      date: "Il y a 2 jours",
      author: "Paycode",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
      categoryColor: "bg-paycode-green",
      url: "https://www.paycode.com/post/algorand-foundation-and-paycode-announce-partnership-to-expand-financial-inclusion",
    },
    {
      title: "Privilégier les personnes : l'approche de Paycode pour l'assistance humanitaire en espèces",
      summary:
        "Alors que les besoins humanitaires atteignent des niveaux records et que le système d'aide subit des pressions pour fournir une assistance plus efficace...",
      category: "Impact",
      date: "Il y a 7 jours",
      author: "Gabe Ruhan",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      categoryColor: "bg-paycode-blue",
    },
    {
      title: "Faire progresser l'identité numérique dans les zones reculées : une percée technologique",
      summary:
        "Les dernières innovations de Paycode en technologie biométrique hors ligne ouvrent de nouvelles possibilités pour la vérification d'identité dans les endroits les plus reculés du monde...",
      category: "Technologie",
      date: "Il y a 2 semaines",
      author: "Ayanda Luthuli",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2372&q=80",
      categoryColor: "bg-purple-500",
    },
    {
      title: "Étape importante de l'inclusion financière : 500 000 utilisateurs ruraux connectés",
      summary:
        "Une étape importante a été franchie car la plateforme de Paycode a réussi à intégrer son 500 000e utilisateur rural dans les marchés africains...",
      category: "Étape importante",
      date: "Il y a 3 semaines",
      author: "Sandy Begg",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      categoryColor: "bg-orange-500",
    },
  ];

  // Prioritize database articles over fallback articles, ensure minimum 4 articles
  const combinedArticles = [...newsArticles, ...fallbackArticles];
  const displayArticles = combinedArticles.slice(0, Math.max(4, combinedArticles.length));
  
  // For slider: show 4 articles at a time
  const articlesPerSlide = 4;
  const totalSlides = Math.ceil(displayArticles.length / articlesPerSlide);
  const currentArticles = displayArticles.slice(
    currentSlide * articlesPerSlide,
    (currentSlide + 1) * articlesPerSlide
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Partenariat": "bg-paycode-green",
      "Impact": "bg-paycode-blue", 
      "Technologie": "bg-purple-500",
      "Étape importante": "bg-orange-500",
      "Actualités": "bg-blue-500",
      "Finance": "bg-green-500",
      "Produits": "bg-indigo-500",
      "Événements": "bg-pink-500"
    };
    return colors[category] || "bg-gray-500";
  };

  const formatSafeDate = (dateValue: any, formatStr: string = "dd MMM yyyy") => {
    try {
      if (!dateValue) return "Date non disponible";
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return "Date non disponible";
      return format(date, formatStr, { locale: fr });
    } catch {
      return "Date non disponible";
    }
  };

  const handleArticleClick = (article: any, url?: string) => {
    if (url && !('id' in article)) {
      // External article - open in new tab
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Database article - open modal
      setSelectedArticle(article);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="news" className="py-12 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-foreground mb-3">Actualités et événements</h2>
          <p className="text-lg text-muted-foreground">
            Restez informé de nos dernières nouvelles et développements
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation buttons */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 p-0 bg-white shadow-md"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 p-0 bg-white shadow-md"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            key={currentSlide}
          >
            {currentArticles.map((article, index) => {
              const isDbArticle = 'id' in article;
              const displayImage = isDbArticle ? article.imageUrl : article.image;
              const displayDate = isDbArticle 
                ? formatSafeDate(article.publishedDate || article.createdAt)
                : article.date;
              const categoryColor = isDbArticle 
                ? getCategoryColor(article.category)
                : article.categoryColor;
              
              // Create unique key combining slide and article identification
              const uniqueKey = isDbArticle ? `db-${article.id}-${currentSlide}` : `fallback-${currentSlide}-${index}`;

              return (
                <motion.div key={uniqueKey} variants={fadeInUp} className="group">
                  <Card 
                    className="bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 h-full cursor-pointer flex"
                    onClick={() => handleArticleClick(article, isDbArticle ? undefined : article.url)}
                  >
                    {displayImage && (
                      <div className="w-24 h-24 flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${displayImage})` }}
                        />
                      </div>
                    )}
                    <CardContent className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            className={`${categoryColor} text-white px-2 py-1 text-xs font-semibold`}
                          >
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{displayDate}</span>
                          </div>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-paycode-blue transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-2 text-xs line-clamp-2">
                          {article.summary}
                        </p>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="h-3 w-3 mr-1" />
                        <span>Par {article.author}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Slide indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-paycode-blue' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          className="text-center mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <button className="text-paycode-blue hover:text-paycode-blue-accent font-semibold transition-colors duration-200 text-sm">
            Voir toutes les actualités →
          </button>
        </motion.div>

        {/* Article Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedArticle && (
              <>
                <DialogHeader>
                  <DialogDescription className="sr-only">
                    Détails complets de l'article de presse
                  </DialogDescription>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getCategoryColor(selectedArticle.category)} text-white px-3 py-1 text-sm font-semibold`}>
                        {selectedArticle.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {formatSafeDate(selectedArticle.publishedDate || selectedArticle.createdAt, "dd MMMM yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedArticle.title}
                  </DialogTitle>
                </DialogHeader>
                
                {selectedArticle.imageUrl && (
                  <div className="mb-6">
                    <img 
                      src={selectedArticle.imageUrl} 
                      alt={selectedArticle.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span>Par {selectedArticle.author}</span>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-gray-700 font-medium mb-4">
                      {selectedArticle.summary}
                    </p>
                    
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedArticle.content}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
