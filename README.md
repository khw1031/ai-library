# AI Library

> A collection of reusable prompt assets (Skills, Rules, Agents) for Claude Code and LLM-based tools, built on the Progressive Disclosure principle.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

## Overview

AI Library is a framework for managing AI/LLM workflows with a strong emphasis on **context efficiency**. By organizing prompt assets into a 3-stage loading model, it maximizes the use of limited context windows while maintaining full functionality.

### Key Features

- **Progressive Disclosure**: Load information only when needed, in stages
- **Context Isolation**: Each workflow step runs in a separate conversation context
- **Human in the Loop**: User confirmation before proceeding to next steps
- **Document as Interface**: Step-to-step communication via markdown files
- **Git as History**: Each step completion creates a commit checkpoint

## Architecture

### Progressive Disclosure (3-Stage Loading)

LLM context windows are limited resources. Loading all information at once dilutes focus and degrades performance. This library uses a 3-stage model:

| Stage | Load Time | Tokens | Content |
|-------|-----------|--------|---------|
| Stage 1 | Always | ~100 | name, description, trigger keywords |
| Stage 2 | On Activation | <5000 | Core rules, essential instructions |
| Stage 3 | On Demand | Unlimited | Examples, detailed docs, scripts |

### Standard Directory Structure

```
asset-name/
├── AGENTS.md          # Entry point - overview (auto-recognized by Claude)
├── [TYPE].md          # Stage 2 - core instructions
└── references/        # Stage 3 - detailed documentation
    └── *.md
```

## Components

### Skills (26)

Prompt-based tools that provide specialized capabilities:

| Skill | Description |
|-------|-------------|
| `add-rules` | 프로젝트에 규칙을 Skill 기반으로 추가하고 기존 규칙을 Skill로 변환 |
| `changelog` | CHANGELOG.md에 변경 사항과 담당자를 정리하고 package.json 버전 업데이트 |
| `code-review-team` | 전문가 관점 코드 리뷰 + Agent Team 병렬 개선 작업 |
| `create-agent` | Claude Code Agent 생성 |
| `create-ai-tool` | Skill vs Agent 유형 결정 및 생성 위임 |
| `create-skill` | Claude Code Skill 생성 |
| `document-consolidator` | 여러 문서를 구조화된 단일 문서로 통합 |
| `feature-workflow` | 5단계 기능 구현 워크플로우 (Agent Team 병렬 지원) |
| `financial-*` | 재무 관련 스킬 7종 (예산, 부채, 보험, 투자, 지식관리, 생애설계, 세금) |
| `first-principles` | 1원칙(First Principles Thinking) 기반 문제 분석 |
| `git-commit` | Git 변경 사항 분석 및 커밋 메시지 자동 생성 |
| `kind-senior-developer` | 친절한 시니어 개발자처럼 변경 사항 분석/설명 |
| `learning-log-generator` | Git 커밋 히스토리 기반 일자별 학습 로그 생성 |
| `musk-algorithm` | Elon Musk 5단계 문제 해결 알고리즘 적용 |
| `note-search` | notes/ 디렉토리 학습 노트 검색 |
| `note-writer` | Obsidian 호환 학습 노트 작성 |
| `progressive-disclosure` | LLM 컨텍스트 윈도우 3단계 정보 로드 원칙 |
| `prompt-improver` | 실증 기반 기법으로 프롬프트 분석/개선 |
| `skills-ref` | CLAUDE.md에 Available Skills 섹션 XML 생성 |
| `vibe-mvp-advisor` | AI 아이디어 구현 가능성 및 수익화 MVP 제안 |

> Full list: [skills/README.md](skills/README.md)

### Agents (2)

Subagents with isolated context for specific tasks:

| Agent | Description |
|-------|-------------|
| `data-crawler` | 웹 데이터 크롤링 및 수집 전문가 (sonnet) |
| `family-financial-advisor` | 가족 재무 상담 전문가 |

