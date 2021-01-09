# Debuggare il Processo Principale

Il DevTools in una finestra del browser Electron può solo debug di JavaScript che è eseguito in quella finestra (cioè le pagine web). Per debug di JavaScript che è eseguito nel processo principale dovrai usare un debugger esterno e avviare Electron con l'interruttore `--inspect` o `--inspect-brk`.

## Interruttori Riga Di Comando

Utilizzare uno dei seguenti interruttori a riga di comando per abilitare il debug del processo principale:

### `--inspect=[port]`

Electron ascolterà i messaggi del protocollo dell'ispettore V8 sulla porta ``specificata, un debugger esterno dovrà connettersi su questa porta. La porta predefinita `` è `5858`.

```shell
electron --inspect=5858 la tua/app
```

### `--inspect-brk=[port]`

Come `--inspect` ma interrompe l'esecuzione sulla prima riga di JavaScript.

## Debug Esterno

Dovrai usare un debugger che supporti il protocollo dell'ispettore V8.

- Collega Chrome visitando `chrome://inspect` e selezionando per ispezionare l'app lanciata Electron presente lì.
- [Debugging in VSCode](debugging-vscode.md)
