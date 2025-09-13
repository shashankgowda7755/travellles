import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Users, Camera, Mountain, Waves, Building, TreePine } from "lucide-react";
import Link from "next/link";

interface TravelGuide {
  id: string;
  title: string;
  region: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  highlights: string[];
  bestTime: string;
  budget: string;
  image: string;
  category: 'mountains' | 'beaches' | 'cities' | 'heritage' | 'adventure';
  rating: number;
  reviewCount: number;
}

const travelGuides: TravelGuide[] = [
  {
    id: 'kashmir-complete-guide',
    title: 'Complete Kashmir Travel Guide',
    region: 'North India',
    description: 'Comprehensive guide to Kashmir\'s valleys, lakes, and mountain adventures. From Srinagar\'s houseboats to Gulmarg\'s snow peaks.',
    duration: '7-14 days',
    difficulty: 'Moderate',
    highlights: ['Dal Lake Houseboats', 'Gulmarg Skiing', 'Pahalgam Valleys', 'Sonamarg Glaciers'],
    bestTime: 'April-October',
    budget: '₹15,000-25,000',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'mountains',
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: 'kerala-backwaters-guide',
    title: 'Kerala Backwaters & Beaches',
    region: 'South India',
    description: 'Ultimate Kerala experience covering backwaters, hill stations, and pristine beaches. Perfect for solo travelers seeking tranquility.',
    duration: '10-12 days',
    difficulty: 'Easy',
    highlights: ['Alleppey Houseboats', 'Munnar Tea Gardens', 'Varkala Beaches', 'Kochi Heritage'],
    bestTime: 'October-March',
    budget: '₹12,000-20,000',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'beaches',
    rating: 4.7,
    reviewCount: 203
  },
  {
    id: 'rajasthan-heritage-circuit',
    title: 'Rajasthan Heritage Circuit',
    region: 'West India',
    description: 'Royal palaces, desert safaris, and vibrant culture. Complete guide to Rajasthan\'s golden triangle and beyond.',
    duration: '12-15 days',
    difficulty: 'Moderate',
    highlights: ['Jaipur Pink City', 'Udaipur Lakes', 'Jaisalmer Desert', 'Jodhpur Blue City'],
    bestTime: 'October-March',
    budget: '₹18,000-30,000',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'heritage',
    rating: 4.9,
    reviewCount: 287
  },
  {
    id: 'himachal-adventure-guide',
    title: 'Himachal Adventure Guide',
    region: 'North India',
    description: 'Trekking, paragliding, and mountain adventures in Himachal Pradesh. From Manali to Spiti Valley.',
    duration: '8-12 days',
    difficulty: 'Challenging',
    highlights: ['Manali Adventures', 'Spiti Valley Trek', 'Dharamshala Monasteries', 'Kasol Camping'],
    bestTime: 'March-June, September-November',
    budget: '₹14,000-22,000',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'adventure',
    rating: 4.6,
    reviewCount: 142
  },
  {
    id: 'goa-beyond-beaches',
    title: 'Goa Beyond Beaches',
    region: 'West India',
    description: 'Discover Goa\'s hidden gems, Portuguese heritage, spice plantations, and authentic local culture.',
    duration: '5-7 days',
    difficulty: 'Easy',
    highlights: ['Old Goa Churches', 'Spice Plantations', 'Dudhsagar Falls', 'Local Markets'],
    bestTime: 'November-February',
    budget: '₹8,000-15,000',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'beaches',
    rating: 4.5,
    reviewCount: 198
  },
  {
    id: 'northeast-unexplored',
    title: 'Northeast India Unexplored',
    region: 'Northeast India',
    description: 'Hidden gems of Northeast India - Meghalaya, Assam, and Arunachal Pradesh. Off-the-beaten-path adventures.',
    duration: '14-18 days',
    difficulty: 'Challenging',
    highlights: ['Living Root Bridges', 'Kaziranga Wildlife', 'Tawang Monastery', 'Majuli Island'],
    bestTime: 'October-April',
    budget: '₹20,000-35,000',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'adventure',
    rating: 4.8,
    reviewCount: 89
  }
];

const categoryIcons = {
  mountains: Mountain,
  beaches: Waves,
  cities: Building,
  heritage: Building,
  adventure: TreePine
};

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Moderate: 'bg-yellow-100 text-yellow-800',
  Challenging: 'bg-red-100 text-red-800'
};

export default function TravelGuidesHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const categories = ['all', 'mountains', 'beaches', 'heritage', 'adventure'];
  const regions = ['all', 'North India', 'South India', 'West India', 'Northeast India'];

  const filteredGuides = travelGuides.filter(guide => {
    const categoryMatch = selectedCategory === 'all' || guide.category === selectedCategory;
    const regionMatch = selectedRegion === 'all' || guide.region === selectedRegion;
    return categoryMatch && regionMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-brand-brown mb-6">
          Complete India Travel Guides
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Comprehensive solo travel guides for every corner of India. Real experiences, practical tips, 
          and insider knowledge from 6 months of authentic exploration.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-orange">28</div>
            <div className="text-sm text-gray-600">States Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-orange">150+</div>
            <div className="text-sm text-gray-600">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-orange">6</div>
            <div className="text-sm text-gray-600">Months Journey</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-orange">₹50K</div>
            <div className="text-sm text-gray-600">Total Budget</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const IconComponent = category !== 'all' ? categoryIcons[category as keyof typeof categoryIcons] : MapPin;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category === 'all' ? 'All Guides' : category}
                </Button>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Filter by Region</h3>
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                onClick={() => setSelectedRegion(region)}
                className="capitalize"
              >
                {region === 'all' ? 'All Regions' : region}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.map(guide => {
          const IconComponent = categoryIcons[guide.category];
          return (
            <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={difficultyColors[guide.difficulty]}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90">
                    <IconComponent className="w-3 h-3 mr-1" />
                    {guide.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{guide.region}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{guide.rating}</span>
                    <span className="text-xs text-gray-500">({guide.reviewCount})</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{guide.duration}</span>
                    <span className="text-gray-400">•</span>
                    <span>{guide.bestTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-brand-orange">{guide.budget}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.highlights.slice(0, 3).map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {guide.highlights.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{guide.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Link href={`/travel-guides/${guide.id}`}>
                  <Button className="w-full bg-brand-green hover:bg-brand-green/90">
                    <Camera className="w-4 h-4 mr-2" />
                    View Complete Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No travel guides found for the selected filters.</p>
          <Button 
            onClick={() => {
              setSelectedCategory('all');
              setSelectedRegion('all');
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center bg-brand-cream rounded-lg p-8">
        <h2 className="font-playfair text-3xl font-bold text-brand-brown mb-4">
          Can't Find What You're Looking For?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get personalized travel recommendations based on your interests, budget, and travel style. 
          I'll help you plan the perfect India adventure.
        </p>
        <Link href="/contact">
          <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
            Get Custom Travel Plan
          </Button>
        </Link>
      </div>
    </div>
  );
}