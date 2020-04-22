# Diferentes Técnicas entre o Electron e NW.js (formalmente node-webkit)

__Nota: Anteriormente o Electron era chamado de Atom Shell.__

Como o NW.JS, o Electron fornece uma plataforma para escrever aplicações desktops com JavaScript e HTML, e também tem integração com o Node, permitindo acesso no sistema das páginas webs.

Mas existe também uma diferença fundamental entre os dois projetos que faz com que o Electron seja um pouco diferente do NW.js:

__1. Ponto de Entrada da Aplicação__

No NW.js o ponto de entrada principal de um aplicativo é uma página web ou um código JS. Você especifica um html ou um arquivo js no `package.json` e ele é aberto em uma janela de navegador como a janela de entrada principal do aplicativo (em caso de um ponto de entrada html) ou o código é executado.

No Electron, o ponto de entrada é um arquivo JavaScript. Ao invés de fornecer uma URL, você cria uma janela do navegador e carrega um arquivo HTML usando a API. Você também pode "ouvir" eventos das janelas para decidir quando parar a aplicação.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Configurar o Sistema__

Para evitar uma complexidade de configuração do Chromium, o Electron utiliza a biblioteca [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) para acessar todas as APIs do Chromium. `libchromiumcontent` é uma biblioteca única que inclui todo os módulos do Chromium e as suas dependências. Não há a necessidade de ser administrador do sistema para que possa fazer uma configuração do Electron.

__3. Integração com o Node__

No NW.js a integração com o Node nas páginas web requer um patch do Chromium para funcionar, enquanto do Electron é possível escolher diferentes maneiras de integração com cada plataforma evitando um hacking no Chromium. Veja o código do [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) para saber como foi feito.

__4. Contexto Múltiplos__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

Ao usar o recurso [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) do Node, o Electron não introduz um novo contexto JavaScript em páginas web.

Nota: Múltiplos contextos são opcionais no NW.js desde da versão 0.13.
