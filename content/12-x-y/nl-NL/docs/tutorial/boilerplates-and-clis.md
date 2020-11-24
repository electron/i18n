# Boilerplates en CLIs

Electron ontwikkeling is niet helder - er is geen "één echte manier" om te ontwikkelen, bouwen, pakket of release een Electron applicatie. Extra functies voor Electron, zowel voor build- als run-time, kunnen meestal worden gevonden op [npm](https://www.npmjs.com/search?q=electron) in individuele pakketten, staat ontwikkelaars toe om zowel de app te bouwen en de pijpleiding te bouwen die ze nodig hebben.

Dat niveau van modulariteit en uitbreidbaarheid zorgt ervoor dat alle ontwikkelaars werken met met Electron, zowel groot als klein in team-size, worden nooit beperkt in wat ze op enig moment tijdens hun ontwikkelingslevenscyclus kunnen of kunnen doen. voor veel ontwikkelaars, een van de community-gedreven boilerplates of command line tools kan het echter dramatisch makkelijker maken om te compileren, Pakket en publiceer een app.

## Boilerplate vs CLI

Een boilerplate is slechts een beginpunt - een canvas, om te spreken - vanwaar je applicatie van maakt. Ze komen meestal in de vorm van een repository die u kunt klonen en aanpassen aan de harteninhoud.

Een command line tool daarentegen blijft u steunen in de hele ontwikkeling en release. Ze zijn behulpzamer en ondersteunender maar houden richtlijnen in over hoe je code moet worden gestructureerd en gebouwd. *speciaal voor beginners, het gebruik van een opdrachtregeltool zal waarschijnlijk nuttig zijn*.

## electron-forge

Een "compleet hulpmiddel voor het bouwen van moderne Electron applicaties". Electron Forge verenigt de bestaande (en goed onderhouden) build tools voor Electron ontwikkeling tot een samenhangend pakket zodat iedereen direct naar Electron kan springen.

Forge wordt geleverd met [een kant-en-klaar sjabloon](https://electronforge.io/templates) met behulp van Webpack als bundler. Het bevat een voorbeeld van typescript configuratie en biedt twee configuratiebestanden om eenvoudige aanpassingen in te schakelen. Het gebruikt dezelfde kernmodules gebruikt door de grotere Electron community (zoals [`elektron-packager`](https://github.com/electron/electron-packager)) - wijzigingen gemaakt door Electron maintainers (zoals Slack) voordeel Forge's gebruikers, ook.

U vindt meer informatie en documentatie over [electronforge.io](https://electronforge.io/).

## electron-builder

Een "complete oplossing voor het pakket en het bouwen van een kant-en-klare Electron app" die zich richt op een geïntegreerde ervaring. [`electron-builder`](https://github.com/electron-userland/electron-builder) voegt er een enkele afhankelijkheid toe die gericht is op eenvoud en beheert alle verdere vereisten intern.

`electron-builder` vervangt functies en modules die worden gebruikt door de Electron onderhouders (zoals de auto-updater) met aangepaste update. Ze zijn over het algemeen nauwer geïntegreerd, maar zullen minder gemeen hebben met populaire Electron apps zoals Atom, Visual Studio Code of Slack.

U kunt meer informatie en documentatie vinden in [de repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

Als je geen gereedschap wilt, maar alleen een solide boilerplate om van te bouwen CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) zou een kijkje waard kunnen zijn. Het is behoorlijk populair in de gemeenschap en gebruikt `electron-builder` intern.

## Andere Tools en Boilerplates

De ["Geweldige Electron" lijst](https://github.com/sindresorhus/awesome-electron#boilerplates) bevat meer gereedschappen en boilerplaten om uit te kiezen. Als je de lengte van de intimidatie van de lijst vindt, vergeet dan niet dat het toevoegen van gereedschappen tijdens het traject ook een geldige aanpak is.
