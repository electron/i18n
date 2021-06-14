# Performance

Desenvolvedores frequentemente perguntam sobre formas de otimizar a performance de aplicações Electron. Engenheiros de software, consumidores e desenvolvedores de frameworks nem sempre estão de acordo com uma simples definição de a "performance" acontece. Esse documento demonstra algumas práticas favoritas dos mantenedores do Electron, com a finalidade de reduzir consumo de memória, CPU e recursos de disco, enquanto garante que o APP seja responsivo a entrada do usuário e complete as operações da forma mais rápida possível. Além disso, nós queremos todas os meios de performance para manter um alto padrão para a segurança dos Apps.

Conhecimento e informação sobre como construir websites de performance com JavaScript geralmente também se aplicam à aplicativos Electron. Até certo ponto,recursos discutidos para performance de aplicações Node.js também se aplicam,porém fique atento que o termo "performance" no backend Node.js tem um significado diferente do de uma aplicação cliente.

Esta lista é providenciada para sua conveniência - e é muito parecida com nossa [ checklist de segurança ][security] - não pretende ser cansativa. Provavelmente é possível construir uma aplicação Electron lenta seguindo todos os passos listados abaixo. Electron é uma poderosa plataforma de desenvolvimento que deixa você, o desenvolvedor, fazer mais ou menos o que você quiser. Toda essa liberdade significa que a performance é amplamente sua responsabilidade.

## Diminuir, diminuir, diminuir

A lista abaixo contém um número de passos razoavelmente diretos e fáceis de implementar. Entretanto, construir a melhor versão da sua aplicação vai exigir que você vá além de uma série de etapas. Ao invés disso, você deve examinar de perto todo o código rodando em sua aplicação sendo cuidadoso, meticuloso e observador. Onde estão os gargalos ? Quando o usuário clica em um botão, quais operações gastam mais tempo de processamento ? Enquanto a aplicação está ociosa, quais objetos gastam mais memória ?

Dia após dia nós temos visto que a estratégia mais bem sucedida para construir aplicações Electron com bom desempenho é analisar o código rodando, encontrar a parte que mais precisa de recursos e otimizá-la. Repetir esse processo incansavelmente, de novo e de novo vai aumentar drasticamente a performance da sua aplicação. Experiências trabalhando com aplicativos maiores como o Visual Studio Code ou o Slack tem mostrado que essa prática é de longe a estratégia mais confiável para aumentar a performance.

Para aprender mais sobre como analisar o código da sua aplicação se familiarize com as Ferramentas de Desenvolvedor do Chrome. Para uma análise avançada olhando para vários processos de uma vez, considere a ferramenta [Chrome Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

### Leituras Recomendadas

* [Começando na análise de performance em tempo de execução][chrome-devtools-tutorial]
* [Palestra:  "O primeiro segundo - Visual Studio Code"][vscode-first-second]

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

1. the size of dependencies included
2. the resources required to load (`require()`) it
3. os recursos requeridos para realizar a ação que você está interessado

Gerar um perfil de consumo de CPU e de memória para carregar um módulo pode ser feito com um simples comando no terminal. No exemplo abaixo, nós estamos observando o popular módulo `request`.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

Executando esse comando temos um arquivo `.cpuprofile` e um arquivo `.heapprofile` no diretório em que você executou. Ambos os arquivos podem ser analisados usando a Ferramenta de Desenvolvedor do Chrome, usando as seções `Performance` e `Memory` respectivamente.

![Performance CPU Profile][4]

![Performance Heap Memory Profile][5]

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
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
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

O processo principal do Electron (algumas vezes chamado de "browser process") é especial: é o processo pai de todos os outros na sua aplicação e o primeiro processo com quem o sistema operacional interage. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

Sob nenhuma circunstância você deve bloquear este processo e a thread da UI com operações longas. Bloquear a thread da UI significa que todo o seu programa vai travar até o processo principal estar pronto para continuar.

### Por que?

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. Se sua janela está renderizando uma animação suave, ela vai precisar conversar com o processo da GPU sobre isso - mais uma vez passando pelo processo principal.

Electron e Chromium são cuidadosos ao colocar tarefas pesadas de I/P e operações pesadas em CPU dentro de novas threads para evitar o bloqueio da thread da UI. Você deve fazer o mesmo.

### Como?

A poderosa arquitetura multi-procedural fica pronta para ajudar você com suas tarefas demoradas, mas também inclue um pequeno número de armadilhas de performance.

1) Para longas e pesadas tarefas na CPU, faça uso de [worker threads][worker-threads], considere move-las para a BrowserWindow ou (como último recurso) cria um processo dedicado.

