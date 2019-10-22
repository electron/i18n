# Istruzioni per la compilazione (Windows)

Segui le linee guida sotto per costruire Electron su Windows.

## Prerequisiti

* Windows 10 / Server 2012 R2 o superiore
* Visual Studio 2017 15.7.2 o superiore - [scarica VS 2019 Community Edition gratis](https://www.visualstudio.com/vs/) 
  * Vedi [la documentazione di compilazione Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) per ulteriori dettagli su quali componenti Visual Studio sono richiesti.
  * Se il tuo Visual Studio è installato in una directory diversa da quella predefinita, avrai bisogno di impostare poche variabili ambientali per puntare le catene di costruzione al tuo percorso di installazione. 
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community` (rimpiazza `2019` e `Community` con le tue versioni installate)
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`
* [Python 2.7.10 o superiore](http://www.python.org/download/releases/2.7/) 
  * Contrariamente alle istruzioni di configurazione `depot_tools` collegate sotto, avrai bisogno di usare il tuo Python installato localmente con almeno la versione 2.7.10 (con supporto per TLS 1.2). Per farlo, assicurati che in **PATH**, il tuo Python localmente installato venga prima della cartella `depot_tools`. Adesso `depot_tools` viene ancora con Python 2.7.6, che causerà il fallimento del comando `gclient` (vedi https://crbug.com/868864).
  * [Python per Estensioni Windows /pywin32)](https://pypi.org/project/pywin32/#files) è anch'esso necessario per eseguire il processo di costruzione.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Strumenti di Debug per Windows di Windows SDK 10.0.15063.468 se pianifichi di crearvi una distribuzione completa `symstore.exe` è usato per creare un negozio di simboli da `.pdb` file. 
  * Differenti versioni di SDK possono essere installate fianco a fianco. Per installare SDK, apri Visual Studio Installer, seleziona `Modifica` → `Componenti Individuali`, scendi e seleziona l'appropriato SDK Windows per installare. Un'altra opzione sarebbe di guardare al [Windows SDK ed emulatore archivio](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) e scaricare la versione standalone del SDK rispettivamente.
  * Gli Strumenti di Debug SDK devono anch'essi essere installati. Se l'SDK di Windows 10 era installato tramite il Visual Studio Installer, allora possono essere installati andando a: `Pannello di Controllo` → `Programmi` → `Programmi e Funzionalità` → Seleziona il "Kit di Sviluppo Software Windows" → `Cambia` → `Modifica` → Spunta "Strumenti di Debug per Windows" → `Modifica`. Oppure, puoi scaricare l'installatore SDK standalone ed usarlo per installare gli Strumenti di Debug.

Se al momento non hai un'installazione Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) ha versioni timebombed di Windows che puoi usare per costruire Electron.

La costruzione di Electron viene eseguita interamente con script da riga di comando e non può essere eseguita con Visual Studio. Puoi sviluppare Electron con qualsiasi editor, ma il supporto per la creazione con Visual Studio arriverà in futuro.

**Nota:** Anche se Visual Studio non è usato per costruire, è comunque **richiesto** perché ci servono le catene di costruzione che fornisce.

## Costruzione

Vedi [Istruzioni di Costruzione: GN](build-instructions-gn.md)

## Build 32bit

Per costruire l'obiettivo 32bit, devi passare `target_cpu = "x86"` come arg GN. Puoi costruire l'obiettivo 32bit accanto all'obiettivo 64bit usando una directory di output differente per GN, es. `out/Release-x86`, con differenti argomenti.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Le altre fasi di costruzione sono esattamente le stesse.

## Progetto Visual Studio

Per generare un progetto Visual Studio, puoi passare il parametro `-- ide=vs2017` a `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Risoluzione dei problemi

### Comando xxxx non trovato

Se hai incontrato un errore come `Comando xxxx non trovato` potresti provare ad usare la console `VS2015 Prompt dei Comandi` per eseguire gli script di costruzione.

### Errore fatale nel compilatore interno: C1001

Assicurati di aver installato l'ultimo aggiornamento di Visual Studio.

### LNK1181: impossibile aprire il file di input 'kernel32.lib'

Prova a reinstallare Node.js 32 bit.

### Errore: ENOENT, stat 'C:\Utenti\NOMEUTENTE\AppData\Roaming\npm'

Creare questa directory [dovrebbe risolvere il problema](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp non è riconosciuto come comando interno o esterno

Puoi ottenere questo errore se stai usando Git Bash per costruire, dovresti usare, invece, PowerShell o il Prompt dei Comandi VS2015.

### impossibile creare la directory a '...' Nome file troppo lungo

node.js ha alcuni [nomi di percorso estremamente lunghi](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), e per impostazione predefinita non gestisce i nomi di percorso lunghi in modo corretto (anche se windows li supporta). Questo dovrebbe correggerlo:

```sh
$ git config --system core.longpaths true
```

### errore: uso dell'identificatore non dichiarato 'DefaultDelegateCheckMode'

Ciò può succedere durante la costruzione, quando gli Strumenti di Debug per Windows sono stati installati con il Kit Driver di Windows. Disinstalla il Kit Driver Windows ed installa gli Strumenti di Debug con i passaggi sopra descritti.

### Errore di importazione: nessun modulo denominato win32file

Assicurati di aver installato `pywin32` con `pip install pywin32`.

### Costruisci Script Hang Until Keypress

Questo bug è una "funzionalità" del prompt dei comandi di Windows. Succede quando si clicca all'interno della finestra del prompt con `QuickEdit` abilitato ed è inteso per consentire la selezione e la copia del testo di output in modo facile. Visto che ogni click accidentale metterà in pausa il processo di costruzione, potresti voler disabilitare questa funzionalità nelle proprietà del prompt dei comandi.