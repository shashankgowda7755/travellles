import { Link } from "wouter";
import { MapPin, Camera, BookOpen, User } from "lucide-react";

interface InternalLinksProps {
  currentPage?: string;
  className?: string;
}

export default function InternalLinks({ currentPage, className = "" }: InternalLinksProps) {
  const links = [
    {
      href: "/journey",
      label: "Travel Guides",
      description: "Detailed destination guides from solo India journey",
      icon: MapPin,
      keywords: "travel guides India, backpacking destinations"
    },
    {
      href: "/gallery",
      label: "Photo Gallery",
      description: "Authentic travel photography collections",
      icon: Camera,
      keywords: "India travel photos, solo backpacking photography"
    },
    {
      href: "/letters",
      label: "Travel Letters",
      description: "Personal stories and experiences from the road",
      icon: BookOpen,
      keywords: "travel stories India, personal journey experiences"
    },
    {
      href: "/about",
      label: "About Shashank",
      description: "Solo traveler sharing authentic India experiences",
      icon: User,
      keywords: "solo travel blogger, India backpacking expert"
    }
  ];

  const filteredLinks = links.filter(link => link.href !== currentPage);

  return (
    <div className={`bg-brand-cream p-6 rounded-lg ${className}`}>
      <h3 className="font-playfair text-xl font-bold text-brand-brown mb-4">
        Explore More Travel Content
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                <IconComponent className="w-5 h-5 text-brand-orange mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-brand-brown hover:text-brand-orange transition-colors">
                    {link.label}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}