---
title: 'Projekt slabého: Prohlížeč Beaker'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

Tento týden jsme chytili [Paul Frazee](http://pfrazee.github.io/), tvůrce z [Beaker Browser](https://beakerbrowser.com/). Beaker je experimentální webový prohlížeč peer-to-peer, který používá protokol Dat pro hostování stránek z uživatelských zařízení .

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Co je to Beaker a proč jste to vytvořili?

Kámen je participativní prohlížeč. Je to prohlížeč pro indie hackery.

Web je uzavřený zdroj. Pokud chcete ovlivňovat fungování sociálních médií, musíte pracovat na Facebooku nebo Twitteru. Pro hledání Google. Kontrola je v rukou společností, nikoli samotných uživatelů.

S Beaker máme nový webový protokol: [Decentralized Archive Transport](https://datprotocol.com). "Datum". Vytváří lokality na vyžádání, zdarma, a pak je sdílí ze zařízení. Nejsou vyžadovány žádné servery. To je naše inovace.

![Protokoly křepelek](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Při návštěvě stránky Dat v Beakeru stahujete soubory. Stránka je navždy. Můžete ho uložit, rozštěpit, upravit a zdarma sdílet svou novou verzi. To vše je open-source.

Takže o tom jde: děláme prohlížeč pro otevřené webové stránky. Chceme, aby to byl soubor nástrojů pro sociální hackerství.

## Kdo by měl používat kafer?

Hackery. Modery. Tvůrčí typy. Lidé, kteří rádi maličkí.

## Jak vytvořím nový projekt, který používá datum?

Máme [nástroj příkazové řádky nazvaný bkr](https://github.com/beakerbrowser/bkr) , který je podobný jako git + npm. Tady je vytvoření stránky:

```bash
$ cd ~/my-site
$ bkr init
$ echo "Dobrý den, svět!" > index.html
$ bkr publikovat
```

A tady je vytvoření stránky:

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "My fork nemá žádné ohledy na předchozí index. tml!" > index.html
$ bkr publikovat
```

Tyto stránky pak budou hostovány z vašeho prohlížeče. Je to trochu jako BitTorrent; sdílíte stránky v P2P mesh.

Pokud chcete grafické rozhraní, máme k dispozici některé základní nástroje zabudované do prohlížeče, ale tlačíme tyto nástroje do uživatelského území. To vše bude upravitelné uživatelské aplikace.

## Proč jste si vybrali stavbu kádinky na Electronu?

Pro tento projekt to bylo samozřejmé. Pokud jsem rozštěpil Chrome sám, napíšu C++ právě teď! To nikdo nechce. Znám webový stack, a mohu s ním rychle pracovat. To není žádný brainer.

Pravdou je, že si nejsem jistý, zda bych mohl něco z toho udělat bez Electronu. Je to skvělý kus softwaru.

## Jaké jsou některé výzvy, kterým jste čelili při budování koberce?

Polovina toho se pokřikuje na nástroje a zjišťuje, kolik se mi může dostat pryč.

Učinit prohlížeč sám o sobě byl docela snadný. Electron je prakticky sada nástrojů pro vytváření prohlížečů. ...S výjimkou karet prohlížeče; to mě trvalo navždy, abych se dostal do pořádku. Nakonec jsem se rozpadl a naučil jsem se dělat SVG. Je mnohem lepší podívat, ale trvalo 3 nebo 4 iterace, než jsem to měl pravdu.

## V jakých oblastech by měl být Electron vylepšen?

Bylo by opravdu skvělé, kdybych mohl devtools ukotvit do webviewu.

## Co přijde další v Beakeru?

Zabezpečené názvy DNS pro stránky Dat. sociálně konfigurovatelné schéma URL s názvem ["App scheme."](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Více Dat API.

## Pro lidi, kteří se mohou zajímat o příspěvek k projektu, v jakých oblastech kádinka potřebuje pomoc?

Máme mnoho otevřených problémů. Nebojte se mě utíkat. #beakerprohlížeč na volné enode. Uchováváme [stránku pro přispěvatele](https://beakerbrowser.com/docs/team.html) a přidáme Vás. A pokud navštívíte Austin, budu si koupit pivo.

## Jakékoliv tipy Electronu, které by mohly být užitečné pro ostatní vývojáře?

1. Použijte nástroj pro sestavení, který je tam ven. Nechcete zápasit s vlastními řešeními, věřte mě. Použít e-builder. Používejte kotlový repozitář.
2. Pokud potřebujete otevřít problém v repou Electron, přejděte na další míli, abyste jej mohli snadno reprodukovat. Odpověď dostanete mnohem rychleji a tým ji ocení. Ještě lépe, zkuste to opravit sami sebe. Ve skutečnosti je velmi zajímavé vidět vnitřní masy.
3. Přečtěte si alespoň jednou všechny průvodce a pokročilé dokumentace.
4. Nenastavujte prohlížeč - je to nasycený trh.

