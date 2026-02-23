# AI Library

> Claude Code 및 LLM 기반 도구를 위한 재사용 가능한 프롬프트 자산(Skills, Rules, Agents) 모음. Progressive Disclosure 원칙으로 설계되었습니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 개요

AI Library는 **컨텍스트 효율성**에 중점을 둔 AI/LLM 워크플로우 관리 프레임워크입니다. 프롬프트 자산을 3단계 로딩 모델로 구조화하여, 제한된 컨텍스트 윈도우를 최대한 활용하면서 완전한 기능을 유지합니다.

### 주요 특징

- **Progressive Disclosure**: 필요한 시점에 단계적으로 정보 로드
- **Context Isolation**: 각 워크플로우 단계를 별도 대화 컨텍스트에서 실행
- **Human in the Loop**: 다음 단계 진행 전 사용자 확인
- **Document as Interface**: 마크다운 파일을 통한 단계 간 소통
- **Git as History**: 각 단계 완료 시 커밋 체크포인트 생성

## 아키텍처

### Progressive Disclosure (3단계 로딩)

LLM 컨텍스트 윈도우는 제한된 자원입니다. 모든 정보를 한 번에 로드하면 초점이 분산되고 성능이 저하됩니다. 이 라이브러리는 3단계 모델을 사용합니다:

| 단계 | 로드 시점 | 토큰 | 내용 |
|------|----------|------|------|
| 1단계 | 항상 | ~100 | 이름, 설명, 트리거 키워드 |
| 2단계 | 활성화 시 | <5000 | 핵심 규칙, 필수 지침 |
| 3단계 | 필요 시 | 무제한 | 예시, 상세 문서, 스크립트 |

### 표준 디렉토리 구조

```
asset-name/
├── SKILL.md / AGENT.md    # 진입점 - 2단계 핵심 지침
└── references/            # 3단계 - 상세 문서
    └── *.md
```

## 구성 요소

### Skills (27개)

전문 기능을 제공하는 프롬프트 기반 도구:

| Skill | 설명 |
|-------|------|
| `changelog` | CHANGELOG.md에 변경 사항과 담당자를 정리하고 package.json 버전 업데이트 |
| `code-review-team` | 전문가 관점 코드 리뷰 + Agent Team 병렬 개선 작업 |
| `create-agent` | Claude Code Agent 생성 |
| `create-ai-tool` | Skill vs Agent 유형 결정 및 생성 위임 |
| `create-skill` | Claude Code Skill 생성 |
| `document-consolidator` | 여러 문서를 구조화된 단일 문서로 통합 |
| `feature-workflow` | 5단계 기능 구현 워크플로우 (Agent Team 병렬 지원) |
| `financial-*` | 재무 관련 스킬 7종 (예산, 부채, 보험, 투자, 지식관리, 생애설계, 세금) |
| `first-principles` | 1원칙(First Principles Thinking) 기반 문제 분석 |
| `git-commit` | Git 변경 사항 분석 및 커밋 메시지 자동 생성 |
| `kind-senior-developer` | 친절한 시니어 개발자처럼 변경 사항 분석/설명 |
| `learning-log-generator` | Git 커밋 히스토리 기반 일자별 학습 로그 생성 |
| `musk-algorithm` | Elon Musk 5단계 문제 해결 알고리즘 적용 |
| `note-search` | notes/ 디렉토리 학습 노트 검색 |
| `note-writer` | Obsidian 호환 학습 노트 작성 |
| `progressive-disclosure` | LLM 컨텍스트 윈도우 3단계 정보 로드 원칙 |
| `project-initializer` | 프레임워크별 프로젝트 초기화 + 최신 정보 조사 + 규칙 자동 생성 |
| `prompt-improver` | 실증 기반 기법으로 프롬프트 분석/개선 |
| `rule-manager` | Skill 기반 규칙 추가 및 관리 |
| `skills-ref` | CLAUDE.md에 Available Skills 섹션 XML 생성 |
| `vibe-mvp-advisor` | AI 아이디어 구현 가능성 및 수익화 MVP 제안 |

> 전체 목록: [skills/README.md](skills/README.md)

### Agents (2개)

특정 작업을 위한 격리된 컨텍스트의 서브에이전트:

| Agent | 설명 |
|-------|------|
| `data-crawler` | 웹 데이터 크롤링 및 수집 전문가 (sonnet) |
| `family-financial-advisor` | 가족 재무 상담 전문가 |

> 전체 목록: [agents/README.md](agents/README.md)

### Rules (2개)

대화 전반에 적용되는 가이드라인:

