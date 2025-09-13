// Using built-in fetch (Node.js 18+)
// const fetch = require('node-fetch');

// SEO-optimized home content
const seoHomeContent = {
  heroTitle: 'Solo India Travel\nAuthentic Adventures',
  heroSubtitle: 'Join Shashank\'s epic 6-month solo journey across incredible India - from Kashmir\'s snow peaks to Kanyakumari\'s beaches. Real stories, practical guides, stunning photography.',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
  exploreButtonText: 'Start Journey',
  diariesButtonText: 'Read Stories',
  
  // Map section
  mapSectionTitle: 'Live India Journey Map',
  mapSectionDescription: 'Track my real-time solo travel across 28 Indian states. From Himalayan peaks to tropical beaches, follow authentic adventures, local discoveries, and budget travel tips.',
  
  // Stories section
  storiesSectionTitle: 'Solo Travel Stories from India',
  storiesSectionDescription: 'Real experiences from solo backpacking across India. Authentic stories about local culture, budget travel, safety tips, and incredible discoveries off the beaten path.',
  
  // Guides section
  guidesSectionTitle: 'Complete India Travel Guides',
  guidesSectionDescription: 'Detailed solo travel guides for every Indian destination. Budget tips, safety advice, local insights, and hidden gems discovered during 6 months of authentic exploration.',
  
  // Gallery section
  gallerySectionTitle: 'India Travel Photography',
  gallerySectionDescription: 'Stunning photography from solo travels across India. Landscapes, portraits, street photography, and cultural moments captured during authentic adventures.',
  
  // Newsletter section
  newsletterTitle: 'Join Solo India Travel Community',
  newsletterDescription: 'Get weekly solo travel tips, destination guides, budget advice, and authentic stories from India. Join 500+ solo travelers exploring incredible India safely.',
  newsletterSubscribersCount: 500,
  weeklyStoriesCount: 24,
  readRate: 95,
  
  // Journey details
  journeyStartDate: 'August 22nd, 2024',
  journeyStartLocation: 'Bangalore, Karnataka',
  journeyStartDescription: 'Starting solo India adventure from tech capital',
  finalDestination: 'Srinagar, Kashmir',
  finalDestinationDescription: 'Ending at paradise on earth - Kashmir valleys',
  
  // Footer content
  footerBrandDescription: 'Authentic solo travel stories, practical India travel guides, budget tips, and stunning photography from 6 months exploring incredible India.',
  footerInstagramUrl: 'https://instagram.com/milesalone',
  footerYoutubeUrl: 'https://youtube.com/@milesalone',
  footerTwitterUrl: 'https://twitter.com/milesalone',
  footerEmailUrl: 'mailto:contact@milesalone.com',
  footerCopyright: '© 2025 Milesalone. All rights reserved. Authentic solo travel across incredible India.',
  footerDaysTraveled: '180+ days',
  footerStatesCovered: '28 states',
  footerDistance: '15,000+ km',
  footerProgressPercentage: 75,
  footerProgressText: '75% journey complete'
};

async function updateHomeContent() {
  try {
    console.log('🚀 Updating homepage content with SEO-optimized version...');
    
    const response = await fetch('http://localhost:5000/api/home-content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer admin-token' // You may need to adjust this
      },
      body: JSON.stringify(seoHomeContent)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Homepage content updated successfully!');
      console.log('📝 New hero title:', result.heroTitle);
      console.log('🎯 SEO-optimized content is now live!');
    } else {
      console.error('❌ Failed to update content:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
    }
  } catch (error) {
    console.error('❌ Error updating home content:', error.message);
  }
}

// Run the update
updateHomeContent();