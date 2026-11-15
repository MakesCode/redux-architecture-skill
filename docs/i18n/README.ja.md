# Redux Architecture Skills — 日本語

**AI コーディングエージェントに、熟練したフロントエンドアーキテクトの考え方で Redux を書かせるためのスキル集。**

Redux Toolkit と TypeScript 向けのオープンソース **8 個の [Agent Skills](https://agentskills.io/specification)** です。クリーンアーキテクチャ、業務イベント、エンティティの正規化、RTK Query、セレクター、高度な型付け、振る舞いに基づくテストを扱います。

**対象：** Codex · Claude Code · Grok Build · Cursor · その他の対応エージェント。

**言語：** [English](../../README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [简体中文](README.zh-CN.md) · 日本語

> Skill は AI エージェントへの指示パッケージです。Redux を自動インストールしたり、生成コードの正確性を保証したりするものではありません。

## インストール

GitHub アカウント [`MakesCode`](https://github.com/MakesCode) でリポジトリを公開した後、次のコマンドでインストールできます。

```bash
npx skills add MakesCode/redux-architecture-skill
npx skills add MakesCode/redux-architecture-skill --skill '*' -a codex -a claude-code -a grok -y
npx skills add MakesCode/redux-architecture-skill --skill redux-architecture-audit
```

公開前はリポジトリのルートで `npx skills add .` を試せます。対応するエージェント名やパスは [skills CLI](https://github.com/vercel-labs/skills) のバージョンに依存します。一般的なパス：Codex `.agents/skills/`、Claude Code `.claude/skills/`、Grok Build `.grok/skills/`（対応状況を確認してください）。すべての Grok チャット画面がローカル Skill に対応するわけではありません。

## 8 つのスキル

| Skill | 用途 |
| --- | --- |
| [`redux-clean-architecture`](../../skills/redux-clean-architecture/SKILL.md) | 依存関係の方向、ポートとアダプター、構成ルート、変換層 |
| [`redux-event-driven`](../../skills/redux-event-driven/SKILL.md) | アクション、reducer、thunk、listener middleware |
| [`redux-entity-modeling`](../../skills/redux-entity-modeling/SKILL.md) | `createEntityAdapter`、正規化コレクション、複合キーによる関係 |
| [`redux-typescript-advanced`](../../skills/redux-typescript-advanced/SKILL.md) | `RootState`、`AppDispatch`、型付き hooks・thunks・エラー |
| [`redux-rtk-query`](../../skills/redux-rtk-query/SKILL.md) | サーバーキャッシュ、gateway、無効化、エラー処理 |
| [`redux-selectors`](../../skills/redux-selectors/SKILL.md) | 派生状態、表示用モデル、メモ化 |
| [`redux-tdd`](../../skills/redux-tdd/SKILL.md) | ユースケース、アダプター、コンポーネントのテスト |
| [`redux-architecture-audit`](../../skills/redux-architecture-audit/SKILL.md) | アーキテクチャ監査と段階的なリファクタリング |

各スキルは単独でも組み合わせても使用できます。要点は `SKILL.md` に、詳しい例は `references/` にあります。

## 設計原則

- 純粋なドメイン層は React・HTTP・具体的アダプターに依存しません。Redux の処理はアプリケーション層に配置できます。
- 実際に置き換え可能な外部境界がある場合にのみ port を導入し、外部 DTO はアダプターで変換します。
- ユーザーの意図と、実際に起きたイベントを区別します。Redux はそのまま Event Sourcing ではありません。
- ID による検索・更新が必要なコレクションには `createEntityAdapter` を活用しますが、単一のオブジェクトには不要です。
- store から型を推論し、型付き hooks・thunks を使い、外部 JSON を検証します。
- RTK Query はキャッシュとして活用し、gateway が必要な場合に `fakeBaseQuery` を検討します。
- 実際の store とテスト用 gateway を使い、実装内部よりユーザーが観測できる振る舞いをテストします。

## 実行できるサンプル

[注文確認のサンプル](../../examples/order-flow/README.md)には、ドメインの `OrderGateway`、型付き thunk、エラー処理、古いリクエスト結果の無視、セレクター、シンプルな React UI、Vitest / Testing Library のテストが含まれます。**単一注文を扱うため `createEntityAdapter` は使用していません。**

```bash
cd examples/order-flow
npm install
npm test
npm run typecheck
```

プロンプト例：

```text
redux-clean-architecture と redux-typescript-advanced を使って注文確認機能を作成してください。
失敗するテストから始め、store から型を推論し、React と HTTP 通信を分離してください。
```

## 貢献とライセンス

GitHub Actions でテストと型チェックを実行します。内部検証スクリプトは公開せず、利用者に Python は不要です。[CONTRIBUTING.md](../../CONTRIBUTING.md) を参照してください。

8つのスキルは、コーディングエージェントが必要に応じて利用できる独立した実践的な技術指示を提供します。

**MIT ライセンス** — [LICENSE](../../LICENSE) を参照。役立った場合は ⭐ をお願いします。
