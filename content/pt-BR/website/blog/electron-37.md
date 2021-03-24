---
title: Novidades no Electron 0.37
author: zeke
date: '2016-03-25'
---

Electron `0. 7` foi recentemente [lançado](https://github.com/electron/electron/releases) e incluiu uma grande atualização do Chrome 47 ao Chrome 49 e também várias novas APIs de núcleo. Esta versão mais recente traz todos os novos recursos enviados no [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) e [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). Isso inclui propriedades personalizadas do CSS, aumento do [suporte ES6](http://www.ecma-international.org/ecma-262/6.0/) , `KeyboardEvent` melhorias, `Prometa` melhorias e muitos outros novos recursos agora disponíveis no seu aplicativo Electron.

---

## Novidades

### CSS Custom Properties

Se você já usou linguagens pré-processadas como Sass e Mess, provavelmente você está familiarizado com *variáveis*, que lhe permite definir valores reutilizáveis para coisas como esquemas de cores e layouts. As variáveis ajudam a manter suas folhas de estilo DRY e mais sustentáveis.

Propriedades CSS personalizadas são semelhantes às variáveis pré-processadas na qual são reutilizáveis, mas eles também têm uma qualidade única que os torna ainda mais poderosos e flexíveis: **eles podem ser manipulados com JavaScript**. Este recurso sutil mas poderoso permite mudanças dinâmicas na interface visual, enquanto ainda se beneficia da [aceleração de hardware do CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions), e duplicação de código reduzida entre seu código frontend e folhas de estilos.

Para obter mais informações sobre propriedades CSS personalizadas, consulte o artigo [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) e a [demo do Google Chrome](https://googlechrome.github.io/samples/css-custom-properties/).

#### Variáveis CSS em ação

Vamos andar pelo exemplo de uma variável simples que pode ser ajustada ao vivo em seu aplicativo.

```css
:root {
  --awesome-color: #A5ECFA;
}

corpo {
  background-color: var(--awesome-color);
}
```

O valor da variável pode ser recuperado e alterado diretamente em JavaScript:

```js
// Obtenha o valor da variável ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// Defina o valor da variável para 'orange'
document.body.style.setProperty('--awesome-color', 'orange')
```

Os valores das variáveis também podem ser editados na seção **Estilos** das ferramentas de desenvolvimento para feedback rápido e ajustes:

![Propriedades CSS na aba de Estilos](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `Propriedade` KeyboardEvent.code

O Chrome 48 adicionou a nova propriedade de `código` disponível nos eventos `do KeyboardEvent` que serão a tecla física pressionada independente do layout de teclado do sistema operacional.

Isto deve tornar a implementação de atalhos de teclado personalizados em seu aplicativo Electron mais precisa e consistente entre máquinas e configurações.

```js
window.addEventListener('keydown', function(evento) {
  console.log(`${event.code} foi pressionado.`)
})
```

Confira [este exemplo](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) para vê-lo em ação.

### Eventos de rejeição de promessa

Chrome 49 adicionou duas novas `janelas` eventos que permitem que você seja notificado quando uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) rejeitada não for tratada.

```js
window.addEventListener('unhandledrejection', função (event) {
  console.log('Uma promessa rejeitada foi não tratada', event.promise, event.reason)
})

janela. ddEventListener('rejectionhandled', function (event) {
  console.log('Uma promessa rejeitada foi manipulada', event.promise, event.reason)
})
```

Confira [este exemplo](https://googlechrome.github.io/samples/promise-rejection-events/index.html) para vê-lo em ação.

### Atualizações ES2015 em V8

A versão V8 agora no Electron incorpora [91% da ES2015](https://kangax.github.io/compat-table/es6/#chrome49). Aqui estão algumas adições interessantes que você pode usar fora da caixa—sem bandeiras ou pré-compiladores:

#### Parâmetros padrão

```js
function multiply(x, y = 1) {
  return x * y
}

Multiply(5) // 5
```

#### Atribuição de desestruturação

Chrome 49 adicionou [atribuição de desestruturação](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) para facilitar muito a atribuição de variáveis e parâmetros de função.

Isto faz com que o Electron precise de mais limpo e mais compacto para atribuir agora:

##### Processo de navegador requer

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### Processo de Renderização Requer

```js
const {dialog, Tray} = require('electron').remote
```

##### Outros exemplos

```js
// Desestruturando um array e ignorando o segundo elemento
const [first, , last] = findAll()

// Desestruturando parâmetros de função
function whois({displayName: displayName, fullName: {firstName: name}}){
  console. og(`${displayName} é ${name}`)
}

let usuário = {
  displayName: "jdoe",
  fullName: {
      firstName: "John",
      Sobrenome: "Feito"
  }
}
whois(user) // "jdoe is John"

// Destruindo um objeto
let {name, avatar} = getUser()
```

## Novas APIs do Electron

Algumas das novas APIs do Electron estão abaixo, você pode ver cada nova API nas notas de lançamento das [versões do Electron](https://github.com/electron/electron/releases).

#### `mostrar` e `ocultar` eventos na `BrowserWindow`

Estes eventos são emitidos quando a janela é exibida ou ocultada.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
janela. n('mostrar', função () { console.log('Janela foi mostrada') })
window.on('hide', function () { console.log('Janela foi escondida') })
```

#### `Tema de plataforma alterado` no aplicativo `` para `OS X`

Este evento é emitido quando o tema [Modo escuro](https://discussions.apple.com/thread/6661740) do sistema é alternado.

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platform theme mudado. No modo escuro? ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` para `OS X`

Esse método retorna `verdadeiro` se o sistema está no Modo Sombrio, e `falso` caso contrário.

#### `Eventos` e `scroll-touch-end` para BrowserWindow para `OS X`

Esses eventos são emitidos quando a fase do evento de rolagem da roda já começou ou terminou.

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console. og('Toque aberto ') })
window.on('scroll-touch-end', function () { console.log('Scroll touch ended') })
```

