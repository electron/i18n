# Tests auf Headless CI Systemen (Travis CI, Jenkins)

Basierend auf Chromium, benötigt Electron einen Displaytreiber zur Funktion. Wenn Chromium keinen Displaytreiber findet, wird Electron nicht starten - und daher keinen Ihrer Tests ausführen, unabhängig davon, wie Sie benutzen. Das Testen von Electron-basierten Apps auf Travis, Circle, Jenkins oder ähnlichen Systemen erfordert daher ein wenig Konfiguration. Im Wesentlichen müssen wir einen virtuellen Displaytreiber verwenden.

## Konfiguration des Virtuellen Anzeigeservers

Installieren Sie zuerst [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Es ist ein virtueller Framebuffer, der das X11 Display-Server-Protokoll implementiert - es führt alle grafischen Operationen im Speicher ohne Bildschirmausgabe aus, das ist genau das, was wir brauchen.

Erstelle dann einen virtuellen Xvfb-Bildschirm und exportiere eine Umgebungsvariable namens DISPLAY, die darauf verweist. Chromium in Electron sucht automatisch nach `$DISPLAY`, daher ist keine weitere Konfiguration Ihrer App erforderlich. This step can be automated with Anaïs Betts' [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure Xvfb, if required by the current system. Unter Windows oder macOS wird nichts tun.

```sh
## Unter Windows oder macOS ruft Elektron-Mocha
## auf Linux auf wenn wir uns in einer kopflosen Umgebung befinden, entspricht dies
## der xvfb-run electron-mocha . test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

Auf Travis sollte deine `.travis.yml` ungefähr so aussehen:

```yml
addons:
  apt:
    packages:
      - xvfb

install:
  - export DISPLAY=':99.0'
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Jenkins

Für Jenkins ist ein [Xvfb Plugin verfügbar](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI ist großartig und hat Xvfb und `$DISPLAY` [bereits eingerichtet, daher ist keine weitere Konfiguration erforderlich](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor läuft unter Windows, unterstützt Selenium, Chromium, Electron und ähnliche Tools aus der Box - keine Konfiguration ist erforderlich.
