import {
  Address,
  Banner,
  Blog,
  BlogCategory,
  Brand,
  Category,
  Order,
  Product,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// In-flight request deduplication to prevent duplicate concurrent network fetches
const inFlightRequests = new Map<string, Promise<unknown>>();

// Helper fetcher with error resilience, deduplication, 60s ISR caching, and timeout protection
async function fetchAPI<T>(endpoint: string, fallback: T, revalidateSeconds: number = 60): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url)! as Promise<T>;
  }

  const fetchPromise = (async (): Promise<T> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        next: { revalidate: revalidateSeconds },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        return fallback;
      }

      const data = await res.json();
      return (data.data ?? data) as T;
    } catch {
      return fallback;
    } finally {
      inFlightRequests.delete(url);
    }
  })();

  inFlightRequests.set(url, fetchPromise);
  return fetchPromise;
}

// -------------------------------------------------------------
// MOCK DATA (Rich, beautiful showcase data for frontend preview)
// -------------------------------------------------------------

export const MOCK_CATEGORIES: Category[] = [
  {
    _id: "cat-1",
    id: "cat-1",
    title: "Gadgets & Audio",
    name: "Gadgets & Audio",
    slug: { current: "gadget-accessories" },
    description: "Premium headphones, earbuds, and audio accessories.",
    productCount: 14,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-2",
    id: "cat-2",
    title: "Smartphones",
    name: "Smartphones",
    slug: { current: "smartphones" },
    description: "Next-gen flagship smartphones and accessories.",
    productCount: 18,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-3",
    id: "cat-3",
    title: "Smart Watches",
    name: "Smart Watches",
    slug: { current: "smart-watches" },
    description: "Fitness trackers, cellular smartwatches, and bands.",
    productCount: 12,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-4",
    id: "cat-4",
    title: "Appliances",
    name: "Appliances",
    slug: { current: "appliances" },
    description: "Smart home electronics and intelligent appliances.",
    productCount: 9,
    image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-5",
    id: "cat-5",
    title: "Laptops & Computers",
    name: "Laptops & Computers",
    slug: { current: "laptops" },
    description: "High-performance ultrabooks and workstation gear.",
    productCount: 16,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-6",
    id: "cat-6",
    title: "Gaming & VR",
    name: "Gaming & VR",
    slug: { current: "gaming" },
    description: "Controllers, headsets, mechanical keyboards, and displays.",
    productCount: 11,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-7",
    id: "cat-7",
    title: "Cameras & Drones",
    name: "Cameras & Drones",
    slug: { current: "cameras-drones" },
    description: "Mirrorless cameras, 4K action cams, cinematic gimbals, and aerial drones.",
    productCount: 8,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-8",
    id: "cat-8",
    title: "Smart Home & Security",
    name: "Smart Home & Security",
    slug: { current: "smart-home-security" },
    description: "Smart locks, video doorbells, ambient lighting, and automated hubs.",
    productCount: 10,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-9",
    id: "cat-9",
    title: "Monitors & Displays",
    name: "Monitors & Displays",
    slug: { current: "monitors-displays" },
    description: "OLED curved gaming monitors, 4K creator panels, and ultra-wide screens.",
    productCount: 9,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-10",
    id: "cat-10",
    title: "Tablets & E-Readers",
    name: "Tablets & E-Readers",
    slug: { current: "tablets-ereaders" },
    description: "Pro drawing tablets, featherweight e-readers, and high-res stylus displays.",
    productCount: 7,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-11",
    id: "cat-11",
    title: "PC Components & Hardware",
    name: "PC Components & Hardware",
    slug: { current: "pc-components" },
    description: "Flagship graphics cards, processors, motherboards, liquid cooling, and ultra-speed RAM.",
    productCount: 14,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-12",
    id: "cat-12",
    title: "Studio Audio & Soundbars",
    name: "Studio Audio & Soundbars",
    slug: { current: "audio-speakers" },
    description: "Dolby Atmos cinematic soundbars, studio monitors, and acoustic home speakers.",
    productCount: 12,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-13",
    id: "cat-13",
    title: "Smart Health & Wellness",
    name: "Smart Health & Wellness",
    slug: { current: "smart-health" },
    description: "Percussive therapy massagers, body composition analyzers, and restorative therapy gear.",
    productCount: 10,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-14",
    id: "cat-14",
    title: "Networking & Smart Wi-Fi",
    name: "Networking & Smart Wi-Fi",
    slug: { current: "networking-wifi" },
    description: "Next-gen Wi-Fi 7 mesh systems, tri-band gaming routers, and high-speed gigabit switches.",
    productCount: 8,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
  },
  {
    _id: "cat-15",
    id: "cat-15",
    title: "Power & Solar Energy",
    name: "Power & Solar Energy",
    slug: { current: "power-charging" },
    description: "High-capacity GaN power stations, portable solar arrays, and ultra-fast charging accessories.",
    productCount: 11,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80",
  },
];

export const MOCK_BRANDS: Brand[] = [
  {
    _id: "brand-1",
    id: "brand-1",
    title: "Apple",
    name: "Apple",
    brandName: "Apple",
    slug: { current: "apple" },
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-2",
    id: "brand-2",
    title: "Sony",
    name: "Sony",
    brandName: "Sony",
    slug: { current: "sony" },
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-3",
    id: "brand-3",
    title: "Samsung",
    name: "Samsung",
    brandName: "Samsung",
    slug: { current: "samsung" },
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-4",
    id: "brand-4",
    title: "Bose",
    name: "Bose",
    brandName: "Bose",
    slug: { current: "bose" },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-5",
    id: "brand-5",
    title: "DJI",
    name: "DJI",
    brandName: "DJI",
    slug: { current: "dji" },
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-6",
    id: "brand-6",
    title: "ASUS ROG",
    name: "ASUS ROG",
    brandName: "ASUS ROG",
    slug: { current: "asus-rog" },
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-7",
    id: "brand-7",
    title: "Logitech",
    name: "Logitech",
    brandName: "Logitech",
    slug: { current: "logitech" },
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-8",
    id: "brand-8",
    title: "Canon",
    name: "Canon",
    brandName: "Canon",
    slug: { current: "canon" },
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-9",
    id: "brand-9",
    title: "Google",
    name: "Google",
    brandName: "Google",
    slug: { current: "google" },
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-10",
    id: "brand-10",
    title: "LG",
    name: "LG",
    brandName: "LG",
    slug: { current: "lg" },
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-11",
    id: "brand-11",
    title: "Microsoft",
    name: "Microsoft",
    brandName: "Microsoft",
    slug: { current: "microsoft" },
    image: "https://images.unsplash.com/photo-1642132652806-8da9001b9487?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-12",
    id: "brand-12",
    title: "Razer",
    name: "Razer",
    brandName: "Razer",
    slug: { current: "razer" },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80",
  },
  {
    _id: "brand-13",
    id: "brand-13",
    title: "Marshall",
    name: "Marshall",
    brandName: "Marshall",
    slug: { current: "marshall" },
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&auto=format&fit=crop&q=80",
  },
];

