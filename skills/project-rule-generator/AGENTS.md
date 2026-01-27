# Project Rule Generator

> 프로젝트의 의존성, PRD, 구조를 분석하여 필수/선택 Rule을 자동 생성합니다.

## 목적

프로젝트를 종합 분석하여 `.claude/rules/` 구조를 자동으로 구성합니다:

1. **의존성 분석**: package.json 등에서 기술 스택 + **버전** 파악
2. **최신 정보 검색**: WebSearch로 버전별 베스트 프랙티스 확인
3. **동적 규칙 생성**: 분석 결과 기반 프로젝트 맞춤 규칙 생성
4. **인덱싱**: 필수/선택 규칙을 분류하여 AGENTS.md로 인덱스 생성

## 사용 시나리오

- 새 프로젝트에 Claude Rules 초기 설정
- 기존 프로젝트 규칙 구조화
- 기술 스택에 맞는 **최신** 컨벤션 규칙 생성

## 핵심 특징

| 특징 | 설명 |
|------|------|
| **동적 생성** | 템플릿 복사가 아닌 분석 결과 기반 생성 |
| **웹 검색 연동** | 최신 베스트 프랙티스 자동 반영 |
| **버전 인식** | React 19 + Compiler 등 버전별 차이 반영 |
| **기존 설정 존중** | 린터/포맷터와 중복되지 않는 규칙 |

## 의존 스킬

- **rule-structurizer** (선택): 긴 문서를 규칙 구조로 변환
  - 없을 경우 설치 안내 메시지 표시

## 생성되는 구조

```
.claude/rules/
├── AGENTS.md             # 전체 인덱스
├── CLAUDE.md
├── {tech-stack}.md       # 필수: 동적 생성된 규칙
├── architecture.md       # 필수: 구조 규칙
├── testing.md            # 선택: paths 기반
└── {domain}/             # 선택: 긴 문서 (rule-structurizer)
    └── ...
```

## 상세 가이드

- [SKILL.md](SKILL.md) - 실행 지침
- [references/analysis-guide.md](references/analysis-guide.md) - 분석 방법론
- [references/rule-generation-guide.md](references/rule-generation-guide.md) - 동적 생성 가이드
- [references/indexing-guide.md](references/indexing-guide.md) - 인덱싱 전략
