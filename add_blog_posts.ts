import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { blogPosts } from './shared/schema.js';

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

const db = drizzle({ client: pool, schema: { blogPosts } });

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Helper function to estimate reading time (average 200 words per minute)
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Blog posts data from add_100_travel_pins66.ts
const blogPostsData = [
  {
    title: "Onam in Kochi – A Celebration of Colors and Togetherness",
    slug: "celebrating-onam-kochi",
    excerpt: "Kochi during Onam is not just a festival—it's a heartbeat of culture, colors, and community.",
    content: "The air in Kochi changes when Onam arrives. Streets bloom with *pookalams*, each flower placed with love, like whispers of tradition on the ground. The laughter of children mixes with the rhythm of drums, while the aroma of *sadya*—banana leaves carrying a feast of flavors—floats through every lane. At night, Kathakali faces glow under the light, stories told with painted eyes and graceful hands. Onam here is not an event—it's a feeling, a reminder that abundance is best when shared.",
    featuredImage: "onam-kochi.jpg",
    category: "Culture",
    tags: ["Onam", "Kerala Festivals", "Kochi"],
    readingTime: 3,
    isFeatured: true,
    isVisible: true,
    socialMediaHashtags: ["#Kochi", "#Onam", "#KeralaVibes", "#TravelIndia"]
  },
  {
    title: "Evenings in Kochi – Walking Through Living Culture",
    slug: "kochi-evenings-walk-culture",
    excerpt: "As the sun slips into the Arabian Sea, Kochi turns into a living painting of culture and street life.",
    content: "Dusk in Kochi has its own magic. I walked through Fort Kochi where the walls, worn yet proud, tell stories of traders and travelers. Cafés spill golden light onto cobblestone paths, the smell of spices trails behind me, and somewhere a street musician plays softly. Art galleries invite you in, Kathakali performers prepare their faces with colors bold as sunsets, and markets hum with life. Evening here is not just a time of day—it is a mood, a slow unfolding of everything Kochi is proud to be.",
    featuredImage: "kochi-evenings.jpg",
    category: "Culture",
    tags: ["Kochi Walks", "Kerala Travel", "Fort Kochi"],
    readingTime: 3,
    isFeatured: false,
    isVisible: true,
    socialMediaHashtags: ["#Kochi", "#CultureWalk", "#FortKochi", "#KeralaTravel"]
  },
  {
    title: "Kochi's Timeless Charm – A Traveler's Map of Wonders",
    slug: "top-tourist-spots-kochi",
    excerpt: "Kochi is not just a city—it's a collection of moments stitched from history, faith, and nature.",
    content: "I found myself under the giant silhouettes of the Chinese Fishing Nets, creaking gently with the tide. In Mattancherry, the palace murals spoke in colors older than centuries, while the narrow lanes of Jew Town carried the scent of old wood and spices. St. Francis Church stood in quiet dignity, a silent witness to time. Later, as I walked along Marine Drive, the water mirrored the sky in shades of fire and blue. Kochi is not just a destination—it's a tapestry where every step, every corner, leaves you with a story to carry home.",
    featuredImage: "kochi-tourist-spots.jpg",
    category: "Travel",
    tags: ["Kochi Attractions", "Kerala Tourism", "India Travel"],
    readingTime: 4,
    isFeatured: false,
    isVisible: true,
    socialMediaHashtags: ["#Kochi", "#TravelIndia", "#KeralaBackwaters", "#ExploreKochi"]
  }
];

async function addBlogPosts() {
  try {
    console.log('🚀 Starting to add blog posts to database...');
    
    for (const post of blogPostsData) {
      try {
        // Use provided slug or generate one if not provided
        const slug = post.slug || generateSlug(post.title);
        
        // Use provided reading time or calculate one if not provided
        const readingTime = post.readingTime || estimateReadingTime(post.content);
        
        const blogData = {
          title: post.title,
          slug: slug,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featuredImage,
          category: post.category,
          tags: post.tags,
          readingTime: readingTime,
          isFeatured: post.isFeatured || false,
          isVisible: post.isVisible !== false, // Default to true
          instagramPostUrl: post.instagramPostUrl || null,
          twitterPostUrl: post.twitterPostUrl || null,
          facebookPostUrl: post.facebookPostUrl || null,
          youtubeVideoUrl: post.youtubeVideoUrl || null,
          socialMediaHashtags: post.socialMediaHashtags || [],
          publishedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const [result] = await db.insert(blogPosts).values(blogData).returning();
        
        console.log(`✅ Added blog post: ${post.title} (ID: ${result?.id})`);
      } catch (error: any) {
        if (error.message && error.message.includes('duplicate key')) {
          console.log(`⚠️  Skipped duplicate: ${post.title}`);
        } else {
          console.error(`❌ Error adding ${post.title}:`, error);
        }
      }
    }
    
    console.log('🎉 All blog posts added successfully!');
  } catch (error) {
    console.error('❌ Error in addBlogPosts:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

// Run the script
addBlogPosts();