# Project Rule Generator

> 프로젝트의 의존성, PRD, 구조를 분석하여 필수/선택 Rule을 자동 생성합니다.

## 목적

프로젝트를 종합 분석하여 `.claude/rules/` 구조를 자동으로 구성합니다:

1. **의존성 분석**: package.json 등에서 기술 스택 + 버전 파악
2. **최신 정보 검색**: WebSearch로 버전별 베스트 프랙티스 확인
3. **단일 파일 규칙**: 각 규칙은 `rule-name.md` 파일로 관리
4. **그룹화**: 관련 규칙은 디렉토리로 그룹화 + 인덱스(AGENTS.md) 포함

## 생성되는 구조

```
.claude/rules/
├── AGENTS.md              # 전체 인덱스
├── CLAUDE.md
│
│   # 단일 파일 규칙
├── typescript.md
├── architecture.md
│
│   # 그룹화 디렉토리
├── frontend/
│   ├── AGENTS.md          # 그룹 인덱스
│   ├── react.md
│   └── components.md
│
└── prd/
    ├── AGENTS.md          # 그룹 인덱스
    ├── user-stories.md
    └── specs.md
```

## 의존 스킬

- **rule-structurizer** (선택): 긴 문서를 규칙 구조로 변환
  - 없을 경우 설치 안내 메시지 표시

## 상세 가이드

- [SKILL.md](SKILL.md) - 실행 지침
- [references/analysis-guide.md](references/analysis-guide.md) - 분석 방법론
- [references/rule-generation-guide.md](references/rule-generation-guide.md) - 동적 생성 가이드
- [references/indexing-guide.md](references/indexing-guide.md) - 인덱싱 전략
