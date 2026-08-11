# Kernel

Le **Kernel** est l'orchestrateur du Core SYNERQO.

## Responsabilités

- Démarrer le Core
- Arrêter le Core
- Redémarrer le Core
- Orchestrer les composants fondamentaux

Le Kernel ne crée jamais les composants.
Ils lui sont fournis par injection de dépendances.