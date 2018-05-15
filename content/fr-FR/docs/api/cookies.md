## Classe : Cookies

> Interroger et modifier la session des cookies.

Processus : [Main](../glossary.md#main-process)

Les instances de la classe `Cookies` sont accessibles à l'aide de la propriété `cookies` d'une `Session`.

Par exemple :

```javascript
const {session} = require('electron')

// Récupère tous les cookies.
session.defaultSession.cookies.get({}, (error, cookies) => {
  console.log(error, cookies)
})

// Récupère tous les cookies associés à une url spécifique.
session.defaultSession.cookies.get({url: 'http://www.github.com'}, (error, cookies) => {
  console.log(error, cookies)
})

// Définit un cookie avec les données du cookie donné;
// Peut écraser des cookies équivalents s'ils existent.
const cookie = {url: 'http://www.github.com', name: 'nom_fictif', value: 'fictif'}
session.defaultSession.cookies.set(cookie, (error) => {
  if (error) console.error(error)
})
```

### Événements d’instance

Les événements suivants sont disponibles pour les instances de `Cookies` :

#### Événement : 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - Le cookie qui a été changé.
* `cause` String - La cause du changement avec l'une des valeurs suivantes : 
  * `explicit` - Le cookie a été modifié directement par l'action du consommateur.
  * `overwrite` - Le cookie a été supprimé automatiquement a cause d'une insertion écrasante.
  * `expired` - Le cookie a été supprimé automatiquement par expiration.
  * `evicted` - Le cookie a été expulsée automatiquement par le ramasse-miettes.
  * `expired-overwrite` - Le cookie a été écrasé avec une date d'expiration dépassée.
* `removed` Boolean - `true` si le cookie a été supprimé, `false` autrement.

Émis lorsqu’un cookie a été changé car il a été ajouté, édité, enlevé ou a expiré.

### Méthodes d’instance

Les méthodes suivants sont disponibles pour les instances de `Cookies` :

#### `cookies.get(filter, callback)`

* `filter` Objet 
  * `url` String (facultatif) - Récupère les cookies qui sont associés à des `url`. S'il est vide, cela va récupérer les cookies avec toutes les urls.
  * `name` String (facultatif) - Filtre les cookies par nom.
  * `domain` String (facultatif) - Récupère les cookies dont les domaines correspondent ou sont des sous-domaines de `domains`.
  * `path` String (facultatif) - Récupère les cookies dont le chemin correspond à `path`.
  * `secure` Boolean (facultatif) - Filtre les cookies par leur propriété de sécuritée.
  * `session` Boolean (facultatif) - filtre les session ou les cookies persistants.
* `callback` Function 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - Un tableau d'objet de cookie.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

#### `cookies.set(details, callback)`

* `details` Objet 
  * `url` String - L'url à associer au cookie.
  * `name` String (facultatif) - Le nom du cookie. Vide par défaut si omis.
  * `value` String (facultatif) - Le contenu du cookie. Vide par défaut si omis.
  * `domain` String (facultatif) - Le domaine du cookie. Vide par défaut si omis.
  * `path` String (facultatif) - Le chemin d'accès du cookie. Vide par défaut si omis.
  * `secure` Boolean (facultatif) - Si le cookie doit être marqué comme sécurisé. False par défaut.
  * `httpOnly` Boolean (facultatif) - Si le cookie doit être marqué comme HTTP uniquement. False par défaut.
  * `expirationDate` Double (facultatif) - La date d'expiration du cookie en nombre de secondes depuis l'epoch UNIX. Si omis, le cookie devient alors un cookie de session et ne sera pas conservé entre deux sessions.
* `callback` Function 
  * `error` Error

Définit un cookie avec `details`, `callback` sera appelé avec `callback(error)` une fois fini.

#### `cookies.remove(url, name, callback)`

* `url` String - L'url associée au cookie.
* `name` String - Le nom du cookie à supprimer.
* `callback` Function

Supprime les cookies correspondant à `url` et `nom`, `rappel` seront appelé avec `callback()` complet.

#### `cookies.flushStore(callback)`

* `callback` Function

Écrit toutes les données des cookies non écrites sur le disque.