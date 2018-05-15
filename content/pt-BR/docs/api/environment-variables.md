# Variáveis de Ambiente

> Controle configurações e comportamento de aplicações sem mudar o código.

Certos comportamentos do Electron são controlados por variáveis de ambientes porque são inicializados antes que as flags da linha de comando e o código da aplicação.

Exemplo de shell POSIX:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Exemplo de console do Windows:

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## Production Variables

The following environment variables are intended primarily for use at runtime in packaged Electron applications.

### `GOOGLE_API_KEY`

Electron includes a hardcoded API key for making requests to Google's geocoding webservice. Because this API key is included in every version of Electron, it often exceeds its usage quota. To work around this, you can supply your own Google API key in the environment. Place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

For instructions on how to acquire a Google API key, visit [this page](https://www.chromium.org/developers/how-tos/api-keys).

By default, a newly generated Google API key may not be allowed to make geocoding requests. To enable geocoding requests, visit [this page](https://console.developers.google.com/apis/api/geolocation/overview).

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Starts the process as a normal Node.js process.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Don't attach to the current console session.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Don't use the global menu bar on Linux.

## Variáveis de desenvolvimento

As seguintes variáveis de ambiente são destinadas principalmente para fins de depuração e desenvolvimento.

### `ELECTRON_ENABLE_LOGGING`

Imprime o log interno do Chrome para o console.

### `ELECTRON_LOG_ASAR_READS`

Quando o Electron lê de um arquivo ASAR, o offset de leitura e o caminho para o `tmpdir` do sistema será registrado. O arquivo resultante pode ser fornecido para o módulo ASAR para otimização da ordenação de arquivos.

### `ELECTRON_ENABLE_STACK_DUMPING`

Imprime o rastreamento da pilha para o console quando o Electron trava.

Essa variável de ambiente não funcionará se o `crashReporter` tiver iniciado.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Mostra a caixa de diálogo de travamento do Windows quando o Electron trava.

Essa variável de ambiente não funcionará se o `crashReporter` tiver iniciado.