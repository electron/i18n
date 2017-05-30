# Diferentes Técnicas entre o Electron e NW.js (formalmente node-webkit)

**Nota: Anteriormente o Electron era chamado de Atom Shell.**

Como o NW.JS, o Electron fornece uma plataforma para escrever aplicações desktops com JavaScript e HTML, e tem também integração com o Node, permitindo acesso no sistema das páginas webs.

Mas existe também uma diferença fundamental entre os dois projetos que faz com que o Electron seja um pouco diferente do NW.js:

**1. Ponto de entrada da aplicação**

No NW.js o ponto de entrada principal da aplicação é uma página web. Você especifica uma URL da página principal no arquivo package.json e a mesma é aberta em um navegador como a janela principal da aplicação.

No Electron, o ponto de entrada é um arquivo JavaScript. Em vez de fornecer uma URL, você cria uma janela do navegador e carrega um arquivo HTML usando a API. Você também pode "ouvir" eventos das janelas para decidir quando parar a aplicação.

Electron funciona como o Node.js em tempo de execução. As APIs do Electron são de níveis baixo, você pode usa-las em um navegador no lugar do PhantomJS.

**2. Build Aplicação**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/brightray/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Users don't need a powerful machine to build Electron.

**3. Integração com o Node**

No NW.js a integração com o Node nas páginas web requer um patch do Chromium para funcionar, enquanto do Electron é possível escolher diferentes maneiras de integração com cada plataforma evitando um hacking no Chromium. Veja o código do [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) para saber como foi feito.

**4. Contexto Múltiplos**

Se você for um usuário experiente no NW.js, você deve está familiarizado com os conceitos de contextos do Node e web. Estes conceitos foram criados por causa da forma que o NW.js foi implementado.

By using the [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.