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

1. **자동 분석**: 의존성, PRD, 구조에서 기술 스택과 컨벤션 추출
2. **최신 정보 반영**: 웹 검색으로 기술 스택의 최신 베스트 프랙티스 확인
3. **동적 규칙 생성**: 분석 결과를 기반으로 프로젝트에 맞는 규칙을 동적 생성
4. **필수/선택 분류**: 핵심 규칙과 상황별 규칙을 분리하여 인덱싱

---

## 실행 단계

### 1단계: 프로젝트 분석

다음 순서로 프로젝트를 분석합니다:

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
Gemfile → Ruby 기술 스택
pom.xml / build.gradle → Java/Kotlin 기술 스택
```

**추출 항목:**
- 런타임 및 **버전**: Node.js 20.x, Python 3.12 등
- 프레임워크 및 **버전**: React 19, Next.js 15, NestJS 10 등
- 빌드 도구: Vite, Webpack, Turbopack 등
- 테스트 도구: Jest, Vitest, pytest 등
- 린터/포맷터: ESLint, Prettier, Biome 등
- **신규 도구 감지**: React Compiler, Turbopack 등 최신 도구

#### 1.2 PRD/문서 분석

프로젝트 내 문서 탐색:

```
docs/PRD*.md, docs/prd*.md
README.md
ARCHITECTURE.md
docs/*.md
*.prd.md
```

#### 1.3 프로젝트 구조 분석

```
src/ 또는 app/ 구조 → 아키텍처 패턴 파악
```

---

### 2단계: 최신 베스트 프랙티스 검색 (WebSearch)

> **중요**: 기술 스택의 최신 권장사항은 빠르게 변화합니다.
> 분석된 기술 스택과 버전을 기반으로 **웹 검색을 수행**하여 최신 정보를 확인합니다.

#### 검색 대상

| 기술 스택 | 검색 쿼리 예시 |
|----------|---------------|
| React 19 | `"React 19 best practices 2025"`, `"React Compiler migration guide"` |
| Next.js 15 | `"Next.js 15 App Router best practices"` |
| TypeScript 5.x | `"TypeScript 5.x strict mode recommendations"` |
| 새로운 도구 | `"babel-plugin-react-compiler vs useMemo 2025"` |

#### 검색 시 확인 사항

```
□ 해당 버전에서 deprecated된 패턴이 있는가?
  - 예: React 19 + React Compiler 사용 시 useMemo/useCallback 불필요
  
□ 새로운 권장 패턴이 있는가?
  - 예: Next.js 15의 새로운 캐싱 전략
  
□ 보안 관련 업데이트가 있는가?
  - 예: 새로운 취약점, 권장 설정 변경
```

#### 검색 결과 반영

검색 결과를 규칙에 반영:

```yaml
---
description: >
  React 19 컴포넌트 규칙. React Compiler 사용 프로젝트.
---

# React 규칙

## 주의: React Compiler 사용 프로젝트

이 프로젝트는 React Compiler(babel-plugin-react-compiler)를 사용합니다.

### 불필요한 최적화 (Compiler가 자동 처리)

- `useMemo` - Compiler가 자동 메모이제이션
- `useCallback` - Compiler가 자동 메모이제이션  
- `React.memo` - 대부분의 경우 불필요

### 권장 패턴

- 단순하게 작성, Compiler가 최적화
- 복잡한 수동 메모이제이션 제거
```

---

### 3단계: Rule 분류 및 동적 생성

#### 필수 vs 선택 분류

```
[분석 결과]
    │
    ├─── 필수 규칙 (Essential)
    │    ├── 기술 스택 규칙 (동적 생성)
    │    ├── 프로젝트 구조 규칙
    │    └── 코딩 컨벤션
    │
    └─── 선택 규칙 (Conditional)
         ├── 도메인 규칙 - paths 또는 트리거 키워드
         ├── 테스트 규칙 - paths: ["**/*.test.*"]
         └── 특정 모듈 규칙 - paths: ["src/특정모듈/**"]
```

#### 동적 규칙 생성

**템플릿이 아닌 분석 결과 기반 생성:**

1. 프로젝트의 **실제 구조**를 반영
2. **버전별 특성**을 반영 (웹 검색 결과)
3. **기존 설정**과 충돌하지 않도록 (eslint.config.js 등 참조)

```yaml
# 동적 생성 예시: 프로젝트 분석 결과 반영
---
description: >
  {프로젝트명} TypeScript 규칙. TypeScript {버전} strict mode.
  {감지된 특성: monorepo, path aliases 등} 환경.
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript 규칙

## 프로젝트 환경

- TypeScript: {감지된 버전}
- Strict Mode: {tsconfig에서 감지}
- Path Aliases: {감지된 aliases}

## 핵심 규칙

{웹 검색 + 프로젝트 분석 결과 기반 규칙}

## 린터 참조

상세 규칙은 기존 설정 참조: `{감지된 린터 설정 파일}`
```

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

긴 문서(PRD, 가이드 등)를 Progressive Disclosure 구조로 
변환하려면 rule-structurizer 스킬을 설치하세요:

설치 방법:
1. ai-library 저장소에서 skills/rule-structurizer/ 복사
2. 프로젝트의 .claude/skills/ 또는 ~/.claude/skills/에 배치

또는 수동으로 문서를 분할할 수 있습니다:
- AGENTS.md: 목차 및 개요 (~100 토큰)
- RULE.md: 핵심 내용 (<5000 토큰)
- references/: 상세 섹션별 파일
```

#### 스킬 존재 시

```bash
# rule-structurizer 스킬 호출
/rule-structurizer docs/PRD.md .claude/rules
```

---

### 5단계: 구조 생성 및 검증

#### 생성되는 구조

```
.claude/rules/
├── AGENTS.md             # 전체 인덱스
├── CLAUDE.md             # "AGENTS.md"
│
├── {tech-stack}.md       # 필수: 동적 생성된 기술 스택 규칙
├── architecture.md       # 필수: 프로젝트 구조 규칙
│
├── testing.md            # 선택: paths 기반
│
└── {domain}/             # 선택: 긴 문서 (rule-structurizer)
    ├── AGENTS.md
    ├── RULE.md
    └── references/
```

#### 검증 체크리스트

```
□ AGENTS.md 인덱스가 모든 규칙을 포함하는가?
□ 규칙이 최신 베스트 프랙티스를 반영하는가?
□ 기존 린터/설정과 충돌하지 않는가?
□ 각 RULE.md가 5000 토큰 이내인가?
□ deprecated 패턴이 권장되고 있지 않은가?
```

---

## 규칙 생성 원칙

### 1. 프로젝트 특성 우선

```
# 좋은 예: 프로젝트 분석 결과 반영
"이 프로젝트는 Feature 기반 구조를 사용합니다."
"React Compiler가 활성화되어 있어 수동 메모이제이션이 불필요합니다."

# 피해야 할 예: 일반적인 템플릿
"React에서는 useMemo를 사용하세요." (← 버전/설정에 따라 다름)
```

### 2. 기존 설정 존중

```
# 린터 설정이 있는 경우
"상세 규칙은 eslint.config.js 참조"
"Biome 설정(biome.json)이 포맷팅을 담당"

# 중복 정의 피하기
린터가 이미 강제하는 규칙은 Rule에서 제외
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
