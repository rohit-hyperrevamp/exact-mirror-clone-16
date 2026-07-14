export interface CoveredArea {
  slug: string;
  name: string;
  shortName: string;
  type: "sector" | "area";
  pin?: string;
  distance: string;
  nearby: string[];
  blurb: string;
}

export interface GeoLocation {
  slug: string;
  name: string;
  shortName: string;
  type: "sector" | "area";
  pin?: string;
  distance: string;
  nearby: string[];
  blurb: string;
  coveredAreas?: CoveredArea[];
}

// Two consolidated hub pages for Aarvak Diagnostics' Gurugram geo coverage.
// All previously-templated per-area pages have been folded into these hubs
// (see coveredAreas below) or redirected to the /diagnostic-centre-gurugram index.
export const geoLocations: GeoLocation[] = [
  {
    slug: "sector-67",
    name: "Sector 67",
    shortName: "Sector 67",
    type: "sector",
    pin: "122018",
    distance: "0 km – we are located here at JMD Suburbio-2",
    nearby: ["JMD Suburbio", "Park View Spa", "Tulip Orange", "Bestech Park View"],
    blurb:
      "Sector 67 is a fast-growing residential pocket on Sohna Road and home to Aarvak Diagnostics' flagship lab. From this hub we serve the entire Golf Course Extension Road corridor and surrounding sectors — walk-in testing, phlebotomy, digital X-ray, PFT and health checkup packages.",
    coveredAreas: [
      { slug: "golf-course-extension-road", name: "Golf Course Extension Road", shortName: "GCX Road", type: "area", distance: "~2 km from our Sector 67 lab", nearby: ["Sector 65", "Sector 66", "Emerald Hills", "M3M Cosmopolitan"], blurb: "Golf Course Extension Road is the new luxury corridor of Gurugram with premium towers and walk-to-office workspaces." },
      { slug: "sector-56", name: "Sector 56", shortName: "Sector 56", type: "sector", pin: "122011", distance: "~3.5 km from our Sector 67 lab", nearby: ["South City 2", "Mayfield Garden", "Rapid Metro Sector 55-56"], blurb: "Sector 56 is well-connected via Rapid Metro and houses South City 2 and Mayfield Garden." },
      { slug: "sector-57", name: "Sector 57", shortName: "Sector 57", type: "sector", pin: "122003", distance: "~3 km from our Sector 67 lab", nearby: ["Hong Kong Bazaar", "South City 2", "Sushant Lok 2"], blurb: "Sector 57 is a popular mixed residential-commercial zone close to Sohna Road." },
      { slug: "sector-58", name: "Sector 58", shortName: "Sector 58", type: "sector", pin: "122011", distance: "~4 km from our Sector 67 lab", nearby: ["Suncity", "Central Park 1", "DLF Phase 5"], blurb: "Sector 58 borders DLF Phase 5 and Golf Course Road, with established luxury housing." },
      { slug: "sector-61", name: "Sector 61", shortName: "Sector 61", type: "sector", pin: "122102", distance: "~4 km from our Sector 67 lab", nearby: ["Ireo Uptown", "Emaar Imperial Gardens", "Golf Course Extension Road"], blurb: "Sector 61 features premium gated communities along Golf Course Extension Road." },
      { slug: "sector-62", name: "Sector 62", shortName: "Sector 62", type: "sector", pin: "122102", distance: "~3.5 km from our Sector 67 lab", nearby: ["Ireo Grand Arch", "Salcon The Verandas", "Golf Course Extension Road"], blurb: "Sector 62 is part of the Golf Course Extension Road corridor with premium developments." },
      { slug: "sector-63", name: "Sector 63", shortName: "Sector 63", type: "sector", pin: "122001", distance: "~3 km from our Sector 67 lab", nearby: ["Golf Course Extension Road", "Ireo Skyon", "Tulip Ivory"], blurb: "Sector 63 is a premium Golf Course Extension Road location with luxury high-rises." },
      { slug: "sector-65", name: "Sector 65", shortName: "Sector 65", type: "sector", pin: "122018", distance: "~2 km from our Sector 67 lab", nearby: ["Golf Course Extension Road", "M3M Cosmopolitan", "Emaar Marbella"], blurb: "Sector 65 sits on Golf Course Extension Road, one of Gurugram's premium residential corridors." },
      { slug: "sector-66", name: "Sector 66", shortName: "Sector 66", type: "sector", pin: "122018", distance: "~1 km from our Sector 67 lab", nearby: ["Emerald Hills", "Emaar Palm Drive", "Spaze Privy"], blurb: "Sector 66 borders Sector 67 and offers easy access to our diagnostic lab." },
      { slug: "sector-68", name: "Sector 68", shortName: "Sector 68", type: "sector", pin: "122018", distance: "~1.5 km from our Sector 67 lab", nearby: ["Emaar Palm Heights", "Mapsko Casa Bella", "Tulip White"], blurb: "Sector 68 sits along Sohna Road with rapidly developing high-rise communities." },
      { slug: "sector-69", name: "Sector 69", shortName: "Sector 69", type: "sector", pin: "122018", distance: "~2 km from our Sector 67 lab", nearby: ["Tulip Violet", "Vatika India Next", "Tata Primanti"], blurb: "Sector 69 is a quiet residential sector on Sohna Road, well-connected to NH-48." },
      { slug: "sector-70", name: "Sector 70", shortName: "Sector 70", type: "sector", pin: "122101", distance: "~2.5 km from our Sector 67 lab", nearby: ["Tulip Petals", "Mapsko Mountville", "Aarcity Regency"], blurb: "Sector 70 hosts mid- and high-rise housing along Sohna Road, popular with young families." },
      { slug: "sector-71", name: "Sector 71", shortName: "Sector 71", type: "sector", pin: "122101", distance: "~3 km from our Sector 67 lab", nearby: ["Vipul Lavanya", "Vatika Lifestyle Homes", "Suncity Avenue"], blurb: "Sector 71 lies on Sohna Road with mature gated communities and easy hospital access." },
      { slug: "sector-72", name: "Sector 72", shortName: "Sector 72", type: "sector", pin: "122101", distance: "~3.5 km from our Sector 67 lab", nearby: ["RPS Auria", "Vatika Sovereign Park", "Sohna Road"], blurb: "Sector 72 is part of New Gurugram's expansion belt with growing residential demand." },
      { slug: "sector-73", name: "Sector 73", shortName: "Sector 73", type: "sector", pin: "122101", distance: "~4 km from our Sector 67 lab", nearby: ["Sohna Road", "Vatika India Next", "Omaxe Forest Spa"], blurb: "Sector 73 connects directly to Sohna Road, with both DDJAY plots and apartments." },
      { slug: "sector-74", name: "Sector 74", shortName: "Sector 74", type: "sector", pin: "122004", distance: "~4 km from our Sector 67 lab", nearby: ["Sohna Road", "Tulip Petals", "Vatika"], blurb: "Sector 74 lies along Sohna Road's southern extension with new residential plots." },
      { slug: "sector-75", name: "Sector 75", shortName: "Sector 75", type: "sector", pin: "122004", distance: "~4.5 km from our Sector 67 lab", nearby: ["Sohna Road", "Vatika India Next", "Pareena Coban"], blurb: "Sector 75 is part of the New Gurugram belt south of Sohna Road." },
    ],
  },
  {
    slug: "sohna-road",
    name: "Sohna Road",
    shortName: "Sohna Road",
    type: "area",
    distance: "Our Sector 67 lab sits directly on Sohna Road",
    nearby: ["Subhash Chowk", "Vatika Business Park", "Omaxe Celebration Mall", "Tata Primanti"],
    blurb:
      "Sohna Road is one of Gurugram's busiest residential-commercial corridors, lined with high-rises, IT offices, and hospitals. Our Sector 67 lab sits directly on Sohna Road and covers premium townships along the belt with walk-in testing and free home sample collection.",
    coveredAreas: [
      { slug: "nirvana-country", name: "Nirvana Country", shortName: "Nirvana Country", type: "area", distance: "~4 km from our Sector 67 lab on Sohna Road", nearby: ["Sector 50", "Ardee City", "South City 2"], blurb: "Nirvana Country is a premium gated community in Sector 50 with extensive amenities." },
      { slug: "malibu-town", name: "Malibu Town", shortName: "Malibu Town", type: "area", distance: "~3 km from our Sector 67 lab on Sohna Road", nearby: ["Sector 47", "Sector 49", "Sohna Road"], blurb: "Malibu Town is one of Sohna Road's earliest premium townships and remains highly sought-after." },
      { slug: "south-city-2", name: "South City 2", shortName: "South City 2", type: "area", distance: "~4 km from our Sector 67 lab on Sohna Road", nearby: ["Sector 49", "Sector 50", "Sohna Road"], blurb: "South City 2 is a large gated colony adjoining Sohna Road and Sector 49." },
    ],
  },
];

// Slugs that redirect to a specific hub (merged-away areas).
export const geoRedirectMap: Record<string, string> = {
  // → Sector 67 hub
  "golf-course-extension-road": "sector-67",
  "sector-56": "sector-67",
  "sector-57": "sector-67",
  "sector-58": "sector-67",
  "sector-61": "sector-67",
  "sector-62": "sector-67",
  "sector-63": "sector-67",
  "sector-65": "sector-67",
  "sector-66": "sector-67",
  "sector-68": "sector-67",
  "sector-69": "sector-67",
  "sector-70": "sector-67",
  "sector-71": "sector-67",
  "sector-72": "sector-67",
  "sector-73": "sector-67",
  "sector-74": "sector-67",
  "sector-75": "sector-67",
  // → Sohna Road hub
  "nirvana-country": "sohna-road",
  "malibu-town": "sohna-road",
  "south-city-2": "sohna-road",
};
