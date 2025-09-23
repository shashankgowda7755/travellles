import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { blogPosts } from './shared/schema.js';

// Load environment variables
config();

// Initialize database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = drizzle({ client: pool, schema: { blogPosts } });

async function clearBlogPosts() {
  try {
    console.log('Checking current blog posts...');
    
    const currentPosts = await db.select().from(blogPosts);
    console.log(`Found ${currentPosts.length} blog posts in database`);
    
    if (currentPosts.length > 0) {
      console.log('Clearing all blog posts...');
      await db.delete(blogPosts);
      console.log('All blog posts cleared successfully');
    } else {
      console.log('No blog posts to clear');
    }
    
  } catch (error) {
    console.error('Error clearing blog posts:', error);
  } finally {
    await pool.end();
  }
}

// Run the clear operation
clearBlogPosts();