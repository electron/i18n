---
title: 'Proiectul săptămânii: Ghost'
author:
  - felixrieseberg
  - zeke
date: '2017-02-14'
---

Săptămâna aceasta am discutat cu [Felix Rieseberg](https://felixrieseberg.com/), inginer desktop la [Slack](https://slack.com/) și susținător al [Ghost Desktop](https://ghost.org/downloads/), un client Electron pentru platforma de publicare [Ghost](https://ghost.org/).

---

<div class="pt-5">
  <img src="https://cloud.githubusercontent.com/assets/2289/22913898/7396b0de-f222-11e6-8e5d-147a7ced37a9.png" alt="Screenshot Ghost Desktop"> 
</div>

## Ce este Ghost?

Gazda este o platformă complet deschisă pentru construirea și rularea unei publicații online moderne. Putem bloguri, reviste şi jurnalişti de la Zappos la Sky News.

## Ce face să fie diferit de alte platforme de publicare?

Ghost a fost fondat în aprilie 2013, după o campanie de succes lansată de Kickstarter pentru crearea unei noi platforme axate exclusiv pe editarea profesionistă. Misiunea noastră este de a crea cele mai bune instrumente deschise pentru jurnaliștii și scriitorii independenți din întreaga lume, și au un impact real asupra viitorului mass-mediei online. Aceasta oferă o experiență mai simplă și mai bine orientată: editorul nostru este conceput exclusiv pentru a oferi cea mai bună experiență de scriere.

Comparativ cu WordPress-urile clasice clasice, oferă o experiență mai simplă, mai raționalizată - este mai ușor de configurat și menținut, vine cu toate caracteristicile importante în afara cutiei, şi este dramatic de rapid. În comparație cu alte platforme online, Ghost oferă autorilor dreptul de proprietate și control deplin asupra conținutului lor; permite personalizarea completă și permite autorilor să construiască o afacere în jurul publicării lor.

## Este Ghost o companie cu scop lucrativ?

Aceasta este importantă pentru noi: Ghost este o organizaţie independentă non-profit. Construim instrumente de publicare pentru jurnalismul modern & blogging pentru că noi credem că libertatea de exprimare este importantă. Software-ul nostru este pus la dispoziție sub [o licență cu sursă deschisă gratuit](https://github.com/TryGhost/Ghost), modelul nostru de afaceri este [complet transparent](https://blog.ghost.org/year-3/), iar structura noastră juridică înseamnă că 100 % din banii pe care îi facem sunt reinvestiţi pentru a îmbunătăţi gazda.

## Ce este Ghost Desktop?

Ghost Desktop permite autorilor să gestioneze mai multe bloguri simultan - și să se concentreze pe scrierea lor. Lucruri simple cum ar fi comenzi rapide comune nu pot fi realizate într-un browser, dar sunt disponibile în aplicația noastră pentru desktop. Permite altor aplicații să comunice direct [cu blogul prin intermediul deep plinks](https://github.com/tryghost/ghost-desktop/blob/master/docs/deeplinks.md).

## Ce este Ghost for Journalism?

Anul acesta suntem foarte încântaţi să dedicăm întreaga noastră echipă de 10 persoane Ghost cu normă întreagă ajutând la dezvoltarea a trei publicaţii independente, alături de resurse de 45 000 USD pentru eforturile lor. O numim [Ghost for Journalism](https://ghost.org/journalism/).

Construim Ghost ca următoarea mare platformă web pentru editori independenţi de aproximativ trei ani şi jumătate, şi acum am ajuns la un punct de inflaţie foarte interesant. Am început această călătorie pentru a crea o platformă de blogging simplă, bine proiectată, care ar putea fi folosită de aproape oricine. Acesta va fi întotdeauna pasul unu.

Pe termen lung, vrem ca Ghost să fie o platformă incredibilă pentru cel mai bun jurnalism din lume, și asta înseamnă că trebuie să construim caracteristici care să atragă exact acei oameni. Anul acesta luăm o decizie foarte conştientă să ne concentrăm pe asta.

## De ce ai ales să construiești Ghost Desktop pe Electron?

Fantoma foloseste JavaScript si Node. s pe backend și frontend, așa că fiind în măsură să utilizeze aceeași tehnologie și același talent îi permite echipei noastre să se deplaseze mai repede, construiește mai mult și oferă în cele din urmă o experiență mai bună. În plus, pentru a putea partaja peste 95% din cod între macOS, Windows, iar versiunea Linux a aplicației ne permite să ne concentrăm pe construirea unei experiențe de bază a utilizatorului, fără a trebui să se întrețină o bază de cod pentru fiecare platformă.

## Care sunt unele provocări cu care te confrunți în timp ce construiești Ghost Desktop?

Spellcheck este probabil încă unul dintre cele mai dificile servicii oferite - am putea utiliza cu ușurință unul dintre multele servicii online, dar ortografia corectă a textului în mai multe limbi, în timp ce protejarea confidenţialităţii şi autonomiei utilizatorilor noştri nu este o sarcină uşoară.

## În ce domenii ar trebui îmbunătățit Electron?

Ne-ar plăcea să vedem că Electron aduce capacitățile native de ortografie ale sistemului de operare în aplicațiile lor. Visăm la o lume în care un câmp `<input>` primește aceleași servicii ca un `NSTextView`, dar suntem de asemenea conştienţi de cât de dificil este acest lucru.

## Care sunt lucrurile tale preferate despre Electron?

JavaScript este faimos pentru că este un ecosistem vast, care implică nenumărate instrumente şi cadre - dar confortul pe care ni îl permite este greu de suprastat. Construirea unei aplicații cu Electron este doar _ușor_ mai dificilă decât construirea unei aplicații web, ceea ce este un lucru uimitor.

## Ghost este terminat? Dacă nu, ce urmează?

Ghost Desktop este, de asemenea, un proiect în derulare - suntem destul de departe de a fi făcut. Vorbim de ceva timp despre aducerea unui mod complet offline utilizatorilor noștri și ne apropiem destul de mult. Alte domenii de lucru notabile sunt extinderea și integrarea cu alte aplicații de editare a textului (cum ar fi Word sau Atom), în cele din urmă, să permită oamenilor să scrie postări folosind instrumentele lor preferate. În general, odată ce am expediat funcționalitatea modului offline, căutăm o integrare mai profundă cu sistemul de operare. Dacă vi se pare interesant, [alăturați-vă nouă](https://github.com/tryghost/ghost-desktop)!

## Care sunt unele dintre aplicațiile tale Electron preferate?

Sunt un mare fan al [Kap](https://getkap.co/), [Felony](https://github.com/henryboldi/felony), şi [Visual Studio Code](https://code.visualstudio.com).

👻

