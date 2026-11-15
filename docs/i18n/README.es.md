# Redux Architecture Skills — Español

**Ayuda a los agentes de IA a escribir Redux con criterios de arquitectura frontend profesional.**

Colección de **8 [Agent Skills](https://agentskills.io/specification)** de código abierto para Redux Toolkit y TypeScript: arquitectura limpia, eventos de negocio, entidades normalizadas, RTK Query, selectores, tipado avanzado y pruebas orientadas al comportamiento.

**Compatible con:** Codex · Claude Code · Grok Build · Cursor · otros agentes compatibles.

**Idiomas:** [English](../../README.md) · [Français](README.fr.md) · Español · [Português (Brasil)](README.pt-BR.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

> Un skill es un conjunto de instrucciones para un agente de IA; no instala Redux ni garantiza la corrección del código generado.

## Instalación

Cuando publiques el repositorio en la cuenta de GitHub [`MakesCode`](https://github.com/MakesCode), instala los skills con:

```bash
npx skills add MakesCode/redux-architecture-skill
npx skills add MakesCode/redux-architecture-skill --skill '*' -a codex -a claude-code -a grok -y
npx skills add MakesCode/redux-architecture-skill --skill redux-architecture-audit
```

Antes de publicarlo, prueba `npx skills add .` desde la raíz. Los nombres de agente y las rutas pueden cambiar según la versión del [CLI skills](https://github.com/vercel-labs/skills). Rutas habituales: Codex `.agents/skills/`, Claude Code `.claude/skills/`, Grok Build `.grok/skills/` si está soportado. Grok Build no equivale a cualquier chat de Grok.

## Los ocho skills

| Skill | Función |
| --- | --- |
| [`redux-clean-architecture`](../../skills/redux-clean-architecture/SKILL.md) | Reglas de dependencia, puertos, adaptadores, composición y ACL |
| [`redux-event-driven`](../../skills/redux-event-driven/SKILL.md) | Acciones, reducers, thunks y middleware de listeners |
| [`redux-entity-modeling`](../../skills/redux-entity-modeling/SKILL.md) | `createEntityAdapter`, normalización y relaciones con claves compuestas |
| [`redux-typescript-advanced`](../../skills/redux-typescript-advanced/SKILL.md) | `RootState`, `AppDispatch`, hooks y errores tipados |
| [`redux-rtk-query`](../../skills/redux-rtk-query/SKILL.md) | Caché del servidor, gateways, invalidación y errores |
| [`redux-selectors`](../../skills/redux-selectors/SKILL.md) | Modelos de lectura, selectores derivados y memoización |
| [`redux-tdd`](../../skills/redux-tdd/SKILL.md) | Pruebas de casos de uso, adaptadores y componentes |
| [`redux-architecture-audit`](../../skills/redux-architecture-audit/SKILL.md) | Auditoría del código y refactorización gradual |

Los skills pueden utilizarse por separado o en conjunto. Las instrucciones están en `SKILL.md`; el contexto ampliado se encuentra en `references/`.

## Principios

- El dominio puro no depende de React, clientes HTTP ni adaptadores concretos; Redux puede pertenecer a la capa de aplicación.
- Introducir puertos solo cuando hay una frontera real; mantener los DTO externos fuera del dominio.
- Diferenciar intención de usuario y evento observado; Redux no es automáticamente Event Sourcing.
- Normalizar colecciones cuando se necesitan búsquedas y actualizaciones por ID, no por costumbre.
- Inferir tipos desde el store, tipar hooks y thunks, y validar JSON desconocido.
- Utilizar RTK Query como caché; elegir `fakeBaseQuery` únicamente si la abstracción de gateway resulta útil.
- Escribir pruebas de comportamiento con el store real y un gateway de prueba.

## Ejemplo ejecutable

El [ejemplo de pedidos](../../examples/order-flow/README.md) incluye un puerto `OrderGateway`, thunk tipado, manejo de errores, protección contra respuestas antiguas, selectores, una interfaz React pequeña y pruebas de Vitest y Testing Library. **No utiliza `createEntityAdapter`**, porque representa un único pedido activo.

```bash
cd examples/order-flow
npm install
npm test
npm run typecheck
```

Ejemplo de petición:

```text
Usa redux-typescript-advanced y redux-tdd para implementar la confirmación de un pedido.
Infiere los tipos del store, escribe una prueba antes del código y mantén React fuera del transporte HTTP.
```

## Contribuir y licencia

GitHub Actions ejecuta las pruebas y la comprobación de tipos. Los scripts internos de validación no forman parte del repositorio público; no hace falta Python. Consulta [CONTRIBUTING.md](../../CONTRIBUTING.md).

Los ocho skills ofrecen instrucciones técnicas independientes y directamente aplicables por agentes de programación.

**Licencia MIT** — consulta [LICENSE](../../LICENSE). Si te resulta útil, deja una estrella ⭐.
