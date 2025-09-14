// Fix production database migration for current_location_description column
import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config';

async function fixProductionDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Check if column exists
    const columnCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'journey_tracking' 
      AND column_name = 'current_location_description';
    `);

    if (columnCheck.rows.length === 0) {
      console.log('🔧 Adding missing current_location_description column...');
      
      // Add the missing column
      await client.query(`
        ALTER TABLE "journey_tracking" 
        ADD COLUMN "current_location_description" text NOT NULL DEFAULT 'A city where festivals never really end';
      `);
      
      console.log('✅ Column added successfully');
      
      // Update existing records
      await client.query(`
        UPDATE "journey_tracking" 
        SET 
          "current_location" = 'Thrissur, Kerala',
          "current_location_description" = 'A city where festivals never really end',
          "last_updated" = NOW()
        WHERE "current_location" IS NOT NULL;
      `);
      
      console.log('✅ Existing records updated');
      
      // Insert default record if none exists
      const recordCheck = await client.query('SELECT COUNT(*) FROM "journey_tracking"');
      if (parseInt(recordCheck.rows[0].count) === 0) {
        await client.query(`
          INSERT INTO "journey_tracking" (
            "current_location", 
            "current_location_description",
            "current_coordinates", 
            "journey_progress", 
            "days_traveled", 
            "states_covered", 
            "distance_covered"
          ) VALUES (
            'Thrissur, Kerala',
            'A city where festivals never really end',
            '{"lat": 10.5276, "lng": 76.2144}',
            65,
            78,
            9,
            1950
          );
        `);
        console.log('✅ Default journey tracking record created');
      }
    } else {
      console.log('✅ Column current_location_description already exists');
    }

    console.log('🎉 Database migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Run the migration
fixProductionDatabase()
  .then(() => {
    console.log('Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
  });