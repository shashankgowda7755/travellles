-- Complete Database Setup Script for Neon Console
-- Copy and paste this entire script into your Neon Console SQL Editor
-- This will ensure you have initial data to start editing your website content

-- 1. Ensure journey_tracking has initial data
INSERT INTO "journey_tracking" (
  "current_location",
  "current_location_description",
  "current_coordinates",
  "journey_progress",
  "days_traveled",
  "states_covered",
  "distance_covered"
)
SELECT
  'Thrissur, Kerala',
  'A city where festivals never really end',
  '{"lat": 10.5276, "lng": 76.2144}',
  20,
  24,
  3,
  6500
WHERE NOT EXISTS (SELECT 1 FROM "journey_tracking");

-- 2. Ensure home_page_content has initial data
INSERT INTO "home_page_content" (
  "hero_title",
  "hero_subtitle",
  "hero_background_image",
  "explore_button_text",
  "diaries_button_text",
  "map_section_title",
  "map_section_description",
  "stories_section_title",
  "stories_section_description",
  "guides_section_title",
  "guides_section_description",
  "gallery_section_title",
  "gallery_section_description",
  "newsletter_title",
  "newsletter_description",
  "newsletter_subscribers_count",
  "weekly_stories_count",
  "read_rate",
  "journey_start_date",
  "journey_start_location",
  "journey_start_description",
  "final_destination",
  "final_destination_description",
  "footer_brand_description",
  "footer_instagram_url",
  "footer_youtube_url",
  "footer_twitter_url",
  "footer_email_url",
  "footer_copyright",
  "footer_days_traveled",
  "footer_states_covered",
  "footer_distance",
  "footer_progress_percentage",
  "footer_progress_text"
)
SELECT
  'Raw Roads, Real Discovery',
  'Join Shashank''s authentic 6-month journey across India, from Kashmir''s valleys to Kanyakumari''s shores',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  'Explore Journey',
  'Read Diaries',
  'Live Journey Tracker',
  'Follow the journey progress through meaningful places and experiences. Each pin tells a story of discovery, challenge, and personal growth.',
  'Latest Travel Stories',
  'Authentic stories from the road - the struggles, discoveries, and unexpected connections that make solo travel transformative.',
  'Travel Guides',
  'Comprehensive guides to the most incredible destinations on this journey. From planning to experiencing, get insider tips for authentic travel.',
  'Visual Journey',
  'Every photograph tells a story of discovery, challenge, and the incredible diversity of experiences and moments that define authentic personal exploration.',
  'Join the Journey',
  'Get weekly updates about new destinations, travel stories, and behind-the-scenes insights from the road. No spam, just authentic travel content.',
  342,
  24,
  95,
  'August 1, 2025',
  'Srinagar, Kashmir',
  'Dal Lake houseboats and mountain serenity',
  'Kanyakumari, Tamil Nadu',
  'Land''s end where three seas meet',
  'Sharing personal journey experiences, life adventures, and authentic stories from solo travels and personal growth.',
  '#',
  '#',
  '#',
  'mailto:contact@milesalone.com',
  '© 2025 Milesalone. All rights reserved. Built with passion for authentic travel.',
  '24 / 180',
  '3 / 28+',
  '6,500 km',
  20,
  '20% journey complete'
WHERE NOT EXISTS (SELECT 1 FROM "home_page_content");

-- 3. Check what data exists (run this to verify)
SELECT 'journey_tracking' as table_name, COUNT(*) as record_count FROM "journey_tracking"
UNION ALL
SELECT 'home_page_content' as table_name, COUNT(*) as record_count FROM "home_page_content"
UNION ALL
SELECT 'blog_posts' as table_name, COUNT(*) as record_count FROM "blog_posts"
UNION ALL
SELECT 'destinations' as table_name, COUNT(*) as record_count FROM "destinations"
UNION ALL
SELECT 'travel_pins' as table_name, COUNT(*) as record_count FROM "travel_pins";

-- 4. View current journey data
SELECT 
  current_location,
  current_location_description,
  journey_progress,
  days_traveled,
  states_covered,
  distance_covered
FROM "journey_tracking"
LIMIT 1;

-- 5. View current homepage data
SELECT 
  hero_title,
  hero_subtitle,
  newsletter_subscribers_count,
  footer_days_traveled,
  footer_states_covered,
  footer_distance
FROM "home_page_content"
LIMIT 1;