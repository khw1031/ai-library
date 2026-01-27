---
name: project-rule-generator
description: >
  프로젝트의 의존성, PRD, 구조를 분석하여 필수/선택 Rule을 자동 생성합니다.
  package.json, tsconfig.json 등 설정 파일과 문서를 분석하여
  기술 스택에 맞는 Claude Rules 구조를 구성합니다.
  "프로젝트 룰 생성", "규칙 자동 생성", "프로젝트 분석해서 룰 만들어줘" 요청 시 활성화.
argument-hint: "[project-path?]"
---

# Project Rule Generator

프로젝트를 종합 분석하여 `.claude/rules/` 구조를 자동으로 구성합니다.

## 핵심 원칙

1. **단일 파일 규칙**: 각 규칙은 `rule-name.md` 파일로 관리
2. **그룹화 디렉토리**: 관련 규칙들은 디렉토리로 그룹화 + 인덱스 파일 포함
3. **최신 정보 반영**: 웹 검색으로 기술 스택의 최신 베스트 프랙티스 확인
4. **동적 규칙 생성**: 분석 결과를 기반으로 프로젝트에 맞는 규칙을 동적 생성

---

## 규칙 구조

### 기본 구조

```
.claude/rules/
├── AGENTS.md              # 전체 규칙 인덱스
├── CLAUDE.md              # "AGENTS.md"
│
│   # 단일 파일 규칙 (간단한 규칙)
├── typescript.md
├── styling.md
│
│   # 그룹화 디렉토리 (관련 규칙 모음)
├── frontend/
│   ├── AGENTS.md          # 그룹 인덱스
│   ├── react.md
│   ├── state-management.md
│   └── components.md
│
└── prd/
    ├── AGENTS.md          # 그룹 인덱스
    ├── user-stories.md
    └── functional-specs.md
```

### 단일 파일 규칙

간단한 규칙은 단일 `.md` 파일로 작성:

```yaml
---
description: >
  {무엇}을 위한 규칙. {언제/트리거} 시 활성화.
paths:  # 선택 (조건부 활성화)
  - "**/*.ts"
---

# {규칙명}

## 핵심 규칙

{규칙 내용}

## 참조

- [관련 문서](링크)
```

### 그룹화 디렉토리

관련 규칙이 여러 개일 때 디렉토리로 그룹화:

```
group-name/
├── AGENTS.md          # 그룹 인덱스 (필수)
├── rule-a.md          # 개별 규칙
├── rule-b.md
└── rule-c.md
```

**그룹 인덱스 (AGENTS.md) 작성:**

```markdown
# {그룹명} Rules

> {그룹 설명}

## 규칙 목록

| 규칙 | 설명 | 트리거 |
|------|------|--------|
| [rule-a](rule-a.md) | 설명 | `**/*.tsx` |
| [rule-b](rule-b.md) | 설명 | 컴포넌트 작성 시 |
```

### 그룹화 기준

| 기준 | 예시 |
|------|------|
| 기술 레이어 | `frontend/`, `backend/`, `infrastructure/` |
| 도메인 | `prd/`, `auth/`, `payment/` |
| 관심사 | `testing/`, `security/`, `performance/` |

---

## 실행 단계

### 1단계: 프로젝트 분석

| 분석 대상 | 추출 정보 | 우선순위 |
|----------|----------|---------|
| 의존성 파일 | 기술 스택, 프레임워크, 도구, **버전** | 필수 |
| PRD/기획 문서 | 도메인 컨텍스트, 비즈니스 규칙 | 선택 |
| 프로젝트 구조 | 아키텍처 패턴, 디렉토리 컨벤션 | 필수 |
| 설정 파일 | 코딩 컨벤션, 린터 규칙 | 선택 |

#### 1.1 의존성 파일 분석

```
package.json → JavaScript/TypeScript 기술 스택
requirements.txt / pyproject.toml → Python 기술 스택
Cargo.toml → Rust 기술 스택
go.mod → Go 기술 스택
```

**추출 항목:**
- 런타임 및 **버전**: Node.js 20.x, Python 3.12 등
- 프레임워크 및 **버전**: React 19, Next.js 15, NestJS 10 등
- 빌드/테스트/린터 도구
- **신규 도구 감지**: React Compiler, Turbopack 등

#### 1.2 PRD/문서 분석

```
docs/PRD*.md, README.md, ARCHITECTURE.md, docs/*.md
```

#### 1.3 프로젝트 구조 분석

```
src/ 또는 app/ 구조 → 아키텍처 패턴 파악
```

---

### 2단계: 최신 베스트 프랙티스 검색 (WebSearch)

> 분석된 기술 스택과 버전을 기반으로 **웹 검색을 수행**하여 최신 정보를 확인합니다.

| 기술 스택 | 검색 쿼리 예시 |
|----------|---------------|
| React 19 | `"React 19 best practices 2025"`, `"React Compiler migration"` |
| Next.js 15 | `"Next.js 15 App Router best practices"` |

**확인 사항:**
- deprecated된 패턴 (예: React Compiler 사용 시 useMemo 불필요)
- 새로운 권장 패턴
- 보안 관련 업데이트

---

### 3단계: 규칙 분류 및 구조 결정

#### 3.1 필수 vs 선택 분류

```
[분석 결과]
    │
    ├─── 필수 규칙 (Essential)
    │    ├── 기술 스택 규칙 (typescript.md, react.md)
    │    ├── 프로젝트 구조 규칙 (architecture.md)
    │    └── 코딩 컨벤션 (coding-style.md)
    │
    └─── 선택 규칙 (Conditional)
         ├── 도메인 규칙 - paths 또는 트리거 키워드
         ├── 테스트 규칙 - paths: ["**/*.test.*"]
         └── 특정 모듈 규칙
