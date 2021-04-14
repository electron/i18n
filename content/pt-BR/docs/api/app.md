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

* `event` Event
* `launchInfo` Record<string, any> |  Notificações [Reponse](structures/notification-response.md) __do macOS

Emitido uma vez, quando a Electron terminou de inicializar. No macOS, `launchInfo` detém a `userInfo` do `NSUserNotification` ou informações de [`UNNotificationResponse`](structures/notification-response.md) que foi usada para abrir o aplicativo , caso fosse lançado da Central de Notificação. Você também pode ligar para `app.isReady()` para verificar se este evento já foi disparado e `app.whenReady()` para obter uma Promessa que é cumprida quando o Elétron é inicializado.

### Evento: 'window-all-closed'

Emitido quando todas as janelas foram fechadas.

Se você não escutar esse evento e todas as janelas forem fechadas, o comportamento padrão é fechar a aplicação. No entanto, se você estiver escutando, você controla se a aplicação fecha ou não. Se o usuário pressionou `Cmd + Q` ou o desenvolvedor chamou `app.quit()`, o Electron irá primeiro tentar fechar todas as janelas e então emitir o evento `will-quit` e neste caso, `window-all-closed` não será emitido.

### Evento: 'before-quit'

Retorna:

* `event` Event

Emitido antes do aplicativo começar a fechar suas janelas. Chamar `event.preventDefault()` impedirá o comportamento padrão, que está terminando o aplicativo.

**Nota:** Se o encerramento da aplicação for iniciado pelo `autoUpdater.quitAndInstall()`, então o `before-quit` é emitido *depois* de lançar o evento `close` em todas as janelas e fechá-las.

**Nota:** No Windows, este evento não será emitido se o aplicativo for fechado devido a um desligamento / reinício do sistema ou a um logout do usuário.

### Evento: 'will-quit'

Retorna:

* `event` Event

Emitido quando todas as janelas foram fechadas e o aplicativo vai parar. Chamar `event.preventDefault()` impedirá o comportamento padrão, que está terminando o aplicativo.

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

Emitido quando o usuário deseja abrir um URL com a aplicação. O arquivo `Info.plist` do aplicativo deve definir o esquema de URL na tecla `CFBundleURLTypes` e definir `NSPrincipalClass` para `AtomApplication`.

Se você deseja manipular esse evento, você deve chamar `event.preventDefault()`.

### Evento: 'activate' _macOS_

Retorna:

* `event` Event
* `hasVisibleWindows` Boolean

Emitido quando a aplicação é ativada. Várias ações podem disparar esse evento, tais como iniciando o aplicativo pela primeira vez, a tentativa de re-iniciar o aplicativo quando ele já está sendo executado, ou clicando no ícone de barra de tarefas ou doca do aplicativo.

### Evento: 'did-become-active' _macOS_

Retorna:

* `event` Event

Emitido quando a aplicação mac se torna ativa. Diferença do `evento` ativo é que `ativado` é emitido toda vez que o app se torna ativo, não somente quando o ícone do Dock é clicado ou a aplicação é relançada.

### Evento: 'continue-activity' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`][activity-type].
* `userInfo` desconhecido - Contém um estado específico de aplicativo armazenado pela atividade em outro dispositivo.

Emitido durante [Handoff][handoff] quando a atividade em outro dispositivo deseja ser continuada. Você deve chamar `event.preventDefault()` caso queira manipular esse evento.

Uma atividade do usuário pode ser continuada apenas em uma aplicação que tem o mesmo Team ID do desenvolvedor como o aplicativo fonte da atividade e que suporta o tipo da atividade. Tipos de atividade suportadas são especificadas no `Info.plist` do aplicativo sob a chave `NSUserActivityTypes`.

### Evento: 'will-continue-activity' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`][activity-type].

Emitido durante o [Handoff][handoff] antes de uma atividade em outro dispositivo desejar ser continuada. Você deve chamar `event.preventDefault()` caso queira manipular esse evento.

### Evento: 'continue-activity-error' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`][activity-type].
* `error` String - Uma string com a descrição traduzida do erro.

Emitido durante o [Handoff][handoff] quando uma atividade de outro dispositivo falha ao ser resumida.

### Evento: 'activity-was-continued' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`][activity-type].
* `userInfo` desconhecido - Contém um estado específico do aplicativo armazenado pela atividade.

Emitido durante o [Handoff][handoff] depois que uma atividade deste dispositivo foi continuada com sucesso em outro dispositivo.

### Evento: 'update-activity-state' _macOS_

Retorna:

* `event` Event
* `type` String - Uma string identificando a atividade. É mapeada para [`NSUserActivity.activityType`][activity-type].
* `userInfo` desconhecido - Contém um estado específico do aplicativo armazenado pela atividade.

Emitido quando o [Handoff][handoff] está prestes a ser continuado em outro dispositivo. Se você precisar atualizar o estado para ser transferido, você deve ligar para `event.preventDefault()` imediatamente, construir um novo dicionário de `userInfo` e chamá `app.updateCurrentActivity()` em tempo hábil. Caso contrário, a operação irá falhar e `continue-activity-error` será chamado.

### Evento: 'new-window-for-tab' no _macOS_

Retorna:

* `event` Event

Emitido quando o usuário clica no novo botão de guia macOS nativo. O novo botão de guia só é visível se o `BrowserWindow` atual tiver um `tabbingIdentifier`

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
* objeto `authenticationResponseDetails`
  * `url` URL
* objeto `authInfo`
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (opcional)
  * `password` String (opcional)

Emitido quando `webContents` quer fazer uma autenticação básica.

