# add-rules

프로젝트에 규칙을 Skill 기반으로 추가하고 기존 규칙을 Skill로 변환합니다.

## 주요 기능

- 레포지토리 구조를 분석하여 Skill 기반 규칙을 적절한 위치에 추가
- 기존 규칙 파일(.mdc, .cursorrules 등)을 Skill로 변환
- Progressive Disclosure 3단계 로드 원칙 적용 (Stage 1: discovery, Stage 2: activation, Stage 3: execution)
- 4가지 통합 패턴 지원 (독립 Rule-Skill, 임베디드 Rules, 기존 Skill 확장, Rule 변환)
- 규칙 추가 전 사용자 확인 및 승인 절차 통합

## 사용 방법

- 호출: `/add-rules` (또는 트리거 키워드: 규칙 추가, 룰 추가, rule 추가, 새 규칙, 컨벤션 추가, 스타일 가이드 추가, 가이드라인 추가, 규칙 변환, rule 통합)
- 인자: 없음 (대화형 프롬프트로 진행)

## 디렉토리 구조

```
add-rules/
├── SKILL.md
├── references/
│   ├── workflow.md
│   ├── patterns.md
│   ├── conversion.md
│   └── templates.md
└── scripts/
    └── analyze-structure.sh
```
