# Verzování Electronu

> Podrobný pohled na naši politiku a provádění verzí.

Electron sleduje [semver](#semver). Následující příkaz nainstaluje nejnovější stabilní sestavení Electronu:

```sh
npm install --save-dev electron
```

Pro aktualizaci existujícího projektu pro použití nejnovější stabilní verze:

```sh
npm install --save-dev electron@latest
```

## Verze 1.x

Electron versions *< 2.0* did not conform to the [semver](https://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. I když je to výhodné pro vývojáře spojování funkcí, vytváří problémy pro vývojáře aplikací orientovaných na klienty. testovací cykly QA hlavních aplikací, jako je Slack, Stride, Teams, Skype, VS kód, A Desktop může být zdlouhavý a stabilita je vysoce žádoucí výsledek. Při přidávání nových funkcí při pohlcování oprav chyb existuje vysoké riziko.

Zde je příklad strategie 1.x:

![](../images/versioning-sketch-0.png)

Aplikace vyvinutá s `1.8.1` nemůže nabývat `1. .3` oprava chyb bez pohlcení `1. .2 prvek` nebo podepření opravy a udržování nové vypouštěcí linie.

## Verze 2.0 a nad rámec

Z naší strategie 1.x nastíněné níže je několik zásadních změn. Každá změna je určena k uspokojení potřeb a priorit vývojářů/správců a vývojářů aplikací.

1. Přísné použití semene
2. Zavedení značek `-beta` vyhovujících
3. Úvod [konvenčních zpráv commitů](https://conventionalcommits.org/)
4. Dobře definované stabilizační větve
5. `master` větev je bezverzí; pouze stabilizační větve obsahují informace o verzi

Podrobně se zabýváme tím, jak funguje git branching, jak funguje označení npm, co by měli vývojáři očekávat a jak lze podpořit změny.

# semver

Od 2.0 bude Electron následovat semináře.

Níže je tabulka výslovně mapovající typy změn odpovídající kategorie semene (např. velký, menšinový patch).

| Nárůsty hlavní verze               | Drobné přírůstky verze            | Přírůstky patch verze             |
| ---------------------------------- | --------------------------------- | --------------------------------- |
| Electron rozbití změn API          | Electron nerozbitné změny API     | Opravy chyb Electronu             |
| Aktualizace hlavních verzí Node.js | Aktualizace menších verzí Node.js | Aktualizace novější verze Node.js |
| Aktualizace verze Chromium         |                                   | fixní chromozómové náplasti       |


Všimněte si, že většina aktualizací Chromium bude považována za zlomovou. Opravy, které lze podpořit, budou pravděpodobně vybrány jako patche.

# Stabilizační větve

Stabilizační větve jsou větve, které běží paralelně s velitelem a přijímají pouze třešňově vybrané commity, které souvisejí s bezpečností nebo stabilitou. Tyto větve se nikdy neslučují s velitelem.

![](../images/versioning-sketch-1.png)

Protože Electron 8, stabilizační větve jsou vždy **hlavní** linky verzí, a pojmenováno podle následující šablony `$MAJOR-x-y` . . `8-x-y`.  Před tím jsme použili **drobné** linky verzí a pojmenovali je jako `$MAJOR-$MINOR-x` např. `2-0-x`

Umožňujeme, aby existovalo několik stabilizačních větví současně, a mají v úmyslu vždy podporovat nejméně dvě souběžně a podle potřeby podporovat bezpečnostní opravy. ![](../images/versioning-sketch-2.png)

Starší linie nebudou podporovány GitHubem, ale jiné skupiny mohou převzít vlastnictví a podpořit stabilitu a bezpečnostní opravy samy. Odradujeme to, ale uvědomujeme si, že usnadňuje život mnoha vývojářům aplikací.

# Beta vydání a opravy chyb

Vývojáři chtějí vědět, které verze jsou _bezpečné_ k použití. I zdánlivě nevinné funkce mohou ve složitých aplikacích vyvolat regrese. Zároveň Uzamčení na fixní verzi je nebezpečné, protože ignorujete bezpečnostní záplaty a opravy chyb, které mohly přijít od Vaší verze. Naším cílem je povolit následující standardní rozsahy v `package.json`:

* Pomocí `~2.0.0` získáte pouze opravy týkající se stability nebo bezpečnosti ve vašem vydání `2.0.0`.
* Použijte `^2.0.0` k připuštění nerozbitých _přiměřeně stabilních_ funkcí, stejně jako zabezpečení a opravy chyb.

Co je důležité na druhém bodu, je, že aplikace používající `^` by stále měly mít možnost očekávat přiměřenou úroveň stability. Za tímto účelem semver umožňuje _předběžný identifikátor_ označit určitou verzi ještě není _bezpečná_ nebo _stabilní_.

Ať už si vyberete cokoliv, budete muset pravidelně vypínat verzi ve vašem balíčku `.json` , protože zlomení změn je skutečností života chromu.

Tento proces je následující:

1. Všechny nové hlavní a menší linie vydání začínají s beta sérií označenou semver prerelease tagy `beta.`, např. `2.0.0-beta.1`. Po prvním beta musí následující vydání beta splňovat všechny následující podmínky:
    1. Změna je zpětně kompatibilní s API (deprese jsou povoleny)
    2. Riziko pro splnění našeho harmonogramu stability musí být nízké.
2. Pokud je nutné provést změny po vydání beta, jsou aplikovány a prerelease značka je zvýšena, e. . `2.0.0-beta.2`.
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. např. `2.0.0`. Po první stabilní pozici musí být všechny změny zpětně kompatibilní s chybami nebo bezpečnostními opravami.
4. Pokud budou muset být provedeny opravy chyb nebo bezpečnostních záplat, jakmile bude vydání stabilní, jsou aplikovány a _patch_ je zvýšena e. . `2.0.1`.

Konkrétně se výše uvedeným rozumí:

1. Přidání nebreaking-API změn před 3. týdnem v cyklu beta je v pořádku, i když tyto změny mohou způsobit střední vedlejší efekty
2. Přidávání změn s označením znaků, které jinak nemění existující cesty kódu, ve většině bodů v beta cyklu je v pořádku. Uživatelé mohou tyto vlajky výslovně povolit ve svých aplikacích.
3. Přijímání funkcí jakéhokoliv druhu po týdnu 3 v beta cyklu je 👎 bez velmi dobrého důvodu.

Pro každý větší a menší výhru, byste měli očekávat, že uvidíte něco podobného:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Příklad životního cyklu na obrázcích:

* Je vytvořena nová větev s nejnovějšími funkcemi. Je publikováno jako `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* Oprava chyb přichází do mistrovství, které může být podpořeno do větev vydání. Tato oprava je aplikována a nová beta je publikována jako `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* The beta is considered _generally stable_ and is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
* Později se objeví využití na nulový den a na mistr se použije oprava. Opravu vrátíme na řádek `2-0-` a vydáme `2.0.1`. ![](../images/versioning-sketch-6.png)

Několik příkladů toho, jak různé rozsahy počtů získají nové vydání:

![](../images/versioning-sketch-7.png)

# Chybějící funkce: Alphas
Naše strategie má několik kompromisů, což považujeme za vhodné. Nejdůležitější je, že nové funkce v master může chvíli trvat, než dosáhnou stabilní linie uvolnění. Pokud chcete vyzkoušet novou funkci okamžitě, budete muset postavit Electron sami.

Jako budoucí úvahy můžeme zavést jednu nebo obě z následujících možností:

* uvolňování alfa látek s volitelnými vazbami stability na beta; například by bylo možné připustit nové funkce, když je stabilizační kanál v _alpha_

# Vlajky funkcí
Příznaky jsou běžnou praxí v Chromu a jsou dobře zavedené v ekosystému rozvoje webových stránek. V kontextu Electronu musí mít vlajka prvku nebo **měkká větev** tyto vlastnosti:

* je aktivováno/deaktivována buď při běhu, nebo při stavění; nepodporujeme koncept parametru funkce definovaného požadavkem
* zcela segmentuje nové a staré cesty kódů; refaktura starého kódu na podporu nové funkce _porušuje_ smlouvu s funkcí a vlajkou.
* vlajky funkce jsou nakonec odstraněny po uvolnění funkce

# Sémantické revize

Snažíme se zvýšit jasnost na všech úrovních procesu aktualizace a vydání. Počínaje `2.0.0` budeme vyžadovat požadavky na natažení v souladu se specifikacemi [Konvenční závazky](https://conventionalcommits.org/) , které lze shrnout následovně:

* Commits that would result in semver **major** bump must start their body with `BREAKING CHANGE:`.
* Commits that would result in semver **minor** Bumpa must start with `feat:`.
* Commits that would result in semver **patch** bump must start with `fix:`.

* Umožňujeme zmáčknutí závazků, pokud se squashed zpráva řídí výše uvedeným formátem zprávy.
* Je přijatelné, aby některé závazky v žádosti o natažení neobsahovaly sémantickou předponu, pokud název požadavku na natažení obsahuje smysluplnou sémantickou zprávu.

# Verze `master`

- Větev `master` bude vždy obsahovat další hlavní verzi `X.0.0-nightly.DATE` ve svém `package.json`
- Větev vydání nejsou nikdy sloučeny zpět do mistrovství
- Větve vydání _do_ obsahují správnou verzi v jejich `balíčku.json`
- Jakmile se uvolňovací větev rozřízne na hlavní, musí se kapitán přeskočit na další velitele.  Tj. `master` je vždy verzován jako další teoretická uvolňovací větev
