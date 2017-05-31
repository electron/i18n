# Structure du répertoire source Code

Le code source d’électron est séparé en quelques parties, surtout après le chrome sur les conventions de séparation.

Vous devrez peut-être vous familiariser avec architecture</a> multiprocessus de Chromium à comprendre le code source mieux.</p> 

## Structure du Code Source

    Atom ├── électron / - C++ du code source.
    |   ├── app / - code d’accès système.
    |   Navigateur ├── / - l’interface dont la fenêtre principale, UI et tous les |   |   choses de processus principal. Cela s’entretient avec le moteur de rendu pour gérer les pages web.
    |   |   ├── ui / - mise en œuvre de l’interface utilisateur trucs pour différentes plates-formes.
    |   |   |   ├── cacao / - cacao spécifique du code source.
    |   |   |   Victoire ├── / - GUI Windows spécifique du code source.
    |   |   |   └── x / - X11 spécifique du code source.
    |   |   ├── api / - la mise en œuvre des principaux processus API.
    |   |   ├── net / - réseau code correspondant.
    |   |   Mac ├── / - Mac spécifique Objective-C du code source.
    |   |   Ressources └── / - icônes, fichiers dépendant de la plateforme, etc..
    |   Moteur de rendu ├── / - Code qui s’exécute dans le processus de rendu.
    |   |   └── api / - la mise en œuvre du convertisseur processus API.
    |   └── commune / - Code utilisé par les processus le principal et le moteur de rendu, |       y compris le code pour intégrer le message du nœud et quelques fonctions utilitaires |       boucle dans boucle de message de chrome.
    |       └── api / - la mise en oeuvre des API commun et des fondations de |           Modules intégrés de l’électron.
    ├── chromium_src / - Source code que copié à partir de chrome.
    ├── default_app / - par défaut la page à afficher lorsque l’électron est démarré sans |   fourniture d’une application.
    Docs ├── / - Documentations.
    Lib ├── / - JavaScript code source.
    |   Navigateur ├── / - Javascript principal processus de code d’initialisation.
    |   |   └── api / - implémentation de l’API Javascript.
    |   ├── commune / - JavaScript utilisé par les processus le principal et le moteur de rendu |   |   └── api / - implémentation de l’API Javascript.
    |   Moteur de rendu └── / - moteur de rendu Javascript code d’initialisation du processus.
    |       └── api / - implémentation de l’API Javascript.
    Spec ├── / - automatique tests.
    ├── electron.gyp - règles de construction des électrons.
    └── common.gypi - paramètres spécifiques du compilateur et les règles de construction pour les autres composants tels que « noeud » et « breakpad ».
    

## Structure des autres annuaires

* **script** - Scripts utilisés comme la construction, emballage, tests, etc. à des fins de développement.
* **tools** - Helper scripts utilisés par les fichiers de gyp, contrairement à `script`, scripts mis ici ne devrait jamais être invoquée par les utilisateurs directement.
* **vendor** - code Source de dépendances de tierce partie, nous ne pas utiliser`third_party` comme nom parce qu’il pourrait le confondre avec le même répertoire dans l’arborescence de code source de chrome.
* **node_modules** - modules de nœud de tiers utilisés pour la construction.
* **out** - répertoire de sortie temporaire de `ninja`.
* **dist** - répertoire temporaire créé par le script `script/créer-dist.py` lors de la création d’une distribution.
* **external_binaries** - binaires téléchargés des cadres de tiers qui ne supportent pas de bâtiment avec `gyp`.

## Garder les sous-modules Git à jour

Le référentiel de l’électron a quelques dépendances vendored, trouvés dans le répertoire[/vendor](https://github.com/electron/electron/tree/master/vendor). Parfois, vous pourriez voir un message comme celui-ci lors de l’exécution des status</code> de `git :</p>

<pre><code class="sh">$ git status modifiée : vendeur/brightray (nouvelles validations) modifiée : vendeur/nœud (nouvelle est validée)
`</pre> 

Pour mettre à jour ces dépendances vendored, exécutez la commande suivante :

```sh
mise à jour de sous-module git init----recursive
```

Si vous vous retrouvez souvent l’exécution de cette commande, vous pouvez créer un alias pour elle dans votre ` ~ / .gitconfig` fichier :

    [alias] su = sous-module mise à jour--init--recursive