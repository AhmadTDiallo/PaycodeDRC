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

  // Only show database articles, no fallback articles
  const displayArticles = newsArticles.filter(article => article.isPublished);
  
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
                      <Badge className="bg-blue-600 text-white px-3 py-1 text-sm font-semibold">
                        {selectedArticle.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
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
                  <div className="flex items-center text-sm text-gray-700">
                    <User className="h-4 w-4 mr-2" />
                    <span>Par {selectedArticle.author}</span>
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-gray-800 font-medium mb-4 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                      {selectedArticle.summary}
                    </p>
                    
                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
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
