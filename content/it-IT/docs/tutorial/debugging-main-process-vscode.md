# Debuggando il Processo Principale in CodiceVS

### 1. Apri un progetto Electron in CodiceVS.

```sh
$ git clone git@github.com:electron/electron-avvio-veloce.git
$ codice electron-avvio-veloce
```

### 2. Aggiungi un file `.codicevs/lancia.json` con la configurazione seguente:

```json
{
  "versione": "0.2.0",
  "configurationi": [
    {
      "nome": "Debug Processo Principale",
      "tipo": "nodo",
      "richiesta": "lancio",
      "cwd": "${Radicespaziolavoro)",
      "tempoesecuzioneEseguibile": "${workspaceRoot}/nodo_moduli/.bin/electron",
      "finestre": {
        "tempoesecuzioneEseguibile": "${Radicespaziolavoro}/nodo_modules/.bin/electron.cmd"
      },
      "argomenti" : ["."]
    }
  ]
}
```

### 3. Debugging

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Here is a pre-configured project that you can download and directly debug in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start