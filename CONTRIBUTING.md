# Contributing

Thank you for improving practical, testable Redux guidance!

1. Open an issue describing a real use case and the failure mode you want to address.
2. Keep each skill focused; update its YAML `description` whenever the activation scope changes.
3. Put extended material in `references/` with relative links from `SKILL.md`.
4. Explain both when a recommendation is useful and **when it is not**. Prefer small independent examples and original code over copying a third-party repository.
5. When changing the example, run `cd examples/order-flow && npm install && npm test && npm run typecheck`.
6. For Markdown-only changes, check each frontmatter block and each relative link. Maintainers validate skills with private release tooling; no Python scripts are required by users.
7. Update the canonical English README when features or commands change. Localized READMEs are community-maintained translations; note clearly if not synchronized.
8. Do not copy third-party code or prose without a compatible license and proper attribution.

## Pull request checklist

- [ ] The skill is discoverable from a focused description.
- [ ] Instructions are actionable without reading every reference.
- [ ] The recommendation is conditional, not folder-structure dogma.
- [ ] All relative paths and links work.
- [ ] Source attribution and licensing are correct.
- [ ] Example behavior tests and typecheck pass, or missing verification is disclosed.
