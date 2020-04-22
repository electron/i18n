# Documentația ghidului de stil Electron

Acestea sunt liniile directoare pentru scrierea documentației Electron.

## Titluri

* Fiecare pagină trebuie să aibă un singur titlu de nivel-`#` în partea de sus.
* Capitolele în aceeași pagină trebuie să aibă titluri de nivel-`##`.
* Subcapitolele trebuie să mărească numărul `#` din titlu în funcție de adâncimea lor.
* Toate cuvintele din titlul paginii trebuie să fie cu majusculă cu excepția conjuncțiilor precum „de” și „și”.
* Numai primul cuvânt al unui titlu de capitol trebuie să fie cu majuscule.

Folosirea `Inițierii rapide` ca exemplu:

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

Pentru referințe API există excepții de la această regulă.

## Reguli de marcare

* Folosește `sh` în loc de `cmd` în blocurile de cod (datorită marcatorului de sintaxă).
* Liniile ar trebui să fie încadrate la 80 de coloane.
* Fără liste indentate mai mult de 2 niveluri (din cauza redării de marcare).
* Toate blocurile de cod `js` și `javascript` sunt listate cu [standard-markdown](http://npm.im/standard-markdown).

## Alegerea cuvintelor

* Folosește „va” în loc de „ar” atunci când descrii rezultatele.
* Preferă „în procesul ___” în loc de „pe”.

## Referințe API

Următoarele reguli se aplică doar la documentația API-urilor.

### Titlul paginii

Fiecare pagină trebuie să utilizeze numele obiectului returnat de ` require („electron”) ` ca titlu, cum ar fi ` BrowserWindow `, ` autoUpdater ` și ` session-sesiune `.

Sub titlul paginii trebuie să existe o descriere de o linie care începe cu ` > `.

Exemplu de utilizare a `session-sesiune`:

```markdown
# session -sesiune
> Gestionați sesiunile browserului, cookie-urile, memoria cache, setările proxy etc.
```

### Modulele metode și evenimente

Pentru modulele care nu sunt clase, metodele și evenimentele lor trebuie enumerate în secțiunea de mai jos capitolele ` ## Metode ` și ` ## Evenimente `.

Exemplu de utilizare a `autoUpdater`:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Clase

* Clasele API sau clasele care fac parte din module trebuie să fie enumerate în capitolul ` ## Class: TheClassName `.
* O pagină poate avea multiple clase.
* Constructorii trebuie să fie enumerați cu titluri de nivel ` ### `.
* [ Static Methods-Metode statice ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) trebuie listate la un capitol ` ### Static Methods-Metode statice `.
* [Instance Methods- Metode de instanță ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) trebuie listate la un capitol ` ### Instance Methods-Metode de instanță `.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
  * Dacă metoda returnează un ` Object-Obiect `, structura sa poate fi specificată folosind o colonă urmată de o linie nouă, atunci o listă de proprietăți neordonate în același stil ca și parametrii funcției.
* Instance Events- Evenimentele de Instanță trebuie să fie listate sub un capitol ca `### Instance Events`.
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * Propietățile de instanță trebuie să înceapă cu "A[Property Type]..."

Exemplu de utilizare a claselor `Session` și `Cookies`:

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

### Metode

Metodele capitolului trebuie să fie sub următoarea formă:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Titlul poate fi la nivelul `###` sau ` ####` depinzând dacă este o metodă a unui modul sau o clasă.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

De exemplu, metodele clasei ` Session` sub modulul de `session` trebuie să utilizeze `ses` ca și `objectName-Numele Obiectului`.

Argumentele opționale sunt notate sub paranteze pătrate `[]` ce înconjoară argumentul opțional la fel ca și virgula cerută dacă acest opțional argument urmează după alt argument:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String- Șir`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number -Număr`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object - Obiect`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array - mulțime`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Sau un tip personalizat al Electron cum ar fi [` WebContent `](api/web-contents.md)

Dacă un argument sau o metodă este unică pentru diverse platforme, acele platforme se diferențiază utilizând o listă de spațiu delimitat cu caracter italic în urma tipului de date. Valorile pot fi `macOS`, `Windows` sau `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animează lucrul.
```

`Array- Mulțime`tipul argumentului trebuie să specifice ce elemente ar putea să includă mulțimea în descrierea de mai jos.

Descrierea pentru `Function` tipul argumentelor ar trebuie să lase clar cum ar trebui să fie numită și listează tipurile de parametrii care vor trece.

### Events-Evenimente

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

See [electron/i18n](https://github.com/electron/i18n#readme)
