---
title: 'Electron interals: Budování Chromia jako knihovny'
author: zcbenz
date: '2017-03-03'
---

Electron je založen na open-source Chromiu společnosti Google, což je projekt, který nemusí být nutně navržen k použití jinými projekty. Tento příspěvek zavádí jak je Chromium postaveno jako knihovna pro použití Electronu a jak se v průběhu let vyvíjí systém sestavení .

---

## Použití nástroje pro propojení Evropy

Vložený rámec Chromu (CEF) je projekt, který mění Chromium na knihovnu a poskytuje stabilní API založené na kódovém základně Chromia. Velmi raných verzí Atom editoru a NW.js použitých CEF.

Za účelem zachování stabilního API skryje CEF všechny detaily chromu a obalů API chromu s vlastním rozhraním. Takže když jsme potřebovali přístup k základním API Chromium, jako je integrace Node.js do webových stránek, výhody CEF se staly blokováními.

Takže na konci Electron i NW.js přepnul přímo na používání Chromium's API .

## Stavba jako součást chromu

I když Chromium oficiálně nepodporuje vnější projekty, kódová databáze je modulární a lze snadno sestavit minimální prohlížeč založený na Chromiu. Modul jádro poskytující rozhraní prohlížeče se nazývá Modul obsahu.

Pro vývoj projektu s modulem obsahu je nejjednodušším způsobem, jak vybudovat projekt jako součást Chromium. This can be done by first checking out Chromium's source code, and then adding the project to Chromium's `DEPS` file.

NW.js a velmi rané verze Electronu používají tento způsob sestavování.

Nevýhodou je, že Chromium je velmi velká kódová základna a k výstavbě velmi výkonných strojů. Pro normální notebooky, to může trvat déle než 5 hodin. To má tedy velký vliv na počet vývojářů, kteří mohou přispět k projektu a také zpomaluje vývoj.

## Vytváření chromu jako jediné sdílené knihovny

Electron jako uživatel obsahu modulu nemusí ve většině případů měnit kód Chromia , takže očividným způsobem, jak zlepšit stavbu Electronu, je stavět Chromium jako sdílenou knihovnu, a pak s ním propojte v Electronu. Takto vývojáři již nemusí při přispění k Electronu stavět vše mimo Chrom.

