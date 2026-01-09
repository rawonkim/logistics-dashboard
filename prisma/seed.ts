const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 데이터 정제 (초기화)
  await prisma.shipment.deleteMany();

  console.log('Seeding logistics data...');

  const shipments = [
    {
      trackingNumber: 'BK-USA-2026-1001',
      clientName: 'Samsung Electronics',
      originPort: 'Long Beach (USLGB)',
      destinationPort: 'Busan (KRPUS)',
      status: 'IN_TRANSIT',
      estimatedArrival: new Date('2026-01-20T09:00:00Z'),
    },
    {
      trackingNumber: 'BK-USA-2026-1002',
      clientName: 'Hyundai Glovis',
      originPort: 'Savannah (USSAV)',
      destinationPort: 'Ulsan (KRUSN)',
      status: 'PENDING',
      estimatedArrival: new Date('2026-01-25T14:30:00Z'),
    },
    {
      trackingNumber: 'BK-CHN-2026-2001',
      clientName: 'LG Energy Solution',
      originPort: 'Shanghai (CNSHA)',
      destinationPort: 'Incheon (KRINC)',
      status: 'DELIVERED',
      estimatedArrival: new Date('2026-01-05T11:00:00Z'),
      actualArrival: new Date('2026-01-05T10:45:00Z'),
    },
    {
      trackingNumber: 'BK-MEX-2026-3001',
      clientName: 'Kia Motors',
      originPort: 'Altamira (MXATM)',
      destinationPort: 'Pyeongtaek (KRPYK)',
      status: 'CLEARED',
      estimatedArrival: new Date('2026-01-08T16:00:00Z'),
      actualArrival: new Date('2026-01-08T15:30:00Z'),
    }
  ];

  for (const data of shipments) {
    await prisma.shipment.create({ data });
  }

  console.log('Successfully seeded 4 logistics records.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });