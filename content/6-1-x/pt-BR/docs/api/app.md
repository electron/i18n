# app

> Controle os eventos do ciclo de vida da sua aplicação.

Processo: [Main](../glossary.md#main-process)

O seguinte exemplo mostra como encerrar a aplicação quando a última janela é fechada:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Eventos

O objeto `app` emite os seguintes eventos:

### Evento: 'will-finish-launching'

Emitido quando a aplicação termina inicialização básica. No Windows e Linux o evento `will-finish-launching` é o mesmo que o evento `ready`; no macOS, este evento representa a notificação `applicationWillFinishLaunching` de `NSApplication`. Você normalmente poderia escutar os eventos de `open-file` e `open-url` aqui e iniciar o crash reporter e auto atualização.

Na maioria dos casos, você deve fazer tudo no manipulador do evento `ready`.

### Evento: 'ready'

Retorna:

* `launchInfo` Object _macOS_

Emitido quando Electron tiver concluído a inicialização. No macOS, `launchInfo` possui o `userInfo` do `NSUserNotification` que foi utilizado para inicializar a aplicação, caso tenha sido inicializada a partir do Notification Center. Você pode chamar `app.isReady()` para verificar se este evento já foi acionado.

### Evento: 'window-all-closed'

Emitido quando todas as janelas foram fechadas.

Se você não escutar esse evento e todas as janelas forem fechadas, o comportamento padrão é fechar a aplicação. No entanto, se você estiver escutando, você controla se a aplicação fecha ou não. Se o usuário pressionou `Cmd + Q` ou o desenvolvedor chamou `app.quit()`, o Electron irá primeiro tentar fechar todas as janelas e então emitir o evento `will-quit` e neste caso, `window-all-closed` não será emitido.

### Evento: 'before-quit'

Retorna:

* Evento `event`

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Nota:** No Windows, este evento não será emitido se o aplicativo for fechado devido a um desligamento / reinício do sistema ou a um logout do usuário.

### Evento: 'will-quit'

Retorna:

* `event` Event

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

Consulte a descrição do evento `window-all-closed` para as diferenças entre os eventos `will-quit` e `window-all-closed`.

**Nota:** No Windows, este evento não será emitido se o aplicativo for fechado devido a um desligamento / reinício do sistema ou a um logout do usuário.

### Evento: 'quit'

Retorna:

* `event` Event
* `exitCode` Integer

Emitido quando a aplicação esta sendo encerrada(quitting).

**Nota:** No Windows, este evento não será emitido se o aplicativo for fechado devido a um desligamento / reinício do sistema ou a um logout do usuário.

### Evento: 'open-file' _macOS_

Retorna:

* `event` Event
* `path` String

Emitido quando o usuário deseja abrir um arquivo com a aplicação. O evento `open-file` geralmente é emitido quando a aplicação já está aberta e o SO deseja reutilizar a aplicação para abrir o arquivo. `open-file` também é emitido quando um arquivo é solto sobre o dock e a aplicação ainda não está em execução. Certifique-se que o evento `open-file` seja detectado desde o início da aplicação para manipulá-lo (inclusive antes do evento `ready` ser emitido).

Se você deseja manipular esse evento, você deve chamar `event.preventDefault()`.

No Windows, você tem que analisar `process.argv` (no processo principal) para obter o filepath.

### Evento: 'open-url' _macOS_

Retorna:

* `event` Event
* String `url`

Emitido quando o usuário deseja abrir um URL com a aplicação. O arquivo `Info.plist` da sua aplicação deve definir o esquema do URL dentro da chave `CFBundleURLTypes`, e definir `NSPrincipalClass` para `AtomApplication`.

Se você deseja manipular esse evento, você deve chamar `event.preventDefault()`.

### Evento: 'activate' _macOS_

Retorna:

* `event` Event
* `hasVisibleWindows` Boolean

Emitido quando a aplicação é ativada. Várias ações podem disparar esse evento, tais como iniciando o aplicativo pela primeira vez, a tentativa de re-iniciar o aplicativo quando ele já está sendo executado, ou clicando no ícone de barra de tarefas ou doca do aplicativo.

### Evento: 'continue-activity' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contém estados específicos da aplicação guardados pela atividade em outro dispositivo.

Emitido durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quando a atividade em outro dispositivo deseja ser continuada. Você deve chamar `event.preventDefault()` caso queira manipular esse evento.

Uma atividade do usuário pode ser continuada apenas em uma aplicação que tem o mesmo Team ID do desenvolvedor como o aplicativo fonte da atividade e que suporta o tipo da atividade. Tipos de atividade suportadas são especificadas no `Info.plist` do aplicativo sob a chave `NSUserActivityTypes`.

### Evento: 'will-continue-activity' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emitido durante o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) antes de uma atividade em outro dispositivo desejar ser continuada. Você deve chamar `event.preventDefault()` caso queira manipular esse evento.

### Evento: 'continue-activity-error' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Uma string com a descrição traduzida do erro.

Emitido durante o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quando uma atividade de outro dispositivo falha ao ser resumida.

### Evento: 'activity-was-continued' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contém configurações específicas do app armazenadas na atividade.

Emitido durante o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) depois que uma atividade deste dispositivo foi continuada com sucesso em outro dispositivo.

