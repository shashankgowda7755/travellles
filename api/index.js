// Vercel serverless API handler for travel blog
import express from 'express';
import session from 'express-session';
import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { eq, desc, and } from "drizzle-orm";
import connectPgSimple from 'connect-pg-simple';

// Database Schema - Exact match with shared/schema.ts
const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image").notNull(),
  category: text("category").notNull(),
  tags: jsonb("tags").$type().notNull().default([]),
  readingTime: integer("reading_time").notNull(),
  isFeatured: boolean("is_featured").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
  instagramPostUrl: text("instagram_post_url"),
  twitterPostUrl: text("twitter_post_url"),
  facebookPostUrl: text("facebook_post_url"),
  youtubeVideoUrl: text("youtube_video_url"),
  socialMediaHashtags: jsonb("social_media_hashtags").$type().notNull().default([]),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description").notNull(),
  category: text("category").notNull(),
  region: text("region").notNull(),
  state: text("state").notNull(),
  coordinates: jsonb("coordinates").$type().notNull(),
  featuredImage: text("featured_image").notNull(),
  bestTimeToVisit: text("best_time_to_visit").notNull(),
  recommendedStay: text("recommended_stay").notNull(),
  budgetRange: text("budget_range").notNull(),
  highlights: jsonb("highlights").$type().notNull().default([]),
  activities: jsonb("activities").$type().notNull().default([]),
  rating: integer("rating").notNull().default(5),
  difficulty: text("difficulty").notNull(),
  relatedGalleryId: varchar("related_gallery_id"),
  relatedBlogPosts: jsonb("related_blog_posts").$type().notNull().default([]),
  isCurrentLocation: boolean("is_current_location").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
  instagramPostUrl: text("instagram_post_url"),
  twitterPostUrl: text("twitter_post_url"),
  facebookPostUrl: text("facebook_post_url"),
  youtubeVideoUrl: text("youtube_video_url"),
  socialMediaHashtags: jsonb("social_media_hashtags").$type().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const galleryCollections = pgTable("gallery_collections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  mediaCount: integer("media_count").notNull().default(0),
  location: text("location"),
  youtubeUrl: text("youtube_url"),
  isVisible: boolean("is_visible").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const galleryMedia = pgTable("gallery_media", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  collectionId: varchar("collection_id").notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  title: text("title"),
  caption: text("caption"),
  embedCode: text("embed_code"),
  linkUrl: text("link_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

const travelPins = pgTable("travel_pins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  coordinates: jsonb("coordinates").$type().notNull(),
  country: text("country").notNull(),
  city: text("city"),
  visitedDate: timestamp("visited_date"),
  pinType: text("pin_type").notNull().default('visited'),
  pinColor: text("pin_color").notNull().default('#E07A3E'),
  images: text("images").array().default([]),
  tags: text("tags").array().default([]),
  rating: integer("rating").default(0),
  notes: text("notes"),
  isVisible: boolean("is_visible").notNull().default(true),
  instagramPostUrl: text("instagram_post_url"),
  twitterPostUrl: text("twitter_post_url"),
  facebookPostUrl: text("facebook_post_url"),
  youtubeVideoUrl: text("youtube_video_url"),
  socialMediaHashtags: jsonb("social_media_hashtags").$type().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const journeyTracking = pgTable("journey_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  currentLocation: text("current_location").notNull(),
  currentCoordinates: jsonb("current_coordinates").$type().notNull(),
  journeyProgress: integer("journey_progress").notNull().default(0),
  daysTraveled: integer("days_traveled").notNull().default(0),
  statesCovered: integer("states_covered").notNull().default(0),
  distanceCovered: integer("distance_covered").notNull().default(0),
  instagramStoryUrl: text("instagram_story_url"),
  instagramReelUrl: text("instagram_reel_url"),
  twitterUpdateUrl: text("twitter_update_url"),
  youtubeShortUrl: text("youtube_short_url"),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
});

const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

const homePageContent = pgTable("home_page_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroTitle: text("hero_title").notNull().default("Raw Roads,\nReal Discovery"),
  heroSubtitle: text("hero_subtitle").notNull().default("Join Shashank's authentic 4-month journey across India, from Kashmir's valleys to Kanyakumari's shores, on just ₹500 per day"),
  heroBackgroundImage: text("hero_background_image").notNull().default("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"),
  exploreButtonText: text("explore_button_text").notNull().default("Explore Journey"),
  diariesButtonText: text("diaries_button_text").notNull().default("Read Diaries"),
  dailyBudget: text("daily_budget").notNull().default("₹500"),
  mapSectionTitle: text("map_section_title").notNull().default("Live Journey Tracker"),
  mapSectionDescription: text("map_section_description").notNull().default("Follow the real-time progress from the serene valleys of Kashmir to the southern tip of Kanyakumari. Each pin tells a story of discovery, challenge, and authentic Indian experiences."),
  storiesSectionTitle: text("stories_section_title").notNull().default("Latest Travel Stories"),
  storiesSectionDescription: text("stories_section_description").notNull().default("Authentic stories from the road - the struggles, discoveries, and unexpected connections that make solo travel transformative."),
  guidesSectionTitle: text("guides_section_title").notNull().default("Travel Guides"),
  guidesSectionDescription: text("guides_section_description").notNull().default("Comprehensive guides to the most incredible destinations on this journey. From planning to experiencing, get insider tips for authentic travel."),
  gallerySectionTitle: text("gallery_section_title").notNull().default("Visual Journey"),
  gallerySectionDescription: text("gallery_section_description").notNull().default("Every photograph tells a story of discovery, challenge, and the incredible diversity of landscapes, cultures, and moments that define authentic India travel."),
  newsletterTitle: text("newsletter_title").notNull().default("Join the Journey"),
  newsletterDescription: text("newsletter_description").notNull().default("Get weekly updates about new destinations, travel stories, and behind-the-scenes insights from the road. No spam, just authentic travel content."),
  newsletterSubscribersCount: integer("newsletter_subscribers_count").notNull().default(342),
  weeklyStoriesCount: integer("weekly_stories_count").notNull().default(24),
  readRate: integer("read_rate").notNull().default(95),
  journeyStartDate: text("journey_start_date").notNull().default("August 1, 2025"),
  journeyStartLocation: text("journey_start_location").notNull().default("Srinagar, Kashmir"),
  journeyStartDescription: text("journey_start_description").notNull().default("Dal Lake houseboats and mountain serenity"),
  finalDestination: text("final_destination").notNull().default("Kanyakumari, Tamil Nadu"),
  finalDestinationDescription: text("final_destination_description").notNull().default("Land's end where three seas meet"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Initialize database connection
let db;
let dbPool;
const initializeDatabase = async () => {
  if (!db) {
    // Create a single pool instance to be reused
    if (!dbPool) {
      dbPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 10, // Reduced pool size for serverless environment
        idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
        connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
      });
      
      // Add error handler for the pool
      dbPool.on('error', (err) => {
        console.error('Unexpected database pool error:', err);
      });
    }
    
    const schema = {
      users,
      blogPosts,
      destinations,
      galleryCollections,
      galleryMedia,
      travelPins,
      journeyTracking,
      newsletterSubscribers,
      contactMessages,
      homePageContent,
    };
    
    db = drizzle({ client: dbPool, schema });
  }
  return db;
};

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS headers for cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Create PostgreSQL session store for serverless environment
const PgSession = connectPgSimple(session);

// Session configuration for serverless with PostgreSQL store
app.use(session({
  store: new PgSession({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    tableName: 'sessions', // Must match the sessions table in schema.ts
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || 'dev-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Add error handling for session store
app.use((req, res, next) => {
  if (!req.session) {
    console.error('Session store error');
  }
  next();
});

// Authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Authentication required" });
  }
};

// API Routes
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await initializeDatabase();
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      database: "connected"
    });
  } catch (error) {
    res.status(500).json({ 
      status: "unhealthy", 
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error.message
    });
  }
});

// Blog Posts
app.get("/api/blog-posts", async (req, res) => {
  try {
    await initializeDatabase();
    const { category } = req.query;
    let query = db.select().from(blogPosts).where(eq(blogPosts.isVisible, true)).orderBy(desc(blogPosts.publishedAt));
    
    if (category) {
      query = db.select().from(blogPosts).where(and(eq(blogPosts.isVisible, true), eq(blogPosts.category, category))).orderBy(desc(blogPosts.publishedAt));
    }
    
    const posts = await query;
    res.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ message: "Failed to fetch blog posts" });
  }
});

