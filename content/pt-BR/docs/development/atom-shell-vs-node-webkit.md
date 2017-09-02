# Diferentes Técnicas entre o Electron e NW.js (formalmente node-webkit)

**Nota: Anteriormente o Electron era chamado de Atom Shell.**

Como o NW.JS, o Electron fornece uma plataforma para escrever aplicações desktops com JavaScript e HTML, e tem também integração com o Node, permitindo acesso no sistema das páginas webs.

Mas existe também uma diferença fundamental entre os dois projetos que faz com que o Electron seja um pouco diferente do NW.js:

**1. Ponto de entrada da aplicação**

No NW.js o ponto de entrada principal da aplicação é uma página web. Você especifica uma URL da página principal no arquivo package.json e a mesma é aberta em um navegador como a janela principal da aplicação.

No Electron, o ponto de entrada é um arquivo JavaScript. Ao invés de fornecer uma URL, você cria uma janela do navegador e carrega um arquivo HTML usando a API. Você também pode "ouvir" eventos das janelas para decidir quando parar a aplicação.

Electron funciona como o Node.js em tempo de execução. As APIs do Electron são de níveis baixo, você pode usa-las em um navegador no lugar do PhantomJS.

**2. Configurar o Sistema**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` é uma biblioteca única que inclui todo os módulos do Chromium e as suas dependências. Não há a necessidade de ser administrador do sistema para que possa fazer uma configuração do Electron.

**3. Integração com o Node**

No NW.js a integração com o Node nas páginas web requer um patch do Chromium para funcionar, enquanto do Electron é possível escolher diferentes maneiras de integração com cada plataforma evitando um hacking no Chromium. Veja o código do [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) para saber como foi feito.

**4. Contexto Múltiplos**

Se você for um usuário experiente no NW.js, você deve está familiarizado com os conceitos de contextos do Node e web. Estes conceitos foram criados por causa da forma que o NW.js foi implementado.

Usando o recurso de contextos múltiplos do Node, o Electron não contém um novo contexto de JavaScript nas suas páginas web.

Nota: Múltiplos contextos são opcionais no NW.js desde da versão 0.13.