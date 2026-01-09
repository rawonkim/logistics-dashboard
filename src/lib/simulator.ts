import { db } from "@/lib/db";

export async function runShipmentSimulation() {
  const shipments = await db.shipment.findMany();

  // 📍 글로벌 주요 거점 좌표 (위도, 경도)
  const globalBases = [
    { city: "New York", lat: 40.7128, lng: -74.0060 },
    { city: "London", lat: 51.5074, lng: -0.1278 },
    { city: "Tokyo", lat: 35.6762, lng: 139.6503 },
    { city: "Sydney", lat: -33.8688, lng: 151.2093 },
    { city: "Sao Paulo", lat: -23.5505, lng: -46.6333 },
  ];

  for (let i = 0; i < shipments.length; i++) {
    const shipment = shipments[i];
    const base = globalBases[i % globalBases.length];

    const latChange = (Math.random() - 0.5) * 0.5;
    const lngChange = (Math.random() - 0.5) * 0.5;

    await db.shipment.update({
      where: { trackingNumber: shipment.trackingNumber },
      data: {
        latitude: base.lat + latChange,
        longitude: base.lng + lngChange,
      },
    });
  }
}