/**
 * TC 엑셀 생성 스크립트
 *
 * 사용법:
 * npx ts-node scripts/generate-excel.ts --input tc-data.json --output qa-output/tc-report.xlsx
 *
 * 의존성:
 * npm install xlsx
 */

import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";

// ============================================
// 타입 정의
// ============================================

interface TestCase {
  id: string; // TC-SCR01-001
  screen: string; // 화면명
  title: string; // 테스트 제목
  priority: "P0" | "P1" | "P2" | "P3";
  precondition: string; // 사전 조건
  steps: string; // 테스트 단계
  expected: string; // 기대 결과
  testData?: string; // 테스트 데이터
  status?: "Pass" | "Fail" | "Skip" | ""; // 실행 결과
  executedAt?: string; // 실행 일시
  note?: string; // 비고
  screenshot?: string; // 스크린샷 경로
}

interface ScreenCoverage {
  screen: string;
  total: number;
  p0: number;
  p1: number;
  p2: number;
  p3: number;
  pass: number;
  fail: number;
  skip: number;
}

// ============================================
// 엑셀 생성
// ============================================

export function generateExcel(testCases: TestCase[], outputPath: string): void {
  const workbook = XLSX.utils.book_new();

  // Sheet 1: TC 목록
  const tcSheet = createTCSheet(testCases);
  XLSX.utils.book_append_sheet(workbook, tcSheet, "TC 목록");

  // Sheet 2: 화면별 커버리지
  const coverageSheet = createCoverageSheet(testCases);
  XLSX.utils.book_append_sheet(workbook, coverageSheet, "커버리지");

  // 출력 디렉토리 생성
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 파일 저장
  XLSX.writeFile(workbook, outputPath);
  console.log(`✅ 엑셀 파일 생성 완료: ${outputPath}`);
}

function createTCSheet(testCases: TestCase[]): XLSX.WorkSheet {
  const headers = [
    "TC ID",
    "화면",
    "테스트 제목",
    "우선순위",
    "사전조건",
    "테스트 단계",
    "기대 결과",
    "테스트 데이터",
    "상태",
    "실행 일시",
    "비고",
    "스크린샷",
  ];

  const rows = testCases.map((tc) => [
    tc.id,
    tc.screen,
    tc.title,
    tc.priority,
    tc.precondition,
    tc.steps,
    tc.expected,
    tc.testData || "",
    tc.status || "",
    tc.executedAt || "",
    tc.note || "",
    tc.screenshot || "",
  ]);

  const data = [headers, ...rows];
  const sheet = XLSX.utils.aoa_to_sheet(data);

  // 열 너비 설정
  sheet["!cols"] = [
    { wch: 15 }, // TC ID
    { wch: 15 }, // 화면
    { wch: 30 }, // 테스트 제목
    { wch: 8 }, // 우선순위
    { wch: 25 }, // 사전조건
    { wch: 40 }, // 테스트 단계
    { wch: 30 }, // 기대 결과
    { wch: 20 }, // 테스트 데이터
    { wch: 8 }, // 상태
    { wch: 18 }, // 실행 일시
    { wch: 25 }, // 비고
    { wch: 30 }, // 스크린샷
  ];

  return sheet;
}

function createCoverageSheet(testCases: TestCase[]): XLSX.WorkSheet {
  // 화면별 집계
  const screenMap = new Map<string, ScreenCoverage>();

  for (const tc of testCases) {
    if (!screenMap.has(tc.screen)) {
      screenMap.set(tc.screen, {
        screen: tc.screen,
        total: 0,
        p0: 0,
        p1: 0,
        p2: 0,
        p3: 0,
        pass: 0,
        fail: 0,
        skip: 0,
      });
    }

    const coverage = screenMap.get(tc.screen)!;
    coverage.total++;
    coverage[tc.priority.toLowerCase() as "p0" | "p1" | "p2" | "p3"]++;

    if (tc.status === "Pass") coverage.pass++;
    else if (tc.status === "Fail") coverage.fail++;
    else if (tc.status === "Skip") coverage.skip++;
  }

  const headers = [
    "화면",
    "총 TC",
    "P0",
    "P1",
    "P2",
    "P3",
    "Pass",
    "Fail",
    "Skip",
  ];

  const rows = Array.from(screenMap.values()).map((c) => [
    c.screen,
    c.total,
    c.p0,
    c.p1,
    c.p2,
    c.p3,
    c.pass,
    c.fail,
    c.skip,
  ]);

  // 합계 행 추가
  const totals = rows.reduce(
    (acc, row) => {
      for (let i = 1; i < row.length; i++) {
        acc[i] = (acc[i] || 0) + (row[i] as number);
      }
      return acc;
    },
    ["합계"] as (string | number)[]
  );
  rows.push(totals);

  const data = [headers, ...rows];
  const sheet = XLSX.utils.aoa_to_sheet(data);

  sheet["!cols"] = [
    { wch: 15 },
    { wch: 8 },
    { wch: 6 },
    { wch: 6 },
    { wch: 6 },
    { wch: 6 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
  ];

  return sheet;
}

// ============================================
// TC JSON → 엑셀 변환 (CLI)
// ============================================

function main() {
  const args = process.argv.slice(2);
  const inputIdx = args.indexOf("--input");
  const outputIdx = args.indexOf("--output");

  if (inputIdx === -1 || outputIdx === -1) {
    console.log("사용법: npx ts-node generate-excel.ts --input <json> --output <xlsx>");
    process.exit(1);
  }

  const inputPath = args[inputIdx + 1];
  const outputPath = args[outputIdx + 1];

  const jsonData = fs.readFileSync(inputPath, "utf-8");
  const testCases: TestCase[] = JSON.parse(jsonData);

  generateExcel(testCases, outputPath);
}

// CLI 실행
if (require.main === module) {
  main();
}

export type { TestCase, ScreenCoverage };
