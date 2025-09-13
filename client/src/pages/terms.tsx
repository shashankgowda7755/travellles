import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InternalLinks from "@/components/seo/internal-links";

export default function Terms() {
  useEffect(() => {
    // SEO meta tags for Terms page
    document.title = "Terms of Service - Miles Alone Travel Blog";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for Miles Alone travel blog. Read our terms and conditions for using our solo India travel content and services.');
    }

    // Add canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://www.milesalone.com/terms';
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
          "name": "Terms of Service",
          "item": "https://www.milesalone.com/terms"
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
          Terms of Service
        </h1>
        
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> January 16, 2025
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6">
                By accessing and using Miles Alone ("the website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">2. Content and Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, audio clips, video clips, digital downloads, data compilations, and software, is the property of Miles Alone or its content suppliers and protected by international copyright laws.
              </p>
              <p className="mb-6">
                You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the service without express written permission from Miles Alone.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">3. User Conduct</h2>
              <p className="mb-4">You agree not to use the service to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
                <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
                <li>Upload, post, or transmit any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights</li>
                <li>Upload, post, or transmit any unsolicited or unauthorized advertising, promotional materials, spam, or any other form of solicitation</li>
              </ul>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">4. Travel Information Disclaimer</h2>
              <p className="mb-6">
                The travel information, recommendations, and experiences shared on this website are based on personal experiences and opinions. Travel conditions, prices, and circumstances can change rapidly. We recommend verifying all information independently before making travel decisions. Miles Alone is not responsible for any inconvenience, loss, or injury resulting from the use of information provided on this website.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">5. Limitation of Liability</h2>
              <p className="mb-6">
                Miles Alone shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the website, or any content therein.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">6. Privacy Policy</h2>
              <p className="mb-6">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">7. Changes to Terms</h2>
              <p className="mb-6">
                Miles Alone reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes constitutes acceptance of the new terms.
              </p>

              <h2 className="font-playfair text-2xl font-bold text-brand-brown mb-4">8. Contact Information</h2>
              <p className="mb-6">
                If you have any questions about these Terms of Service, please contact us at contact@milesalone.com.
              </p>
            </div>
          </CardContent>
        </Card>

        <InternalLinks currentPage="/terms" className="mt-16" />
      </div>
    </div>
  );
}