O comportamento padrão é cancelar todas as autenticações. Para sobrescrever isso você deve prevenir o comportamento padrão com `event.preventDefault()` e chamar o `callback(username, password)` com as credenciais.

```javascript
const { app } = require ('electron')

app.on('login', (evento, webContents, detalhes, authInfo, callback) => {
  event.preventDefault()
  callback ('nome de usuário', 'segredo')
})
```

Se `callback` for chamada sem nome de usuário ou senha, a solicitação de autenticação será cancelada e o erro de autenticação será devolvido à página .

### Evento: 'gpu-info-update'

Emitido sempre que houver uma atualização de informações de GPU.

### Evento 'processo-gpu-caiu _ Depreciado_

Retorna:

* `event` Event
* `killed` Boolean

Emitido quando o processo de GPU falha ou é morto.

**Depreciado** Este evento é substituído pelo evento `processo-filho-finalizado` que contém mais informação sobre porque o processo filho desapareceu. Não é sempre porque caiu. O `killed` booleano pode ser substituído por verificando `reason === 'killed'` quando você mudar para esse evento.

### Evento: 'processo-renderizador-rompido' _Depreciado_

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emitido quando o processo de renderização do `webContents` trava ou é interrompido.

**Preterido:** Este evento é superado pelo evento `render-process-gone` que contém mais informações sobre por que o processo de renderização desapareceu. Não é sempre porque caiu.  O `killed` booleano pode ser substituído por verificando `reason === 'killed'` quando você mudar para esse evento.

### Evento: 'render-processo-gone'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* objeto `details`
  * `reason` String - A razão pela qual o processo de renderização se foi.  Valores possíveis:
    * `clean-exit` - Processo saiu com um código de saída de zero
    * `abnormal-exit` - Processo saiu com um código de saída não-zero
    * `killed` - Processo foi enviado um SIGTERM ou de outra forma morto externamente
    * `crashed` - Processo caiu
    * `oom` - Processo ficou sem memória
    * `launch-failed` - Processo nunca lançado com sucesso
    * `integrity-failure` - Verificações de integridade de código do Windows falharam
  * `exitCode` Integer - O código de saída do processo, a menos que `reason` seja `launch-failed`, nesse caso `exitCode` será um código de erro de falha de lançamento específico plataforma.

Emitido quando o processo de renderização desaparece inesperadamente.  Isso normalmente é porque foi acidentado ou morto.

### Evento: 'processo infantil'

Retorna:

* `event` Event
* objeto `details`
  * `type` String - Tipo de processo. Um dos seguintes valores:
    * `Utilidade`
    * `Zigoto`
    * `Ajuda ao Sandbox`
    * `GPU`
    * `Plugin de pimenta`
    * `Corretor de plugins de pimenta`
    * `Desconhecido`
  * `reason` String - A razão pela qual o processo infantil se foi. Valores possíveis:
    * `clean-exit` - Processo saiu com um código de saída de zero
    * `abnormal-exit` - Processo saiu com um código de saída não-zero
    * `killed` - Processo foi enviado um SIGTERM ou de outra forma morto externamente
    * `crashed` - Processo caiu
    * `oom` - Processo ficou sem memória
    * `launch-failed` - Processo nunca lançado com sucesso
    * `integrity-failure` - Verificações de integridade de código do Windows falharam
  * `exitCode` Número - O código de saída do processo (por exemplo, status de waitpid se no posix, do GetExitCodeProcess no Windows).
  * `serviceName` String (opcional) - O nome não localizado do processo.
  * `name` String (opcional) - O nome do processo. Exemplos de utilidade: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.

Emitido quando o processo da criança desaparece inesperadamente. Isso normalmente é porque foi acidentado ou morto. Não inclui processos de renderização.

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
const { app } = require ('electron')

app.on ('session-created', (session) => {
  console.log(sessão)
})
```

### Evento: 'second-instance'

Retorna:

* `event` Event
* `argv` String[] - Um array dos argumentos da linha de comando da segunda instância
* `workingDirectory` String - O diretório de trabalho da segunda instância

Este evento será emitido dentro da instância primária do seu aplicativo quando uma segunda instância for executada e chamada `app.requestSingleInstanceLock()`.

`argv` é um Array dos argumentos da linha de comando da segunda instância, e `workingDirectory` é o seu diretório de trabalho atual. Geralmente, aplicativos reagem a isso tornando a janela principal deles visível e em primeiro plano.

**Nota:** Se a segunda instância for iniciada por um usuário diferente do primeiro, a matriz `argv` não incluirá os argumentos.

Esse evento é garantido que será emitido após o evento `ready` do objeto `app` ser emitido.

**Nota:** argumentos da linha de comando Extra podem ser adicionados pelo Chromium, como `--original-process-start-time`.

### Evento: 'desktop-capturer-get-sources'

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitido quando `desktopCapturer.getSources()` é chamado no processo renderizador de `webContents`. Ligar para `event.preventDefault()` fará com que devolva fontes vazias.

### Evento: 'remota-require' __preterido

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Este evento será emitido quando `remote.require()` é chamado no processo de renderização do `webContents`. Evocando `event.preventDefault()` irá prevenir o módulo de ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Evento: 'remoto-get-global' __preterido

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Este evento será emitido quando `remote.getGlobal()` é chamado no processo de renderização do `webContents`. Evocando `event.preventDefault()` irá previnir o global ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Evento: ' _de  preterido_s

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

É emitido quando `remote.getBuiltin()` é chamado pelo processo de renderização de `webContents`. Evocando `event.preventDefault()` irá prevenir o módulo de ser retornado. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Evento: 'janela remota-get-current-window' __preterido

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)

É emitido quando `remote.getCurrentWindow()` é chamado pelo processo de renderização de `webContents`. Ligar para `event.preventDefault()` impedirá que o objeto seja devolvido. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

### Evento: 'remote-get-current-content' _Preterido_

Retorna:

* `event` Event
* `webContents` [WebContents](web-contents.md)

É emitido quando `remote.getCurrentWebContents()` é chamado pelo processo de renderização de `webContents`. Ligar para `event.preventDefault()` impedirá que o objeto seja devolvido. Valores personalizados podem ser retornados pela configuração `event.returnValue`.

## Métodos

O objeto `app` tem os seguintes métodos:

**Nota:** Alguns métodos estão disponíveis somente em sistemas operacionais específicos e são rotulados como tal.

### `app.quit()`

Tenta fechar todas as janelas. O evento `before-quit` será emitido primeiro. Se todas as janelas forem fechadas com sucesso, o evento `will-quit` será emitido e por padrão, e o aplicativo será encerrado.

Este método garante que todos os manipuladores de vento `beforeunload` e `unload` seja executados corretamente. É possível que a janela cancele, retornando `false` no manipulador de eventos `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (opcional)

