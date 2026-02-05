# 카테고리 관리

## 디렉토리 구조

```
project-root/
├── .claude/
│   └── skills/
│       ├── note-writer/        # 실제 스킬
│       └── use-state -> ../../notes/react/use-state/  # symlink
│
└── notes/                      # 노트 저장소
    ├── react/
    │   ├── use-state/
    │   │   ├── SKILL.md
    │   │   └── references/
    │   └── use-effect/
    │       └── SKILL.md
    └── javascript/
        └── promise/
            └── SKILL.md
```

---

## Symlink 관리

### 노트 생성 시 symlink 생성

```bash
# notes/react/use-state/ 생성 후
ln -s ../../notes/react/use-state .claude/skills/use-state
```

### Symlink 규칙

| 항목 | 규칙 |
|------|------|
| 위치 | `.claude/skills/` |
| 이름 | 노트의 `name` 필드와 동일 |
| 대상 | 상대 경로로 노트 디렉토리 |

### 중복 name 처리

동일한 name이 있으면 카테고리 포함:

```bash
# react의 context와 general의 context가 있으면
.claude/skills/react-context -> ../../notes/react/context/
.claude/skills/general-context -> ../../notes/general/context/
```

---

## 카테고리 매칭 전략

### 1단계: 기존 구조 분석

```bash
# 폴더 구조 확인
find notes/ -type d | head -20

# 기존 keywords 수집
grep -roh "keywords:.*" notes/ --include="SKILL.md" | sort | uniq
```

### 2단계: 매칭 판단

| 유사도 | 판단 기준 | 액션 |
|--------|----------|------|
| 높음 (동의어) | 같은 개념의 다른 표현 | 기존 노트에 alias 추가 |
| 중간 (관련) | 같은 분야/주제 | 같은 카테고리에 새 노트 |
| 낮음 (신규) | 기존에 없는 주제 | 새 카테고리 생성 |

### 3단계: 카테고리 결정

```
[키워드 분석]
    │
    ├─ 기존 노트에 동일 주제?
    │   └─ YES → alias 추가, 내용 보강
    │
    ├─ 같은 카테고리에 유사 주제?
    │   └─ YES → 해당 카테고리에 생성
    │
    └─ NO → 새 카테고리 생성
```

---

## 권장 카테고리

### 기술/개발

```
notes/
├── languages/
│   ├── javascript/
│   ├── typescript/
│   └── python/
├── frameworks/
│   ├── react/
│   ├── nextjs/
│   └── nodejs/
├── concepts/
│   ├── design-patterns/
│   └── algorithms/
└── tools/
    ├── git/
    └── docker/
```

### 일반 지식

```
notes/
├── cs-fundamentals/
├── math/
└── ai-ml/
```

---

## 태그 체계

```yaml
tags:
  # 주제
  - topic/react/hooks
  - topic/javascript/async
  
  # 유형
  - type/concept
  - type/comparison
  - type/tutorial
  
  # 상태
  - status/draft
  - status/complete
```

---

## 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 폴더명 | kebab-case | `use-state`, `design-patterns` |
| name 필드 | 폴더명과 동일 | `use-state` |
| symlink | name과 동일 | `use-state` |

```
# 좋은 예
notes/react/use-state/SKILL.md
name: use-state

# 나쁜 예
notes/React/useState/SKILL.md  # 대소문자 혼용
name: useState  # camelCase
```
