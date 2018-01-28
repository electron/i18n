# "Debugging" ang Pangunahing Proseso

Ang "DevTools" sa "browser window" ng Elektron ay maaari lamang gamitan ng "debug" ang "JavaScript" na pinapalabas sa "window" (hal. mga pahina ng "web"). Para makita o mahanap ang mga posibleng problema o tinatawag din nating "debugging", sa "JavaScript" na pinapakita sa pangunahing proseso nito, kinakailangan na gamitin ang "external debugger" at paganahin ang Elektron gamit ang "switch" na `--inspect` o `--inspect-brk`.

## "Command Line Switches"

Use one of the following command line switches to enable debugging of the main process:

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Like `--inspect` but pauses execution on the first line of JavaScript.

## External Debuggers

You will need to use a debugger that supports the V8 inspector protocol.

- Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
- [Debugging the Main Process in VSCode](debugging-main-process-vscode.md)