Sai imediatamente com `exitCode`. `exitCode` padrão para 0.

Todas as janelas serão fechadas imediatamente sem pedir ao usuário, e os eventos `before-quit` e `will-quit` não serão emitidos.

### `app.relaunch([options])`

* objeto `options` (opcional)
  * `args` String[] (opcional)
  * `execPath` String (opcional)

Reinicia a aplicação quando a instância atual sair.

Por padrão, a nova instância usará o mesmo diretório de trabalho e linha de comando argumentos com a instância atual. Quando `args` são especificado, os `args` vão ser passados como argumentos de linha de comando em seu lugar. Quando `execPath` é especificado, o `execPath` será executado no reinício no lugar da aplicação atual.

Note que nesse método a aplicação não fecha quando executado. Você deve chamar `app.quit` ou `app.exit` depois de chamar `app.relaunch` para fazer a aplicação reiniciar.

Quando `app.relaunch` é chamado por várias vezes, várias instâncias serão iniciadas depois da instância atual sair.

Um exemplo de reinício da instância atual imediatamente e adicionar um novo argumento de linha de comando à nova instância:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch')})
app.exit(0)
```

### `app.isReady()`

Retorna `Boolean` - `true` se o Electron tiver inicializado, `false` caso contrário. Veja também `app.whenReady()`.

### `app.whenReady()`

Retorna `Promise<void>` - cumprida quando Elétron é inicializado. Pode ser usado como uma alternativa conveniente para a verificação `app.isReady()` e subscrever o evento `ready` se a aplicação ainda não estiver pronta.

### `app.focus([options])`

* objeto `options` (opcional)
  * `steal` Boolean __ do macOS - Faça do receptor o aplicativo ativo mesmo que outro aplicativo esteja ativo no momento.

No Linux, foca-se na primeira janela visível. No macOS, torna o aplicativo o aplicativo ativo. No Windows, foca na primeira janela do aplicativo.

Você deve procurar usar a opção `steal` o mais com moderação possível.

### `app.hide()` no _macOS_

Oculta todas as janelas do aplicativo sem minimizar-las.

### `app.show()` no _macOS_

Mostra janelas de aplicativos depois que foram escondidas. Não se concentra automaticamente eles.

### `app.setAppLogsPath ([path])`

* `path` String (opcional) - Um caminho personalizado para seus logs. Deve ser absoluto.

Define ou cria um diretório de logs do seu aplicativo que pode então ser manipulado com `app.getPath()` ou `app.setPath(pathName, newPath)`.

Chamar `app.setAppLogsPath()` sem um parâmetro `path` fará com que este diretório seja definido para `~/Library/Logs/YourAppName` em __macOS , e dentro do diretório de `userData` em __ Linux e __do Windows .

### `app.getAppPath()`

Retorna `String` - O diretório da aplicação atual.

### `app.getPath(name)`

* `name` String - Você pode solicitar os seguintes caminhos pelo nome:
  * `home` Diretório central do usuário.
  * `appData` diretório de dados de aplicativo por usuário, que por padrão aponta para:
    * `%APPDATA%` no Windows
    * `$XDG_CONFIG_HOME` ou `~/.config` no Linux
    * `~/Library/Application Support` no macOS
  * `userData` O diretório que guarda as configurações da sua aplicação, que por padrão é o diretório `appData` anexado com o nome da sua aplicação.
  * `cache`
  * `temp` Diretório temporário.
  * `exe` O arquivo executável atual.
  * `module` A biblioteca `libchromiumcontent`.
  * `desktop` O diretório da Área de Trabalho do usuário atual.
  * `documents` Diretório dos "Meus Documentos" de um usuário.
  * `downloads` Diretório dos Downloads de um usuário.
  * `music` Diretório para a música de um usuário.
  * `pictures` Diretório para as imagens de um usuário.
  * `videos` Diretório para os vídeos de um usuário.
  * `recent` Diretório para os arquivos recentes do usuário (somente Windows).
  * `logs` Diretório que armazena os logs da aplicação.
  * `crashDumps` Diretório onde os depósitos de acidentes são armazenados.

Devoluções `String` - Um caminho para um diretório ou arquivo especial associado ao `name`. Em falha, um `Error` é jogado.

Se `app.getPath('logs')` for chamado sem o chamado `app.setAppLogsPath()` ser chamado primeiro, um diretório de log padrão será criado equivalente a chamar `app.setAppLogsPath()` sem um parâmetro `path` .

### `app.getFileIcon(caminho[, opções])`

* `path` String
* objeto `options` (opcional)
  * `size` Cordas
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 no _Linux_, 32x32 no _Windows_, não suportado no _macOS_.

Retorna `Promise<NativeImage>` - cumprido com o ícone do aplicativo, que é um</a>

NativeImage .</p> 

Obtém o ícone associado a um caminho.

No _Windows_, há 2 tipos de ícones:

* Ícones associados a certas extensões de arquivo, como `.mp3`, `.png`, etc.
* Ícones contidos no próprio arquivo, como `.exe`, `.dll`, `.ico`.

Em __ Linux e __do macOS, os ícones dependem do aplicativo associado ao tipo de mímica de arquivos.



### `app.setPath(name, path)`

* `name` String
* `path` String

Muda o `path` à um diretório especial ou arquivo relacionado ao `name`. Se o caminho especificar um diretório que não existe, uma `Error` é lançada. Nesse caso, o diretório deve ser criado com `fs.mkdirSync` ou similar.

Você pode modificar apenas caminhos de um `name` definidos no `app.getPath`.

Por padrão, cachês e cookies de páginas web serão guardados dentro do diretório `userData`. Se você quer mudar esse local, você deve modificar o caminho `userData` antes que o evento `ready` do `app` seja emitido.



### `app.getVersion()`

Retorna `String` - A versão da aplicação carregada. Se nenhuma versão é encontrada no `package.json` da aplicação, a versão do conjunto atual ou executável será retornada.



### `app.getName()`

Retorna `String` - O atual nome da aplicação, que é o nome da aplicação no arquivo `package.json`.

Normalmente, o campo `name` de `package.json` é um nome minúsculo curto, de acordo com à especificação dos módulos npm. Você normalmente deve especificar um campo `productName`, que é o nome completo da aplicação contendo letras maiúsculas e minúsculas e qual será preferido por `name` pelo Electron.



### `app.setName(name)`

* `name` String

Sobrescreve o atual nome da aplicação.

**Nota:** Esta função substitui o nome usado internamente pela Electron; não afeta o nome que o SISTEMA OPERACIONAL usa.



### `app.getLocale()`

Devoluções `String` - Local de aplicação atual. Os possíveis valores de retorno estão documentados [aqui](locales.md).

Para definir a localidade, você vai querer usar um switch de linha de comando na inicialização do aplicativo, que pode ser encontrado [aqui](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md).

**Nota:** Quando estiver distribuindo seu aplicativo, você também deve entregar a pasta `locales`.

**Nota:** No Windows, você tem que chamá-lo depois que os eventos de `ready` são emitidos.



### `app.getLocaleCountryCode()`

Devoluções `String` - Locale de duas letras do sistema operacional usuário [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) código de país. O valor é retirado das APIs nativas do SISTEMA OPERACIONAL.

**Nota:** Quando não é possível detectar o código do país local, ele retorna a sequência vazia.



### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Adiciona o parâmetro `path` à lista de documentos recentes.

Esta lista é gerenciada pelo SO. No Windows, você pode visitar a lista a partir da tarefa barra, e no macOS, você pode visitá-la no menu dock.



### `app.clearRecentDocuments()` _macOS_ _Windows_

Limpa a lista de documentos recentes.



### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - O nome do protocolo sem `://`. Por exemplo, se você quiser que seu aplicativo manuseie `electron://` links, chame este método com `electron` como parâmetro.

