const { Pool } = require('pg');

// Use a default DATABASE_URL for development if not set
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/travel_blog_dev';

const pool = new Pool({ 
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const sampleBlogPosts = [
  {
    title: "Journey to Kashmir: Valley of Dreams",
    slug: "journey-to-kashmir-valley-of-dreams",
    excerpt: "Exploring the breathtaking valleys of Kashmir, from Dal Lake to Gulmarg, discovering the true beauty of paradise on earth.",
    content: "Kashmir truly lives up to its name as 'Paradise on Earth'. My journey began in Srinagar, where the famous Dal Lake welcomed me with its serene waters and floating gardens. The houseboats here offer a unique experience - waking up to the gentle lapping of water and the calls of kingfishers.\n\nThe drive to Gulmarg was nothing short of spectacular. Winding mountain roads revealed panoramic views of snow-capped peaks and verdant meadows. In Gulmarg, I took the gondola ride to Apharwat Peak, where the view of the Himalayas stretched endlessly before me.\n\nWhat struck me most was the warmth of the Kashmiri people. Despite the challenges they face, their hospitality knows no bounds. Every cup of kahwa tea came with stories, every meal with genuine care.\n\nThis journey taught me that true beauty lies not just in landscapes, but in the connections we make along the way.",
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    category: "adventure",
    tags: ["kashmir", "mountains", "travel", "adventure", "himalayas"],
    readingTime: 8,
    isFeatured: true,
    isVisible: true
  },
  {
    title: "Street Food Adventures in Delhi",
    slug: "street-food-adventures-in-delhi",
    excerpt: "A culinary journey through the bustling streets of Old Delhi, discovering flavors that tell stories of centuries-old traditions.",
    content: "Delhi's street food scene is a symphony of flavors, aromas, and textures that assault your senses in the most delightful way. My food adventure began at Chandni Chowk, where the narrow lanes hide culinary treasures that have been perfected over generations.\n\nAt Paranthe Wali Gali, I watched skilled hands roll out paranthas stuffed with everything from potatoes to pomegranate seeds. Each bite was a revelation - crispy on the outside, soft and flavorful within.\n\nThe chaat at Natraj Dahi Bhalle Corner was a masterclass in balancing sweet, sour, and spicy flavors. The vendor's practiced hands assembled each plate with the precision of an artist, creating edible masterpieces.\n\nBut it wasn't just about the food. Each vendor had a story - recipes passed down through generations, struggles overcome, dreams pursued. Food here isn't just sustenance; it's heritage served on a plate.\n\nThis culinary journey reminded me that the best way to understand a culture is through its food.",
    featuredImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    category: "food",
    tags: ["delhi", "street-food", "culture", "food", "tradition"],
    readingTime: 6,
    isFeatured: false,
    isVisible: true
  },
  {
    title: "Sunrise at Kanyakumari: Land's End",
    slug: "sunrise-at-kanyakumari-lands-end",
    excerpt: "Standing at the southernmost tip of India, witnessing the magical moment where three seas meet and the sun rises from the ocean.",
    content: "Kanyakumari holds a special place in every Indian traveler's heart. It's not just a destination; it's a pilgrimage to the edge of our motherland. I arrived here after months of traveling, and standing at this point felt like completing a sacred journey.\n\nThe pre-dawn hours were magical. Fellow travelers from across India gathered on the beach, all waiting for the same moment - sunrise over the confluence of three seas. The Arabian Sea, Bay of Bengal, and Indian Ocean meet here in a spectacular display of nature's grandeur.\n\nAs the first rays of sun pierced the horizon, the entire sky transformed into a canvas of gold and crimson. The Vivekananda Rock Memorial stood silhouetted against this backdrop, a testament to spiritual awakening and national pride.\n\nThe moment was profound. Here I was, at the very tip of India, having traveled thousands of kilometers, meeting countless people, experiencing diverse cultures. This sunrise felt like a blessing, a completion of one journey and the beginning of another.\n\nKanyakumari taught me that every ending is also a beginning.",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    category: "places",
    tags: ["kanyakumari", "sunrise", "travel", "spirituality", "india"],
    readingTime: 5,
    isFeatured: true,
    isVisible: true
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    for (const post of sampleBlogPosts) {
      const query = `
        INSERT INTO blog_posts (
          title, slug, excerpt, content, featured_image, category, 
          tags, reading_time, is_featured, is_visible
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (slug) DO NOTHING
      `;
      
      const values = [
        post.title,
        post.slug,
        post.excerpt,
        post.content,
        post.featuredImage,
        post.category,
        JSON.stringify(post.tags),
        post.readingTime,
        post.isFeatured,
        post.isVisible
      ];
      
      await pool.query(query, values);
      console.log(`✅ Created blog post: ${post.title}`);
    }
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📝 Created ${sampleBlogPosts.length} blog posts`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedDatabase();