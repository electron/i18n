# Scrivere su Sistemi CI Headless (Travis CI, Jenkins)

Essendo basata su Chromium, Electron richiese un driver schermo per funzionare. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Testare app basate su Electron su Travis, Circle, Jenkins o similari Sistemi richiede inoltre una piccola configurazione. In essenza, dobbiamo usare un driver schermo virtuale.

## Configurare il Server Schermo Virtuale

Prima, installa [Xvfb](https://en.wikipedia.org/wiki/Xvfb). È un framebuffer virtuale, comprendente il protocollo server schermo X11, performa tutte le operazioni grafiche in memoria senza mostrare output schermo che esattamente ciò che ci serve.

Poi, crea una schermata xvfb virtuale ed esporta una variabile ambiente detta SCHERMO che la punta. Chromium in Electron cercherà subito `$DISPLAY`, quindi niente lunghe configurazioni richieste per la tua app. Questo passo è reso automatico con [xvfb-forse](https://github.com/paulcbetts/xvfb-maybe) di Paul Bett: Anteponi i comandi di test con `xvfb-forse` ed il piccolo strumento configurerà subito xvfb, se richiesto dal sistema corrente. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
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