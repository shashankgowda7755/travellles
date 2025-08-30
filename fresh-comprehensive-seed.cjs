const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const {
  blogPosts,
  destinations,
  galleryCollections,
  galleryMedia,
  travelPins,
  homePageContent,
  journeyTracking
} = require('./shared/schema.ts');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const db = drizzle(pool);

// Sample data arrays
const indianCities = [
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lng: 72.8311 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
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
  { name: 'Srinagar', state: 'Jammu and Kashmir', lat: 34.0837, lng: 74.7973 },
  { name: 'Kanyakumari', state: 'Tamil Nadu', lat: 8.0883, lng: 77.5385 },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lng: 74.1240 },
  { name: 'Rishikesh', state: 'Uttarakhand', lat: 30.0869, lng: 78.2676 },
  { name: 'Manali', state: 'Himachal Pradesh', lat: 32.2432, lng: 77.1892 }
];

const categories = ['Trek Place', 'Tourist Spot', 'Beach', 'Historical', 'Cultural', 'Adventure'];
const regions = ['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'];
const difficulties = ['Easy', 'Moderate', 'Challenging'];
const pinTypes = ['visited', 'planned', 'favorite'];
const pinColors = ['#E07A3E', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];
const blogCategories = ['adventure', 'culture', 'food', 'people', 'places'];

const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  'https://images.unsplash.com/photo-1599661046827-dacde6976549?w=800',
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
  'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
  'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800'
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

// Clear existing data
async function clearDatabase() {
  console.log('🗑️ Clearing existing database data...');
  
  try {
    await db.delete(galleryMedia);
    await db.delete(galleryCollections);
    await db.delete(blogPosts);
    await db.delete(destinations);
    await db.delete(travelPins);
    await db.delete(homePageContent);
    await db.delete(journeyTracking);
    console.log('✅ Database cleared successfully');
  } catch (error) {
    console.log('⚠️ Some tables may not exist yet, continuing...');
  }
}

// Seed gallery collections (15 collections)
async function seedGalleryCollections() {
  console.log('🖼️ Seeding gallery collections...');
  
  const collections = [];
  
  // Add specific Jaipur collection first
  const jaipurCollection = {
    title: 'Jaipur Maha Photo Collection',
    description: 'Stunning photographs from the Pink City of Jaipur, showcasing its royal heritage and vibrant culture',
    coverImage: 'https://images.unsplash.com/photo-1599661046827-dacde6976549?w=800',
    location: 'Jaipur, Rajasthan',
    isVisible: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  };
  collections.push(jaipurCollection);
  
  // Add 14 more random collections
  for (let i = 0; i < 14; i++) {
    const city = getRandomElement(indianCities.filter(c => c.name !== 'Jaipur'));
    const collection = {
      title: `${city.name} Photo Collection`,
      description: `Beautiful photographs from ${city.name}, ${city.state}. Capturing the essence of this incredible destination through stunning visuals.`,
      coverImage: getRandomElement(sampleImages),
      location: `${city.name}, ${city.state}`,
      isVisible: Math.random() > 0.1,
      createdAt: getRandomDate(),
      updatedAt: new Date()
    };
    collections.push(collection);
  }
  
  const insertedCollections = await db.insert(galleryCollections).values(collections).returning();
  console.log(`✅ Created ${insertedCollections.length} gallery collections`);
  return insertedCollections;
}

