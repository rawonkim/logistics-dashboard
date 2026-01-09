# 🚢 Logistics Dashboard Simulator

임의의 시나리오 시뮬레이터와 Mock 데이터를 활용하여 데이터 무결성을 검증한 프로젝트입니다.

## 🏆 Test Coverage Analysis

작성된 모든 비즈니스 로직과 데이터베이스 제약 조건이 의도한 시나리오대로 작동하는지 검증하기 위해 **Jest(제스트)**를 도구로 활용하였습니다.

### 📊 Coverage Summary (Actual Results)
| File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **All files** | **100** | **100** | **100** | **100** | |
| db.ts | 100 | 100 | 100 | 100 | |

**Test Suites:** 1 passed, 1 total  
**Tests:** 5 passed, 5 total  
**Time:** 0.267 s

### ✅ 검증된 테스트 시나리오
1. **동일한 트래킹 넘버로 중복 등록 시 에러 발생** (Unique 제약 조건 확인)
2. **화물 상태 업데이트의 DB 정확성** (Update 로직 확인)
3. **필수값 유무에 따른 처리** (Optional/Required 필드 검증)
4. **글로벌 시뮬레이션 실행 시 화물 좌표 실시간 변경** (Business Logic 확인)
5. **시뮬레이션 좌표의 유효 범위 및 데이터 타입 검사** (Data Integrity 확인)

### 📸 Execution Screenshot
![Jest Coverage Report](./coverage-report.png)
