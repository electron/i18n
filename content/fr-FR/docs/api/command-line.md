## Classe: CommandLine

> Manipulez les arguments de la ligne de commande pour votre application que Chromium lit

Processus : [Main](../glossary.md#main-process)

L’exemple suivant montre comment vérifier si le `--disable-gpu` est défini.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

Pour plus d’informations sur les types de drapeaux et d’interrupteurs que vous pouvez utiliser, vérifiez les commutateurs [de ligne de commande](./command-line-switches.md) document.

### Méthodes d’instance

#### `commandLine.appendSwitch(switch[, valeur])`

* `switch` String - Un commutateur de ligne de commande, sans le leader `--`
* `value` String (facultatif) - Une valeur pour le commutateur donné

Appendez un commutateur (avec `value`) à la ligne de commande de Chrome.

**Note:** Ceci n'affecte pas `process.argv`. L’utilisation prévue de cette fonction est contrôler le comportement du Chrome.

#### `commandLine.appendArgument (valeur)`

* `value` String - L'argument à ajouter à la ligne de commande

Annexez un argument à la ligne de commande de Chrome. L’argument sera correctement. Les commutateurs précédent les arguments indépendamment de l’ordre apprent.

Si vous êtes appending un argument comme `--switch=value`, envisager d’utiliser `appendSwitch('switch', 'value')` place.

**Note:** Ceci n'affecte pas `process.argv`. L’utilisation prévue de cette fonction est contrôler le comportement du Chrome.

#### `commandLine.hasSwitch (commutateur)`

* `switch` String - Un interrupteur de ligne de commande

Retours `Boolean` - Que l’interrupteur de la ligne de commande soit présent.

#### `commandLine.getSwitchValue (commutateur)`

* `switch` String - Un interrupteur de ligne de commande

Retourne `String` - La valeur de commutateur de ligne de commande.

**Remarque :** le commutateur n’est pas présent ou n’a aucune valeur, il renvoie la chaîne vide.
