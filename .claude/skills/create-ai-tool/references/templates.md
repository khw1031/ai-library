# 템플릿 모음

> 복사-붙여넣기 가능한 Skill, Agent, Rule 템플릿

---

## Skill 템플릿

### 기본 Skill (레퍼런스 콘텐츠)

```yaml
---
name: [skill-name]
description: >
  [무엇을 하는지 설명].
  [언제 사용하는지 트리거 키워드 포함].
---

# [Skill Title]

[핵심 지침 작성]

## 사용 방법

1. [단계 1]
2. [단계 2]
3. [단계 3]

## 상세 정보

- [상세 문서 링크](references/detail.md) (필요시)
```

### 사용자 전용 Skill (부작용 있음)

```yaml
---
name: [skill-name]
description: >
  [부작용이 있는 작업 설명].
  [사용자가 직접 호출해야 하는 이유].
disable-model-invocation: true
---

# [작업 이름]

[경고 또는 주의사항]

## 실행 단계

1. [사전 확인]
2. [실행]
3. [결과 확인]
```

### Claude 전용 Skill (배경 지식)

```yaml
---
name: [skill-name]
description: >
  [배경 지식 설명].
  [Claude가 참조해야 하는 상황].
user-invocable: false
---

# [지식 영역]

[Claude가 참조할 배경 정보]

## 핵심 개념

- [개념 1]
- [개념 2]

## 적용 규칙

- [규칙 1]
- [규칙 2]
```

### 서브에이전트 실행 Skill

```yaml
---
name: [skill-name]
description: >
  [격리 실행이 필요한 작업].
  [대량 출력 또는 독립 처리가 필요한 경우].
context: fork
agent: Explore  # 또는 Plan, general-purpose
---

# [작업 이름]

[서브에이전트가 수행할 구체적 태스크]

## 수행 단계

1. [탐색/분석 단계]
2. [처리 단계]
3. [결과 요약]

## 출력 형식

[기대하는 출력 형식 명시]
```

### 동적 컨텍스트 Skill

```yaml
---
name: [skill-name]
description: >
  [동적 정보가 필요한 작업].
  [실시간 데이터 주입이 필요한 경우].
context: fork
agent: Explore
---

# [작업 이름]

## 현재 컨텍스트

- 현재 브랜치: !`git branch --show-current`
- 최근 변경: !`git log --oneline -5`
- 상태: !`git status --short`

## 작업 지침

[동적 컨텍스트를 활용한 지침]
```

---

## Agent 템플릿

### 기본 Agent (읽기 전용)

```yaml
---
name: [agent-name]
description: >
  [전문 영역] 전문가.
  [언제 위임할지 명확히]. 사전에 사용.
tools: Read, Grep, Glob, Bash
disallowedTools: Write, Edit
model: inherit
---

당신은 [역할 정의]입니다.

## 호출 시 수행 단계

1. [첫 번째 단계]
2. [두 번째 단계]
3. [세 번째 단계]

## 체크리스트

- [확인 항목 1]
- [확인 항목 2]
- [확인 항목 3]

## 출력 형식

[우선순위별 또는 카테고리별 정리 방식]
```

### 수정 가능 Agent

```yaml
---
name: [agent-name]
description: >
  [수정 작업이 필요한 전문가].
  [코드 수정, 리팩토링 등].
tools: Read, Edit, Write, Grep, Glob, Bash
model: sonnet
permissionMode: acceptEdits
---

당신은 [역할]입니다. 코드를 분석하고 수정합니다.

## 작업 원칙

- [원칙 1]
- [원칙 2]

## 수정 프로세스

1. [분석]
2. [계획]
3. [수정]
4. [검증]
```

### 비용 최적화 Agent (Haiku)

```yaml
---
name: [agent-name]
description: >
  빠른 [작업 유형].
  간단한 탐색, 검색, 확인 작업에 사용.
tools: Read, Grep, Glob
model: haiku
---

빠르고 효율적으로 [작업]을 수행합니다.

## 작업 범위

- [간단한 작업 1]
- [간단한 작업 2]

## 제한 사항

복잡한 분석이 필요하면 다른 에이전트에 위임하세요.
```

