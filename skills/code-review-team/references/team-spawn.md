# Agent Team SPAWN 패턴

> Phase 2 개선 작업 시 팀 스폰 및 관리 상세

---

## 팀 구성

| 역할 | 수 | 담당 |
|------|-----|------|
| 리더 (본인) | 1 | 작업 분배, 프로젝트 컨텍스트 전달, 결과 수집 |
| refactor-worker | 1~5 | 파일 단위 개선 실행 |

**팀원 수**: 이슈 그룹 수에 따라 결정 (1~2그룹 → 1~2명, 3~4그룹 → 3~4명, 5+ → 5명 최대)

---

## 스폰 절차

### Step 1: TeamCreate

```
TeamCreate:
  team_name: "review-{TICKET_ID}"
  description: "{TICKET_ID} 코드 리뷰 이슈 개선"
```

### Step 2: TaskCreate (그룹별)

```
TaskCreate:
  subject: "개선: {파일명} ({이슈 수}건)"
  description: |
    ## 프로젝트 컨텍스트
    {Phase 1에서 파악한 프로젝트 프로파일 요약}
    - 핵심 규칙: ...
    - 코드 스타일: ...

    ## 담당 파일
    {파일 경로}

    ## 수정할 이슈
    1. 라인 {N}: [{관점}] {설명}
       근거: {근거}
       개선 방향: {방향}
    2. ...
  activeForm: "{파일명} 개선 중"
```

### Step 3: Worker 스폰

```
Task:
  subagent_type: "general-purpose"
  team_name: "review-{TICKET_ID}"
  name: "refactor-worker-{N}"
  mode: "acceptEdits"
  prompt: (아래 Worker 프롬프트 참조)
```

### Step 4: 할당 및 완료 대기

- TaskUpdate로 각 Worker에 Task 할당
- Worker의 SendMessage 수신 → 변경 내역 확인
- 모든 Worker 완료 → 결과 취합

### Step 5: 정리

- 모든 Worker에게 shutdown_request
- TeamDelete 실행

---

## 이슈 그룹핑

### 같은 Task로 묶는 경우

- 같은 파일의 이슈
- import/export로 직접 연결된 파일
- 같은 함수/클래스에 걸친 이슈

### 별도 Task로 분리하는 경우

- 독립적인 파일
- 서로 다른 모듈/기능 영역

---

## Worker 프롬프트 템플릿

```markdown
당신은 코드 개선 담당자입니다.
팀 "review-{TICKET_ID}"에 소속되어 있습니다.

## 프로젝트 컨텍스트

이 프로젝트의 규칙과 컨벤션입니다. 수정 시 반드시 따르세요.

{CLAUDE.md에서 추출한 핵심 규칙}
{lint/format 설정 요약}
{관련 스킬이 정의한 컨벤션}

## 담당 파일
{파일 경로 목록}

## 수정할 이슈

### 이슈 #{번호}: [{관점}] {설명}
- **위치**: {파일}:{라인}
- **근거**: {근거}
- **개선 방향**: {방향}

## 작업 절차
1. TaskList → 할당된 Task 확인
2. TaskGet → 상세 내용 확인
3. TaskUpdate → in_progress
4. Read → 대상 파일 읽기
5. 이슈별 수정 적용 (프로젝트 규칙/컨벤션 준수)
6. SendMessage → 리더에게 변경 내역 보고
7. TaskUpdate → completed

## 규칙
- 담당 파일만 수정하세요
- 프로젝트의 기존 코드 스타일을 유지하세요
- 이슈와 무관한 코드를 건드리지 마세요
- 새로운 의존성을 추가하지 마세요
- 리뷰에서 제시한 개선 방향을 따르세요
```

---

## 에러 처리

| 상황 | 대응 |
|------|------|
| Worker가 파일을 찾지 못함 | 리더에게 보고, 해당 Task skip |
| Worker 간 파일 충돌 | 그룹핑 오류 → 리더가 순차 처리 |
| Worker 타임아웃 | 미완료로 보고 |
| 프로젝트 규칙 불명확 | Worker가 리더에게 질문 → 리더가 판단 |
