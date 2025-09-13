// Fix Production Database - Initialize Missing Content
// This script will initialize the production database with required content

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { homePageContent, journeyTracking } from './shared/schema.ts';

// Production database URL - replace with your actual Vercel environment variable
const DATABASE_URL = process.env.DATABASE_URL || 'your-production-database-url';

if (!DATABASE_URL || DATABASE_URL === 'your-production-database-url') {
  console.error('❌ Please set your production DATABASE_URL');
  console.log('You can find this in your Vercel dashboard under Environment Variables');
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

async function fixProductionDatabase() {
  try {
    console.log('🔧 Fixing production database...');
    console.log('🌐 Target: milesalone.com');
    
    // Initialize home page content
    console.log('\n📝 Checking home page content...');
    const existingHomeContent = await db.select().from(homePageContent).limit(1);
    
    if (existingHomeContent.length === 0) {
      console.log('➕ Creating home page content...');
      await db.insert(homePageContent).values({
        heroTitle: 'Solo India Travel\nAuthentic Adventures',
        heroSubtitle: 'Join Shashank\'s epic 6-month solo journey across incredible India - from Kashmir\'s snow peaks to Kanyakumari\'s beaches. Real stories, practical guides, stunning photography.',
        heroBackgroundImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        exploreButtonText: 'Start Journey',
        diariesButtonText: 'Read Stories',
        mapSectionTitle: 'Live India Journey Map',
        mapSectionDescription: 'Track my real-time solo travel across 28 Indian states. From Himalayan peaks to tropical beaches, follow authentic adventures, local discoveries, and budget travel tips.',
        storiesSectionTitle: 'Solo Travel Stories from India',
        storiesSectionDescription: 'Real experiences from solo backpacking across India. Authentic stories about local culture, budget travel, safety tips, and incredible discoveries off the beaten path.',
        guidesSectionTitle: 'Complete India Travel Guides',
        guidesSectionDescription: 'Detailed solo travel guides for every Indian destination. Budget tips, safety advice, local insights, and hidden gems discovered during 6 months of authentic exploration.',
        gallerySectionTitle: 'India Travel Photography',
        gallerySectionDescription: 'Stunning photography from solo travels across India. Landscapes, portraits, street photography, and cultural moments captured during authentic adventures.',
        newsletterTitle: 'Join Solo India Travel Community',
        newsletterDescription: 'Get weekly solo travel tips, destination guides, budget advice, and authentic stories from India. Join 500+ solo travelers exploring incredible India safely.',
        newsletterSubscribersCount: 500,
        weeklyStoriesCount: 24,
        readRate: 95,
        journeyStartDate: 'August 22nd, 2024',
        journeyStartLocation: 'Bangalore, Karnataka',
        journeyStartDescription: 'Starting solo India adventure from tech capital',
        finalDestination: 'Srinagar, Kashmir',
        finalDestinationDescription: 'Ending at paradise on earth - Kashmir valleys',
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
      });
      console.log('✅ Home page content created!');
    } else {
      console.log('✅ Home page content already exists');
    }

    // Initialize journey tracking
    console.log('\n🧭 Checking journey tracking...');
    const existingJourney = await db.select().from(journeyTracking).limit(1);
    
    if (existingJourney.length === 0) {
      console.log('➕ Creating journey tracking data...');
      await db.insert(journeyTracking).values({
        currentLocation: 'Thrissur, Kerala',
        currentLocationDescription: 'A city where festivals never really end',
        currentCoordinates: { lat: 10.5276, lng: 76.2144 },
        journeyProgress: 75,
        daysTraveled: 180,
        statesCovered: 28,
        distanceCovered: 15000,
        instagramStoryUrl: null,
        instagramReelUrl: null,
        twitterUpdateUrl: null,
        youtubeShortUrl: null
      });
      console.log('✅ Journey tracking data created!');
    } else {
      console.log('✅ Journey tracking data already exists');
    }

    console.log('\n🎉 Production database fixed successfully!');
    console.log('🌐 Your website milesalone.com should now work properly');
    console.log('🧭 Journey section should be fully functional');
    console.log('\n🔄 Changes are live immediately - check your website!');
    
  } catch (error) {
    console.error('❌ Error fixing production database:', error);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Verify your DATABASE_URL is correct');
    console.log('2. Check Vercel environment variables');
    console.log('3. Ensure database tables exist (run migrations)');
    process.exit(1);
  }
}

// Run the fix
fixProductionDatabase();