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
* String `url`

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

Emitido quando o [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) está prestes a ser continuado em outro dispositivo. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Caso contrário, a operação irá falhar e `continue-activity-error` será chamado.

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
* String `url`
* `error` String - O código do erro
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - Define considerar o certificado como confiável

Emitido quando a verificação do `certificate` para o `url` falha, para confiar no certificado você deve prevenir o comportamento padrão com `event.preventDefault()` e chamar `callback(true)`.

```javascript
const {app} = require('electron')

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

Exits immediately with `exitCode`. `exitCode` defaults to 0.

Todas as janelas serão fechadas imediatamente sem perguntar ao usuário e os eventos `before-quit` e `will-quit` não serão emitidos.

### `app.relaunch([options])`

* `options` Objeto (opcional) 
  * `args` String[] (optional)
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
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Objeto (opcional) 
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

Este método define o executável atual como o manipulador padrão de um protocolo (também conhecido como esquema de URI). Com ele, é possível integrar sua aplicação com o sistema operacional de forma mais profunda. Assim que registrado, todos os links com `seu-protocolo://` serão abertos com o executável atual. O link inteiro, incluindo o protocolo, será passado para a sua aplicação como um parâmetro.

No Windows, você pode informar um caminho opcional de parâmetros, o caminho para seu executável e args, um array de argumentos a serem passados ao seu executável quando for iniciado.

**Nota:** No macOS, você só pode registrar protocolos que foram adicionados à `info.plist` da sua aplicação, a qual não pode ser modificada em tempo de execução. No entanto, você pode alterar esse arquivo com um editor de texto simples ou um script durante o tempo de compilação. Caso precise de mais detalhes, consulte a [documentação da Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115).

A API usa internamente o Registro do Windows e o LSSetDefaultHandlerForURLScheme.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - O nome do protocolo sem `://`.
* `path` String (opcional) *Windows* - O padrão é `process.execPath`
* `args` String[] (opcional) *Windows* - O padrão é um array vazio

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

Esse método verifica se o executável atual é o manipulador padrão de um protocolo (também conhecido como esquema de URI). Caso seja, ele removerá a aplicação como o manipulador padrão.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - O nome do protocolo sem `://`.
* `path` String (opcional) *Windows* - O padrão é `process.execPath`
* `args` String[] (opcional) *Windows* - O padrão é um array vazio

Retorna `Boolean`

Esse método verifica se o executável atual é o manipulador padrão de um protocolo (também conhecido como esquema de URI). Caso seja, ele retornará true. Caso contrário, ele retornará false.

**Nota:** No macOS, você pode usar este método para verificar se a aplicação foi registrada como o manipulador padrão de um protocolo. Você também pode verificar isso consultando o `~/Library/Preferences/com.apple.LaunchServices.plist` na máquina macOS. Caso precise de mais detalhes, consulte a [documentação da Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme).

A API usa internamente o Registro do Windows e o LSCopyDefaultHandlerForURLScheme.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Um array de objetos `Task`

Adiciona `tasks` à categoria [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) da JumpList no Windows.

`tasks` é um array de objetos [`Task`](structures/task.md).

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

**Nota:** Se desejar personalizar ainda mais a Jump List, use `app.setJumpList(categories)` em vez deste método.

### `app.getJumpListSettings()` *Windows*

Retorna `Object`:

