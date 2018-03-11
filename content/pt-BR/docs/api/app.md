# app

> Controle os eventos do ciclo de vida da sua aplicação.

Processo: [Main](../glossary.md#main-process)

O seguinte exemplo mostra como encerrar a aplicação quando a última janela é fechada:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Eventos

O objeto `app` emite os seguintes eventos:

### Evento: 'will-finish-launching'

Emitido quando a aplicação termina inicialização básica. No Windows e Linux o evento `will-finish-launching` é o mesmo que o evento `ready`; no macOS, este evento representa a notificação `applicationWillFinishLaunching` de `NSApplication`. Você normalmente poderia escutar os eventos de `open-file` e `open-url` aqui e iniciar o crash reporter e auto atualização.

Na maioria dos casos, dá para fazer tudo no manipulador do evento `ready`.

### Evento: 'ready'

Retorna:

* `launchInfo` Object *macOS*

Emitido quando Electron tiver concluído a inicialização. No macOS, `launchInfo` possui o `userInfo` do `NSUserNotification` que foi utilizado para inicializar a aplicação, caso tenha sido inicializada a partir do Notification Center. Você pode chamar `app.isReady()` para verificar se este evento já foi acionado.

### Evento: 'window-all-closed'

Emitido quando todas as janelas foram fechadas.

Se você não escutar esse evento e todas as janelas forem fechadas, o comportamento padrão é fechar a aplicação. No entanto, se você estiver escutando, você controla se a aplicação fecha ou não. Se o usuário pressionou `Cmd + Q` ou o desenvolvedor chamou `app.quit()`, o Electron irá primeiro tentar fechar todas as janelas e então emitir o evento `will-quit` e neste caso, `window-all-closed` não será emitido.

### Evento: 'before-quit'

Retorna:

* `event` Event

Emitido antes de a aplicação começar a fechar suas janelas. Chamar `event.preventDefault()` irá impedir o comportamento padrão, que é encerrar a aplicação.

**Nota:** Se o encerramento da aplicação foi iniciado por `autoUpdater.quitAndInstall()`, então `before-quit` é emitido *depois* de lançar o evento `close` em todas as janelas e fechá-las.

### Evento: 'will-quit'

Retorna:

* `event` Event

Emitido quando todas as janelas foram fechadas e a aplicação irá encerrar. Chamar `event.preventDefault()` irá impedir o comportamento padrão, que é encerrar a aplicação.

Consulte a descrição do evento `window-all-closed` para as diferenças entre os eventos `will-quit` e `window-all-closed`.

### Evento: 'quit'

Retorna:

* `event` Event
* `exitCode` Integer

Emitido quando a aplicação esta sendo encerrada(quitting).

### Evento: 'open-file' *macOS*

Retorna:

* `event` Event
* `path` String

Emitido quando o usuário deseja abrir um arquivo com a aplicação. O evento `open-file` geralmente é emitido quando a aplicação já está aberta e o SO deseja reutilizar a aplicação para abrir o arquivo. `open-file` também é emitido quando um arquivo é solto sobre o dock e a aplicação ainda não está em execução. Certifique-se que o evento `open-file` seja detectado desde o início da aplicação para manipulá-lo (inclusive antes do evento `ready` ser emitido).

Se você deseja manipular esse evento, você deve chamar `event.preventDefault()`.

No Windows, você tem que analisar `process.argv` (no processo principal) para obter o filepath.

### Evento: 'open-url' *macOS*

Retorna:

* `event` Event
* `url` String

Emitido quando o usuário deseja abrir um URL com a aplicação. O arquivo `Info.plist` da sua aplicação deve definir o esquema do URL dentro da chave `CFBundleURLTypes`, e definir `NSPrincipalClass` para `AtomApplication`.

Se você deseja manipular esse evento, você deve chamar `event.preventDefault()`.

### Evento: 'activate' *macOS*

Retorna:

* `event` Event
* `hasVisibleWindows` Boolean

Emitido quando a aplicação é ativada. Várias ações podem disparar esse evento, tais como iniciando o aplicativo pela primeira vez, a tentativa de re-iniciar o aplicativo quando ele já está sendo executado, ou clicando no ícone de barra de tarefas ou doca do aplicativo.

### Evento: 'continue-activity' *macOS*

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contém estados específicos da aplicação guardados pela atividade em outro dispositivo.

Emitido durante [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quando a atividade em outro dispositivo deseja ser continuada. Você deve chamar `event.preventDefault()` caso queira manipular esse evento.

Uma atividade do usuário pode ser continuada apenas em uma aplicação que tem o mesmo Team ID do desenvolvedor como o aplicativo fonte da atividade e que suporta o tipo da atividade. Tipos de atividade suportadas são especificadas no `Info.plist` do aplicativo sob a chave `NSUserActivityTypes`.

### Evento: 'will-continue-activity' *macOS*

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emitido durante o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) antes de uma atividade em outro dispositivo desejar ser continuada. Você deve chamar `event.preventDefault()` caso queira manipular esse evento.

### Evento: 'continue-activity-error' *macOS*

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - Uma string com a descrição traduzida do erro.

Emitido durante o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) quando uma atividade de outro dispositivo falha ao ser resumida.

