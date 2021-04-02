# screen

> Recupere informações sobre o tamanho da tela, monitores, posição do cursor, etc.

Processo: [Main](../glossary.md#main-process)

Este módulo não pode ser usado até que o `ready` evento do módulo `app` seja emitido.

`screen` é um [EventEmitter][event-emitter].

**Nota:** No renderizador / DevTools, `window.screen` é uma propriedade reservada do DOM, portanto, escrever `let {screen} = require ('electron')` pode não funcionar.

Um exemplo de criação de uma janela que preenche a tela inteira:

```javascript fiddle='docs/fiddles/screen/fit-screen'
const { app, BrowserWindow, screen } = require ('electron')

deixar ganhar
app.whenReady().then((() => {
  const { width, height } = screen.getPrim
  do site{ width, height }do Site
  ('https://github.com')
})
```

Outro exemplo de criação de uma janela no display externo:

```javascript
const { app, BrowserWindow, screen } = require ('electron')

deixar ganhar

app.whenReady().then(() => {
  displays const = screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {  {  {  {  {  {  {  {  {  {  {  {  {  {  {  {  {  {  {  {
    exibição de retorno.bounds.x !== 0 || display.bounds.y !== 0
  })

  se (externoDisplay) {
    ganhar = novo BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50
    })
    win.loadURL ('https://github.com')
  }
})
```

## Eventos

O módulo `screen` emite os seguintes eventos:

### Evento: 'display-added'

Retorna:

* `event` Event
* `newDisplay` [Display](structures/display.md)

Emitido quando `newDisplay` foi adicionado.

### Evento: 'display-removido'

Retorna:

* `event` Event
* </a>de exibição de `oldDisplay`

</li> </ul> 
  
  Emitido quando `oldDisplay` foi removido.
  
  

### Evento: 'display-metrics-changed'

Retorna:

* `event` Event
* </a>de exibição de `display` </li> 
  
  * `changedMetrics` String[]</ul> 

Emitido quando uma ou mais métricas mudam em um `display`. O `changedMetrics` é uma matriz de strings que descrevem as mudanças. Possíveis mudanças são `bounds`, `workArea`, `scaleFactor` e `rotation`.



## Métodos

O módulo `screen` tem os seguintes métodos:



### `screen.getCursorScreenPoint()`

Retornos [`Point`](structures/point.md)

A posição absoluta atual do ponteiro do mouse.



### `screen.getPrimaryDisplay()`

Retorna [`Display`](structures/display.md) - A exibição primária.



### `screen.getAllDisplays()`

Devoluções [`Display[]`](structures/display.md) - Uma série de displays que estão disponíveis no momento.



### `screen.getDisplayNearestPoint(ponto)`

* </a>de `point` Point</li> </ul> 
  
  Devoluções [`Display`](structures/display.md) - O visor mais próximo do ponto especificado.
  
  

### `screen.getDisplayMatching(rect)`

* </a>de Retângulo `rect` </li> </ul> 
  
  Devoluções [`Display`](structures/display.md) - O display que mais cruza os limites fornecidos.
  
  

### `screen.screenToDipPoint(point)` _Windows_

* </a>de `point` Point</li> </ul> 
  
  Retornos [`Point`](structures/point.md)
  
  Converte um ponto físico de tela em um ponto DIP de tela. A escala DPI é realizada em relação ao display que contém o ponto físico.
  
  

### `screen.dipToScreenPoint(point)` _Windows_

* </a>de `point` Point</li> </ul> 
  
  Retornos [`Point`](structures/point.md)
  
  Converte um ponto DIP de tela em um ponto físico da tela. A escala DPI é realizada em relação ao display que contém o ponto DIP.
  
  

### `screen.screenToDipRect(window, rect)` __do Windows

* </a> | do Navegador `window` Null</li> 
  
  * </a>de Retângulo `rect` </li> </ul> 
  
  Retornos [`Rectangle`](structures/rectangle.md)
  
  Converte uma retificada física de tela em uma retificada DIP de tela. A escala DPI é realizada em relação ao display mais próximo de `window`. Se `window` for nulo, o dimensionamento será realizado no visor mais próximo de `rect`.
  
  

### `screen.dipToScreenRect(window, rect)` __do Windows

* </a> | do Navegador `window` Null</li> 
  
  * </a>de Retângulo `rect` </li> </ul> 
  
  Retornos [`Rectangle`](structures/rectangle.md)
  
  Converte uma retificada dip de tela em uma retificada física da tela. A escala DPI é realizada em relação ao display mais próximo de `window`. Se `window` for nulo, o dimensionamento será realizado no visor mais próximo de `rect`.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
