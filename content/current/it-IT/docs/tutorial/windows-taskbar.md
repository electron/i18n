# Barra Delle Applicazioni Windows

Electron dispone di API per configurare l'icona dell'app nella barra delle applicazioni di Windows. Supportati sono la [creazione di una `JumpList`](#jumplist), [miniature personalizzate e barre degli strumenti](#thumbnail-toolbars), [l'icona sovrappone](#icon-overlays-in-taskbar)e il cosiddetto effetto ["Flash Frame"](#flash-frame), ma Electron utilizza anche l'icona del dock dell'app per implementare funzionalità cross-platform come [documenti recenti](./recent-documents.md) e [avanzamento delle applicazioni](./progress-bar.md).

## JumpList

Windows consente alle applicazioni di definire un menu contestuale personalizzato che viene visualizzato quando gli utenti fare clic con il pulsante destro del mouse sull'icona dell'app nella barra delle applicazioni. Quel menu contestuale è chiamato `JumpList`. Specifica azioni personalizzate nella categoria `Tasks` di JumpList, come citato da MSDN:

> Le applicazioni definiscono le attività in base sia alle caratteristiche del programma che alle cose che un utente dovrebbe fare con loro. Le attività dovrebbero essere prive di contesto, in che l'applicazione non ha bisogno di essere in esecuzione per il loro lavoro. Essi dovrebbero anche essere le azioni statisticamente più comuni che un utente normale dovrebbe eseguire in un'applicazione, come comporre un messaggio di posta elettronica o aprire il calendario in un programma di posta, creare un nuovo documento in un word processor, avviare un'applicazione in una determinata modalità, o lanciare uno dei suoi sottocomandi. Un'applicazione non dovrebbe ingombrare il menu con funzionalità avanzate che gli utenti standard non avranno bisogno o azioni una tantum come la registrazione. Non utilizzare attività per articoli promozionali come aggiornamenti o offerte speciali.
> 
> Si raccomanda vivamente che l'elenco dei compiti sia statico. Dovrebbe rimanere lo stesso indipendentemente dallo stato o dallo stato della domanda. Mentre è possibile variare la lista dinamicamente, si dovrebbe considerare che questo potrebbe confondere l'utente che non si aspetta che quella parte della lista di destinazione cambiare.

__Compiti di Internet Explorer:__

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

A differenza del menù dock in macOS, che è un vero menu, attività utente in Windows funzionano come scorciatoie dell'applicazione tali che quando l'utente fa clic su un'attività, un programma sarà eseguito con argomenti specificati.

Per impostare le attività utente per la tua applicazione, puoi utilizzare l'API [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows)

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: process. xecPath,
    argomenti: '--new-window',
    iconPath: processo. xecPath,
    iconIndex: 0,
    title: 'New Window',
    descrizione: 'Crea una nuova finestra'
  }
])
```

Per pulire l'elenco delle attività, chiama `app.setUserTasks` con un vettore vuoto:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Le attività dell'utente verranno mostrate anche dopo la chiusura dell'applicazione, quindi l'icona e il percorso del programma specificato per un'attività dovrebbero esistere fino a quando l'applicazione non è disinstallata.


## Thumbnail Toolbars

Su Windows è possibile aggiungere una barra degli strumenti delle miniature con pulsanti specificati in una barra delle applicazioni layout di una finestra di applicazione. Fornisce agli utenti un modo per accedere a un comando di una particolare finestra senza ripristinare o attivare la finestra.

Da MSDN, è illustrato:

> Questa barra degli strumenti è il controllo comune della barra degli strumenti standard. Ha un massimo di di sette pulsanti. L'ID, l'immagine, il suggerimento degli strumenti e lo stato di ogni pulsante sono definiti in una struttura, che viene poi passata alla barra delle applicazioni. L'applicazione può mostrare, abilitare, disabilitare o nascondere i pulsanti dalla barra delle miniature come richiesto dal suo stato corrente .
> 
> Ad esempio, Windows Media Player potrebbe offrire controlli standard per il trasporto multimediale come riproduzione, pausa, silenzio, e fermati.

__Barra degli strumenti delle miniature di Windows Media Player:__

![giocatore](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

Puoi usare [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) per impostare la barra degli strumenti delle miniature nella tua applicazione:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win. etThumbarButtons([
  {
    tooltip: 'button1',
    icona: path. oin(__dirname, 'button1.png'),
    click () { console. og('button1 clicked') }
  }, {
    tooltip: 'button2',
    icona: path.join(__dirname, 'button2. ng'),
    flags: ['enabled', 'dismissonclick'],
    clicca () { console. og('button2 cliccato.') }
  }
])
```

Per pulire i pulsanti della barra degli strumenti delle miniature, basta chiamare `BrowserWindow.setThumbarButtons` con un array vuoto:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Sovrapposizioni icone nella barra delle applicazioni

Su Windows un pulsante barra delle applicazioni può utilizzare una piccola sovrapposizione per visualizzare lo stato di applicazione , come citato da MSDN:

> Le sovrapposizioni delle icone servono come notifica contestuale dello stato, e sono destinati a negare la necessità di un'icona di stato dell'area di notifica separata per comunicare tali informazioni all'utente. Per esempio, il nuovo stato della posta in Microsoft Outlook, attualmente mostrato nell'area di notifica, ora può essere indicato attraverso una sovrapposizione sul pulsante della barra delle applicazioni. Ancora una volta, è necessario decidere durante il ciclo di sviluppo quale metodo è migliore per la vostra applicazione. Le icone sovrapposte sono destinate a fornire uno stato importante o notifiche di lunga data, come lo stato della rete, lo stato del messaggero o la nuova posta. L'utente non dovrebbe essere presentato con sovrapposizioni o animazioni in continuo cambiamento.

__Sovrapponi al pulsante della barra delle applicazioni:__

![Sovrapponi al pulsante della barra delle applicazioni](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Per impostare l'icona di sovrapposizione per una finestra, è possibile utilizzare l'API [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```


## Frame Flash

Su Windows è possibile evidenziare il pulsante barra delle applicazioni per ottenere l'attenzione dell'utente. Questo è simile a rimbalzare l'icona dock su macOS. Dalla documentazione di riferimento MSDN:

> Tipicamente, una finestra viene flashata per informare l'utente che la finestra richiede attenzione, ma che attualmente non ha il fuoco della tastiera.

Per flashare il pulsante della barra delle applicazioni della finestra di navigazione, è possibile utilizzare l'API [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Non dimenticare di chiamare il metodo `flashFrame` con `false` per spegnere il flash. In l'esempio sopra, viene chiamato quando la finestra entra in messa a fuoco, ma potresti usare un timeout o qualche altro evento per disabilitarlo.