### Evento: 'update-activity-state' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contém configurações específicas do app armazenadas na atividade.

Emitido quando o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) está prestes a ser continuado em outro dispositivo. Se você precisar atualizar o estado a ser transferido, você deve imediatamente chamar `event.preventDefault()`, construir um novo dicionário `userInfo` e chamar `app.updateCurrentActivity()` de forma pontual. Caso contrário, a operação irá falhar e `continue-activity-error` será chamado.

### Evento: 'new-window-for-tab' no _macOS_

Retorna:

* `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### Evento: 'browser-window-blur'

Retorna:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido quando uma [browserWindow](browser-window.md) é desfocada.

### Evento: 'browser-window-focus'

Retorna:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido quando [browserWindow](browser-window.md) é focado.

### Evento: 'browser-window-created'

Retorna:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido quando um novo [browserWindow](browser-window.md) é criado.

### Evento: 'web-contents-created'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitido quando um novo [webContents](web-contents.md) é criado.

### Evento: 'certificate-error'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* String `url`
* `error` String - O código do erro
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Define considerar o certificado como confiável

Emitido quando a verificação do `certificate` para o `url` falha, para confiar no certificado você deve prevenir o comportamento padrão com `event.preventDefault()` e chamar `callback(true)`.

```javascript
const { app } = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Lógica de verificação.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Evento: 'select-client-certificate'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Certificate](structures/certificate.md) (opcional)

Emitido quando um certificado de cliente é solicitado.

O `url` corresponde à entrada de navegação solicitando o certificado do cliente e `callback` pode ser chamado com uma entrada filtrada da lista. Usar `event.preventDefault()` previne a aplicação de utilizar o primeiro certificado da store.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Evento: 'login'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `request` Object
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` String

Emitido quando `webContents` quer fazer uma autenticação básica.

O comportamento padrão é cancelar todas as autenticações. Para sobrescrever isso você deve prevenir o comportamento padrão com `event.preventDefault()` e chamar o `callback(username, password)` com as credenciais.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Evento: 'gpu-process-crashed'

Retorna:

* `event` Evento
* `killed` Boolean

Emitido quando o processo da GPU para de funcionar ou é interrompido.

### Evento: 'renderer-process-crashed'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emitido quando o processo de renderização do `webContents` trava ou é interrompido.

### Event: 'accessibility-support-changed' no _macOS_ e no _Windows_

Retorna:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` quando o suporte a acessibilidade do Chrome estiver ativo, `false` caso contrário.

