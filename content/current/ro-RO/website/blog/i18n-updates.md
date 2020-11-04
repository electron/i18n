---
title: "Actualizări de internaționalizare"
author: vanessayuenn
date: '2018-06-20'
---

De la [lansarea](https://electronjs.org/blog/new-website) a noului site Electron internaționalizat, Am muncit din greu pentru a face şi mai accesibilă dezvoltarea Electron dezvoltatorilor din afara lumii vorbitoare de engleză.

Iată câteva actualizări interesante pentru i18n!

---

## 🌐 Limbă Comutare

Știați că mulți oameni care au citit documentația au făcut adesea referire la documentația originală în limba engleză? Fac acest lucru pentru a se familiariza cu documentele englezeşti, şi pentru a evita traducerile învechite sau inexacte, care reprezintă un avertisment pentru documentaţii internaţionalizate.

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/35578586-cae629e2-05e4-11e8-9431-0278f8c2b39f.gif" alt="Comutare limbă în documentația Electron">
</figure>

Pentru a simplifica referințele încrucișate cu documentele englezești, recent am expediat o caracteristică care vă permite să comutați fără întreruperi o secțiune a documentației Electron între engleză și limba în care vizualizați site-ul. Comutatorul de limbă va apărea atâta timp cât aveți selectat un local non-englez pe site.

## ⚡ Acces rapid la pagina de traducere

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/36511386-c32e31fc-1766-11e8-8484-7466be6a5eb0.png" alt="Subsol cu documentație Electron nou în japoneză">
  <figcaption>Subsol pentru documentație Electron în japoneză</figcaption>
</figure>

Observați o greșeală sau o traducere incorectă în timp ce citiți documentația? Nu mai trebuie să te autentifici în Crowdin, alege locația, găsește fișierul care ți-ar plăcea fixul, etc etc. În schimb, poți doar să derulezi în partea de jos a documentului și să apeși "Traduci acest document" (sau echivalentul în limba ta). Voila! Ai fost adus direct la pagina de traducere Crowdin. Acum aplică magia ta de traducere!

## 📈 Unele statistici

Încă de când am făcut publice efortul documentației Electron i18n, Am văzut _o creștere uriașă_ a contribuțiilor de traducere ale membrilor comunității Electron din întreaga lume. Până în prezent, avem **1,719,029 șiruri traduse, de la 1 066 traducători comunitari, și în 25 de limbi**.

<figure>
  <a href="https://crowdin.com/project/electron/">
    <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/41649826-ca26037c-747c-11e8-9594-5ce12d2978e2.png" alt="Previziuni de traducere furnizate de Crowdin">
    <figcaption>Prognoza de traducere furnizată de Crowdin</figcaption>
  </a>
</figure>

Aici este un grafic distractiv care arată o perioadă aproximativă de timp necesară pentru traducerea proiectului în fiecare limbă, dacă tempo-ul existent (bazat pe activitatea proiectului din ultimele 14 zile la momentul scrierii) este păstrat.

## :page_cu_curl: Chestionar de Traducător

Am dori să îi oferim un selector uriaș ❤️ mulțumim ❤️ tuturor celor care au contribuit la îmbunătățirea Electron cu timpul lor! Pentru a recunoaște corect munca asiduă a comunității noastre de traducători, am creat un sondaj pentru a colecta unele informații (și anume cartografierea dintre numele lor de utilizator Crowdin și Github) despre traducătorii noștri.

Dacă sunteți unul dintre traducătorii noștri incredibili, vă rugăm să completați acest lucru: https://goo.gl/forms/b46sjdcHmlpV0GKT2.

## 🙌 Efortul de Internaționalizare al Node

Din cauza succesului inițiativei i18n a Electron, Node.js a decis să modeleze [efortul lor i18n restructurat](https://github.com/nodejs/i18n) după modelul pe care îl folosim de asemenea! 🎉 Nodul [Inițiativa s i18n](https://github.com/nodejs/i18n) a fost lansată și a câștigat un avânt, dar poți citi încă despre propunerea timpurie și raționamentul din spatele ei [aici](https://medium.com/the-node-js-collection/internationalizing-node-js-fe7761798b0a).

## 🔦 Ghid de contribuție

Dacă sunteți interesat să vă alăturați efortului nostru de a face Electron mai prietenos la nivel internațional, avem un ghid [colaborator la îndemână](https://github.com/electron/i18n/blob/master/contributing.md) pentru a vă ajuta să începeți. Internaţionalizare fericită! 📚
