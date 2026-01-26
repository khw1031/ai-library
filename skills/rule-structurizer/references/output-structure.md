# 출력 구조 상세

## 디렉토리 구조

```
.claude/rules/{document-name}/
├── AGENTS.md          # 1단계: 진입점
├── RULE.md            # 2단계: 핵심 내용
├── CLAUDE.md          # AGENTS.md 참조 (호환성)
└── references/        # 3단계: 상세 문서
    └── *.md
```

---

## 파일별 역할

### AGENTS.md (1단계)

**목적**: LLM이 문서 전체 구조를 파악하고 필요한 섹션을 선택

**크기 제한**: ~100 토큰

**필수 내용**:
- 문서 한 줄 설명
- 핵심 목적 (3개 이내)
- 섹션 목차 테이블

**로드 시점**: 항상 (rules 디렉토리 탐색 시)

---

### RULE.md (2단계)

**목적**: 관련 작업 시 참조할 핵심 내용 제공

**크기 제한**: <5000 토큰, <500줄

**필수 내용**:
- 핵심 원칙/규칙
- 필수 체크리스트 (있는 경우)
- 주요 제약사항 (있는 경우)
- references 참조 안내

**로드 시점**: 관련 작업 활성화 시

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

## 토큰 예산 가이드

| 단계 | 파일 | 토큰 예산 | 비고 |
|------|------|----------|------|
| 1단계 | AGENTS.md | ~100 | 항상 로드됨 |
| 2단계 | RULE.md | <5000 | 작업 시 로드 |
| 3단계 | references/*.md | 무제한 | 필요시만 로드 |

**총 상시 컨텍스트 비용**: ~100 토큰 (AGENTS.md만)

---

## 파일 명명 규칙

### 문서 디렉토리

```
{document-name}
```

- 소문자만 사용
- 공백은 하이픈으로 대체
- 특수문자 제거
- 의미를 명확히 전달하는 이름

예시:
- "My Project PRD" → `my-project-prd`
- "Architecture Guide v2" → `architecture-guide-v2`
- "Development Guidelines" → `development-guidelines`

### references 파일

- 케밥 케이스 사용: `section-name.md`
- 내용을 명확히 설명하는 이름
- 문서에 해당 섹션이 없으면 생성하지 않음

예시:
- `getting-started.md`
- `api-reference.md`
- `user-stories.md`
- `troubleshooting.md`
