# Performance

Desenvolvedores frequentemente perguntam sobre formas de otimizar a performance de aplicações Electron. Engenheiros de software, consumidores e desenvolvedores de frameworks nem sempre estão de acordo com uma simples definição de a "performance" acontece. Esse documento demonstra algumas práticas favoritas dos mantenedores do Electron, com a finalidade de reduzir consumo de memória, CPU e recursos de disco, enquanto garante que o APP seja responsivo a entrada do usuário e complete as operações da forma mais rápida possível. Além disso, nós queremos todas os meios de performance para manter um alto padrão para a segurança dos Apps.

Conhecimento e informação sobre como construir websites de performance com JavaScript geralmente também se aplicam à aplicativos Electron. Até certo ponto,recursos discutidos para performance de aplicações Node.js também se aplicam,porém fique atento que o termo "performance" no backend Node.js tem um significado diferente do de uma aplicação cliente.

Esta lista é providenciada para sua conveniência - e é muito parecida com nossa [ checklist de segurança ](./security.md) - não pretende ser cansativa. Provavelmente é possível construir uma aplicação Electron lenta seguindo todos os passos listados abaixo. Electron é uma poderosa plataforma de desenvolvimento que deixa você, o desenvolvedor, fazer mais ou menos o que você quiser. Toda essa liberdade significa que a performance é amplamente sua responsabilidade.

## Diminuir, diminuir, diminuir

A lista abaixo contém um número de passos razoavelmente diretos e fáceis de implementar. Entretanto, construir a melhor versão da sua aplicação vai exigir que você vá além de uma série de etapas. Ao invés disso, você deve examinar de perto todo o código rodando em sua aplicação sendo cuidadoso, meticuloso e observador. Onde estão os gargalos ? Quando o usuário clica em um botão, quais operações gastam mais tempo de processamento ? Enquanto a aplicação está ociosa, quais objetos gastam mais memória ?

Dia após dia nós temos visto que a estratégia mais bem sucedida para construir aplicações Electron com bom desempenho é analisar o código rodando, encontrar a parte que mais precisa de recursos e otimizá-la. Repetir esse processo incansavelmente, de novo e de novo vai aumentar drasticamente a performance da sua aplicação. Experiências trabalhando com aplicativos maiores como o Visual Studio Code ou o Slack tem mostrado que essa prática é de longe a estratégia mais confiável para aumentar a performance.

Para aprender mais sobre como analisar o código da sua aplicação se familiarize com as Ferramentas de Desenvolvedor do Chrome. Para análises profundas procurando por processos múltiplos de uma vez só considere a ferramenta [Chrome Tracing].