app.get("/api/blog-posts/featured", async (req, res) => {
  try {
    await initializeDatabase();
    const posts = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.isVisible, true), eq(blogPosts.isFeatured, true)))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(3);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    res.status(500).json({ message: "Failed to fetch featured blog posts" });
  }
});

app.get("/api/blog-posts/:slug", async (req, res) => {
  try {
    await initializeDatabase();
    const [post] = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.slug, req.params.slug), eq(blogPosts.isVisible, true)));
    
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ message: "Failed to fetch blog post" });
  }
});

app.get("/api/blog-posts/by-id/:id", async (req, res) => {
  try {
    await initializeDatabase();
    const [post] = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.id, req.params.id), eq(blogPosts.isVisible, true)));
    
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching blog post by ID:", error);
    res.status(500).json({ message: "Failed to fetch blog post by ID" });
  }
});

app.post("/api/blog-posts", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    
    // Validate required fields
    const requiredFields = ['title', 'slug', 'excerpt', 'content', 'featuredImage', 'category', 'readingTime'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Add timestamps if not provided
    const postData = {
      ...req.body,
      createdAt: req.body.createdAt || new Date(),
      updatedAt: req.body.updatedAt || new Date(),
      publishedAt: req.body.publishedAt || new Date()
    };
    
    const [post] = await db.insert(blogPosts).values(postData).returning();
    
    if (!post) {
      throw new Error('Database returned empty result after insert');
    }
    
    console.log(`Blog post created successfully: ${post.id}`);
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      post
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    
    // Check for specific error types
    if (error.message.includes('duplicate key')) {
      return res.status(409).json({ 
        success: false, 
        message: "A post with this slug already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to create blog post", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

app.put("/api/blog-posts/:id", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const [post] = await db.update(blogPosts)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(blogPosts.id, req.params.id))
      .returning();
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ message: "Failed to update blog post" });
  }
});

