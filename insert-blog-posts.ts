import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { blogPosts } from './shared/schema.js';
import { readFileSync } from 'fs';
import { eq } from 'drizzle-orm';

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

// Helper function to parse CSV data with multi-line support
function parseCSVData(content) {
  const lines = content.split('\n');
  const result = [];
  let currentRecord = [];
  let currentField = '';
  let inQuotes = false;
  let recordStarted = false;
  
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Handle escaped quotes
          currentField += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
          recordStarted = true;
        }
      } else if (char === ',' && !inQuotes) {
        currentRecord.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }
    
    // Add newline if we're inside quotes (multi-line field)
    if (inQuotes) {
      currentField += '\n';
    } else if (recordStarted) {
      // End of record
      currentRecord.push(currentField.trim());
      if (currentRecord.length > 0 && currentRecord.some(field => field.length > 0)) {
        result.push(currentRecord);
      }
      currentRecord = [];
      currentField = '';
      recordStarted = false;
    }
  }
  
  // Handle last record if exists
  if (recordStarted && currentRecord.length > 0) {
    currentRecord.push(currentField.trim());
    result.push(currentRecord);
  }
  
  return result;
}

// Helper function to parse array fields
function parseArrayField(value) {
  if (!value || value === '""' || value === '') return [];
  
  // Remove quotes and split by semicolon or comma
  const cleaned = value.replace(/^"|"$/g, '');
  if (!cleaned) return [];
  
  return cleaned.split(/[;,]/).map(item => item.trim()).filter(item => item.length > 0);
}

// Helper function to parse hashtags
function parseHashtags(value) {
  if (!value || value === '""' || value === '') return [];
  
  const cleaned = value.replace(/^"|"$/g, '');
  if (!cleaned) return [];
  
  // Split by space and filter hashtags
  return cleaned.split(/\s+/).filter(item => item.startsWith('#')).map(tag => tag.substring(1));
}

// Helper function to clean text fields
function cleanText(value) {
  if (!value || value === '""') return '';
  return value.replace(/^"|"$/g, '').trim();
}

// Helper function to parse integer
function parseInteger(value) {
  const cleaned = cleanText(value);
  const parsed = parseInt(cleaned);
  return isNaN(parsed) ? 5 : parsed; // Default to 5 minutes reading time
}

// Helper function to parse boolean
function parseBoolean(value) {
  const cleaned = cleanText(value).toLowerCase();
  return cleaned === 'true' || cleaned === '1' || cleaned === 'yes';
}

async function insertBlogPosts() {
  try {
    console.log('Reading blog posts data from add_100_travel_pins66.ts...');
    
    // Read the file
    const fileContent = readFileSync('./add_100_travel_pins66.ts', 'utf-8');
    const records = parseCSVData(fileContent);
    
    // Skip header record
    const dataRecords = records.slice(1);
    
    console.log(`Found ${dataRecords.length} blog posts to process...`);
    
    let insertedCount = 0;
    let updatedCount = 0;
    
    for (const fields of dataRecords) {
      if (!fields || fields.length === 0) continue;
      
      try {
        
        // Map CSV fields to database schema
        const blogPostData = {
          title: cleanText(fields[1]) || 'Untitled Post',
          slug: cleanText(fields[2]) || `post-${Date.now()}`,
          excerpt: cleanText(fields[3]) || '',
          content: cleanText(fields[4]) || '',
          featuredImage: cleanText(fields[5]) || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
          category: cleanText(fields[6]) || 'adventure',
          tags: parseArrayField(fields[7]),
          readingTime: parseInteger(fields[8]),
          isFeatured: parseBoolean(fields[9]),
          isVisible: parseBoolean(fields[10]),
          instagramPostUrl: cleanText(fields[11]) || null,
          twitterPostUrl: cleanText(fields[12]) || null,
          facebookPostUrl: cleanText(fields[13]) || null,
          youtubeVideoUrl: cleanText(fields[14]) || null,
          socialMediaHashtags: parseHashtags(fields[15]),
          publishedAt: new Date(cleanText(fields[16]) || Date.now()),
        };
        
        // Check if blog post already exists
        const existingPost = await db.select().from(blogPosts).where(eq(blogPosts.slug, blogPostData.slug)).limit(1);
        
        if (existingPost.length > 0) {
          // Update existing post
          await db.update(blogPosts)
            .set({
              ...blogPostData,
              updatedAt: new Date()
            })
            .where(eq(blogPosts.slug, blogPostData.slug));
          
          updatedCount++;
          console.log(`Updated blog post: ${blogPostData.title}`);
        } else {
          // Insert new post
          await db.insert(blogPosts).values(blogPostData);
          insertedCount++;
          console.log(`Inserted blog post: ${blogPostData.title}`);
        }
        
      } catch (error) {
        console.error(`Error processing blog post: ${error.message}`);
        console.error(`Record: ${JSON.stringify(fields.slice(0, 3))}...`);
      }
    }
    
    // Get total count
    const totalPosts = await db.select().from(blogPosts);
    
    console.log('\n=== Blog Posts Import Summary ===');
    console.log(`Inserted: ${insertedCount} new blog posts`);
    console.log(`Updated: ${updatedCount} existing blog posts`);
    console.log(`Total blog posts in database: ${totalPosts.length}`);
    
  } catch (error) {
    console.error('Error inserting blog posts:', error);
  } finally {
    await pool.end();
  }
}

// Run the import
insertBlogPosts();