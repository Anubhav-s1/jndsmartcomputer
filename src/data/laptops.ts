export type Laptop = {
  id: number;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics: string;
  price: number;
  image: string;
  featured: boolean;

  // New Fields
  condition: "New" | "Refurbished";
  warranty: string;
  stock: number;
  exchange: boolean;
  accessories: string[];
};

export const laptops: Laptop[] = [
  {
    id: 1,
    brand: "HP",
    model: "HP 15-BS579TX",
    processor: "Intel Core i3 6th Gen",
    ram: "8GB DDR4",
    storage: "512GB SSD",
    display: '15.6" HD Display',
    graphics: "2GB AMD Radeon Graphics",
    price: 11500,
    image: "/laptops/laptop1.jpeg",
    featured: true,

    condition: "Refurbished",
    warranty: "15 Days Checking Warranty",
    stock: 2,
    exchange: true,

    accessories: [
      "Laptop Bag",
      "Wireless Mouse",
      "Keyboard",
      "Cleaning Kit",
      "Keyguard",
      "Neckband",
    ],
  },

  {
    id: 2,
    brand: "Dell",
    model: "Inspiron 15",
    processor: "Intel Core i5 8th Gen",
    ram: "8GB DDR4",
    storage: "512GB SSD",
    display: '15.6" Full HD',
    graphics: "Intel UHD Graphics",
    price: 22999,
    image: "/laptops/laptop2.jpeg",
    featured: true,

    condition: "Refurbished",
    warranty: "15 Days Checking Warranty",
    stock: 3,
    exchange: true,

    accessories: [
      "Laptop Bag",
      "Wireless Mouse",
      "Keyboard",
      "Cleaning Kit",
      "Keyguard",
      "Neckband",
    ],
  },

  {
    id: 3,
    brand: "Lenovo",
    model: "ThinkPad T480",
    processor: "Intel Core i5 8th Gen",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    display: '14" Full HD',
    graphics: "Intel UHD Graphics",
    price: 28999,
    image: "/laptops/laptop3.jpeg",
    featured: false,

    condition: "Refurbished",
    warranty: "15 Days Checking Warranty",
    stock: 1,
    exchange: true,

    accessories: [
      "Laptop Bag",
      "Wireless Mouse",
      "Keyboard",
      "Cleaning Kit",
      "Keyguard",
      "Neckband",
    ],
  },

  {
    id: 4,
    brand: "ASUS",
    model: "VivoBook 15",
    processor: "Intel Core i7 11th Gen",
    ram: "16GB DDR4",
    storage: "1TB SSD",
    display: '15.6" Full HD',
    graphics: "NVIDIA MX350 2GB",
    price: 48999,
    image: "/laptops/laptop4.jpeg",
    featured: true,

    condition: "Refurbished",
    warranty: "15 Days Checking Warranty",
    stock: 4,
    exchange: true,

    accessories: [
      "Laptop Bag",
      "Wireless Mouse",
      "Keyboard",
      "Cleaning Kit",
      "Keyguard",
      "Neckband",
    ],
  },
];