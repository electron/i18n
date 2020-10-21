# Versionamento di Electron

> Uno sguardo dettagliato alla nostra politica di versionamento e di attuazione.

A partire dalla versione 2.0.0, Electron segue [semver](#semver). Il seguente comando installerà la build stabile più recente di Electron:

```sh
npm install --save-dev electron
```

Per aggiornare un progetto esistente per utilizzare l'ultima versione stabile:

```sh
npm install --save-dev electron@latest
```

## Versione 1.x

Versioni di Electron *< 2.* non era conforme alle specifiche [semver](http://semver.org) : le versioni principali corrispondevano alle modifiche delle API degli utenti finali, versioni minori corrispondevano a versioni principali di Chromium e versioni patch corrispondevano a nuove caratteristiche e correzioni di bug. Per quanto conveniente per gli sviluppatori che uniscono le funzionalità, crea problemi per gli sviluppatori di applicazioni rivolte al cliente. I cicli di test QA di applicazioni importanti come Slack, Stride, Team, Skype, Codice VS, Atom, e Desktop può essere lungo e la stabilità è un risultato altamente desiderato. C'è un alto rischio di adottare nuove funzionalità mentre si tenta di assorbire le correzioni di bug.

Ecco un esempio della strategia 1.x:

![](../images/versioning-sketch-0.png)

Un'app sviluppata con `1.8.1` non può prendere il `1. .3` bug fix senza nemmeno assorbire `1. .2` funzione, o backporting il fix e mantenendo una nuova linea di rilascio.

## Versione 2.0 e Oltre

Ci sono diversi cambiamenti importanti dalla nostra strategia 1.x delineata di seguito. Ogni cambiamento è destinato a soddisfare le esigenze e le priorità di sviluppatori / manutentori e sviluppatori di app.

1. Uso rigoroso del semver
2. Introduzione di tag semver-compliant `-beta`
3. Introduzione di [messaggi di commit convenzionali](https://conventionalcommits.org/)
4. Rami di stabilizzazione ben definiti
5. Il ramo `master` è senza versione; solo i rami di stabilizzazione contengono informazioni sulla versione

Ci occuperemo in dettaglio come funziona il ramo git, come funziona il tagging npm, cosa gli sviluppatori dovrebbero aspettarsi di vedere, e come si può cambiare il backport.

# semver

A partire dal 2.0, Electron seguirà il semver.

Di seguito è riportata una tabella che mappa esplicitamente i tipi di modifiche alla loro categoria corrispondente di semver (ad esempio maggiore, minore, patch).

| Incrementi Della Versione Maggiore                 | Incrementi Minori Versione                     | Incrementi Versione Patch                           |
| -------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------- |
| Modifiche API di interruzione di Electron          | Modifiche API senza interruzione di Electron   | Correzioni di bug di Electron                       |
| Aggiornamenti della versione principale di Node.js | Aggiornamenti della versione minore di Node.js | Aggiornamenti della versione della patch di Node.js |
| Aggiornamenti versione cromo                       |                                                | cerotti di cromo fissi,                             |


Si noti che la maggior parte degli aggiornamenti di cromo sarà considerata rottura. Correzioni che possono essere backportati saranno probabilmente cherry-picked come patch.

# Branche di Stabilizzazione

I rami di stabilizzazione sono rami che corrono paralleli al master, prendendo in solo i commit cherry-picked che sono legati alla sicurezza o alla stabilità. Questi rami non sono mai uniti di nuovo al maestro.

![](../images/versioning-sketch-1.png)

Poiché Electron 8, i rami di stabilizzazione sono sempre **principali** linee di versione, e nominato contro il seguente modello `$MAJOR-x-y` e. . `8-x-y`.  Prima abbiamo usato **linee minori** di versione e le abbiamo nominate come `$MAJOR-$MINOR-x` ad es. `2-0-x`

Consentiamo che i rami di stabilizzazione multipli esistano contemporaneamente, e intendono sostenere almeno due in parallelo in ogni momento, backportando le correzioni di sicurezza secondo necessità. ![](../images/versioning-sketch-2.png)

Le linee più vecchie non saranno supportate da GitHub, ma altri gruppi possono prendere la proprietà e backport stabilità e le correzioni di sicurezza da soli. Noi scoraggiamo questo, ma riconoscere che rende la vita più facile per molti sviluppatori di app.

# Rilasci Beta e Fix di Bug

Gli sviluppatori vogliono sapere quali versioni sono _sicure_ da usare. Anche le caratteristiche apparentemente innocenti possono introdurre regressioni in applicazioni complesse. Allo stesso tempo, bloccarsi in una versione fissa è pericoloso perché stai ignorando le patch di sicurezza e le correzioni di bug che potrebbero essere uscite dalla tua versione. Il nostro obiettivo è consentire i seguenti intervalli semver standard in `package.json`:

* Usa `~2.0.0` per ammettere solo le correzioni relative alla stabilità o alla sicurezza al rilascio `2.0.0`.
* Usa `^2.0.0` per ammettere il lavoro di funzionalità _ragionevolmente stabile_ e le correzioni di sicurezza e bug.

Ciò che è importante circa il secondo punto è che le applicazioni che utilizzano `^` dovrebbero ancora essere in grado di aspettarsi un livello ragionevole di stabilità. Per fare questo, semver consente a un _identificatore pre-rilascio_ di indicare una particolare versione non è ancora _sicuro_ o _stabile_.

Qualunque sia la vostra scelta, dovrete periodicamente saltare la versione nel vostro `package.json` come i cambiamenti di rottura sono un fatto della vita di Cromo.

Il processo è il seguente:

1. Tutte le nuove linee principali e minori iniziano con una serie beta indicata dai tag semver prerelease di `beta.`, e.g. `2.0.0-beta.1`. Dopo la prima beta, i rilasci beta successivi devono soddisfare tutte le seguenti condizioni:
    1. La modifica è retrocompatibile con le API (sono ammesse deprecazioni)
    2. Il rischio di rispettare il nostro calendario di stabilità deve essere basso.
2. Se le modifiche consentite devono essere fatte una volta che un rilascio è beta, vengono applicate e il tag prerelease viene incrementato, e. . `2.0.0-beta.2`.
3. Se una particolare versione beta è _generalmente considerata_ come stabile, sarà ri-rilasciato come una build stabile, cambiando solo le informazioni sulla versione. es. `2.0.0`. Dopo la prima stalla, tutte le modifiche devono essere correzioni di bug o di sicurezza retrocompatibili.
4. Se le correzioni di bug o le patch di sicurezza future devono essere effettuate una volta che il rilascio è stabile, vengono applicati e la versione _patch_ viene incrementata e. . `2.0.1`.

In particolare, il summenzionato significa:

1. Ammettere le variazioni non-breaking-API prima della settimana 3 nel ciclo beta è ok, anche se queste variazioni hanno il potenziale di causare effetti collaterali moderati
2. Ammettere le modifiche contrassegnate, che altrimenti non alterano i percorsi del codice esistenti, nella maggior parte dei punti del ciclo beta va bene. Gli utenti possono abilitare esplicitamente questi flag nelle loro applicazioni.
3. Ammettere caratteristiche di qualsiasi tipo dopo la Settimana 3 nel ciclo beta è 👎 senza una ragione molto buona.

Per ogni urto maggiore e minore, dovresti aspettarti di vedere qualcosa come il seguente:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Un esempio di ciclo di vita in foto:

* Viene creato un nuovo ramo di rilascio che include l'ultima serie di funzionalità. È pubblicato come `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* Una correzione di bug entra nel master che può essere backportato nel ramo di rilascio. Il cerotto viene applicato e una nuova beta viene pubblicata come `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* La beta è considerata _generalmente stabile_ e viene pubblicata di nuovo come una non-beta sotto `2.0.0`. ![](../images/versioning-sketch-5.png)
* Più tardi, viene rivelato un exploit zero-day e viene applicata una correzione al master. Restituiamo la correzione alla linea `2-0-x` e rilasciamo `2.0.1`. ![](../images/versioning-sketch-6.png)

Alcuni esempi di come varie gamme semver raccoglieranno nuove versioni:

![](../images/versioning-sketch-7.png)

# Caratteristiche Mancanti: Alphas
La nostra strategia presenta alcuni compromessi, che per ora ci sembrano appropriati. Soprattutto che le nuove funzionalità nel master possono richiedere un po' di tempo prima di raggiungere una linea di rilascio stabile. Se vuoi provare immediatamente una nuova funzionalità, dovrai costruire Electron da solo.

Come considerazione futura, possiamo introdurre uno o entrambi i seguenti elementi:

* rilasci alfa che hanno vincoli di stabilità più allentati alla betas; ad esempio sarebbe consentito ammettere nuove funzionalità mentre un canale di stabilità è in _alfa_

# Bandiere Caratteristica
Le bandiere delle caratteristiche sono una pratica comune in cromo e sono consolidate nell'ecosistema dello sviluppo del web. Nel contesto di Electron, un flag di elementi o **soft branch** deve avere le seguenti proprietà:

* è abilitato/disabilitato sia in runtime, sia in build-time; non supportiamo il concetto di un flag di funzionalità su richiesta
* completamente segmenti nuovi e vecchi percorsi di codice; refactoring vecchio codice per supportare una nuova funzione _viola_ il contratto di feature-flag
* i flag delle funzionalità vengono infine rimossi dopo che la funzione è stata rilasciata

# Impegni Semantici

Cerchiamo di aumentare la chiarezza a tutti i livelli del processo di aggiornamento e rilascio. A partire da `2.0.0` richiederemo richieste di pull conformi alle specifiche [Commits Convenzionali](https://conventionalcommits.org/) che possono essere riassunte come segue:

* Gli impegni che si tradurrebbero in un **major** bump semver devono iniziare il loro corpo con `BREAKING CHANGE:`.
* I commit che comporterebbero un bump semver **minore** devono iniziare con la funzione `:`.
* I commit che comporterebbero un bump semver **patch** devono iniziare con `fix:`.

* Permettiamo di schiacciare dei commit, a condizione che il messaggio schiacciato aderisca al formato di messaggio di cui sopra.
* È accettabile che alcuni impegni in una pull request non includano un prefisso semantico, finché il titolo della pull request contiene un messaggio semantico significativo.

# Versionato `master`

- Il ramo `master` conterrà sempre la prossima versione principale `X.0.0-nightly.DATE` nel suo `package.json`
- I rami di rilascio non vengono mai uniti di nuovo al master
- Release branches _do_ contain the correct version in their `package.json`
- Non appena un ramo di rilascio viene tagliato per un maggiore, il maestro deve essere urtato al successivo maggiore.  Cioè `master` è sempre versionato come il prossimo ramo di rilascio teorico
