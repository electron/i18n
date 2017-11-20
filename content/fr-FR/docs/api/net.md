# net

> Émet des requêtes HTTP/HTTPS à l'aide de la bibliothèque réseau natif de Chromium

Processus : [Main](../glossary.md#main-process)

Le module `net` est une API côté client pour émettre des requêtes HTTP(S). Il est semblable aux modules [HTTP](https://nodejs.org/api/http.html) et [HTTPS](https://nodejs.org/api/https.html) de Node.js, mais utilise la bibliothèque réseau natif de Chromium au lieu de l'implémentation de Node.js, offrant un meilleur support pour les proxy web.

Voici une liste non exhaustive de pourquoi vous devriez utiliser le module `net` plutôt que les modules natifs de Node.js :

* Gestion automatique de la configuration de proxy système, support du protocole wpad et les fichiers de configuration de proxy pac.
* Tunnel automatique des requêtes HTTPS.
* Support for authenticating proxies using basic, digest, NTLM, Kerberos or negotiate authentication schemes.
* Support for traffic monitoring proxies: Fiddler-like proxies used for access control and monitoring.

The `net` module API has been specifically designed to mimic, as closely as possible, the familiar Node.js API. The API components including classes, methods, properties and event names are similar to those commonly used in Node.js.

For instance, the following example quickly shows how the `net` API might be used:

```javascript
const {app} = require('electron')
app.on('ready', () => {
  const {net} = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})
```

By the way, it is almost identical to how you would normally use the [HTTP](https://nodejs.org/api/http.html)/[HTTPS](https://nodejs.org/api/https.html) modules of Node.js

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Méthodes

Le module `net` dispose des méthodes suivantes :

### `net.request(options)`

* `options` (Object | String) - Les options constructor de `ClientRequest`.

Retourne [`ClientRequest`](./client-request.md)

Créer une instance de [`ClientRequest`](./client-request.md) avec les `options` founies qui sont directement transmis au constructor de `ClientRequest`. La méthode `net.request` doit être utilisée pour émettre des requêtes HTTP sécurisés et non sécurisés selon le schéma de protocole spécifié dans l'objet `options`.