# Tests sur les systèmes CI Headless (Travis CI, Jenkins)

Étant basé sur Chromium, Electron requiert un pilote d’affichage de la fonction. Si Chromium ne peut pas trouver un pilote d’affichage, Electron échouera tout simplement au lancement - et par conséquent, n'exécutera aucun de vos tests, peu importe comment vous les exécutez. Tester les applications Electron sur Travis, Circle, Jenkins ou systèmes similaires exige donc un peu de configuration. En substance, nous devons utiliser un pilote d’affichage virtuel.

## Configuration du serveur d’affichage virtuel

Tout d’abord, installez [Xvfb](https://en.wikipedia.org/wiki/Xvfb). C’est un framebuffer virtuel, mettant en oeuvre le protocole du serveur d'affichage X11 - il effectue toutes les opérations graphiques en mémoire sans montrer n’importe quel sortie à l'écran, c'est exactement ce dont nous avons besoin.

Ensuite, créez un écran virtuel Xvfb et exportez une variable d'environnement appelée DISPLAY qui pointe vers elle. Chromium dans Electron va automatiquement chercher pour `$DISPLAY`, donc aucune configuration supplémentaire de votre application n’est nécessaire. Cette étape peut être automatisée avec Anaïs Betts [xvfb-peut-être](https://github.com/anaisbetts/xvfb-maybe) : Préfixer vos commandes de test avec `xvfb-maybe` et le petit outil configurera automatiquement Xvfb, si requis par le système actuel. Sous Windows ou macOS, il ne se passera rien.

```sh
## Sous Windows ou macOS, electron-mocha est invoque
## Sous Linux, si on est dans un environement headless, cela reviendra 
## à xvfb-run electron-mocha ./test/*.js 
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

Circle CI est génial et a Xvfb et `$DISPLAY` [déjà configuré, donc aucune nouvelle configuration n'est nécessaire](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor s'exécute sur Windows, supportant Selenium, Chromium, Electron et outils similaires - aucune configuration n’est requise.
