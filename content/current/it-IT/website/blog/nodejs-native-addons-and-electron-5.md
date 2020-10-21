---
title: Node.js Native Addons ed Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

Se hai problemi a usare un addon nativo Node.js con Electron 5. , c'è una possibilità che deve essere aggiornato per funzionare con la versione più recente di V8.

---

## Arrivederci `v8::Handle`, Ciao `v8::Local`

Nel 2014, il team di V8 ha deprecato `v8::Handle` a favore di `v8::Local` per le maniglie locali. Electron 5.0 include una versione di V8 che ha finalmente rimosso `v8::Handle` per sempre, e nativo Node. s addons che ancora lo usano dovrà essere aggiornato prima che possano essere utilizzati con Electron 5.0.

Il cambio di codice richiesto è minimo, ma *ogni* modulo nativo Nodo che utilizza ancora `v8::Handle` non riuscirà a costruire con Electron 5. e dovrà essere modificato. La buona notizia è quel Node. s v12 includerà anche questo cambiamento V8, quindi tutti i moduli che utilizzano `v8::Handle` dovranno essere aggiornati *comunque* per lavorare con la prossima versione di Node.

## Mantengo un addon nativo, come posso aiutare?

Se mantieni un addon nativo per Node.js, assicurati di sostituire tutte le occorrenze di `v8::Handle` con `v8::Local`. Il primo era solo un esempio del secondo, quindi non è necessario apportare altre modifiche per affrontare questa questione specifica.

Potresti anche essere interessato ad esaminare [N-API](https://nodejs.org/api/n-api.html), che è mantenuto separatamente da V8 come parte di Node. s stesso, e mira a isolare gli addons nativi dai cambiamenti nel motore JavaScript sottostante. Puoi trovare ulteriori informazioni [nella documentazione N-API sul sito web Node.js](https://nodejs.org/api/n-api.html#n_api_n_api).

## Aiuto! Uso un addon nativo nella mia app e non funzionerà!

Se stai consumando un addon nativo per Node. s nella tua app e il nativo addon non costruirà a causa di questo problema, controlla con l'autore dell'addon per vedere se ha rilasciato una nuova versione che risolve il problema. In caso contrario, raggiungere l'autore (o [aprire una Pull Request!](https://help.github.com/articles/about-pull-requests/)) è probabilmente la tua scommessa migliore.
