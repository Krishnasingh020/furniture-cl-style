const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kalium_furniture';

const sampleProducts = [
  // MIRRORS
  {
    name: "Tact Mirror",
    price: "199.00",
    originalPrice: "245.00",
    currencySymbol: "$",
    features: "Resin mirror with prismatic design.",
    description: "The Tact Mirror by Tacchini features prismatic surfaces that reflect light and emotions with delicate intensity. Made of colored resin, it adds a contemporary touch to any space.",
    dimensions: "50 × 7 × 70 cm",
    materials: "Colored resin",
    finish: "Prismatic resin finish",
    designer: "Tacchini",
    countryOfOrigin: "Italy",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "TAC-MIR-001",
    category: "mirrors",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tact-mirror-1.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tact-mirror-1-220x220.jpeg",
        alt: "Tact Mirror"
      }
    ],
    reviews: [
      {
        author: "Sarah Mitchell",
        rating: 5,
        comment: "Absolutely stunning mirror! The prismatic design creates such beautiful light reflections throughout my living room. The quality is exceptional and it arrived perfectly packaged. Highly recommend!",
        date: new Date('2024-10-15')
      },
      {
        author: "James Chen",
        rating: 4,
        comment: "Love the modern aesthetic of this mirror. The resin finish is unique and adds character to my space. Only minor issue is it's a bit smaller than I expected, but the design quality makes up for it.",
        date: new Date('2024-11-02')
      }
    ]
  },
  {
    name: "Freestanding Aluminium Mirror",
    price: "349.00",
    originalPrice: "425.00",
    currencySymbol: "$",
    features: "Modern freestanding mirror with sleek aluminium frame. Versatile design that can be placed anywhere in your home for functional elegance.",
    description: "The Freestanding Aluminium Mirror is a contemporary masterpiece that combines functionality with minimalist design. Crafted from lightweight yet durable aluminium, this mirror features a sleek frame that complements any interior style. Its freestanding design offers maximum flexibility, allowing you to position it exactly where you need it—whether in a bedroom, hallway, or living space. The polished aluminium finish reflects light beautifully, creating a sense of spaciousness while adding a touch of modern sophistication to your decor.",
    dimensions: "80 × 5 × 100 cm",
    materials: "Aluminium frame with premium glass",
    finish: "Polished aluminium finish",
    designer: "Modern Design Studio",
    countryOfOrigin: "Germany",
    importerPackerMarketer: "European Home Collections",
    articleNumber: "FAM-ALU-2024",
    category: "mirrors",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-mirror-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-mirror-3-220x220.jpeg",
        alt: "Freestanding Aluminium Mirror"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-2-220x220.jpeg",
        alt: "Freestanding Aluminium Mirror Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-3-220x220.jpeg",
        alt: "Freestanding Aluminium Mirror Side"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/freestanding-aluminium-mirror-4-220x220.jpeg",
        alt: "Freestanding Aluminium Mirror in Room"
      }
    ],
    reviews: [
      {
        author: "Emma Thompson",
        rating: 5,
        comment: "Perfect mirror for my bedroom! The freestanding design is so convenient - I can move it wherever I need. The aluminium frame is lightweight yet sturdy, and the reflection is crystal clear. Excellent purchase!",
        date: new Date('2024-09-20')
      },
      {
        author: "Michael Rodriguez",
        rating: 4,
        comment: "Great quality mirror with a sleek modern look. The aluminium finish is beautiful and matches my contemporary decor perfectly. Only wish it was slightly taller, but overall very satisfied with the purchase.",
        date: new Date('2024-10-08')
      }
    ]
  },
  {
    name: "Tilting Table-Top Brass Mirror",
    price: "279.00",
    originalPrice: null,
    currencySymbol: "$",
    features: "Elegant table-top mirror with tilting mechanism and handcrafted brass frame. Perfect for vanities, desks, or bedside tables.",
    description: "The Tilting Table-Top Brass Mirror is a sophisticated addition to any space, combining classic elegance with practical functionality. The handcrafted brass frame features a smooth tilting mechanism that allows you to adjust the angle for optimal viewing. This versatile mirror is perfect for vanities, dressing tables, or bedside settings, providing both style and utility. The warm brass finish adds a luxurious touch to any interior, while the adjustable design ensures you always have the perfect reflection angle. Part of our Classic Collection, this mirror brings timeless sophistication to modern living.",
    dimensions: "45 × 8 × 60 cm",
    materials: "Brass frame with premium glass",
    finish: "Polished brass finish",
    designer: "Heritage Design Studio",
    countryOfOrigin: "Italy",
    importerPackerMarketer: "Mediterranean Home Furnishings",
    articleNumber: "TTBM-BRASS-5678",
    category: "mirrors",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-mirror-1.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-mirror-1.jpeg",
        alt: "Tilting Table-Top Brass Mirror"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-2-220x220.jpeg",
        alt: "Tilting Table-Top Brass Mirror Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-3-220x220.jpeg",
        alt: "Tilting Table-Top Brass Mirror Close-up"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/tilting-table-top-brass-mirror-4-220x220.jpeg",
        alt: "Tilting Table-Top Brass Mirror on Table"
      }
    ],
    reviews: [
      {
        author: "Olivia Williams",
        rating: 5,
        comment: "This mirror is absolutely perfect for my vanity! The tilting mechanism works smoothly and the brass finish is gorgeous. It's exactly the right size and adds such elegance to my dressing area. Love it!",
        date: new Date('2024-10-25')
      },
      {
        author: "David Park",
        rating: 4,
        comment: "Beautiful craftsmanship and the brass has a lovely warm tone. The tilting feature is very useful. The only thing is it's a bit heavy, but that actually makes it feel more premium. Great quality overall.",
        date: new Date('2024-11-10')
      }
    ]
  },
  {
    name: "Ultrafragola Mirror",
    price: "1,299.00",
    originalPrice: "1,599.00",
    currencySymbol: "$",
    features: "Iconic wavy mirror design by Ettore Sottsass. A legendary piece that combines art and functionality in a stunning statement mirror.",
    description: "The Ultrafragola Mirror is an iconic design masterpiece by Ettore Sottsass, representing the pinnacle of Italian design innovation. This legendary mirror features the distinctive wavy, organic frame that has made it one of the most recognizable pieces in modern design history. The undulating curves create a soft, feminine silhouette that transforms any space into a work of art. More than just a mirror, this is a sculptural statement piece that reflects both light and the bold aesthetic of postmodern design. The Ultrafragola has graced the pages of design magazines and the homes of design enthusiasts for decades, making it a true collector's item that combines timeless beauty with contemporary appeal.",
    dimensions: "100 × 10 × 140 cm",
    materials: "Resin frame with premium glass",
    finish: "White resin with glossy finish",
    designer: "Ettore Sottsass",
    countryOfOrigin: "Italy",
    importerPackerMarketer: "Italian Design Imports Ltd.",
    articleNumber: "UFM-SOTTSASS-9012",
    category: "mirrors",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-13.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-1-220x220.jpeg",
        alt: "Ultrafragola Mirror"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-14.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-2-220x220.jpeg",
        alt: "Ultrafragola Mirror Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-3-220x220.jpeg",
        alt: "Ultrafragola Mirror Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/ultrafragola-mirror-4-220x220.jpeg",
        alt: "Ultrafragola Mirror Installation"
      }
    ],
    reviews: [
      {
        author: "Sophie Anderson",
        rating: 5,
        comment: "An absolute masterpiece! This is more than a mirror - it's a work of art. The iconic wavy design by Sottsass is breathtaking and becomes the focal point of any room. Worth every penny for such an iconic design piece.",
        date: new Date('2024-08-15')
      },
      {
        author: "Robert Kim",
        rating: 5,
        comment: "Incredible design piece that exceeded all expectations. The quality is outstanding and the resin finish is flawless. This mirror transforms my entire living space. A true collector's item that I'm proud to own.",
        date: new Date('2024-09-30')
      }
    ]
  },
  // RUGS
  {
    name: "New Zealand Wool Runner",
    price: "1,299.00",
    currencySymbol: "$",
    features: "A handwoven runner crafted from 100% New Zealand wool, featuring subtle monochrome contrasts and a broken twill pattern.",
    description: "The New Zealand Wool Runner by Bomat is part of the Clayscape Collection, inspired by the rich diversity found in nature. With its classic appearance and subtle monochrome contrasts, this runner is highly suitable for an all-over application. The broken twill pattern refers to traditional weaving techniques, adding a touch of heritage to its design.",
    dimensions: "300 × 80 × 0.8 cm",
    materials: "100% New Zealand wool",
    finish: "Natural wool finish with protective treatment",
    designer: "Bomat",
    countryOfOrigin: "New Zealand",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "NZ-WOOL-RUNNER-001",
    category: "rugs",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-1.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-1-220x220.jpeg",
        alt: "New Zealand Wool Runner"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-2-220x220.jpeg",
        alt: "New Zealand Wool Runner Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-3-220x220.jpeg",
        alt: "New Zealand Wool Runner Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/nz-rug-4-220x220.jpeg",
        alt: "New Zealand Wool Runner in Room"
      }
    ],
    reviews: [
      {
        author: "Charlotte Brown",
        rating: 5,
        comment: "Beautiful handwoven runner that adds warmth and texture to my hallway. The monochrome pattern is subtle yet elegant, and the quality of the New Zealand wool is exceptional. It's soft underfoot and looks stunning!",
        date: new Date('2024-10-12')
      },
      {
        author: "Thomas Wilson",
        rating: 4,
        comment: "Great quality rug with a classic design. The broken twill pattern adds interest without being overwhelming. The wool is durable and has held up well in a high-traffic area. Very pleased with this purchase.",
        date: new Date('2024-11-05')
      }
    ]
  },
  {
    name: "Handcrafted Jute Accent Rug",
    price: "1,299.00",
    currencySymbol: "₹",
    features: "Eco-friendly hand-braided jute rug with a natural texture and durable build. Ideal for living rooms, hallways, and minimalistic home décor settings. Its earthy tones blend seamlessly with modern and rustic interiors.",
    description: "This handcrafted jute accent rug is part of our Sustainable Living Collection, designed for eco-conscious homes. Each rug is handwoven by skilled artisans using traditional techniques passed down through generations. The natural jute fibers provide excellent durability while maintaining a soft, comfortable feel underfoot. Perfect for high-traffic areas, this rug is both practical and stylish, bringing warmth and texture to any space.",
    dimensions: "200 × 150 × 0.8 cm",
    materials: "100% Natural Jute",
    finish: "Natural jute finish with protective coating",
    designer: "Urban Artisan Studio",
    countryOfOrigin: "India",
    importerPackerMarketer: "EarthWeave Home Furnishings Pvt. Ltd.",
    articleNumber: "JW-ACCENT-5721",
    category: "rugs",
    images: [
      {
        src: "https://plus.unsplash.com/premium_photo-1725456678912-f27585848fc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8SGFuZGNyYWZ0ZWQlMjBKdXRlJTIwQWNjZW50JTIwUnVnfGVufDB8fDB8fHww",
        thumb: "https://plus.unsplash.com/premium_photo-1725456678912-f27585848fc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8SGFuZGNyYWZ0ZWQlMjBKdXRlJTIwQWNjZW50JTIwUnVnfGVufDB8fDB8fHww",
        alt: "Handcrafted Jute Accent Rug"
      }
    ],
    reviews: [
      {
        author: "Lisa Martinez",
        rating: 4,
        comment: "Love the natural jute texture! This rug brings an earthy, organic feel to my living room. It's durable and easy to clean. The neutral color works perfectly with my minimalist decor. Great value for money.",
        date: new Date('2024-09-18')
      },
      {
        author: "Kevin Johnson",
        rating: 5,
        comment: "Perfect eco-friendly addition to my home. The hand-braided construction is evident in the quality. It's comfortable to walk on and adds just the right amount of texture. Highly recommend for anyone looking for sustainable home decor.",
        date: new Date('2024-10-22')
      }
    ]
  },
  {
    name: "Rectangular PET Rug",
    price: "1,850.00",
    currencySymbol: "$",
    features: "Eco-friendly rectangular rug made from recycled PET fibers. Durable, stain-resistant, and perfect for high-traffic areas. Combines sustainability with modern design aesthetics.",
    description: "The Rectangular PET Rug is a testament to sustainable design innovation, crafted entirely from recycled PET (polyethylene terephthalate) fibers. This eco-conscious rug transforms plastic bottles into a beautiful, durable floor covering that's both stylish and environmentally responsible. The rectangular shape makes it versatile for any room layout, while the PET fibers provide exceptional durability and easy maintenance. Perfect for families and pet owners, this rug resists stains and moisture while maintaining its vibrant colors and soft texture. Part of our Eco-Collection, it proves that sustainable choices don't mean compromising on style or quality.",
    dimensions: "300 × 100 × 1.2 cm",
    materials: "100% Recycled PET Fibers",
    finish: "PET fiber finish with stain-resistant treatment",
    designer: "Eco Design Studio",
    countryOfOrigin: "United States",
    importerPackerMarketer: "Sustainable Home Solutions Inc.",
    articleNumber: "RPR-PET-2024",
    category: "rugs",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/pet-rug-5.jpeg",
        alt: "Rectangular PET Rug"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-2-220x220.jpeg",
        alt: "Rectangular PET Rug Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-3-220x220.jpeg",
        alt: "Rectangular PET Rug Texture"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-4-220x220.jpeg",
        alt: "Rectangular PET Rug in Room"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-5.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-5-220x220.jpeg",
        alt: "Rectangular PET Rug Close-up"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-6.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-6-220x220.jpeg",
        alt: "Rectangular PET Rug Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-7.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/rectangular-pet-rug-7-220x220.jpeg",
        alt: "Rectangular PET Rug Installation"
      }
    ],
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ]
  },
  {
    name: "Sticky Tape Rug",
    price: "3,500.00",
    currencySymbol: "$",
    features: "Innovative rug design featuring adhesive tape construction. Unique modular approach that allows for easy installation and creative customization. A modern take on traditional floor coverings.",
    description: "The Sticky Tape Rug represents a revolutionary approach to floor design, combining functionality with avant-garde aesthetics. This innovative rug utilizes a unique adhesive tape construction method that creates a distinctive texture and visual appeal. The modular design allows for creative installation patterns, making each installation a unique work of art. Perfect for contemporary spaces seeking something truly different, this rug challenges traditional notions of floor coverings while providing practical benefits like easy cleaning and repositioning. The adhesive tape construction creates a durable surface that's both comfortable underfoot and visually striking, making it a conversation piece for any modern interior.",
    dimensions: "400 × 300 × 1.5 cm",
    materials: "Adhesive Tape with Synthetic Backing",
    finish: "Tape construction with protective coating",
    designer: "Innovative Design Collective",
    countryOfOrigin: "Japan",
    importerPackerMarketer: "Modern Floor Solutions Ltd.",
    articleNumber: "STR-TAPE-7890",
    category: "rugs",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-1-220x220.jpeg",
        alt: "Sticky Tape Rug"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-2-220x220.jpeg",
        alt: "Sticky Tape Rug Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-3-220x220.jpeg",
        alt: "Sticky Tape Rug Texture"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-4-220x220.jpeg",
        alt: "Sticky Tape Rug in Room"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-5.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-5-220x220.jpeg",
        alt: "Sticky Tape Rug Close-up"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-6.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-6-220x220.jpeg",
        alt: "Sticky Tape Rug Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-7.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/sticky-tape-rug-7-220x220.jpeg",
        alt: "Sticky Tape Rug Installation"
      }
    ],
    reviews: [
      {
        author: "Rachel Green",
        rating: 5,
        comment: "This is the most unique and conversation-starting rug I've ever owned! The adhesive tape construction is innovative and creates such an interesting texture. It's surprisingly comfortable and easy to maintain. A true statement piece!",
        date: new Date('2024-08-22')
      },
      {
        author: "Mark Stevens",
        rating: 4,
        comment: "Fascinating design that really stands out. The modular approach allows for creative placement. It's durable and the texture is interesting. The only thing is it took a bit to get used to the look, but now I love how unique it is.",
        date: new Date('2024-09-28')
      }
    ]
  },
  {
    name: "Bamboo Silk and Wool Rug",
    price: "899.00",
    currencySymbol: "€",
    features: "Luxurious blend of bamboo silk and premium wool. Combines the softness of silk with the durability of wool. Natural materials create a sophisticated, eco-friendly floor covering.",
    description: "The Bamboo Silk and Wool Rug is a harmonious blend of two exceptional natural fibers, creating a floor covering that's both luxurious and practical. Bamboo silk, derived from bamboo plants, provides an incredibly soft texture and natural sheen, while premium wool adds durability, warmth, and natural stain resistance. This unique combination results in a rug that feels sumptuous underfoot while standing up to daily use. The natural fibers are sustainably sourced and create a hypoallergenic environment, making it perfect for homes with children or allergy sufferers. The blend of these two materials creates a subtle, sophisticated texture that complements both traditional and contemporary interiors, while the natural color variations add depth and character to any space.",
    dimensions: "250 × 180 × 1.0 cm",
    materials: "60% Bamboo Silk, 40% Premium Wool",
    finish: "Natural fiber finish with protective treatment",
    designer: "Natural Living Design",
    countryOfOrigin: "China",
    importerPackerMarketer: "Asian Home Textiles Ltd.",
    articleNumber: "BSW-NAT-4567",
    category: "rugs",
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bam-boo-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-1-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-2.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-2-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Detail"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-3.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-3-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Texture"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-4.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-4-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug in Room"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-5.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-5-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Close-up"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-6.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-6-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Pattern"
      },
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-7.jpeg",
        thumb: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bamboo-silk-wool-rug-7-220x220.jpeg",
        alt: "Bamboo Silk and Wool Rug Installation"
      }
    ],
    // ARMCHAIRS
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
  },
  {
    name: "Cloud Lounge Armchair",
    price: "799.00",
    originalPrice: "899.00",
    currencySymbol: "$",
    features: "Oversized armchair with deep cushions and soft fabric upholstery.",
    description: "The Cloud Lounge Armchair features generous proportions, deep cushions, and a soft woven fabric that invites you to sit back and stay a while. Perfect for reading nooks and living rooms.",
    dimensions: "95 × 90 × 85 cm",
    materials: "Solid wood frame, high-density foam, polyester fabric",
    finish: "Matte oak legs, textured fabric",
    designer: "Studio North",
    countryOfOrigin: "Poland",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "ARM-CLOUD-001",
    category: "armchairs",
    images: [
      {
        src: "https://images.unsplash.com/photo-1758914465233-c7f7dd81b667?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2xvdWQlMjBMb3VuZ2UlMjBBcm1jaGFpcnxlbnwwfHwwfHx8MA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1758914465233-c7f7dd81b667?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2xvdWQlMjBMb3VuZ2UlMjBBcm1jaGFpcnxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Cloud Lounge Armchair"
      }
    ],
    reviews: [
      {
        author: "Emily Ross",
        rating: 5,
        comment: "Super comfortable and looks amazing in my living room. The cushions are deep and supportive.",
        date: new Date("2024-09-10")
      }
    ]
  },

  // COFFEE TABLES
  {
    name: "Oak Nesting Coffee Tables",
    price: "499.00",
    currencySymbol: "$",
    features: "Set of two nesting coffee tables in solid oak with rounded corners.",
    description: "A versatile set of nesting coffee tables crafted from solid oak. Use them together as a layered centerpiece or split them up around the room.",
    dimensions: "Large: 110 × 60 × 40 cm, Small: 70 × 45 × 35 cm",
    materials: "Solid oak, oak veneer",
    finish: "Natural oiled oak",
    designer: "Scandi Forms",
    countryOfOrigin: "Latvia",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "CT-NEST-001",
    category: "coffee-tables",
    images: [
      {
        src: "https://plus.unsplash.com/premium_photo-1675468310289-a72bc97c3e97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fE9hayUyME5lc3RpbmclMjBDb2ZmZWUlMjBUYWJsZXN8ZW58MHx8MHx8fDA%3D",
        thumb: "https://plus.unsplash.com/premium_photo-1675468310289-a72bc97c3e97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fE9hayUyME5lc3RpbmclMjBDb2ZmZWUlMjBUYWJsZXN8ZW58MHx8MHx8fDA%3D",
        alt: "Oak Nesting Coffee Tables"
      }
    ],
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // BEDS
  {
    name: "Low Profile Platform Bed",
    price: "1199.00",
    originalPrice: "1399.00",
    currencySymbol: "$",
    features: "Minimalist platform bed with solid oak frame and upholstered headboard.",
    description: "A low profile platform bed that combines a solid oak frame with a softly upholstered headboard for relaxed, hotel-like comfort.",
    dimensions: "160 × 200 cm (Queen)",
    materials: "Solid oak, plywood slats, fabric upholstery",
    finish: "Natural oak, textured fabric headboard",
    designer: "Evening Studio",
    countryOfOrigin: "Romania",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "BED-PLATFORM-001",
    category: "beds",
    images: [
      {
        src: "https://plus.unsplash.com/premium_photo-1685026791292-0c5c6807aaf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TG93JTIwUHJvZmlsZSUyMFBsYXRmb3JtJTIwQmVkfGVufDB8fDB8fHww",
        thumb: "https://plus.unsplash.com/premium_photo-1685026791292-0c5c6807aaf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TG93JTIwUHJvZmlsZSUyMFBsYXRmb3JtJTIwQmVkfGVufDB8fDB8fHww",
        alt: "Low Profile Platform Bed"
      }
    ],
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // DINING CHAIRS
  {
    name: "Curved Back Dining Chair",
    price: "229.00",
    currencySymbol: "$",
    features: "Comfortable dining chair with curved backrest and upholstered seat.",
    description: "The Curved Back Dining Chair offers long-lasting comfort thanks to its ergonomic backrest and lightly padded seat.",
    dimensions: "50 × 55 × 82 cm",
    materials: "Solid ash, plywood, foam, fabric",
    finish: "Stained ash, woven fabric",
    designer: "Dining Lab",
    countryOfOrigin: "Vietnam",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "DC-CURVED-001",
    category: "dining-chairs",
    images: [
      {
        src: "https://images.unsplash.com/photo-1748887522154-308d2291542d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fEN1cnZlZCUyMEJhY2slMjBEaW5pbmclMjBDaGFpcnxlbnwwfHwwfHx8MA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1748887522154-308d2291542d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fEN1cnZlZCUyMEJhY2slMjBEaW5pbmclMjBDaGFpcnxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Curved Back Dining Chair"
      }
    ],
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // FLOOR LAMPS
  {
    name: "Arc Floor Lamp",
    price: "349.00",
    currencySymbol: "$",
    features: "Arc-shaped floor lamp with fabric shade and marble base.",
    description: "The Arc Floor Lamp brings sculptural light to sofas, lounge chairs, and dining areas. The marble base keeps it steady while the shade diffuses soft, warm light.",
    dimensions: "Width 120 cm, height 200 cm",
    materials: "Steel, marble, fabric shade",
    finish: "Brushed steel, white shade",
    designer: "Light & Line",
    countryOfOrigin: "China",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "FL-ARC-001",
    category: "floor-lamps",
    images: [
      {
        src: "https://images.unsplash.com/photo-1569735551598-506c3e58ae06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGFyYyUyMGZsb29yJTIwbGFtcHxlbnwwfHwwfHx8MA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1569735551598-506c3e58ae06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGFyYyUyMGZsb29yJTIwbGFtcHxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Arc Floor Lamp"
      }
    ],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // OUTDOOR CHAIRS
  {
    name: "Rope Weave Outdoor Chair",
    price: "259.00",
    currencySymbol: "$",
    features: "Powder-coated frame with weather-resistant rope seat and back.",
    description: "Designed for terraces and balconies, this outdoor chair combines a slim metal frame with woven rope for comfort and airflow.",
    dimensions: "55 × 58 × 80 cm",
    materials: "Powder-coated steel, polyester rope",
    finish: "Graphite frame, sand rope",
    designer: "Outdoor Studio",
    countryOfOrigin: "Indonesia",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "OC-ROPE-001",
    category: "outdoor-chairs",
    images: [
      {
        src: "https://images.unsplash.com/photo-1675013042424-8a5c599b9ccd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHJvcGUlMjBXZWF2ZSUyME91dGRvb3IlMjBDaGFpcnxlbnwwfHwwfHx8MA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1675013042424-8a5c599b9ccd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHJvcGUlMjBXZWF2ZSUyME91dGRvb3IlMjBDaGFpcnxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Rope Weave Outdoor Chair"
      }
    ],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // SIDEBOARDS
  {
    name: "Oak Veneer Sideboard",
    price: "899.00",
    currencySymbol: "$",
    features: "Spacious storage with a sleek oak veneer finish.",
    description: "A modern sideboard perfect for your living or dining room.",
    dimensions: "160 × 45 × 75 cm",
    materials: "Oak veneer, MDF",
    finish: "Natural Oak",
    designer: "Studio A",
    countryOfOrigin: "Sweden",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "SB-OAK-001",
    category: "sideboards",
    images: [{ src: "https://images.unsplash.com/photo-1724014315714-40976f1222f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fE9hayUyMFZlbmVlciUyMFNpZGVib2FyZHxlbnwwfHwwfHx8MA%3D%3D", thumb: "https://images.unsplash.com/photo-1724014315714-40976f1222f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fE9hayUyMFZlbmVlciUyMFNpZGVib2FyZHxlbnwwfHwwfHx8MA%3D%3D", alt: "Oak Veneer Sideboard" }],
    reviews: [ 
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // SOFAS
  {
    name: "Modern 3-Seater Sofa",
    price: "1299.00",
    currencySymbol: "$",
    features: "Comfortable 3-seater sofa with durable fabric.",
    description: "The perfect centerpiece for your living room.",
    dimensions: "220 × 90 × 85 cm",
    materials: "Fabric, Wood, Foam",
    finish: "Grey",
    designer: "Comfort Design",
    countryOfOrigin: "Italy",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "SOFA-MOD-001",
    category: "sofas",
    images: [{ src: "https://images.unsplash.com/photo-1670104344069-e91f7c913e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW9kZXJuJTIwMy1TZWF0ZXIlMjBTb2ZhfGVufDB8fDB8fHww", thumb: "https://images.unsplash.com/photo-1670104344069-e91f7c913e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW9kZXJuJTIwMy1TZWF0ZXIlMjBTb2ZhfGVufDB8fDB8fHww", alt: "Modern 3-Seater Sofa" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // NIGHTSTANDS
  {
    name: "Minimalist Nightstand",
    price: "149.00",
    currencySymbol: "$",
    features: "Compact nightstand with a single drawer.",
    description: "Keep your bedside essentials organized with this minimalist nightstand.",
    dimensions: "45 × 40 × 50 cm",
    materials: "Solid Wood",
    finish: "White",
    designer: "Sleep Well",
    countryOfOrigin: "Denmark",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "NS-MIN-001",
    category: "nightstands",
    images: [{ src: "https://images.unsplash.com/photo-1760072513376-67a46aab0fd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWluaW1hbGlzdCUyME5pZ2h0c3RhbmQlMjBiZWR8ZW58MHx8MHx8fDA%3D", thumb: "https://images.unsplash.com/photo-1760072513376-67a46aab0fd1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWluaW1hbGlzdCUyME5pZ2h0c3RhbmQlMjBiZWR8ZW58MHx8MHx8fDA%3D", alt: "Minimalist Nightstand" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // WARDROBES
  {
    name: "Double Door Wardrobe",
    price: "999.00",
    currencySymbol: "$",
    features: "Spacious wardrobe with hanging rail and shelves.",
    description: "Ample storage for your clothing collection.",
    dimensions: "100 × 60 × 200 cm",
    materials: "MDF, Wood",
    finish: "Matte White",
    designer: "Storage Solutions",
    countryOfOrigin: "Germany",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "WD-DBL-001",
    category: "wardrobes",
    images: [{ src: "https://plus.unsplash.com/premium_photo-1676321688611-166945b4a041?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fERvdWJsZSUyMERvb3IlMjBXYXJkcm9iZXxlbnwwfHwwfHx8MA%3D%3D", thumb: "https://plus.unsplash.com/premium_photo-1676321688611-166945b4a041?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fERvdWJsZSUyMERvb3IlMjBXYXJkcm9iZXxlbnwwfHwwfHx8MA%3D%3D", alt: "Double Door Wardrobe" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
      ],
    isActive: true
  },

  // BENCHES (Dining)
  {
    name: "Solid Wood Dining Bench",
    price: "299.00",
    currencySymbol: "$",
    features: "Sturdy wooden bench for dining tables.",
    description: "A communal seating option for your dining area.",
    dimensions: "140 × 40 × 45 cm",
    materials: "Solid Oak",
    finish: "Natural",
    designer: "Dining Co.",
    countryOfOrigin: "Poland",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "BN-DIN-001",
    category: "benches",
    images: [{ src: "https://images.unsplash.com/photo-1693205801548-caa4a075d7ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fFNvbGlkJTIwV29vZCUyMERpbmluZyUyMEJlbmNofGVufDB8fDB8fHww", thumb: "https://images.unsplash.com/photo-1693205801548-caa4a075d7ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fFNvbGlkJTIwV29vZCUyMERpbmluZyUyMEJlbmNofGVufDB8fDB8fHww", alt: "Solid Wood Dining Bench" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
      ],
    isActive: true
  },

  // TABLE LAMPS
  {
    name: "Ceramic Table Lamp",
    price: "129.00",
    currencySymbol: "$",
    features: "Handcrafted ceramic base with linen shade.",
    description: "Add a warm glow to your side table or desk.",
    dimensions: "30 × 30 × 50 cm",
    materials: "Ceramic, Linen",
    finish: "Beige",
    designer: "Lumina",
    countryOfOrigin: "Portugal",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "TL-CER-001",
    category: "table-lamps",
    images: [{ src: "https://images.unsplash.com/photo-1693329428271-3742bd8220cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fENlcmFtaWMlMjBUYWJsZSUyMExhbXB8ZW58MHx8MHx8fDA%3D", thumb: "https://images.unsplash.com/photo-1693329428271-3742bd8220cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fENlcmFtaWMlMjBUYWJsZSUyMExhbXB8ZW58MHx8MHx8fDA%3D", alt: "Ceramic Table Lamp" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
        ],
    isActive: true
  },

  // CEILING LIGHTS
  {
    name: "Modern Pendant Light",
    price: "199.00",
    currencySymbol: "$",
    features: "Sleek metal pendant light.",
    description: "Perfect for hanging over dining tables or kitchen islands.",
    dimensions: "40 × 40 × 30 cm",
    materials: "Metal",
    finish: "Black",
    designer: "Lumina",
    countryOfOrigin: "China",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "CL-PEN-001",
    category: "ceiling",
    images: [{ src: "https://images.unsplash.com/photo-1730991568658-ad8638395a9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TW9kZXJuJTIwUGVuZGFudCUyMExpZ2h0fGVufDB8fDB8fHww", thumb: "https://images.unsplash.com/photo-1730991568658-ad8638395a9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TW9kZXJuJTIwUGVuZGFudCUyMExpZ2h0fGVufDB8fDB8fHww", alt: "Modern Pendant Light" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // WALL LAMPS
  {
    name: "Adjustable Wall Sconce",
    price: "149.00",
    currencySymbol: "$",
    features: "Wall-mounted lamp with adjustable arm.",
    description: "Ideal for reading or accent lighting.",
    dimensions: "20 × 15 × 25 cm",
    materials: "Brass",
    finish: "Antique Brass",
    designer: "Lumina",
    countryOfOrigin: "India",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "WL-ADJ-001",
    category: "wall-lamps",
    images: [{ src: "https://images.unsplash.com/photo-1586861814230-9a1c68d08b14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk2fHxBZGp1c3RhYmxlJTIwV2FsbCUyMFNjb25jZXxlbnwwfHwwfHx8MA%3D%3D", thumb: "https://images.unsplash.com/photo-1586861814230-9a1c68d08b14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk2fHxBZGp1c3RhYmxlJTIwV2FsbCUyMFNjb25jZXxlbnwwfHwwfHx8MA%3D%3D", alt: "Adjustable Wall Sconce" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // OUTDOOR ACCESSORIES
  {
    name: "Outdoor Cushions Set",
    price: "79.00",
    currencySymbol: "$",
    features: "Weather-resistant cushions for outdoor furniture.",
    description: "Add comfort and color to your patio.",
    dimensions: "45 × 45 cm",
    materials: "Polyester",
    finish: "Blue",
    designer: "Outdoor Living",
    countryOfOrigin: "Vietnam",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "OD-ACC-001",
    category: "accessories",
    images: [{ src: "https://images.unsplash.com/photo-1599584371323-086bfaf50450?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE91dGRvb3IlMjBDdXNoaW9ucyUyMFNldHxlbnwwfHwwfHx8MA%3D%3D", thumb: "https://images.unsplash.com/photo-1599584371323-086bfaf50450?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE91dGRvb3IlMjBDdXNoaW9ucyUyMFNldHxlbnwwfHwwfHx8MA%3D%3D", alt: "Outdoor Cushions Set" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // OUTDOOR BENCHES
  {
    name: "Teak Outdoor Bench",
    price: "499.00",
    currencySymbol: "$",
    features: "Durable teak wood bench.",
    description: "A classic addition to any garden or patio.",
    dimensions: "150 × 60 × 90 cm",
    materials: "Teak Wood",
    finish: "Natural",
    designer: "Outdoor Living",
    countryOfOrigin: "Indonesia",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "OD-BEN-001",
    category: "benches-outdoor",
    images: [{ src: "https://images.unsplash.com/photo-1659051635554-7323821a3a3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlYWslMjBPdXRkb29yJTIwQmVuY2h8ZW58MHx8MHx8fDA%3D", thumb: "https://images.unsplash.com/photo-1659051635554-7323821a3a3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlYWslMjBPdXRkb29yJTIwQmVuY2h8ZW58MHx8MHx8fDA%3D", alt: "Teak Outdoor Bench" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // OUTDOOR LOUNGE
  {
    name: "Outdoor Lounge Chair",
    price: "399.00",
    currencySymbol: "$",
    features: "Relaxing lounge chair with weather-resistant fabric.",
    description: "Perfect for sunbathing or reading outdoors.",
    dimensions: "80 × 160 × 80 cm",
    materials: "Aluminum, Fabric",
    finish: "Grey",
    designer: "Outdoor Living",
    countryOfOrigin: "China",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "OD-LNG-001",
    category: "lounge",
    images: [{ src: "https://images.unsplash.com/photo-1760942990549-dcc32fa4f3d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE91dGRvb3IlMjBMb3VuZ2UlMjBDaGFpcnxlbnwwfHwwfHx8MA%3D%3D", thumb: "https://images.unsplash.com/photo-1760942990549-dcc32fa4f3d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE91dGRvb3IlMjBMb3VuZ2UlMjBDaGFpcnxlbnwwfHwwfHx8MA%3D%3D", alt: "Outdoor Lounge Chair" }],
    reviews: [
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // OUTDOOR TABLES
  {
    name: "Outdoor Dining Table",
    price: "699.00",
    currencySymbol: "$",
    features: "Large dining table for outdoor meals.",
    description: "Gather friends and family for al fresco dining.",
    dimensions: "200 × 100 × 75 cm",
    materials: "Aluminum, Teak",
    finish: "Black/Wood",
    designer: "Outdoor Living",
    countryOfOrigin: "Vietnam",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "OD-TBL-001",
    category: "tables",
    images: [{ src: "https://images.unsplash.com/photo-1693743387915-7d190a0e636f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE91dGRvb3IlMjBkaW5pbmclMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D", thumb: "https://images.unsplash.com/photo-1693743387915-7d190a0e636f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE91dGRvb3IlMjBkaW5pbmclMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D", alt: "Outdoor Dining Table" }],
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // TEXTILES
  {
    name: "Linen Throw Pillow",
    price: "45.00",
    currencySymbol: "$",
    features: "Soft linen pillow cover with down insert.",
    description: "Add texture and comfort to your sofa or bed.",
    dimensions: "50 × 50 cm",
    materials: "Linen, Down",
    finish: "Natural",
    designer: "Soft Home",
    countryOfOrigin: "Lithuania",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "TXT-PIL-001",
    category: "textiles",
    images: [{ src: "https://images.unsplash.com/photo-1654801816121-2beac3d9af53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fExpbmVuJTIwVGhyb3clMjBQaWxsb3d8ZW58MHx8MHx8fDA%3D", thumb: "https://images.unsplash.com/photo-1654801816121-2beac3d9af53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fExpbmVuJTIwVGhyb3clMjBQaWxsb3d8ZW58MHx8MHx8fDA%3D", alt: "Linen Throw Pillow" }],
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  },

  // VASES
  {
    name: "Glass Vase",
    price: "55.00",
    currencySymbol: "$",
    features: "Hand-blown glass vase.",
    description: "A beautiful vessel for your floral arrangements.",
    dimensions: "15 × 15 × 25 cm",
    materials: "Glass",
    finish: "Clear",
    designer: "Glassworks",
    countryOfOrigin: "Czech Republic",
    importerPackerMarketer: "Furnistør Inc.",
    articleNumber: "DEC-VAS-001",
    category: "vases",
    images: [{ src: "https://images.unsplash.com/photo-1745242919196-8f7543f8cf90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdsYXNzJTIwdmFzZXxlbnwwfHwwfHx8MA%3D%3D", thumb: "https://images.unsplash.com/photo-1745242919196-8f7543f8cf90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdsYXNzJTIwdmFzZXxlbnwwfHwwfHx8MA%3D%3D", alt: "Glass Vase" }],
    reviews: [
      {
        author: "Amanda Foster",
        rating: 5,
        comment: "Amazing eco-friendly rug! I love that it's made from recycled materials. It's incredibly durable - my kids and pets have been playing on it for months and it still looks brand new. The stain resistance is impressive!",
        date: new Date('2024-09-05')
      },
      {
        author: "Daniel Lee",
        rating: 4,
        comment: "Great sustainable choice for our home. The PET fibers are soft and comfortable, and the rectangular shape fits perfectly in our living room. It's easy to clean and maintains its color well. Very happy with this purchase!",
        date: new Date('2024-10-18')
      }
    ],
    isActive: true
  }
];
const sampleCategories = [
  {
    name: 'Living Room',
    slug: 'living',
    h1Tag: 'Living Room Collection',
    metaTitle: 'Living Room Furniture - Furnistør',
    metaDescription: 'Shop our modern living room furniture collection.',
    description: 'Create a space you love with our collection of living room furniture. From comfortable sofas to stylish coffee tables, find everything you need to relax and entertain in style.',
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/living-room-hero.jpg",
        alt: "Living Room Collection"
      }
    ],
    isActive: true
  },
  {
    name: 'Bedroom',
    slug: 'bedroom',
    h1Tag: 'Bedroom Collection',
    metaTitle: 'Bedroom Furniture - Furnistør',
    metaDescription: 'Create your dream bedroom with our furniture.',
    description: 'Transform your bedroom into a sanctuary with our range of beds, nightstands, and wardrobes. Designed for comfort and style, our pieces help you rest easy.',
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/bedroom-hero.jpg",
        alt: "Bedroom Collection"
      }
    ],
    isActive: true
  },
  {
    name: 'Dining Room',
    slug: 'dining',
    h1Tag: 'Dining Room Collection',
    metaTitle: 'Dining Room Furniture - Furnistør',
    metaDescription: 'Elegant dining room furniture for your home.',
    description: 'Gather around in style with our dining room collection. Whether it\'s a family dinner or a festive feast, our tables and chairs set the perfect scene.',
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/dining-hero.jpg",
        alt: "Dining Room Collection"
      }
    ],
    isActive: true
  },
  {
    name: 'Home Decor',
    slug: 'decor',
    h1Tag: 'Home Decor Collection',
    metaTitle: 'Home Decor - Furnistør',
    metaDescription: 'Add the finishing touches with our home decor.',
    description: 'It\'s the little things that make a house a home. Explore our selection of mirrors, rugs, and accessories to add personality and warmth to your space.',
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/decor-hero.jpg",
        alt: "Home Decor Collection"
      }
    ],
    isActive: true
  },
  {
    name: 'Lighting',
    slug: 'lighting',
    h1Tag: 'Lighting Collection',
    metaTitle: 'Lighting - Furnistør',
    metaDescription: 'Brighten your home with our lighting collection.',
    description: 'Light up your life with our stunning range of lamps and fixtures. From ambient floor lamps to focused task lighting, we have the perfect solution for every room.',
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/lighting-hero.jpg",
        alt: "Lighting Collection"
      }
    ],
    isActive: true
  },
  {
    name: 'Outdoor',
    slug: 'outdoor',
    h1Tag: 'Outdoor Furniture Collection',
    metaTitle: 'Outdoor Furniture - Furnistør',
    metaDescription: 'Stylish outdoor furniture for your patio.',
    description: 'Extend your living space outdoors with our durable and stylish furniture. Perfect for sunny days and starry nights, our collection brings comfort to your patio or garden.',
    images: [
      {
        src: "https://sites.kaliumtheme.com/elementor/furniture/wp-content/uploads/2025/05/outdoor-hero.jpg",
        alt: "Outdoor Collection"
      }
    ],
    isActive: true
  }
];

const sampleSubcategories = [
  // Living Room
  { name: 'Armchairs', slug: 'armchairs', parentSlug: 'living', h1Tag: 'Armchairs', description: 'Sink into comfort with our range of armchairs. Perfect for reading corners or as a statement piece in your living room.' },
  { name: 'Coffee Tables', slug: 'coffee-tables', parentSlug: 'living', h1Tag: 'Coffee Tables', description: 'Complete your living room with a stylish coffee table. Functional and beautiful, our tables are the perfect centerpiece.' },
  { name: 'Sideboards', slug: 'sideboards', parentSlug: 'living', h1Tag: 'Sideboards', description: 'Add storage and style with our sideboards. Ideal for keeping your living or dining area organized and clutter-free.' },
  { name: 'Sofas', slug: 'sofas', parentSlug: 'living', h1Tag: 'Sofas', description: 'Find your perfect sofa in our collection. From cozy two-seaters to spacious sectionals, we have styles to suit every home.' },

  // Bedroom
  { name: 'Beds', slug: 'beds', parentSlug: 'bedroom', h1Tag: 'Beds', description: 'Sleep soundly in one of our high-quality beds. Available in various sizes and styles to match your bedroom decor.' },
  { name: 'Nightstands', slug: 'nightstands', parentSlug: 'bedroom', h1Tag: 'Nightstands', description: 'Keep your essentials close at hand with a nightstand. Our designs offer both storage and style for your bedside.' },
  { name: 'Wardrobes', slug: 'wardrobes', parentSlug: 'bedroom', h1Tag: 'Wardrobes', description: 'Organize your clothes in style with our wardrobes. Spacious and durable, they are a practical addition to any bedroom.' },

  // Dining Room
  { name: 'Benches', slug: 'benches', parentSlug: 'dining', h1Tag: 'Dining Benches', description: 'Add flexible seating with a dining bench. A modern alternative to chairs, perfect for family gatherings.' },
  { name: 'Dining Chairs', slug: 'dining-chairs', parentSlug: 'dining', h1Tag: 'Dining Chairs', description: 'Dine in comfort with our dining chairs. Choose from a variety of styles and materials to complement your table.' },
  { name: 'Dining Tables', slug: 'dining-tables', parentSlug: 'dining', h1Tag: 'Dining Tables', description: 'The heart of the dining room. Our tables come in various shapes and sizes to fit your space and lifestyle.' },

  // Decor
  { name: 'Mirrors', slug: 'mirrors', parentSlug: 'decor', h1Tag: 'Mirrors', description: 'Reflect your style with our collection of mirrors. Perfect for adding depth and light to any room.' },
  { name: 'Rugs', slug: 'rugs', parentSlug: 'decor', h1Tag: 'Rugs', description: 'Add warmth and texture with a rug. Our selection includes a variety of patterns and sizes to suit your floor.' },

  // Lighting
  { name: 'Ceiling', slug: 'ceiling', parentSlug: 'lighting', h1Tag: 'Ceiling Lights', description: 'Illuminate your space from above with our ceiling lights. From chandeliers to pendants, find the perfect fixture.' },
  { name: 'Floor Lamps', slug: 'floor-lamps', parentSlug: 'lighting', h1Tag: 'Floor Lamps', description: 'Add ambient lighting with a floor lamp. Versatile and stylish, they can be placed anywhere you need extra light.' },
  { name: 'Table Lamps', slug: 'table-lamps', parentSlug: 'lighting', h1Tag: 'Table Lamps', description: 'Perfect for desks and side tables, our table lamps offer focused light and decorative flair.' },
  { name: 'Wall Lamps', slug: 'wall-lamps', parentSlug: 'lighting', h1Tag: 'Wall Lamps', description: 'Save space and add style with wall lamps. Ideal for reading or creating a cozy atmosphere.' },

  // Outdoor
  { name: 'Accessories', slug: 'accessories', parentSlug: 'outdoor', h1Tag: 'Outdoor Accessories', description: 'Complete your outdoor oasis with our accessories. From cushions to planters, add the finishing touches.' },
  { name: 'Chairs', slug: 'outdoor-chairs', parentSlug: 'outdoor', h1Tag: 'Outdoor Chairs', description: 'Relax in the fresh air with our outdoor chairs. Durable and comfortable, they are built to withstand the elements.' },
  { name: 'Benches', slug: 'benches-outdoor', parentSlug: 'outdoor', h1Tag: 'Outdoor Benches', description: 'Enjoy the view from a garden bench. A classic addition to any outdoor space.' },
  { name: 'Lounge', slug: 'lounge', parentSlug: 'outdoor', h1Tag: 'Outdoor Lounge', description: 'Create a living room outside with our lounge furniture. Sofas and chairs designed for open-air relaxation.' },
  { name: 'Tables', slug: 'outdoor-tables', parentSlug: 'outdoor', h1Tag: 'Outdoor Tables', description: 'Dine al fresco with our outdoor tables. Sturdy and stylish, they are perfect for summer meals.' }
];


async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Fix existing products that have price fields stored as strings with commas
    try {
      const mongooseDecimal = mongoose.Types.Decimal128;
      const stringPriceDocs = await Product.collection.find({ price: { $type: 'string' } }).toArray();
      for (const doc of stringPriceDocs) {
        const rawPrice = String(doc.price || '');
        const cleanPrice = rawPrice.replace(/,/g, '').trim();
        const updates = {};
        if (cleanPrice) updates.price = mongooseDecimal.fromString(cleanPrice);
        if (doc.originalPrice && typeof doc.originalPrice === 'string') {
          const cleanOrig = String(doc.originalPrice).replace(/,/g, '').trim();
          if (cleanOrig) updates.originalPrice = mongooseDecimal.fromString(cleanOrig);
        }
        if (Object.keys(updates).length > 0) {
          await Product.collection.updateOne({ _id: doc._id }, { $set: updates });
          console.log(`Migrated numeric fields for existing product _id=${doc._id}`);
        }
      }
    } catch (migErr) {
      console.warn('Price migration step failed (continuing):', migErr.message);
    }

    // Clear existing data to avoid duplicates and ensure schema consistency
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    console.log('Cleared existing products, categories, and subcategories');

    // Insert or update categories first (so subcategories can reference them)
    const categoryMap = {};
    for (const categoryData of sampleCategories) {
      let category = await Category.findOne({ slug: categoryData.slug });
      if (!category) {
        category = new Category(categoryData);
        await category.save();
        console.log(`Created category: ${category.name}`);
      } else {
        // Update all fields including metadata
        category.name = categoryData.name;
        category.metaTitle = categoryData.metaTitle;
        category.metaDescription = categoryData.metaDescription;
        category.h1Tag = categoryData.h1Tag;
        category.headerDescription = categoryData.headerDescription;
        category.description = categoryData.description;
        category.images = categoryData.images || [];
        category.isActive = categoryData.isActive;
        await category.save();
        console.log(`Updated category: ${categoryData.name}`);
      }
      categoryMap[category.slug] = category;
    }

    // Create subcategories from sampleSubcategories
    const subcategoryMap = {};
    for (const subData of sampleSubcategories) {
      const parent = categoryMap[subData.parentSlug];
      if (!parent) {
        console.warn(`Parent category not found for subcategory: ${subData.name} (parent: ${subData.parentSlug})`);
        continue;
      }

      // Add metadata if missing
      if (!subData.metaTitle) subData.metaTitle = `${subData.name} - ${parent.name} | Furnistør`;
      if (!subData.metaDescription) subData.metaDescription = `Explore our collection of ${subData.name.toLowerCase()} for your ${parent.name.toLowerCase()}.`;
      if (!subData.h1Tag) subData.h1Tag = `${subData.name} Collection`;
      if (!subData.headerDescription) subData.headerDescription = `Discover our curated selection of ${subData.name.toLowerCase()}, designed to enhance your ${parent.name.toLowerCase()}.`;

      subData.category = parent._id;
      subData.images = parent.images || []; // Inherit images from parent for now
      subData.isActive = true;

      let sub = await Subcategory.findOne({ slug: subData.slug });
      if (!sub) {
        sub = new Subcategory(subData);
        await sub.save();
        console.log(`Created subcategory: ${sub.name} for category ${parent.slug}`);
      } else {
        // Update fields
        Object.assign(sub, subData);
        await sub.save();
        console.log(`Updated subcategory: ${sub.name}`);
      }
      subcategoryMap[sub.slug] = sub;

      // Ensure parent category references this subcategory
      if (!parent.subcategories.includes(sub._id)) {
        parent.subcategories.push(sub._id);
        await parent.save();
      }
    }

    // Insert or update sample products
    for (const productData of sampleProducts) {
      // sanitize numeric strings
      const sanitize = (v) => {
        if (typeof v === 'string') return v.replace(/,/g, '').trim();
        return v;
      };
      productData.price = sanitize(productData.price);
      productData.originalPrice = sanitize(productData.originalPrice);
      if (productData.offer && productData.offer.offerPrice) {
        productData.offer.offerPrice = sanitize(productData.offer.offerPrice);
      }

      // The 'category' field in sampleProducts currently holds the SUBCATEGORY slug (e.g. 'armchairs')
      // We need to:
      // 1. Find the subcategory object
      // 2. Set product.subcategory to the subcategory ID
      // 3. Set product.category to the PARENT category slug (e.g. 'living')

      const subSlug = productData.category; // e.g. "armchairs"
      const sub = subcategoryMap[subSlug];

      if (sub) {
        productData.subcategory = sub._id;
        // Find the parent category slug
        const parentCategory = await Category.findById(sub.category);
        if (parentCategory) {
          productData.category = parentCategory.slug; // Set to 'living'
        }
      } else {
        console.warn(`Subcategory not found for product: ${productData.name} (slug: ${subSlug})`);
        // Fallback: keep existing category slug if no subcategory found (e.g. if it's already a top-level match)
      }

      // Add metadata fields if not present
      if (!productData.metaTitle) {
        productData.metaTitle = `${productData.name} - Premium Quality | Furnistør`;
      }
      if (!productData.metaDescription) {
        productData.metaDescription = productData.features || productData.description?.substring(0, 160) || '';
      }
      if (!productData.h1Tag) {
        productData.h1Tag = productData.name;
      }
      if (!productData.headerDescription) {
        productData.headerDescription = productData.description || productData.features || '';
      }

      const existingProduct = await Product.findOne({ articleNumber: productData.articleNumber });
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
        console.log(`Created product: ${product.name}`);
      } else {
        // Update existing product
        if (productData.reviews && productData.reviews.length > 0) {
          existingProduct.reviews = productData.reviews;
        }
        Object.assign(existingProduct, productData);
        await existingProduct.save();
        console.log(`Updated product: ${productData.name}`);
      }
    }

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

