# Testing on Headless CI Systems (Travis CI, Github Actions, Jenkins)

Gebaseerd op Chromium, heeft Electron een displaydriver nodig om te functioneren. Als Chromium een beeldstuurprogramma niet kan vinden, zal Electron niet starten - en dus geen van uw tests uitvoeren, ongeacht hoe u deze runt. Het testen van elektrisch gebaseerde apps op Travis, Circle, Jenkins of soortgelijke systemen vereist daarom een beetje configuratie. In wezen moeten we een virtuele weergavechauffeur gebruiken.

## De Virtuele Weergaveserver configureren

Installeer eerst [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Het is een virtuele framebuffer, waarmee het X11 displayserver protocol wordt geïmplementeerd - het voert alle grafische bewerkingen uit in het geheugen zonder enige schermuitvoer, dat is precies wat we nodig hebben.

Maak dan een virtueel Xvfb scherm aan en exporteer een omgevingsvariabele DISPLAY die ernaar verwijst. Chromium in Electron zoekt automatisch voor `$DISPLAY`, dus verdere configuratie van je app is niet nodig. Deze stap kan geautomatiseerd worden met Anaidie's Betts' [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Voorkom je test commando's met `xvfb-misschien` en de kleine tool zal automatisch Xvfb configureren indien vereist door het huidige systeem. Op Windows of macOS zal het niets doen.

```sh
## Op Windows of macOS roept dit electron-mocha
## op Linux, Als we in een headless omgeving zitten, dan is dit gelijk aan
## aan elektron-mocha op xvfb-run. test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

Op Travis, zou je `.travis.yml` er ongeveer als volgt uit moeten zien:

```yml
addons:
  apt:
    packages:
      - xvfb

install:
  - export DISPLAY=':99. '
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Github Actions

For Github Actions, a [Xvfb action is available](https://github.com/marketplace/actions/gabrielbb-xvfb-action).

### Jenkins

Voor Jenkins, is een [Xvfb plugin beschikbaar](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Cirkel CI

Cirkel CI is geweldig en heeft Xvfb en `$DISPLAY` [al ingesteld, dus er is geen verdere configuratie nodig](https://circleci.com/docs/environment#browsers).

### Sluipschutter

AppVeyor draait op Windows, Selenium, Chromium, Electron en soortgelijke tools ondersteunen - configuratie is niet vereist.
