import { db } from "@/lib/db";
import { runShipmentSimulation } from "@/lib/simulator";

describe("Logistics System Schema-Based Comprehensive Test", () => {
  const TEST_TRACKING = "BK-CHK-9999";

  beforeEach(async () => {
    await db.shipment.deleteMany({ where: { trackingNumber: TEST_TRACKING } });
    
    // 기본 데이터 생성
    await db.shipment.create({
      data: {
        trackingNumber: TEST_TRACKING,
        vesselName: null,          // ? (Optional)
        clientName: "Gemini User", // Required
        originPort: "Incheon",     // Required
        destinationPort: "New York", // Required
        status: "PENDING",
        estimatedArrival: new Date(), // Required
        latitude: 37.5665,         // ? (Optional, default 있음)
        longitude: 126.9780,       // ? (Optional, default 있음)
      },
    });
  });

  // 1. 중복 등록 방지
  test("1. 동일한 트래킹 넘버로 중복 등록 시 에러가 발생하는가?", async () => {
    const data = {
      trackingNumber: TEST_TRACKING,
      clientName: "Tester",
      originPort: "A",
      destinationPort: "B",
      estimatedArrival: new Date(),
    };
    await expect(db.shipment.create({ data })).rejects.toThrow();
  });

  // 2. 상태 업데이트 반영
  test("2. 화물 상태 업데이트가 DB에 정확히 반영되는가?", async () => {
    const updated = await db.shipment.update({
      where: { trackingNumber: TEST_TRACKING },
      data: { status: "IN_TRANSIT" },
    });
    expect(updated.status).toBe("IN_TRANSIT");
  });

  // 3. 필수(Required) vs 선택(Optional) 필드 검증 (스키마 기반)
  test("3. 필수값이 없으면 실패하고, 선택값(? 붙은 필드)이 없으면 성공하는가?", async () => {
    // [CASE A] 필수값 clientName 누락 -> 실패해야 함
    const noClient = { 
      trackingNumber: "T-FAIL-1", 
      originPort: "Incheon", 
      destinationPort: "LA", 
      estimatedArrival: new Date() 
    };
    await expect(db.shipment.create({ data: noClient as any })).rejects.toThrow();

    // [CASE B] 필수값 originPort 누락 -> 실패해야 함
    const noOrigin = { 
      trackingNumber: "T-FAIL-2", 
      clientName: "Tester", 
      destinationPort: "LA", 
      estimatedArrival: new Date() 
    };
    await expect(db.shipment.create({ data: noOrigin as any })).rejects.toThrow();

    // [CASE C] 선택값(vesselName, actualArrival) 누락 -> 성공해야 함
    const optionalMissing = { 
      trackingNumber: "T-SUCCESS-1", 
      clientName: "Tester", 
      originPort: "Busan", 
      destinationPort: "Tokyo", 
      estimatedArrival: new Date(),
      vesselName: null,      // ? 필드
      actualArrival: null,   // ? 필드
    };
    const saved = await db.shipment.create({ data: optionalMissing });
    expect(saved.id).toBeDefined();
    expect(saved.vesselName).toBeNull();
    
    // 테스트 후 생성된 데이터 정리
    await db.shipment.delete({ where: { trackingNumber: "T-SUCCESS-1" } });
  });

  // 4. 글로벌 시뮬레이션 좌표 변경 테스트
  test("4. 글로벌 시뮬레이션 실행 시 화물의 좌표가 실제로 변경되는가?", async () => {
    const before = await db.shipment.findUnique({ where: { trackingNumber: TEST_TRACKING } });
    await runShipmentSimulation();
    const after = await db.shipment.findUnique({ where: { trackingNumber: TEST_TRACKING } });

    expect(after?.latitude).not.toBe(before?.latitude);
    expect(after?.longitude).not.toBe(before?.longitude);
  });

  // 5. 위도/경도 유효 범위 및 타입 테스트
  test("5. 시뮬레이션 좌표가 지구 위경도 범위 내에 존재하며 숫자 타입인가?", async () => {
    await runShipmentSimulation();
    const shipment = await db.shipment.findUnique({ where: { trackingNumber: TEST_TRACKING } });
    
    const lat = Number(shipment?.latitude);
    const lng = Number(shipment?.longitude);
    
    expect(lat).toBeGreaterThanOrEqual(-90);
    expect(lat).toBeLessThanOrEqual(90);
    expect(lng).toBeGreaterThanOrEqual(-180);
    expect(lng).toBeLessThanOrEqual(180);
    expect(typeof shipment?.latitude).toBe("number"); // Float 타입 확인
  });
});