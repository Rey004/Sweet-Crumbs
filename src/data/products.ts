import { Product } from "@/types";

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "cake-1",
    name: "Signature Chocolate Truffle",
    description: "Layers of decadent chocolate sponge filled with rich dark chocolate ganache, decorated with velvet cocoa dust and chocolate curls.",
    price: 42.00,
    image: "/images/chocolate_cake.webp",
    category: "cakes"
  },
  {
    id: "cake-2",
    name: "Salted Caramel Drip Cake",
    description: "Vanilla bean sponge layered with caramel buttercream, finished with a luscious caramel drip, macarons, and caramelized popcorn.",
    price: 45.00,
    image: "/images/birthday_cake.webp",
    category: "cakes"
  },
  {
    id: "pastry-1",
    name: "Flaky Butter Croissant",
    description: "Authentic French croissant made with laminated European butter, baked to a perfect golden-brown, crispy exterior and airy interior.",
    price: 4.50,
    image: "/images/croissants.webp",
    category: "pastries"
  },
  {
    id: "pastry-2",
    name: "Glazed Peach & Apricot Tart",
    description: "Sweet buttery shortcrust pastry filled with premium vanilla bean custard and topped with glazed fresh peach and apricot slices.",
    price: 6.50,
    image: "/images/fruit_tart.webp",
    category: "pastries"
  },
  {
    id: "bread-1",
    name: "Artisan Sourdough Loaf",
    description: "Crafted over a 24-hour fermentation process. Crispy blistered crust with a soft, open crumb and a beautifully balanced sour profile.",
    price: 8.50,
    image: "/images/hero_bakery.webp",
    category: "breads"
  },
  {
    id: "cookie-1",
    name: "Classic Chocolate Chip Cookie",
    description: "Soft-baked cookie with golden crisp edges, loaded with dark chocolate chunks and topped with a light pinch of Maldon sea salt.",
    price: 3.50,
    image: "/images/insta_cookies.webp",
    category: "cookies"
  }
];

export const TODAY_SPECIALS: Product[] = [
  {
    id: "special-1",
    name: "Glazed Cinnamon Rolls",
    description: "Soft yeast dough swirled with brown sugar and Ceylon cinnamon, baked fresh and topped with warm cream cheese glaze.",
    price: 5.50,
    image: "/images/insta_cinnamon.webp",
    category: "specials",
    limitQuantity: 12,
    availableQuantity: 4,
    badge: "Baker's Choice"
  },
  {
    id: "special-2",
    name: "Almond Butter Croissant",
    description: "Flaky croissant filled with rich almond frangipane paste, baked again for extra crunch, dusted with powdered sugar and sliced almonds.",
    price: 5.20,
    image: "/images/croissants.webp",
    category: "specials",
    limitQuantity: 8,
    availableQuantity: 2,
    badge: "Almost Sold Out"
  },
  {
    id: "special-3",
    name: "Salted Caramel Macarons (6pcs)",
    description: "A delicate box of French macarons featuring crisp almond meringue shells and a gooey salted butter caramel filling.",
    price: 14.00,
    image: "/images/birthday_cake.webp",
    category: "specials",
    limitQuantity: 15,
    availableQuantity: 5,
    badge: "Fresh Batch"
  }
];