* `path` String (opcional) __ do Windows - O caminho para o Elétron executável. Inadimplência para `process.execPath`

* `args` String[] (opcional) __ do Windows - Argumentos passados para o executável. Padrão para uma matriz vazia

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

Define o executável atual como o manipulador padrão para um protocolo (também conhecido como esquema de URI). Ele permite que você integre seu aplicativo mais profundamente no sistema operacional. Uma vez registrados, todos os links com `your-protocol://` serão abertos com o executável atual. Todo o link, incluindo o protocolo, será passado para o seu aplicativo como parâmetro.

**Nota:** No macOS, você só pode registrar protocolos que foram adicionados a `info.plist`do seu aplicativo, que não podem ser modificados no tempo de execução. No entanto, você pode alterar o arquivo durante o tempo de construção via</a>Electron Forge , [Electron Packager][electron-packager], ou editando `info.plist` com um editor de de texto. Caso precise de mais detalhes, consulte a [documentação da Apple][CFBundleURLTypes].</p> 

**Nota:** Em um ambiente do Windows Store (quando embalado como `appx`) esta API retornará `true` para todas as chamadas, mas a chave de registro que define não será acessível por outros aplicativos.  Para registrar seu aplicativo do Windows Store como um manipulador de protocolo padrão, você deve [declarar o protocolo em seu manifesto](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

A API usa o Registro do Windows e `LSSetDefaultHandlerForURLScheme` internamente.



### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - O nome do protocolo sem `://`.
* `path` String (opcional) _Windows_ - O padrão é `process.execPath`
* `args` String[] (opcional) _Windows_ - O padrão é um array vazio

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

Este método verifica se o atual executável como o manipulador padrão para um protocolo de (também conhecido como esquema URI). Se assim for, ele removerá o aplicativo como o manipulador padrão.



### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - O nome do protocolo sem `://`.
* `path` String (opcional) _Windows_ - O padrão é `process.execPath`
* `args` String[] (opcional) _Windows_ - O padrão é um array vazio

Devoluções `Boolean` - Se o executável atual é o manipulador padrão para um protocolo de (também conhecido como esquema URI).

**Nota:** No macOS, você pode usar este método para verificar se a aplicação foi registrada como o manipulador padrão de um protocolo. Você também pode verificar isso consultando o `~/Library/Preferences/com.apple.LaunchServices.plist` na máquina macOS. Caso precise de mais detalhes, consulte a [documentação da Apple][LSCopyDefaultHandlerForURLScheme].

A API usa o Registro do Windows e `LSCopyDefaultHandlerForURLScheme` internamente.



### `app.getApplicationNameForProtocol(url)`

* `url` String - uma URL com o nome do protocolo para verificar. Ao contrário dos outros métodos nesta família, isso aceita uma URL inteira, incluindo `://` a um mínimo de (por exemplo. `https://`).

Devoluções `String` - Nome do aplicativo que manuseia o protocolo ou uma sequência de vazia se não houver manipulador. Por exemplo, se o Electron é o manipulador padrão da URL, isso pode ser `Electron` no Windows e mac. No entanto, não dependem do formato preciso que não é garantido para permanecer inalterado. Espere um formato diferente no Linux, possivelmente com um sufixo `.desktop` .

Este método retorna o nome do aplicativo do manipulador padrão para o protocolo (também conhecido como esquema URI) de uma URL.



### `app.getApplicationInfoForProtocol(url)` __ __do MacOS

* `url` String - uma URL com o nome do protocolo para verificar. Ao contrário dos outros métodos nesta família, isso aceita uma URL inteira, incluindo `://` a um mínimo de (por exemplo. `https://`).

Devoluções `Promise<Object>` - Resolver com um objeto contendo o seguinte:

* `icon` NativeImage - o ícone de exibição do aplicativo que manuseia o protocolo.
* `path` String - caminho de instalação do aplicativo que manuseia o protocolo.
* `name` String - nome de exibição do aplicativo que manuseia o protocolo.

Este método retorna uma promessa que contém o nome do aplicativo, o ícone e o caminho do manipulador padrão para o protocolo (também conhecido como esquema URI) de uma URL.



### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Um array de objetos `Task`

Adiciona `tasks` à categoria</a> de tarefas da Lista de Saltos no Windows.</p> 

`tasks` é um array de objetos [`Task`](structures/task.md).

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

**Nota:** Se desejar personalizar ainda mais a Jump List, use `app.setJumpList(categories)` em vez deste método.



### `app.getJumpListSettings()` _Windows_

Retorna `Object`:

* `minItems` Integer - O número mínimo de itens que serão mostrados na Jump List (para uma descrição mais detalhada deste valor, consulte a [documentação no MSDN][JumpListBeginListMSDN]).

* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Matriz de `JumpListItem` objetos que correspondem a itens que o usuário removeu explicitamente das categorias personalizadas na Lista de saltos . Estes itens não devem ser adicionados novamente à Jump List na **próxima** chamada a `app.setJumpList()`. O Windows não irá mostrar nenhuma categoria personalizada que tiver qualquer um dos itens removidos.



### `app.setJumpList(categories)` _Windows_

* `categories` [](structures/jump-list-category.md) | jumplist `null` - Matriz de objetos `JumpListCategory` .

Define ou remove uma Jump List personalizada para a aplicação e retorna uma das seguintes strings:

* `ok` - Nada deu errado.
* `error` - Um ou mais erros ocorreram. Ative a geração de logs em tempo de execução para descobrir a causa provável.

* `invalidSeparatorError` - Foi feita uma tentativa de adicionar um separador a uma categoria personalizada na Lista de Saltos. Separadores só são permitidos na categoria `Tasks` padrão .

* `fileTypeRegistrationError` - Foi realizada uma tentativa de adicionar à Jump List um link de arquivo cujo tipo de arquivo não foi registrado para ser manipulado pela aplicação.

* `customCategoryAccessDeniedError` - Categorias personalizadas não podem ser adicionadas à Jump List devido a restrições de privacidade do usuário ou de políticas de grupo.

Se `categories` for `null`, a Jump List personalizada anteriormente definida (se houver) será substituída por uma Jump List padrão para o app (gerenciada pelo Windows).

**Nota:** Se um objeto `JumpListCategory` não tiver for nem a propriedade `type` nem a `name` definidas, então seu `type` é assumido como `tasks`. Se a propriedade do `name` está definida mas a propriedade do `type` é omissa, então o `type` é assumido como `custom`.

**Note:** Os usuários podem remover itens de categorias personalizadas, e o Windows não permitirá que um item removido seja adicionado novamente a uma categoria personalizada até **após** a próxima chamada bem-sucedida a `app.setJumpList(categories)`. Qualquer tentativa de adicionar novamente um item removido de uma categoria personalizada antes disso resultará na omissão da categoria inteira da Jump List. A lista dos itens removidos pode ser obtida usando `app.getJumpListSettings()`.

**Note:** The maximum length of a Jump List item's `description` property is 260 characters. Beyond this limit, the item will not be added to the Jump List, nor will it be displayed.

Aqui vai um exemplo muito simples de como criar uma Jump List personalizada:



```javascript
const { app } = require('electron')

app.setJumpList([
  {
    tipo: 'custom',
    nome: 'Projetos recentes',
    itens: [
      { tipo: 'arquivo', caminho: 'C:\\Projetos\\project1.proj' },
      { tipo: 'arquivo', caminho: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // tem um nome para que 'tipo' seja "personalizado"
    nome: 'Ferramentas',
    itens: [
      {
        tipo: 'tarefa',
        título: 'Ferramenta A',
        programa: process.execPath,
        args: '-run-tool-a',
        ícone: process.execPath,
        iconIndex: 0,
        descrição: 'Runs Tool A'
      },
      {
        tipo : 'tarefa',
        título: 'Ferramenta B', programa
        : process.execPath,
        args: '-run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        descrição: 'Corre a Ferramenta B'
      }

  }
  { type: 'frequent' },
  { // não tem nome e nenhum tipo para que 'tipo' seja suposto ser "tarefas"
    itens: [
      {
        tipo: 'tarefa',
        título: 'Novo Projeto',
        programa: process.execPath,
        args: '-new-project',
        descrição: 'Criar um novo projeto'.
      },
      { type: 'separator' },
      {
        tipo: 'tarefa',
        título: 'Recover Project',
        programa: process.execPath,
        args: '-recover-project',
        descrição: 'Recover Project'
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
const { app } = require ('electron')
deixar myWindow = nulo

const gotTheLock = app.requestSingleInstanceLock()

se (!gotTheLock) {
  app.quit()
} else {
  app.on ('segunda instância', (evento, commandLine, workingDirectory) => {
    // Alguém tentou executar uma segunda instância, devemos focar nossa janela.
    se (myWindow) {
      se (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Criar myWindow, carregar o resto do aplicativo, etc...
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}
```




### `app.hasSingleInstanceLock()`

Retorna `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`



### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.



### `app.setUserActivity(type, userInfo[, webpageURL])` __macOS

* `type` String - Identificação única da atividade. É mapeada para [`NSUserActivity.activityType`][activity-type].

* `userInfo` qualquer estado específico do aplicativo para armazenar para uso por outro dispositivo.

* `webpageURL` String (opcional) - A página da Web para carregar em um navegador se nenhum aplicativo adequado for instalado no dispositivo de retomada. O esquema deve ser `http` ou `https`.

Cria um `NSUserActivity` e o define como a atividade atual. A atividade, então, é qualificada para ser repassada (via [Handoff][handoff]) a outro dispositivo de agora em diante.



### `app.getCurrentActivityType()` __macOS

Retorna `String` - O tipo da atividade atualmente em execução.



### `app.invalidateCurrentActivity()` _macOS_

Invalida a atividade de usuário atual do [Handoff][handoff].



### `app.resignCurrentActivity()` no _macOS_

Marks the current [Handoff][handoff] user activity as inactive without invalidating it.



### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Identificação única da atividade. É mapeada para [`NSUserActivity.activityType`][activity-type].

* `userInfo` qualquer estado específico do aplicativo para armazenar para uso por outro dispositivo.

Atualiza a atividade atual se seu tipo corresponder a `type`, mesclando as entradas de `userInfo` ao seu dicionário `userInfo` atual.



### `app.setAppUserModelId(id)` _Windows_

* `id` String

Muda o [Application User Model ID][app-user-model-id] para `id`.



### `app.setActivationPolicy(policy)` __macOS

* `policy` String - Pode ser 'regular', 'acessório' ou 'proibido'.

Sets the activation policy for a given app.

Activation policy types:

* 'regular' - O aplicativo é um aplicativo comum que aparece no Dock e pode ter uma interface de usuário.
* 'acessório' - O aplicativo não aparece no Dock e não tem uma barra de menu, mas pode ser ativado programáticamente ou clicando em uma de suas janelas.
* 'proibido' - O aplicativo não aparece no Dock e não pode criar janelas ou ser ativado.



### </em>Linux `app.importCertificate(options, callback)` _</h3> 

* objeto `options` 
    * `certificate` String - Caminho para o arquivo pkcs12.
  * `password` String - Passphrase do certificado.
* `callback` Function 
    * `result` Integer - Resultado da importação.

Importa o certificado em formato pkcs12 ao armazenamento de certificados da plataforma. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).



