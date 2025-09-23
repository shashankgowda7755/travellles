import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { travelPins } from './shared/schema.js';

// Load environment variables from .env file
config();

// Initialize database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/travel_blog_dev',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = drizzle({ client: pool, schema: { travelPins } });

// Alleppey travel pin data based on web research
const alleppeyPinData = {
  name: 'Alleppey (Alappuzha)',
  description: 'Venice of the East - Famous for its enchanting backwaters, traditional houseboats, pristine beaches, and vibrant local culture. Known for coconut groves, paddy fields, and the annual Nehru Trophy Boat Race.',
  coordinates: {
    lat: 9.498067,
    lng: 76.338844
  },
  country: 'India',
  city: 'Alappuzha',
  pinType: 'current' as const,
  pinColor: '#22C55E', // Green color for current location
  images: [],
  tags: ['backwaters', 'houseboats', 'beaches', 'kerala', 'venice-of-east', 'boat-race', 'coconut-groves'],
  rating: 5,
  notes: 'Currently exploring the mesmerizing backwaters and experiencing the unique houseboat culture. The serene waterways and lush green landscapes make this a perfect destination for peaceful travel.',
  isVisible: true,
  socialMediaHashtags: ['#Alleppey', '#Kerala', '#Backwaters', '#VeniceOfEast', '#Houseboats', '#IncredibleIndia', '#TravelIndia'],
  visitedDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date()
};

async function addAlleppeyPin() {
  try {
    console.log('🚀 Adding Alleppey as current location pin...');
    
    const [result] = await db.insert(travelPins).values(alleppeyPinData).returning();
    
    console.log(`✅ Successfully added Alleppey pin (ID: ${result?.id})`);
    console.log('📍 Pin details:');
    console.log(`   Name: ${alleppeyPinData.name}`);
    console.log(`   Type: ${alleppeyPinData.pinType}`);
    console.log(`   Coordinates: ${alleppeyPinData.coordinates.lat}, ${alleppeyPinData.coordinates.lng}`);
    console.log(`   Tags: ${alleppeyPinData.tags.join(', ')}`);
    console.log(`   Rating: ${alleppeyPinData.rating}/5`);
    
  } catch (error) {
    if (error.message && error.message.includes('duplicate key')) {
      console.log('⚠️  Alleppey pin already exists in the database');
    } else {
      console.error('❌ Error adding Alleppey pin:', error);
      console.error('Pin data:', JSON.stringify(alleppeyPinData, null, 2));
    }
  } finally {
    await pool.end();
    process.exit(0);
  }
}

addAlleppeyPin();