2) Evite usar o IPC síncrono e o módulo `remote` o máximo possível. Enquanto há casos legítimos de uso, é de longe muito fácil bloquear a thread da UI sem saber usando o módulo `remote`.

3) Evite usar operações que bloqueiam I/O no processo principal. Em suma, sempre que um módulo Node.js (como `fs` ou `child_process`) oferecer uma versão assíncrona ou síncrona, você deve dar preferência a versão assíncrona e não-bloqueadora.

## 4) Bloqueando o processo de renderização

Desde que o Electron esteja de acordo com a versão do Chrome, você pode usar os mais novos e melhores recursos que a plataforma Web oferece para adiar ou descarregar operações pesadas a fim de manter sua aplicação leve e responsiva.

### Por que?

Você provavelmente tem muito JavaScript para rodar no processo de renderização. A dica é executar operações o mais rápido possível sem deixar de lado recursos necessários para continuar liso, respondendo às entradas do usuário, ou animando a 60fps.

Orquestrar o fluxo de operações no código de renderização é particularmente útil se usuários reclamam que seu programa "engasga" às vezes.

### Como?

Geralmente, todo conselho para construir aplicativos web melhores para navegadores modernos se aplicam à renderização do Electron também. As duas ferramentas primárias à sua disposição são atualmente `requestIdleCallback()` para pequenos processos e `Web Workers` para operações demoradas.

*`requestIdleCallback()`* permite ao desenvolvedor enfileirar uma função para ser executada assim que o processo estiver entrando em um período ocioso. Ela permite você fazer tarefas de baixa prioridade ou de fundo sem impactar a experiência do usuário. Para mais informações sobre como usar isso, cheque a sua documentação no [MDN][request-idle-callback].

*Web Workers* são uma ferramenta poderosa para rodar um código em uma thread separada. Há algumas ressalvas - consulte a [documentação de multi-thread do Electron][multithreading] e a [documentação do MDN para Web Workers][web-workers]. Elas são a solução ideal para qualquer operação que precise de muito poder de CPU por um longo período de tempo.

## 5) Sobrecargas desnecessárias

Um dos maiores benefícios do Electron é que você sabe exatamente qual engine vai interpretar seu JavaScript, HTML e CSS. Se você esta usando código que foi escrito para a web em geral, certifique-se de não sobrecarregar recursos já incluídos no Electron.

### Por que?

Ao construir uma aplicação web para a internet de hoje, os ambientes mais antigos ditam quais funcionalidades você pode e não pode usar. Embora o Electron suporte filtros e animações CSS de bom desempenho, um navegador mais antigo pode não suportar. Onde você poderia usar WebGL, seus desenvolvedores podem ter escolhido uma solução mais faminta por recursos para suportar telefones antigos.

Quando isso vem para o JavaScript, você deve ter incluído bibliotecas ferramentais como JQuery para seletores DOM ou sobrecargas como o `regenerator-runtime` para suportar `async/await`.

É raro que uma sobrecarga baseada em JavaScript seja mais rápida que o equivalente em uma funcionalidade nativa do Electron. Não deixe seu aplicativo Electron lento, enviando sua própria versão dos recursos de plataforma web padrão.

### Como?

