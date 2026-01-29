# 출력 형식 - 규칙 파일 템플릿

## 출력 디렉토리 구조

```
.claude/rules/design-system/
├── AGENTS.md              # 진입점 (1단계)
├── RULE.md                # 핵심 규칙 (2단계, <500줄)
└── references/            # 상세 문서 (3단계)
    ├── tokens.md          # 토큰 전체 목록
    ├── components.md      # 컴포넌트 상세
    ├── layouts.md         # 레이아웃 패턴
    └── annotations.md     # 디자이너 노트
```

---

## 1. AGENTS.md 템플릿

```markdown
# Design System Rules

> Figma에서 추출된 디자인 시스템 규칙

## 목적

UI 컴포넌트 작성, 스타일링, CSS 작업 시 일관된 디자인 시스템을 적용합니다.

## 활성화 조건

- CSS, SCSS, Tailwind 작업 시
- React/Vue 컴포넌트 스타일링 시
- 새 UI 컴포넌트 생성 시
- 디자인 토큰 관련 질문 시

## 원소스

- **Figma**: {Figma 파일 URL}
- **추출일**: {timestamp}

## 핵심 요약

- 컬러: {primary 색상} 기반, {n}개 색상 토큰
- 간격: {base}px 스케일
- 타이포: {font-family}
- 공통 컴포넌트: {n}개 식별
```

---

## 2. RULE.md 템플릿

```yaml
---
description: >
  디자인 시스템 토큰 및 컴포넌트 규칙.
  UI 작업, 스타일링, 컴포넌트 생성 시 활성화.
  색상, 간격, 타이포, 컴포넌트 구조 시 참조.
paths:
  - "**/*.css"
  - "**/*.scss"
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.vue"
  - "**/components/**"
  - "**/styles/**"
---

# Design System Rules

## 1. 토큰 사용 규칙

### 필수: 하드코딩 금지

| 카테고리 | 하드코딩 ❌ | 토큰 사용 ✅ |
|---------|-----------|-------------|
| 색상 | `#007AFF` | `var(--color-primary-500)` |
| 간격 | `16px` | `var(--spacing-4)` |
| 반경 | `8px` | `var(--radius-md)` |
| 그림자 | `0 4px 6px...` | `var(--shadow-md)` |

### 토큰 요약

**Colors**
- Primary: `--color-primary-{50-900}`
- Text: `--color-text-{primary,secondary,disabled}`
- Background: `--color-bg-{surface,muted,elevated}`

**Spacing** ({base}px 기반)
- `--spacing-{1,2,3,4,6,8,12,16}`

**Typography**
- Font: `--font-family-{sans,mono}`
- Size: `--font-size-{xs,sm,base,lg,xl,2xl}`
- Weight: `--font-weight-{normal,medium,semibold,bold}`

상세 토큰 목록: [references/tokens.md](references/tokens.md)

---

## 2. 공통 컴포넌트

### 사용 가능한 컴포넌트

| 컴포넌트 | 변형 | 우선순위 |
|---------|------|---------|
| Button | Primary, Secondary, Ghost | 🔴 |
| Input | Text, Select, Checkbox | 🔴 |
| Card | Default, Elevated | 🟡 |
{추가 컴포넌트...}

### 컴포넌트 생성 규칙

1. **기존 컴포넌트 확인**: 새로 만들기 전에 위 목록 확인
2. **네이밍**: `{Component}/{Variant}` 형식 (예: `Button/Primary`)
3. **Props**: 기존 컴포넌트와 일관된 인터페이스

상세 컴포넌트 가이드: [references/components.md](references/components.md)

---

## 3. 레이아웃 패턴

### 사용 가능한 레이아웃

| 패턴 | 구성 | 용도 |
|------|------|------|
| AppShell | Header + Sidebar + Main | 대시보드 |
| AuthLayout | Center + Card | 인증 페이지 |
{추가 레이아웃...}

상세 레이아웃 가이드: [references/layouts.md](references/layouts.md)

---

## 4. 금지 사항

- ❌ 하드코딩된 색상값
- ❌ 토큰에 없는 간격값 (예: 15px, 22px)
- ❌ 정의되지 않은 새 컴포넌트 (확인 없이)
- ❌ 일관성 없는 타이포그래피

---

## 5. 참조

상세 정보가 필요한 경우:
- [전체 토큰 목록](references/tokens.md)
- [컴포넌트 상세](references/components.md)
- [레이아웃 패턴](references/layouts.md)
- [디자이너 노트](references/annotations.md)
```

---

## 3. references/tokens.md 템플릿

```markdown
# 디자인 토큰 상세

> Figma Variables에서 추출

## Colors

### Primitives

