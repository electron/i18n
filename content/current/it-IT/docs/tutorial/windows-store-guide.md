# Guida a Windows Store

Con Windows 10, il buon vecchio eseguibile win32 ha un nuovo fratello: la piattaforma universale Windows. Il nuovo `. il formato ppx` non solo abilita un certo numero di nuove potenti API come Cortana o Notifiche Push, ma attraverso Windows Store, semplifica anche l'installazione e l'aggiornamento.

Microsoft [ha sviluppato uno strumento che compila le app Electron come `. ppx` packages](https://github.com/catalystcode/electron-windows-store), che consente agli sviluppatori di utilizzare alcune delle chicche trovate nel nuovo modello applicativo . Questa guida spiega come usarlo - e quali sono le funzionalità e le limitazioni di un pacchetto Electron AppX.

## Requisiti e Contesto

Windows 10 "Anniversary Update" è in grado di eseguire win32 `.exe` binari lanciandoli insieme a un filesystem virtualizzato e un registro. Entrambi sono creati durante la compilazione eseguendo app e installer all'interno di un contenitore Windows , permettendo a Windows di identificare esattamente quali modifiche al sistema operativo sono fatte durante l'installazione. Collegando l'eseguibile con un filesystem virtuale e un registro virtuale permette a Windows di abilitare l'installazione e la disinstallazione con un clic .

Inoltre, l'exe viene lanciato all'interno del modello appx - il che significa che può utilizzare molte delle API disponibili per la piattaforma universale Windows. Per ottenere ancora più capacità, un'app Electron può accoppiarsi con un'attività invisibile in background UWP lanciata insieme all' `exe` - sorta di lanciata come sidekick per eseguire le attività in background, ricevere notifiche push o comunicare con altre applicazioni UWP .

Per compilare qualsiasi app Electron esistente, assicurati di avere i seguenti requisiti:

* Windows 10 con aggiornamento Anniversario (rilasciato 2 agosto 2016)
* L'SDK Windows 10, [scaricabile qui](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Almeno il nodo 4 (per controllare, eseguire `node -v`)

Poi, vai e installa il `electron-windows-store` CLI:

```sh
npm install -g electron-windows-store
```

## Fase 1: Impacchetta La Tua App Electron

Costruisci il pacchetto dell'applicazione impiegando [electron-packager](https://github.com/electron/electron-packager) (o uno strumento simile). Assicurati di rimuovere `node_modules` di cui non hai bisogno nell'applicazione finale, dal momento che qualsiasi modulo non necessario aumenterà la dimensione della tua applicazione.

L'output dovrebbe sembrare questo:

```plaintext
├<unk> <unk> Ghost.exe
├<unk> <unk> <unk> LICENSE
<unk> <unk> <unk> <unk> <unk> content_resources_200_percent.pak
<unk> <unk> <unk> <unk> content_shell.pak
<unk> <unk> <unk> <unk> d3dcompiler_47. ll
├<unk> <unk> ffmpeg.dll
├<unk> <unk> <unk> icudtl.dat
<unk> <unk> <unk> libEGL.dll
<unk> <unk> libGLESv2.dll
<unk> <unk> locales
<unk> <unk> <unk> <unk> am. ak
<unk> <unk> <unk> <unk> <unk> ar.pak
<unk> <unk> <unk> [...]
<unk> <unk> <unk> <unk> node. ll
├<unk> <unk> resources
<unk> <unk> <unk> <unk> <unk> app. sar
├<unk> <unk> v8_context_snapshot.bin
<unk> <unk> <unk> <unk> squirrel.exe
<unk> <unk> <unk> ui_resources_200_percent.pak
```

## Passo 2: Esecuzione electron-windows-store

Da un PowerShell elevato (eseguilo "come Administrator"), esegui `electron-windows-store` con i parametri richiesti, passando sia le directory di input che quelle di output, il nome e la versione dell'app e confermando che `node_modules` dovrebbero essere appiattiti.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Una volta eseguito, lo strumento va a funzionare: accetta la tua app Electron come input, appiattendo i `node_modules`. Poi, archivia la tua applicazione come `app.zip`. Utilizzando un programma di installazione e un contenitore di Windows, lo strumento crea un pacchetto "espanso" AppX - compreso il manifesto dell'applicazione di Windows (`AppXManifest. ml`) così come il file system virtuale e il registro virtuale all'interno della cartella di output.

Una volta creati i file AppX espansi, lo strumento utilizza il Windows App Packager (`MakeAppx. xe`) per creare un pacchetto singolo file AppX da quei file su disco. Infine, lo strumento può essere utilizzato per creare un certificato di fiducia sul computer per firmare il nuovo pacchetto AppX. Con il pacchetto AppX firmato, CLI può anche installare automaticamente il pacchetto sulla vostra macchina.

## Passo 3: Utilizzo del pacchetto AppX

Per eseguire il tuo pacchetto, i tuoi utenti avranno bisogno di Windows 10 con il cosiddetto "Anniversary Update" - i dettagli su come aggiornare Windows possono essere trovati [qui](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

In opposizione alle tradizionali applicazioni UWP, le applicazioni confezionate attualmente devono essere sottoposte a un processo di verifica manuale , per cui puoi applicare [qui](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). Nel frattempo, tutti gli utenti saranno in grado di installare il pacchetto facendo doppio clic su di esso, quindi un invio al negozio potrebbe non essere necessario se stai cercando un metodo di installazione più facile. In ambienti gestiti (di solito le imprese), il `Add-AppxPackage` [PowerShell Cmdlet può essere utilizzato per installarlo in modo automatizzato](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Un'altra importante limitazione è che il pacchetto AppX compilato contiene ancora un eseguibile win32 - e quindi non verrà eseguito su Xbox, HoloLens o Phone.

## Opzionale: Aggiungi funzionalità UWP utilizzando un BackgroundTask

È possibile associare l'app Electron con un invisibile attività in background UWP che ottiene per fare pieno uso di Windows 10 funzioni - come notifiche push, Integrazione di Cortana, o live tiles.

Per controllare come un'applicazione Electron che utilizza un'attività in background per inviare notifiche toast e live tiles, [controlla il campione fornito da Microsoft-](https://github.com/felixrieseberg/electron-uwp-background).

## Opzionale: Convertire utilizzando la virtualizzazione del contenitore

Per generare il pacchetto AppX, l'archivio `electron-windows-store` CLI utilizza un modello che dovrebbe funzionare per la maggior parte delle applicazioni Electron. Tuttavia, se si utilizza un installatore personalizzato , o se si verificano problemi con il pacchetto generato, tu puoi provare a creare un pacchetto usando compilation con un Windows Container - in quella modalità, il CLI installerà ed eseguirà l'applicazione in un contenitore di Windows vuoto per determinare quali modifiche la tua applicazione sta esattamente facendo al sistema operativo .

Prima di eseguire la CLI per la prima volta, dovrai configurare il "Windows Desktop App Converter". Questo richiederà alcuni minuti, ma non preoccuparti - devi solo questo una volta. Scarica e Desktop App Converter da [qui](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). Riceverai due file: `DesktopAppConverter.zip` e `BaseImage-14316.wim`.

1. Decomprimi `DesktopAppConverter.zip`. Da un elevatissimo PowerShell (aperto con "run as Administrator", ensure that your systems execution policy allows us to run everything we want to run by call `Set-ExecutionPolicy bypass`.
2. Quindi, eseguire l'installazione del Desktop App Converter, passando nella posizione della base di Windows Image (scaricato come `BaseImage-14316. im`), chiamando `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Se l'esecuzione del comando precedente richiede un riavvio, riavviare la macchina ed eseguire nuovamente il comando precedente dopo un riavvio riuscito.

Una volta che l'installazione è riuscita, puoi passare alla compilazione della tua app Electron.
