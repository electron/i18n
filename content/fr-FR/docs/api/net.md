# net

> Émet des requêtes HTTP/HTTPS à l'aide de la bibliothèque réseau natif de Chromium

Processus : [Main](../glossary.md#main-process)

Le module `net` est une API côté client pour émettre des requêtes HTTP(S). Il est semblable aux modules [HTTP](https://nodejs.org/api/http.html) et [HTTPS](https://nodejs.org/api/https.html) de Node.js, mais utilise la bibliothèque réseau natif de Chromium au lieu de l'implémentation de Node.js, offrant un meilleur support pour les proxy web.

Voici une liste non exhaustive de pourquoi vous devriez utiliser le module `net` plutôt que les modules natifs de Node.js :

* Gestion automatique de la configuration de proxy système, support du protocole wpad et les fichiers de configuration de proxy pac.
* Tunnel automatique des requêtes HTTPS.
* Prise en charge de l'authentification proxy en utilisant basic, digest, NTLM, Kerberos ou en négociant des schémas d'authentification.
* Prise en charge des proxy de surveillance du trafic: Proxy de type Fiddler utilisés pour le contrôle et la surveillance des accès.

The API components (including classes, methods, properties and event names) are similar to those used in Node.js.

Example usage:

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

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Méthodes

The `net` module has the following methods:

### `net.request(options)`

* `options` (Object | String) - Les options constructor de `ClientRequest`.

Returns [`ClientRequest`](./client-request.md)

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.