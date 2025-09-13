import BlogGrid from "@/components/blog/blog-grid";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Users, Camera, Book, Star } from "lucide-react";
import { useEffect } from "react";

export default function Letters() {
  useEffect(() => {
    // SEO meta tags for Letters page
    document.title = "Travel Stories & Letters from India - Solo Journey Blog | Milesalone";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read authentic travel stories and personal letters from my solo journey across India. Real experiences, cultural insights, and heartfelt moments from Kashmir to Kanyakumari.');
    }

    // Add canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://www.milesalone.com/letters';
    document.head.appendChild(canonicalLink);

    // Add breadcrumb schema markup
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.milesalone.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Letters",
          "item": "https://www.milesalone.com/letters"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript && existingScript.textContent?.includes('BreadcrumbList')) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16" data-testid="letters-header">
          <h1 className="font-playfair text-3xl lg:text-5xl font-bold text-brand-brown mb-6">
            Travel Stories & Life Letters from India
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Authentic stories from my 6-month solo journey across incredible India. Real struggles, beautiful discoveries, and unexpected connections that transformed my perspective. Each letter captures genuine moments, valuable lessons, and encounters that shaped this life-changing adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-brand-brown">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Personal Stories</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Cultural Encounters</span>
            </div>
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              <span>Life Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Real Experiences</span>
            </div>
          </div>
        </div>

        {/* Featured Story Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-brand-brown mb-4">
              Story Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore different types of travel stories and experiences from across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                <h3 className="font-playfair text-lg font-bold text-brand-brown mb-2">
                  Personal Growth
                </h3>
                <p className="text-sm text-gray-600">
                  Stories of self-discovery and transformation
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                <h3 className="font-playfair text-lg font-bold text-brand-brown mb-2">
                  People & Culture
                </h3>
                <p className="text-sm text-gray-600">
                  Encounters with incredible people and traditions
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                <h3 className="font-playfair text-lg font-bold text-brand-brown mb-2">
                  Places & Adventures
                </h3>
                <p className="text-sm text-gray-600">
                  Unique destinations and thrilling experiences
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                <h3 className="font-playfair text-lg font-bold text-brand-brown mb-2">
                  Life Lessons
                </h3>
                <p className="text-sm text-gray-600">
                  Wisdom gained from travel experiences
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Blog Grid with Search and Filters */}
        <BlogGrid />
        
        {/* Bottom spacer to prevent navigation overlap */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}
