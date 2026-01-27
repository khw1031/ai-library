# 동적 규칙 생성 가이드

> 프로젝트 분석 결과와 최신 웹 정보를 기반으로 규칙을 동적 생성하는 방법

---

## 1. 동적 생성 원칙

### 템플릿 vs 동적 생성

| 구분 | 템플릿 기반 | 동적 생성 |
|------|-----------|----------|
| 접근 | 미리 정의된 규칙 복사 | 분석 결과로 규칙 생성 |
| 문제점 | 버전/설정 무시, 구식 정보 | - |
| 장점 | 빠름 | 프로젝트에 최적화 |

**이 스킬은 동적 생성 방식을 사용합니다.**

### 생성 흐름

```
[프로젝트 분석]
      │
      ▼
[기술 스택 + 버전 파악]
      │
      ▼
[웹 검색: 최신 베스트 프랙티스]
      │
      ▼
[기존 설정 확인: 린터, 포맷터]
      │
      ▼
[규칙 동적 생성]
```

---

## 2. 웹 검색 전략

### 2.1 검색 트리거

다음 상황에서 웹 검색을 수행:

| 상황 | 검색 쿼리 패턴 |
|------|---------------|
| 최신 메이저 버전 | `"{기술} {버전} best practices {연도}"` |
| 새로운 도구 감지 | `"{도구명} guide {연도}"` |
| 실험적 기능 | `"{기술} {기능} migration"` |
| 보안 관련 | `"{기술} security best practices {연도}"` |

### 2.2 검색 예시

```
# React 19 + React Compiler 감지 시
검색: "React 19 React Compiler best practices 2025"
검색: "babel-plugin-react-compiler useMemo useCallback"

# Next.js 15 감지 시
검색: "Next.js 15 caching changes 2025"
검색: "Next.js 15 App Router migration guide"

# Biome 감지 시 (ESLint 대체)
검색: "Biome vs ESLint 2025"
검색: "Biome configuration best practices"
```

### 2.3 검색 결과 적용

```markdown
## 검색 결과 요약

### React Compiler 관련 (검색 결과)

**출처**: [React 공식 블로그, 2024-12]

- React Compiler는 useMemo, useCallback, memo를 자동 적용
- 수동 메모이제이션은 대부분의 경우 불필요
- 단, `use` 훅과 함께 사용 시 주의 필요

**규칙 반영**:
- "useMemo 사용" → "Compiler가 자동 처리, 수동 사용 불필요"
- "useCallback으로 최적화" → "Compiler가 자동 처리"
```

---

## 3. 규칙 생성 패턴

### 3.1 기본 구조

```yaml
---
description: >
  {프로젝트명} {기술스택} 규칙.
  {버전 정보}, {특수 설정/도구} 환경.
  {트리거 키워드} 작업 시 활성화.
paths:  # 선택 규칙인 경우
  - "{적용 경로 패턴}"
---

# {기술스택} 규칙

## 프로젝트 환경

- **버전**: {감지된 버전}
- **특수 설정**: {감지된 설정들}
- **관련 도구**: {감지된 도구들}

## 핵심 규칙

### {카테고리 1}

{프로젝트 분석 + 웹 검색 결과 기반 규칙}

### {카테고리 2}

{...}

## 주의사항

{버전/설정별 특수 주의사항}

## 참조

- 기존 설정: `{린터/포맷터 설정 파일}`
- 공식 문서: {검색에서 확인된 공식 문서 링크}
```

### 3.2 기술 스택별 생성 포인트

#### TypeScript

```
분석 항목:
- tsconfig.json의 strict 옵션들
- paths 설정 (별칭)
- target/module 버전
- 사용 중인 데코레이터 (@)

웹 검색:
- "TypeScript {버전} strict mode recommendations"
- 새로운 타입 기능 (satisfies, const 등)

규칙 포함:
- strict 설정에 따른 타입 규칙
- 프로젝트의 path alias 사용법
- 버전별 새 기능 활용 권장
```

#### React

```
분석 항목:
- React 버전 (18 vs 19)
- React Compiler 사용 여부
- 상태 관리 라이브러리
- 서버 컴포넌트 사용 여부

웹 검색:
- "React {버전} best practices {연도}"
- Compiler 사용 시 최적화 변경사항

규칙 포함:
- 버전별 권장 패턴 (19는 Compiler 고려)
- 상태 관리 라이브러리 연동
- RSC 관련 규칙 (해당 시)
```

#### Next.js

```
분석 항목:
- Next.js 버전
- App Router vs Pages Router
- 캐싱 설정
- 미들웨어 사용

웹 검색:
- "Next.js {버전} App Router changes"
- 버전별 캐싱 전략 변화

규칙 포함:
- 라우터 타입에 맞는 패턴
- 버전별 캐싱 권장사항
- 서버/클라이언트 컴포넌트 분리
```

