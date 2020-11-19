# Electron versiebeheer

> Een gedetailleerd overzicht van ons versiebeleid en de tenuitvoerlegging.

Vanaf versie 2.0.0 volgt Electron [halve](#semver). Het volgende commando zal de meest recente stabiele versie van Electron:

```sh
npm install --save-dev electron
```

Om een bestaand project te updaten om de nieuwste stabiele versie te gebruiken:

```sh
npm install --save-dev electron@latest
```

## Versie 1.x

Electron versions *< 2.0* did not conform to the [semver](https://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. Hoewel het handig is voor ontwikkelaars om functies samen te voegen, creëert het problemen voor ontwikkelaars van client-facing applicaties. De QA-testcycli van grote apps zoals Slack, Stride, Teams, Skype, VS Code, Atom, Desktop kan lang zijn en stabiliteit is een zeer gewenst resultaat. Er is een hoog risico in het gebruik van nieuwe functies tijdens het proberen te absorberen van bugfixes.

Hier is een voorbeeld van de 1.x-strategie:

![](../images/versioning-sketch-0.png)

Een app ontwikkeld met `1.8.1` kan geen `1 gebruiken. .3` bug fix zonder de `1 te absorberen. .2` functie, of door het terugzetten van de fix en het onderhouden van een nieuwe releaselijn.

## Versie 2.0 en verder

Er zijn een aantal belangrijke veranderingen ten opzichte van onze 1,x-strategie, zoals hieronder geschetst. Elke wijziging is bedoeld om te voldoen aan de behoeften en prioriteiten van ontwikkelaars/onderhouders en app ontwikkelaars.

1. Strikt gebruik van de semver
2. Inleiding van semver-compliant `-beta` tags
3. Inleiding van [conventionele commit berichten](https://conventionalcommits.org/)
4. Goed gedefinieerde stabilisatie-branches
5. De `master` branch is versionless; alleen stabilisatiebranches bevatten versie-informatie

We zullen gedetailleerd beschrijven hoe git vertakking, hoe npm tagging werkt, wat ontwikkelaars zouden moeten verwachten te zien, en hoe je een backport kan veranderen.

# semver

Vanaf 2.0 zal Electron semver volgen.

Hieronder staat een tabel met wijzigingen expliciet in hun overeenkomstige categorie semver (bijv. Major, Minor, Patch).

| Belangrijke versie stappen        | Kleine Versie stappen                  | Patch versie stappen              |
| --------------------------------- | -------------------------------------- | --------------------------------- |
| Electron breekt API veranderingen | Electron onbreekbare API veranderingen | Electron bug fixes                |
| Node.js grote versie updates      | minor version updates Node.js          | Node.js patch versie updates      |
| Chromium versie updates           |                                        | vast-gerelateerde chroom ladingen |

Houd er rekening mee dat de meeste Chromium updates als breker zullen worden beschouwd. Fixes die terug kunnen worden gezet zullen waarschijnlijk de kersen zijn uitgekozen als patches.

# Stabilisatie branches

Stabilisatiefaciliteiten zijn takken die parallel lopen met master, waarbij alleen cherry-picked commits worden gebruikt die gerelateerd zijn aan veiligheid of stabiliteit. Deze takken worden nooit meer samengevoegd tot master.

![](../images/versioning-sketch-1.png)

Sinds Electron 8 zijn stabilisatie-branches altijd **grote** versiegrenzen, en genoemd tegen de volgende sjabloon `$MAJOR-x-y` e. . `8-x-y`.  Voordien hebben we **minor** version lines gebruikt en ze genoemd als `$MAJOR-$MINOR-x` bijv. `2-0-x`

We laten toe dat meerdere stabilisatie-branches gelijktijdig bestaan, en zijn van plan om ten minste twee parallelle te allen tijde te ondersteunen, waarbij waar nodig beveiligingsfixes worden ondersteund. ![](../images/versioning-sketch-2.png)

Oudere lijnen worden niet ondersteund door GitHub, maar andere groepen kunnen alleen de eigendom en de backport van stabiliteit en beveiliging overnemen. We ontmoedigen dit, maar erkennen dat het het leven gemakkelijker maakt voor veel app ontwikkelaars.

# Beta Releases en Bug Fixes

Ontwikkelaars willen weten welke releases _veilig_ zijn. Zelfs schijnbaar onschuldige functies kunnen leiden tot regressies in complexe toepassingen. Tegelijkertijd vergrendelen naar een vaste versie is gevaarlijk omdat je beveiligingspatches en bug fixes die mogelijk zijn sinds jouw versie negeert. Ons doel is om de volgende standaard semver bereiken in `package.json` toe te staan:

* Gebruik `~2.0.0` om alleen stabiliteit of beveiligingsgerelateerde fixes toe te geven aan je `2.0.0` release.
* Gebruik `^2.0.0` om _redelijk stabiele_ functie toe te laten, evenals beveiliging en bug fixes.

Wat belangrijk is aan het tweede punt is dat apps die `^` gebruiken nog steeds een redelijk niveau van stabiliteit moeten kunnen verwachten. Om dit te bereiken semver staat een _pre-release id_ toe om aan te geven dat een bepaalde versie nog niet _veilig_ of _stabiel_ is.

Wat je ook kiest, je zal periodiek de versie moeten bumpen in je `package.json` omdat het breken van wijzigingen een feit van het Chromium is.

Het proces is als volgt:

1. Alle nieuwe grote en kleine releases beginnen met een bètaserie aangegeven door halve weegschaal, elementen van `beta.`, bijv. `2.0.0-beta.1`. Na de eerste beta moeten de volgende voorwaarden vervuld zijn voor de volgende bèta-releases:
    1. De wijziging is terug te voeren op API-compatibiliteit (uitzonderingen zijn toegestaan)
    2. Het risico om onze stabiliteitsplan te halen moet laag zijn.
2. Als de toegestane wijzigingen moeten worden doorgevoerd zodra een release is voltooid, worden ze toegepast en wordt het prerelease label verhoogd. . `2.0.0-beta.2`.
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. bijv. `2.0.0`. Na de eerste stabiel moeten alle wijzigingen bugs of beveiligingsoplossingen zijn die achterwaarts compatibel zijn.
4. Als toekomstige bugfixes of beveiligingspatches gemaakt moeten worden zodra een release stabiel is, ze worden toegepast en de _patch_ versie is verhoogd e. . `2.0.1`.

Concreet betekent dit alles:

1. Het is oké om wijzigingen in de bètacyclus toe te staan die geen onderbrekings-API hebben voor Week 3 als deze wijzigingen in potentie gematigde bijwerkingen kunnen veroorzaken
2. Het toestaan van functie-gemarkeerde wijzigingen die de bestaande code-paden niet anders wijzigen, op de meeste punten in de bèta-cyclus is oké. Gebruikers kunnen deze markeringen expliciet inschakelen in hun apps.
3. Het toelaten van bepaalde functies na Week 3 in de bètacyclus is 👎 zonder een zeer goede reden.

Voor elke grote en kleine zeep zou je iets als volgt moeten verwachten:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Een voorbeeld lifecycle in foto's:

* Er is een nieuwe release branch aangemaakt met de nieuwste set functies. Het wordt gepubliceerd als `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* Een bug fix komt in de master die terug kan worden gezet naar de release branch. De patch wordt toegepast en een nieuwe bèta wordt gepubliceerd als `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* De bèta wordt beschouwd als _over het algemeen stabiel_ en wordt opnieuw gepubliceerd als een niet-beta onder `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later wordt een nuldaagse exploitatie onthuld en wordt een fix toegepast om onder de knie te komen. We backport het fix naar de `2-0-x` lijn en release `2.0.1`. ![](../images/versioning-sketch-6.png)

Enkele voorbeelden van hoe verschillende semver nieuwe releases zullen ophalen:

![](../images/versioning-sketch-7.png)

# Ontbrekende functies: Alpha's

Onze strategie heeft een aantal afspraken, die wij vooralsnog gepast achten. Het belangrijkste is dat nieuwe functies in de master een tijdje kunnen duren voordat we een stabiele releaselijn bereiken. Als je onmiddellijk een nieuwe functie wilt uitproberen, moet je zelf Electron bouwen.

Als toekomstige overweging kunnen we een of twee van het volgende introduceren:

* alpha laat ruimte voor minder stabiele beperkingen; bijvoorbeeld is het toegestaan om nieuwe functies toe te voegen terwijl een stabiliteitskanaal zich in _alpha_ bevindt

# Feature vlaggen

Kennisvlaggen zijn een gangbare praktijk in Chromium en zijn goed gevestigd in het webontwikkelingecosysteem. In de context van Electro, moet een feature flag of **soft branch** de volgende eigenschappen hebben:

* het is ingeschakeld/uitgeschakeld tijdens de runtime of build-time; we ondersteunen het concept van een aangevraagde functie vlag
* het volledig segmenteert nieuwe en oude code paden; refactoring van oude code om een nieuwe functie te ondersteunen _schendt het feature-flag contract_
* functievlaggen worden uiteindelijk verwijderd nadat de functie is vrijgegeven

# Semantische Commits

We proberen op alle niveaus van het actualiserings- en releases-proces meer duidelijkheid te geven. Vanaf `2.0.0` vereisen we pull requests die voldoen aan de [Conventional Commits](https://conventionalcommits.org/) specificatie, die als volgt kan worden samengevat:

* Commando's die resulteren in een halve **major** bump moeten hun lichaam starten met `REAKKENDE CHANGE:`.
* Commando's die een semver **minor** bump zouden geven, moeten beginnen met `functie:`.
* Vastleggingen die resulteren in een semver **patch** bump moeten beginnen met `fix:`.

* We staan squashing van vastleggingen toe, op voorwaarde dat het pletterende bericht zich houdt aan het bovenstaande berichtenformaat.
* Het is acceptabel dat sommige commits in een pull-aanvraag geen semantisch voorvoegsel bevatten, zolang de pull request titel een betekenisvol semantisch bericht bevat.

# Versioned `master`

- De `master` branch zal altijd de volgende grote versie `X.0.0-nightly.DATE` in zijn `package.json` bevatten
- Losse branches worden nooit teruggevoegd naar master
- Release branches _bevatten_ de juiste versie in hun `package.json`
- Zodra een grote tak van de release is afgebouwd, moet de master tot de volgende grote worden doorgedrongen.  I.e. `master` is always versioned as the next theoretical release branch