app.delete("/api/blog-posts/:id", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    await db.delete(blogPosts).where(eq(blogPosts.id, req.params.id));
    res.json({ success: true, message: "Blog post deleted" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ message: "Failed to delete blog post" });
  }
});

// Destinations
app.get("/api/destinations", async (req, res) => {
  try {
    await initializeDatabase();
    const { category, region } = req.query;
    let query = db.select().from(destinations).where(eq(destinations.isVisible, true)).orderBy(destinations.name);
    
    if (category || region) {
      const conditions = [eq(destinations.isVisible, true)];
      if (category) conditions.push(eq(destinations.category, category));
      if (region) conditions.push(eq(destinations.region, region));
      query = db.select().from(destinations).where(and(...conditions)).orderBy(destinations.name);
    }
    
    const result = await query;
    
    // Process destinations to ensure coordinates are properly formatted
    const processedDestinations = result.map(destination => {
      // Ensure coordinates are properly formatted
      if (destination.coordinates && typeof destination.coordinates === 'string') {
        try {
          destination.coordinates = JSON.parse(destination.coordinates);
        } catch (e) {
          console.error(`Error parsing coordinates for destination ${destination.id}:`, e);
          // Set default coordinates if parsing fails
          destination.coordinates = { lat: 20.5937, lng: 78.9629 };
        }
      }
      
      // Ensure latitude and longitude are numbers
      if (destination.coordinates && typeof destination.coordinates === 'object') {
        destination.coordinates.lat = parseFloat(destination.coordinates.lat);
        destination.coordinates.lng = parseFloat(destination.coordinates.lng);
      }
      
      return destination;
    });
    
    console.log(`Retrieved ${processedDestinations.length} destinations successfully`);
    res.json(processedDestinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch destinations", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

app.get("/api/destinations/:slug", async (req, res) => {
  try {
    await initializeDatabase();
    const [destination] = await db.select().from(destinations)
      .where(and(eq(destinations.slug, req.params.slug), eq(destinations.isVisible, true)));
    
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
    res.status(500).json({ message: "Failed to fetch destination" });
  }
});

app.post("/api/destinations", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    
    // Validate required fields
    const requiredFields = ['name', 'slug', 'description', 'continent', 'country', 'featuredImage'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Add timestamps if not provided
    const destinationData = {
      ...req.body,
      createdAt: req.body.createdAt || new Date(),
      updatedAt: req.body.updatedAt || new Date()
    };
    
    const [destination] = await db
      .insert(destinations)
      .values(destinationData)
      .returning();
    
    if (!destination) {
      throw new Error('Database returned empty result after insert');
    }
    
    console.log(`Destination created successfully: ${destination.id}`);
    res.status(201).json({
      success: true,
      message: "Destination created successfully",
      destination
    });
  } catch (error) {
    console.error("Error creating destination:", error);
    
    // Check for specific error types
    if (error.message.includes('duplicate key')) {
      return res.status(409).json({ 
        success: false, 
        message: "A destination with this slug already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to create destination", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

app.put("/api/destinations/:id", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const [destination] = await db.update(destinations)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(destinations.id, req.params.id))
      .returning();
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).json({ message: "Failed to update destination" });
  }
});

app.delete("/api/destinations/:id", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    await db.delete(destinations).where(eq(destinations.id, req.params.id));
    res.json({ success: true, message: "Destination deleted" });
  } catch (error) {
    console.error("Error deleting destination:", error);
    res.status(500).json({ message: "Failed to delete destination" });
  }
});

// Gallery
app.get("/api/gallery", async (req, res) => {
  try {
    await initializeDatabase();
    const collections = await db.select().from(galleryCollections)
      .where(eq(galleryCollections.isVisible, true))
      .orderBy(desc(galleryCollections.createdAt));
    res.json(collections);
  } catch (error) {
    console.error("Error fetching gallery collections:", error);
    res.status(500).json({ message: "Failed to fetch gallery collections" });
  }
});

app.get("/api/gallery/:id", async (req, res) => {
  try {
    await initializeDatabase();
    const [collection] = await db.select().from(galleryCollections)
      .where(and(eq(galleryCollections.id, req.params.id), eq(galleryCollections.isVisible, true)));
    
    if (!collection) {
      return res.status(404).json({ message: "Gallery collection not found" });
    }
    
    const media = await db.select().from(galleryMedia)
      .where(eq(galleryMedia.collectionId, req.params.id))
      .orderBy(galleryMedia.sortOrder);
    
    res.json({ ...collection, media });
  } catch (error) {
    console.error("Error fetching gallery collection:", error);
    res.status(500).json({ message: "Failed to fetch gallery collection" });
  }
});

app.post("/api/gallery", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const [collection] = await db.insert(galleryCollections).values(req.body).returning();
    res.status(201).json(collection);
  } catch (error) {
    console.error("Error creating gallery collection:", error);
    res.status(500).json({ message: "Failed to create gallery collection" });
  }
});

app.put("/api/gallery/:id", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const [collection] = await db.update(galleryCollections)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(galleryCollections.id, req.params.id))
      .returning();
    if (!collection) {
      return res.status(404).json({ message: "Gallery collection not found" });
    }
    res.json(collection);
  } catch (error) {
    console.error("Error updating gallery collection:", error);
    res.status(500).json({ message: "Failed to update gallery collection" });
  }
});

