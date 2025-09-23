import { Client } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Use the actual Neon database connection string from .env
const NEON_DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_FwdsBOvz87qt@ep-gentle-leaf-a1k0r5w1-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function addBlogPost() {
  const client = new Client({ 
    connectionString: NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("Connected to Neon database");

    const blogPost = {
      id: 4,
      title: "Munroe Island: Kerala's Hidden Water Heritage & Living Backwater Village",
      slug: "munroe-island-water-heritage-guide",
      excerpt: "Discover Munroe Island—a maze of eight islands, lush canals, heritage villages, and the most authentic way to explore Kerala's backwater lifestyle.",
      content: `Munroe Island is Kerala's secret backwater wonder, a cluster of eight lush islets where village life flows with the canals. Hidden at the meeting of Ashtamudi Lake and the Kallada River, it offers kayaking and canoe rides through tiny waterways, with birds, coconut palms, and glimpses of daily island routines.
Visitors can meet local families who spin coir rope by hand, taste fresh river fish, or paddle to old churches and rustic jetties—true snapshots of Kerala's water heritage. Life here slows to the rhythm of boats and sunrise, making it the perfect spot for anyone wanting authentic, peaceful travel.
Skip the big houseboats: Munroe Island's small eco-friendly homestays, handcrafted canoes, and close community make every visit meaningful. It's backwater culture just as Kerala's meant it to be.`,
      featured_image: "munroe-island-backwater.jpg",
      category: "Heritage, Travel Guide",
      tags: "Munroe Island, Kerala, Backwaters, Village, Heritage, Canoe, Kayak, Eco-Tourism",
      reading_time: 4,
      is_featured: false,
      is_visible: true,
      instagram_post_url: "",
      twitter_post_url: "",
      facebook_post_url: "",
      youtube_video_url: "",
      social_media_hashtags: "#MunroeIsland #KeralaBackwaters #WaterHeritage #IslandLife",
      published_at: new Date("2025-09-20"),
      created_at: new Date("2025-09-20"),
      updated_at: new Date("2025-09-20")
    };

    console.log("Inserting blog post to Neon database...");
    
    const query = `
      INSERT INTO blog_posts (
        id, title, slug, excerpt, content, featured_image, category, tags, 
        reading_time, is_featured, is_visible, instagram_post_url, twitter_post_url, 
        facebook_post_url, youtube_video_url, social_media_hashtags, 
        published_at, created_at, updated_at
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING *
    `;
    
    // Convert tags string to JSON array format
    const tagsArray = blogPost.tags.split(',').map(tag => tag.trim());
    
    // Convert hashtags to JSON array format
    const hashtagsArray = blogPost.social_media_hashtags.split(' ').filter(tag => tag.trim() !== '');
    
    const values = [
      blogPost.id, blogPost.title, blogPost.slug, blogPost.excerpt, blogPost.content,
      blogPost.featured_image, blogPost.category, JSON.stringify(tagsArray), blogPost.reading_time,
      blogPost.is_featured, blogPost.is_visible, blogPost.instagram_post_url,
      blogPost.twitter_post_url, blogPost.facebook_post_url, blogPost.youtube_video_url,
      JSON.stringify(hashtagsArray), blogPost.published_at, blogPost.created_at, blogPost.updated_at
    ];
    
    const result = await client.query(query, values);
    console.log("Blog post inserted successfully:", result.rows[0]);
  } catch (error) {
    console.error("Error inserting blog post:", error);
  } finally {
    await client.end();
    console.log("Disconnected from Neon database");
    process.exit(0);
  }
}

addBlogPost();