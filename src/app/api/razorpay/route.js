import { NextResponse } from "next/server";
import { updatePaymentStatus } from "@/actions/useractions";
import Payment from "@/app/models/Payment";
import connectDb from "@/app/lib/db";

export async function POST(req) {
  await connectDb();
  let body = await req.formData();
  body = Object.fromEntries(body);

  let p = await Payment.findOne({ order_id: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "Order not found" });
  }

  let isVerified = await updatePaymentStatus(body);

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const redirectUrl = isVerified
    ? `${baseUrl}/${p.to_user}?payment=success`
    : `${baseUrl}/${p.to_user}?payment=failure`;

  return NextResponse.redirect(redirectUrl, 303);
}
