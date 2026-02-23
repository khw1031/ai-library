# project-initializer

새 프로젝트를 프레임워크에 맞게 초기화하고 최신 버전과 모범 사례를 적용합니다.

## 주요 기능

- **범용 프레임워크 지원**: Next.js, NestJS, Vite, FastAPI, Django, Go 등
- **최신 정보 기반**: WebSearch로 최신 버전/CLI/구조를 조사한 뒤 초기화
- **대화형 결정**: 모호한 부분은 사용자에게 질문하고 선택지를 제시
- **규칙 자동 생성**: 초기화 완료 후 rule-manager 워크플로우로 기본 규칙 생성

## 5-Phase 워크플로우

| Phase | 역할 | 핵심 행동 |
|-------|------|----------|
| 1. Discovery | 요구사항 파악 | 프레임워크, 목적, 이름, 경로 질문 |
| 2. Research | 최신 정보 수집 | WebSearch로 최신 버전/CLI/구조 조사 |
| 3. Decision | 기술 스택 확정 | 조사 결과 기반 선택지 제시, 사용자 확인 |
| 4. Execution | 프로젝트 생성 | CLI 실행, 패키지 설치, 설정 파일 구성 |
| 5. Finalize | 검증 + 규칙 | 빌드 검증, 기본 규칙 자동 생성 |

## 사용 방법

```
프로젝트 초기화해줘
NestJS 프로젝트 만들어줘
Next.js로 my-app 프로젝트 생성해줘
```

## 파일 구조

```
skills/project-initializer/
├── SKILL.md                          # 핵심 워크플로우
├── README.md                         # 이 파일
└── references/
    ├── phases.md                     # Phase별 상세 절차
    ├── framework-profiles.md         # 주요 프레임워크 기본 정보
    ├── web-search-strategy.md        # 검색 쿼리 패턴, 결과 검증 방법
    └── rule-integration.md           # 규칙 자동 생성 가이드
```
