---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Depois de mais de quatro meses de desenvolvimento, oito lançamentos beta e todo o mundo testando os lançamentos organizados de muitos aplicativos, a versão do Electron 2. .0 agora está disponível a partir de [electronjs.org](https://electronjs.org/).

---

## Processo de lançamento

Começando com a 2.0.0, os lançamentos do Electron seguirão [a versão semântica](https://electronjs.org/blog/electron-2-semantic-boogaloo). Isto significa que a versão principal irá explodir com mais frequência e geralmente será uma grande atualização para o Chromium. Versões de atualização devem ser mais estáveis porque só conterão correções de bugs de alta prioridade.

Electron 2.0.0 também representa uma melhoria na forma como o Electron é estabilizado antes de uma versão principal. Vários aplicativos Electron em grande escala incluíram 2.0.0 betas em rolagens preparadas, proporcionando o melhor loop de feedback já criado pela Electron's para uma série beta.

## Alterações / Novas Funcionalidades

 * Grande parte importante da cadeia de ferramentas do Electron, incluindo Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 no Linux, atualizado corretor ortográfico e Squirrel.
 * [Compras no aplicativo](https://electronjs.org/blog/in-app-purchases) agora são suportadas no MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Nova API para carregar arquivos. [#11565](https://github.com/electron/electron/pull/11565)
 * Nova API para ativar/desativar uma janela. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Novo suporte para registrar mensagens IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * Novos eventos de menu. [#11754](https://github.com/electron/electron/pull/11754)
 * Adicione um evento `desligamento` ao powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Adicione a opção `de afinidade` para coletar várias Windows do Navegador em um único processo. [#11501](https://github.com/electron/electron/pull/11501)
 * Adicione a capacidade para saveDialog para listar extensões disponíveis. [#11873](https://github.com/electron/electron/pull/11873)
 * Suporte para ações de notificação adicionais [#11647](https://github.com/electron/electron/pull/11647)
 * A capacidade de definir o título do botão fechar notificação macOS. [#11654](https://github.com/electron/electron/pull/11654)
 * Adicionar condição para menu.popup(window, callback)
 * Melhorias de memória nos itens de touchbar. [#12527](https://github.com/electron/electron/pull/12527)
 * Checklist de recomendação de segurança melhorada.
 * Adicionar marcadores com escopo aplicação de segurança marcados. [#11711](https://github.com/electron/electron/pull/11711)
 * Adicionar a capacidade de definir argumentos arbitrários em um processo de renderização. [#11850](https://github.com/electron/electron/pull/11850)
 * Adicionar visualização de acesso para o seletor de formato. [#11873](https://github.com/electron/electron/pull/11873)
 * Condição de corrida fixa para delegar. [#12053](https://github.com/electron/electron/pull/12053)
 * Solte o suporte para o arco `mips64el` no Linux. Electron requer o C++14 toolchain, que não estava disponível para esse arco no momento da lançamento. Esperamos voltar a acrescentar apoio no futuro.

## Quebrando alterações da API

 * Removido [obsoleto APIs](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), incluindo:
   * Assinatura `menu.popup` modificada </code>. [#11968](https://github.com/electron/electron/pull/11968)
   * Removido depreciado `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Removido obsoleto `webContents.setZoomLevelLimits` e `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Removed deprecated `clipboard` methods. [#11973](https://github.com/electron/electron/pull/11973)
   * Suporte removido para parâmetros booleanos para `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Correções de Bugs

 * Alterado para certificar-se de que `webContents.isOffscreen()` esteja sempre disponível. [#12531](https://github.com/electron/electron/pull/12531)
 * Corrigido `BrowserWindow.getFocusedWindow()` quando DevTools é desacoplado e focado. [#12554](https://github.com/electron/electron/pull/12554)
 * Precarga fixa que não carrega na renderização da sandboxed se o caminho de pré-carregamento contiver caracteres especiais. [#12643](https://github.com/electron/electron/pull/12643)
 * Corrija o padrão de allowRunningInsecureContent como por documentação. [#12629](https://github.com/electron/electron/pull/12629)
 * Transparência fixa em nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * Problema corrigido com `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * As opções menu.popup são objetos. [#12330](https://github.com/electron/electron/pull/12330)
 * Removida uma condição de corrida entre a nova criação de processo e lançamento de contexto. [#12361](https://github.com/electron/electron/pull/12361)
 * Atualizar regiões arrastáveis ao mudar BrowserView. [#12370](https://github.com/electron/electron/pull/12370)
 * Ativar/desativar teclas alt de tecla no foco de menu corrigido. [#12235](https://github.com/electron/electron/pull/12235)
 * Correção de avisos incorretos na web. [#12236](https://github.com/electron/electron/pull/12236)
 * Corrigido herança de opção 'mostrar' das janelas do pai. [#122444](https://github.com/electron/electron/pull/122444)
 * Certifique-se de que `getLastCrashReport()` é na verdade o último relatório de erro. [#12255](https://github.com/electron/electron/pull/12255)
 * Fixa exigência no caminho de compartilhamento de rede. [#12287](https://github.com/electron/electron/pull/12287)
 * Menu de contexto fixo clique em callback. [#12170](https://github.com/electron/electron/pull/12170)
 * Posição do menu popup fixa. [#12181](https://github.com/electron/electron/pull/12181)
 * Limpeza de loop libuv melhorada. [#11465](https://github.com/electron/electron/pull/11465)
 * Corrigido `hexColorDWORDToRGBA` para cores transparentes. [#11557](https://github.com/electron/electron/pull/11557)
 * Desreferência do ponteiro nulo corrigido com api getWebPreferides. [#12245](https://github.com/electron/electron/pull/12245)
 * Corrigido uma referência cíclica no delegado do menu. [#11967](https://github.com/electron/electron/pull/11967)
 * Filtragem de protocolo fixo de net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimites agora define restrições de escala do user-agent [#12510](https://github.com/electron/electron/pull/12510)
 * Definir padrões apropriados para opções do webview. [#12292](https://github.com/electron/electron/pull/12292)
 * Melhora o apoio à vibração. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Corrigido problema de tempo na instalação de singleton.
 * Cache de produção quebrada corrigido em NotifierSupportsActions()
 * Tornou os papéis de MenuItem compatíveis com camelCase. [#11532](https://github.com/electron/electron/pull/11532)
 * Atualizações melhoradas na barra de toque. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Separadores de menu extras removidos. [#11827](https://github.com/electron/electron/pull/11827)
 * Erro de seletor de Bluetooth fixo. Fecha [#11399](https://github.com/electron/electron/pull/11399).
 * Fixar macos Tela Cheia com o rótulo do item de menu. [#11633](https://github.com/electron/electron/pull/11633)
 * Suprimento de dicas de ferramenta melhorado quando uma janela é desativada. [#11644](https://github.com/electron/electron/pull/11644)
 * Método de visualização web obsoleto. [#11798](https://github.com/electron/electron/pull/11798)
 * Corrigido fechar uma janela aberta de uma visualização de navegador. [#11799](https://github.com/electron/electron/pull/11799)
 * Erro de seletor de Bluetooth fixo. [#11492](https://github.com/electron/electron/pull/11492)
 * Atualizado para usar o agendador de tarefas para app.getFileIcon API. [#11595](https://github.com/electron/electron/pull/11595)
 * Mudado para o evento da mensagem de console `` mesmo ao renderizar a tela. [#11921](https://github.com/electron/electron/pull/11921)
 * Download corrigido de protocolos personalizados usando `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Janelas transparentes fixas que perdem transparência quando os devtools se destacam. [#11956](https://github.com/electron/electron/pull/11956)
 * Corrigidos aplicativos Electron cancelando ou desligando. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * vazamento de evento fixo na reutilização de item touchbar. [#12624](https://github.com/electron/electron/pull/12624)
 * Destaque fixo de bandeja no Modo escuro. [#12398](https://github.com/electron/electron/pull/12398)
 * Processo principal de bloqueio fixo para diálogo assíncrono. [#12407](https://github.com/electron/electron/pull/12407)
 * Corrigido `setTitle` bandeja falha. [#12356](https://github.com/electron/electron/pull/12356)
 * Corrigido falha ao definir o menu de doca. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Melhor notificações no Linux. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Melhor suporte ao tema GTK+ para menus. [#12331](https://github.com/electron/electron/pull/12331)
 * Sair graciosamente do linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Use o nome do aplicativo como ferramenta de dica padrão do ícone da bandeja. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Suporte ao Visual Studio 2017 adicionado. [#11656](https://github.com/electron/electron/pull/11656)
 * Correção de passagem da exceção para o manipulador de falhas do sistema. [#12259](https://github.com/electron/electron/pull/12259)
 * format@@0 Fixed hidden tooltip from minimizated window. [#11644](https://github.com/electron/electron/pull/11644)
 * Corrigido `desktopCapturer` para capturar a tela correta. [#11664](https://github.com/electron/electron/pull/11664)
 * `DesativaçãoHardwareAcceleration corrigida` com transparência. [#11704](https://github.com/electron/electron/pull/11704)

# Próximos passos

A equipe do Electron está trabalhando duro para suportar versões mais recentes do Chromium, Node e v8. Espere 3.0.0-beta.1 em breve!
