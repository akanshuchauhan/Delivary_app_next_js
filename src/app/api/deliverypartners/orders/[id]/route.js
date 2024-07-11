import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersMode";
import { restaurantSchema } from "@/app/lib/restaurantsModel";

export async function GET(request, content) {
    const id = content.params.id;

    try {
        // Connect to MongoDB
        await mongoose.connect(connectionStr, { useNewUrlParser: true });

        // Find orders assigned to delivery boy with id
        let orders = await orderSchema.find({ deliveryBoy_id: id });

        // If orders found, fetch restaurant details for each order
        if (orders.length > 0) {
            let result = await Promise.all(
                orders.map(async (order) => {
                    let restaurantInfo = {};
                    restaurantInfo.data = await restaurantSchema.findOne({ _id: order.resto_id });
                    restaurantInfo.amount = order.amount;
                    restaurantInfo.status = order.status;
                    return restaurantInfo;
                })
            );

            // Close MongoDB connection
            await mongoose.connection.close();

            // Return successful response with data
            return NextResponse.json({ result, success: true });
        } else {
            // Close MongoDB connection
            await mongoose.connection.close();

            // Return successful response with empty result
            return NextResponse.json({ result: [], success: true });
        }
    } catch (error) {
        // Handle any errors
        console.error("Error retrieving orders:", error);

        // Close MongoDB connection on error
        await mongoose.connection.close();

        // Return error response
        return NextResponse.json({ error: "Failed to retrieve orders", success: false });
    }
}
