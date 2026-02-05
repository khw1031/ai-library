# 노트 템플릿

> 모든 노트는 Skill 형식으로 작성하여 AI가 탐색 가능하게 합니다.

## 기본 노트 템플릿 (SKILL.md)

```markdown
---
name: {{kebab-case-name}}
description: >
  {{주제}}에 대한 학습 노트.
  {{트리거 키워드들}} 관련 질문 시 참조.
keywords:
  - {{키워드1}}
  - {{키워드2}}
  - {{영문명}}
related:
  - {{유사개념}}
  - {{반대개념}}
tags:
  - topic/{{category}}/{{subcategory}}
  - type/concept
  - status/draft
created: {{date}}
source-type: {{text|url|image|video}}
aliases:
  - {{대체명칭}}
---

# {{title}}

## 요약

> [!summary]
> 핵심 내용 2-3문장. 이 개념이 무엇이고 왜 중요한지.
> AI가 이 요약만 보고 관련성을 판단할 수 있어야 함.

## 쉬운 설명

> [!tip] 5살에게 설명하듯이
> 비유나 일상적인 예시로 비전문가도 이해할 수 있게 설명.
> 전문 용어 없이 핵심 아이디어만 전달.

## 핵심 내용

### 포인트 1

설명...

### 포인트 2

설명...

## 관련 개념

### 유사 개념
- [[유사개념]] - 공통점 설명

### 반대 개념
- [[반대개념]] - 차이점 설명

### 상위 개념
- [[상위개념]] - 속한 범주

### 선행 지식
- [[선행개념]] - 먼저 알아야 할 것

### 후속 학습
- [[후속개념]] - 다음에 배울 것

## 레퍼런스

- [출처](URL)

## 상세 내용

> 분량이 많으면 [상세 문서](references/detail.md)로 분리
```

---

## 디렉토리 구조

### 단순 노트

```
notes/react/use-state/
└── SKILL.md
```

### 상세 노트 (references 분리)

```
notes/react/use-state/
├── SKILL.md              # 핵심만 (~100줄)
└── references/
    ├── examples.md       # 코드 예시
    └── edge-cases.md     # 예외 상황
```

---

## Progressive Disclosure 적용

| 위치 | 내용 | 토큰 목표 |
|------|------|----------|
| frontmatter | name, description, keywords, related | ~50 |
| 요약 + 쉬운 설명 | 핵심 이해 | ~200 |
| 핵심 내용 | 주요 포인트 | ~500 |
| references/ | 상세, 예시 | 무제한 |

**AI 탐색 흐름:**
1. PageIndex/grep으로 keywords 검색
2. description 읽고 관련성 판단
3. 필요시 요약/쉬운 설명 로드
4. 더 필요시 references/ 로드

---

## Frontmatter 필드 설명

| 필드 | 필수 | 용도 |
|------|------|------|
| `name` | O | Skill 식별자 (kebab-case) |
| `description` | O | AI 판단용 설명 + 트리거 키워드 |
| `keywords` | O | AI 검색용 키워드 배열 |
| `related` | O | 빠른 관련 개념 파악 |
| `tags` | O | Obsidian 분류용 |
| `created` | O | 생성일 |
| `source-type` | X | 입력 컨텐츠 유형 |
| `aliases` | X | Obsidian 대체 이름 |

---

## 소스 유형별 추가 필드

### URL 기반

```yaml
source-type: url
source-url: "https://..."
```

### 영상 기반

```yaml
source-type: video
source-url: "https://youtube.com/..."
```

### 이미지 기반

```yaml
source-type: image
source-file: "screenshot.png"
```

---

## 비교 노트 템플릿

```markdown
---
name: {{a}}-vs-{{b}}
description: >
  {{A}}와 {{B}}의 비교 분석.
  {{A}}, {{B}}, 비교, 차이점 질문 시 참조.
keywords:
  - {{A}}
  - {{B}}
  - 비교
  - 차이점
related:
  - {{A}}
  - {{B}}
tags:
  - type/comparison
---

# {{A}} vs {{B}}

## 요약

> [!summary]
> 핵심 차이점 한 문장

## 쉬운 설명

> [!tip] 비유로 이해하기
> A는 ~와 같고, B는 ~와 같다.

## 비교표

| 항목 | {{A}} | {{B}} |
|------|-------|-------|
| ... | ... | ... |

## 언제 선택?

- **{{A}}**: 조건
- **{{B}}**: 조건

## See Also

- [[{{A}}]]
- [[{{B}}]]
```

---

## Callout 가이드

```markdown
> [!summary] 요약
> AI 판단용 핵심 요약

> [!tip] 쉬운 설명
> 비전문가용

> [!note] 참고
> 부가 정보

> [!warning] 주의
> 주의사항

> [!example] 예시
> 구체적 예시
```