### Leituras Recomendadas

 * [Começando na análise de performance em tempo de execução](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
 * [Palestra:  "O primeiro segundo - Visual Studio Code"](https://www.youtube.com/watch?v=r0OeHRUCCb4)

## Sumário

Seu aplicativo pode ser um pouco mais enxuto, rápido e geralmente menos faminto por recursos se você se atentar a esses passos.

1. [Descuido ao incluir módulos](#1-carelessly-including-modules)
2. [Carregando e rodando o código muito cedo](#2-loading-and-running-code-too-soon)
3. [Bloqueando o processo principal](#3-blocking-the-main-process)
4. [Bloqueando o processo de renderização](#4-blocking-the-renderer-process)
5. [Sobrecargas desnecessárias](#5-unnecessary-polyfills)
6. [Requisições desnecessárias ou bloqueadoras](#6-unnecessary-or-blocking-network-requests)
7. [Empacote seu código](#7-bundle-your-code)

## 1) Descuido ao incluir módulos

Antes de adicionar um módulo Node.js em sua aplicação,examine-o primeiro. Quantas dependências esse módulo inclui ? Que tipo de recursos são necessários para ele simplesmente ser chamado em um `require()` ? Você pode descobrir que o módulo com mais downloads nos pacotes NPM registrados ou com mais estrelas no GitHub, não é de fato o mais enxuto ou menor disponível.

### Por que?

A razão por trás dessa recomendação é melhor ilustrada com um exemplo do mundo real. Durante os primórdios do Electron, garantir a descoberta de conexão de rede era um problema, resultando em muitas aplicações usando um módulo apenas para usar o método ` isOnline()`.

O módulo detecta sua conexão tentando chegar a um número conhecido de pontos de extremidade. Para a lista destes pontos, depende de um módulo diferente, que também continha uma lista de portas já conhecidas. Essa dependência por si mesma depende de um módulo contendo informações sobre portas, que vem em forma de um arquivo JSON com mais de 100.000 linhas de conteúdo. Sempre que o módulo é carregado (normalmente em um ` require('módulo) `), isto vai carregar todas as suas dependências e eventualmente ler e transformar esse arquivo JSON. Interpretar milhares de linhas de um JSON é uma operação muito cara. Em uma máquina lenta isso pode levar vários segundos.

Em ambientes de servidores, tempo de inicialização é irrelevante virtualmente. Um servidor Node.js que requer informações sobre todas as portas é provavelmente na verdade "mais rápido" se ele carregar todas as informações necessárias em memória sempre que o servidor iniciar para o ter o beneficio de atender às requisições mais rapidamente. O módulo discutido neste exemplo não é um módulo "ruim". Aplicativos Electron, contudo, não devem estar carregando, interpretando, e armazenando na memória informações que ele na verdade não precisa.

Em suma, um módulo aparentemente ótimo escrito primordialmente para servidores Node.js rodando em Linux pode ser uma má noticia para a performance da sua aplicação. Nesse exemplo em particular, a solução correta era não usar o módulo no final das contas, e ao invés disso usar verificadores de conexão incluídos em versões posteriores do Chromium.

### Como?

Quando considerar um módulo, nos recomendados que você verifique:

1. o tamanho das dependências inclusas. 2) Os recursos necessários para fazer um (`require()`)
3. os recursos requeridos para realizar a ação que você está interessado

Gerar um perfil de consumo de CPU e de memória para carregar um módulo pode ser feito com um simples comando no terminal. No exemplo abaixo, nós estamos observando o popular módulo `request`.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

Executando esse comando temos um arquivo `.cpuprofile` e um arquivo `.heapprofile` no diretório em que você executou. Ambos os arquivos podem ser analisados usando a Ferramenta de Desenvolvedor do Chrome, usando as seções `Performance` e `Memory` respectivamente.

![performance-cpu-prof](../images/performance-cpu-prof.png)

![performance-heap-prof](../images/performance-heap-prof.png)

Nesse exemplo, na máquina do autor, nós vimos que o `request` levou quase meio segundo, enquanto o `node-fetch` levou drasticamente menos memória e menos que 50ms.

## 2) Carregar e rodar o código muito cedo

Se você tem operações de configurações gastonas, considere adiar elas. Inspecione todo o trabalho executado logo após o início da aplicação. Ao invés de disparar todas as funções imediatamente, considere escalona-las em uma sequencia mais ligada ao caminho do usuário.

Em um desenvolvimento tradicional de Node.js, nós estamos acostumados a colocar todos as declarações `require()` no início. Se você atualmente desenvolve sua aplicação Electron usando a mesma estratégia _e_ usando módulos consideráveis que você não precisa imediatamente, aplique a mesma estratégia e adie o carregamento para um momento mais oportuno.

### Por que?

Carregar módulos é surpreendentemente uma operação cara, especialmente no Windows. Quando sua aplicação inicia, não deve fazer seus usuários aguardarem por coisas que eles não precisam agora.

Isto pode parecer óbvio, mas a maioria das aplicações tendem a fazer muitas operações imediatamente após o programa ser aberto - como checar atualizações, baixar conteúdo usado em uma sessão anterior, ou fazer operações I/O pesadas no disco.

Vamos tomar o Visual Studio Code como exemplo. Quando você abre um arquivo, ele vai imediatamente aparecer para você sem nenhum destaque, priorizando sua capacidade de interagir com o texto. Uma vez que está funcionando, aí sim ele vai destacar o código.

### Como?

Vamos considerar um exemplo e assumir que sua aplicação está interpretando arquivos em um formato fictício `.foo`. Para fazer isso, ele depende do módulo igualmente fictício `foo-parser`. Em um desenvolvimento tradicional em Node.js, você provavelmente vai escrever um código que vai avidamente carregar dependências:

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```

No exemplo acima, nós estamos fazendo muita coisa assim que o arquivo é carregado. Nós precisamos interpretar os arquivos imediatamente ? Nós podemos fazer isso um pouco mais tarde, quando o `getParsedFiles()` é realmente utilizado ?

```js
// "fs" já está sendo carregado, então o `require()` é "barato"
const fs = require('fs')

class Parser {
  async getFiles () {
    // Acesse o disco logo que o `getFiles` é chamado, não antes.
    // Além disso, assegure-se que nós não estamos bloqueando outras operações usando
// a versão assíncrona.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Nosso módulo fictício foo-parser é grande e requer muito para ser carregado,então
// adie esse trabalho até nos realmente precisarmos interpretar os arquivos.
    // Já que `require()` vem com um módulo em cache, o `require()` 
    // vai sair caro apenas uma vez - as chamadas seguintes de `getParsedFiles()`
    // vão ser mais rápidas.
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser.parse(files)
  }
}

// Essa operação agora é muito mais barata que nosso exemplo anterior
const parser = new Parser()

module.exports = { parser }
```

Em suma, aloque recursos quando precisar em vez de alocar todos eles quando sua aplicação iniciar.

## 3) Bloqueando o processo principal

O processo principal do Electron (algumas vezes chamado de "browser process") é especial: é o processo pai de todos os outros na sua aplicação e o primeiro processo com quem o sistema operacional interage. Ele lida com janelas, interações, e comunicação entre vários componente dentro do seu programa. Ele também abriga a thread da UI.

Sob nenhuma circunstância você deve bloquear este processo e a thread da UI com operações longas. Bloquear a thread da UI significa que todo o seu programa vai travar até o processo principal estar pronto para continuar.

### Por que?

O processo principal e sua thread UI são essencialmente a torre de controle para operações maiores em seu programa. Quando o sistema operacional informa o programa sobre um click do mouse, ele vai passar através do processo principal antes de chegar à sua janela. Se sua janela está renderizando uma animação suave, ela vai precisar conversar com o processo da GPU sobre isso - mais uma vez passando pelo processo principal.

Electron e Chromium são cuidadosos ao colocar tarefas pesadas de I/P e operações pesadas em CPU dentro de novas threads para evitar o bloqueio da thread da UI. Você deve fazer o mesmo.

### Como?

A poderosa arquitetura multi-procedural fica pronta para ajudar você com suas tarefas demoradas, mas também inclue um pequeno número de armadilhas de performance.

1) Para longas e pesadas tarefas na CPU, faça uso de [worker threads](https://nodejs.org/api/worker_threads.html), considere move-las para a BrowserWindow ou (como último recurso) cria um processo dedicado.

2) Evite usar o IPC síncrono e o módulo `remote` o máximo possível. Enquanto há casos legítimos de uso, é de longe muito fácil bloquear a thread da UI sem saber usando o módulo `remote`.

3) Evite usar operações que bloqueiam I/O no processo principal. Em suma, sempre que um módulo Node.js (como `fs` ou `child_process`) oferecer uma versão assíncrona ou síncrona, você deve dar preferência a versão assíncrona e não-bloqueadora.


## 4) Bloqueando o processo de renderização

Desde que o Electron esteja de acordo com a versão do Chrome, você pode usar os mais novos e melhores recursos que a plataforma Web oferece para adiar ou descarregar operações pesadas a fim de manter sua aplicação leve e responsiva.

### Por que?

Você provavelmente tem muito JavaScript para rodar no processo de renderização. A dica é executar operações o mais rápido possível sem deixar de lado recursos necessários para continuar liso, respondendo às entradas do usuário, ou animando a 60fps.

Orquestrar o fluxo de operações no código de renderização é particularmente útil se usuários reclamam que seu programa "engasga" às vezes.

### Como?

Geralmente, todo conselho para construir aplicativos web melhores para navegadores modernos se aplicam à renderização do Electron também. As duas ferramentas primárias à sua disposição são atualmente `requestIdleCallback()` para pequenos processos e `Web Workers` para operações demoradas.

*`requestIdleCallback()`* allows developers to queue up a function to be executed as soon as the process is entering an idle period. It enables you to perform low-priority or background work without impacting the user experience. For more information about how to use it, [check out its documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

*Web Workers* are a powerful tool to run code on a separate thread. There are some caveats to consider – consult Electron's [multithreading documentation](./multithreading.md) and the [MDN documentation for Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). They're an ideal solution for any operation that requires a lot of CPU power for an extended period of time.


## 5) Unnecessary polyfills

One of Electron's great benefits is that you know exactly which engine will parse your JavaScript, HTML, and CSS. If you're re-purposing code that was written for the web at large, make sure to not polyfill features included in Electron.

### Por que?

When building a web application for today's Internet, the oldest environments dictate what features you can and cannot use. Even though Electron supports well-performing CSS filters and animations, an older browser might not. Where you could use WebGL, your developers may have chosen a more resource-hungry solution to support older phones.

When it comes to JavaScript, you may have included toolkit libraries like jQuery for DOM selectors or polyfills like the `regenerator-runtime` to support `async/await`.

It is rare for a JavaScript-based polyfill to be faster than the equivalent native feature in Electron. Do not slow down your Electron app by shipping your own version of standard web platform features.

### Como?

Operate under the assumption that polyfills in current versions of Electron are unnecessary. If you have doubts, check \[caniuse.com\]\[https://caniuse.com/\] and check if the [version of Chromium used in your Electron version](../api/process.md#processversionschrome-readonly) supports the feature you desire.

In addition, carefully examine the libraries you use. Are they really necessary? `jQuery`, for example, was such a success that many of its features are now part of the [standard JavaScript feature set available](http://youmightnotneedjquery.com/).

If you're using a transpiler/compiler like TypeScript, examine its configuration and ensure that you're targeting the latest ECMAScript version supported by Electron.


## 6) Unnecessary or blocking network requests

Avoid fetching rarely changing resources from the internet if they could easily be bundled with your application.

### Por que?

Many users of Electron start with an entirely web-based app that they're turning into a desktop application. As web developers, we are used to loading resources from a variety of content delivery networks. Now that you are shipping a proper desktop application, attempt to "cut the cord" where possible
 - and avoid letting your users wait for resources that never change and could easily be included  in your app.

A typical example is Google Fonts. Many developers make use of Google's impressive collection of free fonts, which comes with a content delivery network. The pitch is straightforward: Include a few lines of CSS and Google will take care of the rest.

When building an Electron app, your users are better served if you download the fonts and include them in your app's bundle.

### Como?

In an ideal world, your application wouldn't need the network to operate at all. To get there, you must understand what resources your app is downloading \- and how large those resources are.

To do so, open up the developer tools. Navigate to the `Network` tab and check the `Disable cache` option. Then, reload your renderer. Unless your app prohibits such reloads, you can usually trigger a reload by hitting `Cmd + R` or `Ctrl + R` with the developer tools in focus.

The tools will now meticulously record all network requests. In a first pass, take stock of all the resources being downloaded, focusing on the larger files first. Are any of them images, fonts, or media files that don't change and could be included with your bundle? If so, include them.

As a next step, enable `Network Throttling`. Find the drop-down that currently reads `Online` and select a slower speed such as `Fast 3G`. Reload your renderer and see if there are any resources that your app is unnecessarily waiting for. In many cases, an app will wait for a network request to complete despite not actually needing the involved resource.

As a tip, loading resources from the Internet that you might want to change without shipping an application update is a powerful strategy. For advanced control over how resources are being loaded, consider investing in [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## 7) Bundle your code

As already pointed out in "[Loading and running code too soon](#2-loading-and-running-code-too-soon)", calling `require()` is an expensive operation. If you are able to do so, bundle your application's code into a single file.

### Por que?

Modern JavaScript development usually involves many files and modules. While that's perfectly fine for developing with Electron, we heavily recommend that you bundle all your code into one single file to ensure that the overhead included in calling `require()` is only paid once when your application loads.

### Como?

There are numerous JavaScript bundlers out there and we know better than to anger the community by recommending one tool over another. We do however recommend that you use a bundler that is able to handle Electron's unique environment that needs to handle both Node.js and browser environments.

As of writing this article, the popular choices include [Webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), and [rollup.js](https://rollupjs.org/).