export const MOCK_BANNERS: Banner[] = [
  {
    _id: "banner-1",
    id: "banner-1",
    title: "Spatial Audio Revolution",
    subtitle: "AirPods Max & Pro Series",
    description: "Experience active noise cancellation and computational spatial sound with zero distortion.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1920&auto=format&fit=crop&q=80",
    productSlug: ["airpods-max-space-gray"],
    link: "/product/airpods-max-space-gray",
  },
  {
    _id: "banner-2",
    id: "banner-2",
    title: "Titanium Masterpiece",
    subtitle: "iPhone 16 Pro Max 512GB",
    description: "Equipped with the A18 Pro silicon chip, 48MP Fusion camera system, and ultra-durable grade-5 titanium.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1920&auto=format&fit=crop&q=80",
    productSlug: ["iphone-16-pro-max-natural-titanium"],
    link: "/product/iphone-16-pro-max-natural-titanium",
  },
  {
    _id: "banner-3",
    id: "banner-3",
    title: "Next-Gen Smart Living",
    subtitle: "Intelligent Climate & Home Hub",
    description: "Automate ambient temperature, humidity, and air purification with Matter-enabled voice assistant sync.",
    image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=1920&auto=format&fit=crop&q=80",
    productSlug: ["dyson-purifier-hot-cool"],
    link: "/product/dyson-purifier-hot-cool",
  },
  {
    _id: "banner-4",
    id: "banner-4",
    title: "Pure Gaming Dominance",
    subtitle: "Razer Blade 16 & RTX 4090 Series",
    description: "Experience blisteringly fast dual-mode Mini-LED display, Intel Core i9-14900HX, and unmatched vapor chamber cooling.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1920&auto=format&fit=crop&q=80",
    productSlug: ["razer-blade-16-gaming-laptop"],
    link: "/product/razer-blade-16-gaming-laptop",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "prod-1",
    id: "prod-1",
    name: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    slug: { current: "sony-wh-1000xm5-wireless-headphones" },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    ],
    price: 399,
    discount: 15,
    stock: 24,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    sales_count: 850,
    brand: { _ref: "brand-2", brandName: "Sony", title: "Sony", slug: { current: "sony" } },
    categories: ["gadget-accessories"],
    keyfeature: "Industry-leading noise cancellation with Auto NC Optimizer, 30-hour battery life, and crystal-clear hands-free calling.",
    description: "The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. With two processors controlling eight microphones, Auto NC Optimizer for automatically optimizing noise cancellation based on your wearing conditions and environment, and a specially designed driver unit.",
  },
  {
    _id: "prod-2",
    id: "prod-2",
    name: "Apple Watch Ultra 2 Titanium GPS + Cellular",
    slug: { current: "apple-watch-ultra-titanium" },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    ],
    price: 799,
    discount: 8,
    stock: 15,
    status: "new",
    variant: "gadget",
    isFeatured: true,
    sales_count: 720,
    brand: { _ref: "brand-1", brandName: "Apple", title: "Apple", slug: { current: "apple" } },
    categories: ["smart-watches", "gadget-accessories"],
    keyfeature: "49mm corrosion-resistant aerospace titanium case, 3000 nits Always-On Retina display, up to 72 hours battery in Low Power Mode.",
    description: "The most rugged and capable Apple Watch ever, engineered for endurance athletes, outdoor adventurers, and water sports enthusiasts with precision dual-frequency GPS.",
  },
  {
    _id: "prod-3",
    id: "prod-3",
    name: "Samsung Galaxy S24 Ultra 512GB Titanium Gray",
    slug: { current: "samsung-galaxy-s24-ultra" },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1299,
    discount: 10,
    stock: 19,
    status: "sale",
    variant: "gadget",
    isFeatured: true,
    sales_count: 610,
    brand: { _ref: "brand-3", brandName: "Samsung", title: "Samsung", slug: { current: "samsung" } },
    categories: ["smartphones"],
    keyfeature: "Galaxy AI features, built-in S Pen, 200MP camera with Quad Telephoto system, Corning Gorilla Armor front glass.",
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity, and possibility.",
  },
  {
    _id: "prod-4",
    id: "prod-4",
    name: "Bose QuietComfort Ultra Spatial Audio Earbuds",
    slug: { current: "bose-quietcomfort-ultra-earbuds" },
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    ],
    price: 299,
    discount: 12,
    stock: 32,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    sales_count: 530,
    brand: { _ref: "brand-4", brandName: "Bose", title: "Bose", slug: { current: "bose" } },
    categories: ["gadget-accessories"],
    keyfeature: "Breakthrough spatialized audio for immersive listening, world-class noise cancellation with CustomTune technology.",
    description: "QuietComfort Ultra Earbuds offer the ultimate wireless noise cancelling experience. What you hear is placed just in front of you, so it feels like you aren't wearing earbuds at all.",
  },
  {
    _id: "prod-5",
    id: "prod-5",
    name: "Apple MacBook Pro 16-inch M3 Max (36GB, 1TB)",
    slug: { current: "apple-macbook-pro-16-m3-max" },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
    ],
    price: 3499,
    discount: 5,
    stock: 8,
    status: "new",
    variant: "gadget",
    isFeatured: true,
    sales_count: 420,
    brand: { _ref: "brand-1", brandName: "Apple", title: "Apple", slug: { current: "apple" } },
    categories: ["laptops"],
    keyfeature: "16-core CPU, 40-core GPU, Liquid Retina XDR display with ProMotion 120Hz, up to 22 hours battery life.",
    description: "MacBook Pro blasts forward with the M3 Max chip. Built on 3-nanometer technology and featuring an all-new GPU architecture, it's the most advanced chip ever built for a personal computer.",
  },
  {
    _id: "prod-6",
    id: "prod-6",
    name: "LG InstaView Door-in-Door Smart Refrigerator",
    slug: { current: "lg-instaview-smart-refrigerator" },
    images: [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80",
    ],
    price: 2199,
    discount: 18,
    stock: 6,
    status: "sale",
    variant: "refrigerators",
    isFeatured: true,
    sales_count: 310,
    brand: { _ref: "brand-3", brandName: "LG", title: "LG", slug: { current: "lg" } },
    categories: ["appliances", "refrigerators"],
    keyfeature: "Knock twice to illuminate glass panel, Linear Cooling for consistent temperature, Craft Ice maker.",
    description: "Keep food fresher for longer while enjoying smart home integration with ThinQ technology, dual ice maker with craft ice, and sleek mirror glass.",
  },
  {
    _id: "prod-7",
    id: "prod-7",
    name: "Dyson V15 Detect Absolute Smart Cordless Vacuum",
    slug: { current: "dyson-v15-detect-vacuum" },
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    ],
    price: 749,
    discount: 15,
    stock: 14,
    status: "hot",
    variant: "appliances",
    isFeatured: false,
    sales_count: 240,
    brand: { _ref: "brand-4", brandName: "Dyson", title: "Dyson", slug: { current: "dyson" } },
    categories: ["appliances"],
    keyfeature: "Laser revelation reveals microscopic dust, Piezo sensor scientifically calculates particle counts.",
    description: "The most powerful, intelligent cordless vacuum with laser illumination that makes invisible dust visible on hard floors.",
  },
  {
    _id: "prod-8",
    id: "prod-8",
    name: "Sony PlayStation 5 Pro Console Digital Edition",
    slug: { current: "playstation-5-pro-console" },
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
    ],
    price: 699,
    discount: 0,
    stock: 20,
    status: "new",
    variant: "gadget",
    isFeatured: true,
    sales_count: 180,
    brand: { _ref: "brand-2", brandName: "Sony", title: "Sony", slug: { current: "sony" } },
    categories: ["gaming", "gadget-accessories"],
    keyfeature: "PlayStation Spectral Super Resolution (PSSR), advanced ray tracing, 2TB high-speed NVMe SSD.",
    description: "Witness gaming realism unlocked with the world's most powerful console featuring AI-driven upscaling and breathtaking frame rates.",
  },
  {
    _id: "prod-9",
    id: "prod-9",
    name: "DJI Mini 4 Pro Drone Fly More Combo",
    slug: { current: "dji-mini-4-pro-drone-fly-more-combo" },
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1099,
    discount: 8,
    stock: 12,
    status: "hot",
    variant: "cameras",
    isFeatured: true,
    brand: { _ref: "brand-5", brandName: "DJI", title: "DJI", slug: { current: "dji" } },
    categories: ["cameras-drones"],
    keyfeature: "Under 249g ultra-lightweight, 4K/60fps HDR True Vertical Shooting, Omnidirectional Obstacle Sensing, 20km FHD Video Transmission.",
    description: "Capture complex aerial shots with DJI Mini 4 Pro. Packed with powerful imaging upgrades and omnidirectional active obstacle sensing for effortless cinematic flights.",
  },
  {
    _id: "prod-10",
    id: "prod-10",
    name: "Canon EOS R6 Mark II Mirrorless Camera Body",
    slug: { current: "canon-eos-r6-mark-ii-mirrorless-camera" },
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
    ],
    price: 2499,
    discount: 10,
    stock: 6,
    status: "new",
    variant: "cameras",
    isFeatured: true,
    brand: { _ref: "brand-8", brandName: "Canon", title: "Canon", slug: { current: "canon" } },
    categories: ["cameras-drones"],
    keyfeature: "24.2MP Full-Frame CMOS sensor, 40 fps electronic shutter burst, 4K 60p 10-bit internal video, Dual Pixel CMOS AF II with Deep Learning AI.",
    description: "Master both motion and stills with the Canon EOS R6 Mark II. Blistering continuous shooting speed and 6K oversampled 4K 60p video make it the ultimate hybrid creator tool.",
  },
  {
    _id: "prod-11",
    id: "prod-11",
    name: "ASUS ROG Swift OLED PG32UCDM 32\" 4K 240Hz Gaming Monitor",
    slug: { current: "asus-rog-swift-oled-pg32ucdm" },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1299,
    discount: 5,
    stock: 9,
    status: "hot",
    variant: "monitors",
    isFeatured: true,
    brand: { _ref: "brand-6", brandName: "ASUS ROG", title: "ASUS ROG", slug: { current: "asus-rog" } },
    categories: ["monitors-displays"],
    keyfeature: "32-inch 4K QD-OLED panel, 240Hz refresh rate, 0.03ms GtG response time, custom heatsink with graphene film to prevent burn-in.",
    description: "Experience breathtaking visual fidelity and unmatched responsiveness with the ROG Swift OLED PG32UCDM. Next-gen QD-OLED technology delivers inky blacks and infinite contrast.",
  },
  {
    _id: "prod-12",
    id: "prod-12",
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    slug: { current: "logitech-mx-master-3s-wireless-mouse" },
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    ],
    price: 99,
    discount: 15,
    stock: 45,
    status: "sale",
    variant: "gadget",
    isFeatured: false,
    brand: { _ref: "brand-7", brandName: "Logitech", title: "Logitech", slug: { current: "logitech" } },
    categories: ["gadget-accessories"],
    keyfeature: "8K DPI any-surface tracking including glass, Quiet Clicks with 90% noise reduction, MagSpeed electromagnetic scrolling up to 1,000 lines/sec.",
    description: "Logitech MX Master 3S is an iconic mouse remastered for ultimate tactile feel and whisper-quiet performance on multi-computer desktop setups.",
  },
  {
    _id: "prod-13",
    id: "prod-13",
    name: "Google Pixel 9 Pro Fold Obsidian 256GB",
    slug: { current: "google-pixel-9-pro-fold" },
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1799,
    discount: 8,
    stock: 11,
    status: "new",
    variant: "smartphones",
    isFeatured: true,
    brand: { _ref: "brand-9", brandName: "Google", title: "Google", slug: { current: "google" } },
    categories: ["smartphones"],
    keyfeature: "Google Tensor G4 chip with Gemini Nano AI, 8-inch Super Actua Flex inner display, fluid aerospace-grade multi-alloy hinge, IPX8 water resistance.",
    description: "The thinnest foldable with the largest inner display. Experience Gemini Live, multi-screen multitasking, and revolutionary triple rear camera system.",
  },
  {
    _id: "prod-14",
    id: "prod-14",
    name: "Apple iPad Pro 13-inch M4 Ultra Retina Tandem OLED",
    slug: { current: "apple-ipad-pro-13-inch-m4" },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1299,
    discount: 0,
    stock: 14,
    status: "hot",
    variant: "tablets",
    isFeatured: true,
    brand: { _ref: "brand-1", brandName: "Apple", title: "Apple", slug: { current: "apple" } },
    categories: ["tablets-ereaders"],
    keyfeature: "Thinnest Apple product ever at 5.1mm, Ultra Retina XDR Tandem OLED with 1600 nits peak HDR brightness, powerhouse Apple M4 chip with hardware ray tracing.",
    description: "iPad Pro introduces groundbreaking Tandem OLED display technology and the mind-blowing Apple M4 silicon chip, revolutionizing portable computing and digital art workflows.",
  },
  {
    _id: "prod-15",
    id: "prod-15",
    name: "Apple AirPods Max Wireless Over-Ear Headphones Space Gray",
    slug: { current: "airpods-max-space-gray" },
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    ],
    price: 549,
    discount: 10,
    stock: 15,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    brand: { _ref: "brand-1", brandName: "Apple", title: "Apple", slug: { current: "apple" } },
    categories: ["gadget-accessories"],
    keyfeature: "Apple-designed dynamic driver, Active Noise Cancellation with Transparency mode, Personalized Spatial Audio with dynamic head tracking, knit-mesh canopy and memory foam ear cushions.",
    description: "AirPods Max reimagine over-ear headphones. An Apple-designed driver provides high-fidelity audio. Every detail, from canopy to cushions, has been designed for an exceptional acoustic fit.",
  },
  {
    _id: "prod-16",
    id: "prod-16",
    name: "Dyson Purifier Hot+Cool Gen1 Smart Air Purifier & Heater",
    slug: { current: "dyson-purifier-hot-cool" },
    images: [
      "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    ],
    price: 649,
    discount: 15,
    stock: 10,
    status: "hot",
    variant: "appliances",
    isFeatured: true,
    brand: { _ref: "brand-10", brandName: "LG", title: "LG", slug: { current: "lg" } },
    categories: ["appliances"],
    keyfeature: "Automatically senses and captures 99.97% of microscopic particles. HEPA H13 filtration with Air Multiplier technology to heat or cool the whole room.",
    description: "Purifies and heats or cools the whole room. Fully sealed to HEPA H13 standard, capturing dust, allergens, and viruses while circulating purified air.",
  },
  {
    _id: "prod-17",
    id: "prod-17",
    name: "NVIDIA GeForce RTX 4090 Founders Edition 24GB",
    slug: { current: "nvidia-geforce-rtx-4090-founders-edition" },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1599,
    discount: 5,
    stock: 6,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    brand: { _ref: "brand-6", brandName: "ASUS ROG", title: "ASUS ROG", slug: { current: "asus-rog" } },
    categories: ["pc-components"],
    keyfeature: "Ada Lovelace architecture, 24GB G6X memory, DLSS 3.5 AI neural rendering, 3rd gen RT cores for extreme 4K ray-traced gaming.",
    description: "The ultimate GeForce GPU delivering an enormous leap in performance, efficiency, and AI-powered graphics.",
  },
  {
    _id: "prod-18",
    id: "prod-18",
    name: "ASUS ROG Maximus Z790 Dark Hero Flagship Motherboard",
    slug: { current: "asus-rog-maximus-z790-dark-hero" },
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    ],
    price: 699,
    discount: 10,
    stock: 14,
    status: "new",
    variant: "gadget",
    isFeatured: false,
    brand: { _ref: "brand-6", brandName: "ASUS ROG", title: "ASUS ROG", slug: { current: "asus-rog" } },
    categories: ["pc-components"],
    keyfeature: "20+1+2 power stages, DDR5 with AEMP II, PCIe 5.0 M.2 slot, onboard Wi-Fi 7 with ASUS WiFi Q-Antenna, dual Thunderbolt 4 ports.",
    description: "Engineered for extreme performance and effortless overclocking with unyielding power delivery and stealthy aesthetics.",
  },
  {
    _id: "prod-19",
    id: "prod-19",
    name: "Marshall Stanmore III Wireless Bluetooth Home Speaker",
    slug: { current: "marshall-stanmore-iii-bluetooth-speaker" },
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
    ],
    price: 379,
    discount: 10,
    stock: 20,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    brand: { _ref: "brand-13", brandName: "Marshall", title: "Marshall", slug: { current: "marshall" } },
    categories: ["audio-speakers"],
    keyfeature: "Re-engineered for wider soundstage, Placement Compensation, Bluetooth 5.2 with LE Audio readiness, iconic Marshall vintage brass accents.",
    description: "The heavy-weight speaker of the home lineup, Stanmore III brings expansive Marshall sound to any room in your home.",
  },
  {
    _id: "prod-20",
    id: "prod-20",
    name: "Bose Smart Ultra Soundbar with Dolby Atmos & Voice Control",
    slug: { current: "bose-smart-ultra-soundbar-dolby-atmos" },
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    ],
    price: 899,
    discount: 12,
    stock: 9,
    status: "new",
    variant: "appliances",
    isFeatured: true,
    brand: { _ref: "brand-4", brandName: "Bose", title: "Bose", slug: { current: "bose" } },
    categories: ["audio-speakers"],
    keyfeature: "Dolby Atmos and TrueSpace technology separate instruments, dialogue, and effects, placing them in distinct parts of a room for immersive cinema sound.",
    description: "Experience top-of-the-line spatial immersion with Bose TrueSpace processing and upward firing dipole transducers.",
  },
  {
    _id: "prod-21",
    id: "prod-21",
    name: "Sony HT-A7000 7.1.2ch Flagship Dolby Atmos Soundbar",
    slug: { current: "sony-ht-a7000-dolby-atmos-soundbar" },
    images: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1199,
    discount: 15,
    stock: 8,
    status: "sale",
    variant: "appliances",
    isFeatured: true,
    brand: { _ref: "brand-2", brandName: "Sony", title: "Sony", slug: { current: "sony" } },
    categories: ["audio-speakers"],
    keyfeature: "360 Spatial Sound Mapping, Sound Field Optimization, 8K HDR/4K 120 passthrough, Hi-Res Audio, and integrated dual subwoofers.",
    description: "Discover a whole new level of immersion that envelops you in surround sound with physical upward-firing and beam tweeters.",
  },
  {
    _id: "prod-22",
    id: "prod-22",
    name: "Theragun PRO Plus 6-in-1 Smart Percussive Therapy Massager",
    slug: { current: "theragun-pro-plus-smart-percussive-massager" },
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    ],
    price: 599,
    discount: 8,
    stock: 16,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    brand: { _ref: "brand-1", brandName: "Apple", title: "Apple", slug: { current: "apple" } },
    categories: ["smart-health"],
    keyfeature: "Near-infrared LED light therapy, vibration therapy, heat therapy, breathwork haptics, and 16mm deep percussive muscle relief.",
    description: "The ultimate multi-therapy wellness device trusted by pro athletes for rapid recovery, pain relief, and performance enhancement.",
  },
  {
    _id: "prod-23",
    id: "prod-23",
    name: "Withings Body Scan Cellular Smart Composition Clinical Scale",
    slug: { current: "withings-body-scan-smart-composition-scale" },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    ],
    price: 399,
    discount: 5,
    stock: 22,
    status: "new",
    variant: "gadget",
    isFeatured: false,
    brand: { _ref: "brand-9", brandName: "Google", title: "Google", slug: { current: "google" } },
    categories: ["smart-health"],
    keyfeature: "Segmental body composition (torso, arms, legs), 6-lead ECG recording, vascular age biomarker, and nerve health tracking with retractable handle.",
    description: "A complete connected health station in your home. Provides in-depth segmental body fat and cardiovascular assessments.",
  },
  {
    _id: "prod-24",
    id: "prod-24",
    name: "ASUS ROG Rapture GT-BE98 Pro Quad-Band WiFi 7 Gaming Router",
    slug: { current: "asus-rog-rapture-gt-be98-pro-wifi-7-router" },
    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    ],
    price: 799,
    discount: 10,
    stock: 11,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    brand: { _ref: "brand-6", brandName: "ASUS ROG", title: "ASUS ROG", slug: { current: "asus-rog" } },
    categories: ["networking-wifi"],
    keyfeature: "Quad-band speeds up to 30,000 Mbps, 320MHz channels, dual 10G ports, four 2.5G ports, Multi-Link Operation (MLO), and Triple-level game acceleration.",
    description: "Unleash future-proof wireless performance for 8K streaming, cloud computing, and ultra-low latency esports competitive gaming.",
  },
  {
    _id: "prod-25",
    id: "prod-25",
    name: "Google Nest Wifi Pro 6E Mesh System 3-Pack Snow",
    slug: { current: "google-nest-wifi-pro-mesh-system" },
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    ],
    price: 399,
    discount: 15,
    stock: 25,
    status: "sale",
    variant: "gadget",
    isFeatured: false,
    brand: { _ref: "brand-9", brandName: "Google", title: "Google", slug: { current: "google" } },
    categories: ["networking-wifi"],
    keyfeature: "Covers up to 6,600 sq ft, Tri-band Wi-Fi 6E with 6GHz band, built-in Matter and Thread border router, intelligent auto-monitoring self-healing network.",
    description: "Fast, reliable, and whole-home coverage. Built to support up to 300 connected smart home devices without slowdown.",
  },
  {
    _id: "prod-26",
    id: "prod-26",
    name: "Anker Prime 27,650mAh Power Bank 250W GaN Fast Charger",
    slug: { current: "anker-prime-27650mah-power-bank-250w" },
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80",
    ],
    price: 179,
    discount: 10,
    stock: 30,
    status: "hot",
    variant: "gadget",
    isFeatured: false,
    brand: { _ref: "brand-7", brandName: "Logitech", title: "Logitech", slug: { current: "logitech" } },
    categories: ["power-charging"],
    keyfeature: "250W multi-device fast output, 27,650mAh airline-approved capacity, smart digital display with app Bluetooth monitoring, dual USB-C PD 3.1.",
    description: "Charge MacBook Pro 16\" to 50% in just 28 minutes while simultaneously fast charging phones and accessories on the go.",
  },
  {
    _id: "prod-27",
    id: "prod-27",
    name: "EcoFlow RIVER 2 Pro 768Wh Portable Solar Generator Station",
    slug: { current: "ecoflow-river-2-pro-portable-power-station" },
    images: [
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    ],
    price: 599,
    discount: 18,
    stock: 12,
    status: "sale",
    variant: "appliances",
    isFeatured: true,
    brand: { _ref: "brand-10", brandName: "LG", title: "LG", slug: { current: "lg" } },
    categories: ["power-charging"],
    keyfeature: "LiFePO4 battery chemistry with 3000+ cycles, 70-minute ultra-fast AC recharge, 800W output with X-Boost up to 1600W, app control via Wi-Fi/Bluetooth.",
    description: "Power 80% of your essential home appliances during blackouts, outdoor excursions, and remote workstation setups.",
  },
  {
    _id: "prod-28",
    id: "prod-28",
    name: "Samsung Galaxy Tab S10 Ultra 14.6\" Dynamic AMOLED 2X 512GB",
    slug: { current: "samsung-galaxy-tab-s10-ultra" },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1199,
    discount: 10,
    stock: 15,
    status: "hot",
    variant: "tablets",
    isFeatured: true,
    brand: { _ref: "brand-3", brandName: "Samsung", title: "Samsung", slug: { current: "samsung" } },
    categories: ["tablets-ereaders"],
    keyfeature: "14.6-inch anti-reflective Dynamic AMOLED 2X, MediaTek Dimensity 9300+ 4nm flagship processor, Galaxy AI S-Pen with Air Commands, IP68 water resistance.",
    description: "Expansive display, pro multitasking, and AI-assisted creativity for designers, creators, and power users.",
  },
  {
    _id: "prod-29",
    id: "prod-29",
    name: "Microsoft Surface Pro 11 Copilot+ PC OLED 2-in-1 Tablet",
    slug: { current: "microsoft-surface-pro-11-copilot-pc" },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1499,
    discount: 8,
    stock: 18,
    status: "new",
    variant: "tablets",
    isFeatured: true,
    brand: { _ref: "brand-11", brandName: "Microsoft", title: "Microsoft", slug: { current: "microsoft" } },
    categories: ["tablets-ereaders"],
    keyfeature: "Snapdragon X Elite processor with 45 TOPS NPU, vibrant OLED HDR touchscreen, all-day battery life, Wi-Fi 7, and Surface Slim Pen haptic integration.",
    description: "The most flexible and powerful 2-in-1 ever, infused with Copilot+ AI experiences and premium anodized aluminum chassis.",
  },
  {
    _id: "prod-30",
    id: "prod-30",
    name: "Razer Blade 16 Dual-Mode Mini-LED Gaming Laptop",
    slug: { current: "razer-blade-16-gaming-laptop" },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
    ],
    price: 3299,
    discount: 12,
    stock: 8,
    status: "hot",
    variant: "laptops",
    isFeatured: true,
    brand: { _ref: "brand-12", brandName: "Razer", title: "Razer", slug: { current: "razer" } },
    categories: ["gaming"],
    keyfeature: "Dual-mode Mini-LED display (UHD+ 120Hz & FHD+ 240Hz), Intel Core i9-14900HX, NVIDIA GeForce RTX 4090 16GB VRAM, patented vapor chamber cooling.",
    description: "Experience insane visual clarity and depth of color with the world's first dual-mode Mini-LED display backed by desktop-class gaming muscle.",
  },
  {
    _id: "prod-31",
    id: "prod-31",
    name: "Razer Huntsman V3 Pro Analog Optical Gaming Keyboard",
    slug: { current: "razer-huntsman-v3-pro-analog-keyboard" },
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    ],
    price: 249,
    discount: 10,
    stock: 24,
    status: "new",
    variant: "gadget",
    isFeatured: false,
    brand: { _ref: "brand-12", brandName: "Razer", title: "Razer", slug: { current: "razer" } },
    categories: ["gaming"],
    keyfeature: "2nd-Gen Analog Optical Switches with Rapid Trigger mode, adjustable actuation from 0.1mm to 4.0mm, multi-function digital dial with 3 dedicated macro buttons.",
    description: "Engineered for esports perfection with ultra-responsive rapid trigger actuation and textured doubleshot PBT keycaps.",
  },
  {
    _id: "prod-32",
    id: "prod-32",
    name: "Sony PlayStation 5 Pro 2TB Digital Gaming Console",
    slug: { current: "sony-playstation-5-pro-console" },
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",
    ],
    price: 699,
    discount: 0,
    stock: 12,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    brand: { _ref: "brand-2", brandName: "Sony", title: "Sony", slug: { current: "sony" } },
    categories: ["gaming"],
    keyfeature: "PlayStation Spectral Super Resolution (PSSR) AI upscaling, 67% more Compute Units, advanced hardware ray tracing, and 2TB high-speed NVMe storage.",
    description: "Play your favorite games at constant 60fps with maximum fidelity ray-tracing and next-gen DualSense haptic feedback.",
  },
  {
    _id: "prod-33",
    id: "prod-33",
    name: "Sony PlayStation VR2 Headset Horizon Call of the Mountain Bundle",
    slug: { current: "sony-playstation-vr2-horizon-bundle" },
    images: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80",
    ],
    price: 549,
    discount: 15,
    stock: 10,
    status: "sale",
    variant: "gadget",
    isFeatured: false,
    brand: { _ref: "brand-2", brandName: "Sony", title: "Sony", slug: { current: "sony" } },
    categories: ["gaming"],
    keyfeature: "4K HDR OLED displays (2000 x 2040 per eye), 110-degree field of view, intelligent eye tracking with foveated rendering, headset feedback vibrations.",
    description: "Escape into worlds that feel, look and sound truly real with cutting-edge virtual reality technology and sensory features.",
  },
  {
    _id: "prod-34",
    id: "prod-34",
    name: "Microsoft Surface Laptop 7 15\" PixelSense Copilot+ PC",
    slug: { current: "microsoft-surface-laptop-7-copilot-pc" },
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1399,
    discount: 8,
    stock: 14,
    status: "new",
    variant: "laptops",
    isFeatured: true,
    brand: { _ref: "brand-11", brandName: "Microsoft", title: "Microsoft", slug: { current: "microsoft" } },
    categories: ["laptops"],
    keyfeature: "Snapdragon X Elite 12-core silicon, ultra-thin bezels with 120Hz PixelSense Flow touchscreen, up to 22 hours of battery life, Studio Camera with AI effects.",
    description: "A masterpiece of productivity featuring industry-leading performance per watt and intuitive generative AI tools.",
  },
  {
    _id: "prod-35",
    id: "prod-35",
    name: "Apple MacBook Air 15-inch M3 Midnight 512GB",
    slug: { current: "apple-macbook-air-15-inch-m3" },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1499,
    discount: 7,
    stock: 19,
    status: "hot",
    variant: "laptops",
    isFeatured: false,
    brand: { _ref: "brand-1", brandName: "Apple", title: "Apple", slug: { current: "apple" } },
    categories: ["laptops"],
    keyfeature: "Apple M3 chip with 8-core CPU and 10-core GPU, fanless whisper-quiet design, 15.3-inch Liquid Retina display, support for two external monitors.",
    description: "Impossibly thin and fast. MacBook Air with M3 makes working and playing across massive displays effortless and silent.",
  },
  {
    _id: "prod-36",
    id: "prod-36",
    name: "Samsung Galaxy Z Fold6 512GB Silver Shadow",
    slug: { current: "samsung-galaxy-z-fold6-ai-smartphone" },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1899,
    discount: 10,
    stock: 13,
    status: "hot",
    variant: "smartphones",
    isFeatured: true,
    brand: { _ref: "brand-3", brandName: "Samsung", title: "Samsung", slug: { current: "samsung" } },
    categories: ["smartphones"],
    keyfeature: "Enhanced dual-rail Armor Aluminum hinge, 7.6-inch Dynamic AMOLED 2X 2600 nits inner screen, Note Assist and Circle to Search with Google AI.",
    description: "Sleeker, lighter, and more durable than ever before. Unfold PC-style productivity right inside your palm.",
  },
  {
    _id: "prod-37",
    id: "prod-37",
    name: "Google Pixel 9 Pro 256GB Hazel Tensor G4",
    slug: { current: "google-pixel-9-pro-hazel-256gb" },
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
    ],
    price: 999,
    discount: 5,
    stock: 20,
    status: "new",
    variant: "smartphones",
    isFeatured: false,
    brand: { _ref: "brand-9", brandName: "Google", title: "Google", slug: { current: "google" } },
    categories: ["smartphones"],
    keyfeature: "Google Tensor G4, 16GB RAM for on-device Gemini, pro triple rear camera with 5x optical telephoto and 30x Super Res Zoom, 7 years of OS updates.",
    description: "The most powerful Pixel yet with a refined satin glass back, polished metal frame, and pro camera controls.",
  },
  {
    _id: "prod-38",
    id: "prod-38",
    name: "Samsung Galaxy Watch Ultra 47mm LTE Titanium Gray",
    slug: { current: "samsung-galaxy-watch-ultra-titanium" },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    ],
    price: 649,
    discount: 12,
    stock: 14,
    status: "hot",
    variant: "smart-watches",
    isFeatured: true,
    brand: { _ref: "brand-3", brandName: "Samsung", title: "Samsung", slug: { current: "samsung" } },
    categories: ["smart-watches"],
    keyfeature: "Cushion titanium design with 10ATM & IP68 water resistance, Dual-frequency GPS, Energy Score with Galaxy AI, up to 100 hours power-saving battery.",
    description: "Engineered for extreme performance and outdoor expeditions with ocean-grade water resistance and emergency siren.",
  },
  {
    _id: "prod-39",
    id: "prod-39",
    name: "Google Pixel Watch 3 45mm Actua Display Matte Black",
    slug: { current: "google-pixel-watch-3-45mm-matte-black" },
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    ],
    price: 399,
    discount: 0,
    stock: 17,
    status: "new",
    variant: "smart-watches",
    isFeatured: false,
    brand: { _ref: "brand-9", brandName: "Google", title: "Google", slug: { current: "google" } },
    categories: ["smart-watches"],
    keyfeature: "Larger 45mm Actua display with 2000 nits peak brightness, custom running workouts, Loss of Pulse Detection, 24-hour battery with fast charge.",
    description: "Combines Fitbit's best health tracking with Google's helpfulness and stunning domed glass aesthetic.",
  },
  {
    _id: "prod-40",
    id: "prod-40",
    name: "Marshall Major V Wireless Bluetooth Headphones",
    slug: { current: "marshall-major-v-wireless-headphones" },
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    ],
    price: 149,
    discount: 10,
    stock: 28,
    status: "hot",
    variant: "gadget",
    isFeatured: true,
    brand: { _ref: "brand-13", brandName: "Marshall", title: "Marshall", slug: { current: "marshall" } },
    categories: ["gadget-accessories"],
    keyfeature: "100+ hours of wireless playtime, rugged foldable vintage design, custom-tuned dynamic drivers, customizable M-button for Spotify Tap.",
    description: "Classic rock heritage packed into modern wireless cans that play for over four days straight without touching a charger.",
  },
  {
    _id: "prod-41",
    id: "prod-41",
    name: "Sony WF-1000XM5 True Wireless Noise Canceling Earbuds",
    slug: { current: "sony-wf-1000xm5-wireless-earbuds" },
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    ],
    price: 299,
    discount: 15,
    stock: 22,
    status: "sale",
    variant: "gadget",
    isFeatured: false,
    brand: { _ref: "brand-2", brandName: "Sony", title: "Sony", slug: { current: "sony" } },
    categories: ["gadget-accessories"],
    keyfeature: "Integrated Processor V2 and HD Noise Canceling Processor QN2e, Dynamic Driver X for wide frequency reproduction, bone conduction voice sensors.",
    description: "Astonishing sound quality and the best noise cancellation performance on the market in an ultra-compact earbud footprint.",
  },
  {
    _id: "prod-42",
    id: "prod-42",
    name: "DJI Osmo Pocket 3 4K 120fps Handheld Gimbal Camera Creator Combo",
    slug: { current: "dji-osmo-pocket-3-creator-combo" },
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    ],
    price: 669,
    discount: 5,
    stock: 11,
    status: "hot",
    variant: "cameras",
    isFeatured: true,
    brand: { _ref: "brand-5", brandName: "DJI", title: "DJI", slug: { current: "dji" } },
    categories: ["cameras-drones"],
    keyfeature: "1-inch CMOS sensor, 4K/120fps recording, 2-inch rotatable OLED screen with smart horizontal-vertical switching, 3-axis mechanical gimbal stabilization.",
    description: "Puts powerful imaging in the palm of your hand for vloggers, creators, and filmmakers on the move.",
  },
  {
    _id: "prod-43",
    id: "prod-43",
    name: "Sony Alpha 7R V Full-Frame High-Resolution Camera Body",
    slug: { current: "sony-alpha-7r-v-mirrorless-camera" },
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
    ],
    price: 3899,
    discount: 8,
    stock: 5,
    status: "new",
    variant: "cameras",
    isFeatured: true,
    brand: { _ref: "brand-2", brandName: "Sony", title: "Sony", slug: { current: "sony" } },
    categories: ["cameras-drones"],
    keyfeature: "61.0MP full-frame Exmor R BSI CMOS sensor, dedicated AI Processing Unit for Real-time Recognition AF, 8-stop in-body 5-axis image stabilization.",
    description: "Combines a 61MP sensor with an unprecedented AI processing unit for next-generation subject recognition and extreme resolution capture.",
  },
  {
    _id: "prod-44",
    id: "prod-44",
    name: "Samsung Odyssey OLED G9 49\" Curved Dual QHD 240Hz Gaming Monitor",
    slug: { current: "samsung-odyssey-oled-g9-49-inch-curved" },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    ],
    price: 1499,
    discount: 18,
    stock: 7,
    status: "sale",
    variant: "monitors",
    isFeatured: true,
    brand: { _ref: "brand-3", brandName: "Samsung", title: "Samsung", slug: { current: "samsung" } },
    categories: ["monitors-displays"],
    keyfeature: "49-inch 1800R curved OLED display, Dual QHD (5120 x 1440), 0.03ms response time, 240Hz refresh rate, Neo Quantum Processor Pro.",
    description: "Immerse your senses in a wrap-around panoramic battlefield with hair-raising response times and inky blacks.",
  },
  {
    _id: "prod-45",
    id: "prod-45",
    name: "LG UltraFine 32\" Ergo 4K UHD IPS Display with USB-C",
    slug: { current: "lg-ultrafine-32-inch-ergo-4k-uhd-monitor" },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    ],
    price: 649,
    discount: 12,
    stock: 16,
    status: "new",
    variant: "monitors",
    isFeatured: false,
    brand: { _ref: "brand-10", brandName: "LG", title: "LG", slug: { current: "lg" } },
    categories: ["monitors-displays"],
    keyfeature: "31.5-inch 4K UHD (3840 x 2160) IPS, DCI-P3 95%, HDR10, innovative Ergo Stand with extend/retract/swivel/pivot/height/tilt adjust, USB-C 60W PD.",
    description: "Designed to transform your workspace ergonomics while rendering razor-sharp 4K color accurate imagery for professionals.",
  },
  {
    _id: "prod-46",
    id: "prod-46",
    name: "Google Nest Learning Thermostat 4th Gen Polished Obsidian",
    slug: { current: "google-nest-learning-thermostat-4th-gen" },
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    ],
    price: 279,
    discount: 10,
    stock: 24,
    status: "hot",
    variant: "appliances",
    isFeatured: true,
    brand: { _ref: "brand-9", brandName: "Google", title: "Google", slug: { current: "google" } },
    categories: ["smart-home-security"],
    keyfeature: "60% larger borderless domed glass display, Dynamic Farsight, Smart Schedule with Google Home AI, Matter enabled, saves an average of 15% on heating and cooling.",
    description: "The iconic smart thermostat, re-imagined with a breathtaking borderless design and machine learning that learns your comfort habits.",
  },
];

