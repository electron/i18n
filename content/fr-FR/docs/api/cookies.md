## Classe : Cookies

> Interroger et modifier la session des cookies.

Processus : [Main](../glossary.md#main-process)

Les instances de la classe `Cookies` sont accessibles à l'aide de la propriété `cookies` d'une `Session`.

Par exemple :

```javascript
const { session } = require('electron')

// Récupère tous les cookies.
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }). atch((error) => {
    console.log(error)
  })

// Interroge tous les cookies associés à une Url spécifique.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }). atch((erreur) => {
    console. og(error)
  })

// Définit un cookie avec les données de cookie spécifiées;
// peut écraser les cookies équivalents s'ils existent.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  . hen(() => {
    // succès
  }, (erreur) => {
    console. rror(erreur)
})
```

### Événements d’instance

Les événements suivants sont disponibles pour les instances de `Cookies` :

#### Événement : 'changed'

Retourne :

* `event` Événement
* `cookie` [Cookie](structures/cookie.md) - Le cookie qui a été changé.
* `cause` String - The cause of the change with one of the following values:
  * `explicit` - Le cookie a été modifié directement par l'action du consommateur.
  * `overwrite` - Le cookie a été supprimé automatiquement a cause d'une insertion écrasante.
  * `expired` - Le cookie a été supprimé automatiquement par expiration.
  * `evicted` - Le cookie a été expulsée automatiquement par le ramasse-miettes.
  * `expired-overwrite` - Le cookie a été écrasé avec une date d'expiration dépassée.
* `removed` Boolean - `true` si le cookie a été supprimé, `false` autrement.

Émis lorsqu’un cookie a été changé car il a été ajouté, édité, enlevé ou a expiré.

### Méthodes d’instance

Les méthodes suivants sont disponibles pour les instances de `Cookies` :

#### `cookies.get(filter)`

* Objet `filter`
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs.
  * `name` String (facultatif) - Filtre les cookies par nom.
  * `domain` String (facultatif) - Récupère les cookies dont les domaines correspondent ou sont des sous-domaines de `domains`.
  * `path` String (facultatif) - Récupère les cookies dont le chemin correspond à `path`.
  * `secure` Boolean (facultatif) - Filtre les cookies par leur propriété de sécuritée.
  * `session` Boolean (facultatif) - filtre les session ou les cookies persistants.

Retourne `Promise<Cookie[]>` - Une promesse qui résout un tableau d'objets de cookies.

Envoie une demande pour obtenir tous les cookies correspondant à `filter`, et résout une promesse avec la réponse.

#### `cookies.set(détails)`

* Objet `details`
  * `url` String - The URL to associate the cookie with. The promise will be rejected if the URL is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (facultatif) - Le nom de domaine du cookie; ce dernier sera normalisé par un point le précédent pour qu'il soit valide pour les sous-domaines. Empty by default if omitted.
  * `path` String (facultatif) - Le chemin du cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. false par défaut.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Par défaut, faux.
  * `expirationDate` Double (facultatif) - La date d'expiration du cookie en nombre de secondes depuis l'epoch UNIX. Si omis, le cookie devient alors un cookie de session et ne sera pas conservé entre deux sessions.
  * `sameSite` String (optional) - The [Same Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) policy to apply to this cookie.  Peut être `unspecified`, `no_restriction`, `lax` ou `strict`.  Default is `no_restriction`.

Retourne `Promise<void>` - Une promesse qui résout lorsque le cookie a été défini

Définit un cookie avec `détails`.

#### `cookies.remove(url, nom)`

* `url` String - L'url associée au cookie.
* `name` String - Le nom du cookie à supprimer.

Retourne `Promise<void>` - Une promesse qui résout lorsque le cookie a été supprimé

Supprime les cookies correspondant à `url` et `name`

#### `cookies.flushStore()`

Retourne `Promise<void>` - Une promesse qui résout lorsque la boutique de cookies a été vidée

Écrit toutes les données des cookies non écrites sur le disque.
