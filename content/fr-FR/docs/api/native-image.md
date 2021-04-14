# nativeImage

> Créez des icônes de bac, d'ancrage et d'application à l'aide de fichiers PNG ou JPG.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Dans Electron, pour les API d'acquisition d'images, vous pouvez passer des chemins de fichiers ou des instances de tyipe `NativeImage`. Une image vide sera utilisée lorsque `null` sera transmise.

Par exemple, lors de la création d’un plateau ou de la configuration de l’icône d’une fenêtre, vous pouvez passer un de fichier d’image en tant qu' `String`:

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

Ou lisez l’image du presse-papiers, qui renvoie un `NativeImage`:

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Formats supportés

Actuellement, les formats d'image `PNG` et `JPEG` sont pris en charge. `PNG` est recommandé en raison de son support de la transparence et de la compression sans perte.

Sous Windows, vous pouvez également charger les icônes `ICO` à partir de chemins de fichier. Pour une meilleure qualité visuelle , il est recommandé d'inclure au moins les tailles suivantes dans les :

* Petite icône
  * 16x16 (100% DPI scale)
  * 20x20 (125% DPI scale)
  * 24x24 (150% DPI scale)
  * 32x32 (200% DPI scale)
* Grande icône
  * 32x32 (100% DPI scale)
  * 40x40 (125% DPI scale)
  * 48x48 (150% DPI scale)
  * 64x64 (200% DPI scale)
  * 256x256

Consultez les exigences *taille* section dans [cet article][icons].

## Images à haute résolution

Sur les plates-formes qui ont un support DPI élevé comme les écrans Apple Retina, vous pouvez appendoir `@2x` après le nom de fichier de base de l’image pour le marquer comme une image haute résolution.

Par exemple, si `icon.png` est une image normale qui a une résolution standard, alors `icon@2x.png` sera traitée comme une image haute résolution qui a une double densité d' DPI.

Si vous voulez prendre en charge simultanément les écrans avec des densités DPI différentes, vous pouvez mettre des images de tailles différentes dans le même dossier et utiliser le nom de fichier sans le suffixe des DPI. Par exemple :

```plaintext
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```javascript
const { Tray } = require('electron')
const appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

Les suffixes suivants pour le DPI sont également pris en charge :

* `@1x`
* `@1.25x`
* `@1.33x`
* `@1.4x`
* `@1.5x`
* `@1.8x`
* `@2x`
* `@2.5x`
* `@3x`
* `@4x`
* `@5x`

## Image de modèle

Les templates d'image sont constituées de noir et d'un canal alpha. Elles ne sont pas destinées à être utilisées comme des images autonomes mais sont généralement mélangées avec d'autres contenus pour créer l'apparence finale désirée.

Le cas le plus courant est d’utiliser des images de modèle pour une icône de barre de menu, de sorte qu’il s’adapter aux barres de menu claires et sombres.

**Remarque :** Les template d'image ne sont pas prise en charge que sur macOS.

Pour marquer une image comme une image de modèle, son nom de fichier doit se terminer par le mot `Template`. Par exemple :

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Méthodes

Le module `nativeImage` a les méthodes suivantes, qui reviennent toutes dans exemple de la classe `NativeImage` suivante :

### `nativeImage.createEmpty()`

Retourne `NativeImage`

Crée une instance `NativeImage` vide.

### `nativeImage.createThumbnailFromPath(path, maxSize)` _macOS_ _Windows_

* `path` String - chemin vers un fichier que nous avons l’intention de construire une vignette à partir.
* `maxSize` [taille](structures/size.md) - la largeur maximale et la hauteur (nombres positifs) la vignette retournée peut être. L’implémentation windows `maxSize.height` et l’échelle de la hauteur `maxSize.width`.

Retours `Promise<NativeImage>` - rempli avec l’image d’aperçu miniature du fichier, qui est un [NativeImage](native-image.md).

### `nativeImage.createFromPath(path)`

* `path` String

Retourne `NativeImage`

Crée une nouvelle instance `NativeImage` à partir d’un fichier situé à `path`. Cette méthode une image vide si le `path` n’existe pas, ne peut pas être lu ou n’est pas une image valide.

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer][buffer]
* `options` objet
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `NativeImage`

Crée une nouvelle instance `NativeImage` à partir `buffer` qui contient les données brutes bitmap pixel retournées par `toBitmap()`. Le format spécifique dépend de la plate-forme.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* `options` objet (facultatif)
  * `width` Integer (facultatif) - Requis pour les tampons bitmap.
  * `height` Integer (facultatif) - Requis pour les tampons bitmap.
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `NativeImage`

Crée une nouvelle instance `NativeImage` à partir de `buffer`. Essaie de décoder en tant que PNG ou JPEG d’abord.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Retourne `NativeImage`

Crée une nouvelle instance `NativeImage` à partir de `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` numéro[] (facultatif)

Retourne `NativeImage`

Crée une nouvelle instance `NativeImage` à partir de l’Image NS qui cartographie à l' nom d’image donné. Consultez [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) pour une liste de valeurs possibles.

Le `hslShift` est appliqué à l’image avec les règles suivantes :

* `hsl_shift[0]` (teinte) : Valeur de teinte absolue pour l’image - 0 et 1 carte à 0 et 360 sur la roue de couleur de teinte (rouge).
* `hsl_shift[1]` (saturation) : Changement de saturation pour l’image, avec valeurs clés suivantes : 0 = supprimer toutes les couleurs. 0,5 = laisser inchangé. 1 = saturer complètement l’image.
* `hsl_shift[2]` (légèreté) : Changement de légèreté pour l’image, avec l' suivant les valeurs clés : 0 = supprimer toute légèreté (rendre tous les pixels noirs). 0,5 = laisser inchangé. 1 = pleine légèreté (rendre tous les pixels blancs).

