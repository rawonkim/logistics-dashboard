import { NextResponse } from "next/server";
import { runShipmentSimulation } from "@/lib/simulator"; 

export async function GET() {
  try {
    // 1. 시뮬레이터 함수를 실행해서 DB의 위도/경도를 랜덤하게 변경
    await runShipmentSimulation();
    
    // 2. 성공하면 브라우저에 결과 표시
    return NextResponse.json({ 
      success: true, 
      message: "시뮬레이션이 성공적으로 실행되었습니다. 좌표가 업데이트되었습니다!" 
    });
  } catch (error) {
    console.error("Simulation Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "데이터 업데이트 중 오류가 발생했습니다." 
    }, { status: 500 });
  }
}