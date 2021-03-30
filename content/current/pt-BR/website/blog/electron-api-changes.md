---
title: API de mudanças que vem em Electron 1.0
author: zcbenz
date: '2015-11-17'
---

Desde o início do Electron, começando pelo caminho de volta quando costumava ser chamado de Atom-Shell, temos experimentado fornecendo uma bela API JavaScript multi-plataforma para o módulo de conteúdo do Chromium e componentes nativos de GUI. As APIs começaram de forma muito orgânica, e ao longo do tempo fizemos várias alterações para melhorar os desenhos iniciais.

---

Agora com o Electron preparando para uma versão 1.0, gostaríamos de aproveitar a oportunidade para mudar, endereçando os últimos detalhes da API de nigging. As alterações descritas abaixo estão incluídas em **0.35.**, com as antigas APIs reportando avisos de depreciação para que você possa estar atualizado sobre a versão futura 1.0. Um Electron 1.0 não estará disponível por alguns meses então você terá algum tempo antes dessas alterações serem quebradas.

## Avisos de depreciação

Por padrão, os avisos serão mostrados se você estiver usando APIs obsoletas. Para desativá-los, você pode definir `process.noDeprecation` para `true`. Para controlar as fontes de usos da API obsoletos, você pode definir `o processo. hrowDeprecation` para `true` para lançar exceções em vez de imprimir advertências, ou definir o processo `. raceDeprecation` para `true` para imprimir os traços das deprecations.

## Nova maneira de usar módulos integrados

Os módulos incorporados são agora agrupados em um módulo, em vez de serem separados em módulos independentes, para que você possa usá-los [sem conflitos com outros módulos][issue-387]:

```javascript
aplicativo = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

O modo antigo de `require('app')` ainda é suportado por versões anteriores, mas você também pode desativar:

```javascript
require('electron').hideInternalModules()
require('app') // lança erro.
```

## Uma maneira mais fácil de usar o módulo `remoto`

Devido à forma como o uso de módulos incorporados mudou, nós facilitamos o uso dos módulos do lado principal do processo de renderização. Agora você pode apenas acessar os atributos `remotos`para usá-los:

```javascript
// Um caminho novo.
var aplicativo = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

Em vez de usar uma cadeia de espera longa:

```javascript
// caminho velho.
var aplicativo = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Dividindo o módulo `ipc`

O módulo `ipc` existia tanto no processo principal quanto no processo de renderização e a API era diferente de cada lado, o que é bastante confuso para novos usuários. Renomeamos o módulo para `ipcMain` no processo principal, e `ipcRenderer` no processo de renderização para evitar confusão:

```javascript
// In main process.
var ipcMain = require('electron').ipcMain
```

```javascript
// No processo renderer.
var ipcRenderer = require('electron').ipcRenderer
```

E para o módulo `ipcRenderer` , um evento `extra` foi adicionado ao receber mensagens, para corresponder à forma como as mensagens são tratadas nos módulos `ipcMain`:

```javascript
ipcRenderer.on('message', função (evento) {
  console.log(event)
})
```

## Padrões `Opções` da Janela de Navegação

As opções `do BrowserWindow` possuem diferentes estilos baseados nas opções de outras APIs, e era um pouco difícil de usar em JavaScript por causa do `-` nos nomes. Agora eles estão padronizados com os nomes tradicionais do JavaScript:

```javascript
novo BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Seguindo convenções de DOM para nomes de API

Os nomes da API no Electron usados para preferir camelCase para todos os nomes da API, como `Url` para `URL`, mas o DOM tem suas próprias convenções, e eles preferem `URL` a `Url`, enquanto usa `Id` em vez de `ID`. Fizemos os seguintes nomes de API para corresponder aos estilos do DOM:

* `Url` foi renomeado para `URL`
* `Csp` foi renomeado para `CSP`

Você notará muitas deprecations ao usar o Electron v0.35.0 para seu aplicativo devido a essas alterações. Uma maneira fácil de corrigi-los é substituindo todas as instâncias do `Url` com `URL`.

## Altera o nome do evento da `Bandeja`

O estilo dos eventos da `Bandeja` foi um pouco diferente dos outros módulos, então uma renomeação foi feita para coincidir com os outros.

* `clicado` é renomeado para `clique`
* `duplo clique` é renomeado para `duplo-clique`
* `clique direito` é renomeado para `clique direito`

[issue-387]: https://github.com/electron/electron/issues/387