### `app.disableHardwareAcceleration()`

Desativa a aceleração de hardware para o aplicativo atual.

Este método somente pode ser chamado antes do aplicativo estiver pronto.



### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behavior.

Este método somente pode ser chamado antes do aplicativo estiver pronto.



### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and CPU usage statistics of all the processes associated with the app.



### `app.getGPUFeatureStatus()`

Retorna [`GPUFeatureStatus`](structures/gpu-feature-status.md) - Os status de recursos gráficos descritos em `chrome://gpu/`.

**Note:** This information is only usable after the `gpu-info-update` event is emitted.



### `app.getGPUInfo(infoType)`

* `infoType` String - Pode ser `basic` ou `complete`.

Returns `Promise<unknown>`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:



```js
{
  auxAttributes:
   {
     amdSwitchable: verdade,
     canSupportThreadedTextureMailbox: falso,
     directComposition: falso,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegcodeDeCeleratorSupported: falso,
     optimus: falso, falso,
     passthroughCmdDecoder: falso,
     sandboxed: falso,
     softwareRendering: falso,
     suportaOverlays: falso,
     vídeoDecodeAcceleratorFlags: 0
   ,
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  máquinaModelName: 'MacBookPro', máquina
  ModelVersion: '11.5'
}
```


Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.



### `app.setBadgeCount([count])` __do</em> _Do Linux</h3> 

