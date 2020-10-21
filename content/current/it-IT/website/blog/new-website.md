---
title: "Nuovo Sito Internazionalizzato Di Elettronica"
author: zeke
date: '2017-11-13'
---

Electron ha un nuovo sito web su [electronjs.org](https://electronjs.org)! Abbiamo sostituito il nostro sito Jekyll statico con un Node. s webserver, dandoci flessibilità per internazionalizzare il sito e spianando la strada per nuove funzionalità più emozionanti.

---

## 🌍 Traduzioni

Abbiamo iniziato il processo di internazionalizzazione del sito web con l'obiettivo di rendere lo sviluppo delle app Electron accessibile a un pubblico globale di sviluppatori. Stiamo utilizzando una piattaforma di localizzazione chiamata [Crowdin](https://crowdin.com/project/electron) che integra con GitHub, apertura e aggiornamento delle richieste pull automaticamente come contenuto viene tradotto in diverse lingue.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav in Cinese semplificato">
    <figcaption>Nav di Electron's in Cinese Semplificato</figcaption>
  </a>
</figure>

Anche se abbiamo lavorato tranquillamente su questo sforzo finora, oltre 75 membri della comunità Electron hanno già scoperto il progetto organicamente e si sono uniti nello sforzo di internazionalizzare il sito web e tradurre i documenti di Electrons in oltre 20 lingue. We are seeing [daily contributions](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) from people all over the world, with translations for languages like French, Vietnamese, Indonesian, and Chinese leading the way.

Per scegliere la lingua e visualizzare i progressi nella traduzione, visita [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Le attuali lingue di destinazione su Crowdin">
    <figcaption>Traduzioni in corso su Crowdin</figcaption>
  </a>
</figure>

Se sei multilingue e sei interessato a tradurre i documenti e il sito web di Electron, visita il repo [electron/electron-i18n](https://github.com/electron/electron-i18n#readme) , o salta a destra in traducendo su [Crowdin](https://crowdin.com/project/electron), dove puoi accedere utilizzando il tuo account GitHub.

Ci sono attualmente 21 lingue abilitate per il progetto Electron su Crowdin. Aggiungere il supporto per altre lingue è facile, quindi se sei interessato a aiutare a tradurre ma non vedi la tua lingua elencata, [facci sapere](https://github.com/electron/electronjs.org/issues/new) e lo attiveremo.

## Documenti Grezzi Tradotti

Se preferisci leggere la documentazione nei file di markdown grezzi, ora puoi farlo in qualsiasi lingua:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Pagine App

A partire da oggi, qualsiasi app Electron può facilmente avere una propria pagina sul sito Electron . Per alcuni esempi, controlla [Etcher](https://electronjs.org/apps/etcher), [1Appunti](https://electronjs.org/apps/1clipboard), o [GraphQL Playground](https://electronjs.org/apps/graphql-playground), foto qui nella versione giapponese del sito:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="Playground GraphQL">
  </a>
</figure>

Ci sono alcune incredibili app di Electron là fuori, ma non sono sempre facili da trovare, e non tutti gli sviluppatori hanno il tempo o le risorse per costruire un vero e proprio sito web per commercializzare e distribuire la loro app.

Utilizzando solo un file di icone PNG [e una piccola quantità di metadati dell'app](https://github.com/electron/electron-apps/blob/master/contributing.md), siamo in grado di raccogliere un sacco di informazioni su una data app. Utilizzando i dati raccolti da GitHub, le pagine delle app possono ora visualizzare screenshots, link per il download, versioni, note di rilascio e READMEs per ogni app che ha un repository pubblico. Usare una tavolozza di colori estratta dall'icona di ogni app, siamo in grado di produrre [colori audaci e accessibili](https://github.com/zeke/pick-a-good-color) per dare a ogni pagina di app qualche distinzione visiva.

La pagina [dell'indice delle app](https://electronjs.org/apps) ora ha anche le categorie e un filtro per parole chiave per trovare applicazioni interessanti come [GUI GraphQL](https://electronjs.org/apps?q=graphql) e [strumenti p2p](https://electronjs.org/apps?q=graphql).

Se hai un'app Electron che ti piacerebbe essere presente sul sito, apri una pull request sul repository [electron/electron-apps](https://github.com/electron/electron-apps).

## Installazione a una linea con Homebrew

Il gestore dei pacchetti [Homebrew](https://brew.sh) per macOS ha un sottocomando chiamato [cask](https://caskroom.github.io) che rende facile installare applicazioni desktop utilizzando un singolo comando nel tuo terminale, like `brew cask install atom`.

Abbiamo iniziato a raccogliere i nomi di Homebrew cask per le applicazioni popolari di Electron e ora visualizza il comando di installazione (per i visitatori di macOS) su ogni pagina di app che ha un caso:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Opzioni di installazione su misura per la tua piattaforma: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Per visualizzare tutte le applicazioni che hanno nomi cask homebrew, visita [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Se conosci altre applicazioni con botti che non abbiamo ancora indicizzato, [aggiungerle!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Un Nuovo Dominio

Abbiamo spostato il sito da electron.atom.io a un nuovo dominio: [electronjs.org](https://electronjs.org).

Il progetto Electron è nato all'interno di [Atom](https://atom.io), l'editor di testo open-source di GitHub basato sulle tecnologie web. Electron è stato originariamente chiamato `atom-shell`. Atom è stata la prima app ad utilizzarla, ma non ci è voluto molto per le persone per rendersi conto che questo magico Chromium + Node runtime potrebbe essere utilizzato per tutti i tipi di diverse applicazioni. Quando aziende come Microsoft e Slack hanno iniziato a fare uso di `atom-shell`, è diventato chiaro che il progetto aveva bisogno di un nuovo nome.

E così è nato "Electron". All'inizio del 2016, GitHub ha assemblato un nuovo team per concentrarsi specificamente sullo sviluppo e la manutenzione di Electron, ad eccezione di Atom. Nel momento in cui Electron è stato adottato da migliaia di sviluppatori di app, ed è ora dipendeva da molte grandi aziende, molte delle quali hanno team Electron di proprie.

Supporting GitHub's Electron projects like Atom and [GitHub Desktop](https://desktop.github.com) is still a priority for our team, but by moving to a new domain we hope to help clarify the technical distinction between Atom and Electron.

## 🐢🚀 Node.js Ovunque

Il precedente sito web Electron è stato costruito con [Jekyll](https://jekyllrb.com), il popolare generatore di siti statici basato su Ruby. Jekyll è un ottimo strumento per costruire siti web statici, ma il sito aveva iniziato a svilupparlo. Volevamo funzionalità più dinamiche come reindirizzamenti adeguati e rendering dei contenuti dinamici, quindi un server [Node.js](https://nodejs.org) era la scelta ovvia.

L'ecosistema Electron include progetti con componenti scritti in molti diversi linguaggi di programmazione, da Python a C++ a Bash. Ma JavaScript è fondamentale per Electron, ed è il linguaggio più utilizzato nella nostra comunità.

Con la migrazione del sito da Ruby a Node.js, miriamo a ridurre la barriera all'ingresso per le persone che desiderano contribuire al sito web.

## ⚡ Partecipazione Open-Source Più Facile

Se hai [Node. s](https://nodejs.org) (8 o superiore) e [git](https://git-scm.org) installato sul tuo sistema, puoi facilmente ottenere il sito in esecuzione localmente:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

Il nuovo sito web è ospitato su Heroku. Utilizziamo le pipeline di distribuzione e la funzione [Review Apps](https://devcenter.heroku.com/articles/github-integration-review-apps) , che crea automaticamente una copia in esecuzione dell'app per ogni richiesta di pull . Questo rende facile per i revisori visualizzare gli effetti reali di una richiesta di pull su una copia live del sito.

## 🙏 Grazie ai collaboratori

Vorremmo rivolgere un ringraziamento speciale a tutte le persone di tutto il mondo che hanno contribuito con il loro tempo e l'energia per contribuire a migliorare Electron. La passione della comunità open-source ha contribuito incommensurabilmente a fare di Electron un successo. Grazie!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>