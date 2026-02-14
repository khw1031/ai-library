# Agents

> Claude Code에서 Task 도구를 통해 위임되는 전문 에이전트 모음 (총 2개)

## 요약

| Agent | Description | Model |
|-------|-------------|-------|
| `data-crawler` | 웹 데이터 크롤링 및 수집 전문가. 병렬 처리와 블록 우회 전략 적용 | sonnet |
| `family-financial-advisor` | 가족 재무 상담 전문가. 소득/지출/자산 분석과 맞춤 재무 계획 수립 | inherit |

## 상세

### data-crawler

데이터 크롤링 및 수집 전문가. 웹 데이터 수집, 크롤링, 스크래핑, API 데이터 추출 요청 시 사용합니다.

- **모델**: sonnet
- **도구**: Read, Write, Bash, WebFetch, WebSearch, Grep, Glob
- **트리거**: 웹 데이터 수집, 크롤링, 스크래핑, API 데이터 추출

### family-financial-advisor

가족 재무 상담 전문가. 소득/지출/자산 분석과 맞춤 재무 계획을 수립합니다.

- **트리거**: 재무 상담, 가계부 분석, 절세, 투자 전략, 보험 리뷰
- **연동 스킬**: financial-budget-management, financial-debt-management, financial-insurance-guide, financial-investment-guide, financial-life-planning, financial-tax-guide
