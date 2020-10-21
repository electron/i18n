---
title: 'Electron Internals&#58; Utilizarea nodului ca bibliotecă'
author: zcbenz
date: '2016-08-08'
---

Aceasta este a doua postare dintr-o serie continuă care explică internalii Electron. Uitați-vă la [prima postare](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) despre integrarea în bucla de evenimente dacă nu ați făcut deja.

Majoritatea oamenilor folosesc [Nodul](https://nodejs.org) pentru aplicații de pe server, dar din cauza setului de API bogat al Node-ului și a comunității prospere, este de asemenea foarte potrivit pentru o bibliotecă încorporată. Această postare explică modul în care Node este folosit ca o bibliotecă în Electron.

---

## Construiește sistem

Atât Node, cât și Electron folosesc [`GYP`](https://gyp.gsrc.io) ca sisteme lor de construcții. Dacă vrei să încorporezi Nodul în interiorul aplicației tale, trebuie să îl folosești și ca sistem de construcții.

Nou la `GYP`? Citește [acest ghid](https://gyp.gsrc.io/docs/UserDocumentation.md) înainte de a continua în acest post.

## Steagurile nodului

The [`node. yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) fișier în directorul de cod sursă al Nodului descrie cum este construit Nodul împreună cu o mulțime de variabile [`GYP`](https://gyp.gsrc.io) controlând ce părți din Node sunt activate și dacă se deschid anumite configurații.

Pentru a schimba steagurile de construcție, trebuie să setezi variabilele în fișierul `.gypi` al proiectului tău. Scriptul `configura` din Nod poate genera unele configurații comune pentru tine, de exemplu rulând `. configure --shared` will generate a `config.gypi` with variables instructing Node to be built as a shared library.

Electron nu folosește scriptul `configura` deoarece are propriile scripturi de construcții. Configurațiile pentru Nodul sunt definite în fișierul [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) din directorul de cod sursă al Electron.

## Link Nodul cu Electron

În Electron, Modulul este legat ca bibliotecă partajată prin setarea variabilei `GYP` `node_shared` la `true`, așa că modul de construcție al nodului va fi schimbat de la `executabil` la `shared_library`, iar punctul de intrare `al Nodului` nu va fi compilat.

Deoarece Electron utilizează biblioteca V8 expediată cu Chromium, biblioteca V8 inclusă în codul sursă al Node nu este utilizată. Acest lucru se realizează prin setarea `node_use_v8_platform` și `node_use_bundled_v8` la `false`.

## Bibliotecă partajată sau bibliotecă statică

Când conectezi cu modulul există două opțiuni: poți fie să construiești Nodul ca o bibliotecă statică și să o incluzi în executabilul final, sau îl poți construi ca o bibliotecă comună și îl poți livra alături de executabilul final.

În Electron, Nodul a fost construit pentru mult timp ca o bibliotecă statică. Acest lucru a făcut să construiască simplu, a activat cele mai bune optimizări ale compilatorului, și a permis Electron să fie distribuit fără `node.dll` în plus.

Totuși, acest lucru s-a schimbat după ce Chrome a trecut la utilizarea [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL este o fork de [OpenSSL](https://www.openssl.org) care elimină mai multe API-uri neutilizate și schimbă multe interfețe existente . Deoarece modulul încă utilizează OpenSSL, compilatorul ar genera numeroase erori de conectare din cauza simbolurilor contradictorii dacă ar fi conectate împreună.

Electron nu a putut utiliza BoringSSL în nod sau să folosească OpenSSL în Chromium, astfel încât singura opţiune a fost să treacă la construirea nodului ca bibliotecă comună, și [ascunde simbolurile BoringSSL și OpenSSL](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) în componentele fiecare.

Această modificare a adus Electron unele reacţii adverse pozitive. Înainte de se schimbă, nu ați putut redenumi fișierul executabil Electron pe Windows dacă ați folosit module native, deoarece numele executabilului a fost codificat cu greu în biblioteca de import. După ce Nodul a fost construit ca o bibliotecă partajată, această limitare a dispărut deoarece toate modulele native au fost legate la `nod.`, al cărui nume nu a trebuit să fie schimbat.

## Suport module native

[Modulele native](https://nodejs.org/api/addons.html) în modulul de lucru prin definirea unei funcții de intrare pentru ca modulul să se încarce, și apoi căutarea simbolurilor V8 și libuv din Node. Acesta este un pic supărător pentru încorporări deoarece, în mod implicit, simbolurile V8 și libuv sunt ascunse când construirea Node ca librărie și module native nu va reuși să încarce pentru că nu pot găsi simbolurile.

Pentru a face modulele native să funcţioneze, simbolurile V8 şi libuv au fost expuse în Electron. Pentru V8 acest lucru se face prin [forțarea tuturor simbolurilor din fișierul de configurare Chromium să fie expus](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Pentru libuv, este realizat prin [setarea definiției `BUILDING_UV_SHARED=1`](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## Pornirea modulului în aplicație

După toate lucrările de construire și de conectare cu Nodul, ultimul pas este să rulezi Nodul din aplicația ta.

Modulul nu oferă multe API publice pentru încorporarea sa în alte aplicații. De obicei, poți apela doar [`nod::Start` și `nod::Initit`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) pentru a începe o nouă instanță a nodului. Cu toate acestea, dacă construiți o aplicație complexă bazată pe Node, trebuie să utilizați API-uri ca `nod::CreateEnvironment` pentru a controla cu precizie fiecare pas.

În Electron, Node este pornit în două moduri: modul de sine stătător care rulează în procesul principal, care este similar cu binariile oficiale Node şi modul încorporat care inseră API-uri Node în paginile web. Detaliile acestui lucru vor fi explicate într-un post viitor.