app.delete("/api/gallery/:id", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    await db.delete(galleryCollections).where(eq(galleryCollections.id, req.params.id));
    res.json({ success: true, message: "Gallery collection deleted" });
  } catch (error) {
    console.error("Error deleting gallery collection:", error);
    res.status(500).json({ message: "Failed to delete gallery collection" });
  }
});

// Travel Pins
app.get("/api/travel-pins", async (req, res) => {
  try {
    await initializeDatabase();
    const pins = await db.select().from(travelPins)
      .where(eq(travelPins.isVisible, true))
      .orderBy(desc(travelPins.createdAt));
    
    // Process pins to ensure coordinates are properly formatted
    const processedPins = pins.map(pin => {
      // Ensure coordinates are properly formatted
      if (pin.coordinates && typeof pin.coordinates === 'string') {
        try {
          pin.coordinates = JSON.parse(pin.coordinates);
        } catch (e) {
          console.error(`Error parsing coordinates for pin ${pin.id}:`, e);
          // Set default coordinates if parsing fails
          pin.coordinates = { lat: 20.5937, lng: 78.9629 };
        }
      }
      
      // Ensure latitude and longitude are numbers
      if (pin.coordinates && typeof pin.coordinates === 'object') {
        pin.coordinates.lat = parseFloat(pin.coordinates.lat);
        pin.coordinates.lng = parseFloat(pin.coordinates.lng);
      }
      
      return pin;
    });
    
    console.log(`Retrieved ${processedPins.length} travel pins successfully`);
    res.json(processedPins);
  } catch (error) {
    console.error("Error fetching travel pins:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch travel pins", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

app.post("/api/travel-pins", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    
    // Validate required fields
    const requiredFields = ['title', 'latitude', 'longitude', 'visitDate'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Validate latitude and longitude are valid numbers
    const lat = parseFloat(req.body.latitude);
    const lng = parseFloat(req.body.longitude);
    
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({
        success: false,
        message: "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180"
      });
    }
    
    // Ensure coordinates are stored as numbers, not strings
    const pinData = {
      ...req.body,
      latitude: lat,
      longitude: lng,
      createdAt: req.body.createdAt || new Date(),
      updatedAt: req.body.updatedAt || new Date()
    };
    
    const [pin] = await db.insert(travelPins).values(pinData).returning();
    
    if (!pin) {
      throw new Error('Database returned empty result after insert');
    }
    
    console.log(`Travel pin created successfully: ${pin.id}`);
    res.status(201).json({
      success: true,
      message: "Travel pin created successfully",
      pin
    });
  } catch (error) {
    console.error("Error creating travel pin:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to create travel pin", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

app.put("/api/travel-pins/:id", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const [pin] = await db.update(travelPins)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(travelPins.id, req.params.id))
      .returning();
    if (!pin) {
      return res.status(404).json({ message: "Travel pin not found" });
    }
    res.json(pin);
  } catch (error) {
    console.error("Error updating travel pin:", error);
    res.status(500).json({ message: "Failed to update travel pin" });
  }
});

app.delete("/api/travel-pins/:id", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    await db.delete(travelPins).where(eq(travelPins.id, req.params.id));
    res.json({ success: true, message: "Travel pin deleted" });
  } catch (error) {
    console.error("Error deleting travel pin:", error);
    res.status(500).json({ message: "Failed to delete travel pin" });
  }
});

// Journey Tracking
app.get("/api/journey", async (req, res) => {
  try {
    await initializeDatabase();
    const [tracking] = await db.select().from(journeyTracking)
      .orderBy(desc(journeyTracking.lastUpdated))
      .limit(1);
    
    if (!tracking) {
      console.log("No journey tracking data found, returning default data");
      // Return default data if no journey tracking data exists
      return res.json({
        id: "default",
        currentLocation: "Mysuru, Karnataka",
        currentCoordinates: { lat: 12.2958, lng: 76.6394 },
        journeyProgress: 65,
        daysTraveled: 78,
        statesCovered: 12,
        distanceCovered: 3450,
        lastUpdated: new Date()
      });
    }
    
    // Ensure coordinates are properly formatted
    if (tracking.currentCoordinates && typeof tracking.currentCoordinates === 'string') {
      try {
        tracking.currentCoordinates = JSON.parse(tracking.currentCoordinates);
      } catch (e) {
        console.error("Error parsing coordinates:", e);
        // Set default coordinates if parsing fails
        tracking.currentCoordinates = { lat: 12.2958, lng: 76.6394 };
      }
    }
    
    console.log("Journey data retrieved successfully:", tracking.id);
    res.json(tracking);
  } catch (error) {
    console.error("Error fetching journey tracking:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch journey tracking", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

app.post("/api/journey-tracking", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    
    // Validate required fields
    const requiredFields = ['currentLocation', 'currentCoordinates'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Validate coordinates format
    if (typeof req.body.currentCoordinates !== 'object' || 
        !('lat' in req.body.currentCoordinates) || 
        !('lng' in req.body.currentCoordinates)) {
      return res.status(400).json({
        success: false,
        message: "currentCoordinates must contain lat and lng properties"
      });
    }
    
    // Validate coordinate values
    const lat = parseFloat(req.body.currentCoordinates.lat);
    const lng = parseFloat(req.body.currentCoordinates.lng);
    
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({
        success: false,
        message: "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180"
      });
    }
    
    // Add timestamps if not provided
    const trackingData = {
      ...req.body,
      lastUpdated: new Date()
    };
    
    const [entry] = await db
      .insert(journeyTracking)
      .values(trackingData)
      .returning();
    
    if (!entry) {
      throw new Error('Database returned empty result after insert');
    }
    
    console.log(`Journey tracking entry created successfully: ${entry.id}`);
    res.status(201).json({
      success: true,
      message: "Journey tracking entry created successfully",
      entry
    });
  } catch (error) {
    console.error("Error creating journey tracking entry:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to create journey tracking entry", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});

// Home Content
app.get("/api/home-content", async (req, res) => {
  try {
    await initializeDatabase();
    const [content] = await db.select().from(homePageContent).limit(1);
    res.json(content || {});
  } catch (error) {
    console.error("Error fetching home page content:", error);
    res.status(500).json({ message: "Failed to fetch home page content" });
  }
});

app.post("/api/home-content", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const [content] = await db.insert(homePageContent).values(req.body).returning();
    res.status(201).json(content);
  } catch (error) {
    console.error("Error creating home page content:", error);
    res.status(500).json({ message: "Failed to create home page content" });
  }
});

app.put("/api/home-content", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const existing = await db.select().from(homePageContent).limit(1);
    
    if (existing.length === 0) {
      const [content] = await db.insert(homePageContent).values({
        ...req.body,
        updatedAt: new Date()
      }).returning();
      res.json(content);
    } else {
      const [content] = await db.update(homePageContent)
        .set({
          ...req.body,
          updatedAt: new Date()
        })
        .where(eq(homePageContent.id, existing[0].id))
        .returning();
      res.json(content);
    }
  } catch (error) {
    console.error("Error updating home page content:", error);
    res.status(500).json({ message: "Failed to update home page content" });
  }
});

app.put("/api/journey", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const existing = await db.select().from(journeyTracking).limit(1);
    
    if (existing.length === 0) {
      const [journey] = await db.insert(journeyTracking).values({
        ...req.body,
        lastUpdated: new Date()
      }).returning();
      res.json(journey);
    } else {
      const [journey] = await db.update(journeyTracking)
        .set({
          ...req.body,
          lastUpdated: new Date()
        })
        .where(eq(journeyTracking.id, existing[0].id))
        .returning();
      res.json(journey);
    }
  } catch (error) {
    console.error("Error updating journey tracking:", error);
    res.status(500).json({ message: "Failed to update journey tracking" });
  }
});

