import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { travelPins } from './shared/schema.js';

// Load environment variables from .env file
config();

// Initialize database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/travel_blog_dev',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = drizzle({ client: pool, schema: { travelPins } });

const newTravelPinsData = [
  { id: 1, name: 'Kundapura', description: 'Coastal town in Karnataka, famous for seafood, beaches, and heritage temples.', coordinates: '13.6322° N, 74.6906° E', country: 'India', city: 'Kundapura', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kundapura_town.jpg', tags: 'Town, Coastal, Heritage', rating: 3, notes: 'Gateway to Udupi coast', is_visible: true },
  { id: 2, name: 'Kundapura town', description: 'Urban center of Kundapura, bustling with local markets and traditional cuisine.', coordinates: '13.6322° N, 74.6906° E', country: 'India', city: 'Kundapura', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Kundapura_town.jpg', tags: 'Town, Market', rating: 3, notes: 'Centre of commerce for the region', is_visible: true },
  { id: 3, name: 'Kodi Beach', description: 'Scenic beach near Kundapura, popular for its clean sands and estuary views.', coordinates: '13.3439° N, 74.7470° E', country: 'India', city: 'Kundapura', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Kodi_Beach_Kundapura.jpg', tags: 'Beach, Nature', rating: 4, notes: 'Estuary where river meets sea', is_visible: true },
  { id: 4, name: 'Maravanthe Beach', description: 'Unique beaches with Arabian Sea on one side, Souparnika River on the other; famed sunset views.', coordinates: '13.7050° N, 74.6420° E', country: 'India', city: 'Maravanthe', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Maravanthe_Beach_Udupi.jpg', tags: 'Beach, Nature, Scenic', rating: 5, notes: 'Sea-river highway scenery', is_visible: true },
  { id: 5, name: 'Kotilingeshwara Temple', description: 'Modern temple complex with thousands of Shiva lingams, a famous pilgrimage near Kundapura.', coordinates: '13.6615° N, 74.6938° E', country: 'India', city: 'Kundapura', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Kotilingeshwara_Temple.jpg', tags: 'Temple, Religious, Heritage', rating: 4, notes: 'Thousands of Shiva Lingams', is_visible: true },
  { id: 6, name: 'Kundadri Hill', description: 'Hilltop Jain shrine with panoramic views, ancient temple, and trekking near Agumbe.', coordinates: '13.5815° N, 75.0655° E', country: 'India', city: 'Kundapura', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Kundadri_Hill.jpg', tags: 'Hill, Nature, Temple, Trek', rating: 4, notes: 'Jain temple; monsoon trekking', is_visible: true },
  { id: 7, name: 'Mangalore', description: 'Port city in Karnataka, famous for its beaches, temples, and vibrant food culture.', coordinates: '12.9141° N, 74.8560° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/m/m1/Mangalore_city.jpg', tags: 'City, Port, Beach, Cuisine', rating: 5, notes: 'Gateway to coastal Karnataka', is_visible: true },
  { id: 8, name: 'Panambur Beach', description: 'Popular urban beach in Mangalore, known for safe swimming and public events.', coordinates: '12.9570° N, 74.8005° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Panambur_Beach.jpg', tags: 'Beach, City, Events', rating: 5, notes: 'Host to Mangalore beach festivals', is_visible: true },
  { id: 9, name: 'Tannirbhavi Beach', description: 'Secluded beach in Mangalore with picturesque sunsets and tranquil vibes.', coordinates: '12.9050° N, 74.8156° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Tannirbhavi_Beach.JPG', tags: 'Beach, Nature', rating: 4, notes: 'Accessible by ferry from Sultan Battery', is_visible: true },
  { id: 10, name: 'Someshwar Beach', description: 'Long sandy beach renowned for natural boulders and the ancient Someshwar Temple.', coordinates: '12.8677° N, 74.8166° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Someshwar_Beach.jpg', tags: 'Beach, Temple, Nature', rating: 3, notes: 'Temple at beach edge', is_visible: true },
  { id: 11, name: 'Ullal Beach', description: 'Picturesque shore south of Mangalore, palm groves and fishing villages.', coordinates: '12.8143° N, 74.8492° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ullal_beach.jpg', tags: 'Beach, Palm, Village', rating: 3, notes: 'Peaceful spot for sunset', is_visible: true },
  { id: 12, name: 'Top Beaches, Mangalore', description: 'Collective pin for all major beaches (Panambur, Tannirbhavi, Someshwar, Ullal).', coordinates: '12.9141° N, 74.8560° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Mangalore_Beach_View.jpg', tags: 'Beach', rating: 5, notes: 'Cluster of scenic beaches', is_visible: true },
  { id: 13, name: 'St. Aloysius Chapel', description: 'Historic Christian chapel with renowned frescoes and Italian architecture.', coordinates: '12.8707° N, 74.8459° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/St_Aloysius_Chapel_Mangalore.jpg', tags: 'Chapel, Heritage, Religious', rating: 5, notes: 'Famous for painted interiors', is_visible: true },
  { id: 14, name: 'Kadri Manjunath Temple', description: 'Ancient temple dating back to 10th century, dedicated to Lord Shiva on Kadri hills.', coordinates: '12.9001° N, 74.8535° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Kadri_Manjunath_Temple.jpg', tags: 'Temple, Heritage, Religious', rating: 5, notes: 'Oldest temple in Dakshina Kannada', is_visible: true },
  { id: 15, name: 'Mangaladevi Temple', description: 'Pilgrimage center integral to the name "Mangalore", dedicated to goddess Mangaladevi.', coordinates: '12.8536° N, 74.8448° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Mangaladevi_Temple.jpg', tags: 'Temple, Heritage, Religious', rating: 4, notes: 'City\'s namesake temple', is_visible: true },
  { id: 16, name: 'Sultan Battery', description: 'Watchtower built by Tipu Sultan, historic monument overlooking Gurupura River.', coordinates: '12.8832° N, 74.8213° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Sultan_Battery_Mangalore.jpg', tags: 'Fort, Heritage', rating: 3, notes: 'Tipu Sultan monument', is_visible: true },
  { id: 17, name: 'Pilikula Nisargadhama', description: 'Large eco-tourism park with botanical gardens, zoo, lake, and heritage village.', coordinates: '13.0108° N, 74.9116° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Pilikula_Nisargadhama.jpg', tags: 'Nature, Zoo, Eco-park', rating: 4, notes: 'Eco park and cultural village', is_visible: true },
  { id: 18, name: 'Kudroli Gokarnath Temple', description: 'Colorful temple complex dedicated to Gokarnanath, prominent annual Dasara celebrations.', coordinates: '12.8827° N, 74.8249° E', country: 'India', city: 'Mangalore', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Kudroli_Gokarnath_Temple.jpg', tags: 'Temple, Heritage, Festival', rating: 5, notes: 'Known for grand Dasara', is_visible: true },
  { id: 19, name: 'Ernakulam', description: 'Urban district and commercial hub of Kerala, includes Kochi city area.', coordinates: '9.9816° N, 76.2999° E', country: 'India', city: 'Ernakulam', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Ernakulam_city.jpg', tags: 'City, Urban', rating: 5, notes: 'Kochi metropolitan center', is_visible: true },
  { id: 20, name: 'Marine Drive (Ernakulam)', description: 'Picturesque lakeside promenade in Kochi, lined with shops and cafes.', coordinates: '9.9893° N, 76.2869° E', country: 'India', city: 'Ernakulam', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Kochi_MarineDrive2013.jpg', tags: 'Promenade, Nature', rating: 4, notes: 'Iconic city walking area', is_visible: true },
  { id: 21, name: 'Bolgatty Palace', description: 'Historic Dutch palace on Bolgatty Island, now a luxury hotel surrounded by greenery.', coordinates: '9.9852° N, 76.2858° E', country: 'India', city: 'Ernakulam', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Bolgatty_Palace_Kochi.jpg', tags: 'Palace, Heritage, Hotel', rating: 4, notes: 'Dutch-built 18th-century palace', is_visible: true },
  { id: 22, name: 'Hill Palace Museum', description: 'Largest archaeological museum in Kerala, former residence of royal family.', coordinates: '9.9678° N, 76.3556° E', country: 'India', city: 'Tripunithura', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Hill_Palace_Museum_Tripunithura.jpg', tags: 'Museum, Heritage', rating: 5, notes: 'Royal palace and museum', is_visible: true },
  { id: 23, name: 'Chottanikkara Temple', description: 'Famed temple dedicated to the goddess Bhagavathy, major pilgrimage destination.', coordinates: '9.9317° N, 76.3913° E', country: 'India', city: 'Chottanikkara', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Chottanikkara_Temple.jpg', tags: 'Temple, Religious', rating: 4, notes: 'Known for spiritual healing', is_visible: true },
  { id: 24, name: 'Ernakulathappan Shiva Temple', description: 'Prominent Lord Shiva temple in Kochi, near city center.', coordinates: '9.9743° N, 76.2802° E', country: 'India', city: 'Kochi', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Ernakulathappan_Temple_Kochi.jpg', tags: 'Temple, Religious', rating: 3, notes: 'Important city temple', is_visible: true },
  { id: 25, name: 'Fort Kochi', description: 'Historic neighborhood noted for colonial architecture, art cafes, and beach.', coordinates: '9.9658° N, 76.2421° E', country: 'India', city: 'Kochi', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Fort_Kochi_Chinese_nets.jpg', tags: 'Heritage, Colonial, Beach', rating: 5, notes: 'Old Portuguese-Dutch-British settlement', is_visible: true },
  { id: 26, name: 'Chinese Fishing Nets', description: 'Iconic cantilevered fishing structures on the Fort Kochi shoreline.', coordinates: '9.9680° N, 76.2416° E', country: 'India', city: 'Kochi', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Chinese_Fishing_Nets_Kochi.jpg', tags: 'Heritage, Beach, Unique', rating: 5, notes: 'Symbol of Kochi city', is_visible: true },
  { id: 27, name: 'Mattancherry Palace (Dutch Palace)', description: '16th-century palace, exhibits Kerala murals and royal memorabilia.', coordinates: '9.9653° N, 76.2598° E', country: 'India', city: 'Kochi', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Mattancherry_Palace.jpg', tags: 'Palace, Heritage, Museum', rating: 5, notes: 'UNESCO heritage site', is_visible: true },
  { id: 28, name: 'Paradesi Synagogue', description: 'Oldest active synagogue in the Commonwealth, built in 1568.', coordinates: '9.9633° N, 76.2601° E', country: 'India', city: 'Kochi', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Paradesi_Synagogue_Kochi.jpg', tags: 'Synagogue, Heritage, Museum', rating: 4, notes: 'Jewish heritage of Kochi', is_visible: true },
  { id: 29, name: 'Jew Town', description: 'Historic trading street in Fort Kochi, known for antique shops and spice markets.', coordinates: '9.9625° N, 76.2598° E', country: 'India', city: 'Kochi', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Jew_Town_Kochi.jpg', tags: 'Heritage, Shopping, Street', rating: 4, notes: 'Cultural and shopping hub', is_visible: true },
  { id: 30, name: 'Santa Cruz Basilica', description: 'One of India\'s oldest churches, with Gothic architecture and beautiful paintings.', coordinates: '9.9646° N, 76.2419° E', country: 'India', city: 'Kochi', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Santa_Cruz_Basilica_Kochi.jpg', tags: 'Church, Heritage, Architecture', rating: 5, notes: 'Important religious landmark', is_visible: true },
  { id: 31, name: 'Kerala Folklore Museum', description: 'Museum displaying over 4000 artifacts, folk art, and cultural heritage of Kerala.', coordinates: '9.9398° N, 76.2874° E', country: 'India', city: 'Kochi', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Kerala_Folklore_Museum.jpg', tags: 'Museum, Culture, Heritage', rating: 4, notes: 'Preserves Kerala folk arts', is_visible: true },
  { id: 32, name: 'Dhamma Center near Kodaikanal', description: 'Meditation center offering Vipassana courses near Kodaikanal, peaceful forest setting.', coordinates: '10.2326° N, 77.4892° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Kodaikanal_Meditation_House.jpg', tags: 'Dhamma Center, Meditation, Forest', rating: 4, notes: 'Vipassana camp in hills', is_visible: true },
  { id: 33, name: 'Dhamma Center near Dindigul', description: 'Vipassana meditation center located outside Dindigul, facilitates silent retreats.', coordinates: '10.3673° N, 77.9803° E', country: 'India', city: 'Dindigul', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Dindigul_dhamma_center.jpg', tags: 'Dhamma Center, Meditation', rating: 3, notes: 'Weekend retreats and silence', is_visible: true },
  { id: 34, name: 'Kodaikanal Lake', description: 'Star-shaped manmade lake at the heart of Kodaikanal, boating and cycling hub.', coordinates: '10.2376° N, 77.4892° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Kodaikanal_Lake.jpg', tags: 'Lake, Nature, Activity', rating: 5, notes: 'Boating, cycling, and scenery', is_visible: true },
  { id: 35, name: 'Coaker\'s Walk', description: 'Scenic walking path along mountain edge with panoramic valley views.', coordinates: '10.2368° N, 77.4896° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Coakers_Walk_Kodaikanal.jpg', tags: 'Viewpoint, Walk', rating: 5, notes: 'Cloudy strolls and views', is_visible: true },
  { id: 36, name: 'Bryant Park', description: 'Well-maintained botanical garden famous for summer horticulture show.', coordinates: '10.2399° N, 77.4897° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Bryant_Park_Kodaikanal.jpg', tags: 'Garden, Botanical, Activity', rating: 4, notes: 'Seasonal flower shows', is_visible: true },
  { id: 37, name: 'Pillar Rocks', description: 'Three giant boulders rising 400 ft, dramatic views of valleys and mist.', coordinates: '10.2439° N, 77.4788° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Pillar_Rocks_Kodaikanal.jpg', tags: 'Rocks, Viewpoint, Nature', rating: 5, notes: 'Famous photo spot', is_visible: true },
  { id: 38, name: 'Guna Caves (Devil\'s Kitchen)', description: 'Deep, mysterious caves enveloped in legend, dense forest setting.', coordinates: '10.2274° N, 77.4838° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Guna_Caves_Kodaikanal.jpg', tags: 'Caves, Nature, Adventure', rating: 4, notes: 'Film location and haunted stories', is_visible: true },
  { id: 39, name: 'Dolphin\'s Nose', description: 'Rocky ledge shaped like a dolphin\'s nose, spectacular cliff overlook.', coordinates: '10.2322° N, 77.4789° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Dolphins_Nose_Kodaikanal.jpg', tags: 'Viewpoint, Cliff, Nature', rating: 4, notes: 'Cliff edge adventure', is_visible: true },
  { id: 40, name: 'Pine Forest', description: 'Shady forest of old pines, walking and photography popular.', coordinates: '10.2142° N, 77.5134° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Pine_Forest_Kodaikanal.jpg', tags: 'Forest, Nature, Walk', rating: 4, notes: 'Ideal picnic and shooting location', is_visible: true },
  { id: 41, name: 'Silver Cascade Falls', description: 'Tall 180-ft waterfall, roadside tourist spot on entry to Kodaikanal.', coordinates: '10.2727° N, 77.4987° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Silver_Cascade_Falls_Kodaikanal.jpg', tags: 'Falls, Nature, Scenic', rating: 3, notes: 'Entry to hill station', is_visible: true },
  { id: 42, name: 'Kurinji Andavar Temple', description: 'Temple dedicated to Lord Muruga, famous for Kurinji flowers that bloom every 12 years.', coordinates: '10.2542° N, 77.4875° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Kurinji_Andavar_Temple_Kodaikanal.jpg', tags: 'Temple, Heritage, Flowers', rating: 4, notes: 'Rare Kurinji blooms', is_visible: true },
  { id: 43, name: 'Berijam Lake', description: 'Pristine lake in forest, accessible with permission; peaceful spot for nature lovers.', coordinates: '10.3332° N, 77.5705° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Berijam_Lake_Kodaikanal.jpg', tags: 'Lake, Nature, Forest', rating: 3, notes: 'Protected area; birdwatching', is_visible: true },
  { id: 44, name: 'Shembaganur Museum of Natural History', description: 'Museum with rare botanical and zoological specimens, educational exhibits of local flora and fauna.', coordinates: '10.2436° N, 77.4848° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Shembaganur_Museum_Kodaikanal.jpg', tags: 'Museum, Natural History', rating: 3, notes: 'Displays local species', is_visible: true },
  { id: 45, name: 'Solar Physical Observatory', description: 'Old research observatory on the hills, houses telescopes and weather monitors.', coordinates: '10.2342° N, 77.4784° E', country: 'India', city: 'Kodaikanal', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Solar_Observatory_Kodaikanal.jpg', tags: 'Observatory, Science, Heritage', rating: 3, notes: 'Historic research site', is_visible: true },
  { id: 46, name: 'Isha Foundation (Coorg, Chikkabidare)', description: 'Meditation and spiritual center located in Chikkabidare, near KRS Road.', coordinates: '12.4047° N, 75.8284° E', country: 'India', city: 'Coorg', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Isha_Coorg_Center.jpg', tags: 'Spiritual, Meditation', rating: 4, notes: 'Peaceful rural retreat', is_visible: true },
  { id: 47, name: 'Coffee Plantations', description: 'Sprawling estates producing world-renowned Coorg coffee, tours and tastings offered.', coordinates: '12.3375° N, 75.8069° E', country: 'India', city: 'Coorg', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Coorg_Coffee_Plantation.jpg', tags: 'Nature, Agriculture, Coffee', rating: 5, notes: 'Famous for Arabica & Robusta', is_visible: true },
  { id: 48, name: 'Abbey Falls', description: 'Scenic waterfall nestled in coffee plantations near Madikeri.', coordinates: '12.4553° N, 75.7041° E', country: 'India', city: 'Coorg', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Abbey_Falls_Coorg.jpg', tags: 'Falls, Nature, Photography', rating: 5, notes: 'Best visited in monsoons', is_visible: true },
  { id: 49, name: 'Raja\'s Seat', description: 'Hilltop garden offering stunning views of valleys, sunset spot popular with visitors.', coordinates: '12.4246° N, 75.7391° E', country: 'India', city: 'Coorg', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Rajas_Seat_Coorg.jpg', tags: 'Viewpoint, Garden, Heritage', rating: 4, notes: 'Former seat of Coorg kings', is_visible: true },
  { id: 50, name: 'Dubare Elephant Camp', description: 'Sanctuary on the banks of River Cauvery, offers elephant bathing and safari.', coordinates: '12.3995° N, 75.9407° E', country: 'India', city: 'Coorg', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Dubare_Elephant_Camp.jpg', tags: 'Elephant, Nature, Camp', rating: 5, notes: 'Interact with elephants', is_visible: true },
  { id: 51, name: 'Talacauvery & Bhagamandala', description: 'Source of the River Cauvery, pilgrim center with temples and sacred tank.', coordinates: '12.4410° N, 75.6557° E', country: 'India', city: 'Coorg', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Talacauvery_Bhagamandala.jpg', tags: 'Temple, Nature, Pilgrimage', rating: 4, notes: 'Origin of river Cauvery', is_visible: true },
  { id: 52, name: 'Namdroling Monastery (Golden Temple, Bylakuppe)', description: 'Largest Tibetan Buddhist monastery in South India, golden statues, tranquil gardens.', coordinates: '12.4350° N, 75.9944° E', country: 'India', city: 'Bylakuppe', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Namdroling_Monastery_Coorg.jpg', tags: 'Monastery, Temple, Cultural', rating: 5, notes: 'Tibetan culture center', is_visible: true },
  { id: 53, name: 'Mullayanagiri Peak', description: 'Highest peak in Karnataka, offers trekking and panoramic views of Western Ghats.', coordinates: '13.3691° N, 75.7045° E', country: 'India', city: 'Chikmagalur', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Mullayanagiri_Chikmagalur.jpg', tags: 'Peak, Trek, Nature', rating: 5, notes: 'Highest point in Karnataka', is_visible: true },
  { id: 54, name: 'Baba Budangiri Hills', description: 'Sacred hill range, popular for scenic drives, trekking, and unique shrine.', coordinates: '13.4037° N, 75.7774° E', country: 'India', city: 'Chikmagalur', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Baba_Budangiri_Hills_Chikmagalur.jpg', tags: 'Hills, Trek, Shrine, Nature', rating: 5, notes: 'Dattatreya & Sufi shrines', is_visible: true },
  { id: 55, name: 'Manikyadhara Falls', description: 'Serene multi-stream waterfall nestled in Baba Budangiri hills, pilgrimage site.', coordinates: '13.41° N, 75.78° E', country: 'India', city: 'Chikmagalur', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Manikyadhara_Falls_Chikmagalur.jpg', tags: 'Falls, Nature, Pilgrimage', rating: 3, notes: 'Freshwater source and pilgrimage', is_visible: true },
  { id: 56, name: 'Jhari Falls', description: 'Hidden waterfall surrounded by coffee estates, requires a jeep ride near Chikmagalur.', coordinates: '13.4074° N, 75.8182° E', country: 'India', city: 'Chikmagalur', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Jhari_Falls_Chikmagalur.jpg', tags: 'Falls, Nature, Adventure', rating: 4, notes: '"Buttermilk" waterfall', is_visible: true },
  { id: 57, name: 'Om Beach', description: 'Curved beach known for Om symbol shape, water sports and backpacker vibe.', coordinates: '14.5176° N, 74.3108° E', country: 'India', city: 'Gokarna', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Gokarna_Om_Beach.jpg', tags: 'Beach, Nature, Backpacker', rating: 5, notes: 'Famous Om-shaped cove', is_visible: true },
  { id: 58, name: 'Kudle Beach', description: 'Laid-back beach popular with backpackers, scenic sunsets and yoga huts.', coordinates: '14.5301° N, 74.3122° E', country: 'India', city: 'Gokarna', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Kudle_Beach_Gokarna.jpg', tags: 'Beach, Nature, Backpacker', rating: 5, notes: 'Hostel and chill zone', is_visible: true },
  { id: 59, name: 'Half Moon Beach', description: 'Small remote beach accessible by hike or boat, great for peaceful swimming.', coordinates: '14.5113° N, 74.3085° E', country: 'India', city: 'Gokarna', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Half_Moon_Beach_Gokarna.jpg', tags: 'Beach, Nature, Remote', rating: 4, notes: 'Rocky cove, offbeat', is_visible: true },
  { id: 60, name: 'Paradise Beach', description: 'Hidden sandy beach, camping, boat access; popular for day outings.', coordinates: '14.5091° N, 74.3077° E', country: 'India', city: 'Gokarna', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Paradise_Beach_Gokarna.jpg', tags: 'Beach, Nature, Camping', rating: 4, notes: 'No road access, must hike/boat', is_visible: true },
  { id: 61, name: 'Gokarna Main Beach', description: 'Long stretch of sand at temple town, rituals and surfing popular.', coordinates: '14.5482° N, 74.3243° E', country: 'India', city: 'Gokarna', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Gokarna_Main_Beach.jpg', tags: 'Beach, Temple, Activity', rating: 4, notes: 'Nearest to town and temple', is_visible: true },
  { id: 62, name: 'Nirvana Beach', description: 'Tranquil, lesser-known beach across the river from Gokarna, ideal for solitude.', coordinates: '14.5696° N, 74.3392° E', country: 'India', city: 'Gokarna', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Nirvana_Beach_Gokarna.jpg', tags: 'Beach, Nature, Solitude', rating: 3, notes: 'Boat access from town', is_visible: true },
  { id: 63, name: 'Raigad Fort', description: 'Hilltop fort, capital of Maratha empire, site of Shivaji Maharaj\'s coronation.', coordinates: '18.2367° N, 73.4400° E', country: 'India', city: 'Raigad', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/r/r6/Raigad_fort.jpg', tags: 'Fort, Heritage, History', rating: 5, notes: 'Shivaji\'s capital fort', is_visible: true },
  { id: 64, name: 'Ropeway to Fort', description: 'Aerial cable car connecting foothills to Raigad Fort summit.', coordinates: '18.2367° N, 73.4400° E', country: 'India', city: 'Raigad', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Raigad_Ropeway.jpg', tags: 'Ropeway, Fort, Tourism', rating: 4, notes: 'Scenic ascent to fort', is_visible: true },
  { id: 65, name: 'Jagadishwar Temple', description: 'Temple inside Raigad Fort complex, Shivaji\'s personal place of worship.', coordinates: '18.2367° N, 73.4400° E', country: 'India', city: 'Raigad', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Jagadishwar_Temple_Raigad.jpg', tags: 'Temple, Heritage, History', rating: 4, notes: 'Royal temple in fort', is_visible: true },
  { id: 66, name: 'Samadhi of Shivaji Maharaj', description: 'Memorial site commemorating the resting place of Chhatrapati Shivaji Maharaj.', coordinates: '18.2367° N, 73.4400° E', country: 'India', city: 'Raigad', pin_type: 'Visited', pin_color: 'Red', images: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Shivaji_Maharaj_Samadhi_Raigad.jpg', tags: 'Memorial, History, Heritage', rating: 5, notes: 'Final resting place of Shivaji', is_visible: true }
];

// Function to parse coordinates from "12.5218° N, 76.8951° E" format
function parseCoordinates(coordStr: string): { lat: number; lng: number } {
  // Handle format like "12.5218° N, 76.8951° E"
  const degreeMatch = coordStr.match(/(\d+\.\d+)°\s*([NS]),\s*(\d+\.\d+)°\s*([EW])/);
  if (degreeMatch) {
    let lat = parseFloat(degreeMatch[1]);
    let lng = parseFloat(degreeMatch[3]);
    
    // Apply direction modifiers
    if (degreeMatch[2] === 'S') lat = -lat;
    if (degreeMatch[4] === 'W') lng = -lng;
    
    return { lat, lng };
  }
  
  // Fallback: remove degree symbols and direction letters, then split by comma
  const cleaned = coordStr.replace(/[°NSEW]/g, '').trim();
  const parts = cleaned.split(',').map(p => parseFloat(p.trim()));
  return { lat: parts[0] || 0, lng: parts[1] || 0 };
}

async function addNewTravelPins() {
  try {
    console.log('🚀 Starting to add new travel pins to database...');
    
    for (const pin of newTravelPinsData) {
      let pinData;
      try {
        const coordinates = parseCoordinates(pin.coordinates);
        const integerRating = Math.round(pin.rating);
        
        pinData = {
           name: pin.name,
           description: pin.description,
           coordinates: coordinates,
           country: pin.country,
           city: pin.city,
           pinType: pin.pin_type,
           pinColor: pin.pin_color,
           images: [pin.images],
           tags: pin.tags.split(', '),
           rating: integerRating,
           notes: pin.notes,
           isVisible: pin.is_visible,
           visitedDate: new Date(),
           createdAt: new Date(),
           updatedAt: new Date()
         };
        
        const [result] = await db.insert(travelPins).values(pinData).returning();
        
        console.log(`✅ Added: ${pin.name} (ID: ${result?.id})`);
      } catch (error) {
         if (error.message && error.message.includes('duplicate key')) {
           console.log(`⚠️  Skipped duplicate: ${pin.name}`);
         } else {
           console.error(`❌ Error adding ${pin.name}:`, error);
           if (pinData) {
             console.error('Pin data:', JSON.stringify(pinData, null, 2));
           }
         }
       }
    }
    
    console.log('🎉 All travel pins added successfully!');
  } catch (error) {
    console.error('❌ Error in addNewTravelPins:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

addNewTravelPins();