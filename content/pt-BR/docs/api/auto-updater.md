# autoUpdater

> Habilita aplicações a se atualizarem automaticamente.

Processo: [Main](../glossary.md#main-process)

**Você pode encontrar um guia detalhado sobre como implementar atualizações em sua aplicação [aqui](../tutorial/updates.md).**

## Avisos de plataforma

Atualmente, apenas macOS e Windows são suportados. Não existe suporte interno para atualização automática no Linux, portanto, é recomendado utilizar um gerenciador de pacotes para atualizar sua aplicação.

Além disso, existem algumas diferenças sutis em cada plataforma:

### macOS

No macOS, o módulo `autoUpdater` é construído em cima do [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), ou seja, você não precisa de nenhuma configuração especial para que funcione. Para os requisitos do lado do servidor, você pode ler o [Suporte do servidor](https://github.com/Squirrel/Squirrel.Mac#server-support). Observe que o [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) aplica-se a todas as solicitações feitas como parte do processo de atualização. Aplicações que precisam desativar o ATS podem adicionar a chave `NSAllowsArbitraryLoads` no plist de sua aplicação.

**Nota:** Seu aplicativo deve ser assinado para atualizações automáticas no macOS. Este é um requisito do `Squirrel.Mac`.

### Windows

No Windows, você precisa instalar sua aplicação na máquina de um usuário antes de utilizar o `autoUpdater`, por isso é recomendado utilizar os pacotes [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) ou o [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) para gerar um instalador do Windows.

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). Também é recomendável utilizar o [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) para obter atalhos da área de trabalho para sua aplicação.

O instalador gerado com Squirrel irá criar um ícone de atalho com uma [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) no formato `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, são exemplos `com.squirrel.slack.Slack` e `com.squirrel.code.Code`. Você deve usar o mesmo ID para sua aplicação com a API `app.setAppUserModelId`, caso contrário, o Windows não será capaz de fixar sua aplicação corretamente na barra de tarefas.

Unlike Squirrel.Mac, Windows can host updates on S3 or any other static file host. You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

## Eventos

The `autoUpdater` object emits the following events:

### Event: 'error'

Retorna:

* `error` Error

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

Retorna:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Métodos

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders` Object *macOS* (optional) - HTTP request headers.

Define a `url` e inicializa a atualização automática.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Reinicia o aplicativo e instala a atualização depois de ter sido baixada. Isto só deve ser chamado após `update-downloaded ` ter sido emitido.

**Nota:** `autoUpdater.quitAndInstall()` irá fechar todas as janelas primeiro e somente emitirá o evento `before-quit` em `app` depois disso. This is different from the normal quit event sequence.