# Project Rule Generator

> 프로젝트의 의존성, PRD, 구조를 분석하여 카테고리별 Rule을 자동 생성합니다.

## 목적

프로젝트를 종합 분석하여 `.claude/rules/` 구조를 자동으로 구성합니다:

1. **의존성 분석**: package.json 등에서 기술 스택 + 버전 파악
2. **최신 정보 검색**: WebSearch로 버전별 베스트 프랙티스 확인
3. **카테고리 기반 구조**: 기본적으로 규칙을 카테고리별로 그룹화
4. **목차 제공**: 루트 인덱스에 카테고리별 목차 포함

## 생성되는 구조 (카테고리 기반)

```
.claude/rules/
├── AGENTS.md              # 전체 인덱스 + 목차
├── CLAUDE.md
│
├── core/                  # 핵심 규칙 카테고리
│   ├── AGENTS.md
│   ├── typescript.md
│   └── architecture.md
│
├── frontend/              # 프론트엔드 카테고리
│   ├── AGENTS.md
│   ├── react.md
│   └── components.md
│
├── testing/               # 테스트 카테고리
│   ├── AGENTS.md
│   └── unit.md
│
└── docs/                  # 문서 기반 카테고리
    ├── AGENTS.md
    └── prd/
        ├── AGENTS.md
        └── overview.md
```

## 의존 스킬

- **rule-structurizer** (선택): 긴 문서를 규칙 구조로 변환
  - 없을 경우 설치 안내 메시지 표시

## 상세 가이드

- [SKILL.md](SKILL.md) - 실행 지침
- [references/analysis-guide.md](references/analysis-guide.md) - 분석 방법론
- [references/rule-generation-guide.md](references/rule-generation-guide.md) - 동적 생성 가이드
- [references/indexing-guide.md](references/indexing-guide.md) - 인덱싱 전략
