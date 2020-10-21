---
title: Use os recursos V8 e Chromium no Electron
author: lorde
date: '2016-01-07'
---

Construir um aplicativo Electron significa que você só precisa criar um código e design para um navegador, que é bem útil. Mas como o Electron permanece atualizado com o [Node. s](http://nodejs.org) e [Chromium](https://www.chromium.org) à medida que eles liberam, você também pode fazer uso das grandes funcionalidades com as quais eles navegam. Em alguns casos, isso elimina dependências que você pode ter necessário incluir anteriormente em um aplicativo da web.

---

Existem muitos recursos e vamos cobrir alguns aqui como exemplos, mas se você estiver interessado em aprender sobre todos os recursos, você pode ficar de olho no [blog do Google Chromium](http://blog.chromium.org) e [Node. s changelogs](https://nodejs.org/en/download/releases). Você pode ver quais versões do Node.js, Chromium e V8 Electron estão usando em [electronjs.org/#electron-versions](https://electronjs.org/#electron-versions).

## Suporte ES6 através do V8

Electron combina a biblioteca de renderização do Chromium com Node.js. Os dois compartilham o mesmo motor JavaScript, [V8](https://developers.google.com/v8). Muitas características ECMAScript 2015 (ES6) já estão construídas em V8, o que significa que você pode usá-las em seu aplicativo Electron sem nenhum compilador.

Abaixo estão alguns exemplos, mas você também pode obter classes (no modo estrito), escopo de blocos, promessas, matrizes digitadas e muito mais. Confira [esta lista](https://nodejs.org/en/docs/es6/) para obter mais informações sobre recursos ES6 em V8.

**Funções de Flechas**

```js
findTime () => {
  console.log(nova Data())
}
```
**Interpolação de strings**

```js
var octocat = "Mona Lisa";
console.log(`O nome do octogato é ${octocat}`);
```

**New Target**

```js
Octocat() => {
  if (!new.target) throw "Not new";
  console. og("Novo Outubro");
}

// Lança
Octocat();
// Registra
novo Octocat();
```

**Matriz Inclui**

```js
 // Retorna verdadeiro
[1, 2].includes(2);
```

**Parâmetros de descanso**

```js
// Representa o número indefinido de argumentos como um array
(o, c, ...args) => {
  console.log(args.length)
}
```

## Funcionalidades do Chromium

Graças a todo o trabalho árduo do Google e colaboradores para o Chromium, quando você constrói aplicativos do Electron, você também pode usar coisas legais (como (mas não se limitando a):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Fetch API Streaming](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Siga junto com o [blog do Google Chromium](http://blog.chromium.org) para saber mais sobre recursos da nave de novas versões e novamente, você pode verificar a versão do Chromium que o Electron usa [aqui](https://electronjs.org/#electron-versions).

## Com o que você está animado?

Tuíte para nós [@ElectronJS](https://twitter.com/electronjs) com seus recursos favoritos embutidos no V8 ou Chromium.

