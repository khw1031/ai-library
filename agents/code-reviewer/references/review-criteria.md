# Code Review Criteria

> diff 분석을 통해 전문가 집단을 동적으로 구성하고, 프로젝트 컨텍스트 기반 리뷰를 수행합니다.

---

## 1단계: 컨텍스트 수집

리뷰 시작 전 다음 정보를 수집합니다:

### 1.1 Diff 분석

```bash
git diff HEAD~1 --name-only
git diff HEAD~1 --stat
```

**추출 항목:**
| 분석 대상 | 추출 정보 | 용도 |
|----------|----------|------|
| 파일 확장자 | `.ts`, `.tsx`, `.py`, `.go` 등 | 언어별 전문가 활성화 |
| 변경 경로 | `src/api/`, `components/`, `db/` | 도메인 전문가 활성화 |
| 변경 규모 | 라인 수, 파일 수 | 리뷰 깊이 결정 |
| 패턴 감지 | 테스트, 마이그레이션, 설정 | 특화 관점 적용 |

### 1.2 프로젝트 구조 탐색

```bash
# 프로젝트 루트에서 구조 파악
ls -la
cat package.json 2>/dev/null || cat pyproject.toml 2>/dev/null
```

### 1.3 PRD 탐색 (있는 경우)

```
탐색 경로 (우선순위 순):
1. .ai/tasks/{TICKET_ID}/prd*.md
2. docs/PRD*.md
3. docs/prd/*.md
4. README.md의 ## 목적/## Overview 섹션
```

**PRD 발견 시**: 비즈니스 로직 검증 관점 강화

### 1.4 프로젝트 Rules 로드

```
탐색 경로:
1. .claude/rules/*.md
2. .claude/rules/**/AGENTS.md (인덱스)
3. .claude/CLAUDE.md
```

**Rules 발견 시**: 해당 규칙을 리뷰 기준에 통합

---

## 2단계: 전문가 집단 동적 구성

diff 분석 결과를 기반으로 관련 전문가 관점을 활성화합니다.

### 기본 전문가 (항상 활성화)

| 전문가 | 관점 | 검토 영역 |
|--------|------|----------|
| Security Analyst | 보안 취약점 | 인증, 입력 검증, 데이터 노출 |
| Code Quality Engineer | 품질 및 유지보수성 | 중복, 복잡성, 네이밍 |

### 조건부 전문가 (diff 기반 활성화)

| 감지 조건 | 활성화 전문가 | 추가 검토 |
|----------|--------------|----------|
| `**/*.tsx`, `**/components/**` | Frontend Architect | 컴포넌트 설계, 상태 관리, 접근성 |
| `**/api/**`, `**/*.controller.*` | API Designer | RESTful 원칙, 에러 처리, 스키마 |
| `**/*.sql`, `**/migrations/**`, `**/prisma/**` | Database Engineer | 쿼리 최적화, 인덱스, 마이그레이션 안전성 |
| `**/*.test.*`, `**/__tests__/**` | QA Engineer | 테스트 커버리지, 엣지 케이스, 모킹 |
| `**/auth/**`, `**/middleware/**` | Security Specialist | 인증/인가, 세션, 토큰 관리 |
| `Dockerfile`, `*.yml`, `**/infra/**` | DevOps Engineer | 컨테이너, CI/CD, 환경 설정 |
| PRD 존재 | Business Analyst | 요구사항 충족, 비즈니스 로직 정합성 |

### 언어별 전문가

| 감지 파일 | 활성화 전문가 | 언어 특화 검토 |
|----------|--------------|---------------|
| `*.ts`, `*.tsx` | TypeScript Expert | 타입 안전성, 타입 가드, any 사용 |
| `*.py` | Python Expert | PEP8, 타입 힌트, 예외 처리 |
| `*.go` | Go Expert | 에러 핸들링, 고루틴 안전성, 인터페이스 |
| `*.rs` | Rust Expert | 소유권, 라이프타임, unsafe 사용 |

---

## 3단계: 리뷰 기준

### 3.1 필수 검토 (CRITICAL/MAJOR 후보)

#### 보안 (Security Analyst)
- [ ] 인젝션 취약점 (SQL, XSS, Command)
- [ ] 인증/인가 우회 가능성
- [ ] 민감 정보 노출 (API 키, 비밀번호, 토큰)
- [ ] 안전하지 않은 역직렬화
- [ ] 경로 탐색 (Path Traversal)

