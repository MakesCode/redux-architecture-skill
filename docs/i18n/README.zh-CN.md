# Redux Architecture Skills — 简体中文

**让 AI 编程助手像经验丰富的前端架构师一样编写 Redux 代码。**

本开源项目提供 **8 个 [Agent Skills](https://agentskills.io/specification)**，涵盖 Redux Toolkit、TypeScript、整洁架构、领域事件、实体归一化、RTK Query、选择器、高级类型与行为驱动测试。

**适用助手：** Codex · Claude Code · Grok Build · Cursor · 其他兼容的编程助手。

**语言：** [English](../../README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · 简体中文 · [日本語](README.ja.md)

> Skill 是给 AI 编程助手使用的一组指令；它不会自动为项目安装 Redux，也不能保证生成代码完全正确。

## 安装

仓库发布到 GitHub 账号 [`MakesCode`](https://github.com/MakesCode) 后，可使用以下命令安装：

```bash
npx skills add MakesCode/redux-architecture-skill
npx skills add MakesCode/redux-architecture-skill --skill '*' -a codex -a claude-code -a grok -y
npx skills add MakesCode/redux-architecture-skill --skill redux-architecture-audit
```

发布前可在仓库根目录运行 `npx skills add .`。代理名称和路径取决于 [skills CLI](https://github.com/vercel-labs/skills) 的版本。常见项目路径：Codex `.agents/skills/`、Claude Code `.claude/skills/`、Grok Build `.grok/skills/`（需确认支持情况）。并非所有 Grok 聊天界面都支持本地技能。

## 八个技能

| Skill | 用途 |
| --- | --- |
| [`redux-clean-architecture`](../../skills/redux-clean-architecture/SKILL.md) | 依赖方向、端口与适配器、组合根与数据映射 |
| [`redux-event-driven`](../../skills/redux-event-driven/SKILL.md) | 事件化 action、reducer、thunk 与 listener middleware |
| [`redux-entity-modeling`](../../skills/redux-entity-modeling/SKILL.md) | `createEntityAdapter`、归一化集合、复合关系键 |
| [`redux-typescript-advanced`](../../skills/redux-typescript-advanced/SKILL.md) | `RootState`、`AppDispatch`、类型化 hook、thunk 和错误 |
| [`redux-rtk-query`](../../skills/redux-rtk-query/SKILL.md) | 服务端缓存、gateway、失效与错误处理 |
| [`redux-selectors`](../../skills/redux-selectors/SKILL.md) | 派生状态、读取模型与记忆化 |
| [`redux-tdd`](../../skills/redux-tdd/SKILL.md) | 用例、适配器和 React 组件的行为测试 |
| [`redux-architecture-audit`](../../skills/redux-architecture-audit/SKILL.md) | 代码审查、架构问题与渐进式重构 |

各技能可以独立使用，也能组合使用；核心指令位于 `SKILL.md`，详细材料位于 `references/`。

## 架构原则

- 纯领域层不依赖 React、HTTP 客户端或具体适配器；Redux 协调逻辑可以处于应用层。
- 只为真实的外部边界引入 gateway；在适配器中转换外部 DTO。
- 区分用户意图和已发生的事实；Redux 并不天然等同于 Event Sourcing。
- 需要通过 ID 查询和频繁更新集合时才使用 `createEntityAdapter`。
- 从 store 推导状态与 dispatch 类型；使用类型化 hook、thunk，并验证不可信的 JSON。
- RTK Query 用于缓存；仅在需要 gateway 抽象时使用 `fakeBaseQuery`。
- 使用真实 store 与测试替身验证行为，而不是只检查内部 dispatch 调用。

## 可运行示例

[订单确认示例](../../examples/order-flow/README.md)包含纯领域接口、类型化 thunk、失败处理、过期请求结果保护、selector、简洁的 React UI，以及 Vitest / Testing Library 测试。**示例刻意不使用 `createEntityAdapter`**：它只有一个当前订单。

```bash
cd examples/order-flow
npm install
npm test
npm run typecheck
```

示例提示词：

```text
使用 redux-typescript-advanced 和 redux-tdd 完成订单确认功能。
先写失败的行为测试，从 store 推导类型，并让 React 与 HTTP 实现解耦。
```

## 贡献与许可

GitHub Actions 会运行示例测试与 TypeScript 类型检查。内部验证脚本不会公开，用户无需安装 Python。贡献方式参见 [CONTRIBUTING.md](../../CONTRIBUTING.md)。

这八个技能提供独立、可操作的技术指令，供编程代理按需使用。

**MIT 许可证** — 详见 [LICENSE](../../LICENSE)。觉得有帮助的话，欢迎点个 ⭐。
