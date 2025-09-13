import InteractiveMap from "@/components/journey/interactive-map";
import DestinationGrid from "@/components/destinations/destination-grid";
import { useJourney } from "@/hooks/use-journey";
import { Button } from "@/components/ui/button";
import { Images, Navigation, MapPin, AlertTriangle, Book, Clock, Users, Camera, Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import ErrorBoundary from "@/components/error-boundary";
import InternalLinks from "@/components/seo/internal-links";

export default function Journey() {
  const { data: journey, isLoading, error, isError } = useJourney();

  // Fallback journey data for production issues
  const fallbackJourney = {
    currentLocation: "Kochi, Kerala",
    journeyProgress: 65
  };

  const safeJourney = journey || fallbackJourney;

  useEffect(() => {
    console.log('Journey page mounted');
    console.log('Journey data:', journey);
    console.log('Journey loading:', isLoading);
    console.log('Journey error:', error);
  }, [journey, isLoading, error]);

  useEffect(() => {
    // SEO meta tags for Journey page
    document.title = "Solo India Travel Journey - Kashmir to Kanyakumari | Milesalone";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Follow my 6-month solo backpacking journey across India from Kashmir to Kanyakumari. Real stories, budget travel tips, and authentic cultural experiences from 15+ states.');
    }

    // Add canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://www.milesalone.com/journey';
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
          "name": "Journey",
          "item": "https://www.milesalone.com/journey"
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

  const handleOpenFullMap = () => {
    window.open('https://www.google.com/maps/search/india+travel+journey', '_blank');
  };

  const handleViewAllGalleries = () => {
    window.open('/gallery', '_blank');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream py-16 lg:py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading journey...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    console.error('Journey page error:', error);
    return (
      <div className="min-h-screen bg-brand-cream py-16 lg:py-24 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardContent className="p-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">
              Unable to Load Journey
            </h2>
            <p className="text-gray-600 mb-6">
              There was an error loading the journey page. Please try refreshing or check your connection.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-brand-orange text-white hover:bg-brand-orange/90"
            >
              Refresh Page
            </Button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {error?.message || 'Unknown error'}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16" data-testid="journey-header">
          <h1 className="font-playfair text-3xl lg:text-5xl font-bold text-brand-brown mb-6">
            Solo India Travel Journey: Kashmir to Kanyakumari
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Follow my authentic 6-month solo backpacking adventure across incredible India. From the snow-capped peaks of Kashmir to the southern tip of Kanyakumari, discover practical travel guides, budget tips, and real experiences from 15+ states.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-brand-brown">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>15+ States Explored</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>6 Months Journey</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>1000+ Photos</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Authentic Stories</span>
            </div>
          </div>
        </div>

        {/* Journey Map Overview */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg" data-testid="journey-map-overview">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-4 h-4 bg-brand-orange rounded-full animate-pulse"></div>
                <span className="font-semibold text-brand-brown" data-testid="current-location-status">
                  Currently in: {safeJourney.currentLocation}
                </span>
              </div>
              <p className="text-gray-600">Exploring the royal heritage and palace architecture</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-orange" data-testid="journey-completion">
                {safeJourney.journeyProgress}%
              </div>
              <div className="text-sm text-gray-600">Journey Complete</div>
            </div>
          </div>
          
          <ErrorBoundary componentName="Interactive Map">
            <InteractiveMap height="400px" />
          </ErrorBoundary>
          
          {/* Map and Gallery Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleOpenFullMap}
              className="bg-brand-orange text-white hover:bg-brand-orange/90"
              data-testid="journey-open-full-map"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Open Full Journey Map
            </Button>
            <Button 
              onClick={handleViewAllGalleries}
              variant="outline"
              className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              data-testid="journey-view-all-galleries"
            >
              <Images className="w-4 h-4 mr-2" />
              View All Photo Galleries
            </Button>
          </div>
        </div>

        {/* Travel Guides Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-2xl lg:text-4xl font-bold text-brand-brown mb-4">
              Complete India Travel Guides
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Practical guides based on real solo travel experiences across India. Everything you need to plan your own incredible journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* North India Guide */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-brand-orange mr-3" />
                  <h3 className="font-playfair text-xl font-bold text-brand-brown">
                    North India Travel Guide
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Kashmir, Himachal Pradesh, Punjab, Delhi, Rajasthan - Complete guide to North India's diverse landscapes and cultures.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Kashmir Valley & Ladakh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Rajasthan Desert Safari</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Himachal Hill Stations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Central India Guide */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-brand-orange mr-3" />
                  <h3 className="font-playfair text-xl font-bold text-brand-brown">
                    Central India Explorer
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Maharashtra, Madhya Pradesh, Gujarat - Discover the heart of India with ancient temples, wildlife, and vibrant cities.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Mumbai & Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Gujarat Cultural Heritage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>MP Wildlife Sanctuaries</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* South India Guide */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-brand-orange mr-3" />
                  <h3 className="font-playfair text-xl font-bold text-brand-brown">
                    South India Backpacking
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Kerala, Tamil Nadu, Karnataka, Goa - Tropical paradise, ancient temples, and coastal beauty of South India.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Kerala Backwaters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Tamil Nadu Temples</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Goa Beach Paradise</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Budget Travel Tips */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-brand-brown mb-4">
              Solo India Travel Tips & Budget Guide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real-world advice from 6 months of solo backpacking across India. Learn how to travel safely, affordably, and authentically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-playfair text-xl font-bold text-brand-brown mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-brand-orange" />
                Solo Travel Safety
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                  <span>Essential safety tips for solo female and male travelers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                  <span>How to stay connected and share your location</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                  <span>Trusted accommodation and transport options</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                  <span>Emergency contacts and important apps</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-playfair text-xl font-bold text-brand-brown mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-brand-orange" />
                Budget Breakdown
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                  <span>Daily budget: ₹800-1500 ($10-18) for backpackers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                  <span>Accommodation: ₹200-600 per night (hostels/guesthouses)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                  <span>Food: ₹150-400 per day (local restaurants)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 flex-shrink-0"></div>
                  <span>Transport: ₹300-800 per day (trains/buses)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Places Section */}
        <div data-testid="places-section">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-2xl lg:text-4xl font-bold text-brand-brown mb-4">
              View All Photo Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each place offers its own unique character, challenges, and rewards. Filter by category, region, or search for specific locations.
            </p>
          </div>

          <ErrorBoundary componentName="Places Grid">
            <DestinationGrid />
          </ErrorBoundary>
        </div>
        
        {/* Bottom spacer to prevent navigation overlap */}
        <div className="h-24"></div>
      </div>
      
      {/* Internal Links for SEO */}
      <InternalLinks currentPage="/journey" className="mt-16" />
    </div>
  );
}