export const MOCK_BLOG_CATEGORIES: BlogCategory[] = [
  { _id: "bcat-1", title: "Tech Reviews", slug: { current: "tech-reviews" } },
  { _id: "bcat-2", title: "Smart Home", slug: { current: "smart-home" } },
  { _id: "bcat-3", title: "Audio & Acoustics", slug: { current: "audio-acoustics" } },
  { _id: "bcat-4", title: "Buyer's Guide", slug: { current: "buyers-guide" } },
];

export const MOCK_BLOGS: Blog[] = [
  {
    _id: "blog-1",
    id: "blog-1",
    title: "The Ultimate Audiophile Guide: Noise Canceling vs Hi-Res Audio in 2026",
    slug: { current: "audiophile-guide-2026" },
    publishedAt: "2026-03-15T10:00:00Z",
    author: {
      name: "Mahadi Hasan",
      bio: "Tech enthusiast and audio engineer passionate about consumer gadgets.",
    },
    mainImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80",
    blogcategories: [{ title: "Audio & Acoustics" }, { title: "Buyer's Guide" }],
    body: "Modern wireless headphones have made unbelievable leaps in active acoustic cancellation and lossless spatial audio streaming. In this in-depth guide, we examine whether modern codecs like LDAC and aptX Lossless truly rival studio analog monitors, and which cans deserve a spot in your daily carry bag.",
  },
  {
    _id: "blog-2",
    id: "blog-2",
    title: "Smart Home Automation Trends: Matter Protocol and Edge AI Devices",
    slug: { current: "smart-home-automation-trends" },
    publishedAt: "2026-02-28T14:30:00Z",
    author: {
      name: "Arnob Hasan",
      bio: "Software developer and hardware reviewer.",
    },
    mainImage: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&auto=format&fit=crop&q=80",
    blogcategories: [{ title: "Smart Home" }],
    body: "Connecting cross-platform gadgets has never been smoother thanks to universal Matter rollouts and on-device machine learning models that preserve local privacy while automating everyday routines.",
  },
  {
    _id: "blog-3",
    id: "blog-3",
    title: "Flagship Smartphone Cameras Compared: Optical Zoom vs Computational AI",
    slug: { current: "flagship-smartphone-cameras-compared" },
    publishedAt: "2026-01-20T09:15:00Z",
    author: {
      name: "Mahadi Hasan",
      bio: "Mobile photographer and tech creator.",
    },
    mainImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80",
    blogcategories: [{ title: "Tech Reviews" }],
    body: "From 200MP sensors to periscope optical stabilization, we took today's top tier smartphones through harsh low-light, high-speed sports, and portrait tests to find the undisputed camera king.",
  },
];