// Seed gallery media
async function seedGalleryMedia(collections) {
  console.log('📸 Seeding gallery media...');
  
  const media = [];
  for (const collection of collections) {
    // Special handling for Jaipur collection
    if (collection.title === 'Jaipur Maha Photo Collection') {
      const jaipurImages = [
        {
          collectionId: collection.id,
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1599661046827-dacde6976549?w=800',
          caption: 'Majestic Hawa Mahal - Palace of Winds in Jaipur',
          sortOrder: 0,
          createdAt: new Date('2024-01-15')
        },
        {
          collectionId: collection.id,
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
          caption: 'Beautiful architecture of City Palace, Jaipur',
          sortOrder: 1,
          createdAt: new Date('2024-01-15')
        },
        {
          collectionId: collection.id,
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
          caption: 'Stunning view of Amber Fort overlooking Jaipur',
          sortOrder: 2,
          createdAt: new Date('2024-01-15')
        },
        {
          collectionId: collection.id,
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          caption: 'Vibrant streets and markets of Pink City Jaipur',
          sortOrder: 3,
          createdAt: new Date('2024-01-15')
        }
      ];
      media.push(...jaipurImages);
    } else {
      // Regular random media for other collections (5-8 images each)
      const mediaCount = Math.floor(Math.random() * 4) + 5;
      for (let i = 0; i < mediaCount; i++) {
        const mediaItem = {
          collectionId: collection.id,
          type: 'photo',
          url: getRandomElement(sampleImages),
          caption: `Beautiful view from ${collection.title} - Image ${i + 1}`,
          sortOrder: i,
          createdAt: getRandomDate()
        };
        media.push(mediaItem);
      }
    }
  }
  
  const insertedMedia = await db.insert(galleryMedia).values(media).returning();
  console.log(`✅ Created ${insertedMedia.length} gallery media items`);
  return insertedMedia;
}

// Seed destinations (15 destinations)
async function seedDestinations(collections) {
  console.log('🏔️ Seeding destinations...');
  
  const destinations_data = [];
  for (let i = 0; i < 15; i++) {
    const city = getRandomElement(indianCities);
    const category = getRandomElement(categories);
    const region = getRandomElement(regions);
    const difficulty = getRandomElement(difficulties);
    const relatedGallery = Math.random() > 0.3 ? getRandomElement(collections) : null;
    
    const destination = {
      name: `${city.name} ${category}`,
      slug: generateSlug(`${city.name}-${category}-${i}`),
      description: `Discover the amazing ${category.toLowerCase()} experience in ${city.name}, ${city.state}. A perfect destination for travelers seeking authentic experiences.`,
      detailedDescription: `${city.name} offers an incredible ${category.toLowerCase()} experience that combines natural beauty, cultural richness, and adventure. Located in ${city.state}, this destination provides visitors with unforgettable memories and authentic local experiences. Whether you're seeking adventure, relaxation, or cultural immersion, ${city.name} has something special to offer every traveler.`,
      category,
      region,
      state: city.state,
      coordinates: { lat: city.lat, lng: city.lng },
      featuredImage: getRandomElement(sampleImages),
      bestTimeToVisit: getRandomElement(['October to March', 'April to June', 'July to September', 'November to February']),
      recommendedStay: getRandomElement(['2-3 days', '3-5 days', '5-7 days', '1 week']),
      budgetRange: getRandomElement(['₹1000-2000/day', '₹2000-4000/day', '₹3000-6000/day', '₹500-1500/day']),
      highlights: getRandomElements(['Scenic Views', 'Local Culture', 'Adventure Activities', 'Historical Sites', 'Local Cuisine', 'Photography', 'Trekking', 'Wildlife'], 3),
      activities: getRandomElements(['Sightseeing', 'Photography', 'Trekking', 'Local Food Tasting', 'Cultural Tours', 'Adventure Sports', 'Shopping', 'Relaxation'], 4),
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
      difficulty,
      relatedGalleryId: relatedGallery?.id || null,
      relatedBlogPosts: [],
      isCurrentLocation: i === 0, // First destination is current
      isFeatured: Math.random() > 0.7,
      isVisible: true,
      createdAt: getRandomDate(),
      updatedAt: new Date()
    };
    destinations_data.push(destination);
  }
  
  const insertedDestinations = await db.insert(destinations).values(destinations_data).returning();
  console.log(`✅ Created ${insertedDestinations.length} destinations`);
  return insertedDestinations;
}

