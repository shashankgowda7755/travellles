const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const schema = require('./shared/schema.ts');
const { galleryCollections, galleryMedia } = schema;

// Database connection
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_FwdsBOvz87qt@ep-gentle-leaf-a1k0r5w1-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function addJaipurGallery() {
  const pool = new Pool({ 
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  const db = drizzle({ client: pool, schema });

  try {
    console.log('Adding Jaipur gallery collection...');
    
    // Insert the gallery collection
    const [collection] = await db.insert(galleryCollections).values({
      title: 'Jaipur maha Photo Collection',
      description: 'Beautiful photographs from Jaipur, Rajasthan',
      location: 'Jaipur, Rajasthan',
      coverImageUrl: 'https://drive.google.com/file/d/1MBdTx-NVT1z6jcWfVtkmx4aI84tfn6n7/view?usp=sharing',
      isPublished: true,
      createdAt: new Date('2023-07-11T09:07:18.644Z'),
      updatedAt: new Date('2025-08-28T16:11:31.095Z')
    }).returning();

    console.log('Gallery collection created:', collection.title);

    // Insert the 4 images for this collection
    const images = [
      {
        collectionId: collection.id,
        type: 'photo',
        url: 'https://drive.google.com/file/d/1MBdTx-NVT1z6jcWfVtkmx4aI84tfn6n7/view?usp=sharing',
        title: 'Jaipur Palace View 1'
      },
      {
        collectionId: collection.id,
        type: 'photo',
        url: 'https://drive.google.com/file/d/1MBdTx-NVT1z6jcWfVtkmx4aI84tfn6n7/view?usp=sharing',
        title: 'Jaipur Palace View 2'
      },
      {
        collectionId: collection.id,
        type: 'photo',
        url: 'https://drive.google.com/file/d/1MBdTx-NVT1z6jcWfVtkmx4aI84tfn6n7/view?usp=sharing',
        title: 'Jaipur Palace View 3'
      },
      {
        collectionId: collection.id,
        type: 'photo',
        url: 'https://drive.google.com/file/d/1MBdTx-NVT1z6jcWfVtkmx4aI84tfn6n7/view?usp=sharing',
        title: 'Jaipur Palace View 4'
      }
    ];

    await db.insert(galleryMedia).values(images);
    console.log('Added 4 images to the Jaipur collection');

    console.log('Jaipur gallery collection and images added successfully!');
  } catch (error) {
    console.error('Error adding Jaipur gallery:', error);
  } finally {
    await pool.end();
  }
}

addJaipurGallery();