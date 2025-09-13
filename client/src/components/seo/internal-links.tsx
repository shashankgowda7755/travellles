import { Link } from "wouter";
import { MapPin, Camera, BookOpen, User, Home, FileText, Shield } from "lucide-react";

interface InternalLinksProps {
  currentPage?: string;
  className?: string;
  showRelated?: boolean;
}

export default function InternalLinks({ currentPage, className = "", showRelated = true }: InternalLinksProps) {
  const allLinks = [
    {
      href: "/",
      label: "Home",
      description: "Discover solo travel adventures across India",
      icon: Home,
      keywords: "solo travel India, backpacking adventures",
      category: "main"
    },
    {
      href: "/journey",
      label: "Journey Map",
      description: "Interactive travel guides and destination insights",
      icon: MapPin,
      keywords: "India travel guides, solo backpacking destinations",
      category: "main"
    },
    {
      href: "/gallery",
      label: "Photo Gallery",
      description: "Stunning travel photography from across India",
      icon: Camera,
      keywords: "India travel photography, scenic landscapes",
      category: "main"
    },
    {
      href: "/letters",
      label: "Travel Letters",
      description: "Personal stories and authentic travel experiences",
      icon: BookOpen,
      keywords: "travel stories India, solo journey experiences",
      category: "main"
    },
    {
      href: "/about",
      label: "About Shashank",
      description: "Meet the solo traveler behind Miles Alone",
      icon: User,
      keywords: "solo travel blogger, India travel expert",
      category: "main"
    },
    {
      href: "/terms",
      label: "Terms of Service",
      description: "Website terms and conditions",
      icon: FileText,
      keywords: "terms conditions, website policy",
      category: "legal"
    },
    {
      href: "/privacy",
      label: "Privacy Policy",
      description: "How we protect your personal information",
      icon: Shield,
      keywords: "privacy policy, data protection",
      category: "legal"
    }
  ];

  // Get related content based on current page
  const getRelatedLinks = () => {
    const pageRelations = {
      "/": ["/journey", "/gallery", "/letters"],
      "/journey": ["/gallery", "/letters", "/about"],
      "/gallery": ["/journey", "/letters", "/"],
      "/letters": ["/journey", "/gallery", "/about"],
      "/about": ["/journey", "/letters", "/gallery"],
      "/terms": ["/privacy", "/about", "/"],
      "/privacy": ["/terms", "/about", "/"]
    };
    
    const related = pageRelations[currentPage as keyof typeof pageRelations] || ["/journey", "/gallery", "/letters"];
    return allLinks.filter(link => related.includes(link.href));
  };

  const links = showRelated ? getRelatedLinks() : allLinks.filter(link => link.href !== currentPage && link.category === "main");

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