# Tests sur les systèmes CI Headless (Travis CI, Jenkins)

Étant basé sur Chromium, Electron requiert un pilote d’affichage de la fonction. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Tester les applications Electron sur Travis, Circle, Jenkins ou systèmes similaires exige donc un peu de configuration. En substance, nous devons utiliser un pilote d’affichage virtuel.

## Configuration du serveur d’affichage virtuel

Tout d’abord, installez [Xvfb](https://en.wikipedia.org/wiki/Xvfb). C’est un framebuffer virtuel, mettant en oeuvre le protocole du serveur d'affichage X11 - il effectue toutes les opérations graphiques en mémoire sans montrer n’importe quel sortie à l'écran, c'est exactement ce dont nous avons besoin.

Ensuite, créez un écran virtuel xvfb et exporter une variable d’environnement appelée DISPLAY qui pointe vers lui. Chromium dans Electron va automatiquement chercher pour `$DISPLAY`, donc aucune configuration supplémentaire de votre application n’est nécessaire. Cette étape peut être automatisée avec [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe) : Ajoutez vos commandes de test avec `xvfb-maybe` et le petit outil configurera automatiquement xvfb, si requis par le système actuel. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

Sur Travis, votre `.travis.yml` devrait ressembler à peu près à ça :

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

Pour Jenkins, un [plugin Xvfb est disponible](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Cercle CI est génial et a xvfb et `$DISPLAY` [ déjà installer, aucune configuration supplémentaire est requise](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor s'exécute sur Windows, supportant Selenium, Chromium, Electron et outils similaires - aucune configuration n’est requise.