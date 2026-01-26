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

### Skills

Prompt-based tools that provide specialized capabilities:

| Skill | Description |
|-------|-------------|
| `create-ai-tool` | Generate Rules, Skills, and Agents using Progressive Disclosure |
| `workflow-framework` | Generic framework for creating custom workflow skills |
| `feature-workflow` | 5-step workflow for feature implementation |
| `qa-workflow` | Test case generation and E2E testing from specifications |
| `plan-workflow` | Specification analysis and PRD extraction |

### Agents

Subagents with isolated context for specific tasks:

| Agent | Description |
|-------|-------------|
| `task-master` | Orchestrator that coordinates parallel subtask execution |
| `task-executor` | Developer agent that executes individual tasks |
| `code-reviewer` | Senior code reviewer with CRITICAL issue detection |

### Rules

Guidelines that apply across the codebase:

| Rule | Description |
|------|-------------|
| `progressive-disclosure` | Core principle with detailed reference guides |

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
├── .claude/                    # Active Claude Code assets
│   ├── skills/                 # Active skills
│   ├── agents/                 # Active agents
│   └── rules/                  # Active rules
├── skills/                     # Deployment version skills
│   ├── create-ai-tool/
│   ├── feature-workflow/
│   ├── plan-workflow/
│   └── qa-workflow/
├── agents/                     # Deployment version agents
│   ├── code-reviewer/
│   ├── task-master/
│   └── task-executor/
├── rules/                      # Deployment version rules
│   └── progressive-disclosure/
└── docs/                       # Documentation
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
