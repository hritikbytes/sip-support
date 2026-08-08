import mongoose from "mongoose";

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

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
