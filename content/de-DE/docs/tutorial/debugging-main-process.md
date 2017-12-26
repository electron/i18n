# Debuggen des Hauptprozesses

Die DevTools in einem Electron Browserfenster können nur JavaScript debuggen, das auch in diesem Fenster ausgeführt wird (z.B. die Websites). Um JavaScript zu debuggen, das im Hauptprozess ausgeführt wird, benötigen Sie einen externen Debugger und müssen Electron mit der `--inspect` oder `--inspect-brk` Option starten.

## Befehlszeilenoptionen

Nutzen Sie eine der folgenden Befehlszeilenoptionen um das Debugging des Hauptprozesses zu aktivieren:

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