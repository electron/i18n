# Différences techniques entre Electron et NW.js

Comme [NW.js][nwjs], Electron fournit une plate-forme pour développer des applications de bureau avec des technologies web. Les deux plates-formes permettent aux développeurs d'utiliser du HTML, JavaScript et Node.js. En surface, ils semblent très similaires.

Il existe cependant des différences fondamentales entre les deux projets qui font d'Electron un produit complètement distinct de NW.js.

## 1) Entry of Application

Dans NW.js, le point d'entrée principal d'une application peut être une page Web HTML. Dans dans ce cas, NW.js ouvrira le point d'entrée donné dans une fenêtre de navigateur.

Dans Electron, le point d'entrée est toujours un script JavaScript. Au lieu de fournir un URL directement, vous créez manuellement une fenêtre de navigateur et chargez un fichier HTML en utilisant l'API. You also need to listen to window events to decide when to quit the application.

Electron works more like the Node.js runtime. Les API d’Electron sont de niveau inférieur, vous pouvez l’utiliser pour les tests de navigateur à la place de [PhantomJS](https://phantomjs.org/).

## 2) Node Integration

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the `libuv` loop with each platform's message loop to avoid hacking Chromium. Voir le code [`node_bindings`][node-bindings] pour comprendre comment cela a été fait.

## 3) JavaScript Contexts

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Remarque : NW.js supporte éventuellement le multi-contexte depuis la v0.13.

## 4) Legacy Support

NW.js still offers a "legacy release" that supports Windows XP. It doesn't receive security updates.

Given that hardware manufacturers, Microsoft, Chromium, and Node.js haven't released even critical security updates for that system, we have to warn you that using Windows XP is wildly insecure and outright irresponsible.

However, we understand that requirements outside our wildest imagination may exist, so if you're looking for something like Electron that runs on Windows XP, the NW.js legacy release might be the right fit for you.

## 5) Features

There are numerous differences in the amount of supported features. Electron has a bigger community, more production apps using it, and [a large amount of userland modules available on npm][electron-modules].

As an example, Electron has built-in support for automatic updates and countless tools that make the creation of installers easier. As an example in favor of NW.js, NW.js supports more `Chrome.*` APIs for the development of Chrome Apps.

Naturally, we believe that Electron is the better platform for polished production applications built with web technologies (like Visual Studio Code, Slack, or Facebook Messenger); however, we want to be fair to our web technology friends. If you have feature needs that Electron does not meet, you might want to try NW.js.

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common