```

#### 3.2 단일 파일 vs 그룹화 결정

```
[각 규칙에 대해]
    │
    ├─── 독립적인 단일 주제
    │    → 단일 파일: rule-name.md
    │
    └─── 관련 규칙이 3개 이상
         → 그룹화 디렉토리: group-name/
              ├── AGENTS.md (인덱스)
              ├── rule-a.md
              ├── rule-b.md
              └── rule-c.md
```

**그룹화 권장 케이스:**

| 케이스 | 그룹명 | 포함 규칙 |
|--------|--------|----------|
| 프론트엔드 규칙 3개 이상 | `frontend/` | react.md, state.md, components.md |
| 백엔드 규칙 3개 이상 | `backend/` | api.md, database.md, auth.md |
| PRD 관련 문서 | `prd/` | overview.md, user-stories.md, specs.md |
| 테스트 규칙 세분화 | `testing/` | unit.md, integration.md, e2e.md |

---

### 4단계: 긴 문서 구조화 (rule-structurizer 연계)

PRD나 긴 가이드 문서는 `rule-structurizer` 스킬을 활용합니다.

#### 사전 확인

```
rule-structurizer 스킬 확인:
├── 존재함 → /rule-structurizer 호출
└── 없음 → 사용자에게 안내
```

#### 스킬 없을 경우 안내 메시지

```
⚠️ rule-structurizer 스킬이 필요합니다.

긴 문서(PRD, 가이드 등)를 규칙 구조로 변환하려면 
rule-structurizer 스킬을 설치하세요:

설치 방법:
1. ai-library 저장소에서 skills/rule-structurizer/ 복사
2. 프로젝트의 .claude/skills/ 또는 ~/.claude/skills/에 배치

또는 수동으로 그룹화 디렉토리를 생성하세요:
- AGENTS.md: 그룹 인덱스
- 섹션별 개별 .md 파일
```

---

### 5단계: 구조 생성 및 검증

#### 생성 구조 예시

```
.claude/rules/
├── AGENTS.md                 # 전체 인덱스
├── CLAUDE.md
│
│   # 단일 파일 규칙
├── typescript.md             # 필수
├── architecture.md           # 필수
├── styling.md                # 필수
│
│   # 그룹화 디렉토리
├── frontend/                 # React 관련 규칙 그룹
│   ├── AGENTS.md             # 그룹 인덱스
│   ├── react.md
│   ├── state-management.md
│   └── components.md
│
├── testing/                  # 테스트 관련 규칙 그룹
│   ├── AGENTS.md
│   ├── unit.md
│   └── e2e.md
│
└── prd/                      # PRD 관련 문서 그룹
    ├── AGENTS.md
    ├── overview.md
    ├── user-stories.md
    └── functional-specs.md
```

#### 루트 인덱스 (AGENTS.md) 작성

```markdown
# {프로젝트명} Rules

> 프로젝트 규칙 인덱스

## 단일 규칙

| 규칙 | 트리거 | 설명 |
|------|--------|------|
| [typescript](typescript.md) | `**/*.ts` | TypeScript 컨벤션 |
| [architecture](architecture.md) | 구조 설계 시 | 아키텍처 원칙 |
| [styling](styling.md) | `**/*.css` | 스타일링 규칙 |

## 규칙 그룹

| 그룹 | 설명 | 참조 |
|------|------|------|
| [frontend](frontend/) | 프론트엔드 관련 규칙 | React, 상태관리, 컴포넌트 |
| [testing](testing/) | 테스트 관련 규칙 | Unit, E2E |
| [prd](prd/) | PRD 문서 | 요구사항, 스펙 |
```

#### 검증 체크리스트

```
구조 검증:
□ 루트 AGENTS.md가 모든 규칙/그룹을 인덱싱하는가?
□ 그룹 디렉토리에 AGENTS.md 인덱스가 있는가?
□ 각 규칙 파일에 frontmatter(description)가 있는가?

내용 검증:
□ 규칙이 최신 베스트 프랙티스를 반영하는가?
□ 기존 린터/설정과 충돌하지 않는가?
□ deprecated 패턴이 권장되고 있지 않은가?

그룹화 검증:
□ 관련 규칙이 적절히 그룹화되었는가?
□ 그룹 인덱스가 하위 규칙을 명확히 안내하는가?
```

---

## 규칙 생성 원칙

### 1. 프로젝트 특성 우선

```
# 좋은 예
"이 프로젝트는 Feature 기반 구조를 사용합니다."
"React Compiler가 활성화되어 있어 수동 메모이제이션이 불필요합니다."

# 피해야 할 예
"React에서는 useMemo를 사용하세요." (← 버전/설정에 따라 다름)
```

### 2. 기존 설정 존중

```
# 린터 설정이 있는 경우
"상세 규칙은 eslint.config.js 참조"
"Biome 설정(biome.json)이 포맷팅을 담당"
```

### 3. 버전 명시

```yaml
---
description: >
  Next.js 15 App Router 규칙. 
  주의: Next.js 14 이하와 캐싱 전략이 다름.
---
```

---

## 상세 참조

- [분석 가이드](references/analysis-guide.md) - 프로젝트 분석 상세 방법론
- [인덱싱 가이드](references/indexing-guide.md) - 필수/선택 규칙 인덱싱 전략
- [규칙 생성 가이드](references/rule-generation-guide.md) - 동적 규칙 생성 상세
