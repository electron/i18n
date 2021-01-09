---
title: "Aktualizace internacionalizace"
author: vanessayuenn
date: '2018-06-20'
---

Již od zahájení [spuštění](https://electronjs.org/blog/new-website) nové internacionalizované Electron webové stránky, usilovně pracujeme na tom, aby byl vývojářům mimo anglicky hovořící svět ještě přístupnější.

Takže tady jsme s některými vzrušujícími aktualizacemi i18n!

---

## 🌐 Přepínač jazyka

Věděli jste, že mnoho lidí, kteří čtou přeloženou dokumentaci, často odkazují na to s originální anglickou dokumentací? The Czech Republic is a West Slavic language spoken in the Czech Republic.

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/35578586-cae629e2-05e4-11e8-9431-0278f8c2b39f.gif" alt="Přepínač jazyka v dokumentaci Electron">
</figure>

To make cross-referencing to Czech docs easier, nedávno jsme dodali funkci, která vám umožní bezproblémově přepnout sekci dokumentace Electron mezi angličtinou a jakýmkoliv jazykem, ve kterém se prohlížíte na webových stránkách. Přepínač jazyků bude zobrazen tak dlouho, dokud bude na webových stránkách vybrán jiný jazyk.

## ⚡ Rychlý přístup na stránku s překladem

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/36511386-c32e31fc-1766-11e8-8484-7466be6a5eb0.png" alt="Zápatí nové dokumentace Electronu v japonštině">
  <figcaption>Zápatí dokumentace Electronu v japonštině</figcaption>
</figure>

Upozornit na typol nebo nesprávný překlad při čtení dokumentace? Již se nemusíte přihlásit do Crowdinu, vybrat své locale, najít soubor, který chcete opravit atd. Místo toho se můžete jednoduše posunout dolů na konec uvedené dokumentace a kliknout na "Přeložit tuto dokumentaci" (nebo ekvivalent ve vašem jazyce). Voila! Vstupujete přímo na stránku překladu Crowdin. Nyní použij svůj překlad magický!

## 📈 Některé statistiky

Od doby, kdy jsme publikovali dokumentaci Electron i18n, zažili jsme _obrovský_ růst překladových příspěvků členů komunity Electronu z celého světa. K dnešnímu dni máme přeloženo **1,719,029 řetězců, od 1,066 komunitních překladatelů a ve 25 jazycích**.

<figure>
  <a href="https://crowdin.com/project/electron/">
    <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/41649826-ca26037c-747c-11e8-9594-5ce12d2978e2.png" alt="Odhad překladu poskytovaný Crowdin">
    <figcaption>Prognóza překladu poskytnutá Crowdin</figcaption>
  </a>
</figure>

Zde je zábavný graf znázorňující přibližný čas potřebný k přeložení projektu do každého jazyka, pokud je zachováno tempo (na základě projektové aktivity v posledních 14 dnech v době psaní).

## 📃 Průzkum překladatele

Rádi bychom dali obrovskému ❤️ děkujeme vám ❤️ všem, kdo přispěli k vylepšení Electronu! Abychom řádně ocenili tvrdou práci naší překladatelské komunity, Vytvořili jsme průzkum, abychom shromáždili některé informace (jmenovitě mapování mezi jejich uživatelskými jmény Crowdin a Github) o našich překladatelích.

Pokud jste jedním z našich neuvěřitelných překladatelů, prosím vyplňte několik minut: https://goo.gl/forms/b46sjdcHmlpV0GKT2.

## 🙌 Mezinárodní úsilí Node's

Vzhledem k úspěchu Iniciativy i18n se Node.js rozhodl modelovat [jejich vylepšené i18n úsilí](https://github.com/nodejs/i18n) po vzoru, který používáme také! 🎉 [uzel. s Iniciativa i18n](https://github.com/nodejs/i18n) byla spuštěna a získala velkou dynamiku, ale můžete si vychutnat dřívější návrh a odůvodnění za ním [zde](https://medium.com/the-node-js-collection/internationalizing-node-js-fe7761798b0a).

## 🔦 Průvodce přispěním

Pokud máte zájem připojit se k našemu úsilí o to, aby byl Electron více mezinárodní přátelský, máme vodítko [přispívající návod](https://github.com/electron/i18n/blob/master/contributing.md) , abychom vám pomohli začít. Šťastná internacionalizace! 📚
