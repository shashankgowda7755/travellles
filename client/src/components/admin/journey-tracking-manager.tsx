import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Save, MapPin } from "lucide-react";

const journeyTrackingSchema = z.object({
  currentLocation: z.string().min(1, "Current location is required"),
  currentCoordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }),
  journeyProgress: z.number().min(0).max(100),
  daysTraveled: z.number().min(0),
  statesCovered: z.number().min(0),
  distanceCovered: z.number().min(0),
  instagramStoryUrl: z.string().optional(),
  instagramReelUrl: z.string().optional(),
  twitterUpdateUrl: z.string().optional(),
  youtubeShortUrl: z.string().optional()
});

type JourneyTrackingForm = z.infer<typeof journeyTrackingSchema>;

export default function JourneyTrackingManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current journey data
  const { data: journey, isLoading } = useQuery({
    queryKey: ["/api/journey"],
  });

  const form = useForm<JourneyTrackingForm>({
    resolver: zodResolver(journeyTrackingSchema),
    defaultValues: {
      currentLocation: journey?.currentLocation || "",
      currentCoordinates: {
        lat: journey?.currentCoordinates?.lat || 0,
        lng: journey?.currentCoordinates?.lng || 0
      },
      journeyProgress: journey?.journeyProgress || 0,
      daysTraveled: journey?.daysTraveled || 0,
      statesCovered: journey?.statesCovered || 0,
      distanceCovered: journey?.distanceCovered || 0,
      instagramStoryUrl: journey?.instagramStoryUrl || "",
      instagramReelUrl: journey?.instagramReelUrl || "",
      twitterUpdateUrl: journey?.twitterUpdateUrl || "",
      youtubeShortUrl: journey?.youtubeShortUrl || ""
    }
  });

  // Reset form when journey data loads
  useState(() => {
    if (journey) {
      form.reset({
        currentLocation: journey.currentLocation || "",
        currentCoordinates: {
          lat: journey.currentCoordinates?.lat || 0,
          lng: journey.currentCoordinates?.lng || 0
        },
        journeyProgress: journey.journeyProgress || 0,
        daysTraveled: journey.daysTraveled || 0,
        statesCovered: journey.statesCovered || 0,
        distanceCovered: journey.distanceCovered || 0,
        instagramStoryUrl: journey.instagramStoryUrl || "",
        instagramReelUrl: journey.instagramReelUrl || "",
        twitterUpdateUrl: journey.twitterUpdateUrl || "",
        youtubeShortUrl: journey.youtubeShortUrl || ""
      });
    }
  });

  const updateJourneyMutation = useMutation({
    mutationFn: async (data: JourneyTrackingForm) => {
      return apiRequest("/api/journey", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Journey tracking updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/journey"] });
    },
    onError: (error) => {
      console.error("Error updating journey tracking:", error);
      toast({
        title: "Error",
        description: "Failed to update journey tracking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: JourneyTrackingForm) => {
    updateJourneyMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Journey Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading journey data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Journey Tracking Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentLocation">Current Location</Label>
              <Input
                id="currentLocation"
                {...form.register("currentLocation")}
                placeholder="e.g., Mysuru, Karnataka"
              />
              {form.formState.errors.currentLocation && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.currentLocation.message}
                </p>
              )}
            </div>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                type="number"
                step="any"
                {...form.register("currentCoordinates.lat", { valueAsNumber: true })}
                placeholder="e.g., 12.2958"
              />
              {form.formState.errors.currentCoordinates?.lat && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.currentCoordinates.lat.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                type="number"
                step="any"
                {...form.register("currentCoordinates.lng", { valueAsNumber: true })}
                placeholder="e.g., 76.6394"
              />
              {form.formState.errors.currentCoordinates?.lng && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.currentCoordinates.lng.message}
                </p>
              )}
            </div>
          </div>

          {/* Journey Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="daysTraveled">Days Traveled</Label>
              <Input
                id="daysTraveled"
                type="number"
                {...form.register("daysTraveled", { valueAsNumber: true })}
                placeholder="e.g., 10"
              />
              {form.formState.errors.daysTraveled && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.daysTraveled.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="statesCovered">States Covered</Label>
              <Input
                id="statesCovered"
                type="number"
                {...form.register("statesCovered", { valueAsNumber: true })}
                placeholder="e.g., 5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distanceCovered">Distance (km)</Label>
              <Input
                id="distanceCovered"
                type="number"
                {...form.register("distanceCovered", { valueAsNumber: true })}
                placeholder="e.g., 2500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="journeyProgress">Progress (%)</Label>
              <Input
                id="journeyProgress"
                type="number"
                min="0"
                max="100"
                {...form.register("journeyProgress", { valueAsNumber: true })}
                placeholder="e.g., 65"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Media Updates (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagramStoryUrl">Instagram Story URL</Label>
                <Input
                  id="instagramStoryUrl"
                  {...form.register("instagramStoryUrl")}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramReelUrl">Instagram Reel URL</Label>
                <Input
                  id="instagramReelUrl"
                  {...form.register("instagramReelUrl")}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUpdateUrl">Twitter Update URL</Label>
                <Input
                  id="twitterUpdateUrl"
                  {...form.register("twitterUpdateUrl")}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeShortUrl">YouTube Short URL</Label>
                <Input
                  id="youtubeShortUrl"
                  {...form.register("youtubeShortUrl")}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={updateJourneyMutation.isPending}
            className="w-full bg-brand-orange hover:bg-brand-orange/90"
          >
            <Save className="mr-2 h-4 w-4" />
            {updateJourneyMutation.isPending ? "Updating..." : "Update Journey Tracking"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}