### Evento: 'activity-was-continued' *macOS*

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contém configurações específicas do app armazenadas na atividade.

Emitido durante o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) depois que uma atividade deste dispositivo foi continuada com sucesso em outro dispositivo.

### Evento: 'update-activity-state' *macOS*

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Contém configurações específicas do app armazenadas na atividade.

Emitido quando o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) está prestes a ser continuado em outro dispositivo. Se você precisar atualizar o estado a ser transferido, você deve imediatamente chamar `event.preventDefault()`, construir um novo dicionário `userInfo` e chamar `app.updateCurrentActivity()` de forma pontual. Caso contrário, a operação irá falhar e `continue-activity-error` será chamado.

### Evento: 'new-window-for-tab' no *macOS*

Retorna:

* `event` Event

Emitido quando o usuáro clica no botão de nova guia nativo do macOS. O botão de nova guia somente é visível se a `BrowserWindow` atual tem um `tabbingIdentifier`

### Evento: 'browser-window-blur'

Retorna:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido quando uma [browserWindow](browser-window.md) fica em segundo plano.

### Evento: 'browser-window-focus'

Retorna:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido quando uma [browserWindow](browser-window.md) fica em primeiro plano.

### Evento: 'browser-window-created'

Retorna:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emitido quando uma nova [browserWindow](browser-window.md) é criada.

### Evento: 'web-contents-created'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitido quando um novo [webContents](web-contents.md) é criado.

### Evento: 'certificate-error'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - O código do erro
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - Define considerar o certificado como confiável

Emitido quando a verificação do `certificate` para o `url` falha, para confiar no certificado você deve prevenir o comportamento padrão com `event.preventDefault()` e chamar `callback(true)`.

```javascript
const {app} = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Verificação de lógica.
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
const {app} = require('electron')

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

O comportamento padrão é cancelar todas as autenticações, para superar isso você deve prevenir o comportamento padrão com `event.preventDefault()` e chamar `callback(username, password)` com as credenciais.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Evento: 'gpu-process-crashed'

Retorna:

* `event` Event
* `killed` Boolean

Emitido quando o processo da GPU para de funcionar ou é interrompido.

### Event: 'accessibility-support-changed' no *macOS* e no *Windows*

Retorna:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` quando o suporte a acessibilidade do Chrome estiver ativo, `false` caso contrário.

Emitido quando o suporte de acessibilidade do Chrome muda. Este evento é acionado quando a tecnologias assistivas, tais como leitores de tela, estão habilitadas ou desabilitadas. Veja https://www.chromium.org/developers/design-documents/accessibility para mais detalhes.

## Métodos

O objeto `app` tem os seguintes métodos:

**Nota:** Alguns métodos estão disponíveis somente em sistemas operacionais específicos e são rotulados como tal.

### `app.quit()`

Tenta fechar todas as janelas. O evento `before-quit` será emitido primeiro. Se todas as janelas forem fechadas com sucesso, o evento `will-quit` será emitido e por padrão, e o aplicativo será encerrado.

