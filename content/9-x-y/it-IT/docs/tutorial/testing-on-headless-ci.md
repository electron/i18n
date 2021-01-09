# Testing on Headless CI Systems (Travis CI, Github Actions, Jenkins)

Essendo basata su Chromium, Electron richiese un driver schermo per funzionare. Se Chromium non riesce a trovare un display driver, Electron non riesce a lanciare - e quindi non eseguire nessuno dei tuoi test, indipendentemente da come si sta eseguendo loro. Testare app basate su Electron su Travis, Circle, Jenkins o similari Sistemi richiede inoltre una piccola configurazione. In essenza, dobbiamo usare un driver schermo virtuale.

## Configurare il Server Schermo Virtuale

Prima, installa [Xvfb](https://en.wikipedia.org/wiki/Xvfb). È un framebuffer virtuale, comprendente il protocollo server schermo X11, performa tutte le operazioni grafiche in memoria senza mostrare output schermo che esattamente ciò che ci serve.

Quindi, creare uno schermo virtuale Xvfb ed esportare una variabile di ambiente chiamata DISPLAY che punta ad esso. Chromium in Electron cercherà subito `$DISPLAY`, quindi niente lunghe configurazioni richieste per la tua app. Questo passaggio può essere automatizzato con Anai<unk> s Betts' [xvfb-forse](https://github.com/anaisbetts/xvfb-maybe): Prepara il tuo test comandi con `xvfb-forse` e il piccolo strumento configurerà automaticamente Xvfb, se richiesto dal sistema attuale. On Windows or macOS, it will do nothing.

```sh
## Su Windows o macOS, questo invoca electron-mocha
## Su Linux, se siamo in un ambiente senza testa, questo sarà equivalente
## a xvfb-run electron-mocha . test/*.js
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

### Github Actions

For Github Actions, a [Xvfb action is available](https://github.com/marketplace/actions/gabrielbb-xvfb-action).

### Jenkins

Per Jenkins, un [plugin xvfb è disponibile](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI è fantastico e ha già impostato Xvfb e `$DISPLAY` [, quindi non è richiesta alcuna ulteriore configurazione](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor funziona su Windows, supportando Selenium, Chromium, Electron e simili strumenti fuori dalla scatola, no configurazione richiesta.
