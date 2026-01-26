---
name: create-ai-tool
description: >
  Progressive Disclosure 원칙이 적용된 AI 도구를 생성합니다.
  Rules, Skills, Agents 생성/구성/설계, 새 규칙 만들기, 스킬 생성,
  에이전트 작성, 워크플로우 구조화, "어떻게 만들지", "어떻게 구성하면 좋을지"
  질문 시에도 활성화됩니다.
---

# AI Tool Creator

사용자 요구사항을 분석하여 적절한 유형(Skill/Agent/Rule)의 도구를 생성합니다.

## 실행 단계

### 1단계: 요구사항 분석

사용자 요청에서 다음을 파악합니다:

| 질문 | 판단 기준 |
|------|----------|
| 컨텍스트 격리 필요? | Yes → Agent, No → Skill |
| 도구 제한 필요? | Yes → Agent |
| 재사용 가능한 지식? | Yes → Skill 또는 Rule |
| 부작용 있는 작업? | Yes → `disable-model-invocation: true` |
| 파일 패턴 기반 활성화? | Yes → Rule with `paths` |

### 2단계: 유형 결정

```
[요청 분석]
    │
    ├─ 컨텍스트 격리/도구 제한 필요 → Agent
    │
    ├─ 재사용 가능한 지침/명령 → Skill
    │
    └─ 파일/경로 기반 규칙 → Rule
```

### 3단계: 구조 생성

상세 가이드 (필요시 참조):
- [의사결정 트리](references/decision-tree.md) - 유형 선택 + Skills vs Agents 비교
- [템플릿 모음](references/templates.md) - 복사 가능한 템플릿

---

## Progressive Disclosure 원칙

> **상세 원칙 참조**: `.claude/rules/progressive-disclosure/RULE.md`
>
> 해당 경로에 파일이 없으면 사용자에게 안내:
> "Progressive Disclosure 상세 원칙이 필요합니다. `.claude/rules/progressive-disclosure/` 규칙을 추가하거나, 아래 요약 원칙을 따르세요."

### 3단계 로드 모델 (요약)

| 단계 | 토큰 | 내용 |
|------|------|------|
| 1단계 | ~100 | name, description (항상 로드) |
| 2단계 | <5000 | 핵심 지침 (활성화 시 로드) |
| 3단계 | 무제한 | references/, scripts/ (요청 시 로드) |

### description 작성 규칙

```yaml
# 좋은 예 - 무엇 + 언제
description: >
  코드 리뷰 시 적용되는 품질 기준.
  PR 리뷰, 코드 검토, 품질 점검 요청 시 활성화.

# 나쁜 예 - 모호함
description: 코드 리뷰 규칙
```

---

## 빠른 선택 가이드

| 사용 사례 | 유형 | 핵심 설정 |
|----------|------|----------|
| 코딩 컨벤션, 스타일 가이드 | Skill | - |
| 단계별 작업 지침 | Skill | `context: fork` (격리 시) |
| 배포, DB 작업 (부작용) | Skill | `disable-model-invocation: true` |
| 코드 리뷰, 디버깅 (격리) | Agent | `tools`, `model` |
| 병렬 리서치 | Agent | `model: haiku` |
| 파일별 자동 규칙 | Rule | `paths: ["**/*.ts"]` |

---

## 출력 형식

생성된 도구는 다음 구조를 따릅니다:

```
tool-name/
├── [TYPE].md          # SKILL.md, AGENT.md, 또는 RULE.md
└── references/        # 필요시 상세 문서
    └── *.md
```

---

## 체크리스트

생성 전 확인:

```
□ 1단계: description이 무엇+언제를 설명하는가?
□ 1단계: name이 소문자/하이픈 규칙을 따르는가?
□ 2단계: 본문이 500줄/5000토큰 이하인가?
□ 3단계: 상세 내용이 references/로 분리되었는가?
```
