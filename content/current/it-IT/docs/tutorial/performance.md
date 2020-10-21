# Prestazioni

Gli sviluppatori spesso chiedono informazioni sulle strategie per ottimizzare le prestazioni delle applicazioni Electron. Gli ingegneri di software, i consumatori e gli sviluppatori di framework non sempre concordano su un'unica definizione di cosa significhi "prestazioni". Questo documento delinea alcuni dei modi preferiti dei manutentori di Electron per ridurre la quantità di memoria, CPU, e le risorse del disco in uso garantendo che la tua app sia reattiva all'input dell'utente e completa le operazioni il più rapidamente possibile. Inoltre, vogliamo che tutte le strategie di prestazioni mantengano uno standard elevato per la sicurezza della tua app.

La saggezza e le informazioni su come costruire siti web performanti con JavaScript generalmente si applicano anche alle app Electron. In una certa misura, le risorse che discutono come costruire il nodo performante. s applicazioni si applicano, ma sia attento a capire che il termine "performance" significa cose diverse per un Node. s backend di quello che fa per un'applicazione in esecuzione su un client.

Questo elenco è fornito per la tua convenienza – ed è, molto simile alla nostra lista di controllo di sicurezza [](./security.md) – non destinato ad essere esaustivo. Probabilmente è possibile costruire un'app Electron lenta che segue tutti i passaggi descritti di seguito. Electron è una potente piattaforma di sviluppo che ti consente di fare di più o meno quello che vuoi. All that freedom means that performance is largely your responsibility.

## Misura, Misura, Misura

L'elenco qui sotto contiene una serie di passaggi che sono abbastanza semplici e facili da implementare. Tuttavia, costruire la versione più performante della tua app richiederà di andare oltre un certo numero di passaggi. Invece, dovrai esaminare attentamente tutto il codice in esecuzione nella tua app con accuratezza profilando e misurando. Dove sono le strozzature? Quando l'utente fa clic su un pulsante, quali operazioni occupano il peso del tempo? Mentre l'applicazione è semplicemente inattiva, quali oggetti occupano più memoria?

Sempre più volte abbiamo visto che la strategia di maggior successo per costruire un'app Electron performante è quella di profilare il codice in esecuzione, trova il pezzo più affamato di risorse, e per ottimizzarlo. Ripetere questo processo apparentemente laborioso di nuovo aumenterà drammaticamente le prestazioni della tua app. L'esperienza di lavorare con le principali app come Visual Studio Code o Slack ha dimostrato che questa pratica è di gran lunga la strategia più affidabile per migliorare le prestazioni.

Per saperne di più su come profilare il codice della tua applicazione, familiarizzare con Chrome Developer Tools. Per l'analisi avanzata che esamina più processi contemporaneamente, considera lo strumento [Chrome Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

