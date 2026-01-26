# Skills vs Agents 사용 가이드

> Claude Code에서 Skills와 Agents(Subagents)를 언제, 어떻게 사용해야 하는지 정리

## 핵심 차이점

| 구분 | **Skills** | **Agents (Subagents)** |
|------|-----------|------------------------|
| **컨텍스트** | 메인 대화에서 실행 (공유) | 별도 컨텍스트 윈도우 (격리) |
| **목적** | 지식/지침 추가, 재사용 가능한 프롬프트 | 특정 태스크 위임, 컨텍스트 분리 |
| **도구 제어** | `allowed-tools`로 제한 가능 | 독립적인 도구 접근 권한 설정 |
| **호출 방식** | `/skill-name` 또는 Claude 자동 호출 | Claude가 태스크 위임 시 자동 호출 |
| **모델 선택** | `model` frontmatter | `model` frontmatter (haiku/sonnet/opus) |

---

## Skills 사용 사례

### 1. 레퍼런스 콘텐츠 (지식 주입)

코딩 컨벤션, 패턴, 스타일 가이드 같은 **도메인 지식**을 추가할 때:

```yaml
---
name: api-conventions
description: API design patterns for this codebase
---

API 엔드포인트 작성 시:
- RESTful 네이밍 컨벤션 사용
- 일관된 에러 형식 반환
- 요청 검증 포함
```

### 2. 태스크 콘텐츠 (단계별 지침)

배포, 커밋, 코드 생성 같은 **특정 작업**에 대한 단계별 지침:

```yaml
---
name: deploy
description: 애플리케이션을 프로덕션에 배포
context: fork
disable-model-invocation: true
---

배포 단계:
1. 테스트 스위트 실행
2. 애플리케이션 빌드
3. 배포 대상에 푸시
```

### 3. 사용자 전용 명령 (부작용 있는 작업)

배포, DB 마이그레이션 등 **Claude가 자동 실행하면 안 되는 작업**:

```yaml
---
name: db-migrate
description: 데이터베이스 마이그레이션 실행
disable-model-invocation: true  # 사용자만 호출 가능
---
```

### 4. Claude 전용 지식 (배경 정보)

레거시 시스템 설명 등 **사용자가 직접 호출하지 않는 배경 지식**:

```yaml
---
name: legacy-context
description: 레거시 시스템 작동 방식 설명
user-invocable: false  # Claude만 호출 가능
---
```

### 5. 동적 컨텍스트 주입

쉘 명령 결과를 프롬프트에 삽입:

```yaml
---
name: pr-summary
description: PR 변경사항 요약
context: fork
agent: Explore
---

## PR 컨텍스트
- PR diff: !`gh pr diff`
- PR 코멘트: !`gh pr view --comments`
```

---

## Agents (Subagents) 사용 사례

### 1. 컨텍스트 보존 (대량 출력 격리)

테스트 실행, 로그 분석 등 **대량 출력이 발생하는 작업**:

```
테스트 스위트를 실행하고 실패한 테스트와 에러 메시지만 보고해줘
```

→ 상세 출력은 서브에이전트 컨텍스트에 남고, 요약만 메인 대화로 반환

### 2. 제약 조건 적용 (도구 제한)

**읽기 전용** 또는 **특정 도구만 허용**:

```yaml
---
name: safe-researcher
description: 제한된 기능의 리서치 에이전트
tools: Read, Grep, Glob, Bash
disallowedTools: Write, Edit
---
```

### 3. 병렬 리서치 (독립적 조사)

여러 모듈을 **동시에** 조사:

```
인증, 데이터베이스, API 모듈을 각각 별도 서브에이전트로 병렬 리서치해줘
```

### 4. 비용 제어 (모델 선택)

간단한 탐색은 **Haiku**, 복잡한 분석은 **Opus/Sonnet**:

```yaml
---
name: quick-search
description: 빠른 코드베이스 탐색
model: haiku  # 빠르고 저렴
---
```

### 5. 체인 워크플로우 (순차 작업)

코드 리뷰 → 최적화 같은 **다단계 작업**:

```
code-reviewer 에이전트로 성능 이슈를 찾고, optimizer 에이전트로 수정해줘
```

### 6. 조건부 도구 검증 (Hooks)

특정 조건에서만 도구 사용 허용:

```yaml
---
name: db-reader
description: 읽기 전용 DB 쿼리 실행
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---
```

---

## 선택 기준 가이드

### 메인 대화 (또는 Skills) 사용

| 상황 | 이유 |
|------|------|
| 빈번한 상호작용/반복 수정 필요 | 컨텍스트 공유 필요 |
| 여러 단계가 컨텍스트 공유 필요 | 계획→구현→테스트 연결 |
| 빠르고 작은 변경 | 서브에이전트 오버헤드 불필요 |
| 지연시간이 중요 | 서브에이전트 초기화 시간 없음 |

### Subagents 사용

