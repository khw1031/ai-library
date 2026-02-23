# Skills

> Claude Code에서 사용할 수 있는 프롬프트 기반 도구 모음 (총 27개)

## 요약

| Skill | Description |
|-------|-------------|
| `changelog` | CHANGELOG.md에 변경 사항과 담당자를 정리하고 package.json 버전 업데이트 |
| `code-review-team` | 전문가 관점 코드 리뷰 + Agent Team 병렬 개선 작업 |
| `create-agent` | Claude Code Agent 생성 |
| `create-ai-tool` | Skill vs Agent 유형 결정 및 생성 위임 |
| `create-skill` | Claude Code Skill 생성 |
| `document-consolidator` | 여러 문서를 구조화된 단일 문서로 통합 |
| `feature-workflow` | 5단계 기능 구현 워크플로우 (Agent Team 병렬 지원) |
| `financial-budget-management` | 가계 예산 수립, 지출 관리, 저축 전략 |
| `financial-debt-management` | 부채 관리 및 대출 전략 가이드 |
| `financial-insurance-guide` | 보험 상품 분석 및 보장설계 가이드 |
| `financial-investment-guide` | 투자 금융상품, 절세상품, 자산배분 전략 |
| `financial-knowledge-manager` | 재무 지식 스킬 데이터 추가/수정/관리 |
| `financial-life-planning` | 생애주기별 재무 설계와 자금 마련 전략 |
| `financial-tax-guide` | 한국 세금 체계와 절세 전략 |
| `first-principles` | 1원칙(First Principles Thinking) 기반 문제 분석 |
| `git-commit` | Git 변경 사항 분석 및 커밋 메시지 자동 생성 |
| `kind-senior-developer` | 친절한 시니어 개발자처럼 변경 사항 분석/설명 |
| `learning-log-generator` | Git 커밋 히스토리 기반 일자별 학습 로그 생성 |
| `musk-algorithm` | Elon Musk 5단계 문제 해결 알고리즘 적용 |
| `note-search` | notes/ 디렉토리 학습 노트 검색 |
| `note-writer` | Obsidian 호환 학습 노트 작성 |
| `progressive-disclosure` | LLM 컨텍스트 윈도우 3단계 정보 로드 원칙 |
| `prompt-improver` | 실증 기반 기법으로 프롬프트 분석/개선 |
| `rule-manager` | Skill 기반 규칙 추가 및 관리 |
| `skills-ref` | CLAUDE.md에 Available Skills 섹션 XML 생성 |
| `vibe-mvp-advisor` | AI 아이디어 구현 가능성 및 수익화 MVP 제안 |

## 카테고리별 분류

### 생성 도구

AI 자산(Skill, Agent, Rule) 생성 관련 스킬

| Skill | Description |
|-------|-------------|
| `create-ai-tool` | Skill vs Agent 유형 결정 및 생성 위임 |
| `create-skill` | Claude Code Skill 생성 |
| `create-agent` | Claude Code Agent 생성 |

### 워크플로우

단계별 작업 진행을 위한 스킬

| Skill | Description |
|-------|-------------|
| `feature-workflow` | 5단계 기능 구현 워크플로우 |

### 코드 품질

코드 리뷰, 분석, 설명 관련 스킬

| Skill | Description |
|-------|-------------|
| `code-review-team` | 전문가 관점 코드 리뷰 + 병렬 개선 |
| `kind-senior-developer` | 친절한 시니어 개발자처럼 변경 사항 설명 |

### 규칙 관리

프로젝트 규칙 생성/추가/구조화

| Skill | Description |
|-------|-------------|
| `rule-manager` | Skill 기반 규칙 추가 및 관리 |

### Git & 배포

커밋, 변경 이력, 버전 관리

| Skill | Description |
|-------|-------------|
| `git-commit` | Git 변경 사항 분석 및 커밋 메시지 자동 생성 |
| `changelog` | CHANGELOG.md 작성 및 버전 업데이트 |

### 문서 관리

문서 통합, 스킬 인덱싱

| Skill | Description |
|-------|-------------|
| `document-consolidator` | 여러 문서를 구조화된 단일 문서로 통합 |
| `skills-ref` | CLAUDE.md에 Available Skills 섹션 생성 |

### 프롬프트 & 원칙

프롬프트 개선, 설계 원칙

| Skill | Description |
|-------|-------------|
| `progressive-disclosure` | LLM 컨텍스트 윈도우 3단계 정보 로드 원칙 |
| `prompt-improver` | 실증 기반 기법으로 프롬프트 분석/개선 |

### 사고 프레임워크

문제 분석 및 해결 방법론

| Skill | Description |
|-------|-------------|
| `first-principles` | 1원칙 사고 기반 문제 분석 |
| `musk-algorithm` | Elon Musk 5단계 문제 해결 알고리즘 |
| `vibe-mvp-advisor` | AI 아이디어 구현 가능성 및 MVP 제안 |

### 학습 & 노트

학습 기록 및 지식 관리

| Skill | Description |
|-------|-------------|
| `learning-log-generator` | Git 히스토리 기반 학습 로그 생성 |
| `note-writer` | Obsidian 호환 학습 노트 작성 |
| `note-search` | 학습 노트 검색 |

### 재무 관리

가족 재무 상담 관련 스킬 (family-financial-advisor 에이전트와 연동)

| Skill | Description | 호출 |
|-------|-------------|------|
| `financial-budget-management` | 가계 예산, 지출 관리, 저축 전략 | 에이전트 전용 |
| `financial-debt-management` | 부채 관리, 대출 전략 | 에이전트 전용 |
| `financial-insurance-guide` | 보험 상품 분석, 보장설계 | 에이전트 전용 |
| `financial-investment-guide` | 투자, 자산배분 전략 | 사용자 호출 가능 |
| `financial-knowledge-manager` | 재무 지식 데이터 관리 | 사용자 호출 가능 |
| `financial-life-planning` | 생애주기별 재무 설계 | 에이전트 전용 |
| `financial-tax-guide` | 세금 체계, 절세 전략 | 사용자 호출 가능 |
