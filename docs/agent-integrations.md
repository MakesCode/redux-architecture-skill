# Agent integrations and repository layout

This repository distributes **eight standalone Redux skills** using portable Agent Skills plus optional metadata for compatible coding agents.

## Canonical content

`skills/<skill>/SKILL.md` is the entry point and `skills/<skill>/references/` holds task-specific details. Each skill can be installed or read on its own. No central skill duplicates all eight and no custom search/retrieve CLI is required.

Use this order to minimize unnecessary context:
1. Pick the skill matching the developer's request; do not activate all eight by default.
2. Read its `SKILL.md`.
3. Open a `references/` file **only when the immediate task requires its details**.
4. Inspect only relevant project files, make the smallest useful change and validate its behavior.
5. Do not fetch unrelated repos, install packages, run scans or invent tools unless the request justifies them.

## Distribution metadata (no duplicated instructions)

| Path | Purpose |
| --- | --- |
| `skills/` | Portable Agent Skills, one `SKILL.md` per skill |
| `.agents/plugins/marketplace.json` | Agent plugin marketplace metadata |
| `.claude-plugin/plugin.json` | Claude Code plugin metadata |
| `.claude-plugin/marketplace.json` | Claude Code marketplace entry |
| `.codex-plugin/plugin.json` | Codex plugin metadata and `skills/` entry |
| `.cursor-plugin/plugin.json` | Cursor plugin metadata |
| `.grok-plugin/marketplace.json` | Grok Build plugin marketplace metadata |
| `gemini-extension.json` | Gemini extension metadata |
| `kimi.plugin.json` | Kimi plugin metadata and skill directories |
| `plugin.json` | Generic agent-plugins metadata |

All manifests refer to local files. They contain **no extra agent prompts, no runtime scripts and no network requirement**. Manifest support and plugin installation interfaces vary between agent versions; the existence of a manifest is not proof of successful installation on a specific host.

## Install the skills (portable path)

After publishing the repository as `MakesCode/redux-architecture-skill` on GitHub, install it with:

```sh
npx skills add MakesCode/redux-architecture-skill
```

Select only the skills and agent(s) you need. For a local checkout, try `npx skills add .` at the repository root. The community [skills CLI](https://github.com/vercel-labs/skills) handles skill copies; it does not require the plugin manifests.

## Optional agent-specific plugins

The manifest files make the repository discoverable in agent plugin ecosystems with compatible versions. Compare the plugin installation commands with the agent's **current** documentation before publishing them as guaranteed workflows. In particular, do not imply that a Grok chat session can load a Grok Build plugin.

## Private translations

`notes-privees/` contains personal French translations of the eight skills and nine references. The whole directory is excluded by `.gitignore`. It must not appear in published repositories or installable skill folders. `docs/i18n/README.fr.md` is public user documentation.

