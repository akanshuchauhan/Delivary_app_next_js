import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const payload = await request.json();
        await mongoose.connect(connectionStr, { useNewUrlParser: true });

        const food = new foodSchema(payload);
        const result = await food.save();

        mongoose.disconnect(); // Disconnect from MongoDB

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error adding food item:", error);
        return NextResponse.json({ error: "Failed to add food item", success: false });
    }
}