// -------------------------------------------------------------
// API CLIENT FUNCTIONS
// -------------------------------------------------------------

export const getCategories = async (quantity?: number): Promise<Category[]> => {
  const categories = await fetchAPI<Category[]>("/categories", MOCK_CATEGORIES);
  const list = Array.isArray(categories) ? categories : MOCK_CATEGORIES;
  return quantity ? list.slice(0, quantity) : list;
};

export const getAllBrands = async (): Promise<Brand[]> => {
  const brands = await fetchAPI<Brand[]>("/brands", MOCK_BRANDS);
  return Array.isArray(brands) ? brands : MOCK_BRANDS;
};

export const getLatestBlogs = async (): Promise<Blog[]> => {
  const blogs = await fetchAPI<Blog[]>("/blogs/latest", MOCK_BLOGS.slice(0, 3));
  return Array.isArray(blogs) ? blogs : MOCK_BLOGS.slice(0, 3);
};

export const getHotDeals = async (): Promise<Product[]> => {
  const deals = MOCK_PRODUCTS.filter((p) => p.status === "hot" || (p.discount && p.discount > 10));
  const res = await fetchAPI<Product[]>("/products/hot-deals", deals);
  return Array.isArray(res) ? res : deals;
};

export const getBestSellers = async (limit: number = 10, page: number = 1): Promise<Product[]> => {
  // Check if any product has sales recorded (> 0)
  const anyHasSales = MOCK_PRODUCTS.some((p) => (p.sales_count ?? 0) > 0);

  let sortedFallback: Product[];
  if (!anyHasSales) {
    // When no product has sales yet (all 0), show strictly in original array serial
    sortedFallback = [...MOCK_PRODUCTS].slice((page - 1) * limit, page * limit);
  } else {
    // Rank by number of sales desc; if sales is 0 or equal, fall back to array serial
    sortedFallback = [...MOCK_PRODUCTS]
      .map((p, index) => ({ p, index }))
      .sort((a, b) => {
        const salesA = a.p.sales_count ?? 0;
        const salesB = b.p.sales_count ?? 0;
        if (salesB !== salesA) {
          return salesB - salesA;
        }
        return a.index - b.index; // preserves array serial
      })
      .map((item) => item.p)
      .slice((page - 1) * limit, page * limit);
  }

  const res = await fetchAPI<Product[]>(`/products/best-sellers?limit=${limit}&page=${page}`, sortedFallback);
  return Array.isArray(res) ? res : sortedFallback;
};

