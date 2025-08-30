const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const schema = require('./shared/schema.ts');

const { 
  blogPosts, 
  destinations, 
  galleryCollections, 
  galleryMedia,
  travelPins,
  homePageContent 
} = schema;

// Database connection
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_FwdsBOvz87qt@ep-gentle-leaf-a1k0r5w1-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({ 
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = drizzle({ client: pool, schema });

// Sample data arrays
const indianCities = [
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lng: 72.8311 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lng: 80.3319 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
  { name: 'Thane', state: 'Maharashtra', lat: 19.2183, lng: 72.9781 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
  { name: 'Pimpri-Chinchwad', state: 'Maharashtra', lat: 18.6298, lng: 73.7997 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lng: 73.1812 },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', lat: 28.6692, lng: 77.4538 },
  { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573 },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081 },
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898 },
  { name: 'Faridabad', state: 'Haryana', lat: 28.4089, lng: 77.3178 },
  { name: 'Meerut', state: 'Uttar Pradesh', lat: 28.9845, lng: 77.7064 },
  { name: 'Rajkot', state: 'Gujarat', lat: 22.3039, lng: 70.8022 },
  { name: 'Kalyan-Dombivali', state: 'Maharashtra', lat: 19.2403, lng: 73.1305 },
  { name: 'Vasai-Virar', state: 'Maharashtra', lat: 19.4912, lng: 72.8054 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { name: 'Srinagar', state: 'Jammu and Kashmir', lat: 34.0837, lng: 74.7973 }
];

const categories = ['Trek Place', 'Tourist Spot', 'Beach', 'Historical', 'Cultural', 'Adventure'];
const regions = ['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'];
const difficulties = ['Easy', 'Moderate', 'Challenging'];
const pinTypes = ['visited', 'planned', 'recommended'];
const pinColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

function getRandomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seedGalleryCollections() {
  console.log('🖼️ Seeding gallery collections...');
  
  const collections = [];
  for (let i = 0; i < 8; i++) {
    const city = getRandomElement(indianCities);
    const collection = {
      title: `${city.name} Photo Collection`,
      description: `Beautiful photographs from ${city.name}, ${city.state}`,
      coverImage: getRandomElement(sampleImages),
      location: `${city.name}, ${city.state}`,
      isVisible: Math.random() > 0.2,
      createdAt: getRandomDate(),
      updatedAt: new Date()
    };
    collections.push(collection);
  }
  
  const insertedCollections = await db.insert(galleryCollections).values(collections).returning();
  console.log(`✅ Created ${insertedCollections.length} gallery collections`);
  return insertedCollections;
}

async function seedGalleryMedia(collections) {
  console.log('📸 Seeding gallery media...');
  
  const media = [];
  for (const collection of collections) {
    const mediaCount = Math.floor(Math.random() * 8) + 3; // 3-10 media per collection
    for (let i = 0; i < mediaCount; i++) {
      const mediaItem = {
        collectionId: collection.id,
        type: 'photo',
        url: getRandomElement(sampleImages),
        caption: `Beautiful view from ${collection.title}`,
        sortOrder: i,
        createdAt: getRandomDate()
      };
      media.push(mediaItem);
    }
  }
  
  const insertedMedia = await db.insert(galleryMedia).values(media).returning();
  console.log(`✅ Created ${insertedMedia.length} gallery media items`);
  return insertedMedia;
}

async function seedDestinations(collections) {
  console.log('🏔️ Seeding destinations...');
  
  const destinationData = [];
  for (let i = 0; i < 15; i++) {
    const city = getRandomElement(indianCities);
    const relatedGallery = Math.random() > 0.3 ? getRandomElement(collections) : null;
    
    const destination = {
      name: `${city.name} Adventure`,
      slug: generateSlug(`${city.name} adventure ${i + 1}`),
      description: `Explore the beautiful ${city.name} and discover its hidden gems`,
      detailedDescription: `${city.name} offers an incredible travel experience with rich culture, stunning landscapes, and unforgettable adventures. From historical monuments to natural wonders, this destination has something for every traveler.`,
      category: getRandomElement(categories),
      region: getRandomElement(regions),
      state: city.state,
      coordinates: { lat: city.lat, lng: city.lng },
      featuredImage: getRandomElement(sampleImages),
      bestTimeToVisit: getRandomElement(['Spring', 'Summer', 'Monsoon', 'Winter', 'Year-round']),
      recommendedStay: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 3) + 3} days`,
      budgetRange: getRandomElement(['Budget-friendly', 'Mid-range', 'Luxury', 'Backpacker']),
      highlights: getRandomElements([
        'Stunning landscapes',
        'Rich cultural heritage',
        'Adventure activities',
        'Local cuisine',
        'Historical sites',
        'Natural beauty',
        'Photography opportunities',
        'Local markets'
      ], 4),
      activities: getRandomElements([
        'Trekking',
        'Photography',
        'Cultural tours',
        'Food tasting',
        'Shopping',
        'Sightseeing',
        'Adventure sports',
        'Nature walks'
      ], 3),
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      difficulty: getRandomElement(difficulties),
      relatedGalleryId: relatedGallery?.id || null,
      isCurrentLocation: i === 0, // Make first one current
      isFeatured: Math.random() > 0.7,
      isVisible: Math.random() > 0.1,
      createdAt: getRandomDate(),
      updatedAt: new Date()
    };
    destinationData.push(destination);
  }
  
  const insertedDestinations = await db.insert(destinations).values(destinationData).returning();
  console.log(`✅ Created ${insertedDestinations.length} destinations`);
  return insertedDestinations;
}

async function seedTravelPins() {
  console.log('📍 Seeding travel pins...');
  
  const pins = [];
  for (let i = 0; i < 25; i++) {
    const city = getRandomElement(indianCities);
    const visitedDate = getRandomDate();
    
    const pin = {
      name: city.name,
      description: `Amazing experience in ${city.name}`,
      country: 'India',
      city: city.name,
      coordinates: { lat: city.lat, lng: city.lng },
      visitedDate: visitedDate,
      rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
      notes: `${city.name} was an incredible destination with so much to offer. The local culture, food, and people made this trip unforgettable.`,
      images: getRandomElements(sampleImages, Math.floor(Math.random() * 3) + 1),
      tags: getRandomElements(['travel', 'adventure', 'culture', 'food', 'photography', 'nature'], 3),
      pinType: getRandomElement(pinTypes),
      pinColor: getRandomElement(pinColors),
      isVisible: Math.random() > 0.1,
      createdAt: visitedDate,
      updatedAt: new Date()
    };
    pins.push(pin);
  }
  
  const insertedPins = await db.insert(travelPins).values(pins).returning();
  console.log(`✅ Created ${insertedPins.length} travel pins`);
  return insertedPins;
}

async function seedHomeContent() {
  console.log('🏠 Seeding home page content...');
  
  const homeContent = {
    heroTitle: 'Miles Along - Journey Across India',
    heroSubtitle: 'Discovering the incredible diversity and beauty of India, one mile at a time',
    heroDescription: 'Follow my epic journey across the subcontinent as I explore hidden gems, meet amazing people, and capture unforgettable moments.',
    aboutTitle: 'About This Journey',
    aboutContent: 'This travel blog documents my ongoing adventure across India, sharing stories, photographs, and insights from the road. From the snow-capped peaks of Kashmir to the tropical beaches of Kerala, every mile tells a story.',
    featuredDestination: 'Currently exploring the cultural heart of Karnataka',
    socialLinks: {
      instagram: 'https://instagram.com/milesalong',
      youtube: 'https://youtube.com/@milesalong',
      twitter: 'https://twitter.com/milesalong'
    },
    updatedAt: new Date()
  };
  
  const [insertedContent] = await db.insert(homePageContent).values(homeContent).returning();
  console.log('✅ Created home page content');
  return insertedContent;
}

async function main() {
  try {
    console.log('🚀 Starting comprehensive database seeding...');
    
    // Seed in order due to foreign key dependencies
    const collections = await seedGalleryCollections();
    await seedGalleryMedia(collections);
    await seedDestinations(collections);
    await seedTravelPins();
    await seedHomeContent();
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${collections.length} gallery collections`);
    console.log(`   - Gallery media items`);
    console.log(`   - 15 destinations`);
    console.log(`   - 25 travel pins`);
    console.log(`   - Home page content`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

main();