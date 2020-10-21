---
title: Correction de la transparence du certificat
author: kevinsawicki
date: '2016-12-09'
---

Electron [1.4. 2](https://github.com/electron/electron/releases/tag/v1.4.12) contient une mise à jour importante qui corrige un problème de Chrome amont où certains Symantec, GeoTrust, et les certificats Thawte SSL/TLS sont incorrectement rejetés 10 semaines à partir de la date de construction de [libchromiumcontent](https://github.com/electron/libchromiumcontent), la bibliothèque Chrome sous-jacente d'Electron. Il n'y a aucun problème avec les certificats utilisés sur les sites concernés et le remplacement de ces certificats ne sera pas utile.

---

Dans Electron 1.4.0 &mdash; 1.4.11 les requêtes HTTPS vers les sites utilisant ces certificats affectés échoueront avec des erreurs réseau après une certaine date. Cela affecte les requêtes HTTPS faites en utilisant les APIs réseau sous-jacents de Chrome comme la fenêtre `. etch`, Requêtes Ajax, Net `d'Electron` API, `BrowserWindow. oadURL`, `contenu web. oadURL`, l'attribut `src` sur une balise `<webview>` et autres.

La mise à niveau de vos applications vers la version 1.4.12 empêchera ces échecs de de se produire.

**Remarque :** Ce problème a été introduit dans Chrome 53, donc les versions d'Electron antérieures à 1.4.0 ne sont pas affectées.

### Dates d'impact

Ci-dessous se trouve une table de chaque version d'Electron 1.4 et la date à laquelle les requêtes aux sites utilisant ces certificats affectés commenceront à échouer.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Version d'Electron</th>
            <th>Date d'impact</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>Non affecté</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Déjà en échec</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Déjà en échec</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Déjà en échec</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 décembre 2016 21h00 PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 décembre 2016 21h00 PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 décembre 2016 21h00 PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 janvier 2017 21:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 janvier 2017 21:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 janvier 2017 21:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 janvier 2017 21:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 janvier 2017 21:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 Février 2017 21:00 pm PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Non affecté</td>
        </tr>
    </tbody>
</table>

Vous pouvez vérifier la date d'impact de votre application en réglant l'horloge de votre ordinateur à l'avance et ensuite vérifier si [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) se charge avec succès.

## Plus d'informations

Vous pouvez en savoir plus sur ce sujet, le problème original et la correction aux endroits suivants :

- [Qu'est-ce que la transparence du certificat?](https://www.certificate-transparency.org/what-is-ct)
- [Article de base de connaissances Symtantec](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Problème Chrome 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Correction de Chrome pour le problème 664177](https://codereview.chromium.org/2495583002)
- [Correctif de libchromiumcontent pour le problème 664177](https://github.com/electron/libchromiumcontent/pull/248)