| 토큰 | 값 | 용도 |
|------|-----|------|
| --color-primary-50 | #E6F0FF | 배경 (호버) |
| --color-primary-100 | #CCE0FF | 배경 (활성) |
| --color-primary-500 | #007AFF | 기본 브랜드 |
| --color-primary-600 | #0062CC | 호버 상태 |
| --color-primary-900 | #002952 | 텍스트 (강조) |
{...전체 색상 목록}

### Semantic

| 토큰 | 참조값 | 용도 |
|------|-------|------|
| --color-text-primary | neutral-900 | 기본 텍스트 |
| --color-text-secondary | neutral-600 | 보조 텍스트 |
| --color-bg-surface | white | 기본 배경 |
{...}

## Spacing

| 토큰 | 값 | 용도 |
|------|-----|------|
| --spacing-1 | 4px | 아이콘-텍스트 |
| --spacing-2 | 8px | 내부 패딩 (작음) |
| --spacing-3 | 12px | 내부 패딩 (기본) |
| --spacing-4 | 16px | 내부 패딩 (큼) |
| --spacing-6 | 24px | 섹션 간격 (작음) |
| --spacing-8 | 32px | 섹션 간격 (기본) |
{...}

## Typography

### Font Family
| 토큰 | 값 |
|------|-----|
| --font-family-sans | 'Inter', sans-serif |
| --font-family-mono | 'JetBrains Mono', monospace |

### Font Size
| 토큰 | 값 | 용도 |
|------|-----|------|
| --font-size-xs | 12px | 캡션 |
| --font-size-sm | 14px | 보조 텍스트 |
| --font-size-base | 16px | 본문 |
{...}

## Radius

| 토큰 | 값 | 용도 |
|------|-----|------|
| --radius-sm | 4px | 버튼, 입력 |
| --radius-md | 8px | 카드 |
| --radius-lg | 16px | 모달 |
| --radius-full | 9999px | 원형 |

## Shadow

| 토큰 | 값 | 용도 |
|------|-----|------|
| --shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | 미세한 부양 |
| --shadow-md | 0 4px 6px rgba(0,0,0,0.1) | 카드 |
| --shadow-lg | 0 10px 15px rgba(0,0,0,0.1) | 모달 |
```

---

## 4. references/components.md 템플릿

```markdown
# 공통 컴포넌트 상세

## 컴포넌트 목록

| 컴포넌트 | 변형 | 인스턴스 수 | 우선순위 |
|---------|------|-----------|---------|
| Button | 5 | 47 | 🔴 높음 |
| Input | 3 | 23 | 🔴 높음 |
| Card | 2 | 15 | 🟡 중간 |
{...}

---

## Button

**변형:**
- Primary: 주요 액션 (CTA)
- Secondary: 보조 액션
- Ghost: 텍스트 버튼
- Outline: 테두리 버튼
- Destructive: 삭제/위험 액션

**크기:**
- sm: 32px 높이
- md: 40px 높이 (기본)
- lg: 48px 높이

**상태:**
- Default, Hover, Active, Disabled, Loading

**Description (Figma):**
> 사용자 액션을 트리거하는 기본 버튼.
> Primary는 페이지당 1개만 사용 권장.

**사용 예시:**
\`\`\`tsx
<Button variant="primary" size="md">
  Submit
</Button>
\`\`\`

---

## Input

{...유사한 형식으로 각 컴포넌트 문서화}
```

---

## 5. references/layouts.md 템플릿

```markdown
# 레이아웃 패턴 상세

## 패턴 목록

| 패턴 | 구성 | 사용처 |
|------|------|--------|
| AppShell | Header + Sidebar + Main | 대시보드 |
| AuthLayout | Center + Card | 로그인 |
{...}

---

## AppShell

**구성:**
\`\`\`
┌─────────────────────────────────┐
│            Header (64px)        │
├──────────┬──────────────────────┤
│ Sidebar  │                      │
│ (256px)  │       Main           │
│          │                      │
└──────────┴──────────────────────┘
\`\`\`

**반응형:**
- Desktop (>1024px): Sidebar 표시
- Tablet (768-1024px): Sidebar 접힘
- Mobile (<768px): Sidebar 숨김, 햄버거 메뉴

**사용처:**
- 대시보드
- 관리자 페이지
- 설정 페이지

---

## AuthLayout

{...유사한 형식}
```

---

## 6. references/annotations.md 템플릿

```markdown
# 디자이너 노트 & Annotation

> Figma에서 추출된 디자인 가이드라인

## 일반 규칙

- 모든 인터랙티브 요소: 최소 44x44px 터치 영역
- 텍스트 최소 크기: 12px (접근성)
- 색상 대비: WCAG AA 이상

## 컴포넌트별 노트

### Button
{Figma description 및 annotation}

### Input
{...}

## 레이아웃 노트

### 반응형
{...}

### 간격
{...}
```
