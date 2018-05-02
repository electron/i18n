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

Imposta alcuni punti di rottura in `principale.js` e avvia il debugging in [Vista Debug](https://code.visualstudio.com/docs/editor/debugging). Dovresti poter colpire i punti di rottura.

Qui un progetto preconfigurato che puoi scaricare e debuggare direttamente in CodiceVS: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start