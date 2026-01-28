# Rule 동기화 상세

## 목적

`./.ai/docs/design-rule.md`의 내용을 `.claude/rules/design-system/`에 동기화하여 Claude Code가 UI 작업 시 자동으로 디자인 규칙을 참조하도록 합니다.

---

## 대상 구조

```
.claude/rules/design-system/
├── AGENTS.md              # 진입점 - 규칙 개요
├── RULE.md                # 2단계 - 핵심 규칙
└── references/            # 3단계 - 상세 문서 (선택)
    └── tokens.md
```

---

## 파일별 생성 템플릿

### AGENTS.md

```markdown
# Design System Rules

> Figma에서 추출된 디자인 토큰 및 규칙

## 목적

UI 컴포넌트 작성, 스타일링, CSS 작업 시 일관된 디자인 시스템을 적용합니다.

## 원소스

- [design-rule.md](../../../.ai/docs/design-rule.md)

## 활성화 조건

- CSS, SCSS 파일 작업 시
- TSX, Vue 컴포넌트 스타일링 시
- 디자인 토큰 관련 질문 시
```

### RULE.md

```yaml
---
description: >
  디자인 시스템 토큰 및 규칙.
  UI 컴포넌트 작성, 스타일링, CSS 작업 시 활성화.
  컬러, 타이포그래피, 간격, 그림자 토큰 사용 시 참조.
paths:
  - "**/*.css"
  - "**/*.scss"
  - "**/*.less"
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.vue"
  - "**/*.svelte"
  - "**/styles/**"
  - "**/components/**"
---

# Design System Rules

## 원소스

**반드시 참조**: [design-rule.md](../../../.ai/docs/design-rule.md)

## 핵심 규칙

### 1. 하드코딩 금지

\`\`\`css
/* Bad */
.button {
  background-color: #007AFF;
  padding: 12px 16px;
}

/* Good */
.button {
  background-color: var(--color-brand-primary);
  padding: var(--spacing-3) var(--spacing-4);
}
\`\`\`

### 2. 토큰 우선 사용

- 색상 → `color-*` 토큰
- 간격 → `spacing-*` 토큰 (8px 스케일)
- 타이포 → `heading-*`, `body-*` 토큰
- 그림자 → `shadow-*` 토큰

### 3. 일관성 유지

동일한 용도에는 동일한 토큰을 사용합니다.
새로운 값이 필요하면 design-rule.md에 먼저 추가합니다.
```

---

## 동기화 로직

### 1. design-rule.md 읽기

```bash
# 파일 존재 확인
test -f ./.ai/docs/design-rule.md
```

### 2. Rule 디렉토리 생성

```bash
mkdir -p .claude/rules/design-system/references
```

### 3. 파일 생성

Claude가 Write 도구로 위 템플릿을 기반으로 생성합니다.
design-rule.md의 내용을 RULE.md에 요약/참조 형태로 포함합니다.

---

## paths 패턴 커스터마이징

프로젝트 구조에 따라 paths를 조정합니다.

### Next.js

```yaml
paths:
  - "app/**/*.tsx"
  - "components/**/*.tsx"
  - "styles/**/*.css"
```

### Vue

```yaml
paths:
  - "src/components/**/*.vue"
  - "src/views/**/*.vue"
  - "src/assets/**/*.scss"
```

### Tailwind 프로젝트

```yaml
paths:
  - "**/*.tsx"
  - "**/*.jsx"
  - "tailwind.config.*"
```

---

## 검증 체크리스트

동기화 후 확인:

```
□ .claude/rules/design-system/AGENTS.md 존재
□ .claude/rules/design-system/RULE.md 존재
□ paths 패턴이 프로젝트 구조와 일치
□ 원소스 경로가 올바름 (../../../.ai/docs/design-rule.md)
```

---

## 롤백

문제 발생 시:

```bash
# Git으로 복원
git checkout HEAD -- .claude/rules/design-system/

# 또는 완전 삭제 후 재동기화
rm -rf .claude/rules/design-system/
```
