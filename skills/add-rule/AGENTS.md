# Add Rule Skill

> 프로젝트 rules 구조에 Progressive Disclosure 원칙에 맞는 규칙을 추가합니다.

## 사용 시점

- 새로운 규칙을 프로젝트에 추가할 때
- "규칙 추가", "rule 추가", "새 규칙 만들기" 요청 시

## 핵심 동작

1. Progressive Disclosure 규칙 설치 여부 확인 (없으면 설치 요청)
2. 필수 정보 수집 (부족하면 사용자에게 질문)
3. 규칙 복잡도에 따라 단일 파일/디렉토리 결정
4. Progressive Disclosure 원칙에 맞게 규칙 파일 생성
5. `.claude/rules/AGENTS.md` 인덱스 업데이트

## 파일 구조

```
add-rule/
├── AGENTS.md     # 개요 (현재 파일)
├── SKILL.md      # 핵심 지침
└── CLAUDE.md     # AGENTS.md 참조
```