// Seed travel pins (15 pins)
async function seedTravelPins() {
  console.log('📍 Seeding travel pins...');
  
  const pins = [];
  for (let i = 0; i < 15; i++) {
    const city = getRandomElement(indianCities);
    const pinType = getRandomElement(pinTypes);
    const pinColor = getRandomElement(pinColors);
    
    const pin = {
      name: `${city.name} Pin`,
      description: `Travel pin for ${city.name}, ${city.state}. ${pinType === 'visited' ? 'Already explored this amazing place!' : pinType === 'planned' ? 'Planning to visit this destination soon.' : 'One of my favorite places to recommend!'}`,
      coordinates: { lat: city.lat, lng: city.lng },
      country: 'India',
      city: city.name,
      visitedDate: pinType === 'visited' ? getRandomDate() : null,
      pinType,
      pinColor,
      images: [getRandomElement(sampleImages)],
      tags: getRandomElements(['adventure', 'culture', 'food', 'nature', 'history', 'photography'], 2),
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
      notes: `Great experience in ${city.name}. The local culture and food were amazing!`,
      isVisible: true,
      createdAt: getRandomDate(),
      updatedAt: new Date()
    };
    pins.push(pin);
  }
  
  const insertedPins = await db.insert(travelPins).values(pins).returning();
  console.log(`✅ Created ${insertedPins.length} travel pins`);
  return insertedPins;
}

