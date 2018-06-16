# Progress Bar nella Taskbar (Windows, macOS, Unity)

Su Windows il pulsante della taskbar può essere usata per mostrare una progress bar. Questo abilita una finestra per fornire le informazioni di progresso all'utente, senza che egli debba passare alla finestra stessa.

Su macOS la barra dei progressi sarà mostrata come parte dell'icona del dock.

L'Unità DE ha anche una funzione simile che ti consente di specificare la barra del progresso nel launcher.

**Progress bar nel pulsante della taskbar:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Tutti e tre i casi sono coperti dalla stessa API, il metodo `impostaBarraProgtrsso()` disponibile su instanze di `FinestreBrowser`. Chiamalo con un numero tra `0` e `1` per indicare il tuo progresso. Se hai una mansione a lunga esecuzione che è attualmente al 63% dal completamento, la chiamerai con `impostaBarraProgresso(0.63)`.

Generalmente parlando, impostare il parametro ad un valore sotto zero (come `-1`) rimuoverà la barra del progresso, mentre impostandolo ad un valore più alto di uno (come `2`) sposterà la barra del progresso alla modalità intermedia.

Consulta la [documentazione dell'API per ulteriori opzioni e modalità](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```