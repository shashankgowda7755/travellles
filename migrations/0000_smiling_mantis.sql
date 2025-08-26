CREATE TABLE "blog_posts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"featured_image" text NOT NULL,
	"category" text NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"reading_time" integer NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"instagram_post_url" text,
	"twitter_post_url" text,
	"facebook_post_url" text,
	"youtube_video_url" text,
	"social_media_hashtags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "destinations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"detailed_description" text NOT NULL,
	"category" text NOT NULL,
	"region" text NOT NULL,
	"state" text NOT NULL,
	"coordinates" jsonb NOT NULL,
	"featured_image" text NOT NULL,
	"best_time_to_visit" text NOT NULL,
	"recommended_stay" text NOT NULL,
	"budget_range" text NOT NULL,
	"highlights" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"activities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"difficulty" text NOT NULL,
	"related_gallery_id" varchar,
	"related_blog_posts" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_current_location" boolean DEFAULT false NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"instagram_post_url" text,
	"twitter_post_url" text,
	"facebook_post_url" text,
	"youtube_video_url" text,
	"social_media_hashtags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "destinations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "gallery_collections" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"cover_image" text NOT NULL,
	"media_count" integer DEFAULT 0 NOT NULL,
	"location" text,
	"youtube_url" text,
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_media" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"collection_id" varchar NOT NULL,
	"type" text NOT NULL,
	"url" text NOT NULL,
	"thumbnail_url" text,
	"title" text,
	"caption" text,
	"embed_code" text,
	"link_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "home_page_content" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hero_title" text DEFAULT 'Raw Roads,
Real Discovery' NOT NULL,
	"hero_subtitle" text DEFAULT 'Join Shashank''s authentic 4-month journey across India, from Kashmir''s valleys to Kanyakumari''s shores, on just ₹500 per day' NOT NULL,
	"hero_background_image" text DEFAULT 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' NOT NULL,
	"explore_button_text" text DEFAULT 'Explore Journey' NOT NULL,
	"diaries_button_text" text DEFAULT 'Read Diaries' NOT NULL,
	"daily_budget" text DEFAULT '₹500' NOT NULL,
	"map_section_title" text DEFAULT 'Live Journey Tracker' NOT NULL,
	"map_section_description" text DEFAULT 'Follow the real-time progress from the serene valleys of Kashmir to the southern tip of Kanyakumari. Each pin tells a story of discovery, challenge, and authentic Indian experiences.' NOT NULL,
	"stories_section_title" text DEFAULT 'Latest Travel Stories' NOT NULL,
	"stories_section_description" text DEFAULT 'Authentic stories from the road - the struggles, discoveries, and unexpected connections that make solo travel transformative.' NOT NULL,
	"guides_section_title" text DEFAULT 'Travel Guides' NOT NULL,
	"guides_section_description" text DEFAULT 'Comprehensive guides to the most incredible destinations on this journey. From planning to experiencing, get insider tips for authentic travel.' NOT NULL,
	"gallery_section_title" text DEFAULT 'Visual Journey' NOT NULL,
	"gallery_section_description" text DEFAULT 'Every photograph tells a story of discovery, challenge, and the incredible diversity of landscapes, cultures, and moments that define authentic India travel.' NOT NULL,
	"newsletter_title" text DEFAULT 'Join the Journey' NOT NULL,
	"newsletter_description" text DEFAULT 'Get weekly updates about new destinations, travel stories, and behind-the-scenes insights from the road. No spam, just authentic travel content.' NOT NULL,
	"newsletter_subscribers_count" integer DEFAULT 342 NOT NULL,
	"weekly_stories_count" integer DEFAULT 24 NOT NULL,
	"read_rate" integer DEFAULT 95 NOT NULL,
	"journey_start_date" text DEFAULT 'August 1, 2025' NOT NULL,
	"journey_start_location" text DEFAULT 'Srinagar, Kashmir' NOT NULL,
	"journey_start_description" text DEFAULT 'Dal Lake houseboats and mountain serenity' NOT NULL,
	"final_destination" text DEFAULT 'Kanyakumari, Tamil Nadu' NOT NULL,
	"final_destination_description" text DEFAULT 'Land''s end where three seas meet' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journey_tracking" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"current_location" text NOT NULL,
	"current_coordinates" jsonb NOT NULL,
	"journey_progress" integer DEFAULT 0 NOT NULL,
	"days_traveled" integer DEFAULT 0 NOT NULL,
	"states_covered" integer DEFAULT 0 NOT NULL,
	"distance_covered" integer DEFAULT 0 NOT NULL,
	"instagram_story_url" text,
	"instagram_reel_url" text,
	"twitter_update_url" text,
	"youtube_short_url" text,
	"last_updated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"expires" timestamp NOT NULL,
	"session_token" varchar NOT NULL,
	CONSTRAINT "sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "travel_pins" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"coordinates" jsonb NOT NULL,
	"country" text NOT NULL,
	"city" text,
	"visited_date" timestamp,
	"pin_type" text DEFAULT 'visited' NOT NULL,
	"pin_color" text DEFAULT '#E07A3E' NOT NULL,
	"images" text[] DEFAULT '{}',
	"tags" text[] DEFAULT '{}',
	"rating" integer DEFAULT 0,
	"notes" text,
	"is_visible" boolean DEFAULT true NOT NULL,
	"instagram_post_url" text,
	"twitter_post_url" text,
	"facebook_post_url" text,
	"youtube_video_url" text,
	"social_media_hashtags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_related_gallery_id_gallery_collections_id_fk" FOREIGN KEY ("related_gallery_id") REFERENCES "public"."gallery_collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery_media" ADD CONSTRAINT "gallery_media_collection_id_gallery_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."gallery_collections"("id") ON DELETE cascade ON UPDATE no action;