# Diferentes Técnicas entre o Electron e NW.js (formalmente node-webkit)

**Nota: Anteriormente o Electron era chamado de Atom Shell.**

Como o NW.JS, o Electron fornece uma plataforma para escrever aplicações desktops com JavaScript e HTML, e tem também integração com o Node, permitindo acesso no sistema das páginas webs.

Mas existe também uma diferença fundamental entre os dois projetos que faz com que o Electron seja um pouco diferente do NW.js:

**Ponto de entrada da aplicação**

No NW.js o ponto de entrada principal da aplicação é uma página web. Você especifica uma URL da página principal no arquivo package.json e a mesma é aberta em um navegador como a janela principal da aplicação.

No Electron, o ponto de entrada é um arquivo JavaScript. Em vez de fornecer uma URL, você cria uma janela do navegador e carrega um arquivo HTML usando a API. Você também pode "ouvir" eventos das janelas para decidir quando parar a aplicação.

Electron funciona como o Node.js em tempo de execução. As APIs do Electron são de níveis baixo, você pode usa-las em um navegador no lugar do PhantomJS.

**Build Aplicação**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/brightray/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Users don't need a powerful machine to build Electron.

**3. Node Integration**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.