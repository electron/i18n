---
title: npm install electron
author: zeke
date: '2016-08-16'
---

Începând cu versiunea Electron 1.3.1, poți `instala npm electron --save-dev` pentru a instala cea mai recentă versiune precompilată de Electron în aplicația ta.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## Fișierul binar Electron preconstruit

Dacă ați mai lucrat vreodată cu o aplicație Electron, probabil ați întâlnit `pachetul de` npm cu un electron preconstruit. Acest pachet este o parte indispensabilă a aproape fiecărui proiect Electron. Când este instalat, acesta detectează sistemul tău de operare și descarcă un binar preconstruit care este compilat pentru a lucra la arhitectura a sistemului tău.

## Noul nume

Procesul de instalare Electron a fost adesea un obstacol pentru dezvoltatorii noi. Mulți oameni curajoși au încercat să înceapă să dezvolte un Electron cu ajutorul aplicației prin rularea `npm instalați electronul` în loc de `npm instalați electronon-preconstruit`, doar pentru a descoperi (adesea după multă confuzie) că nu au căutat `electronul` .

Acest lucru s-a întâmplat pentru că există un proiect `electronic` existent pe npm, creat înainte ca GitHub's Electron să existe. Pentru a face dezvoltarea Electron mai ușoară și mai intuitivă pentru noi dezvoltatori, am ajuns la proprietarul al pachetului `electronic existent` npm pentru a întreba dacă ar fi dispus să ne lăsăm să folosim numele. Din fericire a fost un fan al proiectului nostru, și a fost de acord să ne ajute să redirecționăm numele.

## Vieți preconstruite pe

Începând cu versiunea 1.3.1, am început să publicăm pachetele [`electron`](https://www.npmjs.com/package/electron) și `electron-preconstruit` în npm în tandem. Cele două pachete sunt identice. Am ales să continuăm să publicăm pachetul sub ambele nume pentru o vreme, astfel încât să nu deranjăm miile de dezvoltatori care folosesc în prezent `electron-preconstruit` în proiectele lor. Vă recomandăm să actualizați pachetul dvs. `fi` fișiere pentru a utiliza noua `dependență de electroni` , dar vom continua să lansăm noi versiuni de `electron-preconstruit` până la sfârșitul anului 2016.

Depozitul [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) va rămâne casa canonică a pachetului de electroni `` npm .

## Multe mulţumiri

Datorăm o mulțumire specială [@mafintosh](https://github.com/mafintosh),

[ @maxogden](https://github.com/maxogden), și mulți alți [contributori](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) pentru crearea și întreținerea `electron-preconstruit`, şi pentru serviciul lor neobosit la JavaScript, Node. și comunități Electron.</p> 

Și mulțumită [@logicalparadox](https://github.com/logicalparadox) pentru că ne-a permis să preluăm pachetul `electroni` pe npm.



## Actualizarea proiectelor

Am lucrat cu comunitatea pentru a actualiza pachetele populare care sunt afectate de această schimbare. Pachete precum [electron-packer](https://github.com/electron-userland/electron-packager), [electronon-rebuild](https://github.com/electron/electron-rebuild), și [electron-builder](https://github.com/electron-userland/electron-builder) au fost deja actualizate pentru a lucra cu noul nume continuând să suporte vechiul nume.

Dacă întâmpinați probleme la instalarea acestui pachet nou, te rugăm să ne spui prin deschiderea unei probleme în depozitul [electron-userland/electron-preconstruit](https://github.com/electron-userland/electron-prebuilt/issues) .

Pentru orice alte probleme cu Electron, vă rugăm să folosiţi depozitul [electron/electron](https://github.com/electron/electron/issues) .

