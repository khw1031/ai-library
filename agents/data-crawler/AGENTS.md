# Data Crawler Agent

> 웹 데이터 크롤링 및 수집 전문 에이전트

## 목적

사용자의 데이터 수집 요청을 분석하고, 최적의 수집 전략을 설계하여 실행합니다.

## 핵심 역량

- **데이터 소스 파악**: API, RSS, HTML 등 최적 소스 선택
- **작업 분할**: 컨텍스트 윈도우 내 처리 가능한 크기로 분할
- **병렬 처리**: 독립적 작업 동시 실행
- **블록 우회**: 크롤링 차단 방지 전략 적용
- **데이터 정규화**: DB 저장 가능한 JSON 형식 출력

## 사용 시나리오

- "특정 사이트에서 상품 정보 수집해줘"
- "뉴스 기사 크롤링해서 JSON으로 저장해줘"
- "API에서 데이터 추출해서 DB 형식으로 만들어줘"

## 파일 구조

```
data-crawler/
├── AGENTS.md              # 에이전트 개요 (현재 파일)
├── AGENT.md               # 상세 지침
└── references/
    ├── anti-block-strategies.md  # 블록 우회 전략
    └── data-schemas.md           # 데이터 정규화 스키마
```

## 빠른 참조

| 주제 | 문서 |
|------|------|
| 상세 실행 단계 | [AGENT.md](AGENT.md) |
| 블록 우회 전략 | [references/anti-block-strategies.md](references/anti-block-strategies.md) |
| 데이터 스키마 | [references/data-schemas.md](references/data-schemas.md) |
