import 'dotenv/config';

const travelPinsData = [
  // Rajasthan
  { name: 'Jaipur City Palace', description: 'Magnificent royal palace complex in the Pink City', coordinates: [26.9260, 75.8235], country: 'India', city: 'Jaipur', pinType: 'historical', pinColor: 'red', tags: ['palace', 'heritage', 'rajasthan'], rating: 5, notes: 'Must visit royal heritage site' },
  { name: 'Udaipur Lake Palace', description: 'Floating palace on Lake Pichola', coordinates: [24.5760, 73.6830], country: 'India', city: 'Udaipur', pinType: 'historical', pinColor: 'red', tags: ['palace', 'lake', 'luxury'], rating: 5, notes: 'Romantic heritage hotel' },
  { name: 'Jaisalmer Fort', description: 'Golden fort in the Thar Desert', coordinates: [26.9157, 70.9083], country: 'India', city: 'Jaisalmer', pinType: 'historical', pinColor: 'red', tags: ['fort', 'desert', 'unesco'], rating: 5, notes: 'Living fort with shops and hotels' },
  { name: 'Jodhpur Mehrangarh Fort', description: 'Imposing fort overlooking the Blue City', coordinates: [26.2970, 73.0187], country: 'India', city: 'Jodhpur', pinType: 'historical', pinColor: 'red', tags: ['fort', 'museum', 'architecture'], rating: 5, notes: 'One of India\'s largest forts' },
  { name: 'Mount Abu Dilwara Temples', description: 'Exquisite Jain marble temples', coordinates: [24.5925, 72.7156], country: 'India', city: 'Mount Abu', pinType: 'religious', pinColor: 'red', tags: ['temple', 'jain', 'marble'], rating: 5, notes: 'Incredible marble craftsmanship' },
  
  // Kerala
  { name: 'Alleppey Backwaters', description: 'Serene network of canals and lagoons', coordinates: [9.4981, 76.3388], country: 'India', city: 'Alleppey', pinType: 'nature', pinColor: 'red', tags: ['backwaters', 'houseboat', 'kerala'], rating: 5, notes: 'Venice of the East' },
  { name: 'Munnar Tea Gardens', description: 'Rolling hills covered with tea plantations', coordinates: [10.0889, 77.0595], country: 'India', city: 'Munnar', pinType: 'nature', pinColor: 'red', tags: ['tea', 'hills', 'plantation'], rating: 5, notes: 'Beautiful hill station' },
  { name: 'Fort Kochi', description: 'Historic port city with colonial architecture', coordinates: [9.9658, 76.2427], country: 'India', city: 'Kochi', pinType: 'historical', pinColor: 'red', tags: ['colonial', 'port', 'heritage'], rating: 4, notes: 'Chinese fishing nets and spice markets' },
  { name: 'Varkala Beach', description: 'Cliff-top beach with natural springs', coordinates: [8.7379, 76.7160], country: 'India', city: 'Varkala', pinType: 'beach', pinColor: 'red', tags: ['beach', 'cliff', 'ayurveda'], rating: 4, notes: 'Spiritual beach destination' },
  { name: 'Thekkady Periyar Wildlife Sanctuary', description: 'Tiger reserve with boat safaris', coordinates: [9.5939, 77.1500], country: 'India', city: 'Thekkady', pinType: 'wildlife', pinColor: 'red', tags: ['wildlife', 'tiger', 'sanctuary'], rating: 4, notes: 'Elephant and tiger spotting' },
  
  // Tamil Nadu
  { name: 'Madurai Meenakshi Temple', description: 'Ancient temple with towering gopurams', coordinates: [9.9195, 78.1193], country: 'India', city: 'Madurai', pinType: 'religious', pinColor: 'red', tags: ['temple', 'dravidian', 'ancient'], rating: 5, notes: 'Architectural marvel' },
  { name: 'Ooty Hill Station', description: 'Queen of hill stations in Nilgiris', coordinates: [11.4064, 76.6932], country: 'India', city: 'Ooty', pinType: 'nature', pinColor: 'red', tags: ['hills', 'tea', 'colonial'], rating: 4, notes: 'Toy train and botanical gardens' },
  { name: 'Mahabalipuram Shore Temple', description: 'UNESCO World Heritage rock-cut temples', coordinates: [12.6208, 80.1982], country: 'India', city: 'Mahabalipuram', pinType: 'historical', pinColor: 'red', tags: ['unesco', 'temple', 'shore'], rating: 5, notes: 'Ancient Pallava architecture' },
  { name: 'Kodaikanal Lake', description: 'Star-shaped lake in hill station', coordinates: [10.2381, 77.4892], country: 'India', city: 'Kodaikanal', pinType: 'nature', pinColor: 'red', tags: ['lake', 'hills', 'boating'], rating: 4, notes: 'Princess of hill stations' },
  { name: 'Kanyakumari Sunset Point', description: 'Southernmost tip of India', coordinates: [8.0883, 77.5385], country: 'India', city: 'Kanyakumari', pinType: 'nature', pinColor: 'red', tags: ['sunset', 'confluence', 'tip'], rating: 4, notes: 'Three seas meet here' },
  
  // Karnataka
  { name: 'Hampi Ruins', description: 'UNESCO World Heritage Vijayanagara ruins', coordinates: [15.3350, 76.4600], country: 'India', city: 'Hampi', pinType: 'historical', pinColor: 'red', tags: ['unesco', 'ruins', 'vijayanagara'], rating: 5, notes: 'Ancient capital city ruins' },
  { name: 'Mysore Palace', description: 'Opulent royal palace with Indo-Saracenic architecture', coordinates: [12.3051, 76.6551], country: 'India', city: 'Mysore', pinType: 'historical', pinColor: 'red', tags: ['palace', 'royal', 'architecture'], rating: 5, notes: 'Illuminated palace during Dussehra' },
  { name: 'Coorg Coffee Plantations', description: 'Scotland of India with coffee estates', coordinates: [12.3375, 75.8069], country: 'India', city: 'Coorg', pinType: 'nature', pinColor: 'red', tags: ['coffee', 'hills', 'plantation'], rating: 4, notes: 'Misty hills and coffee aroma' },
  { name: 'Gokarna Beach', description: 'Pristine beaches and pilgrimage site', coordinates: [14.5492, 74.3200], country: 'India', city: 'Gokarna', pinType: 'beach', pinColor: 'red', tags: ['beach', 'pilgrimage', 'pristine'], rating: 4, notes: 'Om Beach and Kudle Beach' },
  { name: 'Bandipur National Park', description: 'Tiger reserve in Western Ghats', coordinates: [11.6840, 76.4340], country: 'India', city: 'Bandipur', pinType: 'wildlife', pinColor: 'red', tags: ['tiger', 'wildlife', 'ghats'], rating: 4, notes: 'Rich biodiversity' },
  
  // Uttar Pradesh
  { name: 'Varanasi Ghats', description: 'Spiritual capital on River Ganges', coordinates: [25.3176, 82.9739], country: 'India', city: 'Varanasi', pinType: 'religious', pinColor: 'red', tags: ['ganga', 'spiritual', 'ghats'], rating: 5, notes: 'Oldest living city' },
  { name: 'Fatehpur Sikri', description: 'Mughal architectural masterpiece', coordinates: [27.0945, 77.6618], country: 'India', city: 'Fatehpur Sikri', pinType: 'historical', pinColor: 'red', tags: ['mughal', 'unesco', 'architecture'], rating: 5, notes: 'Ghost city of Akbar' },
  { name: 'Lucknow Bara Imambara', description: 'Architectural wonder with maze', coordinates: [26.8695, 80.9115], country: 'India', city: 'Lucknow', pinType: 'historical', pinColor: 'red', tags: ['imambara', 'maze', 'nawabi'], rating: 4, notes: 'Bhool Bhulaiya maze' },
  { name: 'Mathura Krishna Janmabhoomi', description: 'Birthplace of Lord Krishna', coordinates: [27.4924, 77.6737], country: 'India', city: 'Mathura', pinType: 'religious', pinColor: 'red', tags: ['krishna', 'birthplace', 'temple'], rating: 5, notes: 'Sacred pilgrimage site' },
  { name: 'Ayodhya Ram Janmabhoomi', description: 'Birthplace of Lord Rama', coordinates: [26.7922, 82.1998], country: 'India', city: 'Ayodhya', pinType: 'religious', pinColor: 'red', tags: ['rama', 'birthplace', 'temple'], rating: 5, notes: 'Holy city of Ramayana' },
  
  // Maharashtra
  { name: 'Mumbai Gateway of India', description: 'Iconic monument overlooking Arabian Sea', coordinates: [18.9220, 72.8347], country: 'India', city: 'Mumbai', pinType: 'historical', pinColor: 'red', tags: ['monument', 'mumbai', 'colonial'], rating: 4, notes: 'Symbol of Mumbai' },
  { name: 'Ajanta Caves', description: 'UNESCO Buddhist rock-cut caves', coordinates: [20.5519, 75.7033], country: 'India', city: 'Aurangabad', pinType: 'historical', pinColor: 'red', tags: ['unesco', 'buddhist', 'caves'], rating: 5, notes: 'Ancient Buddhist art' },
  { name: 'Ellora Caves', description: 'Multi-religious rock-cut temples', coordinates: [20.0269, 75.1791], country: 'India', city: 'Aurangabad', pinType: 'historical', pinColor: 'red', tags: ['unesco', 'caves', 'temples'], rating: 5, notes: 'Hindu, Buddhist, Jain caves' },
  { name: 'Lonavala Hill Station', description: 'Monsoon getaway near Mumbai', coordinates: [18.7537, 73.4068], country: 'India', city: 'Lonavala', pinType: 'nature', pinColor: 'red', tags: ['hills', 'monsoon', 'waterfalls'], rating: 4, notes: 'Tiger Point and Bhushi Dam' },
  { name: 'Shirdi Sai Baba Temple', description: 'Sacred shrine of Sai Baba', coordinates: [19.7645, 74.4769], country: 'India', city: 'Shirdi', pinType: 'religious', pinColor: 'red', tags: ['sai', 'temple', 'pilgrimage'], rating: 5, notes: 'Devotional center' },
  
  // Gujarat
  { name: 'Somnath Temple', description: 'First among twelve Jyotirlingas', coordinates: [20.8880, 70.4017], country: 'India', city: 'Somnath', pinType: 'religious', pinColor: 'red', tags: ['jyotirlinga', 'shiva', 'temple'], rating: 5, notes: 'Sacred Shiva temple' },
  { name: 'Rann of Kutch', description: 'White salt desert landscape', coordinates: [23.8315, 69.6293], country: 'India', city: 'Kutch', pinType: 'nature', pinColor: 'red', tags: ['desert', 'salt', 'festival'], rating: 5, notes: 'Rann Utsav festival' },
  { name: 'Dwarka Krishna Temple', description: 'Ancient Krishna pilgrimage site', coordinates: [22.2394, 68.9678], country: 'India', city: 'Dwarka', pinType: 'religious', pinColor: 'red', tags: ['krishna', 'dwarka', 'pilgrimage'], rating: 5, notes: 'One of Char Dham' },
  { name: 'Gir National Park', description: 'Last refuge of Asiatic lions', coordinates: [21.1247, 70.7951], country: 'India', city: 'Gir', pinType: 'wildlife', pinColor: 'red', tags: ['lion', 'wildlife', 'sanctuary'], rating: 5, notes: 'Asiatic lion habitat' },
  { name: 'Statue of Unity', description: 'World\'s tallest statue of Sardar Patel', coordinates: [21.8380, 73.7191], country: 'India', city: 'Kevadia', pinType: 'monument', pinColor: 'red', tags: ['statue', 'patel', 'tallest'], rating: 4, notes: 'Engineering marvel' },
  
  // Himachal Pradesh
  { name: 'Shimla Mall Road', description: 'Colonial hill station and summer capital', coordinates: [31.1048, 77.1734], country: 'India', city: 'Shimla', pinType: 'nature', pinColor: 'red', tags: ['hills', 'colonial', 'mall'], rating: 4, notes: 'Queen of Hills' },
  { name: 'Manali Solang Valley', description: 'Adventure sports and snow activities', coordinates: [32.3078, 77.1734], country: 'India', city: 'Manali', pinType: 'adventure', pinColor: 'red', tags: ['adventure', 'snow', 'skiing'], rating: 4, notes: 'Paragliding and skiing' },
  { name: 'Dharamshala McLeod Ganj', description: 'Home of Dalai Lama and Tibetan culture', coordinates: [32.2190, 76.3234], country: 'India', city: 'Dharamshala', pinType: 'spiritual', pinColor: 'red', tags: ['dalai', 'tibetan', 'monastery'], rating: 4, notes: 'Little Lhasa' },
  { name: 'Spiti Valley', description: 'Cold desert mountain valley', coordinates: [32.2396, 78.0515], country: 'India', city: 'Spiti', pinType: 'nature', pinColor: 'red', tags: ['desert', 'mountain', 'monastery'], rating: 5, notes: 'Land of Lamas' },
  { name: 'Kullu Valley', description: 'Valley of Gods with apple orchards', coordinates: [31.9578, 77.1734], country: 'India', city: 'Kullu', pinType: 'nature', pinColor: 'red', tags: ['valley', 'apple', 'river'], rating: 4, notes: 'Beas River valley' },
  
  // Jammu & Kashmir
  { name: 'Srinagar Dal Lake', description: 'Paradise on Earth with houseboats', coordinates: [34.0837, 74.7973], country: 'India', city: 'Srinagar', pinType: 'nature', pinColor: 'red', tags: ['lake', 'houseboat', 'paradise'], rating: 5, notes: 'Shikara rides and floating gardens' },
  { name: 'Gulmarg Ski Resort', description: 'Premier skiing destination in Kashmir', coordinates: [34.0484, 74.3896], country: 'India', city: 'Gulmarg', pinType: 'adventure', pinColor: 'red', tags: ['skiing', 'gondola', 'snow'], rating: 5, notes: 'World\'s second highest gondola' },
  { name: 'Pahalgam Valley', description: 'Valley of Shepherds and Bollywood films', coordinates: [34.0169, 75.3312], country: 'India', city: 'Pahalgam', pinType: 'nature', pinColor: 'red', tags: ['valley', 'river', 'trekking'], rating: 4, notes: 'Lidder River and pine forests' },
  { name: 'Leh Ladakh', description: 'Land of high passes and monasteries', coordinates: [34.1526, 77.5770], country: 'India', city: 'Leh', pinType: 'adventure', pinColor: 'red', tags: ['ladakh', 'monastery', 'desert'], rating: 5, notes: 'Cold desert and Buddhist culture' },
  { name: 'Amarnath Cave', description: 'Sacred ice lingam pilgrimage', coordinates: [34.2328, 75.4867], country: 'India', city: 'Amarnath', pinType: 'religious', pinColor: 'red', tags: ['cave', 'shiva', 'pilgrimage'], rating: 5, notes: 'Holy ice formation' },
  
  // West Bengal
  { name: 'Kolkata Victoria Memorial', description: 'Marble monument to Queen Victoria', coordinates: [22.5448, 88.3426], country: 'India', city: 'Kolkata', pinType: 'historical', pinColor: 'red', tags: ['memorial', 'colonial', 'museum'], rating: 4, notes: 'City of Joy landmark' },
  { name: 'Darjeeling Tea Gardens', description: 'Queen of Hills with toy train', coordinates: [27.0360, 88.2627], country: 'India', city: 'Darjeeling', pinType: 'nature', pinColor: 'red', tags: ['tea', 'hills', 'train'], rating: 4, notes: 'UNESCO toy train' },
  { name: 'Sundarbans Mangrove Forest', description: 'UNESCO World Heritage tiger reserve', coordinates: [21.9497, 88.4297], country: 'India', city: 'Sundarbans', pinType: 'wildlife', pinColor: 'red', tags: ['mangrove', 'tiger', 'unesco'], rating: 5, notes: 'Royal Bengal tiger habitat' },
  { name: 'Kalimpong Hill Station', description: 'Flower town with panoramic views', coordinates: [27.0669, 88.4686], country: 'India', city: 'Kalimpong', pinType: 'nature', pinColor: 'red', tags: ['hills', 'flowers', 'monastery'], rating: 4, notes: 'Orchid and cactus nurseries' },
  { name: 'Shantiniketan Visva Bharati', description: 'Tagore\'s university town', coordinates: [23.6793, 87.6777], country: 'India', city: 'Shantiniketan', pinType: 'cultural', pinColor: 'red', tags: ['tagore', 'university', 'culture'], rating: 4, notes: 'Nobel laureate\'s creation' },
  
  // Goa
  { name: 'Calangute Beach', description: 'Queen of Beaches with water sports', coordinates: [15.5430, 73.7551], country: 'India', city: 'Calangute', pinType: 'beach', pinColor: 'red', tags: ['beach', 'water', 'sports'], rating: 4, notes: 'Crowded but vibrant beach' },
  { name: 'Basilica of Bom Jesus', description: 'UNESCO World Heritage church', coordinates: [15.5009, 73.9115], country: 'India', city: 'Old Goa', pinType: 'religious', pinColor: 'red', tags: ['church', 'unesco', 'portuguese'], rating: 5, notes: 'St. Francis Xavier\'s remains' },
  { name: 'Dudhsagar Waterfalls', description: 'Four-tiered waterfall in Western Ghats', coordinates: [15.3144, 74.3144], country: 'India', city: 'Mollem', pinType: 'nature', pinColor: 'red', tags: ['waterfall', 'ghats', 'trekking'], rating: 4, notes: 'Sea of Milk falls' },
  { name: 'Anjuna Beach', description: 'Hippie culture and flea markets', coordinates: [15.5735, 73.7400], country: 'India', city: 'Anjuna', pinType: 'beach', pinColor: 'red', tags: ['beach', 'hippie', 'market'], rating: 4, notes: 'Wednesday flea market' },
  { name: 'Palolem Beach', description: 'Crescent-shaped pristine beach', coordinates: [15.0100, 74.0233], country: 'India', city: 'Palolem', pinType: 'beach', pinColor: 'red', tags: ['beach', 'pristine', 'crescent'], rating: 4, notes: 'Silent noise policy' },
  
  // Odisha
  { name: 'Konark Sun Temple', description: 'UNESCO World Heritage chariot temple', coordinates: [19.8876, 86.0945], country: 'India', city: 'Konark', pinType: 'historical', pinColor: 'red', tags: ['sun', 'temple', 'unesco'], rating: 5, notes: 'Stone chariot architecture' },
  { name: 'Jagannath Temple Puri', description: 'Sacred Char Dham pilgrimage site', coordinates: [19.8135, 85.8312], country: 'India', city: 'Puri', pinType: 'religious', pinColor: 'red', tags: ['jagannath', 'char', 'dham'], rating: 5, notes: 'Annual Rath Yatra festival' },
  { name: 'Chilika Lake', description: 'Largest coastal lagoon in India', coordinates: [19.7179, 85.3206], country: 'India', city: 'Chilika', pinType: 'nature', pinColor: 'red', tags: ['lake', 'lagoon', 'birds'], rating: 4, notes: 'Migratory bird sanctuary' },
  { name: 'Lingaraj Temple Bhubaneswar', description: 'Ancient Shiva temple complex', coordinates: [20.2379, 85.8338], country: 'India', city: 'Bhubaneswar', pinType: 'religious', pinColor: 'red', tags: ['shiva', 'temple', 'ancient'], rating: 4, notes: 'Temple city of India' },
  { name: 'Simlipal National Park', description: 'Tiger reserve with waterfalls', coordinates: [21.6167, 86.7333], country: 'India', city: 'Simlipal', pinType: 'wildlife', pinColor: 'red', tags: ['tiger', 'waterfall', 'tribal'], rating: 4, notes: 'Biosphere reserve' },
  
  // Madhya Pradesh
  { name: 'Khajuraho Temples', description: 'UNESCO World Heritage erotic sculptures', coordinates: [24.8318, 79.9199], country: 'India', city: 'Khajuraho', pinType: 'historical', pinColor: 'red', tags: ['unesco', 'temple', 'sculpture'], rating: 5, notes: 'Chandela dynasty temples' },
  { name: 'Kanha National Park', description: 'Tiger reserve inspiring Jungle Book', coordinates: [22.3344, 80.6119], country: 'India', city: 'Kanha', pinType: 'wildlife', pinColor: 'red', tags: ['tiger', 'jungle', 'book'], rating: 5, notes: 'Barasingha deer habitat' },
  { name: 'Sanchi Stupa', description: 'UNESCO Buddhist monument', coordinates: [23.4793, 77.7398], country: 'India', city: 'Sanchi', pinType: 'historical', pinColor: 'red', tags: ['buddhist', 'stupa', 'unesco'], rating: 5, notes: 'Ashoka\'s Buddhist site' },
  { name: 'Ujjain Mahakaleshwar', description: 'One of twelve Jyotirlingas', coordinates: [23.1765, 75.7885], country: 'India', city: 'Ujjain', pinType: 'religious', pinColor: 'red', tags: ['jyotirlinga', 'shiva', 'kumbh'], rating: 5, notes: 'Kumbh Mela site' },
  { name: 'Pachmarhi Hill Station', description: 'Queen of Satpura with caves', coordinates: [22.4676, 78.4336], country: 'India', city: 'Pachmarhi', pinType: 'nature', pinColor: 'red', tags: ['hills', 'caves', 'waterfalls'], rating: 4, notes: 'Satpura Tiger Reserve' },
  
  // Punjab
  { name: 'Golden Temple Amritsar', description: 'Holiest Sikh shrine with golden dome', coordinates: [31.6200, 74.8765], country: 'India', city: 'Amritsar', pinType: 'religious', pinColor: 'red', tags: ['sikh', 'golden', 'temple'], rating: 5, notes: 'Harmandir Sahib' },
  { name: 'Jallianwala Bagh', description: 'Memorial of 1919 massacre', coordinates: [31.6205, 74.8799], country: 'India', city: 'Amritsar', pinType: 'historical', pinColor: 'red', tags: ['memorial', 'freedom', 'struggle'], rating: 4, notes: 'Independence movement site' },
  { name: 'Wagah Border', description: 'India-Pakistan border ceremony', coordinates: [31.6044, 74.5736], country: 'India', city: 'Wagah', pinType: 'cultural', pinColor: 'red', tags: ['border', 'ceremony', 'patriotic'], rating: 4, notes: 'Evening flag ceremony' },
  { name: 'Anandpur Sahib', description: 'Birthplace of Khalsa', coordinates: [31.2390, 76.5048], country: 'India', city: 'Anandpur Sahib', pinType: 'religious', pinColor: 'red', tags: ['sikh', 'khalsa', 'guru'], rating: 4, notes: 'Guru Gobind Singh\'s city' },
  { name: 'Patiala Qila Mubarak', description: 'Royal palace complex', coordinates: [30.3398, 76.3869], country: 'India', city: 'Patiala', pinType: 'historical', pinColor: 'red', tags: ['palace', 'royal', 'sikh'], rating: 4, notes: 'Sikh heritage palace' },
  
  // Haryana
  { name: 'Kurukshetra Battlefield', description: 'Mahabharata war site and Krishna\'s Gita', coordinates: [29.9647, 76.8281], country: 'India', city: 'Kurukshetra', pinType: 'religious', pinColor: 'red', tags: ['mahabharata', 'gita', 'krishna'], rating: 5, notes: 'Sacred battlefield' },
  { name: 'Sultanpur Bird Sanctuary', description: 'Migratory bird watching paradise', coordinates: [28.4645, 76.8956], country: 'India', city: 'Sultanpur', pinType: 'wildlife', pinColor: 'red', tags: ['birds', 'migratory', 'sanctuary'], rating: 4, notes: 'Winter bird migration' },
  { name: 'Panipat Battlefield', description: 'Historic battle sites', coordinates: [29.3909, 76.9635], country: 'India', city: 'Panipat', pinType: 'historical', pinColor: 'red', tags: ['battle', 'history', 'mughal'], rating: 3, notes: 'Three historic battles' },
  { name: 'Faridabad Surajkund', description: 'Ancient reservoir and crafts fair', coordinates: [28.5021, 77.2749], country: 'India', city: 'Faridabad', pinType: 'cultural', pinColor: 'red', tags: ['crafts', 'fair', 'reservoir'], rating: 3, notes: 'Annual crafts mela' },
  { name: 'Pinjore Gardens', description: 'Mughal-style terraced gardens', coordinates: [30.7983, 76.9094], country: 'India', city: 'Pinjore', pinType: 'nature', pinColor: 'red', tags: ['garden', 'mughal', 'terraced'], rating: 4, notes: 'Yadavindra Gardens' },
  
  // Assam
  { name: 'Kaziranga National Park', description: 'UNESCO World Heritage one-horned rhino sanctuary', coordinates: [26.5775, 93.1714], country: 'India', city: 'Kaziranga', pinType: 'wildlife', pinColor: 'red', tags: ['rhino', 'unesco', 'elephant'], rating: 5, notes: 'Two-thirds of world\'s rhinos' },
  { name: 'Kamakhya Temple Guwahati', description: 'Shakti Pitha temple on Nilachal Hill', coordinates: [26.1665, 91.7044], country: 'India', city: 'Guwahati', pinType: 'religious', pinColor: 'red', tags: ['shakti', 'temple', 'tantric'], rating: 5, notes: 'Tantric temple' },
  { name: 'Majuli Island', description: 'World\'s largest river island', coordinates: [27.0230, 94.2154], country: 'India', city: 'Majuli', pinType: 'cultural', pinColor: 'red', tags: ['island', 'culture', 'satras'], rating: 4, notes: 'Vaishnavite monasteries' },
  { name: 'Manas National Park', description: 'UNESCO World Heritage tiger and elephant reserve', coordinates: [26.7050, 90.8636], country: 'India', city: 'Manas', pinType: 'wildlife', pinColor: 'red', tags: ['tiger', 'elephant', 'unesco'], rating: 4, notes: 'Biosphere reserve' },
  { name: 'Sivasagar Ahom Monuments', description: 'Ahom dynasty palaces and temples', coordinates: [26.9708, 94.6378], country: 'India', city: 'Sivasagar', pinType: 'historical', pinColor: 'red', tags: ['ahom', 'palace', 'temple'], rating: 4, notes: 'Ahom capital remains' },
  
  // Bihar
  { name: 'Bodh Gaya Mahabodhi Temple', description: 'UNESCO site where Buddha attained enlightenment', coordinates: [24.6958, 84.9917], country: 'India', city: 'Bodh Gaya', pinType: 'religious', pinColor: 'red', tags: ['buddha', 'enlightenment', 'unesco'], rating: 5, notes: 'Bodhi Tree site' },
  { name: 'Nalanda University Ruins', description: 'Ancient Buddhist university ruins', coordinates: [25.1358, 85.4479], country: 'India', city: 'Nalanda', pinType: 'historical', pinColor: 'red', tags: ['university', 'buddhist', 'ancient'], rating: 5, notes: 'World\'s first university' },
  { name: 'Rajgir Hot Springs', description: 'Ancient capital with hot springs', coordinates: [25.0258, 85.4211], country: 'India', city: 'Rajgir', pinType: 'nature', pinColor: 'red', tags: ['springs', 'ancient', 'buddhist'], rating: 4, notes: 'Buddha\'s retreat place' },
  { name: 'Vikramshila University Ruins', description: 'Buddhist learning center ruins', coordinates: [25.3333, 87.3167], country: 'India', city: 'Bhagalpur', pinType: 'historical', pinColor: 'red', tags: ['university', 'buddhist', 'ruins'], rating: 4, notes: 'Pala dynasty university' },
  { name: 'Patna Golghar', description: 'Granary with spiral staircase', coordinates: [25.6093, 85.1376], country: 'India', city: 'Patna', pinType: 'historical', pinColor: 'red', tags: ['granary', 'british', 'architecture'], rating: 3, notes: 'British-era granary' },
  
  // Jharkhand
  { name: 'Betla National Park', description: 'Tiger reserve in Chota Nagpur plateau', coordinates: [23.8833, 84.1833], country: 'India', city: 'Betla', pinType: 'wildlife', pinColor: 'red', tags: ['tiger', 'plateau', 'tribal'], rating: 4, notes: 'Palamau Tiger Reserve' },
  { name: 'Baidyanath Dham Deoghar', description: 'One of twelve Jyotirlingas', coordinates: [24.4833, 86.7000], country: 'India', city: 'Deoghar', pinType: 'religious', pinColor: 'red', tags: ['jyotirlinga', 'shiva', 'pilgrimage'], rating: 5, notes: 'Shravan month pilgrimage' },
  { name: 'Hundru Falls', description: 'Spectacular waterfall near Ranchi', coordinates: [23.4167, 85.5833], country: 'India', city: 'Ranchi', pinType: 'nature', pinColor: 'red', tags: ['waterfall', 'subarnarekha', 'scenic'], rating: 4, notes: '320 feet high falls' },
  { name: 'Netarhat Hill Station', description: 'Queen of Chotanagpur with sunrise views', coordinates: [23.4667, 84.2667], country: 'India', city: 'Netarhat', pinType: 'nature', pinColor: 'red', tags: ['hills', 'sunrise', 'plateau'], rating: 4, notes: 'Chota Nagpur plateau' },
  { name: 'Parasnath Hill', description: 'Highest peak and Jain pilgrimage site', coordinates: [23.9667, 86.1667], country: 'India', city: 'Parasnath', pinType: 'religious', pinColor: 'red', tags: ['jain', 'peak', 'pilgrimage'], rating: 4, notes: 'Jain Tirthankara site' },
  
  // Chhattisgarh
  { name: 'Chitrakote Falls', description: 'Niagara of India on Indravati River', coordinates: [19.1833, 81.7833], country: 'India', city: 'Chitrakote', pinType: 'nature', pinColor: 'red', tags: ['waterfall', 'niagara', 'indravati'], rating: 4, notes: 'Horseshoe-shaped falls' },
  { name: 'Bhoramdeo Temple', description: 'Khajuraho of Chhattisgarh', coordinates: [21.4167, 81.1167], country: 'India', city: 'Bhoramdeo', pinType: 'historical', pinColor: 'red', tags: ['temple', 'sculpture', 'nagara'], rating: 4, notes: 'Erotic sculptures' },
  { name: 'Kanger Valley National Park', description: 'Limestone caves and tribal culture', coordinates: [18.8167, 81.9167], country: 'India', city: 'Kanger', pinType: 'nature', pinColor: 'red', tags: ['caves', 'tribal', 'limestone'], rating: 4, notes: 'Kutumsar and Kailash caves' },
  { name: 'Sirpur Archaeological Site', description: 'Ancient Buddhist and Hindu ruins', coordinates: [21.2000, 82.8667], country: 'India', city: 'Sirpur', pinType: 'historical', pinColor: 'red', tags: ['buddhist', 'hindu', 'ruins'], rating: 4, notes: 'Lakshmana Temple' },
  { name: 'Tirathgarh Falls', description: 'Multi-tiered waterfall in Bastar', coordinates: [18.9000, 81.6833], country: 'India', city: 'Tirathgarh', pinType: 'nature', pinColor: 'red', tags: ['waterfall', 'bastar', 'tribal'], rating: 4, notes: 'Seven-step waterfall' },
  
  // Sikkim
  { name: 'Gangtok MG Marg', description: 'Capital city with Kanchenjunga views', coordinates: [27.3389, 88.6065], country: 'India', city: 'Gangtok', pinType: 'nature', pinColor: 'red', tags: ['capital', 'kanchenjunga', 'monastery'], rating: 4, notes: 'Rumtek Monastery nearby' },
  { name: 'Nathula Pass', description: 'Indo-China border at 14,140 feet', coordinates: [27.3917, 88.8417], country: 'India', city: 'Nathula', pinType: 'adventure', pinColor: 'red', tags: ['border', 'pass', 'china'], rating: 4, notes: 'Historic Silk Route' },
  { name: 'Yuksom First Capital', description: 'First capital of Sikkim', coordinates: [27.3667, 88.2167], country: 'India', city: 'Yuksom', pinType: 'historical', pinColor: 'red', tags: ['capital', 'coronation', 'trekking'], rating: 4, notes: 'Kanchenjunga trek base' },
  { name: 'Pelling Monastery Views', description: 'Spectacular Kanchenjunga sunrise views', coordinates: [27.2167, 88.2167], country: 'India', city: 'Pelling', pinType: 'nature', pinColor: 'red', tags: ['monastery', 'sunrise', 'kanchenjunga'], rating: 4, notes: 'Pemayangtse Monastery' },
  { name: 'Tsomgo Lake', description: 'Sacred glacial lake at 12,400 feet', coordinates: [27.4000, 88.7500], country: 'India', city: 'Tsomgo', pinType: 'nature', pinColor: 'red', tags: ['lake', 'glacial', 'sacred'], rating: 4, notes: 'Changu Lake' }
];

async function bulkInsertPins() {
  try {
    // First, login to get a valid session
    console.log('Logging in...');
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'admin', password: 'Travel@2025' })
    });
    
    if (!loginResponse.ok) {
      throw new Error('Login failed');
    }
    
    // Extract session cookie from login response
    const setCookieHeader = loginResponse.headers.get('set-cookie');
    const sessionCookie = setCookieHeader ? setCookieHeader.split(';')[0] : '';
    
    console.log('Login successful, sending bulk insert request...');
    
    const response = await fetch('http://localhost:5000/api/travel-pins/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie
      },
      body: JSON.stringify({ pins: travelPinsData })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Success:', result.message);
    console.log(`Added ${result.pins?.length || 0} travel pins`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

bulkInsertPins();