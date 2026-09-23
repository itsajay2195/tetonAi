import express from "express";
import cors from "cors";
import morgan from "morgan";
import { faker } from "@faker-js/faker";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

function requireClientId(req, res, next) {
  req.clientId = req.header("X-Client-Id");
  if (!req.clientId) return res.status(400).json({ error: "Missing X-Client-Id header" });
  next();
}
// the below code ensures that the headrs are expected only for these 2 endpoints
app.use("/vendors", requireClientId);
app.use("/favorites", requireClientId);
const favorites = new Map(); // clientId -> Set<vendorId>

function getFavoriteSet(clientId) {
  if (!favorites.has(clientId)) favorites.set(clientId, new Set());
  return favorites.get(clientId);
}

const PORT = process.env.PORT || 3333;

// ---------- Data seed ----------
faker.seed(42);

const cities = ["Copenhagen", "Berlin", "Budapest", "Lisbon", "Tokyo"];
const cuisines = [
  "Mexican",
  "Thai",
  "Japanese",
  "Korean",
  "Italian",
  "Indian",
  "Turkish",
  "Vietnamese",
  "Greek",
  "Hungarian",
];
const priceLevels = ["$", "$$", "$$$"];

const IMG = (id) => `https://picsum.photos/seed/vendor-${id}/320/240`;

const vendors = Array.from({ length: 80 }, (_, i) => {
  const city = faker.helpers.arrayElement(cities);
  const cuisine = faker.helpers.arrayElement(cuisines);
  const menuSize = faker.number.int({ min: 4, max: 10 });

  const menu = Array.from({ length: menuSize }, (_, j) => ({
    id: `${i + 1}-${j + 1}`,
    name: `${cuisine} ${faker.commerce.productName()}`,
    price: Number(faker.commerce.price({ min: 5, max: 20, dec: 2 })),
    spicy: Math.random() < 0.3,
    vegan: Math.random() < 0.4,
  }));

  return {
    id: String(i + 1),
    name: `${faker.person.firstName()}'s ${cuisine} ${faker.company.buzzNoun()}`,
    cuisine,
    city,
    priceLevel: faker.helpers.arrayElement(priceLevels),
    thumbnail: IMG(i + 1),
    description: faker.lorem.sentences({ min: 1, max: 2 }),
    location: {
      lat: Number((55 + Math.random()).toFixed(5)),
      lng: Number((12 + Math.random()).toFixed(5)),
    },
    menu,
    isFeatured: Math.random() < 0.15,
    reviews:[]
  };
});

// ---------- Helpers ----------

const ratingFor = (vendor) => {
  if (vendor.reviews.length === 0) return 0;
  const sum = vendor.reviews.reduce((total, r) => total + r.rating, 0);
  return Number((sum / vendor.reviews.length).toFixed(1));
};


const paginate = (items, page = 1, limit = 20) => {
  const p = Math.max(1, Number(page));
  const l = Math.max(1, Math.min(100, Number(limit)));
  const start = (p - 1) * l;
  return {
    page: p,
    limit: l,
    total: items.length,
    totalPages: Math.ceil(items.length / l),
    data: items.slice(start, start + l),
  };
};

const filterVendors = ({ city, cuisine }) =>
  vendors.filter(
    (v) =>
      (!city || v.city.toLowerCase() === String(city).toLowerCase()) &&
      (!cuisine || v.cuisine.toLowerCase() === String(cuisine).toLowerCase())
  );

// ---------- Endpoints ----------
app.get("/", (_req, res) => {
  res.json({
    name: "Street Food Safari API",
    version: "1.0.0",
    endpoints: [
      "GET /vendors?page=&limit=&city=&cuisine=",
      "GET /vendors/:id",
      "GET /vendors/:id/menu",
      "POST /vendors/:id/favorites",
      "DELETE /vendors/:id/favorites",
      "GET /favorites",
      "GET /search?q=",
      "GET /featured",
      "GET /stats",
      "POST /vendors/:id/reviews",
      "GET /vendors/:id/reviews?page=&limit=",

    ],
  });
});

app.get("/vendors", (req, res) => {
  const { page = 1, limit = 20, city, cuisine } = req.query;
  const items = filterVendors({ city, cuisine });
  const paginatedData = paginate(items, page, limit)
  const data = paginatedData.data.map((v) => ({ ...v, isFavorite: getFavoriteSet(req.clientId).has(v.id), rating: ratingFor(v) }));
  res.json({ ...paginatedData, data });
});

app.get("/vendors/:id", (req, res) => {
  const v = vendors.find((x) => x.id === req.params.id);
  if (!v) return res.status(404).json({ error: "Not found" });
  const withFavorite = { ...v, isFavorite: getFavoriteSet(req.clientId).has(v.id), rating: ratingFor(v) };
  res.json(withFavorite);
});

app.get("/vendors/:id/menu", (req, res) => {
  const v = vendors.find((x) => x.id === req.params.id);
  if (!v) return res.status(404).json({ error: "Not found" });
  res.json({ vendorId: v.id, items: v.menu });
});

app.get("/search", (req, res) => {
  const q = String(req.query.q || "")
    .trim()
    .toLowerCase();
  if (!q) return res.json({ data: [] });
  const data = vendors.filter(
    (v) => v.name.toLowerCase().includes(q) || v.cuisine.toLowerCase().includes(q) || v.city.toLowerCase().includes(q)
  );
  res.json(paginate(data, 1, Number(req.query.limit) || 20));
});

app.get("/featured", (_req, res) => {
  res.json({ data: vendors.filter((v) => v.isFeatured) });
});

app.get("/stats", (_req, res) => {
  const byCity = Object.fromEntries(cities.map((c) => [c, vendors.filter((v) => v.city === c).length]));
  const byCuisine = Object.fromEntries(cuisines.map((cz) => [cz, vendors.filter((v) => v.cuisine === cz).length]));
  res.json({ total: vendors.length, byCity, byCuisine });
});

app.post("/vendors/:id/favorites", (req, res) => {
  const v = vendors.find((x) => x.id === req.params.id);
  if (!v) return res.status(404).json({ error: "Not found" });
  getFavoriteSet(req.clientId).add(v.id);
  res.status(204).end();
});

app.delete("/vendors/:id/favorites", (req, res) => {
  getFavoriteSet(req.clientId).delete(req.params.id);
  res.status(204).end();
});

app.get("/favorites", (req, res) => {
  const ids = getFavoriteSet(req.clientId);
  const data = vendors.filter((v) => ids.has(v.id));
  res.json({ total: data.length, data });
});


app.post("/vendors/:id/reviews", (req, res) => {
  const v = vendors.find((x) => x.id === req.params.id);
  if (!v) return res.status(404).json({ error: "Not found" });

  const { rating, comment } = req.body;
  // TODO: validate rating and comment, return 400 on failure
  if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating. Must be a number between 1 and 5." });
  }
  if (typeof comment !== "string" || comment.trim() === "") {
    return res.status(400).json({ error: "Invalid comment. Must be a non-empty string." });
  }
  // TODO: build the review object and push it into v.reviews
  const review = {
    id: faker.string.uuid(),
    rating,
    comment,
    date: new Date().toISOString()
  };
  v.reviews.push(review);

  // TODO: respond
  return res.status(201).json({ message: "Review added successfully.", review });
});

app.get("/vendors/:id/reviews", (req, res) => {
  const v = vendors.find((x) => x.id === req.params.id);
  if (!v) return res.status(404).json({ error: "Not found" });
  res.json(paginate(v.reviews, req.query.page, req.query.limit));
});



// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`Street Food Safari API running on http://localhost:${PORT}`);
});