Cela signifie que `[-1, 0, 1]` rendra l’image complètement blanche et `[-1, 1, 0]` rendra l’image complètement noire.

Dans certains cas, le `NSImageName` ne correspond pas à sa représentation des cordes; un exemple de ceci est `NSFolderImageName`, dont la représentation de chaîne serait réellement `NSFolder`. Par conséquent, vous devrez déterminer la bonne représentation de votre image avant de la passer. Cela peut être fait avec les éléments suivants :

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@ »%@« , SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

où `SYSTEM_IMAGE_NAME` devrait être remplacé par n’importe quelle valeur [cette liste](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Classe : NativeImage

> Enveloppez les images nativement telles que les icônes de plateau, de dock et d’application.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Méthodes d’instance

Les méthodes suivantes sont disponibles sur les instances de la `NativeImage` classe :

#### `image.toPNG([options])`

* `options` objet (facultatif)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Buffer` - Un [tampon][buffer] qui contient les données encodées `PNG` de l'image.

#### `image.toJPEG(quality)`

* `qualité` Entier - Entre 0 - 100.

Retourne `Buffer` - Un [tampon][buffer] qui contient les données encodées en `JPEG` de l'image.

#### `image.toBitmap([options])`

* `options` objet (facultatif)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Buffer` - Un [tampon][buffer] qui contient une copie des données du pixel brut bitmap de l'image.

#### `image.toDataURL([options])`

* `options` objet (facultatif)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `String` - L'URL des données de l'image.

#### `image.getBitmap([options])`

* `options` objet (facultatif)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Buffer` - Un [tampon][buffer] qui contient les données brutes des pixels bitmap de l'image.

La différence entre `getBitmap()` et `toBitmap()` est que `getBitmap()` ne pas copier les données bitmap, de sorte que vous devez utiliser le tampon retourné immédiatement dans une tique de boucle d’événement en cours; sinon, les données pourraient être modifiées ou détruites.

#### `image.getNativeHandle()` _macOS_

Retourne `Buffer` - Un [tampon][buffer] qui stocke le pointeur C sur la gestion native sous-jacente de l'image . Sur macOS, un pointeur vers `NSImage` serait retourné.

Note que le pointeur retourné est un pointeur faible vers l'image native sous-jacente au lieu d'une copie, donc vous _devez_ vous assurer que l'instance associée `nativeImage` est conservée.

#### `image.isEmpty()`

Retourne `Boolean` - Si l'image est vide.

#### `image.getSize ([scaleFactor])`

* `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne [`Size`](structures/size.md).

Si `scaleFactor` est passé, cela retournera la taille correspondant à la représentation d’image correspondant le plus étroitement à la valeur passée.

#### `image.setTemplateImage(option)`

* `option` Boolean

Marque l'image comme une image de modèle.

#### `image.isTemplateImage()`

Retourne `Boolean` - Si l'image est une image de modèle.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - L'aire de l'image à recadrer.

Retourne `NativeImage` - L'image recadrée.

#### `image.resize(options)`

* `options` objet
  * `width` Integer (facultatif) - Par défaut à la largeur de l’image.
  * `height` Integer (facultatif) - La hauteur de l'image par défaut.
  * `Qualité` String (facultatif) - La qualité souhaitée de l'image de retaille. Les valeurs possibles sont `good`, `better`, ou `best`. La valeur par défaut est `meilleur`. Ces valeurs expriment un compromis qualité/vitesse souhaité. Ils sont traduits en une méthode spécifique à l’algorithme qui dépend des capacités (Processeur, GPU) de la plate-forme sous-jacente. Il est possible que les trois méthodes être cartographiées sur le même algorithme sur une plate-forme donnée.

Retourne `NativeImage` - L'image redimensionnée.

Si seulement la `hauteur` ou la `largeur` sont spécifiées, alors le ratio d'aspect actuel sera préservé dans l'image redimensionnée.

#### `image.getAspectRatio ([scaleFactor])`

* `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Float` - Le ratio d'aspect de l'image.

Si `scaleFactor` passé, cela retournera le rapport d’aspect correspondant à la représentation d’image correspondant le plus étroitement à la valeur passée.

#### `image.getScaleFactors()`

Retours `Float[]` - Un tableau de tous les facteurs d’échelle correspondant aux représentations pour un nativeImage donné.

#### `image.addRepresentation(options)`

* `options` objet
  * `scaleFactor` Double - Le facteur d’échelle pour ajouter la représentation d’image pour.
  * `largeur` Integer (facultatif) - 0 par défaut. Requis si un tampon bitmap spécifié comme `buffer`.
  * `height` Integer (facultatif) - 0 par défaut. Requis si un tampon bitmap spécifié comme `buffer`.
  * `tampon` Buffer (facultatif) - Le tampon contenant les données de l'image brute.
  * `dataURL` String (facultatif) - L’URL de données contenant soit une base 64 image PNG codée ou JPEG.

Ajouter une représentation d’image pour un facteur d’échelle spécifique. Cela peut être utilisé pour ajouter explicitement différentes représentations de facteurs d’échelle à une image. Ce peut être appelé sur des images vides.

### Propriétés d'instance

#### `nativeImage.isMacTemplateImage` _macOS_

Une propriété `Boolean` qui détermine si l'image est considérée comme une [image de modèle](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Veuillez noter que cette propriété n'a qu'un effet sur macOS.

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
