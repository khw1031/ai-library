# Rules Index

> 하위 규칙을 동적으로 발견하기 위한 인덱스

## 규칙 목록

| 규칙 | 트리거 상황 | 참조 |
|------|------------|------|
| progressive-disclosure | 프롬프트 자산(Skills, Rules, Agents) 작성 시 | [progressive-disclosure/](progressive-disclosure/) |

## 규칙 탐색 방법

각 규칙 디렉토리는 다음 구조를 따릅니다:

```
rule-name/
├── AGENTS.md      # 규칙 개요 및 핵심 원칙
├── RULE.md        # 상세 지침 (frontmatter 포함)
└── references/    # 세부 가이드 (필요시 참조)
```

**탐색 순서**: `AGENTS.md` → 필요시 `RULE.md` → 필요시 `references/`
