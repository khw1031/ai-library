---
name: prd-structurizer
description: >
  PRD 문서를 Progressive Disclosure 원칙에 따라 구조화합니다.
  긴 PRD를 LLM이 효율적으로 참조할 수 있는 nested 디렉토리 구조로 변환.
  PRD 구조화, PRD 분할, 요구사항 문서 정리 요청 시 사용.
argument-hint: "[prd-file-path] [output-dir]"
---

# PRD Structurizer

PRD 문서를 `.claude/rules/` 호환 구조로 변환하여 LLM이 필요한 부분만 동적으로 참조할 수 있게 합니다.

## 실행 단계

### 1단계: PRD 분석

입력된 PRD에서 다음을 식별합니다:

| 요소 | 추출 내용 |
|------|----------|
| 프로젝트명 | 디렉토리명으로 사용 |
| 핵심 목표 | AGENTS.md 개요에 포함 |
| 주요 섹션 | references/ 파일로 분리 |
| MVP 범위 | RULE.md에 포함 |

### 2단계: 섹션 분류

PRD 내용을 3단계로 분류:

```
1단계 (AGENTS.md) - 항상 로드
├── 프로젝트 한 줄 설명
├── 목차 (섹션 목록 + 간단 설명)
└── 핵심 목표 3줄 이내

2단계 (RULE.md) - 관련 작업 시 로드
├── MVP 범위 정의
├── 핵심 요구사항 요약
├── 주요 제약사항
└── 기술 스택 (있는 경우)

3단계 (references/) - 필요시만 로드
├── user-stories.md
├── functional-specs.md
├── technical-specs.md
├── ui-ux-specs.md
├── api-specs.md
└── constraints.md
```

### 3단계: 구조 생성

출력 디렉토리에 다음 구조를 생성합니다:

```
.claude/rules/prd-{project-name}/
├── AGENTS.md          # 진입점 - 목차 + 개요
├── RULE.md            # 핵심 요구사항
├── CLAUDE.md          # "AGENTS.md" (호환성)
└── references/        # 상세 섹션
    └── *.md
```

### 4단계: 검증

- [ ] AGENTS.md가 100토큰 이내인가?
- [ ] RULE.md가 5000토큰 이내인가?
- [ ] 각 reference 파일이 단일 관심사에 집중하는가?
- [ ] 목차만으로 어떤 섹션을 참조할지 판단 가능한가?

---

## 입출력 예시

### 입력

```bash
/prd-structurizer docs/my-project-prd.md .claude/rules
```

### 출력 구조

```
.claude/rules/prd-my-project/
├── AGENTS.md
├── RULE.md
├── CLAUDE.md
└── references/
    ├── user-stories.md
    ├── functional-specs.md
    └── technical-specs.md
```

---

## AGENTS.md 작성 규칙

목차 형식으로 작성하여 LLM이 필요한 섹션을 빠르게 판단:

```markdown
# {프로젝트명} PRD

> {한 줄 설명}

## 핵심 목표
- {목표 1}
- {목표 2}

## 섹션 안내

| 섹션 | 설명 | 참조 |
|------|------|------|
| 핵심 요구사항 | MVP 범위, 제약사항 | [RULE.md](RULE.md) |
| 사용자 스토리 | 페르소나, 유저 플로우 | [user-stories.md](references/user-stories.md) |
| 기능 명세 | 상세 기능 정의 | [functional-specs.md](references/functional-specs.md) |
| 기술 명세 | 아키텍처, API | [technical-specs.md](references/technical-specs.md) |
```

---

## 상세 참조

- [출력 구조 상세](references/output-structure.md)
- [섹션별 템플릿](references/section-templates.md)
