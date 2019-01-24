# net

> Émet des requêtes HTTP/HTTPS à l'aide de la bibliothèque réseau natif de Chromium

Processus : [Main](../glossary.md#main-process)

Le module `net` est une API côté client pour émettre des requêtes HTTP(S). Il est semblable aux modules [HTTP](https://nodejs.org/api/http.html) et [HTTPS](https://nodejs.org/api/https.html) de Node.js, mais utilise la bibliothèque réseau natif de Chromium au lieu de l'implémentation de Node.js, offrant un meilleur support pour les proxy web.

Voici une liste non exhaustive de pourquoi vous devriez utiliser le module `net` plutôt que les modules natifs de Node.js :

* Gestion automatique de la configuration de proxy système, support du protocole wpad et les fichiers de configuration de proxy pac.
* Tunnel automatique des requêtes HTTPS.
* Prise en charge de l'authentification proxy en utilisant basic, digest, NTLM, Kerberos ou en négociant des schémas d'authentification.
* Prise en charge des proxy de surveillance du trafic: Proxy de type Fiddler utilisés pour le contrôle et la surveillance des accès.

L'API du module `net` a été spécifiquement conçu pour imiter, autant que possible, l'API de Node.js. Les composants de l'API, y compris les classes, les méthodes, les propriétés et les noms d'événement sont similaires à ceux généralement utilisés dans Node.js.

Par exemple, l'exemple suivant montre rapidement comment utiliser l'API `net` :

```javascript
const { app } = require('electron')
app.on('ready', () => {
  const { net } = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('Plus de données reçues.')
    })
  })
  request.end()
})
```

Par ailleurs, cela est presque identique à la façon dont vous utiliseriez normalement le module [HTTP](https://nodejs.org/api/http.html)/[HTTPS](https://nodejs.org/api/https.html) de Node.js

L'API `net` peut être utilisé seulement une fois que l'application ait émis l'événement `ready`. Essayer d'utiliser le module avant l'événement `ready` soulèvera une erreur.

## Méthodes

Le module `net` dispose des méthodes suivantes :

### `net.request(options)`

* `options` (Object | String) - Les options constructor de `ClientRequest`.

Retourne [`ClientRequest`](./client-request.md)

Créer une instance de [`ClientRequest`](./client-request.md) avec les `options` founies qui sont directement transmis au constructor de `ClientRequest`. La méthode `net.request` doit être utilisée pour émettre des requêtes HTTP sécurisés et non sécurisés selon le schéma de protocole spécifié dans l'objet `options`.