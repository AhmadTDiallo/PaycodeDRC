import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSlideshowProps {
  images: string[];
  className?: string;
}

export default function ImageSlideshow({ images, className = "" }: ImageSlideshowProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Only show slideshow if there are multiple images
  if (!images || images.length === 0) {
    return null;
  }

  // If only one image, show it without slideshow controls
  if (images.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <img
          src={images[0]}
          alt="Article image"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <div className="relative overflow-hidden h-full">
        <img
          src={images[currentImage]}
          alt={`Article image ${currentImage + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full h-12 w-12 p-0 shadow-lg transition-all duration-200 z-20"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full h-12 w-12 p-0 shadow-lg transition-all duration-200 z-20"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium z-20">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-3 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentImage ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
}