# 출력 구조 상세

## 디렉토리 구조

```
.claude/rules/prd-{project-name}/
├── AGENTS.md          # 1단계: 진입점
├── RULE.md            # 2단계: 핵심 요구사항
├── CLAUDE.md          # AGENTS.md 참조 (호환성)
└── references/        # 3단계: 상세 문서
    ├── user-stories.md
    ├── functional-specs.md
    ├── technical-specs.md
    ├── ui-ux-specs.md
    ├── api-specs.md
    └── constraints.md
```

---

## 파일별 역할

### AGENTS.md (1단계)

**목적**: LLM이 PRD 전체 구조를 파악하고 필요한 섹션을 선택

**크기 제한**: ~100 토큰

**필수 내용**:
- 프로젝트 한 줄 설명
- 핵심 목표 (3개 이내)
- 섹션 목차 테이블

**로드 시점**: 항상 (rules 디렉토리 탐색 시)

---

### RULE.md (2단계)

**목적**: 개발 작업 시 참조할 핵심 요구사항 제공

**크기 제한**: <5000 토큰, <500줄

**필수 내용**:
- MVP 범위 정의
- 핵심 기능 요구사항 요약
- 주요 제약사항
- 기술 스택 (해당 시)
- 우선순위 구분 (P0/P1/P2)

**로드 시점**: PRD 관련 작업 활성화 시

---

### CLAUDE.md

**내용**: `AGENTS.md` (단일 라인)

**목적**: Claude Code 호환성 유지

---

### references/ (3단계)

**목적**: 상세 정보가 필요할 때만 선택적 로드

**크기 제한**: 파일당 무제한 (단, 단일 관심사 집중)

**로드 시점**: LLM이 명시적으로 참조할 때

---

## references/ 파일 분류 기준

| 파일명 | 포함 내용 | 분리 기준 |
|--------|----------|----------|
| `user-stories.md` | 페르소나, 유저 저니, As-a-user 스토리 | 사용자 관점 요구사항 |
| `functional-specs.md` | 기능별 상세 명세, 비즈니스 로직 | 기능 단위 정의 |
| `technical-specs.md` | 아키텍처, 데이터 모델, 시스템 설계 | 기술 구현 관점 |
| `ui-ux-specs.md` | 와이어프레임, 인터랙션, 디자인 시스템 | UI/UX 관점 |
| `api-specs.md` | 엔드포인트, 요청/응답 스키마 | API 인터페이스 |
| `constraints.md` | 성능, 보안, 법적 제약, 의존성 | 제약사항 모음 |

---

## 토큰 예산 가이드

| 단계 | 파일 | 토큰 예산 | 비고 |
|------|------|----------|------|
| 1단계 | AGENTS.md | ~100 | 항상 로드됨 |
| 2단계 | RULE.md | <5000 | 작업 시 로드 |
| 3단계 | references/*.md | 무제한 | 필요시만 로드 |

**총 상시 컨텍스트 비용**: ~100 토큰 (AGENTS.md만)

---

## 파일 명명 규칙

### 프로젝트 디렉토리

```
prd-{project-name}
```

- 소문자만 사용
- 공백은 하이픈으로 대체
- 특수문자 제거

예시:
- "My Awesome Project" → `prd-my-awesome-project`
- "E-Commerce Platform v2" → `prd-e-commerce-platform-v2`

### references 파일

- 케밥 케이스 사용: `user-stories.md`
- 내용을 명확히 설명하는 이름
- PRD에 해당 섹션이 없으면 생성하지 않음
