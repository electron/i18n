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

Emitido quando há uma atualização disponível. A atualização é baixada automaticamente.

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

## Métodos

O objeto `autoUpdater` possui os seguintes métodos:

### `autoUpdater.setFeedURL(options)`

* `options` Object 
  * String `url`
  * `headers` Object (optional) *macOS* - HTTP request headers.
  * `serverType` String (optional) *macOS* - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Define a `url` e inicializa a atualização automática.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Reinicia o aplicativo e instala a atualização depois de ter sido baixada. Isto só deve ser chamado após `update-downloaded ` ter sido emitido.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** If the application is quit without calling this API after the `update-downloaded` event has been emitted, the application will still be replaced by the updated one on the next run.