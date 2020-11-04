# Testare pe sisteme CI cu capul fără cap (Travis CI, Jenkins)

Fiind bazat pe Chromium, Electron are nevoie de un șofer de afișaj pentru a funcționa. Dacă Chromium nu poate găsi un șofer de afișaj, Electron nu va putea lansa - și, prin urmare, nu va executa niciunul dintre teste, indiferent de modul în care le executați . Testarea aplicațiilor pe bază de Electron pe Travis, Circle, Jenkins sau alte sisteme similare necesită, prin urmare, un pic de configurare. În esență, trebuie să folosim un motor virtual de afișare.

## Configurarea serverului de afişare Virtual

În primul rând, instalați [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Este un framework virtual, implementând protocolul serverului de afișare X11 - efectuează toate operațiunile grafice în memorie fără a afișa ieșirea ecranului, de care avem nevoie exact.

Apoi, creați un ecran Xvfb virtual și exportați o variabilă de mediu numită DISPLAY care indică în el. Chromium din Electron va căuta în mod automat `$DISPLAY`, astfel încât nu mai este necesară nicio configurare a aplicației tale. Acest pas poate fi automatizat cu [xvfb-poate](https://github.com/anaisbetts/xvfb-maybe): Prefixează-ți comenzile cu `xvfb-maybe` și mica unealtă va configura automat Xvfb, dacă sistemul actual cere acest lucru. Pe Windows sau macOS, nu va face nimic.

```sh
## Pe Windows sau macOS, aceasta invocă electron-mocha
## Pe Linux, dacă suntem într-un mediu fără cap, acesta va fi echivalent
## cu xvfb-run electron-mocha . test/*.js
xvfb-poate electron-mocha ./test/*.js
```

### CI Travis

On Travis, your `.travis.yml` should look roughly like this:

```yml
addons:
  apt:
    pachete:
      - xvfb

install:
  - export DISPLAY=':99. '
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Jenkins

Pentru Jenkins, este disponibil un [plugin Xvfb](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Cerc CI

Cercul CI este minunat și are Xvfb și `$DISPLAY` [deja configurat, astfel încât nu mai este necesară nicio configurare suplimentară](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor rulează pe Windows, sprijinind Selenium, Chromium, Electron și unelte similare din cutie - nu este necesară nici o configurație.
