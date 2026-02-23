---
name: project-initializer
description: >
  새 프로젝트를 프레임워크에 맞게 초기화하고 최신 버전과 모범 사례를 적용합니다.
  초기화 완료 후 rule-manager 워크플로우를 참조하여 기본 규칙을 자동 생성합니다.
  프로젝트 생성, 프로젝트 초기화, 새 프로젝트, project init, scaffold,
  boilerplate, 프로젝트 시작, 프로젝트 만들기 요청 시 활성화.
argument-hint: "[프레임워크 또는 프로젝트 설명]"
---

# Project Initializer

새 프로젝트를 프레임워크에 맞게 초기화합니다. WebSearch로 최신 정보를 조사하고, 사용자에게 모호한 부분을 질문하며, 완료 후 기본 규칙을 자동 생성합니다.

## 핵심 원칙

1. **Web Search First** - 설치/설정 전 반드시 최신 버전 검색
2. **모호하면 물어본다** - 선택지 제시 후 사용자 결정 대기
3. **사용자 확인 필수** - Phase 3에서 전체 기술 스택 확인
4. **규칙 자동 설정** - Phase 5에서 rule-manager 워크플로우로 기본 규칙 생성

## 다중 전문가 관점

다음 전문가 관점에서 초기화를 수행합니다:

| 전문가 | 관점 |
|--------|------|
| **Architect** | 프로젝트 구조, 모듈 설계, 확장성 |
| **DevOps Engineer** | 빌드 도구, CI/CD, 환경 설정 |
| **DX Specialist** | 개발자 경험, 린팅, 포맷팅, 스크립트 |

---

## 5-Phase 워크플로우

```
Phase 1        Phase 2        Phase 3        Phase 4        Phase 5
Discovery  →   Research   →   Decision   →   Execution  →   Finalize
요구사항 파악   최신 정보 수집  기술 스택 확정  프로젝트 생성   검증 + 규칙
```

---

### Phase 1: Discovery (요구사항 파악)

사용자에게 다음을 확인합니다. 이미 알고 있는 항목은 건너뜁니다.

| 항목 | 질문 | 기본값 |
|------|------|--------|
| 프로젝트 종류 | "웹앱, API, CLI, 라이브러리 중 어떤 걸 만드시나요?" | - |
| 프레임워크 | "어떤 프레임워크를 사용하시나요?" | 목적 기반 추천 |
| 프로젝트 이름 | "프로젝트 이름은 무엇인가요?" | - |
| 생성 경로 | "어디에 프로젝트를 생성할까요?" | 현재 디렉토리 |
| 특별 요구사항 | "추가로 필요한 기능이 있나요?" (DB, 인증 등) | 없음 |

**프레임워크 미정 시 추천:**

| 목적 | 추천 프레임워크 |
|------|----------------|
| 웹앱 (풀스택) | Next.js, Nuxt |
| 웹앱 (SPA) | Vite + React/Vue |
| API 서버 | NestJS, FastAPI, Go |
| CLI 도구 | Commander.js, Click, Cobra |
| 라이브러리 | tsup, setuptools, cargo |

> 상세 프레임워크 정보: [references/framework-profiles.md](references/framework-profiles.md)

---

### Phase 2: Research (최신 정보 수집)

**반드시 WebSearch**로 다음 항목을 검색합니다:

| 검색 항목 | 쿼리 패턴 | 목적 |
|-----------|-----------|------|
| 프레임워크 최신 버전 | `{framework} latest stable version {year}` | 최신 안정 버전 확인 |
| 런타임 LTS | `{runtime} LTS version {year}` | 호환 런타임 버전 확인 |
| CLI/scaffold 도구 | `{framework} create project CLI {year}` | 공식 생성 도구 확인 |
| 권장 프로젝트 구조 | `{framework} recommended project structure` | 모범 사례 구조 확인 |

**검색 결과 기록 형식:**

```
## 검색 결과 요약
- 프레임워크: {name} v{version} (출처: {source})
- 런타임: {runtime} v{version} (LTS)
- CLI 도구: {tool} v{version}
- 권장 구조: {brief description}
```

> 상세 검색 전략: [references/web-search-strategy.md](references/web-search-strategy.md)

---

### Phase 3: Decision (기술 스택 확정)

검색 결과를 바탕으로 기술 스택을 제안하고 사용자 확인을 받습니다.

**공통 결정 항목:**

| 항목 | 선택지 예시 | 기본값 |
|------|------------|--------|
| 패키지 매니저 | npm, pnpm, yarn, bun / pip, uv, poetry | 생태계 권장값 |
| 언어 설정 | TypeScript, JavaScript / Python 버전 | TypeScript |
| 린팅 도구 | Biome, ESLint, Ruff, golangci-lint | 프레임워크 기본 |
| 포맷터 | Biome, Prettier, Black, gofmt | 린터 통합 |
| 테스트 프레임워크 | Vitest, Jest, pytest, go test | 프레임워크 기본 |
| Git hooks | husky, lefthook, pre-commit | 선택적 |

**확인 형식:**

