# 규칙 자동 생성 가이드

Phase 5에서 프로젝트 초기화 완료 후 기본 규칙을 자동 생성하는 절차입니다.
rule-manager 워크플로우를 참조하여 SKILL.md 형식의 규칙을 만듭니다.

---

## 대상 경로

초기화된 프로젝트의 `.claude/skills/`에 규칙을 생성합니다:

```
{project_root}/
└── .claude/
    └── skills/
        ├── coding-conventions/
        │   └── SKILL.md
        ├── git-conventions/
        │   └── SKILL.md
        └── project-structure/
            └── SKILL.md
```

---

## 기본 규칙 카테고리

### 1. 코딩 컨벤션 (`coding-conventions`)

프로젝트의 코딩 스타일을 정의합니다.

```yaml
---
name: coding-conventions
description: >
  이 프로젝트의 코딩 컨벤션입니다.
  코드 작성, 리뷰, 리팩토링 시 자동 적용됩니다.
user-invocable: false
---
```

**포함 내용:**
- 네이밍 규칙 (변수, 함수, 클래스, 파일)
- 포맷팅 규칙 (들여쓰기, 줄 길이 등) - 린터 설정 참조
- 임포트 정렬 규칙
- 주요 패턴 (에러 처리, 비동기 처리 등)

### 2. Git 컨벤션 (`git-conventions`)

Git 사용 규칙을 정의합니다.

```yaml
---
name: git-conventions
description: >
  이 프로젝트의 Git 사용 컨벤션입니다.
  커밋, 브랜치 생성 시 자동 적용됩니다.
user-invocable: false
---
```

**포함 내용:**
- 커밋 메시지 형식 (Conventional Commits 기본)
- 브랜치 네이밍 전략
- 커밋 단위 가이드

### 3. 프로젝트 구조 (`project-structure`)

디렉토리 구조 규칙을 정의합니다.

```yaml
---
name: project-structure
description: >
  이 프로젝트의 디렉토리 구조 규칙입니다.
  새 파일, 모듈 생성 시 자동 적용됩니다.
user-invocable: false
---
```

**포함 내용:**
- 디렉토리 구조 트리
- 파일 배치 규칙 (컴포넌트, 서비스, 유틸리티 등)
- 모듈/패키지 구성 규칙

---

## 프레임워크별 규칙 템플릿

### TypeScript/Node.js 프로젝트

**코딩 컨벤션 핵심:**
```markdown
## 네이밍
| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수/함수 | camelCase | `getUserById` |
| 클래스/타입 | PascalCase | `UserService` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 파일 (컴포넌트) | PascalCase | `UserProfile.tsx` |
| 파일 (기타) | kebab-case | `user-service.ts` |

## 타입
- `any` 사용 금지, `unknown` 사용 후 타입 가드
- 인터페이스보다 타입 별칭 선호 (팀 컨벤션에 따라)
- 반환 타입 명시 (공개 API)
```

### Python 프로젝트

**코딩 컨벤션 핵심:**
```markdown
## 네이밍
| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수/함수 | snake_case | `get_user_by_id` |
| 클래스 | PascalCase | `UserService` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 모듈/파일 | snake_case | `user_service.py` |

## 타입 힌트
- 모든 함수 시그니처에 타입 힌트 사용
- `from __future__ import annotations` 사용
```

### Go 프로젝트

**코딩 컨벤션 핵심:**
```markdown
## 네이밍
| 대상 | 규칙 | 예시 |
|------|------|------|
| 공개 함수/타입 | PascalCase | `GetUserByID` |
| 비공개 함수/타입 | camelCase | `getUserByID` |
| 패키지 | lowercase | `userservice` |
| 파일 | snake_case | `user_service.go` |

## 에러 처리
- 에러는 반드시 처리 (무시 금지)
- 에러 래핑: `fmt.Errorf("context: %w", err)`
```

---

## 생성 절차

### Step 1: 디렉토리 생성

```bash
mkdir -p {project_root}/.claude/skills/coding-conventions
mkdir -p {project_root}/.claude/skills/git-conventions
mkdir -p {project_root}/.claude/skills/project-structure
```

### Step 2: 규칙 내용 결정

프레임워크와 Phase 3에서 확정된 스택을 바탕으로 규칙 내용을 결정합니다:

- 린터 설정에서 포맷팅 규칙 추출
- scaffold 구조에서 디렉토리 규칙 추출
- 프레임워크 관행에서 네이밍 규칙 결정

### Step 3: SKILL.md 작성

각 규칙은 다음 원칙을 따릅니다:

- `user-invocable: false` (자동 적용)
- 500줄 이하
- 구체적 예시 포함 (Good/Bad)
- 프로젝트에 실제 적용된 설정 기반

### Step 4: 검증

```
[ ] 모든 SKILL.md의 name이 디렉토리명과 일치
[ ] description에 트리거 키워드 포함
[ ] user-invocable: false 설정 확인
[ ] 각 파일 500줄 이하
[ ] 프레임워크/린터 설정과 규칙 내용 일치
```

---

## 사용자 고지

규칙 생성 후 사용자에게 알립니다:

```markdown
### 생성된 기본 규칙

| 규칙 | 경로 | 설명 |
|------|------|------|
| 코딩 컨벤션 | `.claude/skills/coding-conventions/` | 네이밍, 포맷팅, 패턴 |
| Git 컨벤션 | `.claude/skills/git-conventions/` | 커밋 메시지, 브랜치 전략 |
| 프로젝트 구조 | `.claude/skills/project-structure/` | 디렉토리, 파일 배치 |

이 규칙들은 코드 작성 시 자동으로 적용됩니다.
수정이 필요하면 각 SKILL.md 파일을 직접 편집하세요.
```