---

## 4. 기존 설정과의 조화

### 4.1 린터 설정 확인

```
감지 파일:
- eslint.config.js / .eslintrc.*
- biome.json
- .prettierrc
- deno.json

처리 방식:
1. 린터가 강제하는 규칙 → Rule에서 제외
2. 린터가 다루지 않는 규칙 → Rule에 포함
3. 린터 설정 파일 참조 안내
```

### 4.2 중복 방지

```yaml
# 나쁜 예: 린터와 중복
---
description: TypeScript 규칙
---
# TypeScript 규칙

## 네이밍 컨벤션
- camelCase 사용  # ← ESLint가 이미 강제

# 좋은 예: 린터 참조
---
description: TypeScript 규칙
---
# TypeScript 규칙

## 네이밍 컨벤션

상세 규칙은 ESLint 설정 참조: `eslint.config.js`

## 추가 지침 (린터 미적용)

- 복잡한 타입은 `types/` 디렉토리에 분리
- 공유 타입은 barrel export 사용
```

---

## 5. 버전별 주의사항 명시

### 5.1 Breaking Changes 반영

```yaml
---
description: >
  Next.js 15 규칙. 
  ⚠️ Next.js 14 이하와 캐싱 전략이 다름.
---

# Next.js 15 규칙

## ⚠️ 버전 주의사항

Next.js 15에서 변경된 사항:

| 항목 | Next.js 14 | Next.js 15 |
|------|-----------|-----------|
| fetch 캐싱 | 기본 캐시 | 기본 no-store |
| Route Handlers | 기본 캐시 | 기본 동적 |

## 캐싱 전략

```tsx
// 명시적 캐싱 필요
const data = await fetch(url, { 
  next: { revalidate: 3600 } // 명시적 설정
});
```
```

### 5.2 Deprecated 패턴 경고

```yaml
## ⚠️ Deprecated 패턴

### React Compiler 사용 시 불필요

다음 패턴은 이 프로젝트에서 불필요합니다:

```tsx
// ❌ 불필요 - Compiler가 자동 처리
const memoizedValue = useMemo(() => compute(a, b), [a, b]);
const memoizedCallback = useCallback(() => onClick(id), [id, onClick]);

// ✅ 단순하게 작성
const value = compute(a, b);
const callback = () => onClick(id);
```
```

---

## 6. 생성 체크리스트

규칙 생성 시 확인:

```
□ 프로젝트의 실제 버전이 반영되었는가?
□ 웹 검색으로 최신 정보를 확인했는가?
□ 기존 린터/포맷터 설정과 충돌하지 않는가?
□ deprecated 패턴을 권장하고 있지 않은가?
□ 버전별 주의사항이 명시되었는가?
□ 프로젝트 구조가 반영되었는가? (Feature 기반 등)
□ 특수 도구(Compiler, Turbopack 등)가 고려되었는가?
```

---

## 7. 예시: React 19 + Compiler 프로젝트

### 분석 결과

```
package.json:
  - react: ^19.0.0
  - babel-plugin-react-compiler: ^19.0.0
  - next: ^15.0.0
```

### 웹 검색

```
검색: "React 19 React Compiler best practices 2025"
결과: useMemo, useCallback 불필요, 단순 작성 권장
```

### 생성된 규칙

```yaml
---
description: >
  React 19 + Compiler 규칙.
  수동 메모이제이션 불필요, 단순 작성 권장.
paths:
  - "**/*.tsx"
  - "**/components/**"
---

# React 규칙

## 프로젝트 환경

- **React**: 19.x
- **React Compiler**: 활성화 (babel-plugin-react-compiler)
- **Next.js**: 15.x (App Router)

## 핵심: Compiler 환경

이 프로젝트는 React Compiler를 사용합니다.
Compiler가 자동으로 최적화를 수행하므로 **수동 메모이제이션이 불필요**합니다.

### 불필요한 패턴

```tsx
// ❌ Compiler가 자동 처리
const memoized = useMemo(() => expensive(data), [data]);
const callback = useCallback(() => action(id), [id, action]);
const MemoComponent = React.memo(Component);
```

### 권장 패턴

```tsx
// ✅ 단순하게 작성
const value = expensive(data);
const callback = () => action(id);
function Component(props) { ... }
```

## 컴포넌트 작성

### 서버 vs 클라이언트

- 데이터 페칭, DB 접근 → 서버 컴포넌트 (기본)
- 상호작용, 브라우저 API → 클라이언트 컴포넌트 (`'use client'`)

### 파일 구조

프로젝트의 Feature 기반 구조 준수:

```
src/features/{feature}/
├── components/
├── hooks/
└── api/
```

## 참조

- ESLint: `eslint.config.js`
- [React Compiler 문서](https://react.dev/learn/react-compiler)
```