export const getSingleProduct = async (slug: string): Promise<Product | null> => {
  // 1. Attempt direct endpoint lookup
  const directProduct = await fetchAPI<Product | null>(`/products/${slug}`, null);
  if (directProduct && (directProduct._id || directProduct.name)) {
    return directProduct;
  }

  // 2. Fallback: Search by keyword/slug if direct slug lookup fails (handles PostgreSQL non-numeric id query)
  try {
    const searchRes = await fetchAPI<Product[]>(`/products/search?q=${encodeURIComponent(slug)}`, []);
    if (Array.isArray(searchRes) && searchRes.length > 0) {
      const match =
        searchRes.find((p) => {
          const currentSlug = typeof p?.slug === "object" ? p?.slug?.current : p?.slug;
          return currentSlug === slug || p?._id === slug || String(p?.id) === slug;
        }) || searchRes[0];

      if (match) {
        if (match.id) {
          // Numeric ID fetch works seamlessly on backend
          const productById = await fetchAPI<Product | null>(`/products/${match.id}`, match);
          if (productById && (productById._id || productById.name)) {
            return productById;
          }
        }
        return match;
      }
    }
  } catch {
    // proceed to mock catalog fallback
  }

  // 3. Fallback to mock catalog
  return MOCK_PRODUCTS.find((p) => p.slug.current === slug) || null;
};

