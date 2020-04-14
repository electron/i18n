# Barre de progression dans la barre des tâches (Windows, macOS, Unity)

Sous Windows, un bouton de la barre des tâches peut être utilisé pour afficher une barre de progression. Cela permet à une fenêtre de fournir des informations de progression à l'utilisateur sans qu'il soit nécessaire de passer à la fenêtre elle-même.

Sous macOS, la barre de progression s'affichera dans le cadre de l'icône du dock.

Le Unity DE possède également une fonctionnalité similaire qui vous permet de spécifier la barre de progression dans le lanceur.

**Barre de progression dans le bouton de la barre des tâches :**

![Barre de progression personnalisée](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Les trois cas sont couverts par la même API - la méthode `setProgressBar()` disponible sur les instances de `BrowserWindows`. Appelez-la avec un numéro entre `0` et `1` pour indiquer votre progression. Si vous avez une longue tâche qui est actuellement à 63% en finalisation, vous l'appelleriez avec `setProgressBar(0.63)`.

D'une manière générale, régler le paramètre sur une valeur inférieure à zéro (comme `-1`) supprimera la barre de progression, alors qu'en réglant sur une valeur supérieure à un (comme `2`) cela basculera la barre de progression dans un mode intermédiaire.

Voir la [documentation API pour plus d'options et de modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```