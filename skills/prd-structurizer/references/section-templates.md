# 섹션별 템플릿

## AGENTS.md 템플릿

```markdown
# {프로젝트명} PRD

> {프로젝트 한 줄 설명}

## 핵심 목표

- {목표 1}
- {목표 2}
- {목표 3}

## 섹션 안내

| 섹션 | 설명 | 참조 |
|------|------|------|
| 핵심 요구사항 | MVP 범위, 우선순위, 제약사항 | [RULE.md](RULE.md) |
| 사용자 스토리 | 페르소나, 유저 플로우 | [user-stories.md](references/user-stories.md) |
| 기능 명세 | 상세 기능 정의 | [functional-specs.md](references/functional-specs.md) |
| 기술 명세 | 아키텍처, 데이터 모델 | [technical-specs.md](references/technical-specs.md) |
| UI/UX 명세 | 디자인, 인터랙션 | [ui-ux-specs.md](references/ui-ux-specs.md) |
| API 명세 | 엔드포인트, 스키마 | [api-specs.md](references/api-specs.md) |
| 제약사항 | 성능, 보안, 법적 요건 | [constraints.md](references/constraints.md) |
```

---

## RULE.md 템플릿

```markdown
---
description: >
  {프로젝트명} 개발 시 적용되는 핵심 요구사항.
  {프로젝트명} 관련 기능 구현, 코드 작성 시 활성화.
paths:
  - "src/**"  # 프로젝트 소스 경로에 맞게 수정
---

# {프로젝트명} 핵심 요구사항

## MVP 범위

### 포함 (In Scope)

- {MVP 기능 1}
- {MVP 기능 2}
- {MVP 기능 3}

### 제외 (Out of Scope)

- {제외 항목 1}
- {제외 항목 2}

---

## 우선순위

### P0 (필수)

- [ ] {필수 기능 1}
- [ ] {필수 기능 2}

### P1 (중요)

- [ ] {중요 기능 1}
- [ ] {중요 기능 2}

### P2 (권장)

- [ ] {권장 기능 1}

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | {프레임워크} |
| Backend | {프레임워크} |
| Database | {DB} |
| Infrastructure | {인프라} |

---

## 주요 제약사항

- {제약 1}
- {제약 2}

---

## 상세 참조

상세 정보가 필요한 경우:

- [사용자 스토리](references/user-stories.md)
- [기능 명세](references/functional-specs.md)
- [기술 명세](references/technical-specs.md)
```

---

## references/user-stories.md 템플릿

```markdown
# 사용자 스토리

## 페르소나

### {페르소나 1}

- **역할**: {역할}
- **목표**: {달성하고자 하는 것}
- **Pain Point**: {현재 겪는 문제}

### {페르소나 2}

- **역할**: {역할}
- **목표**: {달성하고자 하는 것}
- **Pain Point**: {현재 겪는 문제}

---

## 유저 스토리

### Epic: {에픽 이름}

#### US-001: {스토리 제목}

- **As a** {사용자 유형}
- **I want to** {원하는 행동}
- **So that** {얻고자 하는 가치}

**인수 조건**:
- [ ] {조건 1}
- [ ] {조건 2}

#### US-002: {스토리 제목}

...

---

## 유저 플로우

### {플로우 이름}

1. {단계 1}
2. {단계 2}
3. {단계 3}
```

---

## references/functional-specs.md 템플릿

```markdown
# 기능 명세

## 기능 목록

| ID | 기능명 | 우선순위 | 상태 |
|----|--------|----------|------|
| F-001 | {기능 1} | P0 | 정의됨 |
| F-002 | {기능 2} | P1 | 정의됨 |

---

## 상세 명세

### F-001: {기능명}

**설명**: {기능 설명}

**입력**:
- {입력 1}
- {입력 2}

**출력**:
- {출력 1}

**비즈니스 로직**:
1. {로직 1}
2. {로직 2}

**예외 처리**:
- {예외 상황}: {처리 방법}

**관련 스토리**: US-001, US-002

---

### F-002: {기능명}

...
```

---

## references/technical-specs.md 템플릿

```markdown
# 기술 명세

## 시스템 아키텍처

### 개요

{아키텍처 개요 설명}

### 컴포넌트 다이어그램

{다이어그램 또는 설명}

---

## 데이터 모델

### {엔티티 1}

| 필드 | 타입 | 설명 | 제약 |
|------|------|------|------|
| id | UUID | 고유 식별자 | PK |
| {필드} | {타입} | {설명} | {제약} |

### {엔티티 2}

...

---

## 시스템 흐름

### {흐름 이름}

1. {단계 1}
2. {단계 2}
3. {단계 3}

---

## 외부 의존성

| 서비스 | 용도 | 비고 |
|--------|------|------|
| {서비스 1} | {용도} | {비고} |
```

---

## references/api-specs.md 템플릿

```markdown
# API 명세

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://api.example.com`

---

## 인증

{인증 방식 설명}

---

## 엔드포인트

### {리소스명}

#### GET /api/{resource}

**설명**: {엔드포인트 설명}

**Request**:
- Headers: `Authorization: Bearer {token}`
- Query Params:
  - `page` (optional): 페이지 번호
  - `limit` (optional): 페이지당 항목 수

**Response**:

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1
  }
}
```

**Error Codes**:
- `401`: 인증 실패
- `403`: 권한 없음

---

#### POST /api/{resource}

**설명**: {엔드포인트 설명}

**Request Body**:

```json
{
  "field1": "value1",
  "field2": "value2"
}
```

**Response**:

```json
{
  "id": "uuid",
  "field1": "value1"
}
```
```

---

## references/constraints.md 템플릿

```markdown
# 제약사항

## 성능 요구사항

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| 페이지 로드 | < 3초 | Lighthouse |
| API 응답 | < 500ms | p95 기준 |
| 동시 사용자 | 1000명 | Load Test |

---

## 보안 요구사항

- [ ] HTTPS 필수
- [ ] 인증 토큰 만료 시간: {시간}
- [ ] 민감 데이터 암호화
- [ ] {추가 보안 요구사항}

---

## 법적/규정 요구사항

- {규정 1}
- {규정 2}

---

## 기술 제약

- {기술 제약 1}
- {기술 제약 2}

---

## 의존성 제약

| 의존성 | 버전 | 이유 |
|--------|------|------|
| {패키지} | {버전} | {이유} |
```