| 상황 | 이유 |
|------|------|
| 대량 출력 발생 | 메인 컨텍스트 오염 방지 |
| 특정 도구 제한 필요 | 보안/안전성 확보 |
| 자체 완결형 작업 | 요약만 반환하면 충분 |
| 병렬 처리 필요 | 독립적 조사 가능 |

---

## Skills + Agents 조합 패턴

### 1. Skill에서 서브에이전트 실행

```yaml
---
name: deep-research
description: 주제를 철저히 조사
context: fork        # 서브에이전트에서 실행
agent: Explore       # Explore 에이전트 사용
---
```

### 2. Agent에 Skills 사전 로드

```yaml
---
name: api-developer
description: API 엔드포인트 구현
skills:              # 스킬 내용 사전 주입
  - api-conventions
  - error-handling-patterns
---
```

---

## 빌트인 Subagents

| Agent | Model | 용도 |
|-------|-------|------|
| **Explore** | Haiku | 읽기 전용 코드베이스 탐색 |
| **Plan** | Inherit | 계획 모드에서 컨텍스트 수집 |
| **general-purpose** | Inherit | 복잡한 다단계 작업 |

---

## Frontmatter 참조

### Skills

| 필드 | 설명 |
|------|------|
| `name` | 스킬 이름 (소문자, 하이픈) |
| `description` | 언제 사용할지 설명 |
| `disable-model-invocation` | true면 사용자만 호출 가능 |
| `user-invocable` | false면 Claude만 호출 가능 |
| `allowed-tools` | 허용할 도구 목록 |
| `context` | `fork`면 서브에이전트에서 실행 |
| `agent` | context: fork 시 사용할 에이전트 |

### Agents

| 필드 | 설명 |
|------|------|
| `name` | 에이전트 이름 (소문자, 하이픈) |
| `description` | 언제 위임할지 설명 |
| `tools` | 허용할 도구 목록 |
| `disallowedTools` | 거부할 도구 목록 |
| `model` | sonnet, opus, haiku, inherit |
| `permissionMode` | default, acceptEdits, dontAsk, bypassPermissions, plan |
| `skills` | 사전 로드할 스킬 목록 |
| `hooks` | 라이프사이클 훅 |

---

## 실전 예제

### 코드 리뷰어 (Agent)

```yaml
---
name: code-reviewer
description: 코드 품질, 보안, 유지보수성 검토. 코드 작성/수정 후 사전에 사용.
tools: Read, Grep, Glob, Bash
model: inherit
---

시니어 코드 리뷰어로서 높은 코드 품질과 보안 기준을 보장합니다.

호출 시:
1. git diff로 최근 변경 확인
2. 수정된 파일에 집중
3. 즉시 리뷰 시작

피드백 우선순위:
- 치명적 이슈 (반드시 수정)
- 경고 (수정 권장)
- 제안 (개선 고려)
```

### 코드 설명 (Skill)

```yaml
---
name: explain-code
description: 코드를 다이어그램과 비유로 설명. "어떻게 작동해?"라고 물을 때 사용.
---

코드 설명 시 항상 포함:

1. **비유로 시작**: 일상의 무언가에 비교
2. **다이어그램 그리기**: ASCII 아트로 흐름/구조 표시
3. **코드 워크스루**: 단계별 설명
4. **주의점 강조**: 흔한 실수나 오해
```

---

## LLM으로 AI 도구 생성하기

### `/create-ai-tool` 스킬 사용

새로운 Skill, Agent, Rule을 생성할 때는 `/create-ai-tool` 스킬을 사용하세요.

```
/create-ai-tool 코드 리뷰 에이전트를 만들어줘
```

이 스킬은:
1. 요구사항을 분석하여 적절한 유형(Skill/Agent/Rule) 결정
2. Progressive Disclosure 원칙 자동 적용
3. 올바른 디렉토리 구조와 템플릿 생성

### 의사결정 흐름

```
[요청 분석]
    │
    ├─ 컨텍스트 격리/도구 제한 필요? → Agent
    │
    ├─ 재사용 가능한 지침/명령? → Skill
    │
    └─ 파일/경로 기반 규칙? → Rule
```

### Progressive Disclosure 원칙

| 단계 | 토큰 | 내용 | 로드 시점 |
|------|------|------|----------|
| 1단계 | ~100 | name, description | 항상 |
| 2단계 | <5000 | 핵심 지침 | 활성화 시 |
| 3단계 | 무제한 | references/, scripts/ | 요청 시 |

### 생성 체크리스트

```
□ description이 "무엇 + 언제"를 설명하는가?
□ name이 소문자/하이픈 규칙을 따르는가?
□ 본문이 500줄/5000토큰 이하인가?
□ 상세 내용이 references/로 분리되었는가?
```

### 상세 가이드

- [의사결정 트리](.claude/skills/create-ai-tool/references/decision-tree.md)
- [템플릿 모음](.claude/skills/create-ai-tool/references/templates.md)

---

## 참고 문서

- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [Claude Code Sub-agents Documentation](https://code.claude.com/docs/en/sub-agents)
- [Agent Skills Open Standard](https://agentskills.io)
