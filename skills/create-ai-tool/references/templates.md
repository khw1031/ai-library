# AI Tool 템플릿

> 각 도구별 파일 템플릿

---

## 1. Rule 템플릿

### CLAUDE.md

```markdown
# [Rule 이름]

> [한 줄 설명]

## 목적

[이 규칙이 해결하는 문제]

## 적용 대상

- [파일 패턴 1]
- [파일 패턴 2]

## 상세 가이드

- [RULE.md](RULE.md) - 핵심 규칙
- [references/examples.md](references/examples.md) - 예제
```

### RULE.md

```yaml
---
description: >
  [무엇을 하는 규칙인지 설명].
  [언제 적용되는지, 트리거 키워드 포함].
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# [Rule 이름]

> [한 줄 설명]

## 핵심 규칙

1. [규칙 1]
2. [규칙 2]
3. [규칙 3]

## 체크리스트

\`\`\`
□ [체크 항목 1]
□ [체크 항목 2]
\`\`\`

## 상세 가이드

[상세 예제](references/examples.md) 참조
```

---

## 2. Skill 템플릿

### CLAUDE.md

```markdown
# [Skill 이름]

> [한 줄 설명]

## 목적

[이 스킬이 하는 일]

## 사용 시나리오

- [시나리오 1]
- [시나리오 2]

## 상세 가이드

- [SKILL.md](SKILL.md) - 실행 지침
- [references/examples.md](references/examples.md) - 예제
```

### SKILL.md

```yaml
---
name: skill-name
description: |
  [무엇을 하는지 설명].
  [트리거 키워드1], [키워드2], [키워드3] 시 사용하세요.
---

# [Skill 이름]

[스킬 개요 1-2문장]

## 실행 단계

### 1. [단계 1]

[설명]

### 2. [단계 2]

[설명]

### 3. [단계 3]

[설명]

## 체크리스트

\`\`\`
□ [체크 항목 1]
□ [체크 항목 2]
\`\`\`

## 상세 가이드

[상세 예제](references/examples.md) 참조
```

---

## 3. Agent 템플릿

### CLAUDE.md

```markdown
# [Agent 이름]

> [한 줄 설명]

## 목적

[이 에이전트가 하는 일]

## 사용 시나리오

- [시나리오 1]
- [시나리오 2]

## 상세 가이드

- [AGENT.md](AGENT.md) - 시스템 프롬프트
- [references/criteria.md](references/criteria.md) - 판단 기준
```

### AGENT.md

```yaml
---
name: agent-name
description: >
  [역할 설명].
  [언제 위임할지 명확히]. [트리거 문구] 시 사용.
tools: Read, Grep, Glob, Bash
model: inherit
---

당신은 [역할]입니다.

## 호출 시 수행할 작업

1. [단계 1]
2. [단계 2]
3. [단계 3]

## 판단 기준

- [기준 1]
- [기준 2]

## 출력 형식

[출력 형식 설명]

## 상세 기준

[상세 기준](references/criteria.md) 참조
```

---

## 4. Frontmatter 필드 참조

### Rule

| 필드 | 필수 | 설명 |
|------|------|------|
| `description` | O | 규칙 설명 + 트리거 키워드 |
| `paths` | X | 조건부 활성화 경로 패턴 |
| `alwaysApply` | X | true면 항상 활성화 |

### Skill

| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | O | 1-64자, 소문자/숫자/하이픈 |
| `description` | O | 무엇+언제, 트리거 키워드 |
| `disable-model-invocation` | X | true면 사용자만 호출 |
| `allowed-tools` | X | 허용 도구 목록 |

### Agent

| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | O | 고유 식별자 |
| `description` | O | 위임 판단 기준 |
| `tools` | X | 허용 도구 목록 |
| `model` | X | sonnet, opus, haiku, inherit |
| `hooks` | X | 라이프사이클 훅 |