* `minItems` Integer - O número mínimo de itens que serão mostrados na Jump List (para uma descrição mais detalhada deste valor, consulte a [documentação no MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Um array de objetos `JumpListItem` que correspondem aos itens que o usuário explicitamente removeu das categorias personalizadas da Jump List. Estes itens não devem ser adicionados novamente à Jump List na **próxima** chamada a `app.setJumpList()`. O Windows não irá mostrar nenhuma categoria personalizada que tiver qualquer um dos itens removidos.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) ou `null` - Um array de objetos `JumpListCategory`.

Define ou remove uma Jump List personalizada para a aplicação e retorna uma das seguintes strings:

* `ok` - Nada deu errado.
* `error` - Um ou mais erros ocorreram. Ative a geração de logs em tempo de execução para descobrir a causa provável.
* `invalidSeparatorError` - Foi realizada uma tentativa de adicionar um separador a uma categoria personalizada na Jump List. Separadores são permitidos apenas na categoria `Tasks` padrão.
* `fileTypeRegistrationError` - Foi realizada uma tentativa de adicionar à Jump List um link de arquivo cujo tipo de arquivo não foi registrado para ser manipulado pela aplicação.
* `customCategoryAccessDeniedError` - Categorias personalizadas não podem ser adicionadas à Jump List devido a restrições de privacidade do usuário ou de políticas de grupo.

Se `categories` for `null`, a Jump List personalizada anteriormente definida (se houver) será substituída por uma Jump List padrão para o app (gerenciada pelo Windows).

**Nota:** Se um objeto `JumpListCategory` não tem o `type` nem a propriedade do `name` definido, então seu `type` é assumido como `tasks`. Se a propriedade `name` está definida mas a propriedade `type` é omissa, então o `type` é assumido como `custom`.

**Note:** Os usuários podem remover itens de categorias personalizadas, e o Windows não permitirá que um item removido seja adicionado novamente a uma categoria personalizada até **após** a próxima chamada bem-sucedida a `app.setJumpList(categories)`. Qualquer tentativa de adicionar novamente um item removido de uma categoria personalizada antes disso resultará na omissão da categoria inteira da Jump List. A lista dos itens removidos pode ser obtida usando `app.getJumpListSettings()`.

Aqui vai um exemplo muito simples de como criar uma Jump List personalizada:

```javascript
const {app} = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Projetos recentes',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // Como ela tem um nome, `type` já é considerado como "custom"
    name: 'Ferramentas',
    items: [
      {
        type: 'task',
        title: 'Ferramenta A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Executa a ferramenta A'
      },
      {
        type: 'task',
        title: 'Ferramenta B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Executa a ferramenta B'
      }
    ]
  },
  { type: 'frequent' },
  { // Como não tem nome nem tipo, `type` é considerado como sendo "tasks"
    items: [
      {
        type: 'task',
        title: 'Novo projeto',
        program: process.execPath,
        args: '--new-project',
        description: 'Cria um novo projeto.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recuperar projeto',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recupera um projeto'
      }
    ]
  }
])
```

### `app.makeSingleInstance(callback)`

* `callback` Function 
  * `argv` String[] - Um array dos argumentos da linha de comando da segunda instância
  * `workingDirectory` String - O diretório de trabalho da segunda instância

Retorna `Boolean`.

Este método transforma sua aplicação em uma aplicação de instância única - em vez de permitir várias instâncias do seu app rodando ao mesmo tempo, isso irá garantir que apenas uma única instância do seu app seja executada. Quaisquer outras instâncias irão apontar para esta instância e, então, serão finalizadas.

`callback` será chamada pela primeira instância com `callback(argv, workingDirectory)` quando uma segunda instância for executada. `argv` é um array dos argumentos de linha de comando da segunda instância, e `workingDirectory` é o diretório de trabalho atual dela. Geralmente, aplicativos reagem a isso tornando a janela principal deles visível e em primeiro plano.

É garantido que a `callback` será executada após o evento `ready` do objeto `app` ser emitido.

Este método retorna `false` se seu processo for a instância principal da sua aplicação e, nesse caso, seu app deve continuar carregando. E retorna `true` se seu processo enviou seus parâmetros para outra instância; dessa forma, você deve encerrá-lo imediatamente.

No macOS, o sistema impõe o uso de instância única automaticamente quando os usuários tentam abrir uma segunda instância do seu aplicativo no Finder, e os eventos `open-file` e `open-url` serão emitidos nesse caso. Porém, se os usuários iniciarem seu app através da linha de comando, o mecanismo de instância única do sistema será contornado. Por isso, você tem que usar este método para reforçar o uso de instância única.

Aqui vai um exemplo de como ativar a janela da instância principal quando uma segunda instância for iniciada:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Alguém tentou executar uma segunda instância - devemos colocar nossa janela em primeiro plano.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Cria myWindow, carrega o resto do app, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Desfaz todas as restrições que foram criadas pelo `makeSingleInstance`. Isso irá permitir que várias instâncias da aplicação possam ser executadas simultaneamente mais uma vez.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Identificação única da atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Estado específico do app a ser armazenado para uso em outro dispositivo.
* `webpageURL` String (opcional) - A página da Web a ser carregada em um navegador caso nenhum aplicativo adequado para a atividade esteja instalado no dispositivo que irá continuá-la. O esquema deve ser `http` ou `https`.

Cria um `NSUserActivity` e o define como a atividade atual. A atividade, então, é qualificada para ser repassada (via [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)) a outro dispositivo de agora em diante.

### `app.getCurrentActivityType()` *macOS*

Retorna `String` - O tipo da atividade atualmente em execução.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Identificação única da atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalida a atividade de usuário atual do [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html).

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Identificação única da atividade. É mapeada para [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - Estado específico do app a ser armazenado para uso em outro dispositivo.

Atualiza a atividade atual se seu tipo corresponder a `type`, mesclando as entradas de `userInfo` ao seu dicionário `userInfo` atual.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Muda o [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) para `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Object 
  * `certificate` String - Caminho para o arquivo pkcs12.
  * `password` String - Passphrase do certificado.
* `callback` Function 
  * `result` Integer - Resultado da importação.

Importa o certificado em formato pkcs12 ao armazenamento de certificados da plataforma. `callback` é chamada com o `result` da operação de importação. O valor `` indica sucesso, enquanto que qualquer outro valor indica falha de acordo com a [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) do Chromium.

### `app.disableHardwareAcceleration()`

Desativa a aceleração de hardware para o aplicativo atual.

Este método somente pode ser chamado antes do aplicativo estiver pronto.

### `app.disableDomainBlockingFor3DAPIs()`

Por padrão, o Chromium desativa APIs 3D (p. ex: WebGL) em domínios individuais - até o aplicativo ser reiniciado - caso os processos de GPU sofram falhas (crashes) muito frequentes. Esta função desativa este comportamento.

Este método somente pode ser chamado antes do aplicativo estiver pronto.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Retorna [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Os status de recursos gráficos descritos em `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

Muda o selo contador do aplicativo atual. Definí-lo como `` irá ocultar o selo.

No macOS, ele é mostrado no ícone da dock. No Linux, ele só funciona no lançador Unity.

**Nota:** O lançador Unity requer a existência de um arquivo `.desktop` para que isso funcione. Para mais detalhes, leia a [Integração com Ambiente de Trabalho](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Retorna `Integer` - O valor sendo atualmente mostrado no selo contador.

### `app.isUnityRunning()` *Linux*

Retorna `Boolean` - Indica se o ambiente de trabalho atual é o Unity ou não.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (opcional) 
  * `path` String (opcional) *Windows* - O caminho do executável a ser comparado. O padrão é `process.execPath`.
  * `args` String[] (opcional) *Windows* - Os argumentos de linha de comando a serem comparados. O padrão é um array vazio.

Se você fornecer as opções `path` e `args` para `app.setLoginItemSettings` então você precisará passar os mesmos argumentos aqui para `openAtLogin` para ser definido corretamente.

Retorna `Object`:

* `openAtLogin` Boolean - `true` se o aplicativo está configurado para abrir no login.
* `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. Isso indica que o aplicativo não deverá abrir nenhuma janela durante a inicialização. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. Isso indica que o aplicativo deverá restaurar as janelas que foram abertas da última vez que o aplicativo fora fechado. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (opcional) - `true` para abrir o aplicativo após o login, `false` para removê-lo da lista de inicialização automática. O padrão é `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Padrão sendo `false`. O usuário pode editar essa configuração a partir das Preferências do Sistema portanto `app.getLoginItemStatus().wasOpenedAsHidden` deverá ser verificado quando o aplicativo for aberto para saber o valor atual. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) *Windows* - O executável para ser rodado no login. Padrão sendo `process.execPath`.
  * `args` String[] (opcional) *Windows* - Os argumentos da linha de comando para passar para o executável. Padrão sendo uma array vazia. Tome cuidado ao envolver caminhos com aspas.

Define as opções de execução do aplicativo na inicialização do sistema.

Para funcionar com o `autoUpdater` do Electron no Windows, o qual usa o [Squirrel](https://github.com/Squirrel/Squirrel.Windows), recomendamos definir o caminho de inicialização para Update.exe e passar a ele os argumentos que especificam o nome do seu aplicativo. Como por exemplo:

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

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Retorna `Boolean` - `true` se o suporte à acessibilidade do Chrome estiver ativado, `false` caso contrário. Essa API retornará `true` se o uso de tecnologias assistivas, tais como leitores de tela, foi detectado. Consulte https://www.chromium.org/developers/design-documents/accessibility para mais detalhes.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Ativa ou desativa a renderização da [árvore de acessibilidade](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Ativa manualmente o suporte à acessibilidade do Chrome, permitindo expor uma opção para ativar/desativar a acessibilidade nas configurações do aplicativo. https://www.chromium.org/developers/design-documents/accessibility para mais detalhes. Desativado por padrão.

**Nota:** A renderização da árvore de acessibilidade pode afetar o desempenho do seu aplicativo de forma significativa. Ela não deve ser ativada por padrão.

### `app.setAboutPanelOptions(options)` no *macOS*

* `options` Object 
  * `applicationName` String (opcional) - O nome do aplicativo.
  * `applicationVersion` String (opcional) - A versão do aplicativo.
  * `copyright` String (opcional) - Informações de copyright.
  * `credits` String (opcional) - Informações de créditos.
  * `versão` String (opcional) - O número da versão de compilação do aplicativo.

Define as opções do painel sobre. Isto substituirá os valores definidos no arquivo `.plist` do aplicativo. Consulte a [documentação da Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) para mais detalhes.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - Uma opção de linha de comando
* `value` String - (opcional) - Um valor para a opção desejada

Insere uma opção (com um `value` opcional) à linha de comando do Chromium.

**Nota:** Isso não afetará o `process.argv`, e é principalmente usado por desenvolvedores para controlar alguns comportamentos de baixo nível do Chromium.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

Este método somente pode ser chamado antes do aplicativo estiver pronto.

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

Esconde o ícone na Dock.

### `app.dock.show()` no *macOS*

Mostra o ícone na Dock.

### `app.dock.isVisible()` no *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` no *macOS*

* `menu` [Menu](menu.md)

Define o [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103) da aplicação.

### `app.dock.setIcon(image)` no *macOS*

* `image` ([NativeImage](native-image.md) | String)

Define a `imagem` associada com o ícone do dock.