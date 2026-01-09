import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. 상태 전이 맵 (기존 로직 유지)
const STATUS_FLOW: Record<string, string> = {
  PENDING: 'IN_TRANSIT',
  IN_TRANSIT: 'CUSTOMS_HOLD',
  CUSTOMS_HOLD: 'DELIVERED',
  CLEARED: "DELIVERED",
  DELIVERED: "PENDING"
};

async function simulateLogistics() {
  console.log('🚢 [트래킹 넘버 기반] 시뮬레이터 가동 중...');

  while (true) {
    // 2. DELIVERED가 아닌 화물 가져오기
    const shipments = await prisma.shipment.findMany({
      where: { NOT: { status: 'DELIVERED' } }
    });

    // 3. 기존의 if문 유지 (안전장치)
    if (shipments.length > 0) {
      const target = shipments[Math.floor(Math.random() * shipments.length)];
      
      // 빨간 줄 방지: 타입을 string으로 명시
      const currentStatus = target.status as string;
      const nextStatus = STATUS_FLOW[currentStatus] || currentStatus;

      // 4. 트래킹 넘버 기반 업데이트 (기존 약속)
      await prisma.shipment.update({
        where: { trackingNumber: target.trackingNumber },
        data: { status: nextStatus as any }
      });

      console.log(`✅ [상태 변경] No: ${target.trackingNumber} | ${target.status} -> ${nextStatus}`);
    } else {
      console.log('💤 모든 화물이 완료되었거나 대상이 없습니다.');
    }

    // 5. 5초 대기 (기존 유지)
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

simulateLogistics()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());