Projekt [libchromiumcontent](https://github.com/electron/libchromiumcontent) byl pro tento účel vytvořen [@aroben](https://github.com/aroben). Sestavuje obsah Modul Chromia jako sdílenou knihovnu a pak poskytuje záhlaví Chromia a předsestavené binárky ke stažení. Kód počáteční verze libchromia obsahu naleznete [v tomto odkazu](https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c).

Projekt [jasná](https://github.com/electron/brightray) se také narodil jako součást libchromového obsahu, , který poskytuje tenkou vrstvu kolem modulu obsahu.

Pomocí libchromitého obsahu a jasného spojení mohou vývojáři rychle vytvořit prohlížeč bez detailů sestavení Chromium. A odstraňuje požadavky na rychlou síť a výkonný stroj pro budování projektu.

Kromě Electronu existovaly i další projekty založené na Chromu tímto způsobem jako prohlížeč [Breach](https://www.quora.com/Is-Breach-Browser-still-in-development).

## Filtrování exportovaných symbolů

V systému Windows existuje omezení počtu symbolů, které jedna sdílená knihovna může exportovat. Vzhledem k tomu, že kódová báze chromu rostla, počet symbolů exportovaných v libchromu brzy přesáhl omezení.

Řešením bylo odfiltrovat nepotřebné symboly při generování DLL souboru. Fungovalo to [poskytnutím `. ef` soubor do linkeru](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), a poté pomocí skriptu na [posuzovat, zda symboly pod jmenným prostorem mají být exportovány](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd).

Přijetím tohoto přístupu sice Chromium přidával nové exportované symboly, libchromium by stále mohlo generovat sdílené soubory knihovny odstraněním dalších symbolů.

## Konstrukce komponent

Dříve než začneme hovořit o dalších krocích učiněných v oblasti obsahu libchromu, je důležité nejprve zavést koncept komponentů, který bude postaven v chromu.

Jako obrovský projekt trvá spojovací krok v oblasti chromu při stavbě velmi dlouho. Obvykle když vývojář provádí malou změnu, může trvat 10 minut, než uvidí konečný výstup. Abychom to vyřešili, Chromium zavedl komponentu, která staví každý modul v Chromu jako oddělené sdílené knihovny, takže čas strávený v závěrečném propojovacím kroku se stává neznatelným.

## Doručovací syrové binární soubory

S pokračujícím růstem chromu. v Chromiu bylo tolik exportovaných symbolů, že i symboly obsahového modulu a Webkit byly více než omezení. Bylo nemožné vytvořit použitelnou sdílenou knihovnu pouhými symboly odkrývajícími.

Nakonec jsme museli [odeslat syrové binární soubory Chromium](https://github.com/electron/libchromiumcontent/pull/98) namísto generování jediné sdílené knihovny.

Jak bylo zavedeno dříve, v Chromu existují dva stavební režimy. Díky přepravním surovým binárním souborům musíme odeslat dvě různé distribuce binárních souborů v libchromu. Jedna se nazývá `static_library` , která obsahuje všechny statické knihovny každého modulu generované normálním stavěním Chromium. Druhým je `shared_library`, který obsahuje všechny sdílené knihovny každého modulu generovaného sestavením komponenty.

V Electronu je Debug verze propojena s `shared_library` verzí libchromiumobsahu, protože je malá ke stažení a málo času při propojení konečného spustitelného souboru. A verze verze verze Electronu je propojena s `static_library` verzí libchromiumobsahu, aby kompilátor mohl generovat plné symboly, které jsou důležité pro ladění, a linker může udělat mnohem lepší optimalizaci, protože ví, které objekty jsou potřeba a které nejsou.

Pro normální vývoj tedy vývojáři potřebují pouze vytvořit ladící verzi, , která nevyžaduje dobrou síť nebo výkonný počítač. Přestože verze Release pak vyžaduje mnohem lepší hardwarovou verzi, může generovat lepší optimalizované binární soubory.

## Aktualizace `gn`

Jako jeden z největších projektů na světě není většina normálních systémů vhodná pro výstavbu chromu, a tým Chromium vyvíjí vlastní nástroje .

Dřívější verze chromu používaly jako stavební systém `gyp` , ale trpí tím, že jsou pomalé, a jeho konfigurační soubor je těžko pochopitelný pro komplexní projekty. Po letech vývoje se Chromium přepnul na `gn` jako stavební systém, který je mnohem rychlejší a má jasnou architekturu.

Jedním ze zlepšení `gn` je zavést `source_set`, což představuje skupinu objektů. V `gyp`byl každý modul reprezentován buď `static_library` nebo `shared_library`, a pro normální sestavení Chromia každý modul vytvořil statickou knihovnu a byl propojen v konečném spustitelném . Používáním `gn`každý modul nyní pouze generuje soubor objektových souborů , a konečný spustitelný soubor spojuje všechny soubory dohromady, , takže mezilehlé soubory statické knihovny již nejsou vygenerovány.

Toto zlepšení však způsobilo velké potíže s obsahem libchromu, protože mezilehlé soubory statické knihovny byly ve skutečnosti potřebné pro obsah libchromu.

První pokus vyřešit to bylo na [patch `gn` vygenerovat statické knihovny soubory](https://github.com/electron/libchromiumcontent/pull/239), který vyřešil problém, ale nebyl ani zdaleka od slušného řešení.

Druhý pokus provedl [@alespergl](https://github.com/alespergl) až [a vytvořil vlastní statické knihovny ze seznamu souborů objektů](https://github.com/electron/libchromiumcontent/pull/249). Využil trik k prvnímu spuštění figuríny pro shromáždění seznamu vygenerovaných souborů objektů, a pak skutečně stavět statické knihovny krmením `gn` se seznamem. Provedla pouze minimální změny ve zdrojovém kódu společnosti Chromium a udržela architekturu budov společnosti Electron.

## Summary

Jak vidíte, v porovnání se stavbou Electron jako součást Chromia, výstavba Chromium jako knihovna se více snaží a vyžaduje nepřetržitou údržbu. Ta však odstraňuje požadavek silného hardwaru na stavbu elektrony, tak umožňuje mnohem větší škálu vývojářů budovat a přispívat k Electronu. Toto úsilí je naprosto cenné.

