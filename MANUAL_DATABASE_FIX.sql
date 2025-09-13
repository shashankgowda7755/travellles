-- Manual Database Fix for Production
-- Run this SQL directly in your Neon database console
-- This will fix the "Unable to Load Journey" error

-- Insert journey tracking data if it doesn't exist
INSERT INTO journey_tracking (
    id,
    current_location,
    current_location_description,
    current_coordinates,
    journey_progress,
    days_traveled,
    states_covered,
    distance_covered,
    last_updated
)
SELECT 
    gen_random_uuid(),
    'Thrissur, Kerala',
    'A city where festivals never really end',
    '{"lat": 10.5276, "lng": 76.2144}'::jsonb,
    75,
    180,
    28,
    15000,
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM journey_tracking LIMIT 1
);

-- Insert home page content if it doesn't exist
INSERT INTO home_page_content (
    id,
    hero_title,
    hero_subtitle,
    hero_background_image,
    explore_button_text,
    diaries_button_text,
    map_section_title,
    map_section_description,
    stories_section_title,
    stories_section_description,
    guides_section_title,
    guides_section_description,
    gallery_section_title,
    gallery_section_description,
    newsletter_title,
    newsletter_description,
    newsletter_subscribers_count,
    weekly_stories_count,
    read_rate,
    journey_start_date,
    journey_start_location,
    journey_start_description,
    final_destination,
    final_destination_description,
    footer_brand_description,
    footer_instagram_url,
    footer_youtube_url,
    footer_twitter_url,
    footer_email_url,
    footer_copyright,
    footer_days_traveled,
    footer_states_covered,
    footer_distance,
    footer_progress_percentage,
    footer_progress_text
)
SELECT 
    gen_random_uuid(),
    'Solo India Travel\nAuthentic Adventures',
    'Join Shashank''s epic 6-month solo journey across incredible India - from Kashmir''s snow peaks to Kanyakumari''s beaches. Real stories, practical guides, stunning photography.',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    'Start Journey',
    'Read Stories',
    'Live India Journey Map',
    'Track my real-time solo travel across 28 Indian states. From Himalayan peaks to tropical beaches, follow authentic adventures, local discoveries, and budget travel tips.',
    'Solo Travel Stories from India',
    'Real experiences from solo backpacking across India. Authentic stories about local culture, budget travel, safety tips, and incredible discoveries off the beaten path.',
    'Complete India Travel Guides',
    'Detailed solo travel guides for every Indian destination. Budget tips, safety advice, local insights, and hidden gems discovered during 6 months of authentic exploration.',
    'India Travel Photography',
    'Stunning photography from solo travels across India. Landscapes, portraits, street photography, and cultural moments captured during authentic adventures.',
    'Join Solo India Travel Community',
    'Get weekly solo travel tips, destination guides, budget advice, and authentic stories from India. Join 500+ solo travelers exploring incredible India safely.',
    500,
    24,
    95,
    'August 22nd, 2024',
    'Bangalore, Karnataka',
    'Starting solo India adventure from tech capital',
    'Srinagar, Kashmir',
    'Ending at paradise on earth - Kashmir valleys',
    'Authentic solo travel stories, practical India travel guides, budget tips, and stunning photography from 6 months exploring incredible India.',
    'https://instagram.com/milesalone',
    'https://youtube.com/@milesalone',
    'https://twitter.com/milesalone',
    'mailto:contact@milesalone.com',
    '© 2025 Milesalone. All rights reserved. Authentic solo travel across incredible India.',
    '180+ days',
    '28 states',
    '15,000+ km',
    75,
    '75% journey complete'
WHERE NOT EXISTS (
    SELECT 1 FROM home_page_content LIMIT 1
);

-- Verify the data was inserted
SELECT 'Journey tracking data:' as info, current_location, journey_progress, days_traveled, states_covered 
FROM journey_tracking 
LIMIT 1;

SELECT 'Home page content:' as info, hero_title, newsletter_subscribers_count 
FROM home_page_content 
LIMIT 1;

-- Success message
SELECT '✅ Database initialized successfully! Your website should now work properly.' as result;