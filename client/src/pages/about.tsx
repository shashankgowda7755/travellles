import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Bell, Calendar, Route, Coins, Backpack, MapPin, Camera, Heart, Star } from "lucide-react";
import InternalLinks from "@/components/seo/internal-links";
import { Link } from "wouter";
import ContactForm from "@/components/contact/contact-form";
import { useJourney } from "@/hooks/use-journey";
import { useEffect } from "react";

export default function About() {
  const { data: journey } = useJourney();

  useEffect(() => {
    // SEO meta tags for About page
    document.title = "About Shashank - Solo India Travel Blogger | Milesalone";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Meet Shashank, solo traveler documenting an authentic 6-month journey across India from Kashmir to Kanyakumari. Real stories, budget travel tips, and cultural experiences.');
    }

    // Add canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://www.milesalone.com/about';
    document.head.appendChild(canonicalLink);

    // Add structured data for author
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Shashank",
      "description": "Solo travel blogger documenting authentic experiences across India",
      "url": "https://www.milesalone.com/about",
      "sameAs": [
        "https://www.milesalone.com"
      ],
      "knowsAbout": [
        "Solo travel in India",
        "Budget backpacking",
        "Indian culture and traditions",
        "Travel photography",
        "Authentic travel experiences"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Travel Blogger",
        "description": "Documents authentic solo travel experiences across India"
      }
    });
    document.head.appendChild(script);

    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
      document.head.removeChild(script);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24" data-testid="about-section">
          <div>
            {/* Portrait photo placeholder */}
            <div className="relative">
              <img
                src="https://i.postimg.cc/sQxd5ry0/IMG20250424065834.jpg"
                alt="Shashank Gowda - Solo travel blogger exploring scenic mountain landscapes in India"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                data-testid="traveler-portrait"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-orange text-white p-4 rounded-2xl shadow-lg">
                <div className="text-center" data-testid="completion-badge">
                  <div className="text-2xl font-bold">{journey?.journeyProgress || 65}%</div>
                  <div className="text-sm">Complete</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h1 className="font-playfair text-3xl lg:text-5xl font-bold text-brand-brown mb-6" data-testid="about-title">
              About Shashank - Solo India Travel Blogger
            </h1>
            <p className="text-xl text-gray-600 mb-6" data-testid="about-intro">
              I'm Shashank, a solo traveler documenting the real India - not the Instagram-perfect version, but the authentic, challenging, beautiful, and transformative experience of exploring this incredible country on a budget. This blog shares genuine stories, practical tips, and honest insights from my 6-month journey across India.
            </p>
            <p className="text-gray-600 mb-6" data-testid="about-description">
              Starting from the serene valleys of Kashmir and heading to the southern tip of Kanyakumari, this epic journey covers over 3,000 kilometers, 15+ states, and countless stories of human connection, cultural discovery, and personal growth. Every story, photo, and tip comes from real experiences on the road.
            </p>
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-brand-brown">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>15+ States Explored</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>1000+ Photos Captured</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Authentic Experiences</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Budget Travel Expert</span>
              </div>
            </div>

            {/* Journey Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-testid="journey-details">
              <Card className="bg-white p-4">
                <CardContent className="p-0">
                  <div className="flex items-center mb-2">
                    <Calendar className="text-brand-orange mr-3 h-5 w-5" />
                    <span className="font-semibold text-brand-brown">Duration</span>
                  </div>
                  <p className="text-gray-600">6 months (Aug - Jan 2026)</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-4">
                <CardContent className="p-0">
                  <div className="flex items-center mb-2">
                    <Route className="text-brand-orange mr-3 h-5 w-5" />
                    <span className="font-semibold text-brand-brown">Distance</span>
                  </div>
                  <p className="text-gray-600">3,000+ kilometers</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-4">
                <CardContent className="p-0">
                  <div className="flex items-center mb-2">
                    <Backpack className="text-brand-orange mr-3 h-5 w-5" />
                    <span className="font-semibold text-brand-brown">Style</span>
                  </div>
                  <p className="text-gray-600">Solo backpacking</p>
                </CardContent>
              </Card>
            </div>

            {/* Travel Philosophy */}
            <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-brown/10 border-brand-orange/20 p-6 mb-8" data-testid="travel-philosophy">
              <CardContent className="p-0">
                <h3 className="font-playfair text-2xl font-bold text-brand-brown mb-4">
                  Travel Philosophy
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  "Travel isn't about checking destinations off a list. It's about opening yourself to the unexpected, embracing discomfort as a teacher, and finding beauty in the ordinary moments between the extraordinary ones. Every conversation with a stranger, every shared meal, every challenge overcome - these are the real treasures of the road."
                </p>
                <p className="text-gray-600 leading-relaxed">
                  My approach to travel blogging focuses on authentic storytelling, practical budget advice, and cultural sensitivity. I believe in responsible tourism that benefits local communities and preserves the destinations we love to explore.
                </p>
              </CardContent>
            </Card>

            {/* Travel Expertise */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-brand-brown/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-brand-brown mb-4 flex items-center gap-2">
                    <Backpack className="w-5 h-5" />
                    Travel Expertise
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Solo backpacking across India</li>
                    <li>• Budget travel under ₹1000/day</li>
                    <li>• Local transportation navigation</li>
                    <li>• Cultural immersion techniques</li>
                    <li>• Safety tips for solo travelers</li>
                    <li>• Photography in challenging conditions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-brand-brown/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-brand-brown mb-4 flex items-center gap-2">
                    <Route className="w-5 h-5" />
                    Journey Highlights
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Kashmir to Kanyakumari route</li>
                    <li>• 15+ states and union territories</li>
                    <li>• 50+ cities and towns explored</li>
                    <li>• 100+ local interactions documented</li>
                    <li>• Traditional festivals experienced</li>
                    <li>• Hidden gems discovered</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Why Follow This Blog */}
            <Card className="bg-gradient-to-r from-brand-brown/5 to-brand-orange/5 border-brand-brown/20 mb-8">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-brand-brown mb-4">
                  Why Follow Milesalone?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">Authentic Stories</h4>
                    <p className="text-gray-600 text-sm">Real experiences, honest challenges, and genuine cultural encounters - no sugar-coating or sponsored content.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">Practical Tips</h4>
                    <p className="text-gray-600 text-sm">Detailed budget breakdowns, transportation guides, and safety advice tested on the road.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">Cultural Insights</h4>
                    <p className="text-gray-600 text-sm">Deep dives into local traditions, festivals, and customs with respect and understanding.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact and Support */}
            <div className="flex flex-col sm:flex-row gap-4" data-testid="about-actions">
              <a href="mailto:contact@milesalone.com">
                <Button className="bg-brand-orange text-white hover:bg-brand-orange/90 px-6 py-3 font-medium">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Button>
              </a>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-6 py-3 font-medium"
              >
                <Bell className="mr-2 h-4 w-4" />
                Follow Journey
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12" data-testid="contact-section">
          <div>
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-brand-brown mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about the journey? Want to share your own life experiences? Or maybe you have recommendations for upcoming places to explore? I'd love to hear from you.
            </p>

            <ContactForm />
          </div>

          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="bg-white p-8 shadow-lg">
              <CardContent className="p-0">
                <h3 className="font-playfair text-2xl font-bold text-brand-brown mb-6">Connect Directly</h3>
                <div className="space-y-4">
                  <a href="mailto:contact@milesalone.com" className="flex items-center text-gray-600 hover:text-brand-orange transition-colors">
                    <Mail className="text-brand-orange mr-4 h-5 w-5" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div>contact@milesalone.com</div>
                    </div>
                  </a>
                  <div className="flex items-center text-gray-600">
                    <Route className="text-brand-orange mr-4 h-5 w-5" />
                    <div>
                      <div className="font-medium">Current Location</div>
                      <div>{journey?.currentLocation || "Thrissur, Kerala, India"}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="text-brand-orange mr-4 h-5 w-5" />
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div>Usually within 24 hours</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Journey Status */}
            <Card className="bg-brand-orange bg-opacity-10 p-8 border-2 border-brand-orange">
              <CardContent className="p-0">
                <h3 className="font-playfair text-xl font-bold text-brand-brown mb-4">Journey Update</h3>
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-brand-orange rounded-full animate-pulse mr-3"></div>
                  <span className="font-medium text-brand-brown">Currently in {journey?.currentLocation || "Thrissur, Kerala"}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {journey?.currentLocationDescription || "A city where festivals never really end"}. Next stop: Coimbatore for textile culture exploration.
                </p>
                <div className="text-sm text-gray-500">
                  Last updated: 2 hours ago
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="bg-white p-8 shadow-lg">
              <CardContent className="p-0">
                <h3 className="font-playfair text-xl font-bold text-brand-brown mb-4">Quick Questions</h3>
                <div className="space-y-3" data-testid="faq-section">
                  <details className="text-sm">
                    <summary className="cursor-pointer text-brand-brown font-medium hover:text-brand-orange">Can I follow your exact route?</summary>
                    <p className="text-gray-600 mt-2 pl-4">Yes! All route details, accommodations, and transport options are documented in destination guides.</p>
                  </details>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-brand-brown font-medium hover:text-brand-orange">Do you accept journey recommendations?</summary>
                    <p className="text-gray-600 mt-2 pl-4">Absolutely! Send location suggestions via the contact form above.</p>
                  </details>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Bottom spacer to prevent navigation overlap */}
        <div className="h-24"></div>
      </div>
      
      {/* Internal Links for SEO */}
      <InternalLinks currentPage="/about" className="mt-16" />
    </div>
  );
}
