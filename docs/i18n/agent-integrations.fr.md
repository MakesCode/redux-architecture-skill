# Intégrations des agents IA — explication en français

Ce repository distribue **8 skills Redux autonomes**, avec des métadonnées d’intégration pour plusieurs agents de développement compatibles.

## Où sont les vrais skills ?

- `skills/<nom>/SKILL.md` : instructions courtes destinées à l'agent.
- `skills/<nom>/references/` : informations détaillées à lire **uniquement quand la tâche le nécessite**.
- Les 8 skills restent distincts. L'agent n'a pas à tous les lire pour une simple modification Redux.

## À quoi servent les fichiers « agent » ?

| Fichier ou dossier | Rôle |
| --- | --- |
| `.agents/plugins/marketplace.json` | Manifeste de catalogue d'extensions pour agents compatibles |
| `.claude-plugin/` | Informations d'extension pour Claude Code |
| `.codex-plugin/plugin.json` | Informations d'extension pour Codex, et lien vers `skills/` |
| `.cursor-plugin/plugin.json` | Informations d'extension pour Cursor |
| `.grok-plugin/marketplace.json` | Informations de catalogue pour Grok Build |
| `gemini-extension.json` | Déclaration pour Gemini |
| `kimi.plugin.json` | Déclaration pour Kimi et chemins des 8 skills |
| `plugin.json` | Métadonnées communes d'extension |
| `skills/` | Les **seules instructions** de travail Redux pour les agents |

Il s'agit de fichiers JSON de configuration, **pas de scripts à exécuter**. Leur présence n'assure pas la compatibilité avec toutes les versions des logiciels : il faut tester l'installation dans chaque agent.

## Installation simple

Une fois le dépôt `MakesCode/redux-architecture-skill` publié sur GitHub :

```bash
npx skills add MakesCode/redux-architecture-skill
```

Le CLI propose de choisir des skills et des agents. On peut aussi tester l'installation locale depuis la racine avec `npx skills add .`.

## Ne pas gaspiller de tokens

Pour une demande, sélectionner le skill pertinent, lire son `SKILL.md`, puis consulter **seulement les références utiles**. Ne pas lancer de recherche Web, de scan du repository entier ou de nouveau CLI si ce n'est pas nécessaire.

## Traductions privées

`notes-privees/` est un dossier local contenant tes **8 traductions françaises des skills** et **9 traductions des références** ; `.gitignore` exclut intégralement ce dossier. Les fichiers publics dans `docs/i18n/` peuvent être publiés.

**À noter :** aucun CLI spécifique au repository n’est nécessaire pour utiliser les skills.
