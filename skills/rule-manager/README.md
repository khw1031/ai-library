# rule-manager

Skill 기반의 규칙을 레포지토리에 추가하고 관리합니다.

## 주요 기능

- 레포지토리 구조 분석 후 적절한 위치에 규칙 추가
- 기존 Skill에 추가 또는 새 Skill 생성 판단
- 사용자 확인 필수 워크플로우 (제안 → 승인 → 실행)
- Progressive Disclosure 원칙 적용

## 사용 방법

- 호출: `/rule-manager`
- 트리거: 규칙 추가, 룰 추가, rule 추가, 새 규칙, 컨벤션 추가, 스타일 가이드 추가, 가이드라인 추가

## 디렉토리 구조

```
rule-manager/
├── SKILL.md
└── references/
    ├── workflow.md
    └── templates.md
```
