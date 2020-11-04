# Supporto Electron

## Trovare Supporto

Se hai un problema di sicurezza, vedi il [documento di sicurezza](https://github.com/electron/electron/tree/master/SECURITY.md).

Se stai cercando un aiuto di programmazione o vuoi partecipare ad una discussione con altri sviluppatori che usano Electron, puoi interagirci in queste posizioni:
- [`Electron's Discord`](https://discord.com/invite/electron) has channels for:
  - Getting help
  - Ecosystem apps like [Electron Forge](https://github.com/electron-userland/electron-forge) and [Electron Fiddle](https://github.com/electron/fiddle)
  - Sharing ideas with other Electron app developers
  - And more!
- [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
- Canale `#atom-shell` su Freenode
- `#electron` canale su [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`electron-ru`](https://telegram.me/electron_ru) *(Russo)*
- [`electron-br`](https://electron-br.slack.com) *(Brasiliano Portoghese)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coreano)*
- [`electron-jp`](https://electron-jp.slack.com) *(Giapponese)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turco)*
- [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
- [`electron-pl`](https://electronpl.github.io) *(Polonia)*

Se vorresti contribuire ad Electron, vedi il [documento contributi](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Se hai trovato bug in una [versione supportata](#supported-versions) di Electron, riportalo con il [tracciatore di problemi](../development/issues.md).

[fantastico-electron](https://github.com/sindresorhus/awesome-electron) è una lista mantenuta dalla community di utili app esemplari, strumenti e risorse.

## Versioni Supportate

Le ultime tre versioni principali *stable* sono supportate dal team Electron. Ad esempio, se l'ultima versione è 6.1.x, sono supportati sia 5.0.x che come la serie 4.2.x.  Supportiamo solo l'ultima versione minore per ogni serie di release stabile.  Ciò significa che nel caso di un dispositivo di sicurezza 6.1. riceverà la correzione, ma non rilasceremo una nuova versione di 6.0.x.

L'ultima versione stabile riceve unilateralmente tutte le correzioni da `master`, e la versione precedente riceve la stragrande maggioranza di quelle correzioni come tempo e larghezza di banda garantite. La più antica release line supportata riceverà direttamente solo le correzioni di sicurezza.

Tutte le linee di rilascio supportate accetteranno richieste di pull esterne al backport correzioni precedentemente unite a `master`, anche se questo può essere caso per caso per alcune vecchie linee supportate. Tutte le decisioni contestate intorno ai backport della linea di rilascio saranno risolte dal [Gruppo di Lavoro Rilasciati](https://github.com/electron/governance/tree/master/wg-releases) come elemento dell'ordine del giorno nella loro riunione settimanale la settimana in cui viene sollevato il backport PR.

Quando un'API viene modificata o rimossa in un modo che interrompe le funzionalità esistenti, la funzionalità precedente sarà supportata per un minimo di due versioni principali quando possibile prima di essere rimossa. Per esempio, se una funzione richiede tre argomenti, e quel numero è ridotto a due nella versione principale 10, la versione a tre argomenti continuerà a funzionare fino a quando, come minimo, la versione principale 12. Superata la soglia minima di due versioni , cercheremo di supportare la compatibilità indietro oltre due versioni fino a quando i manutentori ritengono che l'onere di manutenzione sia troppo alto per continuare a farlo.

### Versioni attualmente supportate
- 10.x.y
- 9.x.y
- 8.x.y

### Fine vita

Quando una branca di rilasci raggiunge la fine del suo ciclo di supporto, la serie è deprecata in NPM e viene fatto un rilascio di fine supporto. Questo rilascio aggiunge un avviso per informare che si sta usando una versione di Electron non supportata.

Queste fasi aiutano gli sviluppatori di app ad imparare quando una branca in uso non è supportata, ma senza essere troppo intrusivi con gli utenti.

Se un'app ha circostanze eccezionali e necessita di girare su una serie non supportata di Electron, gli sviluppatori possono silenziare l'avviso di fine supporto omettendo il rilascio finale dal `pacchetto.json` `devDependencies` dell'app. Per esempio, dalla fine serie 1-6-x con una fine del supporto al rilascio 1.6.18 gli sviluppatori possono scegliere di rimanere alla prima versione senza avvisi con `devDipendenza` di `"electron": 1.6.0 - 1.6.17`.

## Piattaforme supportate

Le seguenti piattaforme sono supportate da Electron:

### macOS

Sono forniti solo binari 64bit per macOS e la versione macOS minima supportata è macOS 10.10 (Yosemite).

### Windows

Windows 7 e superiori sono supportati, sistemi operativi più vecchi non sono supportati (e non funzioneranno).

Sia `ia32` (`x86`) che `x64` (`amd64`) binari sono forniti per Windows. [Electron 6.0.8 and later add native support for Windows on Arm (`arm64`) devices](windows-arm.md). È possibile eseguire applicazioni confezionate con versioni precedenti utilizzando il binario ia32.

### Linux

I binari precostruiti di Electron sono costruiti su Ubuntu 18.04.

Se il binario precompilato può essere eseguito su una distribuzione dipende dal fatto che la distribuzione includa le librerie a cui Electron è collegato dalla piattaforma di compilazione, quindi solo su Ubuntu 18.04 è garantita l'esecuzione, ma le seguenti piattaforme sono anche verificate per essere in grado di eseguire i binari precompilati di Electron:

* Ubuntu 14.04 and più nuove
* Fedora 24 e più nuove
* Debian 8 e più nuove
