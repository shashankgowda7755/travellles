import { useQuery } from "@tanstack/react-query";
import type { JourneyTracking } from "@shared/schema";

export function useJourney() {
  return useQuery<JourneyTracking>({
    queryKey: ['/api/journey'],
    queryFn: async () => {
      const response = await fetch('/api/journey');
      if (!response.ok) {
        throw new Error(`Failed to fetch journey data: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
