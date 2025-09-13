import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { homePageContent, journeyTracking } from './shared/schema';

// Load environment variables
config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function initializeDatabaseContent() {
  try {
    console.log('🚀 Initializing database content...');

    // Check if home_page_content already exists
    const existingHomeContent = await db.select().from(homePageContent).limit(1);
    
    if (existingHomeContent.length === 0) {
      console.log('📝 Creating initial home page content...');
      await db.insert(homePageContent).values({
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
        newsletterSubscribersCount: 342,
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
        footerInstagramUrl: '#',
        footerYoutubeUrl: '#',
        footerTwitterUrl: '#',
        footerEmailUrl: 'mailto:contact@milesalone.com',
        footerCopyright: '© 2025 Milesalone. All rights reserved. Built with passion for authentic travel.',
        
        // Footer stats
        footerDaysTraveled: '78 / 120',
        footerStatesCovered: '9 / 15+',
        footerDistance: '1,950 km',
        footerProgressPercentage: 65,
        footerProgressText: '65% journey complete',
      });
      console.log('✅ Home page content created successfully!');
    } else {
      console.log('ℹ️  Home page content already exists, skipping...');
    }

    // Check if journey_tracking already exists
    const existingJourney = await db.select().from(journeyTracking).limit(1);
    
    if (existingJourney.length === 0) {
      console.log('🧭 Creating initial journey tracking data...');
      await db.insert(journeyTracking).values({
        currentLocation: 'Thrissur, Kerala',
        currentLocationDescription: 'A city where festivals never really end',
        currentCoordinates: { lat: 10.5276, lng: 76.2144 },
        journeyProgress: 20,
        daysTraveled: 24,
        statesCovered: 3,
        distanceCovered: 6500,
        instagramStoryUrl: null,
        instagramReelUrl: null,
        twitterUpdateUrl: null,
        youtubeShortUrl: null,
      });
      console.log('✅ Journey tracking data created successfully!');
    } else {
      console.log('ℹ️  Journey tracking data already exists, skipping...');
    }

    console.log('\n🎉 Database initialization complete!');
    console.log('\n📋 What you can do now:');
    console.log('1. Visit your Neon Console: https://console.neon.tech/');
    console.log('2. Use SQL Editor to edit any content');
    console.log('3. Check the COMPLETE_DATABASE_EDITING_GUIDE.md for detailed instructions');
    console.log('4. Access admin panel at: http://localhost:5000/admin');
    console.log('   - Username: admin');
    console.log('   - Password: Travel@2025');
    console.log('\n🔄 All changes will appear instantly on your website!');
    
  } catch (error) {
    console.error('❌ Error initializing database content:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabaseContent();