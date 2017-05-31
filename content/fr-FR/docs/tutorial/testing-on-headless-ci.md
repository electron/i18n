# Tests sur les systèmes CI sans tête (Travis CI, Jenkins)

Étant basé sur Chromium, électron requiert un pilote d’affichage de la fonction. Si chrome ne peut pas trouver un pilote d’affichage, électron échouera tout simplement au lancement - et donc ne pas l’exécution de vos tests, peu importe comment vous les exécutez. Tester les applications axées sur les électrons sur Travis, Circle, Jenkins ou systèmes similaires exige donc un peu de configuration. En substance, nous devons utiliser un pilote d’affichage virtuel.

## Configuration du serveur d’affichage virtuel

Tout d’abord, installez [Xvfb](https://en.wikipedia.org/wiki/Xvfb). C’est un framebuffer virtuel, mise en œuvre de la X11 afficher le protocole du serveur - il effectue toutes les opérations graphiques en mémoire sans montrer n’importe quel écran de sortie, qui est exactement ce dont nous avons besoin.

Ensuite, créez un écran virtuel xvfb et exporter une variable d’environnement appelée affichage qui pointe vers lui. Chrome en électron va automatiquement chercher pour `$DISPLAY`, donc aucune configuration supplémentaire de votre application n’est nécessaire. Cette étape peut être automatisée avec[xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe) de Paul Betts : ajoutez vos commandes de test avec `xvfb-maybe` et le petit outil configurera automatiquement xvfb, si requis par le système actuel. Sous Windows ou macOS, il sera simplement ne rien faire.

    ## Sur Windows ou macOS, il appelle juste électron-moka ## sur Linux, si nous sommes dans un environnement sans tête, ce sera équivalent ## à xvfb diffusion électron-moka./test/*.js xvfb, peut-être électron-moka./test/*.js
    

### Travis CI

Sur Travis, votre `.travis.yml` devrait ressembler à peu près à ceci :

```yml
addons : apt : paquets :-installer xvfb :-export DISPLAY = « :99.0 » - Xvfb : 99 - 0 d’écran 1024 x 768 x 24 >/dev/null 2>&1 &
```

### Jenkins

Jenkins, un plugin de [Xvfb est available](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Cercle CI

Cercle CI est génial et a xvfb et `$DISPLAY`[already d’installation, donc aucune configuration supplémentaire n’est required](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor fonctionne sur Windows, support de sélénium, chrome, électron et outils similaires out of the box - aucune configuration n’est requise.