Este método garante que todos os manipuladores de vento `beforeunload` e `unload` seja executados corretamente. É possível que a janela cancele, retornando `false` no manipulador de eventos `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (opcional)

Sai imediatamente com `exitCode`. `exitCode` padrão é 0.

Todas as janelas serão fechadas imediatamente sem perguntar ao usuário e os eventos `before-quit` e `will-quit` não serão emitidos.

### `app.relaunch([options])`

* `opções` Objeto (opcional) 
  * `args` String[] - (opcional)
  * `execPath` String (opcional)

Reinicia a aplicação quando a instância atual sair.

Por padrão a nova instância utilizará o mesmo diretório em uso e argumentos da linha de comando da instância atual. Quando `args` são especificado, os `args` vão ser passados como argumentos de linha de comando em seu lugar. Quando `execPath` é especificado, o `execPath` será executado no reinício no lugar da aplicação atual.

Note que nesse método a aplicação não fecha quando executado. Você deve chamar `app.quit` ou `app.exit` depois de chamar `app.relaunch` para fazer a aplicação reiniciar.

Quando `app.relaunch` é chamado por várias vezes, várias instâncias serão iniciadas depois da instância atual sair.

Um exemplo de reinício da instância atual imediatamente e adicionar um novo argumento de linha de comando à nova instância:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Retorna `Boolean` - `true` se o Electron tiver inicializado, `false` caso contrário.

### `app.focus()`

No Linux, foca na primeira janela visível. No macOS, torna o aplicativo a aplicação ativa. No Windows, foca na primeira janela da aplicação.

### `app.hide()` no *macOS*

Oculta todas as janelas do aplicativo sem minimizar-las. 

### `app.show()` no *macOS*

Mostra as janelas da aplicação após elas terem sido escondidas. Não foca nelas automaticamente.

### `app.getAppPath()`

Retorna `String` - O diretório da aplicação atual.

### `app.getPath(name)`

* `name` String

Retorna `String` - O caminho para um diretório especial ou arquivo ligado à `name`. Em falha, um `Error` é gerado.

Você pode solicitar os seguintes caminhos pelo o nome:

* `home` Diretório central do usuário.
* `appData` Diretório de dados de usuário específico, que por padrão retorna: 
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
* `pepperFlashSystemPlugin` Caminho completo até a versão do sistema do plugin Pepper Flash.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `opções` Objeto (opcional) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 no *Linux*, 32x32 no *Windows*, não suportado no *macOS*.
* `callback` Function 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Obtém o ícone associado a um caminho.

No *Windows*, há 2 tipos de ícones:

* Ícones associados a certas extensões de arquivo, como `.mp3`, `.png`, etc.
* Ícones contidos no próprio arquivo, como `.exe`, `.dll`, `.ico`.

No *Linux* e *macOS*, os ícones dependem da aplicação associada ao tipo mime de arquivo.

### `app.setPath(name, path)`

* `name` String
* `path` String

Muda o `path` à um diretório especial ou arquivo relacionado ao `name`. Se o caminho aponta um diretório inexistente, o diretório será criado por esse método. Caso falhe, um `Error` é gerado.

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

Retorna `String` - A atual localização da aplicação. Possíveis retornos estão documentados [aqui](locales.md).

**Nota:** Quando estiver distribuindo seu aplicativo, você também deve entregar a pasta `locales`.

**Nota:** No Windows, você deve chamá-la após os eventos `ready` serem emitidos.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Adiciona o parâmetro `path` à lista de documentos recentes.

Esta lista é gerenciada pelo SO. No Windows você pode acessá-la a partir da barra de tarefas e no macOS você pode acessá-la a partir do dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Limpa a lista de documentos recentes.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - O nome do protocolo sem `://`. Se você deseja que sua aplicação manipule links `electron://`, utilize este método com o parâmetro `electron`.
* `path` String (opcional) *Windows* - O padrão é `process.execPath`
* `args` String[] (opcional) *Windows* - O padrão é um array vazio

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

Este método define o executável atual como o programa padrão para um protocolo (também conhecido como esquema de URI). Com ele, é possível integrar sua aplicação com o sistema operacional de forma mais profunda. Assim que registrado, todos os links com `seu-protocolo://` serão abertos com o executável atual. O link inteiro, incluindo o protocolo, será passado para a sua aplicação como um parâmetro.

On Windows you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - O nome do protocolo sem `://`.
* `path` String (opcional) *Windows* - O padrão é `process.execPath`
* `args` String[] (opcional) *Windows* - O padrão é um array vazio

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - O nome do protocolo sem `://`.
* `path` String (opcional) *Windows* - O padrão é `process.execPath`
* `args` String[] (opcional) *Windows* - O padrão é um array vazio

Returns `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Returns `Boolean` - Whether the call succeeded.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

Returns `Object`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Nothing went wrong.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Nota:** Se um objeto `JumpListCategory` não tem o `type` nem a propriedade do `name` definido, então seu `type` é assumido como `tasks`. Se a propriedade do `name` está definida mas a propriedade do `type` é omissa, então o `type` é assumido como `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

```javascript
const {app} = require('electron')

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

### `app.makeSingleInstance(callback)`

* `callback` Function 
  * `argv` String[] - An array of the second instance's command line arguments
  * `workingDirectory` String - The second instance's working directory

Retorna `Boolean`.

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.

This method returns `false` if your process is the primary instance of the application and your app should continue loading. And returns `true` if your process has sent its parameters to another instance, and you should immediately quit.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Create myWindow, load the rest of the app, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` no *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` no *macOS*

* `type` String - Uniquely identifies the activity. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Uniquely identifies the activity. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `opções` Object 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Function 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMemoryInfo()` *Deprecated*

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app. **Note:** This method is deprecated, use `app.getAppMetrics()` instead.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Returns `Boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `opções` Objeto (opcional) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean - `true` if the app is set to open as hidden at login. This setting is only supported on macOS.
* `wasOpenedAtLogin` Boolean - `true` if the app was opened at login automatically. This setting is only supported on macOS.
* `wasOpenedAsHidden` Boolean - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is only supported on macOS.
* `restoreState` Boolean - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is only supported on macOS.

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is only supported on macOS.
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. For example:

```javascript
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

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(options)` no *macOS*

* `opções` Object 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` no *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` no *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` no *macOS*

* `id` Inteiro

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` no *macOS*

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` no *macOS*

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` no *macOS*

Returns `String` - The badge string of the dock.

### `app.dock.hide()` no *macOS*

Hides the dock icon.

### `app.dock.show()` no *macOS*

Shows the dock icon.

### `app.dock.isVisible()` no *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` no *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` no *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.