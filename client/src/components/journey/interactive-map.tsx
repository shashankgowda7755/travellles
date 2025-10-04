import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { TravelPin } from "@shared/schema";

interface InteractiveMapProps {
  height?: string;
  showPins?: boolean;
}

export default function InteractiveMap({ height = "500px", showPins = true }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const { data: travelPins, isLoading, error } = useQuery<TravelPin[]>({
    queryKey: ['/api/travel-pins'],
    queryFn: async () => {
      const response = await fetch('/api/travel-pins');
      if (!response.ok) {
        throw new Error(`Failed to fetch travel pins: ${response.status}`);
      }
      return response.json();
    },
  });

  console.log('InteractiveMap render:', { travelPins, isLoading, error, showPins });

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let map: L.Map | null = null;

    try {
      console.log('Initializing Leaflet map...');
      // Initialize map - centered on India
      map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      console.log('Leaflet map initialized successfully');
    } catch (error) {
      console.error('Error initializing Leaflet map:', error);
      return; // Exit early if map initialization fails
    }

    // Add travel pins if data is available and showPins is true
    if (showPins && travelPins && map) {
      travelPins.forEach((pin: TravelPin) => {
        // Validate coordinates before creating marker
        if (!pin.coordinates || 
            typeof pin.coordinates.lat !== 'number' || 
            typeof pin.coordinates.lng !== 'number' ||
            isNaN(pin.coordinates.lat) || 
            isNaN(pin.coordinates.lng)) {
          console.warn(`Invalid coordinates for pin ${pin.name}:`, pin.coordinates);
          return; // Skip this pin
        }

        const marker = L.marker([pin.coordinates.lat, pin.coordinates.lng])
          .bindPopup(`
            <div class="p-4 min-w-[220px] bg-brand-cream rounded-lg border border-brand-orange/20">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-4 h-4 rounded-full shadow-sm" style="background: linear-gradient(135deg, ${pin.pinColor}, ${pin.pinColor}dd)"></div>
                <strong class="text-brand-brown text-lg font-playfair">${pin.name}</strong>
              </div>
              ${pin.city ? `<p class="text-sm text-brand-brown/70 mb-2 font-medium">${pin.city}, ${pin.country}</p>` : `<p class="text-sm text-brand-brown/70 mb-2 font-medium">${pin.country}</p>`}
              ${pin.description ? `<p class="text-sm text-brand-brown/80 mb-3 leading-relaxed">${pin.description}</p>` : ''}
              ${pin.rating && pin.rating > 0 ? `
                <div class="flex items-center space-x-1 mb-3">
                  ${Array.from({ length: 5 }, (_, i) => 
                    `<span class="text-brand-orange text-sm">${i < (pin.rating || 0) ? '★' : '☆'}</span>`
                  ).join('')}
                  <span class="text-xs text-brand-brown/60 ml-1">(${pin.rating}/5)</span>
                </div>
              ` : ''}
              <div class="flex items-center justify-between">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white border border-brand-orange/30 text-brand-orange">${getPinTypeLabel(pin.pinType)}</span>
                ${pin.visitedDate ? `
                  <span class="text-xs text-brand-brown/60 font-medium">
                    ${new Date(pin.visitedDate).toLocaleDateString()}
                  </span>
                ` : ''}
              </div>
              ${pin.notes ? `<p class="text-xs text-brand-brown/70 mt-3 italic bg-white/50 p-2 rounded border-l-2 border-brand-orange/40">${pin.notes}</p>` : ''}
            </div>
          `, {
            className: 'custom-popup'
          })
          .addTo(map);
      });
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [showPins, travelPins]);

  const getPinTypeLabel = (pinType: string) => {
    switch (pinType) {
      case 'current': return 'Current Location';
      case 'planned': return 'Planned';
      case 'favorite': return 'Favorite';
      default: return 'Visited';
    }
  };

  return (
    <div 
      ref={mapRef} 
      style={{ height, width: '100%' }} 
      className="rounded-2xl shadow-lg"
      data-testid="interactive-map"
    />
  );
}
