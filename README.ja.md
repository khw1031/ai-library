# AI Library

> Claude CodeおよびLLMベースツール向けの再利用可能なプロンプトアセット（Skills、Rules、Agents）コレクション。Progressive Disclosure原則に基づいて設計されています。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | [한국어](README.ko.md) | [中文](README.zh.md)

## 概要

AI Libraryは、**コンテキスト効率性**を重視したAI/LLMワークフロー管理フレームワークです。プロンプトアセットを3段階ロードモデルで構成することで、限られたコンテキストウィンドウを最大限に活用しながら、完全な機能を維持します。

### 主な特徴

- **Progressive Disclosure**: 必要なときに必要な分だけ情報をロード
- **コンテキスト分離**: 各ワークフローステップが別々の会話コンテキストで実行
- **Human in the Loop**: 次のステップに進む前にユーザー確認
- **ドキュメントベースインターフェース**: マークダウンファイルによるステップ間通信
- **Gitベース履歴**: 各ステップ完了時にコミットチェックポイントを作成

## アーキテクチャ

### Progressive Disclosure（3段階ロードモデル）

LLMのコンテキストウィンドウは限られたリソースです。すべての情報を一度にロードすると、重要な内容が薄まり、パフォーマンスが低下します。このライブラリは3段階モデルを使用します：

| 段階 | ロードタイミング | トークン | 内容 |
|------|-----------------|----------|------|
| 第1段階 | 常時 | ~100 | 名前、説明、トリガーキーワード |
| 第2段階 | アクティベーション時 | <5000 | コアルール、必須指示 |
| 第3段階 | リクエスト時 | 無制限 | 例、詳細ドキュメント、スクリプト |

### 標準ディレクトリ構造

```
asset-name/
├── AGENTS.md          # エントリーポイント - 概要（Claude自動認識）
├── [TYPE].md          # 第2段階 - コア指示
└── references/        # 第3段階 - 詳細ドキュメント
    └── *.md
```

## コンポーネント

### Skills

専門的な機能を提供するプロンプトベースツール：

| スキル | 説明 |
|--------|------|
| `create-ai-tool` | Progressive Disclosureを使用してRules、Skills、Agentsを生成 |
| `workflow-framework` | カスタムワークフロースキル作成のための汎用フレームワーク |
| `feature-workflow` | 機能実装のための5ステップワークフロー |
| `qa-workflow` | 仕様ベースのテストケース生成とE2Eテスト |
| `plan-workflow` | 仕様分析とPRD抽出 |

### Agents

特定のタスク用に分離されたコンテキストを持つサブエージェント：

| エージェント | 説明 |
|-------------|------|
| `task-master` | 並列サブタスク実行を調整するオーケストレーター |
| `task-executor` | 個別タスクを実行する開発者エージェント |
| `code-reviewer` | CRITICAL問題検出機能を持つシニアコードレビュアー |

### Rules

コードベース全体に適用されるガイドライン：

| ルール | 説明 |
|--------|------|
| `progressive-disclosure` | 詳細リファレンスガイド付きのコア原則 |

## インストール

### Claude Codeプロジェクト用

必要なアセットをプロジェクトの`.claude/`ディレクトリにコピーします：

```bash
# スキルをコピー
cp -r skills/feature-workflow .claude/skills/

# エージェントをコピー
cp -r agents/code-reviewer .claude/agents/

# ルールをコピー
cp -r rules/progressive-disclosure .claude/rules/
```

### ディレクトリ構造

```
your-project/
├── .claude/
│   ├── skills/          # スキル
│   ├── agents/          # エージェント
│   └── rules/           # ルール
└── ...
```

## 使用方法

### スキルの使用

スキルはスラッシュコマンドで呼び出せます：

```
/create-ai-tool      # 新しいAIツールを作成
/feature-workflow    # 機能開発ワークフローを開始
```

### エージェントの使用

エージェントはタスクコンテキストに基づいてClaudeが自動的に委任します：

```
「コード変更をレビューして」→ code-reviewerエージェント
「これらのタスクを並列実行して」→ task-masterエージェント
```

### ルールの使用

ルールはファイルパターンまたは明示的なトリガーに基づいて自動的に適用されます：

```yaml
# 例：パスベースのアクティベーションルール
---
description: TypeScriptコーディング標準
paths:
  - "**/*.ts"
  - "**/*.tsx"
---
```

## プロジェクト構造

```
ai-library/
├── .claude/                    # アクティブなClaude Codeアセット
│   ├── skills/                 # アクティブスキル
│   ├── agents/                 # アクティブエージェント
│   └── rules/                  # アクティブルール
├── skills/                     # デプロイ版スキル
│   ├── create-ai-tool/
│   ├── feature-workflow/
│   ├── plan-workflow/
│   └── qa-workflow/
├── agents/                     # デプロイ版エージェント
│   ├── code-reviewer/
│   ├── task-master/
│   └── task-executor/
├── rules/                      # デプロイ版ルール
│   └── progressive-disclosure/
└── docs/                       # ドキュメント
```

## 独自アセットの作成

### スキルの作成

```yaml
---
name: my-skill
description: >
  このスキルが行うこと。
  このスキルを使用するタイミング（トリガーキーワード）。
---

# My Skill

コア指示（5000トークン未満を維持）。

## 参照

- [詳細ガイド](references/guide.md)
```

### エージェントの作成

```yaml
---
name: my-agent
description: >
  エージェントの役割説明。
  [トリガー条件]で事前に使用。
tools: Read, Grep, Glob, Bash
model: inherit
---

あなたは[役割説明]です。

呼び出し時：
1. 最初のステップ
2. 2番目のステップ
3. ...
```

### ルールの作成

```yaml
---
description: >
  このルールがカバーする内容。
  [トリガー条件]での作業時に適用。
paths:
  - "**/*.ts"
---

# ルールタイトル

ルールの内容。
```

## ベストプラクティス

1. **第2段階の内容は5000トークン未満に維持** - 詳細な例は`references/`に移動
2. **明確な説明を書く** - 適切なアクティベーションのために「何を」と「いつ」を含める
3. **ドキュメントベースの通信を使用** - ワークフローがマークダウンファイルを通じて通信するように
4. **チェックポイントでコミット** - ワークフローの進捗追跡にgitコミットを使用
5. **コンテキストを分離** - 複雑なステップは別々のエージェントコンテキストで実行

## コントリビューション

コントリビューションを歓迎します！以下のガイドラインに従ってください：

1. Progressive Disclosure原則に従う
2. コア指示は簡潔に
3. 複雑なトピックには包括的なリファレンスを含める
4. 提出前にClaude Codeでテスト

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 謝辞

- [Claude Code](https://claude.ai/claude-code)用に構築
- [agentskills.io](https://agentskills.io/specification)仕様に準拠
