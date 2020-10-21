# Distribuzione delle applicazioni

Per distribuire la tua app con Electron, devi imballarla e riprenderla. Il modo più semplice per farlo è utilizzare uno dei seguenti strumenti di confezionamento di terze parti:

* [electron-forgia](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Questi strumenti si occuperanno di tutti i passi necessari per finire con applicazioni Electron distribuibili, come il confezionamento dell'applicazione, il rebranding dell'eseguibile, l'impostazione delle icone giuste e la creazione di installatori opzionali.

## Distribuzione manuale
Puoi anche scegliere di preparare manualmente la tua app per la distribuzione. Le misure necessarie a tal fine sono illustrate qui di seguito.

Per distribuire la tua app con Electron, devi scaricare i [binari precostruiti di Electron](https://github.com/electron/electron/releases). Successivamente, la cartella contenente la tua app dovrebbe essere chiamata `app` e posizionata nella directory delle risorse di Electron come mostrato negli esempi seguenti. Nota che la posizione dei binari precostruiti di Electron's è indicata con `electron/` negli esempi qui sotto.

Su macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
├<unk> <unk> package.json
├<unk> <unk> main.js
<unk> <unk> <unk> <unk> index.html
```

Su Windows e Linux:

```plaintext
electron/resources/app
├<unk> <unk> <unk> package.json
<unk> <unk> <unk> <unk> <unk> main.js
<unk> <unk> <unk> <unk> <unk> index.html
```

Quindi esegui `Electron.app` (o `electron` su Linux, `electron. xe` su Windows), ed Electron inizieranno come app. La directory `electron` sarà quindi la tua distribuzione per consegnare agli utenti finali.

## Imballare la tua app in un file

Oltre a spedire l'app copiando tutti i suoi file sorgente, puoi anche mettere la tua app in un archivio [asar](https://github.com/electron/asar) per evitare di esporre il codice sorgente della tua app agli utenti.

Per utilizzare un archivio `asar` per sostituire la cartella `app` , devi rinominare l'archivio in `app. sar`e metterlo nella directory delle risorse di Electron, come qui sotto, e Electron proverà quindi a leggere l'archivio e a partire da esso.

Su macOS:

```plaintext
electron/Electron.app/Contents/Resources/
◆ app.asar
```

Su Windows e Linux:

```plaintext
electron/resources/
l’onorevole app.asar
```

Maggiori dettagli possono essere trovati in [Application packaging](application-packaging.md).

## Rebranding con Binari scaricati

Dopo aver raggruppato l'app in Electron, si desidera rebrand Electron prima di distribuirla agli utenti.

### Windows

Puoi rinominare `electron. xe` con qualsiasi nome desideri, e modificare la sua icona e altre informazioni con strumenti come [rcedit](https://github.com/electron/rcedit).

### macOS

Puoi rinominare `Electron. pp` a qualsiasi nome che desideri, e devi anche rinominare il `CFBundleDisplayName`, `CFBundleIdentifier` e `CFBundleName` campi nei seguenti file:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Puoi anche rinominare l'app helper per evitare di mostrare `Electron Helper` nel Monitoraggio attività, ma assicurati di aver rinominato il nome dell'eseguibile dell'applicazione helper .

La struttura di un'app rinominata sarebbe simile:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
         └── MyApp Helper
```

### Linux

Puoi rinominare l'eseguibile `electron` in qualsiasi nome tu voglia.

## Rebranding by Rebuilding Electron from Source

E 'anche possibile rebrand Electron cambiando il nome del prodotto e costruirlo dalla fonte. Per fare questo è necessario impostare l'argomento di compilazione corrispondente al nome del prodotto (`electron_product_name = "YourProductName"`) negli args `. n` file e ricostruisce.

### Creazione di una forchetta elettronica personalizzata

La creazione di un fork personalizzato di Electron non è quasi certamente qualcosa che dovrai fare per costruire la tua app, anche per applicazioni "Livelli di produzione". Utilizzando uno strumento come `electron-packager` o `electron-forge` ti permetterà di "Rebrand" Electron senza dover fare questi passaggi.

Devi effettuare il fork di Electron quando hai un codice C++ personalizzato che hai patchato direttamente in Electron, che o non può essere upstreamed, o è stato rifiutato dalla versione ufficiale. Come manutentori di Electron, vorremmo molto far funzionare il tuo scenario, quindi prova il più difficile possibile per ottenere i tuoi cambiamenti nella versione ufficiale di Electron, ti sarà molto più facile e apprezziamo il tuo aiuto.

#### Creare un Rilascio Personalizzato con surf-build

1. Installa [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Crea un nuovo secchio S3 e crea la seguente struttura di directory vuota:

    ```sh
    - electron/
      - simboli/
      - dist/
    ```

3. Imposta le seguenti variabili di ambiente:

  * `ELECTRON_GITHUB_TOKEN` - un token che può creare versioni su GitHub
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - il luogo dove caricherai le intestazioni Node.js e i simboli
  * `ELECTRON_RELEASE` - Impostare a `true` e la parte di caricamento verrà eseguita, leave unset and `surf-build` effettuerà controlli di tipo IC, appropriati per eseguire ogni pull request.
  * `CI` - Impostare a `true` altrimenti fallirà
  * `GITHUB_TOKEN` - impostalo come `ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - impostato su `C:\Temp` su Windows per evitare problemi di percorso troppo lunghi
  * `TARGET_ARCH` - impostato a `ia32` o `x64`

4. In `script/upload. y`, you _must_ set `ELECTRON_REPO` to your fork (`MYORG/electron`), specialmente se sei un collaboratore di Electron corretto.

5. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Aspetta un tempo molto, molto lungo per completare la costruzione.
