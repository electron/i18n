---
title: Program zpětné vazby pro Electron aplikace
author: sofianguy
date: '2018-10-02'
---

Electron pracuje na tom, aby byly uvolňovací cykly rychlejší a stabilnější. Abychom to umožnili, spustili jsme program zpětné vazby aplikace pro velké aplikace Electron, abychom otestovali naše beta verze a nahlásili nám problémy specifické pro aplikaci. To nám pomáhá upřednostnit práci, která získá aplikace aktualizované na další stabilní verzi dříve.

Editace (2020-05-21): Tento program byl odcházen do důchodu.

---

## Kdo se může připojit?
Naše kritéria a očekávání pro aplikace připojené k tomuto programu zahrnují tyto položky:
- Otestujte vaši aplikaci během beta periody po dobu 10 000 a více hodin
- Mějte jednu osobu, která se každý týden zkontroluje, zda bude diskutovat o chybách a blokovacích aplikacích ve vaší aplikaci
- Souhlasíte s dodržováním [Kodexu chování Electronu](https://github.com/electron/electron/blob/master/CODE_OF_CONDUCT.md)
- Jste ochotni sdílet následující informace uvedené v další otázce

## Jaké informace má moje Electron aplikace sdílet?
- Celkový počet uživatelských hodin, kdy je vaše aplikace spuštěna s jakýmkoliv beta release
- Verze Electronu, se kterou vaše aplikace testuje (např. 4.0.0-beta.3)
- Jakékoliv chyby znemožňující aplikaci přejít na verzi verze s beta testovanou

## Uživatelská hodina
Nechápeme, že každý může sdílet přesná uživatelská čísla, ale lepší data nám pomáhají rozhodnout, jak stabilní je konkrétní vydání. Žádáme, aby se aplikace zavázaly testovat minimální počet uživatelských hodin, v současné době 10,000 v celém cyklu beta.
- 10 uživatelských hodin může být 10 osob testováno po dobu jedné hodiny nebo 1 osoba po dobu 10 hodin
- Testování můžete rozdělit mezi beta releases, například test na 5 000 uživatelských hodin na 3.0.0-beta. a pak testujte 5 000 uživatelských hodin na 3.0.0-beta.5. Více je lepší, ale chápeme, že některé aplikace nemohou testovat každou beta verzi
- CI nebo QA hodiny se nezapočítávají do celkového součtu; nicméně vnitřní vydání se počítají

## Proč by se měla moje Electron aplikace připojit?
Chyby vaší aplikace budou zaznamenány a budou na radaru týmu Electron. Vaše zpětná vazba pomáhá týmu Electronu vidět, jak nové beta dělají a jakou práci je třeba udělat.

## Budou informace o mé aplikaci sdíleny veřejně? Kdo bude vidět tyto informace?
Ne, informace vaší aplikace nebudou sdíleny s veřejností. Informace jsou uchovávány v soukromém GitHub repozitáři, který je viditelný pouze pro členy App Feedback Program a [Electron Governance](https://github.com/electron/governance). Všichni členové souhlasili se dodržením [Kodexu chování Electronu](https://github.com/electron/electron/blob/master/CODE_OF_CONDUCT.md).

## Zaregistrovat se
V současné době přijímáme *omezený počet* registrací. Pokud máte zájem a jste schopni splnit výše uvedené požadavky, vyplňte prosím tento [formulář](https://goo.gl/forms/OpMEKV75ScN6we7g1).