export const getBrands = async (slug?: string): Promise<Brand[] | null> => {
  if (slug) {
    const product = MOCK_PRODUCTS.find((p) => p.slug.current === slug);
    if (product && product.brand) {
      const bObj = product.brand as Record<string, unknown>;
      const slugObj = bObj.slug as { current?: string } | undefined;
      const brandData: Brand = {
        _id: String(bObj._ref || bObj._id || "brand-1"),
        title: String(bObj.title || bObj.brandName || "Premium Brand"),
        brandName: String(bObj.brandName || bObj.title || "Premium Brand"),
        slug: { current: slugObj?.current || "brand" },
      };
      return [brandData];
    }
  }
  return fetchAPI<Brand[]>("/brands", MOCK_BRANDS);
};

export const getOrder = async (userId: string): Promise<Order[]> => {
  return fetchAPI<Order[]>(`/orders?user_id=${userId}`, []);
};

export const getAllBlogs = async (quantity?: number): Promise<Blog[]> => {
  const blogs = await fetchAPI<Blog[]>("/blogs", MOCK_BLOGS);
  return quantity ? blogs.slice(0, quantity) : blogs;
};

export const getSingleBlog = async (slug: string): Promise<Blog | null> => {
  const fallback = MOCK_BLOGS.find((b) => b.slug.current === slug) || null;
  return fetchAPI<Blog | null>(`/blogs/${slug}`, fallback);
};

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  return fetchAPI<BlogCategory[]>("/blog-categories", MOCK_BLOGS_CATEGORIES_WRAPPER());
};