Emitido quando o suporte de acessibilidade do Chrome muda. Este evento é acionado quando a tecnologias assistivas, tais como leitores de tela, estão habilitadas ou desabilitadas. Veja https://www.chromium.org/developers/design-documents/accessibility para mais detalhes.

### Evento: 'session-created'

Retorna:

* `session` [Session](session.md)

Emitido quando Electron criar uma nova `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Evento: 'second-instance'

Retorna:

* `event` Event
* `argv` String[] - Um array dos argumentos da linha de comando da segunda instância
* `workingDirectory` String - O diretório de trabalho da segunda instância

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Geralmente, aplicativos reagem a isso tornando a janela principal deles visível e em primeiro plano.

Esse evento é garantido que será emitido após o evento `ready` do objeto `app` ser emitido.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Evento: 'remote-require'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Este evento será emitido quando `remote.require()` é chamado no processo de renderização do `webContents`. Evocando `event.preventDefault()` irá prevenir o módulo de ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Evento: 'remote-get-global'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Este evento será emitido quando `remote.getGlobal()` é chamado no processo de renderização do `webContents`. Evocando `event.preventDefault()` irá previnir o global ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Evento: 'remote-get-builtin'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

É emitido quando `remote.getBuiltin()` é chamado pelo processo de renderização de `webContents`. Evocando `event.preventDefault()` irá prevenir o módulo de ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Evento: 'remote-get-current-window'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)

É emitido quando `remote.getCurrentWindow()` é chamado pelo processo de renderização de `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Event: 'remote-get-current-web-contents'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)

É emitido quando `remote.getCurrentWebContents()` é chamado pelo processo de renderização de `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Event: 'remote-get-guest-web-contents'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

## Métodos

O objeto `app` tem os seguintes métodos:

**Nota:** Alguns métodos estão disponíveis somente em sistemas operacionais específicos e são rotulados como tal.

### `app.quit()`

Tenta fechar todas as janelas. O evento `before-quit` será emitido primeiro. Se todas as janelas forem fechadas com sucesso, o evento `will-quit` será emitido e por padrão, e o aplicativo será encerrado.

Este método garante que todos os manipuladores de vento `beforeunload` e `unload` seja executados corretamente. É possível que a janela cancele, retornando `false` no manipulador de eventos `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (opcional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] (opcional)
  * `execPath` String (opcional)

Reinicia a aplicação quando a instância atual sair.

By default, the new instance will use the same working directory and command line arguments with current instance. Quando `args` são especificado, os `args` vão ser passados como argumentos de linha de comando em seu lugar. Quando `execPath` é especificado, o `execPath` será executado no reinício no lugar da aplicação atual.

Note que nesse método a aplicação não fecha quando executado. Você deve chamar `app.quit` ou `app.exit` depois de chamar `app.relaunch` para fazer a aplicação reiniciar.

Quando `app.relaunch` é chamado por várias vezes, várias instâncias serão iniciadas depois da instância atual sair.

Um exemplo de reinício da instância atual imediatamente e adicionar um novo argumento de linha de comando à nova instância:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Retorna `Boolean` - `true` se o Electron tiver inicializado, `false` caso contrário.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. Pode ser usado como uma alternativa conveniente para a verificação `app.isReady()` e subscrever o evento `ready` se a aplicação ainda não estiver pronta.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` no _macOS_

Oculta todas as janelas do aplicativo sem minimizar-las.

### `app.show()` no _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

Retorna `String` - O diretório da aplicação atual.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

Você pode solicitar os seguintes caminhos pelo o nome:

* `home` Diretório central do usuário.
* `appData` Per-user application data directory, which by default points to:
  * `%APPDATA%` no Windows
  * `$XDG_CONFIG_HOME` ou `~/.config` no Linux
  * `~/Library/Application Support` no macOS
* `userData` O diretório que guarda as configurações da sua aplicação, que por padrão é o diretório `appData` anexado com o nome da sua aplicação.
* `temp` Diretório temporário.
* `exe` O arquivo executável atual.
* `module` A biblioteca `libchromiumcontent`.
* `desktop` O diretório da Área de Trabalho do usuário atual.
* `documents` Diretório dos "Meus Documentos" de um usuário.
* `downloads` Diretório dos Downloads de um usuário.
* `music` Diretório para a música de um usuário.
* `pictures` Diretório para as imagens de um usuário.
* `videos` Diretório para os vídeos de um usuário.
* `logs` Diretório que armazena os logs da aplicação.
* `pepperFlashSystemPlugin` Caminho completo para a versão do sistema do plug-in do Pepper Flash.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback` Function
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Obtém o ícone associado a um caminho.