Opere sobre a suposição que sobrecargas em versões atuais do Electron são desnecessárias. Se você tem dúvidas, cheque [caniuse.com](https://caniuse.com/) e verifique se a [versão do Chromium usada em sua aplicação Electron](../api/process.md#processversionschrome-readonly) suporta a funcionalidade que deseja.

Além disso, examine cuidadosamente as bibliotecas que você usa. São realmente necessárias? `jQuery`, por exemplo, foi um sucesso tal que muitos de seus recursos agora fazem parte da [configuração padrão de JavaScript disponível][jquery-need].

Se você estiver usando um compilador/transpilador como TypeScript, examine sua configuração e certifique-se de que esteja utilizando a versão mais recente do ECMAScript suportada pelo Electron.

## 6) Requisições desnecessárias ou bloqueadoras

Evite buscar raramente recursos da internet se eles podem facilmente ser empacotados com seu aplicativo.

### Por que?

Muitos usuários do Electron começam com um aplicativo inteiramente baseado na web que estão transformando em uma aplicação desktop. Como desenvolvedores web, estamos acostumados a carregar recursos de uma variedade de redes de conteúdo. Agora que você está enviando uma aplicação desktop adequada, tente "cortar o corte" quando possível e evite deixar seus usuários esperar por recursos que nunca mudam e podem ser facilmente incluídos em seu aplicativo.

Um típico exemplo é o Google Fonts. Muitos desenvolvedores usam a incrível coleção de fontes gratuitas do Google, que vem com um rede de entrega de conteúdo. O tom é direto: Inclua algumas linhas de CSS e o Google cuidará do resto.

Quando está construindo uma aplicação Electron, seus usuários serão melhor atendidos se você baixar as fontes e incluí-las no pacote de seu programa.

### Como?

Em um mundo ideal, sua aplicação não precisaria de conexão com a internet para funcionar completamente. Para chegar lá, você deve entender quais recursos em sua aplicação estão baixando \- e o quão grandes são esses recursos.

Para isso, abra suas ferramentas de desenvolvedor. Navegue até a seção `Network` e marque a opção `Disable cache`. Em seguida, recarregue seu renderizador. A menos que sua aplicação proíba tais recarregamentos, você pode fazer ativar o recarregamento pressionando `Cmd +R` ou `Ctrl + R` com a ferramenta de desenvolvedor em foco.

As ferramentas agora vão meticulosamente gravar todas as requisições de rede. No primeiro passo, faça um balanço de todos os recursos que estão sendo baixados, focando nos arquivos grandes primeiro. Há algumas dessas imagens, fontes ou arquivos de mídia que não mudam e poderiam ser incluídas em seu pacote ? Se sim, inclua elas.

Como próximo passo, habilite o `Network Throttling`. Ache o menu suspenso que está em `Online` e selecione uma velocidade menor como o `Fast 3G`. Recarregue seu renderizador e veja se tem algum recurso que sua aplicação está esperando desnecessariamente. Em muitos casos, o programa vai aguardar uma requisição na rede ser concluída apesar de não precisar realmente do recurso envolvido.

Uma dica, carregar recursos da Internet que você pode querer alterar sem enviar uma atualização de aplicativo é uma estratégia poderosa. Para o controle avançado de sobre como os recursos estão sendo carregados, considere investir em [Service Workers][service-workers].

## 7) Empacote seu código

Como já apontado em "[Carregando e rodando o código muito cedo](#2-loading-and-running-code-too-soon)", o `require()` é uma operação cara. Se você for capaz, comprima sua aplicação em um único arquivo.

### Por que?

Desenvolvimentos modernos de JavaScript normalmente envolvem muitos arquivos e módulos. Enquanto isso é perfeito para desenvolver com Electron, nós recomendamos fortemente que você empacote todo o seu código em um único arquivos para garantir que a sobrecarga inclusa no método `require()` seja paga apenas uma vez quando sua aplicação inicia.

### Como?

Tem vários compressores de JavaScript lá fora e nós sabemos que melhor que irritar a comunidade recomendando uma única ferramenta em detrimento de outra. Nós recomendamos contudo que você use um empacotador que seja capaz de lidar com o ambiente único do Electron que precisa lidar com Node.js e Browser.

A partir da escrita deste artigo, as escolhas populares incluem [Webpack][webpack], [Parcel][parcel], e [rollup.js][rollup].

[4]: ../images/performance-cpu-prof.png
[5]: ../images/performance-heap-prof.png

[security]: ./security.md
[chrome-devtools-tutorial]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/
[worker-threads]: https://nodejs.org/api/worker_threads.html
[web-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[request-idle-callback]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[multithreading]: ./multithreading.md
[jquery-need]: http://youmightnotneedjquery.com/
[service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://rollupjs.org/
[vscode-first-second]: https://www.youtube.com/watch?v=r0OeHRUCCb4
