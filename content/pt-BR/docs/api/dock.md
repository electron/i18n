## Classe: Doca

> Controle seu aplicativo no dock do macOS

Processo: [Main](../glossary.md#main-process)

O exemplo a seguir mostra como rebater seu ícone na doca.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Métodos de Instância

#### `dock.bounce([type])` __macOS

* `type` String (opcional) - Pode ser `critical` ou `informational`. O padrão é `informational`

Retorna `Integer` - uma ID representando o pedido.

Quando `critical` for aprovada, o ícone da doca saltará até que o aplicativo fique ativo ou a solicitação seja cancelada.

Quando `informational` for aprovada, o ícone da doca saltará por um segundo. No entanto, a solicitação permanece ativa até que o aplicativo se torne ativo ou a solicitação seja cancelada.

**Nota Bene:** Este método só pode ser usado enquanto o aplicativo não estiver focado; quando o aplicativo estiver focado, ele retornará -1.

#### `dock.cancelBounce(id)` __macOS

* `id` Inteiro

Cancele o salto de `id`.

#### `dock.downloadFinished(filePath)` __macOS

* `filePath` Cordas

Pula a pilha Downloads se o filePath estiver dentro da pasta Downloads.

#### `dock.setBadge(text)` __macOS

* `text` String

Define a corda a ser exibida na área de badging do cais.

#### `dock.getBadge()` no _macOS_

Retorna `String` - A sequência de crachá da doca.

#### `dock.hide()` no _macOS_

Esconde o ícone na Dock.

#### `dock.show()` no _macOS_

Devoluções `Promise<void>` - Resolve quando o ícone da doca é mostrado.

#### `dock.isVisible()` no _macOS_

Devoluções `Boolean` - Se o ícone da doca é visível.

#### `dock.setMenu(menu)` __macOS

* `menu` [Menu](menu.md)

Define o[dock-menu]do aplicativo [menu dock] .

#### `dock.getMenu()` no _macOS_

Devoluções `Menu | null` - O[dock-menu]do aplicativo [menu dock] .

#### `dock.setIcon(image)` __macOS

* `image` ([NativeImage](native-image.md) | String)

Define a `imagem` associada com o ícone do dock.