### 도메인 지식 Agent (Skills 주입)

```yaml
---
name: [agent-name]
description: >
  [도메인] 전문가.
  사전 로드된 지식을 활용하여 [작업].
tools: Read, Edit, Write, Grep, Glob, Bash
skills:
  - [skill-1]
  - [skill-2]
---

[도메인] 전문가로서 사전 로드된 스킬의 규칙을 따릅니다.

## 작업 방식

1. 스킬에 정의된 컨벤션 확인
2. 규칙에 따라 작업 수행
3. 결과 검증
```

### 조건부 검증 Agent (Hooks)

```yaml
---
name: [agent-name]
description: >
  [제한된 작업] 전용.
  특정 조건에서만 도구 사용 허용.
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-[action].sh"
---

[제한된 작업]만 수행합니다.

## 허용되는 작업

- [작업 1]
- [작업 2]

## 금지되는 작업

- [금지 작업 1]
- [금지 작업 2]
```

---

## Rule 템플릿

### 파일 패턴 기반 Rule

```yaml
---
description: >
  [파일 타입] 작성 시 적용되는 규칙.
  [트리거 키워드] 관련 작업 시 활성화.
paths:
  - "**/*.[ext]"
  - "[directory]/**"
---

# [Rule Name]

## 필수 규칙

- [규칙 1]
- [규칙 2]

## 권장 사항

- [권장 1]
- [권장 2]

## 상세 가이드

- [상세 문서](references/detail.md)
```

### 항상 적용 Rule

```yaml
---
description: >
  프로젝트 전반에 적용되는 [규칙 유형].
  모든 코드 작성 시 참조.
alwaysApply: true
---

# [프로젝트 규칙]

## 핵심 원칙

1. [원칙 1]
2. [원칙 2]

## 적용 범위

- [범위 1]
- [범위 2]
```

---

## 디렉토리 구조 템플릿

### 단순 구조

```
tool-name/
└── [TYPE].md
```

### 표준 구조

```
tool-name/
├── [TYPE].md
└── references/
    └── detail.md
```

### 복잡한 구조

```
tool-name/
├── AGENTS.md          # 진입점 (Claude 자동 인식)
├── [TYPE].md          # 핵심 지침
├── CLAUDE.md          # AGENTS.md 참조 (선택적)
├── references/        # 상세 문서
│   ├── guide-1.md
│   └── guide-2.md
├── scripts/           # 실행 스크립트
│   └── validate.sh
└── assets/            # 정적 자산
    └── template.md
```

---

## Frontmatter 빠른 참조

### Skill 전용

| 필드 | 값 | 용도 |
|------|-----|------|
| `disable-model-invocation` | `true` | 사용자만 호출 |
| `user-invocable` | `false` | Claude만 호출 |
| `context` | `fork` | 서브에이전트 실행 |
| `agent` | `Explore\|Plan\|general-purpose` | 서브에이전트 유형 |
| `allowed-tools` | `Read, Grep, ...` | 도구 제한 |

### Agent 전용

| 필드 | 값 | 용도 |
|------|-----|------|
| `tools` | `Read, Edit, ...` | 허용 도구 |
| `disallowedTools` | `Write, Edit` | 거부 도구 |
| `model` | `haiku\|sonnet\|opus\|inherit` | 모델 선택 |
| `permissionMode` | `default\|acceptEdits\|dontAsk\|bypassPermissions` | 권한 모드 |
| `skills` | `[skill-1, skill-2]` | 스킬 주입 |
| `hooks` | `{PreToolUse: [...]}` | 라이프사이클 훅 |

### Rule 전용

| 필드 | 값 | 용도 |
|------|-----|------|
| `paths` | `["**/*.ts"]` | 조건부 활성화 |
| `alwaysApply` | `true` | 항상 활성화 |
