# Boilerplate e CLI

Lo sviluppo di electron è indubbio. Non c'è un un solo modo di sviluppare, compilare, confezionare, o rilasciare un applicazione basata su Electron. Funzionalità aggiuntive per Electron, entrambe per build e run-time, possono solitamente essere trovate su [npm](https://www.npmjs.com/search?q=electron) in pacchetti individuali, permettendo agli sviluppatori di costruire sia la propria app che la propria linea di assemblaggio di cui hanno bisogno.

Questo livello di modularità ed estensibilità garantisce che tutti gli sviluppatori che lavorano con Electron, che si tratti di piccoli o grandi team, non siano mai limitati in ciò che possono o non possono fare in ogni momento durante il ciclo di sviluppo. Comunque, per molti sviluppatori, le linee guida della community sugli strumenti boilerplates o a linea di comando potrebbero drammaticamente semplificare il modo di compilare, confezionare e rilasciare la propria app.

## Boilerplate contro CLI

I boilerplate sono dei punti di partenza da cui iniziare a costruire la propria applicazione. Di solito si trovano sotto forma di repository che possono essere clonati e modificati a piacere.

Gli strumenti da riga di comando invece possono essere utilizzati sia nello sviluppo che nel rilascio. Sono più utili, ma definiscono delle linee guida su come il codice deve essere strutturato. *Specialmente per i principianti, l'utilizzo di uno strumento da riga di comando è probabilmente più d'aiuto*.

## electron-forgia

Uno "strumento completo per costruire applicazioni Electron moderne". Electron Forge unifica in un unico pacchetto gli strumenti di sviluppo già esistenti (e ben documentati/manutenuti), in modo che chiunque possa iniziare a sviluppare con Electron.

Electron Forge fornisce [un template pronto all'uso](https://electronforge.io/templates) che utilizza Webpack come bundler. Include una configurazione typescript di esempio e 2 file di configurazione che consentono una facile personalizzazione. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron/electron-packager)) – changes made by Electron maintainers (like Slack) benefit Forge's users, too.

Maggiori informazioni e documentazione sono disponibili su [electronforge.io](https://electronforge.io/).

## electron-builder

Una "soluzione completa per la costruzione ed il packaging di app Electron pronte per la distribuzione" che si basano su un'esperienza integrata. [`electron-builder`](https://github.com/electron-userland/electron-builder) aggiunge una singola dipendenza e gestisce internamente tutti gli ulteriori requisiti.

`electron-builder` sostituisce funzionalità e moduli utilizzati dai manutentori Electron (come l'auto aggiornamento) con degli equivalenti custom. Generalmente sono ben integrati, ma hanno meno cose in comune con le app Electron più popolari come Atom, Visual Studio Code o Slack.

Maggiori informazioni e documentazione sono disponibili nel [repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

Se non si desidera utilizzare tool ma un solido boilerplate da cui iniziare, quello di CT Lin's ([`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate)) potrebbe essere un buon punto di partenza. È abbastanza popolare nella comunità ed utilizza `electron-builder` internamente.

## Altri strumenti e Boilerplate

La lista ["Awesome Electron" ](https://github.com/sindresorhus/awesome-electron#boilerplates) contiene diversi strumenti e boilerplate. Se si trova la lunghezza della lista intimidatoria, si consideri che anche l'aggiunta di strumenti man mano che si va avanti è un valido approccio.
