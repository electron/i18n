---
title: Electron で V8 や Chromium の機能を使用する
author: jlord
date: '2016-01-07'
---

Electron アプリケーションの構築は、1 つのブラウザ向けに 1 つのコードベースとデザインを作成するだけでいいので、非常に手軽です。 しかも Electron は最新リリースの [Node.js](http://nodejs.org) と [Chromium](https://www.chromium.org) を保持しており、同梱の優れた機能を利用できます。 これにより以前はウェブアプリに含める必要があった依存関係が解消される場合があります。

---

There are many features and we'll cover some here as examples, but if you're interested in learning about all features you can keep an eye on the [Google Chromium blog](http://blog.chromium.org) and [Node.js changelogs](https://nodejs.org/en/download/releases). You can see what versions of Node.js, Chromium and V8 Electron is using at [electronjs.org/#electron-versions](https://electronjs.org/#electron-versions).

## ES6 Support through V8

Electron combines Chromium's rendering library with Node.js. The two share the same JavaScript engine, [V8](https://developers.google.com/v8). Many ECMAScript 2015 (ES6) features are already built into V8 which means you can use them in your Electron application without any compilers.

Below are a few examples but you can also get classes (in strict mode), block scoping, promises, typed arrays and more. Check out [this list](https://nodejs.org/en/docs/es6/) for more information on ES6 features in V8.

**Arrow Functions**

```js
findTime () => {
  console.log(new Date())
}
```
**String Interpolation**

```js
var octocat = "Mona Lisa";
console.log(`The octocat's name is ${octocat}`);
```

**New Target**

```js
Octocat() => {
  if (!new.target) throw "Not new";
  console.log("New Octocat");
}

// Throws
Octocat();
// Logs
new Octocat();
```

**Array Includes**

```js
 // Returns true
[1, 2].includes(2);
```

**Rest Parameters**

```js
// Represent indefinite number of arguments as an array
(o, c, ...args) => {
  console.log(args.length)
}
```

## Chromium Features

Thanks to all the hard work Google and contributors put into Chromium, when you build Electron apps you can also use cool things like (but not limited to):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [Fetch API Streaming](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

Follow along with the [Google Chromium blog](http://blog.chromium.org) to learn about features as new versions ship and again, you can check the version of Chromium that Electron uses [here](https://electronjs.org/#electron-versions).

## What are you excited about?

Tweet to us [@ElectronJS](https://twitter.com/electronjs) with your favorite features built into V8 or Chromium.

