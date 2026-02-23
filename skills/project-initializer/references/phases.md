# Phase별 상세 절차

각 Phase의 세부 절차, 판단 기준, 에러 처리를 설명합니다.

---

## Phase 1: Discovery 상세

### 프레임워크 추천 로직

사용자가 프레임워크를 결정하지 않은 경우 목적 기반으로 추천합니다:

```
[프로젝트 목적]
       │
       ├─ 웹앱 (풀스택)
       │    ├─ SSR/SEO 중요 → Next.js, Nuxt
       │    └─ SPA 충분 → Vite + React/Vue
       │
       ├─ API 서버
       │    ├─ Node.js 선호 → NestJS, Express
       │    ├─ Python 선호 → FastAPI, Django
       │    └─ 성능 중시 → Go, Rust (Axum)
       │
       ├─ CLI 도구
       │    ├─ Node.js → Commander.js, oclif
       │    ├─ Python → Click, Typer
       │    └─ Go → Cobra
       │
       ├─ 라이브러리/패키지
       │    ├─ Node.js → tsup + TypeScript
       │    ├─ Python → setuptools, hatch
       │    └─ Go → go modules
       │
       └─ 모바일/데스크톱
            ├─ 크로스플랫폼 모바일 → React Native, Flutter
            └─ 데스크톱 → Electron, Tauri
```

### 질문 우선순위

1. **프로젝트 종류** (필수) - 모든 후속 결정의 기반
2. **프레임워크** (필수) - 미정이면 추천
3. **프로젝트 이름** (필수) - 디렉토리명으로 사용
4. **생성 경로** (선택) - 기본값: 현재 디렉토리
5. **추가 기능** (선택) - DB, 인증, Docker 등

### 이미 알고 있는 정보 처리

사용자가 인자로 프레임워크를 지정한 경우:
- "NestJS 프로젝트 만들어줘" → Phase 1에서 프레임워크 질문 건너뜀
- "next-app이라는 Next.js 프로젝트" → 프레임워크 + 이름 건너뜀

---

## Phase 2: Research 상세

### WebSearch 실행 절차

```
1. 프레임워크 최신 버전 검색
   └─ 결과 기록

2. 런타임 LTS 버전 검색
   └─ 결과 기록

3. 공식 CLI/scaffold 도구 검색
   └─ 결과 기록 (명령어, 옵션 포함)

4. 권장 프로젝트 구조 검색
   └─ 결과 기록
```

### 결과 기록 형식

검색 완료 후 다음 형식으로 내부 기록합니다:

```markdown
## Phase 2 검색 결과

### 프레임워크
- 이름: {name}
- 최신 안정 버전: {version}
- 릴리즈 날짜: {date}
- 출처: {url}

### 런타임
- 이름: {runtime}
- LTS 버전: {version}
- 출처: {url}

### CLI 도구
- 명령어: {command}
- 버전: {version}
- 주요 옵션: {options}
- 출처: {url}

### 권장 구조
- 패턴: {pattern_name}
- 설명: {brief}
- 출처: {url}
```

### 검색 시간 제한

- 항목당 최대 2회 검색
- 결과 불충분 시 framework-profiles.md 기본값 사용
- 사용자에게 검색 한계 고지

---

## Phase 3: Decision 상세

### 생태계별 결정 트리

#### JavaScript/TypeScript

```
[패키지 매니저]
  ├─ 성능 중시 → pnpm (권장)
  ├─ 호환성 중시 → npm
  ├─ 모노레포 → pnpm workspace
  └─ 실험적 → bun

[언어]
  ├─ 프레임워크 기본 → TypeScript (대부분)
  └─ 간단한 스크립트 → JavaScript

[린팅/포맷팅]
  ├─ 올인원 → Biome
  ├─ 프레임워크 기본 → ESLint + Prettier
  └─ 최소 설정 → 프레임워크 기본값

[테스트]
  ├─ Vite 기반 → Vitest
  ├─ NestJS → Jest (기본 포함)
  └─ Next.js → Vitest 또는 Jest
```

