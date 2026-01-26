# 의사결정 트리

> AI 도구 유형 선택을 위한 상세 가이드

---

## 1. 메인 의사결정 트리

```
[사용자 요청 분석]
    │
    ├─── "컨텍스트 격리가 필요한가?"
    │         │
    │         ├─ YES: 대량 출력, 병렬 처리, 독립 작업
    │         │       → Agent 선택
    │         │
    │         └─ NO: 메인 대화에서 실행 가능
    │                 │
    │                 ├─── "특정 파일/경로에서만 활성화?"
    │                 │         │
    │                 │         ├─ YES → Rule (paths 사용)
    │                 │         │
    │                 │         └─ NO
    │                 │               │
    │                 │               └─── "사용자가 직접 호출하는 명령?"
    │                 │                         │
    │                 │                         ├─ YES → Skill
    │                 │                         │
    │                 │                         └─ NO → Rule 또는 Skill
    │                 │
    │                 └─── "도구 제한이 필요한가?"
    │                           │
    │                           ├─ YES → Agent (tools/disallowedTools)
    │                           │
    │                           └─ NO → Skill
    │
    └─── [유형 결정 완료]
              │
              └─── 세부 설정 결정 (아래 참조)
```

---

## 2. Skill 세부 결정

```
[Skill 선택됨]
    │
    ├─── "부작용이 있는 작업인가?" (배포, DB, 외부 API)
    │         │
    │         ├─ YES → disable-model-invocation: true
    │         │
    │         └─ NO → 기본값 유지
    │
    ├─── "Claude만 사용하는 배경 지식인가?"
    │         │
    │         ├─ YES → user-invocable: false
    │         │
    │         └─ NO → 기본값 유지
    │
    ├─── "서브에이전트에서 실행해야 하는가?"
    │         │
    │         ├─ YES → context: fork + agent: [Explore|Plan|general-purpose]
    │         │
    │         └─ NO → 기본값 유지
    │
    └─── "특정 도구만 허용해야 하는가?"
              │
              ├─ YES → allowed-tools: [도구 목록]
              │
              └─ NO → 기본값 유지
```

---

## 3. Agent 세부 결정

```
[Agent 선택됨]
    │
    ├─── "어떤 작업 유형인가?"
    │         │
    │         ├─ 빠른 탐색/검색 → model: haiku
    │         ├─ 분석/리뷰 → model: sonnet
    │         ├─ 복잡한 추론 → model: opus
    │         └─ 메인과 동일 → model: inherit
    │
    ├─── "읽기 전용인가?"
    │         │
    │         ├─ YES → tools: Read, Grep, Glob, Bash
    │         │         disallowedTools: Write, Edit
    │         │
    │         └─ NO → 필요한 도구 명시
    │
    ├─── "권한 프롬프트 처리는?"
    │         │
    │         ├─ 편집 자동 승인 → permissionMode: acceptEdits
    │         ├─ 모든 프롬프트 거부 → permissionMode: dontAsk
    │         ├─ 모든 권한 우회 → permissionMode: bypassPermissions
    │         └─ 기본 확인 → permissionMode: default
    │
    └─── "사전 로드할 지식이 있는가?"
              │
              ├─ YES → skills: [스킬 목록]
              │
              └─ NO → 기본값 유지
```

---

## 4. Rule 세부 결정

```
[Rule 선택됨]
    │
    ├─── "특정 파일 패턴에서만 활성화?"
    │         │
    │         ├─ YES → paths: ["**/*.ts", "src/**"]
    │         │
    │         └─ NO → alwaysApply: true
    │
    └─── "상세 문서가 필요한가?"
              │
              ├─ YES → references/ 디렉토리 생성
              │
              └─ NO → 단일 파일 규칙
```

---

## 5. 복합 시나리오

### Skill + Agent 조합

```
[조합이 필요한 경우]
    │
    ├─── "Skill에서 격리 실행 필요"
    │         │
    │         └─ Skill에 context: fork 추가
    │            agent: [사용할 에이전트]
    │
    └─── "Agent에 도메인 지식 필요"
              │
              └─ Agent에 skills: [스킬 목록] 추가
```

### 예시: 코드 리뷰 워크플로우

```yaml
# 1. 리뷰 기준 Skill (지식)
name: review-standards
description: 코드 리뷰 기준과 체크리스트
user-invocable: false  # Claude만 참조

# 2. 리뷰 실행 Agent (격리 실행)
name: code-reviewer
description: 코드 리뷰 전문가
tools: Read, Grep, Glob, Bash
skills:
  - review-standards  # 기준 주입
```

---

## 6. Skills vs Agents 핵심 차이

| 구분 | **Skills** | **Agents** |
|------|-----------|------------|
| **컨텍스트** | 메인 대화에서 실행 (공유) | 별도 컨텍스트 (격리) |
| **목적** | 지식/지침 추가, 재사용 프롬프트 | 태스크 위임, 컨텍스트 분리 |
| **호출** | `/skill-name` 또는 Claude 자동 | Claude가 태스크 위임 시 자동 |
| **도구 제어** | `allowed-tools` | `tools`, `disallowedTools` |

---

## 7. 빌트인 Agents

| Agent | Model | 용도 |
|-------|-------|------|
| **Explore** | Haiku | 읽기 전용 탐색 |
| **Plan** | Inherit | 계획 모드 컨텍스트 수집 |
| **general-purpose** | Inherit | 복잡한 다단계 작업 |

---

## 8. 판단 체크리스트

### Agent가 적합한 경우

- [ ] 테스트 실행 등 대량 출력 발생
- [ ] 여러 모듈 병렬 조사
- [ ] 특정 도구만 허용 (보안)
- [ ] 다른 모델 사용 (비용 최적화)
- [ ] 권한 모드 커스터마이징

### Skill이 적합한 경우

- [ ] 재사용 가능한 지침/패턴
- [ ] `/명령어`로 직접 호출
- [ ] 메인 컨텍스트 공유 필요
- [ ] 동적 컨텍스트 주입 (`!`command``)

### Rule이 적합한 경우

- [ ] 특정 파일 타입에만 적용 (`.ts`, `.py`)
- [ ] 특정 디렉토리에만 적용 (`src/`, `tests/`)
- [ ] 항상 적용되는 프로젝트 규칙
