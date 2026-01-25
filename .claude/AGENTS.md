# AI Library

> LLM을 위한 프롬프트 자산(Skills, Rules, Agents)을 관리하는 라이브러리

## 개요

이 프로젝트는 Claude Code 및 기타 LLM 에이전트에서 사용할 수 있는 재사용 가능한 프롬프트 자산을 관리합니다. Progressive Disclosure 원칙에 따라 구조화되어 컨텍스트 윈도우를 효율적으로 활용합니다.

## 프로젝트 구조

```
ai-library/
├── .claude/                    # Claude Code 전용 설정
│   ├── skills/                 # 활성 스킬 (Claude Code 인식)
│   ├── agents/                 # 활성 에이전트
│   └── rules/                  # 활성 규칙
│
├── skills/                     # 스킬 라이브러리 (배포용)
├── agents/                     # 에이전트 라이브러리 (배포용)
└── rules/                      # 규칙 라이브러리 (배포용)
```

### 디렉토리 역할

| 위치 | 용도 |
|------|------|
| `.claude/*` | Claude Code가 직접 인식하는 활성 자산 |
| `skills/`, `agents/`, `rules/` | 배포 및 공유용 라이브러리 |

## 핵심 원칙

### Progressive Disclosure

정보를 3단계로 나누어 필요할 때만 로드:

| 단계 | 로드 시점 | 토큰 | 내용 |
|------|----------|------|------|
| 1단계 | 항상 | ~100 | name, description |
| 2단계 | 활성화 시 | <5000 | 핵심 지침 |
| 3단계 | 요청 시 | 무제한 | 상세 문서, 예제 |

상세 가이드: [rules/progressive-disclosure/](rules/progressive-disclosure/)

## 활성 자산

### Skills

| 스킬 | 설명 |
|------|------|
| [create-ai-tool](skills/create-ai-tool/) | Rules, Skills, Agents 생성 |
| [workflow-framework](skills/workflow-framework/) | 커스텀 워크플로우 스킬 생성 |
| [vercel-react-best-practices](skills/vercel-react-best-practices/) | React/Next.js 성능 최적화 |

### Agents

| 에이전트 | 설명 |
|----------|------|
| [task-master](agents/task-master/) | 서브태스크 조율 및 병렬 실행 관리 |
| [task-executor](agents/task-executor/) | 개별 태스크 실행 |

### Rules

| 규칙 | 설명 |
|------|------|
| [progressive-disclosure](rules/progressive-disclosure/) | 프롬프트 자산 구조화 원칙 |

## 자산 추가/수정 가이드

### 새 자산 생성

`/create-ai-tool` 스킬을 사용하여 Progressive Disclosure 원칙에 맞는 자산을 생성합니다.

### 표준 디렉토리 구조

```
asset-name/
├── CLAUDE.md          # 진입점 - 개요 (AGENTS.md 참조)
├── [TYPE].md          # 2단계 - 핵심 지침 (SKILL.md, RULE.md, AGENT.md)
└── references/        # 3단계 - 상세 문서
    └── *.md
```

### 파일 역할

| 파일 | 역할 | 자동 인식 |
|------|------|----------|
| CLAUDE.md | 진입점, README 역할 | O |
| AGENTS.md | 에이전트 정의 | X (CLAUDE.md에서 참조) |
| SKILL.md / RULE.md / AGENT.md | 핵심 지침 | X (frontmatter 트리거) |
| references/*.md | 상세 문서 | X (온디맨드) |

## 관련 문서

- [Progressive Disclosure 원칙](rules/progressive-disclosure/RULE.md)
- [Skills 작성 가이드](rules/progressive-disclosure/references/skills.md)
- [Rules 작성 가이드](rules/progressive-disclosure/references/rules.md)
- [Agents 작성 가이드](rules/progressive-disclosure/references/agents.md)
