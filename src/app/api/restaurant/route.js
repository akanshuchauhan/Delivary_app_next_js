import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const data = await restaurantSchema.find();
    console.log("Retrieved restaurants:", data);

    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("Error retrieving restaurants:", error);
    return NextResponse.error({ message: "Failed to retrieve restaurants" });
  } finally {
    await mongoose.connection.close();
  }
}

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const payload = await request.json();
    let result;
    let success = false;

    if (payload.login) {
      result = await restaurantSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
      if (result) {
        success = true;
      }
    } else {
      const restaurant = new restaurantSchema(payload);
      result = await restaurant.save();
      if (result) {
        success = true;
      }
    }

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error performing restaurant operation:", error);
    return NextResponse.error({
      message: "Failed to perform restaurant operation",
    });
  } finally {
    await mongoose.connection.close();
  }
}
