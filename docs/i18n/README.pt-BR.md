# Redux Architecture Skills — Português (Brasil)

**Ajude agentes de IA a escrever Redux com boas decisões de arquitetura frontend.**

Coleção open source com **8 [Agent Skills](https://agentskills.io/specification)** para Redux Toolkit e TypeScript: arquitetura limpa, eventos de domínio, entidades normalizadas, RTK Query, seletores, tipagem avançada e testes orientados a comportamento.

**Agentes:** Codex · Claude Code · Grok Build · Cursor · outros agentes compatíveis.

**Idiomas:** [English](../../README.md) · [Français](README.fr.md) · [Español](README.es.md) · Português (Brasil) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

> Um skill é um pacote de instruções para um agente de IA. Ele não instala Redux no projeto nem garante que o código gerado esteja correto.

## Instalação

Após publicar o repositório na conta GitHub [`MakesCode`](https://github.com/MakesCode), instale as skills com:

```bash
npx skills add MakesCode/redux-architecture-skill
npx skills add MakesCode/redux-architecture-skill --skill '*' -a codex -a claude-code -a grok -y
npx skills add MakesCode/redux-architecture-skill --skill redux-architecture-audit
```

Antes de publicar, teste `npx skills add .` na raiz. Confira os nomes de agentes aceitos pela versão do [CLI skills](https://github.com/vercel-labs/skills). Diretórios comuns: Codex `.agents/skills/`, Claude Code `.claude/skills/`, Grok Build `.grok/skills/` quando suportado. Nem toda interface de chat Grok instala skills locais.

## Os oito skills

| Skill | Finalidade |
| --- | --- |
| [`redux-clean-architecture`](../../skills/redux-clean-architecture/SKILL.md) | Dependências, portas, adaptadores, composição e ACL |
| [`redux-event-driven`](../../skills/redux-event-driven/SKILL.md) | Ações, reducers, thunks e listener middleware |
| [`redux-entity-modeling`](../../skills/redux-entity-modeling/SKILL.md) | `createEntityAdapter`, coleções e relacionamentos com IDs compostos |
| [`redux-typescript-advanced`](../../skills/redux-typescript-advanced/SKILL.md) | `RootState`, `AppDispatch`, hooks, thunks e erros tipados |
| [`redux-rtk-query`](../../skills/redux-rtk-query/SKILL.md) | Cache do servidor, gateways, invalidação e erros |
| [`redux-selectors`](../../skills/redux-selectors/SKILL.md) | Dados derivados, modelos de leitura e memoização |
| [`redux-tdd`](../../skills/redux-tdd/SKILL.md) | Testes de casos de uso, adaptadores e componentes |
| [`redux-architecture-audit`](../../skills/redux-architecture-audit/SKILL.md) | Auditoria e refatoração incremental de arquitetura |

Os skills são independentes, mas podem trabalhar em conjunto. As regras principais ficam em `SKILL.md`; exemplos mais longos estão em `references/`.

## Princípios

- O domínio puro não importa React, HTTP nem adaptadores concretos; Redux pode ficar na camada de aplicação.
- Crie portas para limites reais, sem abstrações especulativas; converta DTOs externos nos adaptadores.
- Diferencie intenção e fato ocorrido; Redux não é, por si só, Event Sourcing.
- Use `createEntityAdapter` para coleções que precisam de identidade e atualização por ID, não para qualquer objeto.
- Infira os tipos do store e use hooks e thunks tipados; valide JSON externo.
- Use RTK Query para cache; `fakeBaseQuery` é útil quando existe uma necessidade clara de gateway.
- Teste comportamentos com store real e gateways simulados.

## Exemplo executável

O [exemplo de confirmação de pedido](../../examples/order-flow/README.md) demonstra porta de domínio, thunk tipado, erros, proteção contra respostas atrasadas, seletores, uma UI React simples e testes com Vitest e Testing Library. **Sem `createEntityAdapter`**: há apenas um pedido ativo.

```bash
cd examples/order-flow
npm install
npm test
npm run typecheck
```

Exemplo de prompt:

```text
Use redux-clean-architecture e redux-typescript-advanced para criar uma confirmação de pedido.
Mantenha a UI livre de chamadas HTTP e infira RootState e AppDispatch a partir do store.
```

## Contribuições e licença

O GitHub Actions executa testes e typecheck. Scripts privados de validação não são publicados; Python não é necessário. Consulte [CONTRIBUTING.md](../../CONTRIBUTING.md).

Os oito skills oferecem instruções técnicas independentes e aplicáveis diretamente por agentes de programação.

**Licença MIT** — veja [LICENSE](../../LICENSE). Se for útil, deixe uma ⭐.
