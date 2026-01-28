# Figma Viewport Guide

> Figma 디자인과 구현 UI의 뷰포트 일치 테스트 가이드

---

## Figma MCP 도구 사용법

### 1. 메타데이터 조회

```
mcp__figma-desktop-mcp__get_metadata
```

**용도**: 노드 구조 파악, 노드 ID 확인
**파라미터**:
- `nodeId`: Figma 노드 ID (예: "123:456")

**응답 예시**:
```xml
<FRAME name="Desktop" id="1:100" x="0" y="0" width="1440" height="900">
  <FRAME name="Header" id="1:101" ...>
  <FRAME name="Content" id="1:102" ...>
</FRAME>
```

### 2. 디자인 컨텍스트 조회

```
mcp__figma-desktop-mcp__get_design_context
```

**용도**: 상세 스타일, 속성, 코드 생성 정보
**파라미터**:
- `nodeId`: Figma 노드 ID
- `clientLanguages`: 사용 언어 (예: "typescript,css")
- `clientFrameworks`: 사용 프레임워크 (예: "react")

### 3. 스크린샷 획득

```
mcp__figma-desktop-mcp__get_screenshot
```

**용도**: 시각적 비교용 이미지
**파라미터**:
- `nodeId`: Figma 노드 ID

---

## 뷰포트 크기 추출

### Figma URL에서 정보 추출

```
URL: https://figma.com/design/:fileKey/:fileName?node-id=1-2

추출:
- fileKey: :fileKey 부분
- nodeId: 1-2 → 1:2 (하이픈을 콜론으로)
```

### 노드에서 크기 추출

```
1. get_metadata로 노드 정보 조회
2. Frame/Component 노드의 width, height 추출
3. 뷰포트 크기로 사용
```

**일반적인 뷰포트 크기**:

| 디바이스 | Width | Height |
|----------|-------|--------|
| Desktop | 1440 | 900 |
| Desktop HD | 1920 | 1080 |
| Tablet | 768 | 1024 |
| Mobile | 375 | 812 |
| Mobile Small | 320 | 568 |

---

## resize_tool 활용

### Playwright

```typescript
// 뷰포트 설정
await page.setViewportSize({ width: 1440, height: 900 });

// 또는 테스트 설정에서
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 }
});
```

### Cypress

```typescript
// cypress.config.ts
export default defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
});

// 또는 테스트 내에서
cy.viewport(1440, 900);
```

### Puppeteer

```typescript
await page.setViewport({ width: 1440, height: 900 });
```

---

## 시각적 비교 방법

### 1. 스크린샷 비교

```bash
# 구현 화면 스크린샷
npx playwright screenshot {URL} --viewport-size=1440,900

# 또는 테스트 내에서
await page.screenshot({ path: 'actual.png' });
```

### 2. 픽셀 비교 도구

```typescript
import { comparePNG } from 'pngjs-image-diff';

const result = await comparePNG({
  actualImage: 'actual.png',
  expectedImage: 'figma-screenshot.png',
  diffImage: 'diff.png',
  threshold: 0.1 // 10% 허용 오차
});

console.log(`Difference: ${result.diffPercentage}%`);
```

### 3. 요소별 비교

```typescript
// 특정 요소만 스크린샷
const element = await page.locator('.header');
await element.screenshot({ path: 'header-actual.png' });
```

---

## 테스트 시나리오

### 시나리오 1: 전체 페이지 비교

```markdown
1. Figma에서 전체 프레임 스크린샷
2. 동일 뷰포트로 브라우저 설정
3. 페이지 로드 후 스크린샷
4. 두 이미지 픽셀 비교
5. 차이 5% 이하면 PASS
```

### 시나리오 2: 반응형 테스트

```markdown
1. Figma에서 각 브레이크포인트 프레임 확인
2. 각 뷰포트 크기로 테스트 반복
   - Desktop (1440px)
   - Tablet (768px)
   - Mobile (375px)
3. 각 뷰포트별 일치 여부 기록
```

### 시나리오 3: 컴포넌트 단위 테스트

```markdown
1. Figma에서 특정 컴포넌트 노드 선택
2. 컴포넌트 크기 추출
3. 해당 컴포넌트만 캡처
4. 구현된 컴포넌트와 비교
```

---

## 결과 기록 형식

### 뷰포트 테스트 결과

```markdown
## Viewport Test Results

### Desktop (1440x900)

| Item | Figma | Actual | Match |
|------|-------|--------|-------|
| Header Height | 64px | 64px | ✅ |
| Content Width | 1200px | 1200px | ✅ |
| Footer Position | bottom | bottom | ✅ |

**Screenshot Diff**: 2.3% (Threshold: 5%)
**Status**: ✅ PASS

### Mobile (375x812)

| Item | Figma | Actual | Match |
|------|-------|--------|-------|
| Header Height | 56px | 60px | ❌ |
| Menu | Hamburger | Hamburger | ✅ |

**Screenshot Diff**: 8.7% (Threshold: 5%)
**Status**: ❌ FAIL

#### Differences
- Header height: Figma 56px vs Actual 60px
- Button padding differs by 4px
```

---

## 일반적인 불일치 원인

| 원인 | 해결 방법 |
|------|----------|
| 폰트 렌더링 차이 | threshold 조정, 폰트 임베딩 |
| 애니메이션 진행 중 | 애니메이션 완료 대기 |
| 동적 데이터 | 목 데이터 사용 |
| 스크롤바 | 숨김 처리 또는 마스킹 |
| 로딩 상태 | 로딩 완료 대기 |

---

## 자동화 스크립트 예시

```typescript
async function runViewportTest(figmaNodeId: string, pageUrl: string) {
  // 1. Figma 메타데이터 조회
  const metadata = await figmaMcp.getMetadata(figmaNodeId);
  const { width, height } = extractDimensions(metadata);
  
  // 2. Figma 스크린샷
  const figmaScreenshot = await figmaMcp.getScreenshot(figmaNodeId);
  
  // 3. 브라우저 테스트
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width, height });
  await page.goto(pageUrl);
  await page.waitForLoadState('networkidle');
  
  // 4. 구현 스크린샷
  const actualScreenshot = await page.screenshot();
  
  // 5. 비교
  const diff = await compareImages(figmaScreenshot, actualScreenshot);
  
  return {
    viewport: { width, height },
    diffPercentage: diff.percentage,
    pass: diff.percentage < 5
  };
}
```

---

## 권장 Threshold

| 테스트 유형 | Threshold | 근거 |
|------------|-----------|------|
| 픽셀 퍼펙트 | 1% | 정확한 디자인 시스템 |
| 일반 UI | 5% | 폰트/안티앨리어싱 차이 |
| 레이아웃 | 10% | 구조적 일치만 확인 |
| 프로토타입 | 15% | 대략적 일치 확인 |
