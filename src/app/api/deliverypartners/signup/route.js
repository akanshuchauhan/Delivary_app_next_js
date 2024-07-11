import { DeliveryPartner } from '@/app/lib/deliverypartnersMode';
import mongoose from 'mongoose';
import { connectionStr } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    const payload = await request.json();
    const newPartner = new DeliveryPartner(payload);
    const result = await newPartner.save();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json({ success: false, error: error.message || "An error occurred." });
  } finally {
    if (mongoose.connection.readyState) {
      await mongoose.connection.close();
    }
  }
}