> Full list: [agents/README.md](agents/README.md)

### Rules (2)

Guidelines that apply across conversations:

| Rule | Description |
|------|-------------|
| `CLAUDE.md` | 도메인 중립 Global Rule (Think Before Acting, Simplicity First, Scoped Response, Goal-Driven Execution) |
| `CODING.md` | 코딩 전용 Rule (Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution) |

## Installation

### For Claude Code Projects

Copy the desired assets to your project's `.claude/` directory:

```bash
# Copy a skill
cp -r skills/feature-workflow .claude/skills/

# Copy an agent
cp -r agents/code-reviewer .claude/agents/

# Copy a rule
cp -r rules/progressive-disclosure .claude/rules/
```

### Directory Structure

```
your-project/
├── .claude/
│   ├── skills/          # Your skills
│   ├── agents/          # Your agents
│   └── rules/           # Your rules
└── ...
```

## Usage

### Using Skills

Skills can be invoked via slash commands:

```
/create-ai-tool      # Create new AI tools
/feature-workflow    # Start feature development workflow
```

### Using Agents

Agents are automatically delegated by Claude based on task context:

```
"Review the code changes" → code-reviewer agent
"Execute these tasks in parallel" → task-master agent
```

### Using Rules

Rules are automatically applied based on file patterns or explicit triggers:

```yaml
# Example: Rule with path-based activation
---
description: TypeScript coding standards
paths:
  - "**/*.ts"
  - "**/*.tsx"
---
```

## Project Structure

```
ai-library/
├── .claude/                    # This project's Claude Code workflow
│   ├── skills/                 # Internal skills
│   └── agents/                 # Internal agents
├── skills/                     # Shared skills (26)
│   ├── add-rules/
│   ├── changelog/
│   ├── code-review-team/
│   ├── create-agent/
│   ├── create-ai-tool/
│   ├── create-skill/
│   ├── document-consolidator/
│   ├── feature-workflow/
│   ├── financial-*/            # Financial skills (7)
│   ├── first-principles/
│   ├── git-commit/
│   ├── kind-senior-developer/
│   ├── learning-log-generator/
│   ├── musk-algorithm/
│   ├── note-search/
│   ├── note-writer/
│   ├── progressive-disclosure/
│   ├── prompt-improver/
│   ├── skills-ref/
│   └── vibe-mvp-advisor/
├── agents/                     # Shared agents (2)
│   ├── data-crawler/
│   └── family-financial-advisor/
└── rules/                      # Shared rules (2)
    ├── CLAUDE.md
    └── CODING.md
```

## Writing Your Own Assets

### Creating a Skill

```yaml
---
name: my-skill
description: >
  What this skill does.
  When to use this skill (trigger keywords).
---

# My Skill

Core instructions here (keep under 5000 tokens).

## References

- [Detailed Guide](references/guide.md)
```

### Creating an Agent

```yaml
---
name: my-agent
description: >
  Agent role description.
  Proactively used when [trigger conditions].
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a [role description].

When invoked:
1. First step
2. Second step
3. ...
```

### Creating a Rule

```yaml
---
description: >
  What this rule covers.
  Applied when working with [trigger conditions].
paths:
  - "**/*.ts"
---

# Rule Title

Rule content here.
```

## Best Practices

1. **Keep Stage 2 content under 5000 tokens** - Move detailed examples to `references/`
2. **Write clear descriptions** - Include "what" and "when" for proper activation
3. **Use document-based communication** - Let workflows communicate via markdown files
4. **Commit at checkpoints** - Use git commits to track workflow progress
5. **Isolate contexts** - Run complex steps in separate agent contexts

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Follow the Progressive Disclosure principle
2. Keep core instructions concise
3. Include comprehensive references for complex topics
4. Test assets with Claude Code before submitting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for [Claude Code](https://claude.ai/claude-code)
- Follows [agentskills.io](https://agentskills.io/specification) specification