* `count` Inteiro (opcional) - Se um valor for fornecido, defina o crachá para o valor fornecido de outra forma, no macOS, exiba um ponto branco simples (por exemplo, número desconhecido de notificações). No Linux, se um valor não for fornecido o crachá não será exibido.

Retorna `Boolean` - Se a chamada foi realizada com sucesso.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Nota:** O lançador Unity requer a existência de um arquivo `.desktop` para que isso funcione. Para mais detalhes, leia a [Integração com Ambiente de Trabalho][unity-requirement].



### `app.getBadgeCount()` __do</em> _Do Linux</h3> 

Retorna `Integer` - O valor sendo atualmente mostrado no selo contador.



### </em>Linux `app.isUnityRunning()` _</h3> 

Retorna `Boolean` - Indica se o ambiente de trabalho atual é o Unity ou não.



### `app.getLoginItemSettings([options])` __ __do MacOS

* objeto `options` (opcional) 
    * `path` String (opcional) __ do Windows - O caminho executável para comparar. Inadimplência para `process.execPath`.
  * `args` String[] (opcional) __ do Windows - Os argumentos da linha de comando para comparar . Padrão para uma matriz vazia.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Retorna `Object`:

* `openAtLogin` Boolean - `true` se o aplicativo está configurado para abrir no login.
* `openAsHidden` Boolean __ do macOS - `true` se o aplicativo estiver configurado para abrir como oculto no login. Esta configuração não está disponível em [mas constrói][mas-builds].

