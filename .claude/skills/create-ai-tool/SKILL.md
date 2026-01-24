---
name: create-ai-tool
description: |
  Progressive Disclosure 원칙이 적용된 AI 도구를 생성합니다.
  Rules, Skills, Agents 생성, 새 규칙 만들기, 스킬 생성, 에이전트 작성 시 사용하세요.
  create ai tool, create rule, create skill, create agent, 규칙 생성, 스킬 만들기
---

# Create AI Tool

Progressive Disclosure 원칙에 맞는 AI 도구(Rules, Skills, Agents)를 생성합니다.

## 실행 단계

### 1. 도구 유형 확인

사용자에게 생성할 도구 유형을 확인합니다:

| 유형 | 용도 | 생성 위치 |
|------|------|----------|
| Rule | 코드 작성 시 적용되는 규칙 | `.claude/rules/` |
| Skill | 호출 가능한 지침/절차 | `.claude/skills/` |
| Agent | 독립 실행 서브에이전트 | `.claude/agents/` |

### 2. 기본 정보 수집

- **name**: 1-64자, 소문자/숫자/하이픈만 (예: `code-review`, `api-design`)
- **description**: 무엇을 하는지 + 언제 사용하는지
- **복잡도**: 단일 파일 vs 디렉토리 구조

### 3. 구조 결정

| 복잡도 | 구조 | 기준 |
|--------|------|------|
| 간단 | 단일 파일 | 참조 문서 불필요, 500줄 이하 |
| 복잡 | 디렉토리 | 상세 문서, 스크립트, 예제 필요 |

### 4. 파일 생성

#### 디렉토리 구조 (권장)

```
tool-name/
├── CLAUDE.md              # Claude가 자동 인식 (AGENTS.md 만 명시)
├── AGENTS.md              # 진입점 - 도구 개요(CLAUDE.md에서 참조 필요)
├── [RULE|SKILL|AGENT].md  # 2단계 - 핵심 지침
└── references/            # 3단계 - 상세 문서
    └── *.md
```

#### 각 파일 작성 원칙

**CLAUDE.md (진입점)**
- Claude가 자동으로 인식하는 유일한 진입점
- 목적 1-2문장
- 사용 시나리오
- 파일 구조 개요
- AGENTS.md 링크 포함 (Claude가 AGENTS.md를 자동 인식하지 않으므로)

**AGENTS.md (선택)**
- 도구와 관련된 에이전트 정의
- Claude가 자동 인식하지 않음 → CLAUDE.md에서 명시적 참조 필요

**RULE.md / SKILL.md / AGENT.md (2단계)**
- YAML frontmatter 필수 (`name`, `description`)
- 핵심 지침만 포함
- 500줄 / 5000 토큰 이하
- 상세 내용은 `references/`로 분리

**references/*.md (3단계)**
- 주제별 분리
- 예제, 템플릿, 상세 스키마
- 온디맨드 로드

### 5. 검증 체크리스트

```
□ name이 디렉토리명과 일치하는가?
□ description이 무엇+언제를 포함하는가?
□ 2단계 파일이 500줄 이하인가?
□ 상세 내용이 references/로 분리되었는가?
□ CLAUDE.md가 진입점 역할을 하는가?
```

## 템플릿 참조

각 도구별 상세 템플릿은 [references/templates.md](references/templates.md) 참조

## 도구별 레퍼런스

### Skills 생성 시
- [Skills 작성 가이드](references/skills-guide.md) - 필수 필드, 트리거 키워드, 체크리스트
- [Skills 상세 가이드](references/skills-detail.md) - 선택 필드, 전체 예제, 네이밍 컨벤션

### Rules / Agents 생성 시
- [템플릿 모음](references/templates.md) - Rule, Skill, Agent 템플릿

### Progressive Disclosure 원칙
- `.claude/rules/progressive-disclosure/RULE.md` - 핵심 원칙
- `.claude/rules/progressive-disclosure/references/rules.md` - Rules 적용
- `.claude/rules/progressive-disclosure/references/skills.md` - Skills 적용
- `.claude/rules/progressive-disclosure/references/agents.md` - Agents 적용
