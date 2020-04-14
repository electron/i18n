# "Debugging" ang Pangunahing Proseso

Ang "DevTools" sa "browser window" ng Elektron ay maaari lamang gamitan ng "debug" ang "JavaScript" na pinapalabas sa "window" (hal. mga pahina ng "web"). Para makita o mahanap ang mga posibleng problema o tinatawag din nating "debugging", ang "JavaScript" na pinapakita sa pangunahing proseso nito, kinakailangan na gamitin ang "external debugger" at paganahin ang Elektron gamit ang "switch" na `--inspect` o `--inspect-brk`.

## "Command Line Switches"

Gamitin ang isa sa mga sumusunod na "command line switches" upang paganahin ang "debugging" ng pangunahing proseso:

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Tulad ng `--inspect` ngunit hinihinto nito ang pagpapalabas sa unang linya ng "JavaScript".

## Panlabas na Tumutukoy at Nag-aayos ng Problema o "External Debuggers"

Kailangan mong gumamit ng "debugger" na humahalili sa "V8 inspector protocol".

- Iugnay ang "Chrome" gamit ang pagpunta sa `chrome://inspect` at piliin para suriin ang paggana ng "Electron app" na ginagamit dito.
- ["Debugging Ang pangunahing Proseso sa "VSCode"](debugging-main-process-vscode.md)
