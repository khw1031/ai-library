# Create AI Tool Skill

> Progressive Disclosure 원칙이 적용된 AI 도구(Rules, Skills, Agents)를 생성합니다.

## 목적

Claude Code에서 사용하는 Rules, Skills, Agents를 Progressive Disclosure 원칙에 맞게 구조화하여 생성합니다. 컨텍스트 효율성을 극대화하는 3단계 로드 모델을 자동으로 적용합니다.

## 사용 시나리오

- 새로운 규칙(Rule) 생성
- 새로운 스킬(Skill) 생성
- 새로운 에이전트(Agent) 생성
- 기존 단일 파일을 디렉토리 구조로 변환

## 생성되는 구조

```
tool-name/
├── CLAUDE.md      # 진입점 - 개요 (README 역할)
├── RULE.md        # 2단계 - 핵심 지침 (또는 SKILL.md, AGENT.md)
└── references/    # 3단계 - 상세 문서
    └── *.md
```

## 상세 가이드

- [SKILL.md](SKILL.md) - 스킬 실행 지침
- [references/templates.md](references/templates.md) - 각 도구별 템플릿
