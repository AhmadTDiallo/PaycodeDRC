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
import ImageSlideshow from "@/components/ui/image-slideshow";

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
              

              
              const displayImages = isDbArticle && article.imageUrls && article.imageUrls.length > 0 
                ? article.imageUrls 
                : (displayImage ? [displayImage] : []);
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
                    {displayImages.length > 0 && (
                      <div className="w-24 h-24 flex-shrink-0 relative">
                        <div
                          className="w-full h-full bg-cover bg-center rounded-lg"
                          style={{ backgroundImage: `url(${displayImages[0]})` }}
                        />
                        {/* Show image count indicator if multiple images */}
                        {displayImages.length > 1 && (
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                            {displayImages.length}
                          </div>
                        )}
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
          <DialogContent className="max-w-5xl max-h-[95vh] w-[95vw] sm:w-auto p-0 bg-white flex flex-col">
            {selectedArticle && (
              <>
                {/* Header Section - Fixed */}
                <div className="relative flex-shrink-0">
                  {((selectedArticle.imageUrls && selectedArticle.imageUrls.length > 0) || selectedArticle.imageUrl) && (
                    <div className="h-48 sm:h-64 md:h-80 relative">
                      {selectedArticle.imageUrls && selectedArticle.imageUrls.length > 0 ? (
                        <div className="relative h-full">

                          <ImageSlideshow 
                            images={selectedArticle.imageUrls} 
                            className="w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                        </div>
                      ) : selectedArticle.imageUrl ? (
                        <div className="relative h-full">
                          <img 
                            src={selectedArticle.imageUrl} 
                            alt={selectedArticle.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>
                      ) : null}
                      
                      {/* Category badge overlay */}
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
                        <Badge className="bg-white/90 text-gray-800 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                          {selectedArticle.category}
                        </Badge>
                      </div>
                      
                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white z-10">
                        <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-1 sm:mb-2 leading-tight">
                          {selectedArticle.title}
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-white/90">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="text-xs sm:text-sm">
                              {formatSafeDate(selectedArticle.publishedDate || selectedArticle.createdAt, "dd MMMM yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="text-xs sm:text-sm">Par {selectedArticle.author}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Header without image */}
                  {!selectedArticle.imageUrl && !(selectedArticle.imageUrls && selectedArticle.imageUrls.length > 0) && (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 md:p-8 text-white">
                      <div className="mb-3 sm:mb-4">
                        <Badge className="bg-white/20 text-white px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold backdrop-blur-sm">
                          {selectedArticle.category}
                        </Badge>
                      </div>
                      <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                        {selectedArticle.title}
                      </h1>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-white/90">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm">
                            {formatSafeDate(selectedArticle.publishedDate || selectedArticle.createdAt, "dd MMMM yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm">Par {selectedArticle.author}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section - Scrollable */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 min-h-0">
                  <DialogHeader className="mb-3 sm:mb-6">
                    <DialogDescription className="sr-only">
                      Détails complets de l'article de presse
                    </DialogDescription>
                    <DialogTitle className="sr-only">
                      {selectedArticle.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {/* Summary */}
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 md:p-6 rounded-r-lg">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-blue-900 mb-1 sm:mb-2 md:mb-3">Résumé</h3>
                      <p className="text-blue-800 text-xs sm:text-sm md:text-lg leading-relaxed">
                        {selectedArticle.summary}
                      </p>
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                    <div className="text-gray-800 leading-relaxed text-xs sm:text-sm md:text-lg whitespace-pre-wrap">
                      {selectedArticle.content}
                    </div>
                  </div>
                  
                  {/* Add bottom padding for better scrolling */}
                  <div className="h-6 sm:h-8"></div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