// Seed blog posts (15 posts)
async function seedBlogPosts(destinations_data) {
  console.log('📝 Seeding blog posts...');
  
  const posts = [];
  for (let i = 0; i < 15; i++) {
    const destination = getRandomElement(destinations_data);
    const category = getRandomElement(blogCategories);
    const title = `${getRandomElement(['Exploring', 'Discovering', 'Journey to', 'Adventures in', 'Hidden Gems of'])} ${destination.name}`;
    
    const post = {
      title,
      slug: generateSlug(`${title}-${i}`),
      excerpt: `Join me on an incredible journey to ${destination.name}. This ${category} adventure will take you through amazing experiences, local culture, and unforgettable moments.`,
      content: `# ${title}\n\n![${destination.name}](${destination.featuredImage})\n\n## Introduction\n\nWelcome to my latest adventure in ${destination.name}! This incredible destination in ${destination.state} offers so much more than meets the eye. From the moment I arrived, I knew this was going to be a special experience.\n\n## The Journey Begins\n\nTraveling to ${destination.name} was an adventure in itself. The ${destination.difficulty.toLowerCase()} journey took me through some of the most beautiful landscapes I've ever seen. The best time to visit is definitely ${destination.bestTimeToVisit}, and I can see why!\n\n## What Makes This Place Special\n\n${destination.description}\n\n### Highlights of My Visit\n\n${destination.highlights.map(h => `- **${h}**: An absolutely amazing experience that I'll never forget`).join('\n')}\n\n### Activities I Enjoyed\n\n${destination.activities.map(a => `- **${a}**: Highly recommended for all travelers`).join('\n')}\n\n## Local Culture and People\n\nThe people of ${destination.state} are incredibly welcoming and friendly. Their rich culture and traditions add so much depth to the travel experience. I spent time learning about local customs and trying authentic regional cuisine.\n\n## Photography and Memories\n\nEvery corner of ${destination.name} offers incredible photo opportunities. The ${category} theme of this trip allowed me to capture some truly stunning shots that tell the story of this amazing place.\n\n## Travel Tips\n\n- **Budget**: Plan for ${destination.budgetRange} for a comfortable stay\n- **Duration**: I recommend staying for ${destination.recommendedStay}\n- **Difficulty**: This is a ${destination.difficulty.toLowerCase()} destination, suitable for most travelers\n\n## Final Thoughts\n\n${destination.name} exceeded all my expectations. This ${category} adventure has given me memories that will last a lifetime. I can't wait to return and explore more of what this incredible region has to offer.\n\nHave you been to ${destination.name}? Share your experiences in the comments below!\n\n---\n\n*This post is part of my ongoing journey across India. Follow along for more authentic travel stories and destination guides.*`,
      featuredImage: destination.featuredImage,
      category,
      tags: getRandomElements(['travel', 'india', 'adventure', 'culture', 'photography', 'backpacking', 'solo-travel', 'budget-travel'], 4),
      readingTime: Math.floor(Math.random() * 5) + 3, // 3-7 minutes
      isFeatured: Math.random() > 0.8,
      isVisible: true,
      publishedAt: getRandomDate(),
      createdAt: getRandomDate(),
      updatedAt: new Date()
    };
    posts.push(post);
  }
  
  const insertedPosts = await db.insert(blogPosts).values(posts).returning();
  console.log(`✅ Created ${insertedPosts.length} blog posts`);
  return insertedPosts;
}

// Seed home page content
async function seedHomeContent() {
  console.log('🏠 Seeding home page content...');
  
  const homeContent = {
    heroTitle: "Raw Roads,\nReal Discovery",
    heroSubtitle: "Join Shashank's authentic 4-month journey across India, from Kashmir's valleys to Kanyakumari's shores, on just ₹500 per day",
    heroBackgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    exploreButtonText: "Explore Journey",
    diariesButtonText: "Read Diaries",
    dailyBudget: "₹500",
    mapSectionTitle: "Live Journey Tracker",
    mapSectionDescription: "Follow the real-time progress from the serene valleys of Kashmir to the southern tip of Kanyakumari. Each pin tells a story of discovery, challenge, and authentic Indian experiences.",
    storiesSectionTitle: "Latest Travel Stories",
    storiesSectionDescription: "Authentic stories from the road - the struggles, discoveries, and unexpected connections that make solo travel transformative.",
    guidesSectionTitle: "Travel Guides",
    guidesSectionDescription: "Comprehensive guides to the most incredible destinations on this journey. From planning to experiencing, get insider tips for authentic travel.",
    gallerySectionTitle: "Visual Journey",
    gallerySectionDescription: "Every photograph tells a story of discovery, challenge, and the incredible diversity of landscapes, cultures, and moments that define authentic India travel.",
    newsletterTitle: "Join the Journey",
    newsletterDescription: "Get weekly updates about new destinations, travel stories, and behind-the-scenes insights from the road. No spam, just authentic travel content.",
    newsletterSubscribersCount: 342,
    weeklyStoriesCount: 24,
    readRate: 95,
    journeyStartDate: "August 1, 2025",
    journeyStartLocation: "Srinagar, Kashmir",
    journeyStartDescription: "Dal Lake houseboats and mountain serenity",
    finalDestination: "Kanyakumari, Tamil Nadu",
    finalDestinationDescription: "Land's end where three seas meet",
    updatedAt: new Date(),
    createdAt: new Date()
  };
  
  const insertedContent = await db.insert(homePageContent).values(homeContent).returning();
  console.log(`✅ Created home page content`);
  return insertedContent;
}

// Seed journey tracking
async function seedJourneyTracking() {
  console.log('🗺️ Seeding journey tracking...');
  
  const currentCity = getRandomElement(indianCities);
  const tracking = {
    currentLocation: `${currentCity.name}, ${currentCity.state}`,
    currentCoordinates: { lat: currentCity.lat, lng: currentCity.lng },
    journeyProgress: Math.floor(Math.random() * 60) + 20, // 20-80%
    daysTraveled: Math.floor(Math.random() * 90) + 30, // 30-120 days
    statesCovered: Math.floor(Math.random() * 15) + 8, // 8-23 states
    distanceCovered: Math.floor(Math.random() * 8000) + 2000, // 2000-10000 km
    lastUpdated: new Date()
  };
  
  const insertedTracking = await db.insert(journeyTracking).values(tracking).returning();
  console.log(`✅ Created journey tracking data`);
  return insertedTracking;
}

// Main seeding function
async function main() {
  try {
    console.log('🚀 Starting fresh comprehensive database seeding...');
    
    // Clear existing data
    await clearDatabase();
    
    // Seed all data
    const collections = await seedGalleryCollections();
    await seedGalleryMedia(collections);
    const destinations_data = await seedDestinations(collections);
    await seedTravelPins();
    await seedBlogPosts(destinations_data);
    await seedHomeContent();
    await seedJourneyTracking();
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${collections.length} Gallery Collections`);
    console.log(`   - ${destinations_data.length} Destinations`);
    console.log(`   - 15 Travel Pins`);
    console.log(`   - 15 Blog Posts`);
    console.log(`   - Home Page Content`);
    console.log(`   - Journey Tracking Data`);
    console.log('\n✅ All sections now have 10-15 dummy items plus the specific Jaipur collection!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };