# Complete Database Editing Guide - Travel Blog

## Overview
Your travel blog is fully editable through the Neon database. Every piece of content on your website can be modified by updating the corresponding database tables. This guide shows you exactly what to edit and where it appears on your website.

## 🔑 Database Access
- **Neon Console**: https://console.neon.tech/
- **Database Name**: Your travel blog database
- **Changes**: Appear instantly on your website

---

## 📊 Complete Database Tables Guide

### 1. 🏠 **home_page_content** - Controls Entire Home Page
**What it controls**: All text, titles, descriptions, and content on your home page

#### Editable Fields:

**Hero Section:**
- `hero_title` → Main title ("Raw Roads, Real Discovery")
- `hero_subtitle` → Subtitle description
- `hero_background_image` → Background image URL
- `explore_button_text` → "Explore Journey" button text
- `diaries_button_text` → "Read Diaries" button text

**Map Section:**
- `map_section_title` → "Live Journey Tracker" title
- `map_section_description` → Map section description

**Stories Section:**
- `stories_section_title` → "Latest Travel Stories" title
- `stories_section_description` → Stories section description

**Guides Section:**
- `guides_section_title` → "Travel Guides" title
- `guides_section_description` → Guides section description

**Gallery Section:**
- `gallery_section_title` → "Visual Journey" title
- `gallery_section_description` → Gallery section description

**Newsletter Section:**
- `newsletter_title` → "Join the Journey" title
- `newsletter_description` → Newsletter signup description
- `newsletter_subscribers_count` → Number of subscribers shown
- `weekly_stories_count` → Weekly stories count
- `read_rate` → Read rate percentage

**Journey Details:**
- `journey_start_date` → "August 1, 2025"
- `journey_start_location` → "Srinagar, Kashmir"
- `journey_start_description` → Start location description
- `final_destination` → "Kanyakumari, Tamil Nadu"
- `final_destination_description` → Final destination description

**Footer Content:**
- `footer_brand_description` → Brand description in footer
- `footer_instagram_url` → Instagram link
- `footer_youtube_url` → YouTube link
- `footer_twitter_url` → Twitter link
- `footer_email_url` → Email contact link
- `footer_copyright` → Copyright text
- `footer_days_traveled` → "78 / 120" days format
- `footer_states_covered` → "9 / 15+" states format
- `footer_distance` → "1,950 km" distance
- `footer_progress_percentage` → Progress percentage number
- `footer_progress_text` → "65% journey complete"

**SQL Example:**
```sql
UPDATE home_page_content SET 
  hero_title = 'Your New Title',
  hero_subtitle = 'Your new subtitle description',
  newsletter_subscribers_count = 500
WHERE id = (SELECT id FROM home_page_content LIMIT 1);
```

---

### 2. 🧭 **journey_tracking** - Current Journey Status
**What it controls**: Current location, journey progress, and live statistics

#### Editable Fields:
- `current_location` → "Thrissur, Kerala" (where you are now)
- `current_location_description` → "A city where festivals never really end"
- `current_coordinates` → {"lat": 10.5276, "lng": 76.2144}
- `journey_progress` → Percentage complete (0-100)
- `days_traveled` → Number of days traveled
- `states_covered` → Number of states visited
- `distance_covered` → Kilometers traveled
- `instagram_story_url` → Latest Instagram story
- `instagram_reel_url` → Latest Instagram reel
- `twitter_update_url` → Latest Twitter update
- `youtube_short_url` → Latest YouTube short

**Where it appears**: Home page current location, About page, Admin dashboard

**SQL Example:**
```sql
UPDATE journey_tracking SET 
  current_location = 'Mumbai, Maharashtra',
  current_location_description = 'The city that never sleeps',
  current_coordinates = '{"lat": 19.0760, "lng": 72.8777}',
  journey_progress = 75,
  days_traveled = 90,
  states_covered = 12,
  distance_covered = 8500
WHERE id = (SELECT id FROM journey_tracking LIMIT 1);
```

---

### 3. 📝 **blog_posts** - All Blog Articles
**What it controls**: All blog posts and travel stories

#### Editable Fields:
- `title` → Blog post title
- `slug` → URL slug (e.g., "my-journey-to-goa")
- `excerpt` → Short description/preview
- `content` → Full blog post content (HTML/Markdown)
- `featured_image` → Main image URL
- `category` → adventure, culture, food, people, places
- `tags` → Array of tags ["travel", "adventure"]
- `reading_time` → Estimated reading time in minutes
- `is_featured` → Show on homepage (true/false)
- `is_visible` → Published or draft (true/false)
- `instagram_post_url` → Related Instagram post
- `twitter_post_url` → Related Twitter post
- `youtube_video_url` → Related YouTube video

**Where it appears**: Blog page, homepage featured stories, individual post pages

**SQL Example:**
```sql
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, reading_time, is_featured)
VALUES (
  'My Amazing Journey to Rajasthan',
  'rajasthan-journey-2025',
  'Discovering the royal heritage and desert landscapes of Rajasthan',
  '<p>Full blog content here...</p>',
  'https://example.com/rajasthan-image.jpg',
  'adventure',
  8,
  true
);
```

---