// Admin Stats (Protected)
app.get("/api/admin/stats", requireAuth, async (req, res) => {
  try {
    await initializeDatabase();
    const posts = await db.select().from(blogPosts);
    const dests = await db.select().from(destinations);
    const galleries = await db.select().from(galleryCollections);
    const pins = await db.select().from(travelPins);
    
    res.json({
      totalPosts: posts.length,
      totalDestinations: dests.length,
      totalGalleries: galleries.length,
      totalPins: pins.length
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.json({
      totalPosts: 0,
      totalDestinations: 0,
      totalGalleries: 0,
      totalPins: 0
    });
  }
});

// Authentication
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username === "admins" && password === (process.env.ADMIN_PASSWORD || "Travel@2025")) {
      req.session = req.session || {};
      req.session.user = {
        id: "admin",
        name: "Administrator",
        email: "admin@travel-blog.com",
        username: "admin"
      };
      
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

app.get("/api/auth/user", (req, res) => {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  } else {
    res.json({ success: true, message: "Already logged out" });
  }
});

// Admin Stats
app.get("/api/admin/stats", async (req, res) => {
  try {
    await initializeDatabase();
    
    const postsCount = await db.select({ count: sql`count(*)` }).from(blogPosts);
    const destinationsCount = await db.select({ count: sql`count(*)` }).from(destinations);
    const galleryCount = await db.select({ count: sql`count(*)` }).from(galleryCollections);
    const pinsCount = await db.select({ count: sql`count(*)` }).from(travelPins);
    
    res.json({
      totalPosts: Number(postsCount[0]?.count) || 0,
      totalDestinations: Number(destinationsCount[0]?.count) || 0,
      totalGalleryCollections: Number(galleryCount[0]?.count) || 0,
      totalTravelPins: Number(pinsCount[0]?.count) || 0,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

// Newsletter subscription
app.post("/api/newsletter/subscribe", async (req, res) => {
  try {
    await initializeDatabase();
    const { email, name } = req.body;
    
    const [subscriber] = await db.insert(newsletterSubscribers)
      .values({ email })
      .onConflictDoNothing()
      .returning();
    
    res.json({ success: true, message: "Successfully subscribed to newsletter!" });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({ success: false, message: "Failed to subscribe" });
  }
});

// Contact form
app.post("/api/contact", async (req, res) => {
  try {
    await initializeDatabase();
    const [message] = await db.insert(contactMessages).values(req.body).returning();
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Export for Vercel
export default app;