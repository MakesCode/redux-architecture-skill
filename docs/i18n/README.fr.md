# Redux Architecture Skills — Français

**Des agents IA qui écrivent du Redux avec les exigences d'un architecte frontend expérimenté.**

Une collection open source de **8 [Agent Skills](https://agentskills.io/specification)** pour Redux Toolkit et TypeScript : architecture hexagonale, événements métier, normalisation des entités, RTK Query, selectors, typage avancé et tests guidés par le comportement.

**Agents concernés :** Codex · Claude Code · Grok Build · Cursor · autres agents compatibles.

**Langues :** [English](../../README.md) · Français · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

> Un skill est un ensemble d'instructions pour un agent IA. Il n'installe pas Redux dans votre application et ne garantit pas automatiquement la qualité du code.

## Installation

Une fois le dépôt publié sur le compte GitHub [`MakesCode`](https://github.com/MakesCode), installez les skills avec :

```bash
# Choisir les skills et les agents de manière interactive
npx skills add MakesCode/redux-architecture-skill

# Installer tous les skills pour Codex, Claude Code et Grok Build (selon la version du CLI)
npx skills add MakesCode/redux-architecture-skill --skill '*' -a codex -a claude-code -a grok -y

# Installer uniquement le skill d'audit
npx skills add MakesCode/redux-architecture-skill --skill redux-architecture-audit

# Afficher les skills disponibles sans les installer
npx skills add MakesCode/redux-architecture-skill --list
```

Avant publication, lancez `npx skills add .` depuis la racine du dépôt. Vérifiez les identifiants d'agents compatibles avec la version de l'[outil `skills`](https://github.com/vercel-labs/skills) utilisée.

| Agent | Dossier projet habituel |
| --- | --- |
| Codex | `.agents/skills/<skill-name>/` |
| Claude Code | `.claude/skills/<skill-name>/` |
| Grok Build | `.grok/skills/<skill-name>/` (sous réserve de compatibilité) |
| Cursor | Sélection via le CLI `skills` |

**Grok Build** désigne l'environnement de développement et non toutes les interfaces de discussion Grok.

## Les huit skills

| Skill | Utilité |
| --- | --- |
| [`redux-clean-architecture`](../../skills/redux-clean-architecture/SKILL.md) | Ports, adapters, règle de dépendance, composition root et ACL |
| [`redux-event-driven`](../../skills/redux-event-driven/SKILL.md) | Actions métier, reducers, thunks et listener middleware |
| [`redux-entity-modeling`](../../skills/redux-entity-modeling/SKILL.md) | Collections normalisées, `createEntityAdapter`, relations et identifiants composites |
| [`redux-typescript-advanced`](../../skills/redux-typescript-advanced/SKILL.md) | `RootState`, `AppDispatch`, hooks typés, erreurs et thunks TypeScript |
| [`redux-rtk-query`](../../skills/redux-rtk-query/SKILL.md) | Cache serveur, gateways, invalidation et gestion d'erreur |
| [`redux-selectors`](../../skills/redux-selectors/SKILL.md) | Données dérivées, view models et mémoïsation |
| [`redux-tdd`](../../skills/redux-tdd/SKILL.md) | Tests des cas d'utilisation, adapters, selectors et composants |
| [`redux-architecture-audit`](../../skills/redux-architecture-audit/SKILL.md) | Analyse et refactoring progressif d'une architecture existante |

Chaque skill est autonome et peut être combiné aux autres. Les fichiers `SKILL.md` contiennent les instructions principales ; les détails se trouvent dans `references/`.

## Principes architecturaux

- **Dépendances vers l'intérieur :** le domaine pur n'importe ni React ni transport HTTP ni adapters concrets. Le code Redux peut appartenir à la couche applicative.
- **Ports utiles :** créer une interface de gateway lorsqu'une vraie frontière externe ou un besoin de test le justifie.
- **Événements métier :** distinguer l'intention de l'utilisateur et le résultat observé. Redux n'est pas, à lui seul, un système d'Event Sourcing.
- **Entités normalisées uniquement si nécessaire :** `createEntityAdapter` convient aux collections, pas automatiquement à un objet unique.
- **TypeScript solide :** inférer les types du store, typer les hooks et les dépendances, valider les réponses JSON inconnues.
- **RTK Query :** réserver `fakeBaseQuery` aux besoins de séparation du transport ; `fetchBaseQuery` reste valable.
- **Selectors :** construire des read models, mémoïser les résultats dérivés quand c'est pertinent.
- **TDD :** utiliser un vrai store et des gateways simulées, vérifier les comportements visibles et les erreurs.

## Exemple exécutable

L'[exemple de confirmation de commande](../../examples/order-flow/README.md) utilise un modèle métier pur, `OrderGateway`, un thunk prétypé, un slice avec protection contre les réponses tardives, des selectors typés, des hooks React typés et des tests Vitest / Testing Library.

**Pas de `createEntityAdapter` dans cet exemple** : une commande courante n'a pas besoin d'être normalisée. Le skill `redux-entity-modeling` traite séparément les collections et les relations entre entités.

```bash
cd examples/order-flow
npm install
npm test
npm run typecheck
```

Le serveur réel n'est pas nécessaire pour les tests : les gateways et le transport sont simulés.

## Exemples de demandes à l'agent

```text
Utilise redux-clean-architecture et redux-tdd pour ajouter une confirmation de commande.
Commence par un test de comportement, injecte un gateway et garde React indépendant du HTTP.
```

```text
Utilise redux-entity-modeling pour normaliser les utilisateurs et leurs relations.
Explique les identifiants et vérifie si une collection Redux est vraiment nécessaire.
```

```text
Utilise redux-typescript-advanced pour typer le store, les hooks et les thunks.
Préserve l'inférence et traite correctement les erreurs attendues.
```

## Qualité, contributions et licence

GitHub Actions lance les tests et le typecheck de l'exemple. Les scripts de validation internes restent privés ; **aucune dépendance Python** n'est nécessaire. Contribuez via [CONTRIBUTING.md](../../CONTRIBUTING.md) et consultez les [principes de conception](../../docs/design-principles.md).

Les 8 skills fournissent des consignes techniques autonomes et directement applicables par les agents IA.

**Licence MIT** — voir [LICENSE](../../LICENSE).

Si le projet vous aide, laissez une ⭐ GitHub et partagez un exemple concret !

## Compatibilité agents et plugins

Une organisation avec manifestes Claude, Codex, Cursor, Grok, Gemini et Kimi est disponible. [Comprendre chaque fichier](agent-integrations.fr.md). Les véritables skills restent dans `skills/` et ne nécessitent aucun CLI spécifique au repository.