On _Windows_, there are 2 kinds of icons:

* Ícones associados a certas extensões de arquivo, como `.mp3`, `.png`, etc.
* Ícones contidos no próprio arquivo, como `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

**[Deprecated Soon](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Obtém o ícone associado a um caminho.

No _Windows_, há 2 tipos de ícones:

* Ícones associados a certas extensões de arquivo, como `.mp3`, `.png`, etc.
* Ícones contidos no próprio arquivo, como `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` String

Muda o `path` à um diretório especial ou arquivo relacionado ao `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

Você pode modificar apenas caminhos de um `name` definidos no `app.getPath`.

Por padrão, cachês e cookies de páginas web serão guardados dentro do diretório `userData`. Se você quer mudar esse local, você deve modificar o caminho `userData` antes que o evento `ready` do `app` seja emitido.

### `app.getVersion()`

Retorna `String` - A versão da aplicação carregada. Se nenhuma versão é encontrada no `package.json` da aplicação, a versão do conjunto atual ou executável será retornada.

### `app.getName()`

Retorna `String` - O atual nome da aplicação, que é o nome da aplicação no arquivo `package.json`.

Usualmente o campo `name` do `package.json` é um nome com letras minúsculas, de acordo com a especificação dos módulo npm. Você normalmente deve especificar um campo `productName`, que é o nome completo da aplicação contendo letras maiúsculas e minúsculas e qual será preferido por `name` pelo Electron.

### `app.setName(name)`

* `name` String

Sobrescreve o atual nome da aplicação.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