#### 안정성 (모든 전문가)
- [ ] 무한 루프 / 재귀 가능성
- [ ] 메모리 누수 / 리소스 미해제
- [ ] 널/undefined 역참조
- [ ] 경쟁 조건 (Race Condition)
- [ ] 예외 처리 누락

### 3.2 조건부 검토 (활성화된 전문가 기준)

#### Frontend Architect (프론트엔드 변경 시)
- [ ] 컴포넌트 책임 분리
- [ ] 상태 관리 적절성
- [ ] 리렌더링 최적화
- [ ] 접근성 (a11y) 준수
- [ ] 반응형 처리

#### API Designer (API 변경 시)
- [ ] RESTful 원칙 준수
- [ ] 적절한 HTTP 상태 코드
- [ ] 요청/응답 검증
- [ ] 에러 응답 일관성
- [ ] 버전 관리 고려

#### Database Engineer (DB 변경 시)
- [ ] N+1 쿼리 문제
- [ ] 인덱스 활용
- [ ] 트랜잭션 적절성
- [ ] 마이그레이션 롤백 가능성
- [ ] 데이터 정합성

#### Business Analyst (PRD 존재 시)
- [ ] 요구사항 충족 여부
- [ ] 엣지 케이스 처리
- [ ] 비즈니스 규칙 정합성
- [ ] 사용자 시나리오 커버리지

### 3.3 프로젝트 Rules 기반 검토

```
[로드된 Rules에서 관련 규칙 적용]

예시:
- .claude/rules/typescript.md → TypeScript 컨벤션 검증
- .claude/rules/architecture.md → 아키텍처 원칙 준수 확인
- .claude/rules/testing.md → 테스트 패턴 검증
```

---

## 4단계: 리뷰 실행 프로세스

### 4.1 분석 시작

```
활성화된 전문가: {동적으로 결정된 전문가 목록}
참조 Rules: {로드된 Rules 목록}
PRD 참조: {있음/없음}
```

### 4.2 전문가별 교차 검증

각 활성화된 전문가 관점에서 순차적으로 검토:

```
[Security Analyst 관점]
→ 보안 취약점 스캔

[Code Quality Engineer 관점]
→ 품질 및 유지보수성 검토

[{조건부 전문가} 관점]
→ 도메인 특화 검토

[Rules 검증]
→ 프로젝트 규칙 준수 확인
```

### 4.3 이슈 통합 및 우선순위 결정

| 등급 | 기준 | 조치 |
|------|------|------|
| CRITICAL | 보안 취약점, 데이터 손실 위험, 시스템 장애 | 즉시 수정 필수 |
| MAJOR | 기능 오류, 심각한 성능 저하, Rules 위반 | 커밋 전 수정 권장 |
| MEDIUM | 품질 저하, 유지보수 어려움 | 개선 권장 |
| LOW | 스타일, 컨벤션, 사소한 개선 | 선택적 개선 |

---

## 리뷰 출력 형식

```markdown
## 리뷰 컨텍스트

- **활성화된 전문가**: Security Analyst, Frontend Architect, TypeScript Expert
- **참조 Rules**: typescript.md, react.md
- **PRD 참조**: 있음 (.ai/tasks/AUTH-123/prd.md)

## 전문가별 피드백

### Security Analyst
{보안 관점 이슈}

### Frontend Architect
{프론트엔드 관점 이슈}

### Rules 검증
{프로젝트 규칙 위반 사항}

## 통합 이슈 목록

### 🔴 CRITICAL
| 전문가 | File | Line | Issue |
|--------|------|------|-------|

### 🟠 MAJOR
...
```

---

## 확장: 프로젝트별 커스텀 전문가

필요시 아래에 프로젝트 특화 전문가를 추가하세요:

```markdown
### {프로젝트명} 특화 전문가

| 전문가 | 감지 조건 | 검토 영역 |
|--------|----------|----------|
| Payment Expert | `**/payment/**` | 결제 로직, 금액 계산, 트랜잭션 |
| AI/ML Engineer | `**/models/**`, `*.py` | 모델 로딩, 추론 최적화 |
```
