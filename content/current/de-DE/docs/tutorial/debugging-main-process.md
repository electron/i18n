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

Änhlich wie `--inspect`, pausiert jedoch die Ausführung des JavaScript-Codes auf der ersten Zeile.

## Externe Debugger

Sie müssen einen Debugger verwenden, der das V8-Inspektor-Protokoll unterstützt.

- Verbinden Sie Chrome durch das Öffnen von `chrome://inspect` und wählen Sie 'Untersuchen' mit einem Rechtsklick auf die gestartete Electron-App aus.
- [Debuggen des Hauptprozesses in VSCode](debugging-main-process-vscode.md)
