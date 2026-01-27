# 프로젝트 분석 가이드

> 프로젝트에서 규칙을 도출하기 위한 상세 분석 방법론

---

## 1. 의존성 파일 분석

### 1.1 JavaScript/TypeScript 프로젝트

**package.json 분석 포인트:**

```json
{
  "dependencies": {
    // 프레임워크 감지
    "react": "^18.0.0",        // → react.md 규칙
    "next": "^14.0.0",         // → nextjs.md 규칙
    "@nestjs/core": "^10.0.0", // → nestjs.md 규칙
    
    // 상태관리 감지
    "zustand": "^4.0.0",       // → state-management.md
    "@tanstack/react-query": "^5.0.0",
    
    // ORM/DB 감지
    "prisma": "^5.0.0",        // → database.md 규칙
    "drizzle-orm": "^0.29.0"
  },
  "devDependencies": {
    // 테스트 도구 감지 → testing.md
    "vitest": "^1.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    
    // 린터/포맷터 → coding-style.md
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "biome": "^1.0.0"
  }
}
```

**tsconfig.json 분석:**

```json
{
  "compilerOptions": {
    "strict": true,           // strict 모드 여부
    "paths": { "@/*": [...] }, // 경로 별칭
    "baseUrl": ".",
    "target": "ES2022"        // 타겟 버전
  }
}
```

### 1.2 Python 프로젝트

**pyproject.toml / requirements.txt 분석:**

```toml
[project]
dependencies = [
    "fastapi>=0.100.0",       # → fastapi.md 규칙
    "django>=4.2",            # → django.md 규칙
    "sqlalchemy>=2.0",        # → database.md
    "pydantic>=2.0"           # → validation.md
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",            # → testing.md
    "ruff>=0.1.0",            # → coding-style.md
    "mypy>=1.0"               # → type-checking.md
]
```

### 1.3 기타 언어

| 언어 | 의존성 파일 | 주요 분석 항목 |
|------|-----------|---------------|
| Rust | Cargo.toml | dependencies, features |
| Go | go.mod | require, replace |
| Ruby | Gemfile | gem 목록 |
| Java | pom.xml, build.gradle | dependencies |

---

## 2. 프로젝트 구조 분석

### 2.1 디렉토리 패턴 감지

```
# Feature 기반 구조
src/features/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── api/
│   └── types/
└── dashboard/
    └── ...

→ 규칙: "각 feature는 자체 포함 모듈로 구성"

# Layer 기반 구조
src/
├── components/
├── hooks/
├── services/
├── utils/
└── types/

→ 규칙: "레이어별 책임 분리"

# Domain 기반 구조 (DDD)
src/
├── domain/
│   ├── entities/
│   └── value-objects/
├── application/
│   └── use-cases/
├── infrastructure/
└── presentation/

→ 규칙: "도메인 주도 설계 원칙 준수"
```

### 2.2 Next.js App Router 감지

```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (dashboard)/
│   └── page.tsx
├── api/
│   └── [...]/route.ts
└── layout.tsx

→ 규칙: "App Router 컨벤션 준수"
→ paths: ["app/**"]
```

### 2.3 NestJS 모듈 구조 감지

```
src/
├── modules/
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   └── auth/
├── common/
│   ├── filters/
│   ├── guards/
│   └── interceptors/
└── main.ts

→ 규칙: "NestJS 모듈 패턴 준수"
```

---

## 3. 설정 파일 분석

### 3.1 ESLint 설정

```js
// eslint.config.js 또는 .eslintrc.*
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  }
}

→ 이미 존재하는 규칙은 Rule에서 참조만 하고 중복 정의하지 않음
→ "ESLint 규칙 참조: eslint.config.js"
```

### 3.2 Prettier 설정

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}

→ 코딩 스타일 규칙에서 참조
```

### 3.3 Biome 설정

```json
// biome.json
{
  "formatter": { ... },
  "linter": { ... }
}

→ ESLint/Prettier 대체 시 해당 설정 참조
```

---

## 4. PRD/문서 분석

### 4.1 문서 탐색 경로

```bash
# 우선순위 순서
docs/PRD.md
docs/prd.md
docs/PRD*.md
*.prd.md
README.md
ARCHITECTURE.md
docs/*.md
```

### 4.2 추출 항목

| 항목 | 추출 위치 | 규칙 반영 |
|------|----------|----------|
| 도메인 용어 | 용어집, 개요 섹션 | 주석/변수명 컨벤션 |
| 비즈니스 규칙 | 기능 요구사항 | domain-rules.md |
| 제약사항 | 비기능 요구사항 | constraints.md |
| API 명세 | API 섹션 | api-conventions.md |

### 4.3 긴 문서 처리

PRD가 500줄 이상인 경우:

```bash
# rule-structurizer 스킬로 구조화
/rule-structurizer docs/PRD.md .claude/rules/prd
```

결과:
```
.claude/rules/prd/
├── AGENTS.md      # PRD 목차
├── RULE.md        # 핵심 요구사항
├── CLAUDE.md
└── references/
    ├── user-stories.md
    ├── functional-specs.md
    └── ...
```

---

## 5. 기술 스택 매핑

### 5.1 프레임워크 → 규칙 매핑

| 감지된 기술 | 생성할 규칙 | 주요 내용 |
|-----------|-----------|----------|
| React | react.md | 컴포넌트 패턴, 훅 사용법 |
| Next.js | nextjs.md | 라우팅, 데이터 페칭 |
| NestJS | nestjs.md | 모듈 구조, DI |
| FastAPI | fastapi.md | 엔드포인트 구조, Pydantic |
| Django | django.md | 모델, 뷰, 템플릿 |

### 5.2 도구 → 규칙 매핑

| 감지된 도구 | 규칙 영향 |
|-----------|----------|
| TypeScript | typescript.md (필수) |
| Vitest/Jest | testing.md (선택, paths) |
| Prisma/Drizzle | database.md (선택) |
| TailwindCSS | styling.md (선택) |

---

## 6. 분석 결과 템플릿

### 분석 보고서 형식

```markdown
## 프로젝트 분석 결과

### 기술 스택
- **런타임**: Node.js 20.x
- **언어**: TypeScript 5.x (strict mode)
- **프레임워크**: Next.js 14 (App Router)
- **상태관리**: Zustand + React Query
- **스타일링**: TailwindCSS
- **테스트**: Vitest + Testing Library
- **린터**: ESLint + Prettier

### 프로젝트 구조
- **패턴**: Feature 기반 모듈 구조
- **라우팅**: App Router (그룹 라우트 사용)

### 생성할 규칙

#### 필수 규칙
| 규칙 | 근거 |
|------|------|
| typescript.md | tsconfig.json strict mode |
| nextjs.md | Next.js 14 App Router |
| architecture.md | Feature 기반 구조 |

#### 선택 규칙
| 규칙 | paths/트리거 | 근거 |
|------|-------------|------|
| testing.md | `**/*.test.*` | Vitest 사용 |
| api.md | `app/api/**` | API 라우트 |
```