### 4. 🗺️ **destinations** - Travel Destinations
**What it controls**: Destination guides and location information

#### Editable Fields:
- `name` → Destination name
- `slug` → URL slug
- `description` → Short description
- `detailed_description` → Full destination guide
- `category` → Trek Place, Tourist Spot, Beach, Historical
- `region` → North India, South India, etc.
- `state` → State name
- `coordinates` → {"lat": 0.0, "lng": 0.0}
- `featured_image` → Main destination image
- `best_time_to_visit` → Best visiting season
- `recommended_stay` → Where to stay
- `budget_range` → Cost information
- `highlights` → Array of highlights
- `activities` → Array of activities
- `rating` → 1-5 star rating
- `difficulty` → Easy, Moderate, Challenging
- `is_current_location` → Mark as current location
- `is_featured` → Show on homepage

**Where it appears**: Destinations page, destination detail pages, maps

---

### 5. 🖼️ **gallery_collections** - Photo/Video Collections
**What it controls**: Gallery sections and media collections

#### Editable Fields:
- `title` → Collection title
- `description` → Collection description
- `cover_image` → Cover image URL
- `location` → Location name
- `youtube_url` → YouTube video for collection
- `is_visible` → Show/hide collection

**Related table**: `gallery_media` (individual photos/videos in collections)

---

### 6. 📍 **travel_pins** - Map Pins
**What it controls**: All pins shown on the interactive map

#### Editable Fields:
- `name` → Pin name/location
- `description` → Pin description
- `coordinates` → {"lat": 0.0, "lng": 0.0}
- `country` → Country name
- `city` → City name
- `visited_date` → When you visited
- `pin_type` → 'visited', 'current', 'planned', 'favorite'
- `pin_color` → Hex color code
- `images` → Array of image URLs
- `tags` → Array of tags
- `rating` → 1-5 star rating
- `notes` → Personal notes
- `is_visible` → Show/hide pin

**Where it appears**: Interactive map on homepage and destinations

---

### 7. 📧 **newsletter_subscribers** - Email Subscribers
**What it controls**: Newsletter subscriber list

#### Editable Fields:
- `email` → Subscriber email
- `is_active` → Active subscription status

---

### 8. 💬 **contact_messages** - Contact Form Messages
**What it controls**: Messages from contact form

#### Editable Fields:
- `name` → Sender name
- `email` → Sender email
- `subject` → Message subject
- `message` → Message content
- `is_read` → Mark as read/unread

---

## 🚀 Quick Edit Examples

### Change Current Location:
```sql
UPDATE journey_tracking SET 
  current_location = 'Goa',
  current_location_description = 'Beach paradise and Portuguese heritage',
  current_coordinates = '{"lat": 15.2993, "lng": 74.1240}'
WHERE id = (SELECT id FROM journey_tracking LIMIT 1);
```

### Update Journey Progress:
```sql
UPDATE journey_tracking SET 
  journey_progress = 80,
  days_traveled = 100,
  states_covered = 15,
  distance_covered = 9500
WHERE id = (SELECT id FROM journey_tracking LIMIT 1);
```

### Change Homepage Hero Title:
```sql
UPDATE home_page_content SET 
  hero_title = 'Epic India Journey',
  hero_subtitle = 'Following the path less traveled across incredible India'
WHERE id = (SELECT id FROM home_page_content LIMIT 1);
```

### Add New Blog Post:
```sql
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, reading_time)
VALUES (
  'Kerala Backwaters Experience',
  'kerala-backwaters-2025',
  'Peaceful journey through Kerala\'s famous backwaters',
  '<p>Amazing experience in Kerala...</p>',
  'https://example.com/kerala.jpg',
  'culture',
  6
);
```

### Update Footer Statistics:
```sql
UPDATE home_page_content SET 
  footer_days_traveled = '100 / 120',
  footer_states_covered = '15 / 28',
  footer_distance = '9,500 km',
  footer_progress_percentage = 80,
  footer_progress_text = '80% journey complete'
WHERE id = (SELECT id FROM home_page_content LIMIT 1);
```

---

## 🔧 Admin Panel Alternative

If the admin panel isn't working, you can access it at:
- **URL**: `http://localhost:5000/admin`
- **Username**: `admin`
- **Password**: `Travel@2025`

The admin panel provides a user-friendly interface for editing:
- Journey tracking (current location, progress)
- Blog posts
- Destinations
- Gallery collections
- Home page content

---

## 💡 Pro Tips

1. **Always backup before major changes**
2. **Test changes on development first**
3. **Use single quotes in SQL for text values**
4. **JSON fields need proper formatting: `'{"lat": 10.5, "lng": 76.2}'`**
5. **Arrays use this format: `["tag1", "tag2", "tag3"]`**
6. **Boolean values: `true` or `false` (no quotes)**
7. **Changes appear instantly on your website**

---

## 🆘 Need Help?

- Check the `NEON_DATABASE_GUIDE.md` for basic database operations
- All tables have `created_at` and `updated_at` timestamps
- Use `SELECT * FROM table_name LIMIT 5;` to see current data
- Contact support if you need assistance with complex queries

**Remember**: Every piece of content on your travel blog can be edited through these database tables. No code changes needed!