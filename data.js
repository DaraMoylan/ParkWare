/*
 *              30 units of Mock Data
 * 
 *   name          - Display name of the car park 
 *   position      - GPS coordinates { lat, lng } for the Google Maps marker
 *   total         - Total number of parking spaces
 *   occupied      - How many are currently taken (this gets mutated by refreshData)
 *   id            - Unique identifier
 *   type          - Category string used for badge styling in the detail panel
 *                   One of: "public", "shopping", "university", "hotel", 
 *                   "street", "hospital", "business"
 *   hourlyRate    - Cost per hour in euros (0 = free parking)
 *   maxDailyRate  - Daily cap in euros (null = no cap / pay-per-hour only)
 *   openingHours  - Human-readable opening times
 */

// array of objects for to be used in index.html
const parkingLots = [

    
    // CITY CENTRE
    

    {
        name: "Eyre Square Car Park",
        position: { lat: 53.2747, lng: -9.0492 },
        total: 200,
        occupied: 120,
        id: 1,
        type: "public",
        hourlyRate: 2.50,
        maxDailyRate: 15,
        openingHours: "24/7"
    },
    {
        name: "Galway Shopping Centre",
        position: { lat: 53.2752, lng: -9.0474 },
        total: 350,
        occupied: 280,
        id: 2,
        type: "shopping",
        hourlyRate: 2.00,
        maxDailyRate: 12,
        openingHours: "7:00 - 23:00"
    },
    {
        name: "Jurys Inn Car Park",
        position: { lat: 53.2698, lng: -9.0532 },
        total: 150,
        occupied: 45,
        id: 3,
        type: "hotel",
        hourlyRate: 3.00,
        maxDailyRate: 20,
        openingHours: "24/7"
    },
    {
        name: "Hynes Yard Car Park",
        position: { lat: 53.2736, lng: -9.0515 },
        total: 100,
        occupied: 85,
        id: 4,
        type: "public",
        hourlyRate: 2.50,
        maxDailyRate: 15,
        openingHours: "7:00 - 22:00"
    },
    {
        name: "Market Street Car Park",
        position: { lat: 53.2715, lng: -9.0547 },
        total: 180,
        occupied: 160,
        id: 5,
        type: "public",
        hourlyRate: 2.00,
        maxDailyRate: 12,
        openingHours: "6:00 - 00:00"
    },
    {
        name: "Docks Car Park",
        position: { lat: 53.2694, lng: -9.0495 },
        total: 250,
        occupied: 125,
        id: 6,
        type: "public",
        hourlyRate: 1.50,
        maxDailyRate: 10,
        openingHours: "24/7"
    },
    {
        name: "Cathedral Car Park",
        position: { lat: 53.2757, lng: -9.0573 },
        total: 120,
        occupied: 60,
        id: 7,
        type: "public",
        hourlyRate: 2.00,
        maxDailyRate: 12,
        openingHours: "7:00 - 21:00"
    },
    {
        name: "Spanish Arch Public Parking",
        position: { lat: 53.2696, lng: -9.0545 },
        total: 80,
        occupied: 72,
        id: 8,
        type: "street",
        hourlyRate: 1.80,
        maxDailyRate: null,
        openingHours: "8:00 - 18:00"
    },

    
    // ATU GALWAY (Dublin Road campus)
  

    {
        name: "ATU Student Parking East",
        position: { lat: 53.2788, lng: -9.0108 },
        total: 450,
        occupied: 380,
        id: 9,
        type: "university",
        hourlyRate: 1.00,
        maxDailyRate: 5,
        openingHours: "7:00 - 22:00"
    },
    {
        name: "ATU Visitor Parking",
        position: { lat: 53.2795, lng: -9.0095 },
        total: 120,
        occupied: 45,
        id: 10,
        type: "university",
        hourlyRate: 2.00,
        maxDailyRate: 8,
        openingHours: "8:00 - 18:00"
    },
    {
        name: "ATU Staff Parking North",
        position: { lat: 53.2802, lng: -9.0112 },
        total: 200,
        occupied: 156,
        id: 11,
        type: "university",
        hourlyRate: 0.50,
        maxDailyRate: 3,
        openingHours: "6:00 - 23:00"
    },
    {
        name: "Dublin Road Public Parking",
        position: { lat: 53.2778, lng: -9.0125 },
        total: 80,
        occupied: 65,
        id: 12,
        type: "street",
        hourlyRate: 1.80,
        maxDailyRate: null,
        openingHours: "8:00 - 18:00"
    },
    {
        name: "ATU Sports Complex Parking",
        position: { lat: 53.2812, lng: -9.0098 },
        total: 150,
        occupied: 30,
        id: 13,
        type: "university",
        hourlyRate: 1.00,
        maxDailyRate: 5,
        openingHours: "6:00 - 22:00"
    },
    {
        name: "Merlin Park Shopping Centre",
        position: { lat: 53.2765, lng: -9.0142 },
        total: 280,
        occupied: 195,
        id: 14,
        type: "shopping",
        hourlyRate: 0,
        maxDailyRate: 0,
        openingHours: "8:00 - 22:00"
    },

    
    // UNIVERSITY OF GALWAY
    
    {
        name: "UoG Main Campus Parking",
        position: { lat: 53.2797, lng: -9.0615 },
        total: 600,
        occupied: 480,
        id: 15,
        type: "university",
        hourlyRate: 1.50,
        maxDailyRate: 6,
        openingHours: "7:00 - 23:00"
    },
    {
        name: "UoG North Campus Parking",
        position: { lat: 53.2835, lng: -9.0598 },
        total: 350,
        occupied: 290,
        id: 16,
        type: "university",
        hourlyRate: 1.50,
        maxDailyRate: 6,
        openingHours: "7:00 - 22:00"
    },
    {
        name: "UoG Sports Centre Parking",
        position: { lat: 53.2812, lng: -9.0642 },
        total: 200,
        occupied: 85,
        id: 17,
        type: "university",
        hourlyRate: 1.00,
        maxDailyRate: 5,
        openingHours: "6:00 - 23:00"
    },
    {
        name: "University Road Public Parking",
        position: { lat: 53.2778, lng: -9.0625 },
        total: 60,
        occupied: 55,
        id: 18,
        type: "street",
        hourlyRate: 2.00,
        maxDailyRate: null,
        openingHours: "8:00 - 18:00"
    },
    {
        name: "UoG Library Parking",
        position: { lat: 53.2805, lng: -9.0585 },
        total: 180,
        occupied: 165,
        id: 19,
        type: "university",
        hourlyRate: 1.50,
        maxDailyRate: 6,
        openingHours: "8:00 - 23:00"
    },
    {
        name: "UoG Engineering Building Parking",
        position: { lat: 53.2825, lng: -9.0628 },
        total: 220,
        occupied: 140,
        id: 20,
        type: "university",
        hourlyRate: 1.50,
        maxDailyRate: 6,
        openingHours: "7:00 - 21:00"
    },
    {
        name: "UoG Student Residence Parking",
        position: { lat: 53.2843, lng: -9.0652 },
        total: 400,
        occupied: 320,
        id: 21,
        type: "university",
        hourlyRate: 0.50,
        maxDailyRate: 3,
        openingHours: "24/7"
    },
    {
        name: "Newcastle Road Student Parking",
        position: { lat: 53.2768, lng: -9.0598 },
        total: 150,
        occupied: 128,
        id: 22,
        type: "public",
        hourlyRate: 1.80,
        maxDailyRate: 10,
        openingHours: "7:00 - 22:00"
    },

    
    // BETWEEN BOTH UNIVERSITIES
   

    {
        name: "Distillery Road Parking",
        position: { lat: 53.2782, lng: -9.0382 },
        total: 90,
        occupied: 45,
        id: 23,
        type: "public",
        hourlyRate: 1.50,
        maxDailyRate: 8,
        openingHours: "7:00 - 20:00"
    },
    {
        name: "IDA Business Park Parking",
        position: { lat: 53.2798, lng: -9.0352 },
        total: 300,
        occupied: 210,
        id: 24,
        type: "business",
        hourlyRate: 0,
        maxDailyRate: 0,
        openingHours: "6:00 - 22:00"
    },
    {
        name: "Shantalla Community Parking",
        position: { lat: 53.2765, lng: -9.0485 },
        total: 70,
        occupied: 35,
        id: 25,
        type: "public",
        hourlyRate: 1.00,
        maxDailyRate: 6,
        openingHours: "8:00 - 20:00"
    },

    
    // CITY CENTRE (continued) & SALTHILL
    

    {
        name: "Woodquay Court Parking",
        position: { lat: 53.2743, lng: -9.0568 },
        total: 140,
        occupied: 112,
        id: 26,
        type: "public",
        hourlyRate: 2.50,
        maxDailyRate: 15,
        openingHours: "7:00 - 23:00"
    },
    {
        name: "Salthill Promenade Parking",
        position: { lat: 53.2572, lng: -9.0908 },
        total: 200,
        occupied: 60,
        id: 27,
        type: "public",
        hourlyRate: 1.00,
        maxDailyRate: 5,
        openingHours: "24/7"
    },
    {
        name: "Claddagh Quay Parking",
        position: { lat: 53.2688, lng: -9.0572 },
        total: 110,
        occupied: 88,
        id: 28,
        type: "public",
        hourlyRate: 2.00,
        maxDailyRate: 10,
        openingHours: "7:00 - 22:00"
    },
    {
        name: "Terryland Retail Park",
        position: { lat: 53.2905, lng: -9.0482 },
        total: 450,
        occupied: 225,
        id: 29,
        type: "shopping",
        hourlyRate: 0,
        maxDailyRate: 0,
        openingHours: "8:00 - 22:00"
    },
    {
        name: "Galway Clinic Parking",
        position: { lat: 53.2892, lng: -9.0753 },
        total: 180,
        occupied: 135,
        id: 30,
        type: "hospital",
        hourlyRate: 2.00,
        maxDailyRate: 8,
        openingHours: "24/7"
    }
];