### Lettura Raccomandata

 * [Per Iniziare Con L'Analisi Delle Prestazioni Di Runtime](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
 * [Talk: "Visual Studio Code - The First Second"](https://www.youtube.com/watch?v=r0OeHRUCCb4)

## Checklist

È probabile che la tua app potrebbe essere un po 'più snella, più veloce e generalmente meno affamati di risorse se si tenta questi passaggi.

1. [Moduli inclusi incautamente](#1-carelessly-including-modules)
2. [Caricamento ed esecuzione del codice troppo presto](#2-loading-and-running-code-too-soon)
3. [Bloccando il processo principale](#3-blocking-the-main-process)
4. [Bloccando il processo di render](#4-blocking-the-renderer-process)
5. [Polyfill non necessari](#5-unnecessary-polyfills)
6. [Richieste di rete non necessarie o bloccate](#6-unnecessary-or-blocking-network-requests)
7. [Impacchetta il tuo codice](#7-bundle-your-code)

## 1) Incuriosi moduli inclusi

Prima di aggiungere un modulo Node.js alla tua applicazione, esamina tale modulo. Quante dipendenze include questo modulo? Che tipo di risorse necessita per essere semplicemente chiamato in una dichiarazione `require()`? Potresti trovare che il modulo con più download sul registro pacchetto NPM o le maggiori stelle su GitHub non è il più leggero o il più piccolo disponibile.

### Perchè?

La ragione dietro questa raccomandazione è meglio illustrata con un esempio del mondo reale. Durante i primi giorni di Electron, il rilevamento affidabile della connettività di rete è stato un problema, risultante molte applicazioni per utilizzare un modulo che ha esposto un metodo semplice `isOnline()`.

Quel modulo ha rilevato la connettività di rete tentando di raggiungere un numero di endpoint ben noti. For the list of those endpoints, it depended on a different module, which also contained a list of well-known ports. Questa dipendenza si è basata su un modulo contenente informazioni sulle porte, che è venuto sotto forma di un file JSON con più di 100.000 linee di contenuto. Ogni volta che il modulo è stato caricato (solitamente in una istruzione `require('module')` , caricherebbe tutte le sue dipendenze e alla fine leggerebbe e analizzerebbe questo file JSON . Analizzando molte migliaia di linee di JSON è un'operazione molto costosa. Su una macchina lenta può richiedere interi secondi di tempo.

In molti contesti del server, il tempo di avvio è praticamente irrilevante. Un Nodo. s server che richiede informazioni su tutte le porte è probabilmente "più performant" se carica tutte le informazioni richieste in memoria ogni volta che il server si avvia a il vantaggio di servire le richieste più velocemente. The module discussed in this example is not a "bad" module. Le app Electron, tuttavia, non dovrebbero essere il caricamento, l'analisi e la memorizzazione in memoria informazioni di cui non ha realmente bisogno.

In breve, un modulo apparentemente eccellente scritto principalmente per i server Node.js che eseguono Linux potrebbe essere una cattiva notizia per le prestazioni della tua app. In questo particolare esempio , la soluzione corretta è stata quella di non utilizzare alcun modulo, e per utilizzare invece controlli di connettività inclusi nelle versioni successive di Chromium.

### Come?

Quando si considera un modulo, si consiglia di verificare:

1. the size of dependencies included 2) the resources required to load (`require()`) it
3. le risorse necessarie per eseguire l'azione a cui sei interessato

Generare un profilo CPU e un profilo di memoria heap per caricare un modulo può essere fatto con un singolo comando sulla riga di comando. Nell'esempio qui sotto, stiamo guardando la richiesta di modulo popolare ``.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

L'esecuzione di questo comando comporta un file `.cpuprofile` e un file `.heapprofile` nella directory in cui lo hai eseguito. Entrambi i file possono essere analizzati utilizzando Chrome Developer Tools, utilizzando rispettivamente le schede `Performance` e `Memory` .

![performance-cpu-prof](../images/performance-cpu-prof.png)

![performance-heap-prof](../images/performance-heap-prof.png)

In questo esempio, sulla macchina dell'autore, abbiamo visto che il caricamento `richiesta` ha preso quasi mezzo secondo, mentre `node-fetch` ha preso drammaticamente meno memoria e meno di 50ms.

## 2) Caricamento ed esecuzione del codice troppo presto

Se si dispone di costose operazioni di installazione, considerare di rinviare quelli. Ispeziona tutti i lavori eseguiti subito dopo l'avvio dell'applicazione. Invece di sparare subito tutte le operazioni, considera di sbalzarle in una sequenza più strettamente allineata con il viaggio dell'utente.

Nello sviluppo tradizionale di Node.js, siamo abituati a mettere tutte le nostre istruzioni `require()` in alto. Se stai scrivendo la tua applicazione Electron usando la stessa strategia _e_ stai utilizzando moduli di dimensioni che non hai immediatamente bisogno, applicare la stessa strategia e rinviare il caricamento ad un tempo più opportuno.

### Perchè?

Il caricamento dei moduli è un'operazione sorprendentemente costosa, soprattutto su Windows. Quando la tua app si avvia, non dovrebbe far attendere agli utenti le operazioni che sono attualmente non necessarie.

Questo potrebbe sembrare ovvio, ma molte applicazioni tendono a fare una grande quantità di lavoro immediatamente dopo che l'app ha lanciato - come controllare gli aggiornamenti, scaricare contenuti utilizzati in un flusso successivo, o eseguire operazioni I/O del disco pesante .

Consideriamo il codice Visual Studio come esempio. Quando si apre un file, esso visualizza immediatamente il file senza alcuna evidenziazione del codice, dando la priorità a la tua capacità di interagire con il testo. Una volta che ha fatto quel lavoro, si passerà a codificare l'evidenziazione.

### Come?

Consideriamo un esempio e supponiamo che la tua applicazione stia analizzando i file nel formato fittizio `.foo`. In order to do that, it relies on the equally fictitious `foo-parser` module. Nello sviluppo tradizionale di Node.js, potresti scrivere un codice che carica con impazienza le dipendenze:

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this. iles = fs.readdirSync('. )
  }

  getParsedFiles () {
    return fooParser.parse(this. iles)
  }
}

const parser = new Parser()

module.exports = { parser }
```

Nell'esempio precedente, stiamo facendo molto lavoro che viene eseguito non appena viene caricato il file. Abbiamo bisogno di ottenere i file analizzati subito? Potremmo fare questo lavoro un po 'più tardi, quando `getParsedFiles()` è effettivamente chiamato?

```js
// "fs" è probabilmente già in fase di caricamento, so the `require()` call is cheap
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touch the disk as soon as `getFiles` is called, non prima.
    // Inoltre, assicurarsi che non stiamo bloccando altre operazioni utilizzando
    // la versione asincrona.
    this.files = this.files <unk> <unk> await fs.readdir('.')

    restituire questo. iles
  }

  async getParsedFiles () {
    // Il nostro fictitious foo-parser è un modulo grande e costoso da caricare, quindi
    // rinviare il lavoro fino a quando non abbiamo effettivamente bisogno di analizzare i file.
    // Dal momento che `require()` viene fornito con una cache dei moduli, la chiamata `require()`
    // sarà costosa solo una volta - le successive chiamate di `getParsedFiles()`
    // saranno più veloci.
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser. arse(files)
  }
}

// Questa operazione è ora molto più economica che nel nostro precedente esempio
const parser = nuovo modulo Parser()

. xports = { parser }
```

In breve, alloca le risorse "appena nel tempo" piuttosto che assegnarle tutte quando la tua app viene avviata.

## 3) Bloccare il processo principale

Il processo principale di Electron's (talvolta chiamato "processo del browser") è speciale: È il processo padre per tutti gli altri processi della tua app e il processo primario con cui il sistema operativo interagisce. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

In nessun caso dovresti bloccare questo processo e il thread dell'interfaccia utente con operazioni di lunga durata. Bloccare il thread dell'interfaccia utente significa che l'intera app congelerà fino a quando il processo principale non sarà pronto per continuare l'elaborazione.

### Perchè?

Il processo principale e la sua interfaccia utente sono essenzialmente la torre di controllo per le principali operazioni all'interno della tua app. Quando il sistema operativo dice alla tua app di un clic del mouse, passerà attraverso il processo principale prima che raggiunga la finestra. Se la tua finestra sta rendendo un'animazione liscia alle farine, sarà necessario parlare con il processo GPU su questo - ancora una volta attraverso il processo principale.

Electron e Chromium sono attenti a mettere i dischi pesanti I/O e le operazioni legate alla CPU su nuovi thread per evitare di bloccare il thread dell'UI. Dovreste fare lo stesso.

### Come?

La potente architettura multi-processo di Electron's è pronta ad assisterti con i tuoi compiti di lunga durata, ma include anche un piccolo numero di trappole delle prestazioni.

1) Per compiti pesanti della CPU a lungo termine, utilizzare [thread dei lavoratori](https://nodejs.org/api/worker_threads.html), considerare di spostarli nella finestra di navigazione, o (come ultima risorsa) generare un processo dedicato.

2) Evitare di utilizzare il modulo sincrono IPC e il modulo `remoto` il più possibile. Mentre ci sono casi di uso legittimo, è troppo facile bloccare inconsapevolmente il thread dell'interfaccia utente utilizzando il modulo `remoto`.

3) Evitare di bloccare le operazioni I/O nel processo principale. In breve, ogni volta che nodo principale. s moduli (come `fs` o `child_process`) offrono una versione sincrona o asincrona, preferisci la variante asincrona e non-bloccante .


## 4) Bloccare il processo di rendering

Dal momento che Electron navi con una versione corrente di Chrome, puoi utilizzare le funzionalità più recenti e più grandi offerte dalla piattaforma Web per rinviare o scaricare operazioni pesanti in modo da mantenere la tua app fluida e reattiva.

### Perchè?

La tua app ha probabilmente un sacco di JavaScript da eseguire nel processo di renderer. Il trucco è quello di eseguire le operazioni il più rapidamente possibile senza togliere risorse necessarie per mantenere lo scorrimento liscio, rispondere all'input dell'utente, o alle animazioni a 60fps.

L'orchestrazione del flusso di operazioni nel codice del tuo renderer è particolarmente utile se gli utenti si lamentano della tua app a volte "stuttering".

### Come?

In generale, tutti i consigli per costruire applicazioni web performanti per browser moderni si applicano anche ai renderer di Electron. The two primary tools at your disposal  are currently `requestIdleCallback()` for small operations and `Web Workers` for long-running operations.

*`requestIdleCallback()`* permette agli sviluppatori di mettere in coda una funzione per essere eseguita non appena il processo sta entrando in un periodo di inattività. Ti permette di eseguire un lavoro a bassa priorità o in background senza influire sull'esperienza utente. Per ulteriori informazioni su come utilizzarlo, [consulta la sua documentazione su MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

*Web Workers* sono un potente strumento per eseguire il codice su un thread separato. Ci sono alcune avvertenze da prendere in considerazione – consulta la documentazione multithreading [di Electron](./multithreading.md) e la documentazione [MDN per Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). Sono una soluzione ideale per qualsiasi operazione che richiede molta potenza CPU per un lungo periodo di tempo.


## 5) Polifills non necessari

One of Electron's great benefits is that you know exactly which engine will parse your JavaScript, HTML, and CSS. Se stai riproponendo il codice che è stato scritto per il web in generale, assicurati di non riempire le funzionalità incluse in Electron.

### Perchè?

Quando si costruisce un'applicazione web per Internet di oggi, gli ambienti più antichi dettano quali funzioni si possono e non si possono usare. Anche se Electron supporta filtri CSS e animazioni ben performanti, un browser più vecchio potrebbe non farlo. Dove puoi usare WebGL, i tuoi sviluppatori potrebbero aver scelto una soluzione più affamata di risorse per supportare i telefoni più vecchi.

Quando si tratta di JavaScript, potresti aver incluso librerie di toolkit come jQuery per selettori DOM o polifill, come il `regenerator-runtime` per supportare `async/await`.

È raro che un polyfill basato su JavaScript sia più veloce della funzione nativa equivalente in Electron. Non rallentare la tua app Electron spedendo la tua versione di funzionalità standard della piattaforma web.

### Come?

Operare nell'ipotesi che i polifills nelle versioni correnti di Electron non siano necessari. In caso di dubbio, controllare [caniusi. om](https://caniuse.com/) e controlla se la versione [di Chromium utilizzata nella tua versione di Electron](../api/process.md#processversionschrome-readonly) supporta la funzionalità desiderata.

Inoltre, esamina attentamente le librerie che utilizzi. Sono davvero necessarie? `jQuery`, per esempio, è stato un tale successo che molte delle sue caratteristiche sono ora parte del [set di funzionalità JavaScript standard disponibile](http://youmightnotneedjquery.com/).

Se stai usando un transpiler/compiler come TypeScript, esaminane la sua configurazione e assicurati di mirare all'ultima versione ECMAScript supportata da Electron.


## 6) Richieste di rete non necessarie o bloccate

Evitare di recuperare raramente le risorse che cambiano da internet se potessero facilmente essere messe in bundle con la tua applicazione.

### Perchè?

Molti utenti di Electron iniziano con un'app interamente basata su web che stanno trasformando in un'applicazione desktop. Come sviluppatori web, siamo abituati a caricare risorse da una varietà di reti di distribuzione dei contenuti. Ora che si sta spedendo una corretta applicazione desktop, tenta di "tagliare la corda" dove possibile ed evitare di lasciare che i tuoi utenti aspettino risorse che non cambiano mai e che potrebbero essere facilmente incluse nella tua app.

Un esempio tipico è Google Fonts. Molti sviluppatori fanno uso di Google impressionante raccolta di font gratuiti, che viene fornito con una rete di distribuzione dei contenuti . Il passo è semplice: Includere alcune linee di CSS e Google si occuperà del resto.

Quando costruisci un'app Electron, i tuoi utenti sono meglio serviti se scarichi i caratteri e li includi nel pacchetto della tua app.

### Come?

In an ideal world, your application wouldn't need the network to operate at all. Per arrivarci, devi capire quali risorse la tua app sta scaricando \- e quanto sono grandi queste risorse.

Per farlo, apri gli strumenti per lo sviluppatore. Vai alla scheda `Rete` e controlla l'opzione `Disabilita cache`. Quindi, ricaricare il renderer. A meno che la tua app vieti tali ricariche, di solito puoi attivare un ricarico colpendo `Cmd + R` o `Ctrl + R` con gli strumenti di sviluppo a fuoco.

Gli strumenti ora registreranno meticolosamente tutte le richieste di rete. In un primo passaggio, fare il punto di tutte le risorse scaricate, concentrandosi sui file più grandi prima. Qualcuno di loro immagini, font o file multimediali che non cambiano e potrebbero essere inclusi nel tuo pacchetto? In caso affermativo, includerli.

Come passo successivo, abilita `Network Throttling`. Trova il menu a tendina che attualmente legge `Online` e seleziona una velocità più lenta come `Fast 3G`. Ricarica il tuo renderer e scopri se ci sono risorse che la tua app è inutilmente in attesa. In molti casi, un'app aspetterà una richiesta di rete per completare nonostante non abbia effettivamente bisogno della risorsa coinvolta.

Come suggerimento, caricare risorse da Internet che si potrebbe voler modificare senza spedire un aggiornamento di un'applicazione è una strategia potente. Per un controllo avanzato su come le risorse vengono caricate, considera di investire in [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## 7) Bundle il vostro codice

Come già indicato in "[Caricamento ed esecuzione del codice troppo presto](#2-loading-and-running-code-too-soon)", chiamata `require()` è un'operazione costosa. Se sei in grado di farlo, raggruppa il codice della tua applicazione in un unico file.

### Perchè?

Lo sviluppo JavaScript moderno di solito coinvolge molti file e moduli. Mentre va benissimo per lo sviluppo con Electron, ti consigliamo vivamente di raggruppare tutto il tuo codice in un unico file per assicurarti che il sovraccarico incluso nella chiamata `require()` sia pagato solo una volta quando la tua applicazione è caricata.

### Come?

Ci sono numerosi pacchetti JavaScript là fuori e sappiamo meglio che rabbia la comunità raccomandando uno strumento su un altro. Tuttavia, ti consigliamo di utilizzare un bundler in grado di gestire l'ambiente unico di Electron, che deve gestire entrambi i Node. s e ambienti del browser.

A partire dalla scrittura di questo articolo, le scelte popolari includono [Webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), e [rollup.js](https://rollupjs.org/).