#### Python

```
[패키지 매니저]
  ├─ 최신 → uv (권장)
  ├─ 의존성 관리 → poetry
  └─ 기본 → pip + venv

[린팅/포맷팅]
  ├─ 올인원 → Ruff (권장)
  ├─ 전통적 → flake8 + black
  └─ 타입 체크 → mypy (추가)

[테스트]
  └─ pytest (사실상 표준)
```

#### Go

```
[패키지 매니저]
  └─ go modules (표준)

[린팅]
  └─ golangci-lint (사실상 표준)

[포맷팅]
  └─ gofmt / goimports (내장)

[테스트]
  └─ go test (내장) + testify (선택)
```

### 확인 프로세스

1. 기술 스택 테이블 제시
2. 각 선택의 이유 간략 설명
3. 사용자에게 확인/수정 요청
4. 수정 요청 시 반영 후 재확인
5. **명시적 승인 후에만 Phase 4 진행**

---

## Phase 4: Execution 상세

### 사전 환경 체크

```bash
# 런타임 설치 확인
which {runtime} || echo "런타임 미설치"
{runtime} --version

# 패키지 매니저 확인
which {pm} || echo "패키지 매니저 미설치"
{pm} --version

# CLI 도구 확인 (필요한 경우)
which {cli} 2>/dev/null || echo "CLI 도구 미설치"
```

**미설치 시 대응:**
- 사용자에게 설치 여부 확인
- 승인 시 설치 진행
- 거부 시 대안 제안 (npx 사용 등)

### Scaffold 후 정리

scaffold 완료 후 불필요한 파일을 정리합니다:

| 프레임워크 | 정리 대상 |
|-----------|----------|
| Next.js | 기본 페이지 내용 정리, favicon 등 |
| NestJS | 불필요한 기본 모듈 정리 |
| Vite | 기본 CSS/컴포넌트 정리 |
| FastAPI | 없음 (수동 구성) |

### 에러 핸들링

```
[scaffold 실행]
       │
       ├─ 성공 → 다음 단계
       │
       └─ 실패
            ├─ CLI 미설치 → 설치 후 재시도
            ├─ 버전 호환 문제 → 버전 조정 후 재시도
            ├─ 권한 문제 → 사용자에게 알림
            └─ 네트워크 문제 → 재시도 또는 오프라인 대안
```

### 설정 파일 생성 순서

1. 환경 변수 (`.env`, `.env.example`)
2. 에디터 설정 (`.editorconfig`)
3. 린터/포맷터 설정
4. 테스트 설정 (필요시)
5. `.gitignore` 업데이트

---

## Phase 5: Finalize 상세

### 검증 명령 패턴

| 생태계 | 린트 | 빌드 | 테스트 |
|--------|------|------|--------|
| Node.js | `{pm} lint` 또는 `{pm} run lint` | `{pm} build` 또는 `{pm} run build` | `{pm} test` 또는 `{pm} run test` |
| Python | `ruff check .` 또는 `{pm} run ruff check .` | 해당 없음 (또는 `{pm} run build`) | `pytest` 또는 `{pm} run pytest` |
| Go | `golangci-lint run` | `go build ./...` | `go test ./...` |

### 검증 실패 대응

```
[검증 실행]
       │
       ├─ 린트 실패 → 자동 수정 ({lint} --fix) → 재검증
       ├─ 빌드 실패 → 에러 분석 → 설정 수정 → 재검증
       ├─ 테스트 실패 → 기본 테스트 수정 → 재검증
       └─ 모두 성공 → 규칙 생성 단계로
```

### 규칙 생성 절차

Phase 5-2의 규칙 생성은 rule-integration.md를 참조합니다.

1. `.claude/skills/` 디렉토리 생성
2. 코딩 컨벤션 규칙 생성
3. Git 컨벤션 규칙 생성
4. 프로젝트 구조 규칙 생성
5. 규칙 생성 결과 보고
