import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InternalLinks from "@/components/seo/internal-links";

export default function Privacy() {
  useEffect(() => {
    // SEO meta tags for Privacy page
    document.title = "Privacy Policy - Miles Alone Travel Blog";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for Miles Alone travel blog. Learn how we protect your personal information and data when you visit our solo India travel website.');
    }

    // Add canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://www.milesalone.com/privacy';
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
          "name": "Privacy Policy",
          "item": "https://www.milesalone.com/privacy"
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
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-playfair text-3xl lg:text-5xl font-bold text-brand-brown mb-8 text-center">
          Privacy Policy
        </h1>
        
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> January 16, 2025
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our contact form</li>
                <li>Leave comments on our blog posts</li>
                <li>Interact with our social media accounts</li>
              </ul>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Send you newsletters and travel updates (only if you subscribe)</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our website and content</li>
                <li>Analyze website usage and performance</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">3. Information Sharing</h2>
              <p className="mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or serving our users, as long as those parties agree to keep this information confidential.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Improve your browsing experience</li>
                <li>Analyze website traffic and performance</li>
              </ul>
              <p className="mb-6">
                You can control cookies through your browser settings, but disabling cookies may affect your experience on our website.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">5. Third-Party Services</h2>
              <p className="mb-4">
                Our website may contain links to third-party websites and services, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Google Analytics for website analytics</li>
                <li>Social media platforms (Instagram, Facebook, etc.)</li>
                <li>Email newsletter services</li>
                <li>Hosting and content delivery services</li>
              </ul>
              <p className="mb-6">
                These third parties have their own privacy policies, and we are not responsible for their practices.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">6. Data Security</h2>
              <p className="mb-6">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">7. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Unsubscribe from our newsletter at any time</li>
                <li>Object to processing of your personal information</li>
              </ul>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">8. Children's Privacy</h2>
              <p className="mb-6">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">9. International Users</h2>
              <p className="mb-6">
                If you are visiting our website from outside India, please note that your information may be transferred to, stored, and processed in India where our servers are located and our central database is operated.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">10. Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">11. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy, please contact us at:
                <br /><br />
                Email: contact@milesalone.com<br />
                Website: https://www.milesalone.com
              </p>
            </div>
          </CardContent>
        </Card>

        <InternalLinks currentPage="/privacy" className="mt-16" />
      </div>
    </div>
  );
}