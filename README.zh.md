# AI Library

> 为 Claude Code 和基于 LLM 的工具设计的可重用提示资产（Skills、Rules、Agents）集合，基于渐进式披露原则构建。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md)

## 概述

AI Library 是一个注重**上下文效率**的 AI/LLM 工作流管理框架。通过将提示资产组织成3阶段加载模型，在保持完整功能的同时最大化利用有限的上下文窗口。

### 主要特性

- **渐进式披露**: 仅在需要时按需加载信息
- **上下文隔离**: 每个工作流步骤在独立的对话上下文中运行
- **人在环中**: 进入下一步骤前需要用户确认
- **文档即接口**: 通过 Markdown 文件进行步骤间通信
- **Git 即历史**: 每个步骤完成时创建提交检查点

## 架构

### 渐进式披露（3阶段加载模型）

LLM 的上下文窗口是有限的资源。一次性加载所有信息会稀释焦点并降低性能。本库使用3阶段模型：

| 阶段 | 加载时机 | Token 数 | 内容 |
|------|----------|----------|------|
| 第1阶段 | 始终 | ~100 | 名称、描述、触发关键词 |
| 第2阶段 | 激活时 | <5000 | 核心规则、必要指令 |
| 第3阶段 | 按需 | 无限制 | 示例、详细文档、脚本 |

### 标准目录结构

```
asset-name/
├── AGENTS.md          # 入口点 - 概述（Claude 自动识别）
├── [TYPE].md          # 第2阶段 - 核心指令
└── references/        # 第3阶段 - 详细文档
    └── *.md
```

## 组件

### Skills

提供专业能力的基于提示的工具：

| 技能 | 描述 |
|------|------|
| `create-ai-tool` | 使用渐进式披露生成 Rules、Skills、Agents |
| `workflow-framework` | 创建自定义工作流技能的通用框架 |
| `feature-workflow` | 功能实现的5步工作流 |
| `qa-workflow` | 基于规范的测试用例生成和 E2E 测试 |
| `plan-workflow` | 规范分析和 PRD 提取 |

### Agents

具有隔离上下文的特定任务子代理：

| 代理 | 描述 |
|------|------|
| `task-master` | 协调并行子任务执行的编排器 |
| `task-executor` | 执行单个任务的开发者代理 |
| `code-reviewer` | 具有关键问题检测功能的高级代码审查员 |

### Rules

适用于整个代码库的指南：

| 规则 | 描述 |
|------|------|
| `progressive-disclosure` | 包含详细参考指南的核心原则 |

## 安装

### 用于 Claude Code 项目

将所需资产复制到项目的 `.claude/` 目录：

```bash
# 复制技能
cp -r skills/feature-workflow .claude/skills/

# 复制代理
cp -r agents/code-reviewer .claude/agents/

# 复制规则
cp -r rules/progressive-disclosure .claude/rules/
```

### 目录结构

```
your-project/
├── .claude/
│   ├── skills/          # 技能
│   ├── agents/          # 代理
│   └── rules/           # 规则
└── ...
```

## 使用方法

### 使用技能

技能可以通过斜杠命令调用：

```
/create-ai-tool      # 创建新的 AI 工具
/feature-workflow    # 开始功能开发工作流
```

### 使用代理

代理根据任务上下文由 Claude 自动委派：

```
"审查代码更改" → code-reviewer 代理
"并行执行这些任务" → task-master 代理
```

### 使用规则

规则根据文件模式或显式触发器自动应用：

```yaml
# 示例：基于路径激活的规则
---
description: TypeScript 编码标准
paths:
  - "**/*.ts"
  - "**/*.tsx"
---
```

## 项目结构

```
ai-library/
├── .claude/                    # 活跃的 Claude Code 资产
│   ├── skills/                 # 活跃技能
│   ├── agents/                 # 活跃代理
│   └── rules/                  # 活跃规则
├── skills/                     # 部署版本技能
│   ├── create-ai-tool/
│   ├── feature-workflow/
│   ├── plan-workflow/
│   └── qa-workflow/
├── agents/                     # 部署版本代理
│   ├── code-reviewer/
│   ├── task-master/
│   └── task-executor/
├── rules/                      # 部署版本规则
│   └── progressive-disclosure/
└── docs/                       # 文档
```

## 编写自己的资产

### 创建技能

```yaml
---
name: my-skill
description: >
  这个技能做什么。
  何时使用这个技能（触发关键词）。
---

# My Skill

核心指令（保持在 5000 token 以下）。

## 参考

- [详细指南](references/guide.md)
```

### 创建代理

```yaml
---
name: my-agent
description: >
  代理角色描述。
  在[触发条件]时主动使用。
tools: Read, Grep, Glob, Bash
model: inherit
---

你是[角色描述]。

调用时：
1. 第一步
2. 第二步
3. ...
```

### 创建规则

```yaml
---
description: >
  这条规则涵盖的内容。
  在处理[触发条件]时应用。
paths:
  - "**/*.ts"
---

# 规则标题

规则内容。
```

## 最佳实践

1. **保持第2阶段内容在 5000 token 以下** - 将详细示例移至 `references/`
2. **编写清晰的描述** - 包含"是什么"和"何时"以便正确激活
3. **使用基于文档的通信** - 让工作流通过 Markdown 文件进行通信
4. **在检查点提交** - 使用 git 提交跟踪工作流进度
5. **隔离上下文** - 在单独的代理上下文中运行复杂步骤

## 贡献

欢迎贡献！请遵循以下指南：

1. 遵循渐进式披露原则
2. 保持核心指令简洁
3. 为复杂主题包含全面的参考
4. 提交前使用 Claude Code 测试

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 致谢

- 为 [Claude Code](https://claude.ai/claude-code) 构建
- 遵循 [agentskills.io](https://agentskills.io/specification) 规范
