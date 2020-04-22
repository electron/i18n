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

### `NODE_OPTIONS`

Electron includes support for a subset of Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). The majority are supported with the exception of those which conflict with Chromium's use of BoringSSL.

Exemplo:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Unsupported options are:

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

`NODE_OPTIONS` are explicitly disallowed in packaged apps, except for the following:

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

You can provide an API key for making requests to Google's geocoding webservice. To do this, place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). By default, a newly generated Google API key may not be allowed to make geocoding requests. To enable geocoding requests, visit [this page](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Starts the process as a normal Node.js process.

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

Don't attach to the current console session.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

Don't use the global menu bar on Linux.

### `ELECTRON_TRASH` _Linux_

Set the trash implementation on Linux. Default is `gio`.

Options:
* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## Variáveis de desenvolvimento

As seguintes variáveis de ambiente são destinadas principalmente para fins de depuração e desenvolvimento.


### `ELECTRON_ENABLE_LOGGING`

Imprime o log interno do Chrome para o console.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Imprime o rastreamento da pilha para o console quando o Electron trava.

Essa variável de ambiente não funcionará se o `crashReporter` tiver iniciado.

### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Mostra a caixa de diálogo de travamento do Windows quando o Electron trava.

Essa variável de ambiente não funcionará se o `crashReporter` tiver iniciado.

### `ELECTRON_OVERRIDE_DIST_PATH`

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Usando:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```
