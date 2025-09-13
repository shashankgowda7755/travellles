import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { homePageContent } from "./shared/schema.js";
import { eq } from "drizzle-orm";

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const client = postgres(connectionString);
const db = drizzle(client);

async function updateHeroSubtitle() {
  try {
    console.log("Connecting to database...");
    
    // Check if there's existing home page content
    const existingContent = await db.select().from(homePageContent).limit(1);
    
    if (existingContent.length > 0) {
      // Update existing record
      const result = await db
        .update(homePageContent)
        .set({
          heroSubtitle: "Join Shashank's authentic 6-month journey across India, from Kashmir's valleys to Kanyakumari's shores",
          updatedAt: new Date()
        })
        .where(eq(homePageContent.id, existingContent[0].id))
        .returning();
      
      console.log("Updated hero subtitle:", result[0].heroSubtitle);
    } else {
      // Insert new record with updated subtitle
      const result = await db
        .insert(homePageContent)
        .values({
          heroSubtitle: "Join Shashank's authentic 6-month journey across India, from Kashmir's valleys to Kanyakumari's shores"
        })
        .returning();
      
      console.log("Created new home page content with hero subtitle:", result[0].heroSubtitle);
    }
    
    console.log("Hero subtitle updated successfully!");
  } catch (error) {
    console.error("Error updating hero subtitle:", error);
  } finally {
    await client.end();
  }
}

updateHeroSubtitle();