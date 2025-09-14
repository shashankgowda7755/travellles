import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Database connection
const sql = neon(process.env.DATABASE_URL);

// Function to parse coordinates string to lat/lng object
function parseCoordinates(coordString) {
  // Format: "9.9312° N, 76.2673° E"
  const parts = coordString.split(', ');
  const latPart = parts[0].replace('°', '').trim();
  const lngPart = parts[1].replace('°', '').trim();
  
  const lat = parseFloat(latPart.split(' ')[0]);
  const lng = parseFloat(lngPart.split(' ')[0]);
  
  return { lat, lng };
}

// Function to parse comma-separated string to array
function parseStringArray(str) {
  if (!str || str.trim() === '') return [];
  return str.split(',').map(item => item.trim());
}

// Function to parse hashtags string to array
function parseHashtags(hashtagString) {
  if (!hashtagString || hashtagString.trim() === '') return [];
  return hashtagString.split(' ').filter(tag => tag.startsWith('#')).map(tag => tag.trim());
}

async function insertDestinations() {
  try {
    console.log('Starting destination insertion...');
    
    // Read the CSV file
    const csvContent = fs.readFileSync('add_100_travel_pins66.ts', 'utf8');
    const lines = csvContent.split('\n');
    
    // Skip header line
    const dataLines = lines.slice(1).filter(line => line.trim() !== '');
    
    console.log(`Found ${dataLines.length} destinations to insert`);
    
    for (const line of dataLines) {
      // Parse CSV line (handling quoted fields with commas)
      const fields = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          fields.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      fields.push(current.trim()); // Add the last field
      
      // Clean up quoted fields
      const cleanFields = fields.map(field => {
        if (field.startsWith('"') && field.endsWith('"')) {
          return field.slice(1, -1);
        }
        return field;
      });
      
      if (cleanFields.length < 29) {
        console.log(`Skipping incomplete line: ${line.substring(0, 50)}...`);
        continue;
      }
      
      const [
        id, name, slug, description, detailedDescription, category, region, state,
        coordinates, featuredImage, bestTimeToVisit, recommendedStay, budgetRange,
        highlights, activities, rating, difficulty, relatedGalleryId, relatedBlogPosts,
        isCurrentLocation, isFeatured, isVisible, instagramPostUrl, twitterPostUrl,
        facebookPostUrl, youtubeVideoUrl, socialMediaHashtags, createdAt, updatedAt
      ] = cleanFields;
      
      try {
        // Parse and transform data
        const parsedCoordinates = parseCoordinates(coordinates);
        const highlightsArray = parseStringArray(highlights);
        const activitiesArray = parseStringArray(activities);
        const hashtagsArray = parseHashtags(socialMediaHashtags);
        const relatedBlogPostsArray = relatedBlogPosts ? parseStringArray(relatedBlogPosts) : [];
        
        // Insert destination
        await sql`
          INSERT INTO destinations (
            name, slug, description, detailed_description, category, region, state,
            coordinates, featured_image, best_time_to_visit, recommended_stay, budget_range,
            highlights, activities, rating, difficulty, related_gallery_id, related_blog_posts,
            is_current_location, is_featured, is_visible, instagram_post_url, twitter_post_url,
            facebook_post_url, youtube_video_url, social_media_hashtags
          ) VALUES (
            ${name},
            ${slug},
            ${description},
            ${detailedDescription},
            ${category},
            ${region},
            ${state},
            ${JSON.stringify(parsedCoordinates)},
            ${featuredImage},
            ${bestTimeToVisit},
            ${recommendedStay},
            ${budgetRange},
            ${JSON.stringify(highlightsArray)},
            ${JSON.stringify(activitiesArray)},
            ${parseInt(rating) || 5},
            ${difficulty},
            ${null},
            ${JSON.stringify(relatedBlogPostsArray)},
            ${isCurrentLocation === 'true'},
            ${isFeatured === 'true'},
            ${isVisible === 'true'},
            ${instagramPostUrl || null},
            ${twitterPostUrl || null},
            ${facebookPostUrl || null},
            ${youtubeVideoUrl || null},
            ${JSON.stringify(hashtagsArray)}
          )
          ON CONFLICT (slug) DO UPDATE SET
            name = EXCLUDED.name,
            description = EXCLUDED.description,
            detailed_description = EXCLUDED.detailed_description,
            category = EXCLUDED.category,
            region = EXCLUDED.region,
            state = EXCLUDED.state,
            coordinates = EXCLUDED.coordinates,
            featured_image = EXCLUDED.featured_image,
            best_time_to_visit = EXCLUDED.best_time_to_visit,
            recommended_stay = EXCLUDED.recommended_stay,
            budget_range = EXCLUDED.budget_range,
            highlights = EXCLUDED.highlights,
            activities = EXCLUDED.activities,
            rating = EXCLUDED.rating,
            difficulty = EXCLUDED.difficulty,
            related_gallery_id = EXCLUDED.related_gallery_id,
            related_blog_posts = EXCLUDED.related_blog_posts,
            is_current_location = EXCLUDED.is_current_location,
            is_featured = EXCLUDED.is_featured,
            is_visible = EXCLUDED.is_visible,
            instagram_post_url = EXCLUDED.instagram_post_url,
            twitter_post_url = EXCLUDED.twitter_post_url,
            facebook_post_url = EXCLUDED.facebook_post_url,
            youtube_video_url = EXCLUDED.youtube_video_url,
            social_media_hashtags = EXCLUDED.social_media_hashtags,
            updated_at = NOW()
        `;
        
        console.log(`✅ Inserted/Updated destination: ${name}`);
        
      } catch (error) {
        console.error(`❌ Error inserting destination ${name}:`, error.message);
        console.error('Data:', { name, slug, coordinates, highlights, activities });
      }
    }
    
    console.log('\n🎉 Destination insertion completed!');
    
    // Verify insertion
    const result = await sql`SELECT COUNT(*) as count FROM destinations`;
    console.log(`Total destinations in database: ${result[0].count}`);
    
  } catch (error) {
    console.error('❌ Error during destination insertion:', error);
  }
}

// Run the insertion
insertDestinations();