* `wasOpenedAtLogin` Boolean __ macOS - `true` se o aplicativo foi aberto no login automaticamente. Esta configuração não está disponível em [mas constrói][mas-builds].

* `wasOpenedAsHidden` Boolean __ do macOS - `true` se o aplicativo foi aberto como um item de de login oculto. Isso indica que o aplicativo não deverá abrir nenhuma janela durante a inicialização. Esta configuração não está disponível em [mas constrói][mas-builds].

* `restoreState` Boolean __ do macOS - `true` se o aplicativo foi aberto como um item de login que deve restaurar o estado da sessão anterior. Isso indica que o aplicativo deverá restaurar as janelas que foram abertas da última vez que o aplicativo fora fechado. Esta configuração não está disponível em [mas constrói][mas-builds].

* `executableWillLaunchAtLogin` Boolean _o Windows_ - `true` se o aplicativo for definido para abrir no login e sua chave de execução não for desativada. Isso difere de `openAtLogin` , pois ignora a opção `args` , esta propriedade será verdadeira se o executável dado for lançado no login com **quaisquer** argumentos.

* `launchItems` Object[]</em>do _Do 
  
    * `name` String _Windows_ - valor de nome de uma entrada de registro.
  * `path` String _Windows_ - O executável a um aplicativo que corresponde a uma entrada de registro.
  * `args` String[] _o Windows_ - os argumentos da linha de comando para passar para o executável.
  * `scope` String _Windows_ - um dos `user` ou `machine`. Indica se a entrada do registro está sob `HKEY_CURRENT USER` ou `HKEY_LOCAL_MACHINE`.
  * `enabled` Boolean _o Windows_ - `true` se a chave de registro do aplicativo for aprovada pela inicialização e, portanto, mostrar como `enabled` nas configurações do Gerenciador de Tarefas e do Windows.</li> </ul> 



### `app.setLoginItemSettings(settings)` __ __do MacOS

* objeto `settings` 
    * `openAtLogin` Boolean (opcional) - `true` para abrir o aplicativo no login, `false` para remover o aplicativo como um item de login. Inadimplência para `false`.
  * `openAsHidden` Boolean (opcional) __ do macOS - `true` abrir o aplicativo como oculto. Padrão sendo `false`. O usuário pode editar essa configuração a partir das Preferências do Sistema para que `app.getLoginItemSettings().wasOpenedAsHidden` deve ser verificado quando o aplicativo é aberto para saber o valor atual. Esta configuração não está disponível em [mas constrói][mas-builds].
  * `path` String (opcional) __ do Windows - O executável para ser lançado no login. Inadimplência para `process.execPath`.
  * `args` String[] (opcional) __ do Windows - Os argumentos da linha de comando para passar para executáveis. Padrão para uma matriz vazia. Tome cuidado para embrulhar caminhos em citações.
  * `enabled` Boolean (opcional) __ do Windows - `true` alterará a chave de registro aprovada pela inicialização e `enable / disable` o App in Task Manager e o Windows Settings. Inadimplência para `true`.
  * `name` String (opcional) __ do Windows - nome de valor para escrever no registro. Padrão para o AppUserModelId do aplicativo(). Define as opções de execução do aplicativo na inicialização do sistema.

Para funcionar com o `autoUpdater` do Electron no Windows, o qual usa o [Squirrel][Squirrel-Windows], recomendamos definir o caminho de inicialização para Update.exe e passar a ele os argumentos que especificam o nome do seu aplicativo. Como por exemplo:



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




### `app.isAccessibilitySupportEnabled()` __ __do MacOS

Retorna `Boolean` - `true` se o suporte à acessibilidade do Chrome estiver ativado, `false` caso contrário. Essa API retornará `true` se o uso de tecnologias assistivas, tais como leitores de tela, foi detectado. Consulte https://www.chromium.org/developers/design-documents/accessibility para mais detalhes.



### `app.setAccessibilitySupportEnabled(enabled)` __ __do MacOS

