---
name: code-review-team
description: >
  프로젝트 컨텍스트를 파악한 뒤 전문가 관점으로 코드 리뷰하고,
  사용자 승인 후 Agent Team SPAWN으로 병렬 개선 작업을 수행합니다.
  트리거: 코드리뷰, 코드 리뷰, code review, 리뷰해줘,
  리팩토링, 코드검토, PR 리뷰, 변경사항 검토.
---

# Code Review & Team Refactor

프로젝트의 규칙/스킬/에이전트 설정을 먼저 파악하고, 그에 맞는 전문가 관점으로 리뷰합니다.
사용자가 개선 범위를 지정하면 Agent Team을 스폰하여 병렬로 수정합니다.

## 전체 흐름

```
Phase 1: 컨텍스트 탐색 → 전문가 패널 구성 → 리뷰 → 사용자 전달
  ── 사용자 검토 (개선 범위 지정) ──
Phase 2: 범위 확정 → TeamCreate → 병렬 개선 → 완료 보고
```

---

## Phase 1: 코드 리뷰

### Step 1. 프로젝트 컨텍스트 탐색

변경 사항을 보기 **전에** 프로젝트 설정을 파악합니다.

**탐색 대상 (순서대로):**

| 우선순위 | 경로 | 파악할 내용 |
|----------|------|-------------|
| 1 | `CLAUDE.md`, `.claude/CLAUDE.md` | 프로젝트 개요, 핵심 규칙, 컨벤션 |
| 2 | `.claude/settings.json` | 허용 도구, 권한 설정 |
| 3 | `.claude/skills/*/SKILL.md` (frontmatter만) | 프로젝트가 사용하는 스킬 목록 |
| 4 | `.claude/agents/*/AGENT.md` (frontmatter만) | 등록된 에이전트 역할 |
| 5 | 프로젝트 루트 설정 파일 | `package.json`, `pyproject.toml`, `go.mod` 등 → 언어/프레임워크 판별 |
| 6 | lint/format 설정 | `.eslintrc`, `ruff.toml`, `.prettierrc` 등 → 코드 스타일 규칙 |

**결과물**: 프로젝트 프로파일 요약

```
프로젝트 프로파일:
- 언어/프레임워크: {감지 결과}
- 핵심 규칙: {CLAUDE.md에서 추출한 규칙들}
- 코드 스타일: {lint/format 설정 요약}
- 등록된 스킬: {스킬 목록}
- 등록된 에이전트: {에이전트 목록}
```

### Step 2. 전문가 패널 구성

프로젝트 프로파일을 기반으로 리뷰에 참여할 **전문가 관점**을 동적으로 결정합니다.

[전문가 패널 구성 가이드](references/expert-panel.md) 참조.

**기본 관점** (항상 포함):
- **프로젝트 규칙 준수** — CLAUDE.md, lint 설정 등 프로젝트 자체 규칙 위반 여부
- **정확성** — 로직 오류, 에러 처리, 엣지 케이스

**조건부 관점** (프로파일에 따라 추가):
- 웹 프레임워크 감지 → 보안 관점 추가
- DB/ORM 감지 → 데이터 계층 관점 추가
- 테스트 프레임워크 감지 → 테스트 커버리지 관점 추가
- 등등 (상세는 references 참조)

### Step 3. 변경 사항 분석

```bash
git branch --show-current          # TICKET_ID 추출
git diff HEAD~1 --name-only        # 변경 파일 목록
git diff HEAD~1                    # 전체 diff
```

**TICKET_ID**: 브랜치명에서 패턴 추출 (`feature/ABC-123-desc` → `ABC-123`). 실패 시 사용자에게 질문.

### Step 4. 리뷰 수행

각 전문가 관점에서 변경된 코드를 검토합니다.

**리뷰 원칙:**
- **프로젝트 컨텍스트 우선** — 일반론보다 이 프로젝트의 규칙/컨벤션 기준으로 판단
- 이슈 위치를 정확히 지정 (파일:라인)
- 왜 문제인지 근거 제시
- 개선 방향을 제안하되, 구체적 수정 코드는 Phase 2에서 처리

**이슈 등급:**

| 등급 | 기준 |
|------|------|
| CRITICAL | 보안 취약점, 데이터 손실, 시스템 장애 유발 |
| MAJOR | 기능 오류, 프로젝트 핵심 규칙 위반, 심각한 성능 저하 |
| MEDIUM | 코드 품질, 컨벤션 불일치, 유지보수 어려움 |
| LOW | 사소한 개선, 스타일 |

### Step 5. 리뷰 문서 저장 및 전달

경로: `.ai/tasks/{TICKET_ID}/review.md`
형식: [리뷰 문서 템플릿](references/review-template.md)

기존 파일 있으면 `review-01.md`, `review-02.md`로 버전 증가.

**사용자에게 전달:**

```
📋 코드 리뷰 완료
📄 문서: .ai/tasks/{TICKET_ID}/review.md

프로젝트 컨텍스트: {언어}, {프레임워크}, {핵심 규칙 요약}
리뷰 관점: {적용된 전문가 목록}

| 등급 | 건수 |
|------|------|
| 🔴 CRITICAL | N |
| 🟠 MAJOR | N |
| 🟡 MEDIUM | N |
| 🟢 LOW | N |

주요 이슈:
1. src/auth.ts:45 — [보안] 사용자 입력 검증 누락
2. src/service.ts:120 — [프로젝트 규칙] CLAUDE.md의 에러 처리 규칙 미준수
...

개선을 진행하려면 범위를 지정해주세요.
예: "CRITICAL 전부", "1, 3번", "전부"
```

---

## Phase 2: 팀 개선

사용자가 범위를 지정하면 Agent Team을 스폰합니다.

### 1. 범위 확정 및 작업 그룹핑

대상 이슈를 **파일 단위**로 그룹핑:
- 같은 파일 / 의존 관계 파일 → 하나의 Task
- 독립 파일 → 별도 Task
- 최대 Worker 5명

### 2. Team SPAWN

[팀 스폰 패턴](references/team-spawn.md) 참조.

```
TeamCreate: "review-{TICKET_ID}"
  ├─ TaskCreate: 그룹별 Task
  ├─ Task (general-purpose) × N:
  │   Worker에게 전달하는 정보:
  │   - 프로젝트 컨텍스트 요약 (규칙, 컨벤션)
  │   - 담당 파일 및 이슈 목록
  │   - 개선 방향 (리뷰 문서에서 추출)
  └─ 완료 대기 → 결과 수집
```

**Worker 프롬프트 핵심:**
- 프로젝트 규칙/컨벤션을 **먼저** 전달
- 이슈별 개선 방향에 따라 수정
- 기존 코드 스타일 유지
- 담당 파일만 수정

### 3. 완료 보고

```
✅ 개선 완료

수정된 이슈: N/M건
수정된 파일:
- src/auth.ts: 2건 (입력 검증 추가, 에러 처리 규칙 적용)
- ...

팀 정리 완료. 커밋하시려면 말씀해주세요.
```

TeamDelete로 팀 정리.

---

## 상세 가이드

- [전문가 패널 구성](references/expert-panel.md)
- [리뷰 문서 템플릿](references/review-template.md)
- [팀 스폰 패턴](references/team-spawn.md)
