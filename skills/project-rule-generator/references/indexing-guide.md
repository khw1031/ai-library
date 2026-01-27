# 규칙 인덱싱 가이드

> 필수/선택 규칙을 분류하고 인덱스를 구성하는 전략

---

## 1. 필수 vs 선택 규칙 분류

### 1.1 필수 규칙 (Essential)

**조건**: 다음 중 하나 이상 해당

- [ ] 모든 코드 작성에 영향을 미침
- [ ] 프로젝트 전반에 적용됨
- [ ] 기술 스택의 핵심 패턴
- [ ] 위반 시 빌드/런타임 오류 발생

**설정 방법:**

```yaml
---
description: >
  TypeScript 코딩 컨벤션. 모든 .ts/.tsx 파일 작업 시 적용.
# paths 없음 = 항상 활성화 고려 대상
---
```

또는 넓은 paths 사용:

```yaml
paths:
  - "**/*.ts"
  - "**/*.tsx"
```

### 1.2 선택 규칙 (Conditional)

**조건**: 다음 중 하나 이상 해당

- [ ] 특정 파일/경로에서만 관련
- [ ] 특정 작업(테스트, API 등)에서만 필요
- [ ] 도메인 특화 지식
- [ ] 상세 레퍼런스 문서

**설정 방법:**

```yaml
---
description: >
  테스트 작성 규칙. 테스트 파일 작성/수정 시 활성화.
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "__tests__/**"
---
```

---

## 2. 인덱스 파일 구조

### 2.1 프로젝트 루트 인덱스 (목차 포함)

`.claude/rules/AGENTS.md`:

```markdown
# {프로젝트명} Rules

> {프로젝트 한 줄 설명}

## 핵심 원칙

1. {원칙 1}
2. {원칙 2}
3. {원칙 3}

---

## 목차

- [핵심 규칙 (Core)](#핵심-규칙-core)
- [프론트엔드 (Frontend)](#프론트엔드-frontend)
- [테스트 (Testing)](#테스트-testing)
- [문서 (Docs)](#문서-docs)

---

## 핵심 규칙 (Core)

> 모든 코드에 적용되는 기본 규칙

| 규칙 | 적용 대상 | 설명 |
|------|----------|------|
| [typescript](core/typescript.md) | `**/*.ts{,x}` | TypeScript 컨벤션 |
| [architecture](core/architecture.md) | 전역 | 프로젝트 구조 원칙 |

→ 상세: [core/AGENTS.md](core/AGENTS.md)

---

## 프론트엔드 (Frontend)

> UI, 컴포넌트, 상태관리 규칙

| 규칙 | 적용 대상 | 설명 |
|------|----------|------|
| [react](frontend/react.md) | `**/*.tsx` | React 컴포넌트 패턴 |
| [components](frontend/components.md) | `**/components/**` | 컴포넌트 구조 |

→ 상세: [frontend/AGENTS.md](frontend/AGENTS.md)

---

## 테스트 (Testing)

> 테스트 작성 규칙 (조건부 활성화)

| 규칙 | 적용 대상 | 설명 |
|------|----------|------|
| [unit](testing/unit.md) | `**/*.test.*` | 단위 테스트 가이드 |
| [e2e](testing/e2e.md) | `e2e/**` | E2E 테스트 가이드 |

→ 상세: [testing/AGENTS.md](testing/AGENTS.md)

---

## 문서 (Docs)

> PRD, API 스펙 등 문서 기반 규칙

| 문서 | 설명 | 참조 |
|------|------|------|
| [PRD](docs/prd/) | 제품 요구사항 | 기획 참조 시 |
| [API 스펙](docs/api-spec/) | API 명세 | API 개발 시 |

→ 상세: [docs/AGENTS.md](docs/AGENTS.md)
```

### 2.2 디렉토리 규칙 인덱스

`.claude/rules/prd/AGENTS.md`:

```markdown
# PRD - {프로젝트명}

> 제품 요구사항 문서

## 핵심 목적

- {목적 1}
- {목적 2}

## 섹션 안내

| 섹션 | 설명 | 참조 |
|------|------|------|
| 핵심 요구사항 | MVP 범위 | [RULE.md](RULE.md) |
| 사용자 스토리 | 상세 시나리오 | [user-stories.md](references/user-stories.md) |
| 기능 명세 | 기능별 상세 | [functional-specs.md](references/functional-specs.md) |
```

---

## 3. paths 패턴 가이드

### 3.1 자주 사용하는 패턴

| 패턴 | 매칭 대상 |
|------|----------|
| `**/*.ts` | 모든 TypeScript 파일 |
| `**/*.tsx` | 모든 TSX 파일 |
| `**/*.test.*` | 테스트 파일 |
| `**/*.spec.*` | 스펙 파일 |
| `src/components/**` | 컴포넌트 디렉토리 |
| `app/api/**` | Next.js API 라우트 |
| `src/features/auth/**` | 특정 feature |

### 3.2 복합 패턴

```yaml
# 테스트 관련 모든 파일
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "**/*.spec.tsx"
  - "__tests__/**"
  - "tests/**"

