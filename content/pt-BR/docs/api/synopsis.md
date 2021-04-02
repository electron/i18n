# Sinopse

> Como usar APIs Node.js e Electron.

Todos os módulos incorporados [Node.js](https://nodejs.org/api/) estão disponíveis em módulos de nó Electron e de terceiros também totalmente suportados (incluindo [módulos nativos](../tutorial/using-native-node-modules.md)).

O Electron também fornece alguns módulos extras para o desenvolvimento de aplicativos desktop. Alguns módulos só estão disponíveis no processo principal, alguns só estão disponíveis no processo de renderização (página web), e alguns podem ser usados em qualquer tipo de processo.

A regra básica é: se um módulo for [GUI][gui] ou relacionado ao sistema de baixo nível, então deve estar disponível apenas no processo principal. Você precisa estar familiarizado com o conceito de [processo principal vs. processo renderer](../tutorial/quick-start.md#main-and-renderer-processes) scripts para poder usar esses módulos.

O script principal do processo é como um script .js nó normal:

```javascript
const { app, BrowserWindow } = require ('electron')
let win = null

app.whenReady().then(() =>
  vitória = novo BrowserWindow({ width: 800, height: 600 })
  win.loadURL ('https://github.com')
})
```

O processo de renderização não é diferente de uma página da Web normal, exceto pela capacidade de usar módulos de nó se `nodeIntegration` estiver habilitada:

```html
<! DOCTYPE html>
<html>
<body>
<script>
  const fs = require('fs') console
  .log(fs.readFileSync(__filename, 'utf8'))
</script>
</body>
</html>
```

Para executar o seu aplicativo, leia [executar seu aplicativo](../tutorial/quick-start.md#run-your-application).

## Atribuição de desestruturação

A partir de 0,37, você pode usar [tarefa de desestruturação][destructuring-assignment] para facilitar a utilização módulos internos.

```javascript
const { app, BrowserWindow } = require ('electron')

deixar ganhar

app.whenReady().(() => {
  win = novo BrowserWindow()
  win.loadURL('https://github.com')
})
```

Se você precisar de todo o módulo `electron`, você pode exigi-lo e depois usar desestruturação para acessar os módulos individuais do `electron`.

```javascript
elétron const = require ('electron')
const { app, BrowserWindow } = elétron

deixar ganhar

app.whenReady().then(((() => {
  win = novo BrowserWindow()
  win.loadURL('https://github.com')
})
```

Isto equivale ao seguinte código:

```javascript
elétron const = requer ('elétron')
aplicativo const = electron.app
const BrowserWindow = elétron. BrowserWindow
deixar ganhar

app.whenReady().then(((() => {
  win = novo BrowserWindow()
  win.loadURL ('https://github.com')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
