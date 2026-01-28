# TC Templates

> 테스트 케이스 생성을 위한 템플릿 및 가이드

---

## TC 유형별 템플릿

### 1. UI 컴포넌트 테스트

```markdown
### TC-{NNN}: {컴포넌트명} 렌더링 테스트

**Category**: UI
**Priority**: High
**Source**: {파일경로}:{라인}

#### 전제조건
- 페이지가 정상 로드됨
- 필요한 데이터가 로드됨

#### 테스트 단계
| Step | Action | Expected |
|------|--------|----------|
| 1 | {페이지} 접속 | 페이지 로드 완료 |
| 2 | {컴포넌트} 위치 확인 | 컴포넌트 노출됨 |
| 3 | 스타일 검증 | Figma 디자인과 일치 |

#### 실행 결과
- **Status**: [ ] PASS / [ ] FAIL / [ ] BLOCKED
```

### 2. 사용자 인터랙션 테스트

```markdown
### TC-{NNN}: {기능명} 인터랙션 테스트

**Category**: Functional
**Priority**: Critical
**Source**: 기획서 섹션 {N}

#### 전제조건
- 사용자가 로그인 상태
- {필요한 데이터} 존재

#### 테스트 단계
| Step | Action | Expected |
|------|--------|----------|
| 1 | {버튼/링크} 클릭 | {반응} 발생 |
| 2 | {입력필드}에 {값} 입력 | 입력값 표시 |
| 3 | {제출버튼} 클릭 | {결과} 표시 |
| 4 | 결과 확인 | {성공메시지} 노출 |

#### 실행 결과
- **Status**: [ ] PASS / [ ] FAIL / [ ] BLOCKED
```

### 3. 에러 핸들링 테스트

```markdown
### TC-{NNN}: {기능명} 에러 처리 테스트

**Category**: Functional
**Priority**: High
**Source**: {파일경로}:{라인}

#### 전제조건
- {에러 발생 조건} 설정

#### 테스트 단계
| Step | Action | Expected |
|------|--------|----------|
| 1 | {에러 유발 액션} 수행 | 에러 발생 |
| 2 | 에러 메시지 확인 | {예상 에러 메시지} 노출 |
| 3 | 복구 액션 수행 | 정상 상태로 복귀 |

#### 실행 결과
- **Status**: [ ] PASS / [ ] FAIL / [ ] BLOCKED
```

### 4. API 통합 테스트

```markdown
### TC-{NNN}: {API명} 통합 테스트

**Category**: Integration
**Priority**: Critical
**Source**: {API 엔드포인트}

#### 전제조건
- API 서버 정상 동작
- 인증 토큰 유효

#### 테스트 단계
| Step | Action | Expected |
|------|--------|----------|
| 1 | {트리거 액션} 수행 | API 호출 발생 |
| 2 | 응답 대기 | 로딩 상태 표시 |
| 3 | 응답 수신 | 데이터 화면에 반영 |
| 4 | 네트워크 탭 확인 | 올바른 요청/응답 |

#### 실행 결과
- **Status**: [ ] PASS / [ ] FAIL / [ ] BLOCKED
```

---

## 기획서 기반 TC 생성 가이드

### 기획서 분석 체크리스트

```
□ 기능 요구사항 목록 추출
□ 사용자 시나리오 식별
□ 입력 필드별 유효성 검사 규칙
□ 에러 케이스 및 메시지
□ 상태 전이 다이어그램 (있는 경우)
□ 권한별 접근 제어
```

### TC 우선순위 기준

| Priority | 기준 | 예시 |
|----------|------|------|
| Critical | 핵심 비즈니스 로직, 결제, 인증 | 로그인, 결제 완료 |
| High | 주요 기능, 에러 핸들링 | 회원가입, 상품 등록 |
| Medium | 부가 기능, UI 상태 | 정렬, 필터링 |
| Low | 스타일, 마이크로 인터랙션 | 툴팁, 애니메이션 |

---

## 코드 변경 기반 TC 도출

### 변경 유형별 TC

| 변경 유형 | TC 도출 방법 |
|----------|-------------|
| 컴포넌트 수정 | 해당 컴포넌트 사용 화면 테스트 |
| API 엔드포인트 변경 | 해당 API 호출 기능 테스트 |
| 스타일 변경 | 뷰포트별 UI 테스트 |
| 유틸 함수 수정 | 함수 사용처 기능 테스트 |
| 상태 관리 변경 | 상태 의존 컴포넌트 테스트 |

### 영향 범위 분석

```bash
# 변경 파일이 import되는 곳 찾기
grep -r "import.*{변경파일}" --include="*.tsx" --include="*.ts"

# 컴포넌트 사용처 찾기
grep -r "<{컴포넌트명}" --include="*.tsx"
```

---

## TC 실행 방법

### Playwright 사용 시

```typescript
test('{TC_ID}: {테스트명}', async ({ page }) => {
  // 전제조건
  await page.goto('{URL}');
  
  // Step 1
  await page.click('{selector}');
  await expect(page.locator('{selector}')).toBeVisible();
  
  // Step 2
  await page.fill('{selector}', '{value}');
  
  // 검증
  await expect(page.locator('{selector}')).toHaveText('{expected}');
});
```

### Cypress 사용 시

```typescript
it('{TC_ID}: {테스트명}', () => {
  // 전제조건
  cy.visit('{URL}');
  
  // Step 1
  cy.get('{selector}').click();
  cy.get('{selector}').should('be.visible');
  
  // Step 2
  cy.get('{selector}').type('{value}');
  
  // 검증
  cy.get('{selector}').should('contain', '{expected}');
});
```

---

## 중복 검사 로직

### TC 시그니처 생성

```javascript
function getTCSignature(tc) {
  const normalized = {
    name: tc.name.toLowerCase().trim(),
    target: tc.source.split(':')[0], // 파일 또는 컴포넌트
    steps: tc.steps.map(s => s.action.toLowerCase()).join('|')
  };
  return hash(JSON.stringify(normalized));
}
```

### 중복 판단

```
기존 TC 시그니처 Set 생성
↓
새 TC 시그니처 계산
↓
Set에 존재? → Skip
↓
Set에 없음? → 추가
```

---

## TC 결과 집계

### 통계 계산

```
Total = UI + Functional + Integration
Pass Rate = (Pass / Total) * 100
Fail Rate = (Fail / Total) * 100
Block Rate = (Blocked / Total) * 100
```

### 리포트 포맷

```markdown
## Test Execution Summary

| Metric | Value |
|--------|-------|
| Total TCs | {n} |
| Executed | {n} |
| Pass | {n} ({p}%) |
| Fail | {n} ({p}%) |
| Blocked | {n} ({p}%) |
| Coverage | {p}% |
```
