# Piattaforme supportate

Le seguenti piattaforme sono supportate da Electron:

### macOS

Solo i binari a 64bit sono forniti per macOS e la versione minima supportata è macOS 10.9.

### Windows

Windows 7 e superiori sono supportati, sistemi operativi più vecchi non sono supportati (e non funzioneranno).

Entrambi i binari `ia32` (`x86`) e `x64` (`amd64`) sono forniti per Windows. Nota, la versione `ARM` di Windows non è supportata per ora.

### Linux

I binari `ia32` (`i686`) e `x64` (`amd64`) di Electron sono compilati su Ubuntu 12.04, i binari `armv7l` sono compilati tramite ARM v7 con hard-float ABI e NEON per Debian Wheezy.

[Fino alla release 2.0 di Electron](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron continuerà a rilasciare i binari `armv7l` con `arm` come semplice suffisso. Entrambi i binari sono identici.

Se il binario precompilato può essere eseguito su una distribuzione dipende dal fatto che la distribuzione includa le librerie a cui Electron è collegato dalla piattaforma di compilazione, quindi solo su Ubuntu 12.04 è garantita l'esecuzione, ma le seguenti piattaforme sono anche verificate per essere in grado di eseguire i binari precompilati di Electron:

* Ubuntu 12.04 e superiori
* Fedora 21
* Debian 8