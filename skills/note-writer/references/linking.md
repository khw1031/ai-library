# 링크 전략

## 기존 노트 탐색

### 1순위: PageIndex

PageIndex가 있으면 우선 사용하여 관련 노트 검색.

### 2순위: Fallback (grep/glob)

```bash
# keywords 필드에서 검색
grep -rl "keywords:.*검색어" . --include="SKILL.md"

# related 필드에서 검색
grep -rl "related:.*검색어" . --include="SKILL.md"

# description에서 검색
grep -rl "description:.*검색어" . --include="SKILL.md"

# 전체 내용에서 검색
grep -rl "검색어" notes/ --include="*.md"
```

---

## 빈 링크 전략

기존 노트가 없어도 **빈 링크 생성**:

```markdown
### 관련 개념
- [[아직 없는 개념]] - 관계 설명
```

**이유:**
- Obsidian 그래프 뷰에서 미작성 노트 시각화
- 클릭 시 노트 생성 유도
- 나중에 해당 노트 작성 시 자동 연결

---

## 양방향 링크 업데이트

새 노트 생성 시 **기존 노트에도 역링크 추가**:

### 절차

1. 새 노트의 related 개념 목록 확인
2. 각 관련 노트가 존재하는지 확인
3. 존재하면 해당 노트의 "관련 개념" 섹션에 새 노트 링크 추가

### 예시

**새 노트: useEffect**
```markdown
related:
  - useState
  - useCallback
```

**기존 노트 useState에 추가:**
```markdown
### 유사 개념
- [[useEffect]] - 같은 React Hooks, 부수효과 처리용
```

---

## 관련 개념 유형

| 유형 | 설명 | 예시 |
|------|------|------|
| 유사 | 공통점 있는 개념 | useState ↔ useReducer |
| 반대 | 대조되는 개념 | mutable ↔ immutable |
| 상위 | 속한 범주 | useState → React Hooks |
| 하위 | 세부 주제 | React Hooks → useState |
| 선행 | 먼저 알아야 할 것 | Promise → async/await |
| 후속 | 다음에 배울 것 | React → Next.js |
| 응용 | 실제 사용 사례 | useState → 폼 상태 관리 |
| 구성 | 이루는 요소 | HTTP = Request + Response |
| 발전 | 역사적 흐름 | Callback → Promise → async |
| 원인/결과 | 왜 필요한지 | Prop Drilling → Context |

---

## 링크 작성 규칙

### 관계 설명 필수

```markdown
# 좋은 예
- [[useState]] - 단순 상태에 적합, useReducer보다 간단

# 나쁜 예
- [[useState]]
```

### Obsidian 문법

```markdown
# 기본 링크
[[노트명]]

# 표시 텍스트 변경
[[노트명|표시할 텍스트]]

# 헤딩 링크
[[노트명#섹션]]

# 임베드
![[노트명]]
```

---

## 링크 체크리스트

노트 작성 완료 전 확인:

- [ ] frontmatter에 keywords 배열 포함
- [ ] frontmatter에 related 배열 포함
- [ ] 유사 개념 링크 1개 이상
- [ ] 상위 개념 링크 1개 이상
- [ ] 모든 링크에 관계 설명 포함
- [ ] 기존 관련 노트에 역링크 추가
- [ ] 기존 노트 없으면 빈 링크로 생성
