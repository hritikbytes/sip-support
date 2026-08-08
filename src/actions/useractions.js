"use server";

import Razorpay from "razorpay";
import Payment from "@/app/models/Payment";
import connectDb from "@/app/lib/db";
import User from "@/app/models/User";
import crypto from "crypto";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  if (!amount || !to_username || !paymentform.name) {
    throw new Error("Missing required payment details");
  }

  let user = await User.findOne({ username: to_username });

  if (!user) {
    throw new Error("Creator not found.");
  }

  if (!user.razorpayId || !user.razorpaySecret) {
    throw new Error("This creator hasn't setup their Razorpay credentials.");
  }

  const instance = new Razorpay({
    key_id: user.razorpayId,
    key_secret: user.razorpaySecret,
  });

  const parsedAmount = Number(amount);
  const options = {
    amount: Math.round(parsedAmount * 100),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  await Payment.create({
    order_id: x.id,
    amount: parsedAmount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
    done: false,
  });

  return JSON.parse(JSON.stringify(x));
};

export const fetchUser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username }).lean();
  if (!u) return null;
  return JSON.parse(JSON.stringify(u));
};

export const fetchAllCreators = async () => {
  await connectDb();
  let users = await User.find({}).select("-razorpaySecret").lean();
  return JSON.parse(JSON.stringify(users));
};

export const fetchpayments = async (username) => {
  await connectDb();
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ created_at: -1 })
    .limit(10)
    .lean();
  return JSON.parse(JSON.stringify(p));
};

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata =
    typeof data.entries === "function" ? Object.fromEntries(data) : { ...data };

  if (ndata.username && oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u && u.email !== ndata.email) {
      return { error: "Username already exists by another user" };
    }
  }

  await User.updateOne({ email: ndata.email }, { $set: ndata });
  return { success: true };
};

export const updatePaymentStatus = async (payment_details) => {
  await connectDb();
  let p = await Payment.findOne({
    order_id: payment_details.razorpay_order_id,
  });

  if (!p) return false;

  let user = await User.findOne({ username: p.to_user });
  if (!user || !user.razorpaySecret) return false;

  const generated_signature = crypto
    .createHmac("sha256", user.razorpaySecret)
    .update(payment_details.razorpay_order_id + "|" + payment_details.razorpay_payment_id)
    .digest("hex");

  const isVerified = generated_signature === payment_details.razorpay_signature;

  if (isVerified) {
    p.done = true;
    await p.save();
    return true;
  }
  return false;
};
