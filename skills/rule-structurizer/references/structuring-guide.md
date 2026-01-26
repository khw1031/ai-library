# 구조화 가이드

## 문서 분석 방법

### 1. 핵심 목적 식별

문서에서 다음 질문에 답할 수 있는 내용을 찾습니다:

- 이 문서는 **무엇**에 관한 것인가?
- 이 문서의 **목표**는 무엇인가?
- **누가** 이 문서를 참조하는가?

이 답변들이 AGENTS.md의 핵심 목적 섹션이 됩니다.

### 2. 섹션 분리 기준

문서를 자연스러운 단위로 분리합니다:

**분리 기준**:
- 주제/관심사가 명확히 다른 경우
- 독립적으로 참조 가능한 경우
- 원본 문서의 대제목(H1, H2) 단위

**분리하지 않는 경우**:
- 내용이 500줄 미만으로 짧은 경우
- 다른 섹션과 강하게 연결된 경우
- 분리 시 맥락이 손실되는 경우

### 3. 핵심 vs 상세 구분

| 핵심 (RULE.md) | 상세 (references/) |
|---------------|-------------------|
| 항상 필요한 원칙 | 특정 상황에서만 필요 |
| 요약/개요 | 전체 내용 |
| 체크리스트 | 상세 설명 |
| 빠른 참조용 | 깊은 이해용 |

---

## 문서 유형별 분류 예시

### PRD (Product Requirements Document)

```
RULE.md:
- MVP 범위
- 핵심 요구사항 요약
- 우선순위 (P0/P1/P2)
- 주요 제약사항

references/:
- user-stories.md (페르소나, 유저 플로우)
- functional-specs.md (기능 상세)
- technical-specs.md (아키텍처, 데이터 모델)
- api-specs.md (엔드포인트, 스키마)
- constraints.md (성능, 보안, 법적 요건)
```

### 기술 문서

```
RULE.md:
- 핵심 개념 요약
- 주요 컴포넌트 개요
- 빠른 시작 가이드

references/:
- concepts.md (상세 개념 설명)
- architecture.md (시스템 구조)
- api-reference.md (API 상세)
- examples.md (코드 예제)
```

### 개발 가이드

```
RULE.md:
- 핵심 원칙
- 필수 체크리스트
- 빠른 참조 명령어

references/:
- getting-started.md (초기 설정)
- configuration.md (설정 상세)
- best-practices.md (모범 사례)
- troubleshooting.md (문제 해결)
```

### 정책/규칙 문서

```
RULE.md:
- 핵심 원칙 목록
- 필수 준수 사항
- 체크리스트

references/:
- principles.md (원칙 상세 설명)
- guidelines.md (가이드라인)
- exceptions.md (예외 상황)
- examples.md (적용 예시)
```

---

## 내용 압축 전략

### AGENTS.md 작성

원본 문서의 서론/개요에서:
1. 첫 문단을 한 줄로 압축 → 설명
2. 목표/목적 나열 → 핵심 목적 (3개 이내)
3. 목차 생성 → 섹션 안내 테이블

### RULE.md 작성

원본 문서 전체에서:
1. 가장 중요한 내용 선별
2. 상세 설명 제거, 요점만 유지
3. 예제는 최소화 (1-2개만)
4. 나머지는 references 참조로 대체

### references/ 작성

원본 문서 섹션에서:
1. 섹션 단위로 분리
2. 원본 내용 유지 (압축 불필요)
3. 단일 관심사에 집중

---

## 체크리스트

구조화 완료 후 확인:

```
□ AGENTS.md
  □ ~100 토큰 이내인가?
  □ 한 줄 설명이 명확한가?
  □ 핵심 목적이 3개 이내인가?
  □ 섹션 목차가 완전한가?

□ RULE.md
  □ 5000 토큰 / 500줄 이내인가?
  □ 핵심 내용만 포함했는가?
  □ references 참조가 있는가?
  □ description frontmatter가 있는가?

□ references/
  □ 각 파일이 단일 관심사인가?
  □ 파일명이 내용을 설명하는가?
  □ 불필요한 파일이 없는가?

□ 전체
  □ 목차만으로 필요한 섹션을 판단할 수 있는가?
  □ 원본 문서의 내용이 손실되지 않았는가?
```

---

## 일반적인 실수

### ❌ AGENTS.md에 너무 많은 내용

```markdown
# 잘못된 예
## 핵심 목적
- 목적 1
- 목적 2
- 목적 3
- 목적 4
- 목적 5
- 상세 설명...
```

### ✅ 올바른 예

```markdown
## 핵심 목적
- 목적 1
- 목적 2
- 목적 3
```

### ❌ RULE.md에 모든 상세 내용

5000 토큰을 넘는 긴 내용을 RULE.md에 포함

### ✅ 올바른 예

핵심만 RULE.md에, 상세는 references/로 분리

### ❌ 너무 잘게 분리된 references

```
references/
├── intro.md (10줄)
├── step1.md (5줄)
├── step2.md (8줄)
└── conclusion.md (3줄)
```

### ✅ 올바른 예

```
references/
├── getting-started.md (전체 시작 가이드)
└── advanced-usage.md (고급 사용법)
```
