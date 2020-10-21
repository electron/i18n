---
title: "Oznámení podpory TypeScriptu v Electronu"
author: zeke
date: '2017-06-01'
---

Balíček `elektronů` npm nyní obsahuje soubor definice TypeScriptu, který poskytuje podrobné anotace celého Electron API. Tyto anotace mohou zlepšit vaši zkušenost s vývojem Electronu **, i když píšete vanilla JavaScript**. Jen `npm nainstaluje elektroron` pro získání aktuálních Electron psaní ve vašem projektu.

---

TypeScript je open-source programovací jazyk vytvořený společností Microsoft. Je to supersada JavaScriptu, která rozšiřuje jazyk přidáním podpory statických typů. Komunita TypeScript se v posledních letech rychle rozrostla, a TypeScript byly zařazeny mezi [nejmilovanější programovací jazyky](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) v nedávném průzkumu Stack Overflow developer.  TypeScript je popsán jako "JavaScript který měřítko" a týmy na [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), a [Microsoft](https://github.com/Microsoft/vscode) ho používají k psaní škálovatelných aplikací Electronu, které používají miliony lidí.

TypeScript podporuje mnoho novějších funkcí jazyka v JavaScriptu jako tříd, ničení objektů, a async/počkej, ale jeho skutečná diferenciace funkce je **typické anotace**. Deklarace vstupních a výstupních dat očekávaných vaším programem může [snížit chyby](https://slack.engineering/typescript-at-slack-a81307fa288d) tím, že vám pomůže najít chyby v sestavení, a anotace mohou sloužit jako formální prohlášení [o tom, jak váš program funguje](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Když jsou knihovny napsány vanilla Javascript, jsou tyto typy často vágně definované jako pomyšlení při psaní dokumentace. Funkce mohou často přijímat více typů než to, co bylo zdokumentováno, nebo funkce může mít neviditelné vazby, které nejsou zdokumentovány, což může vést k chybám při běhu systému.

TypeScript řeší tento problém se soubory **definice**. Soubor definice typu Script popisuje všechny funkce knihovny a její očekávané typy vstupu a výstupu. Když autoři knihovny spojují definiční soubor typu TypeScript se zveřejněnou knihovnou, spotřebitelé této knihovny mohou [prozkoumat své API přímo v jejich editoru](https://code.visualstudio.com/docs/editor/intellisense) a začít jej ihned používat, často bez nutnosti konzultovat dokumentaci knihovny .

Mnoho oblíbených projektů jako [Úhlové](https://angularjs.org/), [Vue. s](http://vuejs.org/), [uze-github](https://github.com/mikedeboer/node-github) (a nyní Electron! sestaví svůj vlastní definiční soubor a spojí jej s jejich publikovaným npm balíčkem. U projektů, které nespojují svůj vlastní definiční soubor, existuje [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), ekosystém třetích stran v komunitně spravovaných souborech.

## Montáž

Počínaje verzí 1.6.10, každá verze Electronu obsahuje vlastní soubor definice typu. Když nainstalujete balíček `electron` z npm, soubor `electron.d.ts` je automaticky propojen s nainstalovaným balíčkem .

[Nejbezpečnější způsob](https://electronjs.org/docs/tutorial/electron-versioning/) instalace Electronu používá přesné číslo verze:

```sh
npm install electron --save-dev --save-exact
```

Nebo pokud používáte [příze](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
příze přidat elektroron --dev --exact
```

Pokud jste již používali definice třetích stran, jako je `@types/electron` a `@types/node`, měli byste je odstranit z vašeho projektu Electron, abyste se vyhnuli kolizím.

Definiční soubor je odvozen z naší [strukturované API dokumentace](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), tak bude vždy konzistentní s [Electronem API dokumentací](https://electronjs.org/docs/api/). Stačí nainstalovat `elektroron` a vždy dostanete definice TypeScriptu, které jsou aktuální s verzí Electronu, kterou používáte.

## Využití

Pro shrnutí jak nainstalovat a používat nové poznámky TypeScriptu, sledujte tuto krátkou ukázkovou obrazovku: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Pokud používáte [Visual Studio Code](https://code.visualstudio.com/), již máte vestavěnou podporu TypeScriptu. Existují také pluginy spravované komunitou pro [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), a [dalších editorů](https://www.typescriptlang.org/index.html#download-links).

Jakmile bude váš editor nakonfigurován pro TypeScript, začnete vidět více kontextového chování, jako jsou návrhy na automatické dokončování, inline metoda reference, kontroly argumentů a další.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Automatické vyplnění metody">
  <figcaption>Automatická metoda</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Odkaz na metodu">
  <figcaption>Linkový odkaz na metodu</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Kontrola argumentů">
  <figcaption>Kontrola argumentů</figcaption>
</figure>

## Začínáme s TypeScript

Pokud jsi nový na TypeScript a chceš se dozvědět více toto [úvodní video od Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) poskytuje dobrý přehled o tom, proč byl jazyk vytvořen, jak to funguje, jak ho používat a kde je to hlavní.

Na oficiálních stránkách typu TypeScript je také příručka [](https://www.typescriptlang.org/docs/handbook/basic-types.html) a [hrací plochu](https://www.typescriptlang.org/play/index.html) .

Vzhledem k tomu, že TypeScript je supersadou JavaScript, váš existující JavaScript kód je již platný TypeScript. To znamená, že můžete postupně přecházet na existující JavaScript projekt do TypeScript, který bude fungovat v nových jazykových funkcích, podle potřeby.

## Děkujeme

Tento projekt by nebyl možný bez pomoci komunity operátorů s otevřeným zdrojovým kódem. Díky [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milán Burda](https://github.com/miniak) [Brendan Forster](https://github.com/shiftkey), a mnoho dalších za opravy chyb, zlepšení dokumentace, a technické pokyny.

## Podpora

If you encounter any issues using Electron's new TypeScript definition files, please file an issue on the [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues) repository.

Šťastný TypeScripting!