function MOCK_BLOGS_CATEGORIES_WRAPPER(): BlogCategory[] {
  return MOCK_BLOG_CATEGORIES.map((cat) => ({
    ...cat,
    blogcategories: [{ title: cat.title }],
  })) as BlogCategory[];
}

export const getOthersBlog = async (slug: string, quantity: number): Promise<Blog[]> => {
  const others = MOCK_BLOGS.filter((b) => b.slug.current !== slug);
  return fetchAPI<Blog[]>(`/blogs/others?exclude=${slug}&limit=${quantity}`, others.slice(0, quantity));
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const q = query.toLowerCase().trim();
  const fallback = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.slug.current.toLowerCase().includes(q) ||
      (typeof p.description === "string" && p.description.toLowerCase().includes(q))
  );
  return fetchAPI<Product[]>(`/products/search?q=${encodeURIComponent(query)}`, fallback);
};

export const getBanners = async (): Promise<Banner[]> => {
  return fetchAPI<Banner[]>("/banners", MOCK_BANNERS);
};

export const getProducts = async (filters?: {
  category?: string | null;
  brand?: string | null;
  variant?: string | null;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}): Promise<Product[]> => {
  let list = [...MOCK_PRODUCTS];

  if (filters?.variant) {
    list = list.filter((p) => p.variant?.toLowerCase() === filters.variant?.toLowerCase());
  }

  if (filters?.category) {
    list = list.filter((p) =>
      p.categories?.some((c) => {
        if (typeof c === "string") return c === filters.category;
        const catObj = c as { slug?: { current?: string }; title?: string };
        return (
          catObj?.slug?.current === filters.category ||
          catObj?.title?.toLowerCase() === filters.category?.toLowerCase()
        );
      })
    );
  }

  if (filters?.brand) {
    list = list.filter((p) => {
      if (typeof p.brand === "object" && p.brand) {
        const b = p.brand as {
          slug?: { current?: string };
          brandName?: string;
          title?: string;
        };
        return (
          b.slug?.current === filters.brand ||
          b.brandName?.toLowerCase() === filters.brand?.toLowerCase() ||
          b.title?.toLowerCase() === filters.brand?.toLowerCase()
        );
      }
      return false;
    });
  }

  if (filters?.minPrice !== undefined) {
    list = list.filter((p) => p.price >= (filters.minPrice ?? 0));
  }
  if (filters?.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= (filters.maxPrice ?? 100000));
  }

  const queryParams = new URLSearchParams();
  if (filters?.category) queryParams.set("category", filters.category);
  if (filters?.brand) queryParams.set("brand", filters.brand);
  if (filters?.variant) queryParams.set("variant", filters.variant);
  if (filters?.minPrice !== undefined) queryParams.set("minPrice", String(filters.minPrice));
  if (filters?.maxPrice !== undefined) queryParams.set("maxPrice", String(filters.maxPrice));
  if (filters?.page !== undefined) queryParams.set("page", String(filters.page));
  if (filters?.limit !== undefined) queryParams.set("limit", String(filters.limit));

  return fetchAPI<Product[]>(`/products?${queryParams.toString()}`, list);
};

export const getAddresses = async (): Promise<Address[]> => {
  return fetchAPI<Address[]>("/addresses", [
    {
      _id: "addr-1",
      id: "addr-1",
      name: "Default Shipping Address",
      address: "House 12, Road 4, Sector 7",
      city: "Dhaka",
      District: "Dhaka",
      zip: "1230",
      default: true,
    },
  ]);
};
