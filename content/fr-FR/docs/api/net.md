# net

> Émet des requêtes HTTP/HTTPS à l'aide de la bibliothèque réseau natif de Chromium

Processus : [Main](../glossary.md#main-process)

Le module `net` est une API côté client pour émettre des requêtes HTTP(S). Il est semblable aux modules [HTTP](https://nodejs.org/api/http.html) et [HTTPS](https://nodejs.org/api/https.html) de Node.js, mais utilise la bibliothèque réseau natif de Chromium au lieu de l'implémentation de Node.js, offrant un meilleur support pour les proxy web. Il prend également en charge la vérification de l’état du réseau.

Voici une liste non exhaustive de pourquoi vous devriez utiliser le module `net` plutôt que les modules natifs de Node.js :

* Gestion automatique de la configuration de proxy système, support du protocole wpad et les fichiers de configuration de proxy pac.
* Tunnel automatique des requêtes HTTPS.
* Prise en charge de l'authentification proxy en utilisant basic, digest, NTLM, Kerberos ou en négociant des schémas d'authentification.
* Prise en charge des proxy de surveillance du trafic: Proxy de type Fiddler utilisés pour le contrôle et la surveillance des accès.

Les composants de l'API (y compris les classes, méthodes, propriétés et noms d'événements) sont similaires à ceux utilisés dans Node.js.

Exemple d'utilisation :

```javascript
const { app } = require ('electron')
app.whenReady().then()( => {
  const { net } = require ('electron')
  const request = net.request('https://github.com')
  request.on('response', (réponse) => { console
    .log ('STATUS: ${response.statusCode}') console
    .log ('HEADERS: ${JSON.stringify(response.headers)}')
    response.on('data', (chunk) => { console
      .log ('BODY: ${chunk}')
    })
    response.on('end', () => { console
      .log ('Plus de données en réponse.')
    })
  })
  request.end ()
})
```

L'API `net` ne peut être utilisée qu'après que l'application ait émit un événement `ready`. Essayer d’utiliser le module avant la `ready` 'événement lancera une erreur.

## Méthodes

Le module `net` dispose des méthodes suivantes :

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - Les `options du constructeur.</li>
</ul>

<p spaces-before="0">Retourne <a href="./client-request.md"><code>ClientRequest`</a></p>

Créer une instance de [`ClientRequest`](./client-request.md) avec les `options` founies qui sont directement transmis au constructor de `ClientRequest`. La méthode `net.request` doit être utilisée pour émettre des requêtes HTTP sécurisés et non sécurisés selon le schéma de protocole spécifié dans l'objet `options`.

### `net.isOnline()`

Retours `Boolean` - Qu’il y ait actuellement une connexion Internet.

Une valeur de retour de `false` est un indicateur assez fort que l’utilisateur ne sera pas en mesure de se connecter à des sites distants. Toutefois, une valeur de retour de `true` n’est pas concluante; même si un lien est en place, il n’est de savoir si une tentative de connexion particulière à un site éloigné sera couronnée de succès.

## Propriétés

### `net.online` _Readonly_

Une `Boolean` propriété. S’il ya actuellement une connexion Internet.

Une valeur de retour de `false` est un indicateur assez fort que l’utilisateur ne sera pas en mesure de se connecter à des sites distants. Toutefois, une valeur de retour de `true` n’est pas concluante; même si un lien est en place, il n’est de savoir si une tentative de connexion particulière à un site éloigné sera couronnée de succès.
