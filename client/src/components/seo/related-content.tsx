import { Link } from "wouter";
import { ArrowRight, MapPin, Camera, BookOpen, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedItem {
  href: string;
  title: string;
  description: string;
  image?: string;
  type: 'destination' | 'post' | 'gallery';
  readTime?: string;
  date?: string;
}

interface RelatedContentProps {
  items: RelatedItem[];
  title?: string;
  className?: string;
}

export default function RelatedContent({ 
  items, 
  title = "Related Content", 
  className = "" 
}: RelatedContentProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'destination': return MapPin;
      case 'gallery': return Camera;
      case 'post': return BookOpen;
      default: return BookOpen;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'destination': return 'Travel Guide';
      case 'gallery': return 'Photo Collection';
      case 'post': return 'Travel Story';
      default: return 'Content';
    }
  };

  if (items.length === 0) return null;

  return (
    <div className={`${className}`}>
      <h3 className="font-playfair text-2xl font-bold text-brand-brown mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.slice(0, 6).map((item, index) => {
          const IconComponent = getIcon(item.type);
          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <Link href={item.href}>
                  <div className="cursor-pointer">
                    {item.image && (
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={item.image}
                          alt={`${item.title} - ${getTypeLabel(item.type)} for solo travelers in India`}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-brand-orange text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <IconComponent className="w-3 h-3 mr-1" />
                            {getTypeLabel(item.type)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-playfair text-lg font-semibold text-brand-brown group-hover:text-brand-orange transition-colors mb-2 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          {item.readTime && (
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {item.readTime}
                            </span>
                          )}
                          {item.date && (
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {item.date}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* SEO-friendly text links */}
      <div className="mt-8 p-4 bg-brand-cream rounded-lg">
        <h4 className="font-semibold text-brand-brown mb-3">Quick Navigation:</h4>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <Link key={index} href={item.href}>
              <span className="inline-block bg-white px-3 py-1 rounded-full text-sm text-brand-brown hover:bg-brand-orange hover:text-white transition-colors cursor-pointer">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}