# Linee Guida Documentazione Electron

Queste sono le linee guida per scrivere la documentazione di Electron.

## Titoli

* Ogni pagina deve avere un singolo livello-`#` titolo all'apice.
* I capitoli nella stessa pagina devono avere titoli livello-`##`.
* I sotto capitoli devono aumentare il numero di `#` nel titoli in base alla loro profondità di annidamento.
* Tutte le parole nel titolo della pagina devono essere in maiuscolo, ad eccezione di congiunzioni come "di" e "e".
* Solo la prima parola di un titolo di capitolo deve essere in maiuscolo.

Usando `Avvio Rapido` come esempio:

```markdown
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
```

Per le referenze API, ci sono eccezioni a questa regola.

## Regole di Markdown

* Usa `sh` invece di `cmd` nei blocchi di codice (a causa dell'evidenziatore della sintassi).
* Le linee dovrebbero essere fissate ad 80 colonne.
* Nessun elenco di nidificazione più di 2 livelli (a causa del renderizzatore di riduzione).
* Tutti i blocchi di codice `js` e `javascript` sono allineati con il [Markdown standard](http://npm.im/standard-markdown).

## Ortografia

* Usa "will" oltre "Would" descrivendo i risultati.
* Preferisci "nel ___ processo" a "su".

## Referenze API

Le regole seguenti si applicano solo alla documentazione delle API.

### Titolo Pagina

Ogni pagina deve usare il nome oggetto attuale restituito da `require('electron')` come titolo, come `FinestraBrowser`, `autoUpdatet` e `sessione`.

Sotto al titolo della pagina deve esserci una descrizione di una riga che inizi con `>`.

Usando `sessione` come esempio:

```markdown
# sessione

> Gestisci le sessioni browser, cookie, cache, impostazioni proxy, etc.
```

### Metodi modulo ed eventi

Per i moduli che non sono classi, i loro metodi ed eventi vanno elencati sotto i capitoli `## Metodi` e `## Eventi`.

Usando `autoUpdatet` come esempio:

```markdown
# autoUpdater

## Evento

### Evento: 'errore'

## Metodi

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Classi

* Le classi API o le classi parte di moduli devono essere elencati sotto al capitolo `## Classe: IlNomeClasse`.
* Una pagina può avere più classi.
* I costruttori devono essere elencati con i titoli livello-`###`.
* I [Metodi Statici](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) devono essere elencati sotto ad un capitolo `### Metodi Statici`.
* I [Metodi Istanza](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) devono essere elencati sotto ad un capitolo `### Metodi Istanza.</li>
<li>All methods that have a return value must start their description with "Returns <code>[TYPE]` - Return description"
  * Se il metodo restituisxe un `Oggetto`, la sua struttura può essere specificata usando una colonna seguita da una nuova riga, quindi una lista disordinata di proprietà nello stesso stile come parametri funzione.
* Gli eventi Istanza devono essere elencati sotto ad un capitoli `### Eventi Istanza`.
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * Le proprietà istanza devono essere avviati con "Un [Tipo Proprietà] ..."

Usando le classi `Sessione` e `Cookie` come esempio:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize()`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Metodi

Il capitolo dei metodi deve essere nella seguente forma:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Il titolo può essere `###` o `####` in base al fatto che si tratti do un metodo di un modulo o di una classe.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Per esempio, i metodi della classe `Sessione` sotto il modulo `sessione` devono usare `ses` come `Nomeoggetto`.

Gli argomenti opzionali sono notati da parentesi quadre `[]` circondanti l'argomento opzionale così come la virgola è richiesta se questo argomento opzionale segue un altro argomento:

```sh
richiesto[, opzionale]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`Stringa`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Numero`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Oggetto`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Insieme`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Booleano`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* O un tipo personalizzato come [`ContenutoWeb`](api/web-contents.md) di Electron

Se un argomento o un metodo è univoco per certe piattaforme, tali piattaforme sono denotate utilizzando un elenco in corsivo delimitato dallo spazio che segue il tipo di dati. I valori possono essere `macOS`, `Windows` o `Linux`.

```markdown
* 'animato' Booleano (opzionale) _macOS_ _Windows_ - Anima la cosa.
```

Il tipo argomenti `Insieme` deve specificare quali elementi potrebbero essere inclusi nell'insieme nella descrizione sotto.

La descrizione per il tipo di argomenti `Funzione` dovrebbe rendere chiaro come potrebbe essere chiamata ed elenca i tipi di parametri che gli saranno passati.

### Eventi

Il capitolo degli eventi deve essere nel seguente formato:

```markdown
### Evento: 'sveglia'

Restituisce:

* `tempo` Stringa

...
```

Il titolo può essere `###` o `####` in base al fatto che si tratti di un evento di un modulo o di una classe.

L'argomento di un evento segue le stesse regole dei metodi.

### Proprietà

Il capitolo proprietà dovrebbe essere nel seguente formato:

```markdown
### session.defaultSession

...
```

Il titolo può essere `###` o `####` in base al fatto che si tratti di una proprietà di un modulo o di una classe.

## Traduzione Documentazione

Vedi [electron/i18n](https://github.com/electron/i18n#readme)
