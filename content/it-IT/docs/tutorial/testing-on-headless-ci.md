# Scrivere su Sistemi CI Headless (Travis CI, Jenkins)

Essendo basata su Chromium, Electron richiese un driver schermo per funzionare. Se Chromium non trova un driver schermo, Electron semplicemente non si avvia, inoltre non esegue i tuoi testi, indipendente dal fatto che tu li stia eseguendo. Testare app basate su Electron su Travis, Circle, Jenkins o similari Sistemi richiede inoltre una piccola configurazione. In essenza, dobbiamo usare un driver schermo virtuale.

## Configurare il Server Schermo Virtuale

Prima, installa [Xvfb](https://en.wikipedia.org/wiki/Xvfb). È un framebuffer virtuale, comprendente il protocollo server schermo X11, performa tutte le operazioni grafiche in memoria senza mostrare output schermo che esattamente ciò che ci serve.

Poi, crea una schermata xvfb virtuale ed esporta una variabile ambiente detta SCHERMO che la punta. Chromium in Electron cercherà subito `$DISPLAY`, quindi niente lunghe configurazioni richieste per la tua app. Questo passo è reso automatico con [xvfb-forse](https://github.com/paulcbetts/xvfb-maybe) di Paul Bett: Anteponi i comandi di test con `xvfb-forse` ed il piccolo strumento configurerà subito xvfb, se richiesto dal sistema corrente. Su Windows o macOS, non farà nulla.

```sh
## Su Windows o macOS, invoca solo electron-mocha
## Su Linux se in un ambiente headless equivarrà
## a xvfb-esegui electron-mocha ./test/*.js
xvfb-forse electron-mocha ./test/*.js
```

### Travis CI

Su Travis il tuo `.travis.yml` dovrebbe sembrare questo:

```yml
addons:
  apt:
    pacchetti:
      - xvfb

installa:
  - export DISPLAY=':99.0'
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Jenkins

Per Jenkins, un [plugin xvfb è disponibile](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI è fantastica es ba xvfb e `$DISPLAY` [già impostata, quindi niente configurazione lunga richiesta](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor funziona su Windows, supportando Selenium, Chromium, Electron e simili strumenti fuori dalla scatola, no configurazione richiesta.