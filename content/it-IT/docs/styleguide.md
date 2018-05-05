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
# Avvio Rapido

...

## Processo principale

...

## Processo Rendering

...

## Esegui la tua app

...

### Esegui come distrubuzione

...

### Binario Electron scaricato manualmente

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
<li>Tutti i metodi che hanno un valore di ritorno devono iniziare la loro descrizione con "Ritorna <code>[TYPE]` - Restituisci descrizione" 
  * Se il metodo restituisxe un `Oggetto`, la sua struttura può essere specificata usando una colonna seguita da una nuova riga, quindi una lista disordinata di proprietà nello stesso stile come parametri funzione.
* Gli eventi Istanza devono essere elencati sotto ad un capitoli `### Eventi Istanza`.
* Le proprietà dell'istanza devono essere elencate sotto a `### Proprietà Istanza` capitolo. 
  * Le proprietà istanza devono essere avviati con "Un [Tipo Proprietà] ..."

Usando le classi `Sessione` e `Cookie` come esempio:

```markdown
# sessione

## Metodi

### session.fromPartition(partition)

## Proprietà

### session.defaultSession

## Classe: Sessione

### Eventi Istanza

#### Evento: 'scaricherà'

### Metodi Istanza

#### `ses.getCacheSize(callback)`

### Proprietà Istanza

#### `ses.cookies`

## Classe: Cookie

### Metodi Istanza

#### `cookies.get(filter, callback)`
```

### Metodi

Il capitolo dei metodi deve essere nella seguente forma:

```markdown
### `objectName.methodName(required[, optional]))`

* `richiesta` Stringa - Una descrizione parametro.
* `opzionale` Intero (opzionale) - Un'altra descrizione parametro.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
required[, optional]
```

Sotto il metodo sono informazioni più dettagliate su ciascuno degli argomenti. Il tipo di argomento è indicato dai tipi comuni:

* [`Stringa`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Oggetto`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

Se un argomento o un metodo è univoco per certe piattaforme, tali piattaforme sono denotate utilizzando un elenco in corsivo delimitato dallo spazio che segue il tipo di dati. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Eventi

Il capitolo degli eventi deve essere nel seguente formato:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

Il capitolo proprietà dovrebbe essere nel seguente formato:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

See [electron/i18n](https://github.com/electron/i18n#readme)