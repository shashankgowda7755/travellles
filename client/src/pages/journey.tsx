import InteractiveMap from "@/components/journey/interactive-map";
import DestinationGrid from "@/components/destinations/destination-grid";
import { useJourney } from "@/hooks/use-journey";
import { Button } from "@/components/ui/button";
import { Images, Navigation, MapPin, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import ErrorBoundary from "@/components/error-boundary";

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
            Explore My Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover incredible moments and experiences through my personal journey. Each story tells a unique tale of growth, exploration, and self-discovery.
          </p>
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
    </div>
  );
}
