# AI Library

> Claude Code 및 LLM 기반 도구를 위한 재사용 가능한 프롬프트 자산(Skills, Rules, Agents) 모음. Progressive Disclosure 원칙 기반으로 설계되었습니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | [日本語](README.ja.md) | [中文](README.zh.md)

## 개요

AI Library는 **컨텍스트 효율성**에 중점을 둔 AI/LLM 워크플로우 관리 프레임워크입니다. 프롬프트 자산을 3단계 로드 모델로 구성하여 제한된 컨텍스트 윈도우를 최대한 활용하면서 완전한 기능을 유지합니다.

### 주요 특징

- **Progressive Disclosure**: 필요한 시점에 필요한 만큼만 정보 로드
- **컨텍스트 격리**: 각 워크플로우 단계가 별도의 대화 컨텍스트에서 실행
- **Human in the Loop**: 다음 단계 진행 전 사용자 확인
- **문서 기반 인터페이스**: 마크다운 파일을 통한 단계 간 통신
- **Git 기반 히스토리**: 각 단계 완료 시 커밋 체크포인트 생성

## 아키텍처

### Progressive Disclosure (3단계 로드 모델)

LLM의 컨텍스트 윈도우는 제한된 자원입니다. 모든 정보를 한 번에 로드하면 핵심 내용이 희석되고 성능이 저하됩니다. 이 라이브러리는 3단계 모델을 사용합니다:

| 단계 | 로드 시점 | 토큰 | 내용 |
|------|----------|------|------|
| 1단계 | 항상 | ~100 | 이름, 설명, 트리거 키워드 |
| 2단계 | 활성화 시 | <5000 | 핵심 규칙, 필수 지침 |
| 3단계 | 요청 시 | 무제한 | 예제, 상세 문서, 스크립트 |

### 표준 디렉토리 구조

```
asset-name/
├── AGENTS.md          # 진입점 - 개요 (Claude 자동 인식)
├── [TYPE].md          # 2단계 - 핵심 지침
└── references/        # 3단계 - 상세 문서
    └── *.md
```

## 구성 요소

### Skills

전문화된 기능을 제공하는 프롬프트 기반 도구:

| 스킬 | 설명 |
|------|------|
| `create-ai-tool` | Progressive Disclosure를 사용하여 Rules, Skills, Agents 생성 |
| `workflow-framework` | 커스텀 워크플로우 스킬 생성을 위한 범용 프레임워크 |
| `feature-workflow` | 기능 구현을 위한 5단계 워크플로우 |
| `qa-workflow` | 명세 기반 테스트 케이스 생성 및 E2E 테스트 |
| `plan-workflow` | 명세 분석 및 PRD 추출 |

### Agents

특정 작업을 위한 격리된 컨텍스트를 가진 서브에이전트:

| 에이전트 | 설명 |
|---------|------|
| `task-master` | 병렬 서브태스크 실행을 조율하는 오케스트레이터 |
| `task-executor` | 개별 작업을 실행하는 개발자 에이전트 |
| `code-reviewer` | CRITICAL 이슈 감지 기능을 가진 시니어 코드 리뷰어 |

### Rules

코드베이스 전반에 적용되는 가이드라인:

| 규칙 | 설명 |
|------|------|
| `progressive-disclosure` | 상세 레퍼런스 가이드가 포함된 핵심 원칙 |

## 설치

### Claude Code 프로젝트용

원하는 자산을 프로젝트의 `.claude/` 디렉토리에 복사하세요:

```bash
# 스킬 복사
cp -r skills/feature-workflow .claude/skills/

# 에이전트 복사
cp -r agents/code-reviewer .claude/agents/

# 규칙 복사
cp -r rules/progressive-disclosure .claude/rules/
```

### 디렉토리 구조

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

스킬은 슬래시 명령으로 호출할 수 있습니다:

```
/create-ai-tool      # 새 AI 도구 생성
/feature-workflow    # 기능 개발 워크플로우 시작
```

### 에이전트 사용

에이전트는 작업 컨텍스트에 따라 Claude가 자동으로 위임합니다:

```
"코드 변경사항을 리뷰해줘" → code-reviewer 에이전트
"이 작업들을 병렬로 실행해줘" → task-master 에이전트
```

### 규칙 사용

규칙은 파일 패턴이나 명시적 트리거에 따라 자동으로 적용됩니다:

```yaml
# 예: 경로 기반 활성화 규칙
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
├── .claude/                    # 활성 Claude Code 자산
│   ├── skills/                 # 활성 스킬
│   ├── agents/                 # 활성 에이전트
│   └── rules/                  # 활성 규칙
├── skills/                     # 배포용 스킬
│   ├── create-ai-tool/
│   ├── feature-workflow/
│   ├── plan-workflow/
│   └── qa-workflow/
├── agents/                     # 배포용 에이전트
│   ├── code-reviewer/
│   ├── task-master/
│   └── task-executor/
├── rules/                      # 배포용 규칙
│   └── progressive-disclosure/
└── docs/                       # 문서
```

## 직접 자산 작성하기

### 스킬 작성

```yaml
---
name: my-skill
description: >
  이 스킬이 하는 일.
  이 스킬을 사용할 시점 (트리거 키워드).
---

# My Skill

핵심 지침 (5000 토큰 미만 유지).

## 참조

- [상세 가이드](references/guide.md)
```

### 에이전트 작성

```yaml
---
name: my-agent
description: >
  에이전트 역할 설명.
  [트리거 조건]에서 사전에 사용.
tools: Read, Grep, Glob, Bash
model: inherit
---

당신은 [역할 설명]입니다.

호출 시:
1. 첫 번째 단계
2. 두 번째 단계
3. ...
```

### 규칙 작성

```yaml
---
description: >
  이 규칙이 다루는 내용.
  [트리거 조건] 작업 시 적용.
paths:
  - "**/*.ts"
---

# 규칙 제목

규칙 내용.
```

## 모범 사례

1. **2단계 내용은 5000 토큰 미만으로 유지** - 상세 예제는 `references/`로 이동
2. **명확한 설명 작성** - 적절한 활성화를 위해 "무엇"과 "언제"를 포함
3. **문서 기반 통신 사용** - 워크플로우가 마크다운 파일을 통해 통신하도록
4. **체크포인트에서 커밋** - 워크플로우 진행 상황 추적에 git 커밋 사용
5. **컨텍스트 격리** - 복잡한 단계는 별도의 에이전트 컨텍스트에서 실행

## 기여

기여를 환영합니다! 다음 가이드라인을 따라주세요:

1. Progressive Disclosure 원칙 준수
2. 핵심 지침은 간결하게
3. 복잡한 주제는 포괄적인 레퍼런스 포함
4. 제출 전 Claude Code로 테스트

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 감사의 말

- [Claude Code](https://claude.ai/claude-code)용으로 제작
- [agentskills.io](https://agentskills.io/specification) 명세 준수