# 특정 모듈
paths:
  - "src/features/payment/**"
  - "src/api/payment/**"
```

---

## 4. 인덱싱 전략

### 4.1 기본 전략: 카테고리 기반 구조

**기본적으로 모든 규칙을 카테고리별로 그룹화하고 목차를 제공합니다.**

```
.claude/rules/
├── AGENTS.md              # 전체 인덱스 + 목차
├── CLAUDE.md
│
├── core/                  # 핵심 규칙 카테고리
│   ├── AGENTS.md
│   ├── typescript.md
│   └── architecture.md
│
├── frontend/              # 프론트엔드 카테고리
│   ├── AGENTS.md
│   ├── react.md
│   └── components.md
│
├── testing/               # 테스트 카테고리
│   ├── AGENTS.md
│   └── unit.md
│
└── docs/                  # 문서 기반 카테고리
    └── AGENTS.md
```

### 4.2 예외: 플랫 구조 (규칙 2-3개)

규칙이 매우 적은 경우에만 플랫 구조 허용:

```
.claude/rules/
├── AGENTS.md
├── CLAUDE.md
├── typescript.md
└── architecture.md
```

**플랫 구조 조건:**
- 전체 규칙이 2-3개 이하
- 모든 규칙이 동일 카테고리에 속함
- 확장 가능성이 낮음

### 4.3 큰 프로젝트 (규칙 15개 이상)

계층적 디렉토리 구조 + 하위 카테고리:

```
.claude/rules/
├── AGENTS.md              # 메인 인덱스 + 목차
├── CLAUDE.md
│
├── core/                  # 핵심 규칙
│   ├── AGENTS.md
│   ├── typescript.md
│   ├── architecture.md
│   └── coding-style.md
│
├── frontend/              # 프론트엔드 규칙
│   ├── AGENTS.md
│   ├── react.md
│   ├── components.md
│   ├── state-management.md
│   └── styling.md
│
├── backend/               # 백엔드 규칙
│   ├── AGENTS.md
│   ├── api.md
│   ├── database.md
│   └── auth.md
│
├── features/              # Feature별 규칙 (도메인)
│   ├── AGENTS.md
│   ├── auth/
│   ├── payment/
│   └── dashboard/
│
├── testing/               # 테스트 규칙
│   ├── AGENTS.md
│   ├── unit.md
│   ├── integration.md
│   └── e2e.md
│
├── infra/                 # 인프라 규칙
│   ├── AGENTS.md
│   ├── docker.md
│   └── ci-cd.md
│
└── docs/                  # 문서 기반 규칙
    ├── AGENTS.md
    ├── prd/
    └── api-spec/
```

---

## 5. 규칙 우선순위

Claude가 여러 규칙을 참조할 때 우선순위:

```
1. 현재 작업 파일과 paths 매칭되는 규칙
2. description에 현재 작업 키워드가 포함된 규칙
3. 필수 규칙 (paths 없음 또는 넓은 paths)
4. 프로젝트 루트 AGENTS.md 인덱스
```

### 우선순위 힌트 제공

description에 우선순위 힌트 포함:

```yaml
---
description: >
  결제 도메인 비즈니스 규칙. 결제, 주문, 정산 관련 코드 작성 시 
  반드시 참조. 다른 규칙보다 우선 적용.
paths:
  - "src/features/payment/**"
  - "src/features/order/**"
---
```

---

## 6. 인덱스 유지보수

### 6.1 규칙 추가 시

1. 적절한 위치에 규칙 파일 생성
2. 상위 AGENTS.md 인덱스에 항목 추가
3. 필수/선택 분류 확인

### 6.2 규칙 삭제 시

1. 규칙 파일 삭제
2. 상위 AGENTS.md 인덱스에서 항목 제거
3. 다른 규칙의 참조 링크 확인

### 6.3 정기 점검

```
□ 모든 규칙이 인덱스에 포함되어 있는가?
□ 더 이상 사용하지 않는 규칙이 있는가?
□ paths 패턴이 현재 구조와 일치하는가?
□ 필수/선택 분류가 적절한가?
```
