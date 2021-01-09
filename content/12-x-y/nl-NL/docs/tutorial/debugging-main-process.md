# Debuggen van het hoofdproces

De DevTools in een Electron browservenster kan alleen JavaScript debuggen dat uitgevoerd in dat venster (d.w.z. de webpagina's). Om JavaScript te debuggen dat is uitgevoerd in het hoofdproces, moet je een externe debugger gebruiken en Electron starten met de `--inspect` of `--inspect-brk` wissel.

## Opdrachtlijn schakelt

Gebruik een van de volgende opdrachtregelschakelaars om foutopsporing van het hoofd proces in te schakelen:

### `--inspect=[port]`

Electron luistert naar V8 inspector-protocolberichten op de opgegeven `poort`, een externe debugger moet verbinding maken met deze poort. Standaard `poort` is `5858`.

```shell
electron --inspect=5858 jouw/app
```

### `--inspect-brk=[port]`

Zoals `--inspect` pauzeert de uitvoering op de eerste regel van JavaScript.

## Externe debuggers

U moet een debugger gebruiken die het V8 inspectieprotocol ondersteunt.

- Verbind Chrome door `chrome://inspect` te bezoeken en te selecteren om de Electron app daar te inspecteren.
- [Debugging in VSCode](debugging-vscode.md)
