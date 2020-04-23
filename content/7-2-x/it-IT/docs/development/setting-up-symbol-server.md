# Impostare Server Symbol nel Debugger

I simboli di debug ti consentono di avere migliori sessioni di debug. Hanno informazioni sulle funzioni contenute in librerie eseguibili e dinamiche e ti forniscono informazioni per ottenere pile di chiamata pulite. Un Server Symbol consente al debugger di caricare simboli, binari e sorgenti corrette automaticamente senza forzare gli utenti a scaricare grandi file di debug. Il server funziona come il [server symbol di Microsoft](https://support.microsoft.com/kb/311503) quindi la documentazione potrà essere utile.

Nota che poiché le build rilasciate di Electron sono altamente ottimizzate, il debug non è sempre facile. Il debugger non potrà mostrarti il contenuto di tutte le variabili ed il percorso di esecuzione può sembrare strano per le chiamata in entrate, di coda ed altre ottimizzazioni del compilatore. L'unica soluzione è costruire una build locale non ottimizzata.

L'URL server symbol ufficiale per Electron è https://electron-symbols.githubapp.com. Non puoi visitare questo URL direttamente, devi aggiungerlo al percorso symbol del tuo strumento di debug. Negli esempi sotto, una directory di cache locale è usata per evitare ripetutamente lo scaricamento del PDB dal server. Rimpiazza `c:\code\symbols` con una directory della cache appropriata sulla tua macchina.

## Usare il Server Symbol in Windbg

Il percorso symbol Windbg è configurato con un valore stringa delimitato con caratteri asterisco. Per usare solo il server symbol di Electron, aggiungi la voce seguente al tuo percorso symbol (**Nota:** puoi rimpiazzare `c:\code\symbols` con qualsiasi directory scrivibile sul tuo computere, se preferisci aggiungere una posizione differente per i symbols scaricati):

```powershell
SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

Imposta questa stringa come `_NT_SYMBOL_PATH` nell'ambiente, usando i menu Windbg, o digitando il comando `.sympath`. Se desideri ottenere symbols dal server symbol Microsoft, dovresti prima elencare:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

## Usare il server dei simboli in Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' />
<img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Risoluzione dei problemi: i simboli non verranno caricati

Digita i seguenti comandi in Windbg per visualizzare il motivo del mancato caricamento dei simboli:

```powershell
> !sym noisy
> .reload /f electron.exe
```
