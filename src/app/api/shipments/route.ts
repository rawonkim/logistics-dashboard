import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const shipment = await db.shipment.create({
      data: {
        trackingNumber: body.trackingNumber,
        vesselName: body.vesselName,
        clientName: body.clientName,
        originPort: body.originPort,
        destinationPort: body.destinationPort,
        status: "PENDING",
        estimatedArrival: new Date(body.estimatedArrival),
      },
    });
    return NextResponse.json(shipment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create shipment" }, { status: 500 });
  }
}
