import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { destinations } from './shared/schema.js';

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

const db = drizzle({ client: pool, schema: { destinations } });

async function addShikaraBoatTours() {
  try {
    console.log('Adding Shikara Boat Tours destination...');
    
    const shikaraDestination = {
      name: 'Shikara Boat Tours',
      slug: 'shikara-boat-tours-astamidi-river',
      description: 'Authentic Kerala boathouse experience through pristine backwaters with expert local guides on Astamidi River',
      detailedDescription: `Experience the authentic beauty of Kerala's backwaters with our traditional Shikara boat tours on the pristine Astamidi River. These carefully crafted journeys offer an intimate glimpse into Kerala's unique ecosystem and local culture.

Our traditional Kerala boathouses provide a peaceful escape from the modern world, allowing you to drift through serene waterways while observing the rich biodiversity of the region. Each tour is led by experienced local boat captains who share their deep knowledge of the area's history, wildlife, and traditional fishing practices.

The Astamidi River offers some of the most untouched backwater experiences in Kerala, with opportunities for bird watching, photography, and cultural immersion. Watch local fishermen at work, spot exotic birds in their natural habitat, and enjoy the tranquil rhythm of life along the waterways.

**What's Included:**
- Traditional Kerala boathouse ride
- Experienced local boat captain
- Scenic backwater exploration  
- Bird watching opportunities
- Cultural insights and local stories
- Safety equipment and life jackets

**Group Size:** 7-14 people per boat (capacity varies by boat size)
**Duration:** 2-4 hours depending on package selected
**Best Time:** Early morning (6-9 AM) or late afternoon (3-6 PM) for optimal wildlife viewing`,
      category: 'Adventure',
      region: 'South India',
      state: 'Kerala',
      coordinates: { lat: 9.4981, lng: 76.3388 }, // Astamidi River, Kerala coordinates
      featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      bestTimeToVisit: 'October to March (Post-monsoon to winter)',
      recommendedStay: 'Local homestays or backwater resorts in Kollam or Alappuzha',
      budgetRange: '₹1,200 - ₹3,000 per boat (not per person)',
      highlights: [
        'Traditional Kerala boathouse experience',
        'Expert local boat captains',
        'Pristine Astamidi River backwaters',
        'Bird watching opportunities',
        'Cultural immersion with local communities',
        'Photography opportunities',
        'Peaceful and serene environment',
        'Authentic Kerala experience'
      ],
      activities: [
        'Traditional boathouse ride',
        'Bird watching',
        'Photography',
        'Cultural interaction with locals',
        'Scenic backwater exploration',
        'Wildlife observation',
        'Relaxation and meditation',
        'Local fishing techniques demonstration'
      ],
      rating: 5,
      difficulty: 'Easy',
      isFeatured: true,
      isVisible: true,
      socialMediaHashtags: ['#ShikaraBoatTours', '#KeralaBackwaters', '#AstamitiRiver', '#AuthenticKerala', '#BackwaterExperience', '#KeralaBoathouse', '#BirdWatching', '#KeralaTravel']
    };

    const result = await db.insert(destinations).values(shikaraDestination).returning();
    
    console.log('✅ Successfully added Shikara Boat Tours destination!');
    console.log('Destination ID:', result[0].id);
    console.log('Slug:', result[0].slug);
    console.log('Name:', result[0].name);
    
  } catch (error) {
    console.error('❌ Error adding Shikara Boat Tours:', error);
  } finally {
    await pool.end();
  }
}

// Run the script
addShikaraBoatTours();