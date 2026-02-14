# update-ai-tools

AI 도구(Skill, Agent) 추가/변경 후 모든 README.md를 재귀적으로 업데이트하고 CHANGELOG에 반영합니다.

## 주요 기능

- **변경 감지**: git diff 기반으로 skills/, agents/ 하위 변경 파일 자동 감지
- **재귀적 README 업데이트**: 개별 도구 → 디렉토리 → 루트 README 순서로 갱신
- **CHANGELOG 연동**: `/changelog` 스킬을 호출하여 변경 내용을 자동 기록
- **병렬 처리**: 변경 도구 3개 이상 시 에이전트 팀으로 병렬 업데이트

## 사용 방법

```
/update-ai-tools
```

> `disable-model-invocation: true` — 사용자가 직접 호출할 때만 실행됩니다.

## 실행 흐름

```
1. 변경 감지 (git diff)
       ↓
2. 개별 도구 README.md 업데이트 (skills/{name}/, agents/{name}/)
       ↓
3. 디렉토리 README.md 업데이트 (skills/README.md, agents/README.md)
       ↓
4. 루트 README.md 업데이트 (리소스 목록, 디렉토리 구조)
       ↓
5. /changelog 호출 → CHANGELOG.md + package.json 버전 업데이트
```

## 디렉토리 구조

```
update-ai-tools/
├── SKILL.md                  # 핵심 지침
├── README.md                 # 이 문서
└── references/
    └── categories.md         # 스킬 카테고리 분류 가이드
```

## 트리거 키워드

`update-ai-tools`, `README 업데이트`, `도구 문서 갱신`, `문서 동기화`
