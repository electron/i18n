# Supporto Electron

## Trovare Supporto

Se hai un problema di sicurezza, vedi il [documento di sicurezza](../../SECURITY.md).

Se stai cercando un aiuto di programmazione o vuoi partecipare ad una discussione con altri sviluppatori che usano Electron, puoi interagirci in queste posizioni:

* Categoria [`electron`](https://discuss.atom.io/c/electron) sui forum Atom
* Canale `#atom-shell` su Freenode
* Canale [`Electron`](https://atom-slack.herokuapp.com) su Atom's Slack
* [`electron-ru`](https://telegram.me/electron_ru) *(Russo)*
* [`electron-br`](https://electron-br.slack.com) *(Brasiliano Portoghese)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coreano)*
* [`electron-jp`](https://electron-jp.slack.com) *(Giapponese)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turco)*
* [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
* [`electron-pl`](https://electronpl.github.io) *(Polonia)*

Se vorresti contribuire ad Electron, vedi il [documento contributi](../../CONTRIBUTING.md).

Se hai trovato bug in una [versione supportata](#supported-versions) di Electron, riportalo con il [tracciatore di problemi](../development/issues.md).

[fantastico-electron](https://github.com/sindresorhus/awesome-electron) è una lista mantenuta dalla community di utili app esemplari, strumenti e risorse.

## Versioni Supportate

Le ultime tre branche rilasciate sono supportate dal team di Electron. Per esempio, se l'ultimo rilascio è 2.0.x, la serie 2-0-x è supportata, come le due precedenti serie di rilascio, la 1-7-x e la 1-8-x.

Quando una branca di rilasci raggiunge la fine del suo ciclo di supporto, la serie è deprecata in NPM e viene fatto un rilascio di fine supporto. Questo rilascio aggiunge un avviso per informare che si sta usando una versione di Electron non supportata.

Queste fasi aiutano gli sviluppatori di app ad imparare quando una branca in uso non è supportata, ma senza essere troppo intrusivi con gli utenti.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## Piattaforme supportate

Le seguenti piattaforme sono supportate da Electron:

### macOS

Solo i binari a 64bit sono forniti per macOS e la versione minima supportata è macOS 10.9.

### Windows

Windows 7 e superiori sono supportati, sistemi operativi più vecchi non sono supportati (e non funzioneranno).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Running Electron apps on Windows for ARM devices is possible by using the ia32 binary.

### Linux

I binari `ia32` (`i686`) e `x64` (`amd64`) di Electron sono compilati su Ubuntu 12.04, i binari `armv7l` sono compilati tramite ARM v7 con hard-float ABI e NEON per Debian Wheezy.

[Fino alla release 2.0 di Electron](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron continuerà a rilasciare i binari `armv7l` con `arm` come semplice suffisso. Entrambi i binari sono identici.

Se il binario precompilato può essere eseguito su una distribuzione dipende dal fatto che la distribuzione includa le librerie a cui Electron è collegato dalla piattaforma di compilazione, quindi solo su Ubuntu 12.04 è garantita l'esecuzione, ma le seguenti piattaforme sono anche verificate per essere in grado di eseguire i binari precompilati di Electron:

* Ubuntu 12.04 and più nuove
* Fedora 21
* Debian 8