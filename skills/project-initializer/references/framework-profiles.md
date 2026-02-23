# 프레임워크 프로파일

주요 프레임워크의 기본 정보입니다. 여기 없는 프레임워크는 Phase 2에서 WebSearch로 조사합니다.

---

## Next.js

| 항목 | 값 |
|------|---|
| 생태계 | JavaScript/TypeScript |
| CLI | `npx create-next-app@latest` |
| 패키지 매니저 | npm, pnpm, yarn, bun |
| 기본 스크립트 | `dev`, `build`, `start`, `lint` |
| 기본 포트 | 3000 |
| 테스트 | Vitest, Jest (별도 설치) |
| 린트 | ESLint (기본 포함) |

**scaffold 옵션:**
```bash
npx create-next-app@latest {name} \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

---

## NestJS

| 항목 | 값 |
|------|---|
| 생태계 | TypeScript (Node.js) |
| CLI | `npx @nestjs/cli new` |
| 패키지 매니저 | npm, pnpm, yarn |
| 기본 스크립트 | `start:dev`, `build`, `test`, `test:e2e` |
| 기본 포트 | 3000 |
| 테스트 | Jest (기본 포함) |
| 린트 | ESLint (기본 포함) |

**scaffold 옵션:**
```bash
npx @nestjs/cli new {name} --package-manager pnpm --strict
```

---

## Vite + React

| 항목 | 값 |
|------|---|
| 생태계 | JavaScript/TypeScript |
| CLI | `npm create vite@latest` |
| 패키지 매니저 | npm, pnpm, yarn, bun |
| 기본 스크립트 | `dev`, `build`, `preview` |
| 기본 포트 | 5173 |
| 테스트 | Vitest (별도 설치) |
| 린트 | ESLint (템플릿에 포함) |

**scaffold 옵션:**
```bash
npm create vite@latest {name} -- --template react-ts
```

---

## FastAPI

| 항목 | 값 |
|------|---|
| 생태계 | Python |
| CLI | 없음 (수동 구성) |
| 패키지 매니저 | pip, uv, poetry |
| 기본 스크립트 | `uvicorn main:app --reload` |
| 기본 포트 | 8000 |
| 테스트 | pytest |
| 린트 | Ruff |

**초기화 절차:**
```bash
mkdir {name} && cd {name}
uv init
uv add fastapi uvicorn
uv add --dev pytest ruff
```

---

## Django

| 항목 | 값 |
|------|---|
| 생태계 | Python |
| CLI | `django-admin startproject` |
| 패키지 매니저 | pip, uv, poetry |
| 기본 스크립트 | `python manage.py runserver` |
| 기본 포트 | 8000 |
| 테스트 | pytest-django |
| 린트 | Ruff |

**scaffold 옵션:**
```bash
uv init {name} && cd {name}
uv add django
uv run django-admin startproject config .
```

---

## Go (기본 프로젝트)

| 항목 | 값 |
|------|---|
| 생태계 | Go |
| CLI | `go mod init` |
| 패키지 매니저 | go modules |
| 기본 스크립트 | `go run .`, `go build .`, `go test ./...` |
| 기본 포트 | 8080 |
| 테스트 | go test (내장) |
| 린트 | golangci-lint |

**초기화 절차:**
```bash
mkdir {name} && cd {name}
go mod init {module_path}
```

**기본 디렉토리 구조:**
```
cmd/           # 실행 파일
internal/      # 비공개 패키지
pkg/           # 공개 패키지
```