```markdown
## 기술 스택 확인

| 항목 | 선택 |
|------|------|
| 프레임워크 | {framework} v{version} |
| 런타임 | {runtime} v{version} |
| 패키지 매니저 | {pm} |
| 언어 | {lang} |
| 린팅 | {linter} |
| 포맷팅 | {formatter} |
| 테스트 | {test_framework} |
| 추가 기능 | {features} |

이 스택으로 프로젝트를 생성할까요?
```

**사용자 확인 없이 Phase 4로 진행하지 않습니다.**

---

### Phase 4: Execution (프로젝트 생성)

승인받은 스택으로 프로젝트를 생성합니다. 다음 순서를 따릅니다:

#### Step 1: 환경 확인

```bash
# 런타임 버전 확인
{runtime} --version

# 패키지 매니저 확인 (없으면 설치)
{pm} --version
```

#### Step 2: 프로젝트 Scaffold

```bash
# 프레임워크 공식 CLI로 프로젝트 생성
{scaffold_command} {project_name}
cd {project_name}
```

#### Step 3: 추가 패키지 설치

Phase 3에서 확정된 추가 기능에 따라 패키지를 설치합니다.

```bash
# 런타임 의존성
{pm} add {runtime_deps}

# 개발 의존성
{pm} add -D {dev_deps}
```

#### Step 4: 설정 파일 구성

- 린터/포맷터 설정 파일
- 환경 변수 파일 (`.env`, `.env.example`)
- 에디터 설정 (`.editorconfig`)

#### Step 5: Git 초기화

```bash
# scaffold에서 이미 생성된 경우 건너뜀
git init
git add .
git commit -m "Initial commit: {framework} project setup"
```

> 상세 Phase별 절차: [references/phases.md](references/phases.md)

---

### Phase 5: Finalize (검증 + 규칙 생성)

#### 5-1. 빌드 검증

프로젝트가 정상 동작하는지 검증합니다:

```bash
# 1. 린트 검사
{pm} {lint_script}

# 2. 빌드 테스트
{pm} {build_script}

# 3. 테스트 실행
{pm} {test_script}

# 4. 개발 서버 실행 (빠르게 확인 후 종료)
{pm} {dev_script}
```

검증 실패 시 즉시 수정 후 재검증합니다.

#### 5-2. 기본 규칙 자동 생성

rule-manager 워크플로우를 참조하여 프로젝트에 기본 규칙을 생성합니다.

**대상 경로:** 초기화된 프로젝트의 `.claude/skills/`

**기본 규칙 카테고리:**

| 카테고리 | 규칙 내용 | user-invocable |
|----------|----------|----------------|
| 코딩 컨벤션 | 네이밍, 포맷팅, 파일 구조 | `false` |
| Git 컨벤션 | 커밋 메시지, 브랜치 전략 | `false` |
| 프로젝트 구조 | 디렉토리 규칙, 모듈 구성 | `false` |

> 상세 규칙 생성 가이드: [references/rule-integration.md](references/rule-integration.md)

#### 5-3. 완료 보고

```markdown
## 프로젝트 초기화 완료

### 프로젝트 정보
- **이름**: {project_name}
- **경로**: {project_path}
- **프레임워크**: {framework} v{version}
- **런타임**: {runtime} v{version}

### 설치된 패키지
| 패키지 | 버전 | 용도 |
|--------|------|------|
| ... | ... | ... |

### 사용 가능한 스크립트
| 명령어 | 설명 |
|--------|------|
| `{pm} dev` | 개발 서버 실행 |
| `{pm} build` | 프로덕션 빌드 |
| `{pm} test` | 테스트 실행 |
| `{pm} lint` | 린트 검사 |

### 생성된 규칙
| 규칙 | 경로 |
|------|------|
| ... | .claude/skills/... |

### 다음 단계 권장사항
1. {recommendation_1}
2. {recommendation_2}
3. {recommendation_3}
```

---

## 실행 체크리스트

```
[ ] Phase 1: 프로젝트 종류, 프레임워크, 이름, 경로 확인
[ ] Phase 2: 최신 버전 WebSearch 완료 (4개 항목)
[ ] Phase 2: 검색 결과 기록 완료
[ ] Phase 3: 기술 스택 제안 완료
[ ] Phase 3: 사용자 확인 완료
[ ] Phase 4: 환경 확인 완료
[ ] Phase 4: scaffold 실행 완료
[ ] Phase 4: 추가 패키지 설치 완료
[ ] Phase 4: 설정 파일 구성 완료
[ ] Phase 4: Git 초기화 완료
[ ] Phase 5: 빌드 검증 통과
[ ] Phase 5: 기본 규칙 자동 생성 완료
```

---

## 에러 처리

| 상황 | 대응 |
|------|------|
| scaffold 실패 | CLI 도구 버전 확인 → 재설치 → 재시도 |
| 패키지 충돌 | 호환 버전 WebSearch → 버전 조정 |
| 빌드 실패 | 에러 로그 분석 → 설정 수정 → 재검증 |
| 런타임 미설치 | 설치 안내 → 사용자 확인 후 설치 |

---

## 상세 가이드

- [Phase별 상세 절차](references/phases.md)
- [프레임워크 프로파일](references/framework-profiles.md)
- [WebSearch 전략](references/web-search-strategy.md)
- [규칙 자동 생성 가이드](references/rule-integration.md)
