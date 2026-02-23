# WebSearch 전략

Phase별 검색 시점, 쿼리 패턴, 결과 검증 방법을 정의합니다.

---

## 검색 원칙

1. **설치 전 반드시 검색** - 프레임워크/패키지 설치 전 최신 버전 확인
2. **공식 소스 우선** - 공식 문서, GitHub 릴리즈, 패키지 레지스트리
3. **연도 포함 검색** - 쿼리에 현재 연도 포함으로 최신 결과 확보
4. **교차 검증** - 2개 이상 소스에서 버전 정보 일치 확인

---

## Phase 2: 필수 검색 항목

### 검색 쿼리 템플릿

| 항목 | 쿼리 패턴 | 우선 출처 |
|------|-----------|----------|
| 프레임워크 버전 | `{framework} latest stable version {year}` | 공식 docs, GitHub releases |
| 런타임 LTS | `{runtime} LTS version {year}` | 공식 사이트 |
| CLI 도구 | `{framework} create project CLI official {year}` | 공식 docs |
| 권장 구조 | `{framework} recommended project structure best practices` | 공식 docs, 커뮤니티 |
| 패키지 매니저 | `{ecosystem} recommended package manager {year}` | 벤치마크, 공식 docs |

### 생태계별 추가 검색

**JavaScript/TypeScript:**
```
Node.js LTS version {year}
pnpm vs npm vs yarn vs bun benchmark {year}
{framework} TypeScript setup {year}
```

**Python:**
```
Python latest stable version {year}
uv vs pip vs poetry comparison {year}
{framework} project structure {year}
```

**Go:**
```
Go latest version {year}
Go project layout standard {year}
golangci-lint latest version {year}
```

---

## Phase 4: 설치 중 검색

패키지 설치 시 호환성 문제가 발생하면 추가 검색합니다:

| 상황 | 쿼리 패턴 |
|------|-----------|
| 버전 충돌 | `{package_a} {version} compatible with {package_b}` |
| 설치 실패 | `{package} install error {error_message}` |
| 대안 필요 | `{package} alternative {year}` |

---

## 결과 검증 방법

### 신뢰도 순위

| 순위 | 출처 | 신뢰도 |
|------|------|--------|
| 1 | 공식 문서 (docs.{framework}.com) | 최고 |
| 2 | GitHub 릴리즈 페이지 | 높음 |
| 3 | 패키지 레지스트리 (npm, PyPI, pkg.go.dev) | 높음 |
| 4 | 공식 블로그 | 중간 |
| 5 | 커뮤니티 블로그/튜토리얼 | 참고용 |

### 교차 검증 절차

1. 공식 소스에서 버전 확인
2. 패키지 레지스트리에서 동일 버전 확인
3. 불일치 시 가장 최근 날짜의 공식 소스 우선

---

## 폴백 전략

| 상황 | 대응 |
|------|------|
| 검색 결과 없음 | 공식 GitHub 릴리즈 페이지 직접 확인 |
| 버전 정보 모호 | 패키지 레지스트리 (npm/PyPI) 직접 확인 |
| 최신 정보 불확실 | 사용자에게 알리고 가장 최근 확인된 안정 버전 사용 |
| 검색 실패 | framework-profiles.md 기본 정보로 진행, 사용자에게 고지 |