Para definir a localidade, você vai querer usar um switch de linha de comando na inicialização do aplicativo, que pode ser encontrado [aqui](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Nota:** Quando estiver distribuindo seu aplicativo, você também deve entregar a pasta `locales`.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Adiciona o parâmetro `path` à lista de documentos recentes.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Limpa a lista de documentos recentes.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - O nome do protocolo sem `://`. Se você deseja que sua aplicação manipule links `electron://`, utilize este método com o parâmetro `electron`.
* `path` String (opcional) _Windows_ - O padrão é `process.execPath`
* `args` String[] (opcional) _Windows_ - O padrão é um array vazio

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

Este método define o executável atual como o manipulador padrão de um protocolo (também conhecido como esquema de URI). Com ele, é possível integrar sua aplicação com o sistema operacional de forma mais profunda. Assim que registrado, todos os links com `seu-protocolo://` serão abertos com o executável atual. O link inteiro, incluindo o protocolo, será passado para a sua aplicação como um parâmetro.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Nota:** No macOS, você só pode registrar protocolos que foram adicionados à `info.plist` da sua aplicação, a qual não pode ser modificada em tempo de execução. No entanto, você pode alterar esse arquivo com um editor de texto simples ou um script durante o tempo de compilação. Caso precise de mais detalhes, consulte a [documentação da Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115).

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

A API usa internamente o Registro do Windows e o LSSetDefaultHandlerForURLScheme.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - O nome do protocolo sem `://`.
* `path` String (opcional) _Windows_ - O padrão é `process.execPath`
* `args` String[] (opcional) _Windows_ - O padrão é um array vazio

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - O nome do protocolo sem `://`.
* `path` String (opcional) _Windows_ - O padrão é `process.execPath`
* `args` String[] (opcional) _Windows_ - O padrão é um array vazio

Retorna `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Nota:** No macOS, você pode usar este método para verificar se a aplicação foi registrada como o manipulador padrão de um protocolo. Você também pode verificar isso consultando o `~/Library/Preferences/com.apple.LaunchServices.plist` na máquina macOS. Caso precise de mais detalhes, consulte a [documentação da Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme).

A API usa internamente o Registro do Windows e o LSCopyDefaultHandlerForURLScheme.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Um array de objetos `Task`

Adiciona `tasks` à categoria [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) da JumpList no Windows.

`tasks` é um array de objetos [`Task`](structures/task.md).

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

**Nota:** Se desejar personalizar ainda mais a Jump List, use `app.setJumpList(categories)` em vez deste método.

### `app.getJumpListSettings()` _Windows_

Retorna `Object`:

* `minItems` Integer - O número mínimo de itens que serão mostrados na Jump List (para uma descrição mais detalhada deste valor, consulte a [documentação no MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Um array de objetos `JumpListItem` que correspondem aos itens que o usuário explicitamente removeu das categorias personalizadas da Jump List. Estes itens não devem ser adicionados novamente à Jump List na **próxima** chamada a `app.setJumpList()`. O Windows não irá mostrar nenhuma categoria personalizada que tiver qualquer um dos itens removidos.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) ou `null` - Um array de objetos `JumpListCategory`.

Define ou remove uma Jump List personalizada para a aplicação e retorna uma das seguintes strings:

* `ok` - Nada deu errado.
* `error` - Um ou mais erros ocorreram. Ative a geração de logs em tempo de execução para descobrir a causa provável.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - Foi realizada uma tentativa de adicionar à Jump List um link de arquivo cujo tipo de arquivo não foi registrado para ser manipulado pela aplicação.
* `customCategoryAccessDeniedError` - Categorias personalizadas não podem ser adicionadas à Jump List devido a restrições de privacidade do usuário ou de políticas de grupo.

Se `categories` for `null`, a Jump List personalizada anteriormente definida (se houver) será substituída por uma Jump List padrão para o app (gerenciada pelo Windows).

**Nota:** Se um objeto `JumpListCategory` não tem o `type` nem a propriedade do `name` definido, então seu `type` é assumido como `tasks`. Se a propriedade do `name` está definida mas a propriedade do `type` é omissa, então o `type` é assumido como `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Qualquer tentativa de adicionar novamente um item removido de uma categoria personalizada antes disso resultará na omissão da categoria inteira da Jump List. A lista dos itens removidos pode ser obtida usando `app.getJumpListSettings()`.

Aqui vai um exemplo muito simples de como criar uma Jump List personalizada:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Retorna `Boolean`

The return value of this method indicates whether or not this instance of your application successfully obtained the lock.  If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

Aqui vai um exemplo de como ativar a janela da instância principal quando uma segunda instância for iniciada:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Retorna `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Identificação única da atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Estado específico do app a ser armazenado para uso em outro dispositivo.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Cria um `NSUserActivity` e o define como a atividade atual. A atividade, então, é qualificada para ser repassada (via [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)) a outro dispositivo de agora em diante.

### `app.getCurrentActivityType()` _macOS_

Retorna `String` - O tipo da atividade atualmente em execução.

### `app.invalidateCurrentActivity()` _macOS_

* `type` String - Identificação única da atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalida a atividade de usuário atual do [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html).

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Identificação única da atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Estado específico do app a ser armazenado para uso em outro dispositivo.

Atualiza a atividade atual se seu tipo corresponder a `type`, mesclando as entradas de `userInfo` ao seu dicionário `userInfo` atual.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

Muda o [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) para `id`.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `certificate` String - Caminho para o arquivo pkcs12.
  * `password` String - Passphrase do certificado.
* `callback` Function
  * `result` Integer - Resultado da importação.

Importa o certificado em formato pkcs12 ao armazenamento de certificados da plataforma. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Desativa a aceleração de hardware para o aplicativo atual.

Este método somente pode ser chamado antes do aplicativo estiver pronto.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Este método somente pode ser chamado antes do aplicativo estiver pronto.

### `app.getAppMetrics()`

Retorna [`ProcessMetric[]`](structures/process-metric.md): Array de `ProcessMetric` objetos que correspondem a estatísticas de uso de memória e CPU de todos os processos associados ao aplicativo.

### `app.getGPUFeatureStatus()`

Retorna [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Os status de recursos gráficos descritos em `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:
```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```
Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

Muda o selo contador do aplicativo atual. Definí-lo como `0` irá ocultar o selo.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Retorna `Integer` - O valor sendo atualmente mostrado no selo contador.

### `app.isUnityRunning()` _Linux_

Retorna `Boolean` - Indica se o ambiente de trabalho atual é o Unity ou não.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Retorna `Object`:

* `openAtLogin` Boolean - `true` se o aplicativo está configurado para abrir no login.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Isso indica que o aplicativo não deverá abrir nenhuma janela durante a inicialização. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Isso indica que o aplicativo deverá restaurar as janelas que foram abertas da última vez que o aplicativo fora fechado. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Padrão sendo `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Define as opções de execução do aplicativo na inicialização do sistema.

Para funcionar com o `autoUpdater` do Electron no Windows, o qual usa o [Squirrel](https://github.com/Squirrel/Squirrel.Windows), recomendamos definir o caminho de inicialização para Update.exe e passar a ele os argumentos que especificam o nome do seu aplicativo. Como por exemplo:

``` javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Retorna `Boolean` - `true` se o suporte à acessibilidade do Chrome estiver ativado, `false` caso contrário. Essa API retornará `true` se o uso de tecnologias assistivas, tais como leitores de tela, foi detectado. Consulte https://www.chromium.org/developers/design-documents/accessibility para mais detalhes.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Ativa ou desativa a renderização da [árvore de acessibilidade](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Ativa manualmente o suporte à acessibilidade do Chrome, permitindo expor uma opção para ativar/desativar a acessibilidade nas configurações do aplicativo. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Desativado por padrão.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (opcional) - O nome do aplicativo.
  * `applicationVersion` String (opcional) - A versão do aplicativo.
  * `copyright` String (opcional) - Informações de copyright.
  * `versão` String (opcional) - O número da versão de compilação do aplicativo. _macOS_
  * `credits` String (opcional) - Informações de créditos. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

Define as opções do painel sobre. This will override the values defined in the app's `.plist` file on MacOS. Consulte a [documentação da Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) para mais detalhes. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String - (opcional) - Um valor para a opção desejada

Insere uma opção (com um `value` opcional) à linha de comando do Chromium.

**Note:** This will not affect `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Note:** This will not affect `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - Uma opção de linha de comando

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - Uma opção de linha de comando

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

### `app.enableSandbox()` _Experimental_

Enables full sandbox mode on the app.

Este método somente pode ser chamado antes do aplicativo estiver pronto.

### `app.isInApplicationsFolder()` no _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` no _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` an ID representing the request.

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.cancelBounce(id)` _macOS_

* `id` Inteiro

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` _macOS_

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` no _macOS_

Returns `String` - The badge string of the dock.

### `app.dock.hide()` no _macOS_

Esconde o ícone na Dock.

### `app.dock.show()` no _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

### `app.dock.isVisible()` no _macOS_

Returns `Boolean` - Whether the dock icon is visible.

### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.getMenu()` no _macOS_

Returns `Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Define a `imagem` associada com o ícone do dock.

## Propriedades

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Desativado por padrão.

This API must be called after the `ready` event is emitted.

**Nota:** A renderização da árvore de acessibilidade pode afetar o desempenho do seu aplicativo de forma significativa. Ela não deve ser ativada por padrão.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.

### `app.isPackaged`

A `Boolean` property that returns  `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).
