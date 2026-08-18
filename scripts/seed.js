/**
 * Sip Support - Database Seeder Script
 * Populates MongoDB with realistic creators and sample donation histories.
 *
 * Usage:
 *   npm run seed
 */

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load MONGODB_URI from .env.local or environment
let mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/MONGODB_URI=["']?([^"'\n\r]+)["']?/);
    if (match) {
      mongoUri = match[1];
    }
  }
}

if (!mongoUri) {
  console.error("❌ MONGODB_URI is not defined. Please set it in .env.local or export it.");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  profilePicture: { type: String },
  coverPicture: { type: String },
  razorpayId: { type: String },
  razorpaySecret: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  to_user: { type: String, required: true },
  order_id: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

const SEED_CREATORS = [
  {
    name: "Elena Rostova",
    username: "elenacart",
    email: "elena@example.com",
    profilePicture: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Alex Rivera",
    username: "alexrivera",
    email: "alex@example.com",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Marcus Vance",
    username: "marcusbeats",
    email: "marcus@example.com",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Sophia Chen",
    username: "sophiacodes",
    email: "sophia@example.com",
    profilePicture: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
    coverPicture: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
  },
];

const SEED_PAYMENTS = [
  {
    name: "Devon Lane",
    to_user: "alexrivera",
    order_id: "order_demo_101",
    amount: 500,
    message: "Thank you for the awesome open source developer tools! 🚀",
    done: true,
  },
  {
    name: "Aarav Patel",
    to_user: "elenacart",
    order_id: "order_demo_102",
    amount: 300,
    message: "Loving your digital painting brush pack! 🎨",
    done: true,
  },
  {
    name: "Clara Oswald",
    to_user: "marcusbeats",
    order_id: "order_demo_103",
    amount: 1000,
    message: "Your lo-fi study playlist got me through my finals! 🎧",
    done: true,
  },
  {
    name: "Rahul Verma",
    to_user: "sophiacodes",
    order_id: "order_demo_104",
    amount: 250,
    message: "Excited for the next indie game devlog update! 🕹️",
    done: true,
  },
];

async function runSeed() {
  console.log("🌱 Connecting to MongoDB Atlas...");
  await mongoose.connect(mongoUri, { bufferCommands: false });
  console.log("Connected successfully!");

  console.log("Seeding creators...");
  for (const creator of SEED_CREATORS) {
    await User.findOneAndUpdate(
      { username: creator.username },
      { $set: creator },
      { upsert: true, new: true }
    );
    console.log(`  ✓ Creator @${creator.username} seeded`);
  }

  console.log("Seeding sample payments...");
  for (const payment of SEED_PAYMENTS) {
    await Payment.findOneAndUpdate(
      { order_id: payment.order_id },
      { $set: payment },
      { upsert: true, new: true }
    );
    console.log(`  ✓ Sample payment to @${payment.to_user} seeded`);
  }

  console.log("\n🎉 Database seeding completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