* `enabled` Boolean - Ativa ou desativa a renderização da [árvore de acessibilidade](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Ativa manualmente o suporte à acessibilidade do Chrome, permitindo expor uma opção para ativar/desativar a acessibilidade nas configurações do aplicativo. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Desativado por padrão.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.



### `app.showAboutPanel()`

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.



### `app.setAboutPanelOptions(options)`

* objeto `options` 
    * `applicationName` String (opcional) - O nome do aplicativo.
  * `applicationVersion` String (opcional) - A versão do aplicativo.
  * `copyright` String (opcional) - Informações de copyright.
  * `version` String (opcional) __ do macOS - O número da versão de compilação do aplicativo.
  * `credits` String (opcional) _macOS_ _Windows_ - Informações de crédito.
  * `authors` String[] (opcional) __ Linux - Lista de autores de aplicativos.
  * `website` String (opcional) __ Linux - O site do aplicativo.
  * `iconPath` String (opcional) _Linux_ __ do Windows - Caminho para o ícone do aplicativo em um formato de arquivo JPEG ou PNG. No Linux, será mostrado como 64x64 pixels enquanto retém a proporção.

Define as opções do painel sobre. This will override the values defined in the app's `.plist` file on macOS. Consulte a [documentação da Apple][about-panel-options] para mais detalhes. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.



### `app.isEmojiPanelSupported()`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.



### `app.showEmojiPanel()` __ __do MacOS

Show the platform's native emoji picker.



### </em>em massa `app.startAccessingSecurityScopedResource(bookmarkData)` _</h3> 

* `bookmarkData` String - Os dados de marcadores de marca de segurança codificados base64 retornados pelos métodos `dialog.showOpenDialog` ou `dialog.showSaveDialog` .

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.



```js
Comece a acessar o arquivo.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource (dados)
// Agora você pode acessar o arquivo fora da caixa de areia 🎉

// Lembre-se de parar de acessar o arquivo depois de terminar com ele.
stopAccessingSecurityScopedResource()
```


Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.



### `app.enableSandbox()`

Enables full sandbox mode on the app. This means that all renderers will be launched sandboxed, regardless of the value of the `sandbox` flag in WebPreferences.

Este método somente pode ser chamado antes do aplicativo estiver pronto.



### `app.isInApplicationsFolder()` no _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`



### `app.moveToApplicationsFolder([options])` __macOS

* objeto `options` (opcional) 
    * função `conflictHandler` \<Boolean> (opcional) - Um manipulador para possíveis conflitos em falha de movimento. 
        * `conflictType` String - O tipo de conflito de movimento encontrado pelo manipulador; pode ser `exists` ou `existsAndRunning`, onde `exists` significa que um aplicativo de mesmo nome está presente no diretório de Aplicativos e `existsAndRunning` significa tanto que ele existe e que está em execução.

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong.

By default, if an app of the same name as the one being moved exists in the Applications directory and is _not_ running, the existing app will be trashed and the active app moved into its place. If it _is_ running, the pre-existing running app will assume focus and the previously active app will quit itself. This behavior can be changed by providing the optional conflict handler, where the boolean returned by the handler determines whether or not the move conflict is resolved with default behavior.  i.e. returning `false` will ensure no further action is taken, returning `true` will result in the default behavior and the method continuing.

Como por exemplo:



```js
app.moveToApplicationsPato({
  conflitoSsimeiro: (conflitoTip) => {
    se (conflictType === 'exists') {
      diálogo de retorno.showMessageBoxSync({
        tipo: 'pergunta',
        botões: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        mensagem: 'Um aplicativo deste nome já existe'
      }) === 1
    }
  }
})
```


Would mean that if an app already exists in the user directory, if the user chooses to 'Continue Move' then the function would continue with its default behavior and the existing app will be trashed and the active app moved into its place.



### `app.isSecureKeyboardEntryEnabled()` no _macOS_

Returns `Boolean` - whether `Secure Keyboard Entry` is enabled.

By default this API will return `false`.



### `app.setSecureKeyboardEntryEnabled(enabled)` __macOS

* `enabled` Booleano - Habilite ou desabilita `Secure Keyboard Entry`

Set the `Secure Keyboard Entry` is enabled in your application.

By using this API, important information such as password and other sensitive information can be prevented from being intercepted by other processes.

See [Apple's documentation](https://developer.apple.com/library/archive/technotes/tn2150/_index.html) for more details.

**Note:** Enable `Secure Keyboard Entry` only when it is needed and disable it when it is no longer needed.



## Propriedades



### `app.accessibilitySupportEnabled` __ __do MacOS

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Desativado por padrão.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.



### `app.applicationMenu`

A `Menu | null` property that returns [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.



### `app.badgeCount` __do</em> _Do Linux</h3> 

An `Integer` property that returns the badge count for current app. Setting the count to `0` will hide the badge.

On macOS, setting this with any nonzero integer shows on the dock icon. On Linux, this property only works for Unity launcher.

**Nota:** O lançador Unity requer a existência de um arquivo `.desktop` para que isso funcione. Para mais detalhes, leia a [Integração com Ambiente de Trabalho][unity-requirement].

**Note:** On macOS, you need to ensure that your application has the permission to display notifications for this property to take effect.



### `app.commandLine` _Readonly_

A [`CommandLine`](./command-line.md) object that allows you to read and manipulate the command line arguments that Chromium uses.



### `app.dock` __ _macOS Readonly_

A [`Dock`](./dock.md) `| undefined` object that allows you to perform actions on your app icon in the user's dock on macOS.



### `app.isPackaged` _Readonly_

A `Boolean` property that returns  `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.



### `app.name`

A `String` property that indicates the current application's name, which is the name in the application's `package.json` file.

Normalmente, o campo `name` de `package.json` é um nome minúsculo curto, de acordo com à especificação dos módulos npm. Você normalmente deve especificar um campo `productName`, que é o nome completo da aplicação contendo letras maiúsculas e minúsculas e qual será preferido por `name` pelo Electron.



### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  It is useful for ensuring that your entire app has the same user agent.  Set to a custom value as early as possible in your app's initialization to ensure that your overridden value is used.



### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `true`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).



### `app.runningUnderRosettaTranslation` __ _macOS Readonly_

A `Boolean` which when `true` indicates that the app is currently running under the [Rosetta Translator Environment](https://en.wikipedia.org/wiki/Rosetta_(software)).

You can use this property to prompt users to download the arm64 version of your application when they are running the x64 version under Rosetta incorrectly.

[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc
