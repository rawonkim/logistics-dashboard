// app/api/shipments/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }  
) {
  try {
    const params = await props.params;  
    const trackingNumber = params.id;
    
    console.log("지우려는 트래킹 넘버:", trackingNumber);

    await db.shipment.delete({
      where: {
        trackingNumber: trackingNumber,
      }
    });

    return NextResponse.json({ message: "Successfully deleted" });
    
  } catch (error) {
    console.error("삭제 에러:", error);
    return NextResponse.json(
      { error: "Failed to delete" }, 
      { status: 500 }
    );
  }
}