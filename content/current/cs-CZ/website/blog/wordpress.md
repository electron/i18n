---
title: 'Projekt týdne: WordPress Desktop'
author:
  - mkaz
  - johngodley
  - zeke
date: '2017-02-28'
---

Tento týden jsme dohnali folky na [Automaticky](https://automattic.com/) a mluvit o [WordPress Desktop](https://apps.wordpress.com/desktop/), open-source desktopový klient pro správu obsahu WordPressu.

---

[![WordPress aplikace](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Každý ví o WordPress, ale co je WordPress plocha?

[WordPress. om Desktop app](https://apps.wordpress.com/desktop/) poskytuje bezproblémový zážitek, který vám umožní zaměřit se na obsah a design bez karet prohlížeče, abyste vás rozptylovali - nebo udržet vaše stránky na straně, ale přístupné. Ve spojení s naší podporou prohlížeče a mobilní aplikací můžete vytvořit své stránky kdekoliv, a to jakýmkoli způsobem vám pomůže dokončit vaši práci.

## Proč vytvořit aplikaci pro správu WordPress stránek? Nemohl by být vše založeno na webu?

Ve skutečnosti používá přesně stejnou technologii, kterou dostanete při návštěvě [WordPress.com](https://wordpress.com) ve vašem prohlížeči. Nicméně, vše je hostováno lokálně, takže má minimální dobu zatížení. S výhodou nativních funkcí, jako je být ve vašem doku, oznámení atd., se můžete opravdu soustředit na své WordPress stránky a blogování.

## Proč jste se rozhodli vytvořit WordPress plochu na Electronu?

Na konci roku 2015 jsme přebudovali mnoho WordPress.com ve formě [Calypso](https://github.com/automattic/wp-calypso), open-source moderní JavaScriptové aplikace pomocí React. Začali jsme se dívat na Electron a s některými změnami v Calypso jsme se mohli dostat do chodu lokálně. Byl to přesvědčivý zážitek a my jsme se domnívali, že jeho další rozvoj má velký význam.

Na Calypso. Pracovalo několik týmů. Pro vytvoření plného multiplatformního GUI klienta, který by to odpovídal s použitím tradičních desktopových technologií, by bylo zapotřebí více práce. Používáním elektroniky malý tým 2-4 z nás byl schopen využít úsilí druhého týmu a během několika měsíců vybudovat aplikaci pro stolní počítače.

## Jaké jsou některé výzvy, kterým jste čelili při budování WordPress plochy?

Počáteční verze aplikace byla spuštěna velmi rychle, ale ladění aplikace se chová optimálně jako desktopová aplikace trvá mnohem déle. Jednou velkou výzvou pro aplikaci je, že ve skutečnosti používáte kopii Calypso na svém vlastním počítači - je to čistě rozhraní založené na API. Do toho bylo zapojeno mnoho překlenovacích prací a změny byly vpuštěny do samotného Calypso.

Navíc bylo vynaloženo mnoho úsilí na balení aplikace pro různé platformy - poskytujeme Windows, macOS a Linux verze - a existují dostatečné rozdíly pro tento trik.

V té době byl Electron relativně nový a my jsme neustále narazili na problémy, které byly brzy opraveny (někdy tentýž den!)

## V jakých oblastech by měl být Electron vylepšen?

Electron již poskytuje většinu toho, co potřebujeme pro aplikaci pro stolní počítač, a od doby, kdy jsme ji začali používat, postupuje rychle. Existují však některé oblasti, které jsou v desktopové aplikaci brány jako samozřejmost. např. kontrola pravopisu a jemné/nahrazení, které jsou obtížnější replikovat elektronickým testem.

Rádi bychom také viděli, jak některé novější technologie Chrome se také filtrují do Electronu. Zvláště se snažíme experimentovat s WebVR.

## Co jsou vaše oblíbené věci o Electronu?

Hlavním důvodem, proč jsme si vybrali Electron, a je to největší síla, je velmi aktivní a otevřená komunita. Automatická aplikace vždy věřila v open source. Je to jeden z našich základních principů, a Electron projekt a komunita sleduje spoustu klíčových přesvědčení o velmi otevřeném a pozitivním přístupu.

## Co další přijde ve WordPress počítače?

Na našem modelu je skvělé, že aplikace pro stolní počítače využívá jakoukoli novou funkci Calypso - dochází k neustálým zlepšením. Doufáme, že můžeme do aplikace přidat další funkce, jako je podpora offline, která by aplikaci skutečně přivedla na původní území a lepší systémová oznámení.

## Pracují nějaké týmy na jiných Electronových aplikacích?

Ano, po našem úsilí v aplikaci pro stolní počítače, Simplenote tým se rozhodl použít Electron pro vytvoření desktopových aplikací pro Windows a Linux (nativní Mac klient již existuje). [Simplenote Electron aplikace](https://github.com/Automattic/simplenote-electron) je také open source a je k dispozici na Githubu.

Máme také nadcházející integraci Raspberry Pi, která používá Electron.

Pokud kterákoli z těchto funkcí zní zajímavě, pak bychom od vás [rádi slyšeli](https://automattic.com/work-with-us/)!

## Jakékoliv tipy Electronu, které by mohly být užitečné pro ostatní vývojáře?

Proces přepravy podepsaného desktopového softwaru je pro nás relativně nový, zejména pro Windows. napsali jsme článek pro [Code Signing a Windows App](https://mkaz.blog/code/code-signing-a-windows-application/) , který zahrnuje proces a několik překážek, kterými jsme prošli, aby to udělali správně.

