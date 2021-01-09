# autoUpdater

> Habilita aplicações a se atualizarem automaticamente.

Processo: [Main](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

## Avisos de plataforma

Atualmente, apenas o macOS e o Windows são suportados. Não há suporte nativo para o atualizador automático no Linux - portanto, recomendamos usar o gerenciador de pacotes da distribuição para atualizar seu app.

Além disso, existem algumas diferenças sutis em cada plataforma:

### macOS

No macOS, o módulo `autoUpdater` é construído em cima do [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), ou seja, você não precisa de nenhuma configuração especial para que funcione. Para os requisitos do lado do servidor, você pode ler o [Suporte do servidor](https://github.com/Squirrel/Squirrel.Mac#server-support). Observe que o [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) aplica-se a todas as solicitações feitas como parte do processo de atualização. Aplicações que precisam desativar o ATS podem adicionar a chave `NSAllowsArbitraryLoads` no plist de sua aplicação.

**Nota:** Seu aplicativo precisa estar assinado para que seja automaticamente atualizado no macOS. Isto é um requisito do `Squirrel.Mac`.

### Windows

No Windows, você precisa instalar sua aplicação na máquina de um usuário antes de utilizar o `autoUpdater`, por isso é recomendado utilizar os pacotes [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) ou o [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) para gerar um instalador do Windows.

Ao usar o [electron-winstaller](https://github.com/electron/windows-installer) ou o [electron-forge](https://github.com/electron-userland/electron-forge) certifique-se que você não tentou atualizar o seu aplicativo [a primeira vez que é executado](https://github.com/electron/windows-installer#handling-squirrel-events) (Veja também [esta questão para mais informações](https://github.com/electron/electron/issues/7155)). Também é recomendado utilizar o [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) para obter atalhos da área de trabalho para sua aplicação.

O instalador gerado com o Squirrel criará um ícone de atalho com um [ID de Modelo da Aplicação do Usuário](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) no formato `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, são exemplos `com.squirrel.slack.Slack` e `com.squirrel.code.Code`. Você deve usar o mesmo ID para sua aplicação com a API `app.setAppUserModelId`, caso contrário, o Windows não será capaz de fixar sua aplicação corretamente na barra de tarefas.

Ao contrário do Squirrel.Mac, o Windows pode hospedar atualizações em S3 ou qualquer outro arquivo estático de hospedagem. Você pode ler a documentação do [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) para obter mais detalhes sobre como funciona o Squirrel.Windows.

## Eventos

O objeto `autoUpdater` emite os seguintes eventos:

### Evento: 'error'

Retorna:

* Erro `error`

Emitido quando há um erro durante a atualização.

### Evento: 'checking-for-update'

Emitido ao verificar se uma atualização começou.

### Evento: 'update-available'

Emitido quando houver uma atualização disponível. A atualização é baixada automaticamente.

### Evento: 'update-not-available'

Emitido quando não há atualização disponível.

### Evento: 'update-downloaded'

Retorna:

* Evento `event`
* String `releaseNotes`
* String `releaseName`
* Data `releaseDate`
* String `updateURL`

Emitido quando uma atualização foi baixada.

No Windows apenas o `releaseName` está disponível.

**Nota:** Não é estritamente necessário tratar este evento. Uma atualização baixada com sucesso ainda será aplicada na próxima vez que o aplicativo iniciar.

### Evento: 'before-quit-for-update'

Este evento é emitido depois de um usuário chamar `quitAndInstall()`.

Quando esta API é chamada, o evento `before-quit` não é emitido antes de todas as janelas serem fechadas. Como resultado, você deve ouvir este evento se você deseja executar ações antes das janelas serem fechadas enquanto um processo é encerrado, Além de ouvir `before-quit`.

## Métodos

O objeto `autoUpdater` possui os seguintes métodos:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * String `url`
  * `headers` Record<String, String> (opcional) _macOS_ - Cabeçalhos da solicitação HTTP.
  * `serverType` String (opcional) _macOS_ - Pode ser `json` ou `default`. Consulte o README do [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) para mais informações.

Define a `url` e inicializa a atualização automática.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Pergunta para o servidor se há alguma atualização. Você precisa chamar o `setFeedURL` antes de usar esta API.

### `autoUpdater.quitAndInstall()`

Reinicia o aplicativo e instala a atualização após ela ter sido baixada. Deve ser chamado apenas após o evento `update-downloaded` ter sido emitido.

Sob o capô chamando `autoUpdater.quitAndInstall()` fechará todos os aplicativos janelas primeiro, e automaticamente chamar `app.quit()` depois de todas as janelas foram Fechado.

**Nota:** Não é estritamente necessário para lidar com este evento. Uma atualização baixada com sucesso ainda será aplicada na próxima vez que o aplicativo for iniciado.
