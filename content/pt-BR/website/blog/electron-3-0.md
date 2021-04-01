---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

A equipe do Electron está animada em anunciar que a primeira versão estável do Electron 3 agora está disponível em [electronjs. rg](https://electronjs.org/) e via `npm install electron@latest`! Ela está repleta de atualizações, correções e novos recursos, e mal podemos esperar para ver o que você constrói com elas. Abaixo estão os detalhes sobre esta versão, e nós damos as boas vindas a seus comentários enquanto você explora.

---

## Processo de lançamento

Conforme iniciamos o desenvolvimento da `v3.0.`, procuramos definir mais empiricamente critérios para um lançamento estável formalizando o progresso do feedback para versões beta progressivas. `v3.0.` não teria sido possível sem nosso [parceiro do Programa de Feedback de Apps,](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) que forneceu teste antecipado e feedback durante o ciclo beta. Graças a Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code e outros membros do programa por seu trabalho. Se você gostaria de participar de apostas futuras, envie-nos um e-mail para [info@electronjs.org](mailto:info@electronjs.org).

## Alterações / Novas Funcionalidades

Grande parte importante da cadeia de ferramentas do Electron, incluindo o Chrome `v66.0.3359.181`, Node `v10.2.0`, e V8 `v6.6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] fez: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] fez: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] feat: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] fez: `win.moveTop()` para mover a ordem da janela para o topo
* [[#13110](https://github.com/electron/electron/pull/13110)] fez: TextField e Button APIs
* [[#13068](https://github.com/electron/electron/pull/13068)] fez: netLog API para controle dinâmico do registro
* [[#13539](https://github.com/electron/electron/pull/13539)] fez: habilite `webview` no renderizador de sandbox
* [[#14118](https://github.com/electron/electron/pull/14118)] fez: `fs.readSync` agora funciona com arquivos massivos
* [[#14031](https://github.com/electron/electron/pull/14031)] feat: node `fs` wrappers para tornar `fs.realpathSync.native` e `fs.realpath.native` disponíveis

## Quebrando alterações da API

* [[#12362](https://github.com/electron/electron/pull/12362)] fez: atualizações para o controle de ordem do item do menu
* [[#13050](https://github.com/electron/electron/pull/13050)] refatoração: removido APIs descontinuadas documentadas
  * Veja [documentos](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) para mais detalhes
* [[#12477](https://github.com/electron/electron/pull/12477)] refator: removido os eventos `did-get-response-details` e `did-get-redirect-request`
* [[#12655](https://github.com/electron/electron/pull/12655)] fez: padrão para desativar a navegação ao arrastar e soltar
* [[#12993](https://github.com/electron/electron/pull/12993)] fez: Node `v4.x` ou maior é necessário usar o módulo npm `electron`
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) </a> [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refator: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refatoração: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] grave: não use mais JSON para enviar o resultado de `ipcRenderer.sendSync`
* [[#13039](https://github.com/electron/electron/pull/13039)] feat: padrão para ignorar argumentos de linha de comando seguindo uma URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refatoração: renomeie `api::Janela` para `api::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] fez: zoom visual agora desativado por padrão
* [[#12408](https://github.com/electron/electron/pull/12408)] refatoração: renomeie o comando app-command `media-play_pause` para `media-play-pause`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] fez: suporte a notificações de área de trabalho
* [[#12496](https://github.com/electron/electron/pull/12496)] feat: `tray.setIgnoreDoubleClickEvents(ignore)` para ignorar eventos de duplo clique.
* [[#12281](https://github.com/electron/electron/pull/12281)] feat: funcionalidade do mouse para frente no macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] fez: Bloqueio de tela / eventos de desbloqueio

### Windows

* [[#12879](https://github.com/electron/electron/pull/12879)] fez: adicionado DIP à/de conversões de coordenadas de tela

**Nota Bene:** Mudar para uma versão mais antiga do Electron depois de executar esta versão requer que você remova o diretório de dados do seu usuário para evitar falhas em versões mais antigas. Você pode obter o diretório de dados do usuário executando `console.log(app.getPath("userData"))` ou veja [docs](https://electronjs.org/docs/api/app#appgetpathname) para mais detalhes.

## Correções de Bugs

* [[#13397](https://github.com/electron/electron/pull/13397)] correção: problema com `fs.statSyncNoException` lançando exceções
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] correção: erro ao carregar o site com jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] correção: travamento em `net::ClientSocketHandle` destructor
* [[#14453](https://github.com/electron/electron/pull/14453)] correção: notificar a mudança de foco imediatamente, ao invés de no próximo tick

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] correção: problema permitindo que pacotes sejam selecionados em `<input file="type">` diálogo de arquivo aberto
* [[#12404](https://github.com/electron/electron/pull/12404)] correção: processo principal que está bloqueando a issue quando usando diálogo assíncrono
* [[#12043](https://github.com/electron/electron/pull/12043)] correção: o menu de contexto clique em callback
* [[#12527](https://github.com/electron/electron/pull/12527)] correção: vazamento do evento na reutilização do item touchbar
* [[#12352](https://github.com/electron/electron/pull/12352)] correção: erro na bandeja
* [[#12327](https://github.com/electron/electron/pull/12327)] correção: regiões não arrastáveis
* [[#12809](https://github.com/electron/electron/pull/12809)] correção: para evitar a atualização do menu enquanto ele estiver aberto
* [[#13162](https://github.com/electron/electron/pull/13162)] correção: limites de ícone da bandeja não permitindo valores negativos
* [[#13085](https://github.com/electron/electron/pull/13085)] correção: título da bandeja não invertido quando destacado
* [[#12196](https://github.com/electron/electron/pull/12196)] Correção: build Mac quando `enable_run_as_node==false`
* [[#12157](https://github.com/electron/electron/pull/12157)] correção: problemas adicionais em janelas sem frames com vibração
* [[#13326](https://github.com/electron/electron/pull/13326)] correção: para definir o protocolo mac como nenhum após chamar `app.removeAsDefaultProtocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)] correção: uso incorreto de APIs privadas em compilação MAS
* [[#13517](https://github.com/electron/electron/pull/13517)] correção: `tray.setContextMenu` crash
* [[#14205](https://github.com/electron/electron/pull/14205)] correção: pressionar escape em uma caixa de diálogo agora o fecha, mesmo que o `defaultId` esteja definido

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] corrige: `BrowserWindow.focus()` para janelas fora da tela

## Outras notas

* O Visualizador de PDF não está funcionando no momento, mas está sendo trabalhado e estará funcionando novamente em breve
* `TextField` e `Button` APIs são experimentais e estão, portanto, desligados por padrão
  * Eles podem ser ativados com o sinalizador de compilação `enable_view_api`

# Próximos passos

A equipe do Electron continua a trabalhar na definição de nossos processos para atualizações mais rápidas e suaves à medida que buscamos manter a paridade com as cádulas de desenvolvimento do Chromium, Nó e V8.