| Rule | 설명 |
|------|------|
| `CLAUDE.md` | 도메인 중립 Global Rule (Think Before Acting, Simplicity First, Scoped Response, Goal-Driven Execution) |
| `CODING.md` | 코딩 전용 Rule (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution) |

## 설치

### Claude Code 프로젝트에서 사용

원하는 자산을 프로젝트의 `.claude/` 디렉토리에 복사합니다:

```bash
# 스킬 복사
cp -r skills/feature-workflow .claude/skills/

# 에이전트 복사
cp -r agents/data-crawler .claude/agents/

# 규칙 복사
cp -r rules/CLAUDE.md .claude/rules/
```

### 설치 경로

```
your-project/
├── .claude/
│   ├── skills/          # 스킬
│   ├── agents/          # 에이전트
│   └── rules/           # 규칙
└── ...
```

## 사용법

### 스킬 사용

슬래시 명령어로 호출합니다:

```
/create-ai-tool      # AI 도구 생성
/feature-workflow    # 기능 개발 워크플로우 시작
/git-commit          # 커밋 메시지 자동 생성
```

### 에이전트 사용

에이전트는 작업 컨텍스트에 따라 Claude가 자동으로 위임합니다:

```
"데이터를 크롤링해줘" → data-crawler 에이전트
"재무 상담 해줘" → family-financial-advisor 에이전트
```

### 규칙 사용

규칙은 파일 패턴이나 명시적 트리거에 따라 자동 적용됩니다:

```yaml
# 예시: 경로 기반 활성화 규칙
---
description: TypeScript 코딩 표준
paths:
  - "**/*.ts"
  - "**/*.tsx"
---
```

## 프로젝트 구조

```
ai-library/
├── .claude/                    # 이 프로젝트의 Claude Code 워크플로우
│   ├── skills/                 # 내부 스킬
│   └── agents/                 # 내부 에이전트
├── skills/                     # 공유 스킬 (27개)
│   ├── changelog/
│   ├── code-review-team/
│   ├── create-agent/
│   ├── create-ai-tool/
│   ├── create-skill/
│   ├── document-consolidator/
│   ├── feature-workflow/
│   ├── financial-*/            # 재무 관련 스킬 (7개)
│   ├── first-principles/
│   ├── git-commit/
│   ├── kind-senior-developer/
│   ├── learning-log-generator/
│   ├── musk-algorithm/
│   ├── note-search/
│   ├── note-writer/
│   ├── progressive-disclosure/
│   ├── project-initializer/
│   ├── prompt-improver/
│   ├── rule-manager/
│   ├── skills-ref/
│   └── vibe-mvp-advisor/
├── agents/                     # 공유 에이전트 (2개)
│   ├── data-crawler/
│   └── family-financial-advisor/
└── rules/                      # 공유 규칙 (2개)
    ├── CLAUDE.md
    └── CODING.md
```

## 직접 만들기

### 스킬 만들기

```yaml
---
name: my-skill
description: >
  이 스킬이 하는 일.
  이 스킬을 사용할 때 (트리거 키워드).
---

# My Skill

핵심 지침 (5000 토큰 이내).

## 참고

- [상세 가이드](references/guide.md)
```

### 에이전트 만들기

```yaml
---
name: my-agent
description: >
  에이전트 역할 설명.
  [트리거 조건]일 때 자동으로 사용.
tools: Read, Grep, Glob, Bash
model: inherit
---

당신은 [역할 설명]입니다.

호출 시:
1. 첫 번째 단계
2. 두 번째 단계
3. ...
```

### 규칙 만들기

```yaml
---
description: >
  이 규칙이 다루는 내용.
  [트리거 조건]에서 적용.
paths:
  - "**/*.ts"
---

# 규칙 제목

규칙 내용.
```

## 모범 사례

1. **2단계 콘텐츠는 5000 토큰 이내로 유지** — 상세 예시는 `references/`로 이동
2. **명확한 설명 작성** — "무엇을"과 "언제"를 포함하여 올바른 활성화 보장
3. **문서 기반 소통** — 워크플로우 간 마크다운 파일로 소통
4. **체크포인트에서 커밋** — git 커밋으로 워크플로우 진행 상황 추적
5. **컨텍스트 격리** — 복잡한 단계는 별도 에이전트 컨텍스트에서 실행

## 기여하기

기여를 환영합니다! 다음 가이드라인을 따라주세요:

1. Progressive Disclosure 원칙을 따를 것
2. 핵심 지침을 간결하게 유지할 것
3. 복잡한 주제에는 충분한 참고 자료를 포함할 것
4. 제출 전 Claude Code에서 테스트할 것

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 감사의 말

- [Claude Code](https://claude.ai/claude-code)를 위해 제작
- [agentskills.io](https://agentskills.io/specification) 규격을 따름
